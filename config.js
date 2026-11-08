// Configuração provisória do guia. Troque Firebase/GitHub antes do lançamento.
export const firebaseConfig = {
  apiKey: "AIzaSyCanlMwdfud9gmVt62nJYYet4K2-BfWEc",
  authDomain: "luary-system.firebaseapp.com",
  projectId: "luary-system",
  storageBucket: "luary-system.firebasestorage.app",
  messagingSenderId: "996287172742",
  appId: "1:996287172742:web:4ff8c22a01cabe4015c107"
};

// Temporário para testes: o painel abre sem login enquanto false.
// Altere para true antes de publicar o painel em produção.
export const ADMIN_AUTH_REQUIRED = false;

// Marca e cidade. Para abrir outra cidade ou outro segmento (ex.: Guia Busca Hotéis),
// copie o projeto e troque apenas este bloco, os dados e as categorias.
export const BRAND = {
  name: "Guia Busca",
  tagline: "O que você procura, perto de você",
  city: "Iracemápolis",
  uf: "SP",
  segmento: "Cidade",                      // "Cidade", "Hotéis"... aparece no rodapé e nos textos de compartilhamento
  siteUrl: "https://guiabusca.com.br",     // troque pelo endereço real (usado em compartilhamento e Google)
  whatsapp: "",                            // WhatsApp do próprio guia, só números com DDD (ex.: 5519999999999). Vazio = botão some
  email: "",                               // e-mail de contato do guia (aparece como alternativa ao WhatsApp para "Informar erro ou remover")
  whatsappMessage: "Olá! Vi sua empresa no Guia Busca e gostaria de mais informações.",
  adminLabel: "Central Guia Busca"
};

// Atalhos "Mais buscados" na página inicial (o morador leigo não sabe o que digitar).
export const BUSCAS_POPULARES = ["Farmácia", "Marmita", "Salão", "Cachorro", "Festa", "Portão"];

// true = mostra aviso "dados de demonstração" no rodapé. Coloque false quando trocar pelos dados reais.
export const MODO_DEMO = true;

// Busca inteligente: cada grupo reúne palavras que significam a mesma coisa para o morador.
// Quem digita qualquer uma encontra empresas que usem as outras. Sem acento e minúsculas.
export const SINONIMOS = [
  ["cabelo", "cabeleireiro", "cabeleireira", "corte", "escova", "barba", "barbeiro", "salao", "unha", "unhas", "manicure", "pedicure", "esmalte", "beleza", "estetica", "sobrancelha", "maquiagem"],
  ["remedio", "remedios", "farmacia", "drogaria", "medicamento", "medicamentos", "saude", "receita", "genericos"],
  ["dentista", "dente", "odontologia", "ortodontia", "aparelho"],
  ["medico", "clinica", "consulta", "exame", "exames", "laboratorio", "pediatra", "saude"],
  ["cachorro", "cao", "gato", "pet", "pets", "animal", "racao", "veterinario", "vet", "banho e tosa", "tosa"],
  ["pizza", "lanche", "lanches", "hamburguer", "burger", "marmita", "marmitex", "almoco", "jantar", "comida", "restaurante", "delivery", "refeicao", "alimentacao", "batata", "milk shake", "milkshake"],
  ["padaria", "pao", "paes", "bolo", "doce", "doces", "confeitaria", "cafe"],
  ["encanador", "hidraulica", "vazamento", "cano", "torneira", "desentupimento", "caixa d'agua"],
  ["eletricista", "eletrica", "fiacao", "tomada", "disjuntor", "instalacao eletrica"],
  ["pedreiro", "reforma", "obra", "obras", "construcao", "azulejo", "reboco", "casa e obra"],
  ["serralheria", "serralheiro", "portao", "grade", "grades", "solda", "soldador", "metal", "ferro", "estrutura metalica", "orcamento"],
  ["festa", "festas", "evento", "eventos", "aniversario", "decoracao", "buffet", "casamento", "bolo de festa", "salgados", "lembrancinha", "balao"],
  ["vinho", "vinhos", "bebida", "bebidas", "cerveja", "adega", "destilado", "whisky"],
  ["ovos", "ovo", "granja", "caipira", "frango", "aves"],
  ["roupa", "roupas", "moda", "boutique", "vestido", "camisa", "calca", "look", "feminina", "masculina", "presente"],
  ["24h", "24 horas", "vinte e quatro horas", "plantao", "emergencia", "urgencia", "urgente", "madrugada", "noite"],
  ["escola", "curso", "aula", "aulas", "reforco", "idioma", "ingles", "educacao"],
  ["carro", "mecanico", "oficina", "automovel", "moto", "pneu", "borracharia", "auto"]
];

