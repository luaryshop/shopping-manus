/* Importação de empresas por planilha (CSV). Tudo roda no navegador; nada é enviado até você confirmar. */

export const COLUNAS = ['nome', 'categoria', 'subcategoria', 'bairro', 'endereco', 'telefone', 'whatsapp', 'horario_seg_sex', 'horario_sab', 'horario_dom', 'descricao', 'servicos', 'palavras', 'site', 'instagram', 'facebook', 'latitude', 'longitude', 'emergencia', 'orcamento'];

const ALIASES = {
  nome: ['nome', 'empresa', 'nome_da_empresa', 'nome_fantasia', 'estabelecimento'],
  categoria: ['categoria', 'segmento', 'ramo', 'tipo', 'area'],
  subcategoria: ['subcategoria', 'sub_categoria', 'especialidade'],
  bairro: ['bairro', 'regiao'],
  endereco: ['endereco', 'rua', 'logradouro', 'endereco_completo'],
  telefone: ['telefone', 'fone', 'tel', 'telefone_fixo', 'contato', 'celular'],
  whatsapp: ['whatsapp', 'whats', 'zap', 'whatsapp_comercial'],
  horario_seg_sex: ['horario_seg_sex', 'horario', 'horarios', 'seg_sex', 'segunda_a_sexta', 'horario_segunda_a_sexta', 'funcionamento'],
  horario_sab: ['horario_sab', 'sab', 'sabado', 'horario_sabado'],
  horario_dom: ['horario_dom', 'dom', 'domingo', 'horario_domingo'],
  descricao: ['descricao', 'sobre', 'apresentacao', 'resumo'],
  servicos: ['servicos', 'produtos', 'servicos_produtos', 'servicos_e_produtos'],
  palavras: ['palavras', 'palavras_chave', 'palavras_de_busca', 'tags', 'busca'],
  site: ['site', 'website', 'pagina', 'url'],
  instagram: ['instagram', 'insta'],
  facebook: ['facebook', 'face'],
  latitude: ['latitude', 'lat'],
  longitude: ['longitude', 'lng', 'long', 'lon'],
  emergencia: ['emergencia', 'plantao', '24h'],
  orcamento: ['orcamento', 'faz_orcamento']
};

/* Palavras comuns que o comerciante escreve no lugar da categoria do guia. */
const ALIAS_CATEGORIA = {
  'Alimentação': ['restaurante', 'lanchonete', 'padaria', 'pizzaria', 'hamburgueria', 'sorveteria', 'acai', 'cafeteria', 'bar', 'marmitaria', 'acougue', 'doceria', 'confeitaria', 'mercearia', 'hortifruti', 'adega', 'pastelaria', 'sacolao'],
  'Saúde': ['farmacia', 'drogaria', 'clinica', 'dentista', 'odontologia', 'medico', 'laboratorio', 'psicologo', 'psicologia', 'fisioterapia', 'otica', 'nutricionista', 'saude'],
  'Beleza': ['salao', 'barbearia', 'estetica', 'manicure', 'cabeleireiro', 'cabeleireira', 'spa', 'unhas', 'depilacao'],
  'Pets': ['pet', 'petshop', 'pet shop', 'veterinario', 'veterinaria', 'racao', 'banho e tosa'],
  'Casa e obra': ['construcao', 'material de construcao', 'eletricista', 'encanador', 'pedreiro', 'marmoraria', 'vidracaria', 'serralheria', 'marcenaria', 'pintor', 'ferragens', 'madeireira', 'casa e obra', 'obra', 'reforma', 'moveis', 'eletrodomesticos'],
  'Serviços': ['servico', 'mecanica', 'oficina', 'advogado', 'advocacia', 'contador', 'contabilidade', 'despachante', 'lavanderia', 'transporte', 'frete', 'chaveiro', 'assistencia tecnica', 'informatica', 'fotografo', 'seguros', 'imobiliaria', 'lava jato', 'borracharia'],
  'Educação': ['escola', 'curso', 'cursos', 'creche', 'ingles', 'idiomas', 'autoescola', 'reforco', 'educacao', 'faculdade'],
  'Eventos': ['festa', 'festas', 'buffet', 'decoracao', 'salao de festas', 'dj', 'som e luz', 'eventos', 'cerimonial'],
  'Comércio': ['loja', 'roupas', 'calcados', 'papelaria', 'mercado', 'supermercado', 'magazine', 'floricultura', 'presentes', 'variedades', 'bazar', 'comercio', 'agropecuaria', 'celulares']
};

