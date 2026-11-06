// Envio de fotos para o GitHub (mesma técnica da Luary CDN): converte para WebP e grava tudo em UM commit.
// O token do GitHub nunca é salvo: vive só na memória da aba aberta.
import { GITHUB } from "./config.js";
export { GITHUB };
export async function toWebP(file, { quality = 0.85, maxSide = 1600, frame = "original", background = "#ffffff" } = {}) {
  const bitmap = await createImageBitmap(file);
  const bg = /^#[0-9a-f]{6}$/i.test(background) ? background : "#ffffff";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (frame === "fit" || frame === "crop") {
    const natural = frame === "fit" ? Math.max(bitmap.width, bitmap.height) : Math.min(bitmap.width, bitmap.height);
    const side = Math.max(1, Math.round(Math.min(natural, maxSide)));
    canvas.width = side; canvas.height = side;
    if (frame === "fit") {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, side, side);
      const scale = side / Math.max(bitmap.width, bitmap.height);
      const w = Math.max(1, Math.round(bitmap.width * scale)), h = Math.max(1, Math.round(bitmap.height * scale));
      ctx.drawImage(bitmap, Math.round((side - w) / 2), Math.round((side - h) / 2), w, h);
    } else {
      const sq = Math.min(bitmap.width, bitmap.height);
      ctx.drawImage(bitmap, Math.round((bitmap.width - sq) / 2), Math.round((bitmap.height - sq) / 2), sq, sq, 0, 0, side, side);
    }
  } else {
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }
  bitmap.close?.();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
  if (!blob) throw new Error("Não foi possível converter " + (file.name || "a imagem") + " para WebP.");
  return blob;
}
async function toBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export class GitHubCDN {
  constructor(token = "") { this.token = token; }
  setToken(token) { this.token = String(token || "").trim(); }

  async api(path, { method = "GET", body } = {}) {
    const headers = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    if (body) headers["Content-Type"] = "application/json";
    const response = await fetch(`https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!response.ok) {
      const hint = response.status === 401 ? "Token inválido ou expirado."
        : response.status === 403 ? "Sem permissão (ou limite de requisições atingido)."
        : response.status === 404 ? "Não encontrado — confira o repositório e se o token tem acesso de escrita ao conteúdo."
        : response.status === 422 ? "O repositório mudou durante a publicação. Recarregue a pasta e tente novamente."
        : "Erro " + response.status + ".";
      const error = new Error(hint); error.status = response.status; throw error;
    }
    return response.status === 204 ? null : response.json();
  }

  // Confirma que o token consegue gravar neste repositório.
  async verify() {
    const repo = await this.api("");
    if (!repo.permissions?.push) throw new Error("Este token não tem permissão de escrita em " + GITHUB.repo + ".");
    return repo;
  }

  async head() {
    const ref = await this.api(`/git/ref/heads/${GITHUB.branch}`);
    const commit = await this.api(`/git/commits/${ref.object.sha}`);
    return { commitSha: ref.object.sha, treeSha: commit.tree.sha };
  }

  // Lista os arquivos de uma pasta (uma única chamada recursiva).
  async listFolder(folder) {
    const head = await this.head();
    const tree = await this.api(`/git/trees/${head.treeSha}?recursive=1`);
    const prefix = folder.replace(/\/+$/, "") + "/";
    const files = (tree.tree || [])
      .filter((n) => n.type === "blob" && n.path.startsWith(prefix) && !n.path.slice(prefix.length).includes("/") && /\.(webp|png|jpe?g|svg|ico|gif)$/i.test(n.path))
      .map((n) => ({ name: n.path.slice(prefix.length), path: n.path, sha: n.sha, size: n.size || 0 }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    return { files, head, truncated: !!tree.truncated };
  }

  // Aplica o estado final de uma pasta em UM commit.
  // entries: [{ name, sha }]  (arquivo já existente)  ou  [{ name, blob }]  (arquivo novo/substituído)
  async commitFolder(folder, entries, message) {
    const names = entries.map((e) => e.name);
    if (new Set(names).size !== names.length) throw new Error("Há nomes de arquivo repetidos.");
    const { files: existing, head, truncated } = await this.listFolder(folder);
    if (truncated) throw new Error("Repositório grande demais para esta operação.");
    const byName = new Map(existing.map((f) => [f.name, f]));
    const treeEntries = [];
    for (const entry of entries) {
      const path = `${folder}/${entry.name}`;
      let sha = entry.sha;
      if (entry.blob) {
        const created = await this.api("/git/blobs", { method: "POST", body: { content: await toBase64(entry.blob), encoding: "base64" } });
        sha = created.sha;
      }
      if (byName.get(entry.name)?.sha === sha) continue; // sem alteração
      treeEntries.push({ path, mode: "100644", type: "blob", sha });
    }
    const keep = new Set(names);
    for (const file of existing) if (!keep.has(file.name)) treeEntries.push({ path: file.path, mode: "100644", type: "blob", sha: null });
    if (!treeEntries.length) return head.commitSha;
    const tree = await this.api("/git/trees", { method: "POST", body: { base_tree: head.treeSha, tree: treeEntries } });
    const commit = await this.api("/git/commits", { method: "POST", body: { message, tree: tree.sha, parents: [head.commitSha] } });
    await this.api(`/git/refs/heads/${GITHUB.branch}`, { method: "PATCH", body: { sha: commit.sha } });
    return commit.sha;
  }
}