export const CIDADE = { nome: BRAND.city, uf: BRAND.uf };

export const CATEGORIAS = [
  { id: "comercio", nome: "Comércio", icon: "store", color: "coral" },
  { id: "servicos", nome: "Serviços", icon: "tool", color: "blue" },
  { id: "saude", nome: "Saúde", icon: "heart-pulse", color: "mint" },
  { id: "alimentacao", nome: "Alimentação", icon: "utensils", color: "amber" },
  { id: "casa-obra", nome: "Casa e obra", icon: "house", color: "violet" },
  { id: "beleza", nome: "Beleza", icon: "sparkle", color: "rose" },
  { id: "educacao", nome: "Educação", icon: "book", color: "sky" },
  { id: "pets", nome: "Pets", icon: "paw", color: "lime" },
  { id: "eventos", nome: "Eventos", icon: "party", color: "orange" }
];

export const INTENCOES = [
  { id: "aberto", label: "Aberto agora", icon: "clock" },
  { id: "emergencia", label: "Emergência 24h", icon: "siren" },
  { id: "delivery", label: "Delivery", icon: "moto" },
  { id: "entregagratis", label: "Entrega grátis", icon: "gift" },
  { id: "perto", label: "Perto de mim", icon: "pin" }
];

// ---------------------------------------------------------------------------
// PLANOS — escada de upgrade: Gratuito → Presença → Destaque → Premium
// Cada plano tem:
//   benefits   → lista completa mostrada no cadastro e no painel
//   novidades  → o que a empresa GANHA ao subir para este plano (usado nas mensagens de upgrade)
//   proximo    → próximo degrau da escada (null no último)
//   features   → recursos ligados/desligados (matriz do painel). Hoje o app aplica na tela:
//                fotos (limite), botão de WhatsApp (Presença+), Instagram (Presença+),
//                Facebook (Destaque+) e site (Premium). No Gratuito o WhatsApp aparece só como número.
// ---------------------------------------------------------------------------
export const FEATURES = [
  { id: "basico", label: "Nome, categoria, endereço, telefone, número de WhatsApp e horário" },
  { id: "descricao", label: "Descrição e serviços" },
  { id: "whatsapp", label: "Botão de WhatsApp" },
  { id: "instagram", label: "Botão do Instagram" },
  { id: "entrega", label: "Retirada / entrega / orçamento" },
  { id: "selo", label: "Selo Verificado" },
  { id: "prioridadeListas", label: "Prioridade nas listas" },
  { id: "metricas", label: "Métricas básicas de contatos" },
  { id: "facebook", label: "Botão do Facebook" },
  { id: "site", label: "Botão para o site da empresa" },
  { id: "prioridadeHome", label: "Prioridade na home" },
  { id: "banners", label: "Participação em banners e novidades" },
  { id: "relatorio", label: "Relatório avançado" }
];