export const norm = (v = '') => String(v).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const slug = (v = '') => norm(v).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
const digits = (v = '') => String(v).replace(/\D/g, '');

/* ---------- CSV ---------- */
export function detectarSeparador(texto) {
  const linha = texto.split(/\r?\n/).find((l) => l.trim()) || '';
  const cont = (c) => (linha.match(new RegExp(c === '\t' ? '\t' : `\\${c}`, 'g')) || []).length;
  const pontos = [[';', cont(';')], [',', cont(',')], ['\t', cont('\t')]].sort((a, b) => b[1] - a[1]);
  return pontos[0][1] ? pontos[0][0] : ';';
}

export function parseCSV(texto) {
  texto = String(texto || '').replace(/^﻿/, '');
  const sep = detectarSeparador(texto);
  const linhas = []; let campo = '', linha = [], aspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (aspas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') aspas = false;
      else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === sep) { linha.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++;
      linha.push(campo); campo = '';
      if (linha.some((x) => x.trim() !== '')) linhas.push(linha);
      linha = [];
    } else campo += c;
  }
  linha.push(campo);
  if (linha.some((x) => x.trim() !== '')) linhas.push(linha);
  return { separador: sep, linhas };
}

/* Converte as linhas em objetos usando o cabeçalho (aceita nomes alternativos de coluna). */
export function linhasParaObjetos(linhas) {
  if (!linhas.length) return { objetos: [], colunasIgnoradas: [], faltando: ['nome'] };
  const cab = linhas[0].map((h) => norm(h).replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''));
  const mapa = cab.map((h) => Object.keys(ALIASES).find((k) => ALIASES[k].includes(h)) || null);
  const colunasIgnoradas = linhas[0].filter((_, i) => !mapa[i]).map((x) => x.trim()).filter(Boolean);
  const faltando = ['nome', 'categoria'].filter((k) => !mapa.includes(k));
  const objetos = linhas.slice(1).map((l, i) => {
    const o = { _linha: i + 2 };
    mapa.forEach((k, idx) => { if (k && o[k] === undefined) o[k] = (l[idx] ?? '').trim(); });
    return o;
  });
  return { objetos, colunasIgnoradas, faltando };
}

/* ---------- campos ---------- */
export function achaCategoria(valor, categorias) {
  const n = norm(valor);
  if (!n) return null;
  const direto = categorias.find((c) => norm(c.nome) === n || c.id === n);
  if (direto) return { categoria: direto.nome, sub: '' };
  for (const [nome, lista] of Object.entries(ALIAS_CATEGORIA)) {
    if (lista.some((a) => n === a || n.includes(a))) {
      const cat = categorias.find((c) => c.nome === nome);
      if (cat) return { categoria: cat.nome, sub: String(valor).trim() };
    }
  }
  return null;
}

const toHora = (h, m) => Number(h) + (m ? Number(m) / 60 : 0);
/* undefined = coluna vazia · null = fechado · '24h' · [abre, fecha] · false = ilegível */
export function parseHorario(valor) {
  const v = norm(valor);
  if (!v) return undefined;
  if (/^(fechado|nao abre|nao funciona|folga|-|—)$/.test(v)) return null;
  if (/24\s*h|24 horas|vinte e quatro/.test(v)) return '24h';
  const m = v.match(/(\d{1,2})\s*(?:h|:)?\s*(\d{2})?\s*(?:h|hs|horas)?\s*(?:as|a|ate|-|–|—|\/)\s*(\d{1,2})\s*(?:h|:)?\s*(\d{2})?/);
  if (!m) return false;
  const ab = toHora(m[1], m[2]), fe = toHora(m[3], m[4]);
  if (ab > 24 || fe > 24 || fe <= ab) return false;
  return [ab, fe];
}

