// Configuração provisória do guia. Troque Firebase/GitHub antes do lançamento.
export const firebaseConfig = {
  apiKey: "AIzaSyCanlMwdfud9gmVt62nJYYet4K2-BfWEc",
  authDomain: "luary-system.firebaseapp.com",
  projectId: "luary-system",
  storageBucket: "luary-system.firebasestorage.app",
  messagingSenderId: "996287172742",
  appId: "1:996287172742:web:4ff8c22a01cabe4015c107"
};

export const BRAND = {
  name: "Viva Ira",
  tagline: "O melhor da cidade, mais perto de você",
  city: "Iracemápolis",
  uf: "SP",
  whatsappMessage: "Olá! Vi sua empresa no Viva Ira e gostaria de mais informações.",
  adminLabel: "Central Viva Ira"
};

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
  { id: "delivery", label: "Delivery", icon: "truck" },
  { id: "perto", label: "Perto de mim", icon: "pin" }
];

export const PLANOS = {
  gratis: {
    label: "Gratuito",
    price: 0,
    color: "slate",
    photos: 1,
    description: "O essencial para ser encontrado.",
    benefits: ["Nome, categoria e endereço", "Telefone e horário", "1 foto"]
  },
  presenca: {
    label: "Presença",
    price: 39,
    color: "blue",
    photos: 3,
    description: "Mais informação para gerar confiança.",
    benefits: ["Tudo do Gratuito", "Descrição e serviços", "WhatsApp e redes sociais", "Até 3 fotos"]
  },
  destaque: {
    label: "Destaque",
    price: 79,
    color: "coral",
    photos: 6,
    description: "Mais visibilidade e mais contatos.",
    benefits: ["Tudo do Presença", "Prioridade nas listas", "Selo Verificado", "Até 6 fotos", "Métricas básicas"]
  },
  premium: {
    label: "Premium",
    price: 149,
    color: "gold",
    photos: 10,
    description: "A vitrine completa da sua empresa.",
    benefits: ["Tudo do Destaque", "Prioridade na home", "Até 10 fotos", "Relatório avançado", "Participação em banners"]
  }
};

export const COLECOES = {
  negocios: "ira_negocios",
  categorias: "ira_categorias",
  contatos: "ira_contatos",
  cadastros: "ira_cadastros",
  banners: "ira_banners",
  novidades: "ira_novidades",
  plantoes: "ira_plantoes",
  configuracoes: "ira_configuracoes"
};

export const IMAGE_BASE = "images/";
export const GITHUB = { user: "luaryshop", repo: "ira-shopping", branch: "main", pasta: "images" };
export const PRECOS = Object.fromEntries(Object.entries(PLANOS).map(([id, plano]) => [id, plano.price]));