export const PLANOS = {
  gratis: {
    label: "Gratuito",
    price: 0,
    color: "slate",
    photos: 1,
    proximo: "presenca",
    description: "O essencial para ser encontrado.",
    benefits: ["Nome, categoria e endereço", "Telefone, WhatsApp e horário", "1 foto"],
    novidades: [],
    features: { basico: true }
  },
  presenca: {
    label: "Presença",
    price: 39,
    color: "blue",
    photos: 3,
    proximo: "destaque",
    description: "Mais informação para gerar confiança.",
    benefits: ["Tudo do Gratuito", "Descrição e serviços", "Botão de WhatsApp", "Botão Instagram", "Retirada, entrega e orçamento", "Até 3 fotos"],
    novidades: ["descrição e serviços", "botão de WhatsApp", "botão do Instagram", "retirada/entrega", "até 3 fotos"],
    features: { basico: true, descricao: true, whatsapp: true, instagram: true, entrega: true }
  },
  destaque: {
    label: "Destaque",
    price: 79,
    color: "coral",
    photos: 6,
    proximo: "premium",
    description: "Mais visibilidade e mais contatos.",
    benefits: ["Tudo do Presença", "Botão Facebook", "Prioridade nas listas", "Selo Verificado", "Métricas básicas de contatos", "Até 6 fotos"],
    novidades: ["botão do Facebook", "prioridade nas listas", "selo Verificado", "métricas de contatos", "até 6 fotos"],
    features: { basico: true, descricao: true, whatsapp: true, instagram: true, facebook: true, entrega: true, selo: true, prioridadeListas: true, metricas: true }
  },
  premium: {
    label: "Premium",
    price: 149,
    color: "gold",
    photos: 10,
    proximo: null,
    description: "A vitrine completa da sua empresa.",
    benefits: ["Tudo do Destaque", "Botões de Instagram e Facebook", "Botão Site", "Prioridade na home", "Participação em banners e novidades", "Relatório avançado", "Até 10 fotos"],
    novidades: ["botão do site", "prioridade na home", "banners e novidades", "relatório avançado", "até 10 fotos"],
    features: { basico: true, descricao: true, whatsapp: true, instagram: true, facebook: true, site: true, entrega: true, selo: true, prioridadeListas: true, metricas: true, prioridadeHome: true, banners: true, relatorio: true }
  }
};

export const planoTem = (plano, recurso) => !!(PLANOS[plano] || PLANOS.gratis).features?.[recurso];
export const ORDEM_PLANOS = ["gratis", "presenca", "destaque", "premium"];

// ---------------------------------------------------------------------------
// MENSAGENS PRONTAS (WhatsApp) para o administrador enviar às empresas.
// Variáveis: {nome} {plano} {preco} {proximo} {proximoPreco} {ganhos}
//            {beneficios} {validade} {marca} {cidade}
// O painel permite editar e salvar estes textos (aba "Mensagens").
// ---------------------------------------------------------------------------
export const TIPOS_MENSAGEM = [
  { id: "boasVindas", label: "Boas-vindas", hint: "Depois de aprovar o cadastro ou ativar o plano." },
  { id: "upgrade", label: "Convite de upgrade", hint: "Para oferecer o próximo degrau da escada." },
  { id: "renovacao", label: "Renovação / lembrete", hint: "Perto do vencimento ou para pedir atualização." }
];

export const MENSAGENS_PADRAO = {
  gratis: {
    boasVindas: "Olá, {nome}! 👋 Seu perfil gratuito já está no {marca}, o guia de {cidade}. Quem procura por vocês já encontra endereço, telefone e horário. Quando quiser mostrar mais (descrição, serviços, WhatsApp e mais fotos), é só me chamar que eu explico o plano Presença.",
    upgrade: "Olá, {nome}! Seu perfil no {marca} está no plano Gratuito. Com o plano {proximo} ({proximoPreco}) vocês passam a ter: {ganhos}. Quer que eu ative para vocês?",
    renovacao: "Olá, {nome}! Passando para conferir se endereço, telefone e horário do seu perfil no {marca} continuam corretos. Se algo mudou, me envie por aqui que eu atualizo."
  },
  presenca: {
    boasVindas: "Olá, {nome}! 🎉 Seu plano {plano} está ativo no {marca}. Agora seu perfil mostra descrição, serviços, botão de WhatsApp e até 3 fotos. Me envie as fotos e o texto que você quer destacar que eu publico.",
    upgrade: "Olá, {nome}! Vi que seu perfil no {marca} está no plano {plano}. Com o {proximo} ({proximoPreco}) vocês ganham: {ganhos}. Isso coloca sua empresa na frente de quem está procurando agora. Posso ativar?",
    renovacao: "Olá, {nome}! Seu plano {plano} no {marca} vence em {validade}. Para continuar com {beneficios}, é só confirmar a renovação ({preco}). Posso renovar para vocês?"
  },
  destaque: {
    boasVindas: "Olá, {nome}! 🚀 Seu plano {plano} está ativo no {marca}. Sua empresa agora tem prioridade nas listas, selo Verificado, até 6 fotos e métricas de contatos. Me envie fotos novas e o que vocês querem destacar neste mês.",
    upgrade: "Olá, {nome}! Seu perfil no {marca} está indo bem no plano {plano}. Com o {proximo} ({proximoPreco}) vocês ganham: {ganhos}. Seus clientes passam a chamar direto pelo Instagram e Facebook também. Quer conhecer?",
    renovacao: "Olá, {nome}! Seu plano {plano} no {marca} vence em {validade}. Renovando ({preco}), vocês mantêm {beneficios}. Posso renovar?"
  },
  premium: {
    boasVindas: "Olá, {nome}! 🌟 Seu plano {plano} está ativo no {marca}. Para ativar os botões de Instagram e Facebook no seu perfil, me envie os links das duas páginas. Também posso criar uma novidade na home para divulgar vocês.",
    upgrade: "Olá, {nome}! Dica para aproveitar o plano {plano} no {marca}: mantenha os links do Instagram e Facebook atualizados, envie fotos novas todo mês e me avise de promoções para eu publicar como novidade ou banner na home.",
    renovacao: "Olá, {nome}! Seu plano {plano} no {marca} vence em {validade}. Renovando ({preco}), vocês mantêm {beneficios}. Posso renovar?"
  }
};