export function formataTelefone(d) {
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}
const semPais = (d) => (d.startsWith('55') && d.length > 11 ? d.slice(2) : d);
const simNao = (v) => /^(s|sim|x|1|true|yes)$/.test(norm(v));
const lista = (v) => String(v || '').split(/[;|]/).flatMap((p, _, a) => (a.length === 1 ? p.split(',') : [p])).map((x) => x.trim()).filter(Boolean);
const numero = (v) => { const n = parseFloat(String(v ?? '').replace(',', '.')); return Number.isFinite(n) ? n : null; };

function social(kind, v) {
  v = String(v || '').trim();
  if (!v) return '';
  const host = kind === 'instagram' ? 'instagram.com' : 'facebook.com';
  if (/^https?:\/\//i.test(v)) { try { return new URL(v).hostname.replace(/^www\./, '').endsWith(host) ? v : null; } catch { return null; } }
  if (new RegExp(`^(www\\.)?${host.replace('.', '\\.')}`, 'i').test(v)) return `https://${v.replace(/^\/+/, '')}`;
  const user = v.replace(/^@/, '');
  return /^[a-z0-9._-]{2,60}$/i.test(user) ? `https://${host}/${user}` : null;
}

/* ---------- linha -> empresa ---------- */
export function converter(objetos, { categorias, existentes = [], ordemInicial = 1, atualizar = false }) {
  const porId = new Map(existentes.map((e) => [e.id, e]));
  const telefones = new Map(existentes.filter((e) => digits(e.telefone)).map((e) => [semPais(digits(e.telefone)), e.nome]));
  const idsNoArquivo = new Set();
  let ordem = ordemInicial;
  const agora = new Date().toISOString();

  return objetos.map((o) => {
    const erros = [], avisos = [];
    const nome = (o.nome || '').replace(/\s+/g, ' ').trim();
    if (nome.length < 2) erros.push('Nome vazio.');
    if (nome.length > 80) erros.push('Nome com mais de 80 letras.');

    const cat = achaCategoria(o.categoria, categorias);
    if (!cat) erros.push(`Categoria "${o.categoria || ''}" não reconhecida. Use: ${categorias.map((c) => c.nome).join(', ')}.`);

    let tel = semPais(digits(o.telefone));
    let wa = semPais(digits(o.whatsapp));
    if (!tel && !wa) erros.push('Informe telefone ou WhatsApp.');
    if (tel && (tel.length < 10 || tel.length > 11)) erros.push('Telefone inválido (use DDD + número).');
    if (wa && (wa.length !== 11 || wa[2] !== '9')) erros.push('WhatsApp inválido (celular com DDD, 11 números).');
    if (!tel && wa && !erros.length) tel = wa;
    if (!wa && !erros.length) avisos.push('Sem WhatsApp: mostrará só o botão Ligar.');

    const horarios = {};
    const hs = parseHorario(o.horario_seg_sex), sb = parseHorario(o.horario_sab), dm = parseHorario(o.horario_dom);
    [['Segunda a sexta', hs], ['Sábado', sb], ['Domingo', dm]].forEach(([n, h]) => { if (h === false) erros.push(`Horário de "${n}" ilegível. Exemplos: 8h às 18h · 08:00-18:00 · fechado · 24h.`); });
    let horariosFinal = null;
    if (hs === '24h') horariosFinal = '24h';
    else if (hs !== undefined && hs !== false) {
      horarios.seg_sex = hs; horarios.sab = sb === undefined || sb === false ? null : sb === '24h' ? [0, 24] : sb; horarios.dom = dm === undefined || dm === false ? null : dm === '24h' ? [0, 24] : dm;
      if (sb === undefined || dm === undefined) avisos.push('Sábado/domingo em branco foram considerados fechados.');
      horariosFinal = horarios;
    } else if (hs === undefined) avisos.push('Sem horário: a ficha mostrará "Horário não informado".');

    let site = String(o.site || '').trim();
    if (site) { if (!/^https?:\/\//i.test(site)) site = 'https://' + site; try { site = new URL(site).href; if (!/\.[a-z]{2,}/i.test(new URL(site).hostname)) throw 0; } catch { avisos.push('Site ignorado (link inválido).'); site = ''; } }
    const ig = social('instagram', o.instagram), fb = social('facebook', o.facebook);
    if (ig === null) avisos.push('Instagram ignorado (link inválido).');
    if (fb === null) avisos.push('Facebook ignorado (link inválido).');

    const lat = numero(o.latitude), lng = numero(o.longitude);
    let localizacao = null;
    if (o.latitude || o.longitude) {
      if (lat !== null && lng !== null && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) localizacao = { lat, lng };
      else avisos.push('Latitude/longitude ignoradas (valores inválidos).');
    }

    let id = slug(nome), situacao = 'novo';
    if (id) {
      if (idsNoArquivo.has(id)) {
        const alt = slug(`${nome} ${o.bairro || ''}`);
        id = alt && alt !== id && !idsNoArquivo.has(alt) ? alt : `${id}-${idsNoArquivo.size + 1}`;
        avisos.push('Nome repetido na planilha: identificador ajustado.');
      }
      idsNoArquivo.add(id);
      if (porId.has(id)) situacao = atualizar ? 'atualizar' : 'existe';
    }
    const donoTel = tel && telefones.get(tel);
    if (donoTel && situacao === 'novo') avisos.push(`Telefone já cadastrado em "${donoTel}".`);

    const anterior = porId.get(id);
    const item = erros.length ? null : {
      ...(situacao === 'atualizar' ? anterior : {}),
      id, nome, categoria: cat.categoria,
      subcategoria: (o.subcategoria || cat.sub || '').trim().slice(0, 60),
      descricao: (o.descricao || '').trim().slice(0, 300),
      servicos: lista(o.servicos).slice(0, 20), palavras: lista(o.palavras).slice(0, 30),
      bairro: (o.bairro || '').trim().slice(0, 60), endereco: (o.endereco || '').trim().slice(0, 100),
      horarios: horariosFinal,
      telefone: tel ? formataTelefone(tel) : '', whatsapp: wa ? `55${wa}` : '',
      emergencia: simNao(o.emergencia), orcamento: simNao(o.orcamento),
      site, redes: { instagram: ig || '', facebook: fb || '' }, localizacao,
      ...(situacao === 'novo' ? { plano: 'gratis', planoAte: '', nota: { media: 0, qtd: 0 }, entrega: null, retirada: false, fotos: 0, ativo: true, verificado: false, ordem: ordem++, fonte: 'importacao', importadoEm: agora } : {})
    };
    return { linha: o._linha, nome, situacao: erros.length ? 'erro' : situacao, erros, avisos, item };
  });
}

/* ---------- modelo para baixar ---------- */
export function modeloCSV() {
  const exemplos = [
    ['Padaria Pão Quente', 'Alimentação', 'Padaria e confeitaria', 'Centro', 'Rua das Flores, 120', '(19) 3456-7890', '(19) 99999-0001', '6h às 19h', '6h às 13h', 'fechado', 'Pães frescos, bolos e salgados todos os dias.', 'Pães; Bolos; Salgados; Café', 'pao, bolo, cafe da manha, lanche', '@padariapaoquente', '', '-22.5833', '-47.5233', 'não', 'não'],
    ['Eletricista Carlos', 'Casa e obra', 'Instalações elétricas', 'Vila Nova', '', '', '(19) 99999-0002', '8h às 18h', '8h às 12h', '', 'Atendo residências e comércios.', 'Instalação; Reparos; Quadro de luz', 'eletrica, tomada, fiacao, disjuntor', '', '', '', '', 'sim', 'sim'],
    ['Farmácia Saúde 24h', 'Saúde', '', 'Centro', 'Av. Principal, 450', '(19) 3456-1000', '', '24h', '', '', '', 'Medicamentos; Entrega', 'remedio, farmacia, plantao', '', '', '', '', 'sim', 'não']
  ];
  const q = (v) => (/[;"\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : v);
  return '﻿' + [COLUNAS, ...exemplos].map((l) => l.map(q).join(';')).join('\r\n') + '\r\n';
}

export function errosCSV(resultados) {
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return '﻿' + ['linha;nome;problema', ...resultados.filter((r) => r.situacao === 'erro').map((r) => [r.linha, q(r.nome), q(r.erros.join(' '))].join(';'))].join('\r\n');
}