// Mensagem que já vai preenchida no WhatsApp quando o CLIENTE clica em "WhatsApp" na empresa.
// Variáveis: {empresa} {marca} {cidade}. Editável no painel (aba Mensagens prontas).
export const MENSAGENS_CLIENTE_PADRAO = {
  gratis: "Olá! Vi o {empresa} no {marca} e gostaria de mais informações.",
  presenca: "Olá! Encontrei o {empresa} no {marca}. Vocês podem me atender?",
  destaque: "Olá! Vi o {empresa} em destaque no {marca}, em {cidade}. Gostaria de saber mais sobre os serviços e valores.",
  premium: "Olá! Vi o {empresa} no {marca} e gostei do que vocês oferecem. Podem me passar mais informações e valores?"
};

export function preencherMensagem(texto = "", vars = {}) {
  return String(texto).replace(/\{(\w+)\}/g, (match, chave) => (vars[chave] ?? match));
}

export const COLECOES = {
  negocios: "ira_negocios",
  categorias: "ira_categorias",
  contatos: "ira_contatos",
  cadastros: "ira_cadastros",
  banners: "ira_banners",
  novidades: "ira_novidades",
  plantoes: "ira_plantoes",
  configuracoes: "ira_configuracoes",
  mensagens: "ira_mensagens"
};

export const IMAGE_BASE = "images/";
export const GITHUB = { user: "luaryshop", repo: "ira-shopping", branch: "main", pasta: "images" };
export const PRECOS = Object.fromEntries(Object.entries(PLANOS).map(([id, plano]) => [id, plano.price]));

// ---------------------------------------------------------------------------
// PERÍODOS DE CONTRATAÇÃO — o desconto é um valor sugerido: ajuste à vontade.
// Preço por dia = valor total ÷ (meses × 30 dias). Nada é cobrado pelo site:
// a equipe combina o pagamento pelo WhatsApp.
// ---------------------------------------------------------------------------
export const PERIODOS = [
  { meses: 1, label: "Mensal", curto: "1 mês", desconto: 0 },
  { meses: 3, label: "3 meses", curto: "3 meses", desconto: 5 },
  { meses: 6, label: "6 meses", curto: "6 meses", desconto: 10 },
  { meses: 12, label: "1 ano", curto: "1 ano", desconto: 15 }
];
export const periodoDe = (meses) => PERIODOS.find((p) => p.meses === Number(meses)) || PERIODOS[0];
export function precoPeriodo(planoId, meses = 1) {
  const plano = PLANOS[planoId] || PLANOS.gratis;
  const per = periodoDe(meses);
  const bruto = plano.price * per.meses;
  const total = Math.round(bruto * (1 - per.desconto / 100) * 100) / 100;
  return { meses: per.meses, label: per.label, desconto: per.desconto, total, economia: Math.round((bruto - total) * 100) / 100, mensal: total / per.meses, porDia: total / (per.meses * 30) };
}
