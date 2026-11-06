# Redesign do guia local

## Escopo

Reformar o protótipo Ira Shopping em um guia local premium e orientado por intenção para moradores de Iracemápolis. O Firebase e o GitHub continuam provisórios para testes. A aplicação permanece estática, sem checkout e sem cobrança automática.

## Direção visual escolhida

**Estilo: editorial premium local** — 55% de probabilidade. Alternativas consideradas: marketplace caloroso e colorido — 25%; dashboard utilitário minimalista — 20%.

### Movimento de design

Uma mistura de revista local contemporânea com aplicativo de descoberta: blocos de conteúdo em camadas, navegação compacta e cards com hierarquia editorial, sem aparência de template de diretório genérico.

### Princípios

1. Começar pela necessidade do morador, não pela lista de empresas.
2. Usar status, intenção e distância como sinais rápidos de decisão.
3. Fazer cada card parecer uma pequena vitrine confiável.
4. Manter ações críticas sempre a um toque: WhatsApp, ligar, salvar e rota.

### Filosofia de cor

Marinho profundo comunica confiança e navegação; marfim reduz fadiga visual; coral/laranja é reservado para ação e urgência; verde indica contato e disponibilidade; dourado identifica destaque e verificação. O modo escuro inverte a superfície sem perder contraste.

### Paradigma de layout

Cabeçalho sticky com busca dominante, trilhas horizontais de intenções e seções assimétricas de descoberta. O grid aparece depois dos atalhos, com uma coluna editorial lateral no desktop e fluxo de uma coluna no celular.

### Assinaturas visuais

- Ícones SVG lineares dentro de cápsulas e tiles com brilho sutil.
- Selos compactos de status e confiança sobre as imagens.
- Painéis em vidro discreto, bordas suaves e sombras profundas apenas nos elementos interativos.

### Interação e animação

Transições de 180–280 ms, elevação leve no hover, entrada em cascata dos cards e mudança suave do banner. Toda animação é desativada ou reduzida para `prefers-reduced-motion: reduce`.

### Tipografia

Figtree para interface e leitura; Cormorant Garamond apenas para títulos editoriais e a assinatura da marca. Títulos grandes e curtos; microcopy objetiva, humana e local.

### Essência da marca

Um guia confiável que transforma uma necessidade cotidiana em contato rápido com quem atende na cidade. Personalidade: próximo, confiável, elegante.

### Voz

CTAs: “Encontrar agora”, “Falar no WhatsApp”, “Ver empresas perto de mim”.
Microcopy: “O que você precisa resolver hoje?” e “Escolha uma opção e vá direto ao ponto.”

### Wordmark e cor proprietária

A marca provisória editável é **Viva Ira**, com um pin/estrela modular em SVG. A cor proprietária é coral queimado `#E66A4E`, usada apenas para ações, urgência e chamadas de descoberta.

## Implementação

- `index.html`: experiência pública totalmente reformulada, com busca inteligente, sugestões, categorias expandidas, atalhos de intenção, banners, novidades, plantões, ranking, cards e ficha full-screen.
- `admin.html`: painel SaaS com resumo, empresas, cadastros, contatos, banners, conteúdo editorial e configurações; tudo em HTML/CSS/JS modular dentro da própria página para preservar o protótipo sem build.
- `ira-data.js`: normalização compatível com os campos existentes e suporte a conteúdo local/Firebase para banners, novidades, plantões e categorias.
- `config.js`: nome, cidade, planos e parâmetros do ambiente de teste em um único lugar.
- `data/negocios.json`: seis exemplos preservados e ampliados com verificação, emergência, redes, localização e serviços.
- `firestore.rules.ira-ADICIONAR.txt`: regras adicionais para coleções de conteúdo e criação pública de cadastros/contatos.
- `public/manus-routes.json`: manifesto de rotas públicas e do painel para validação estática.

## Planos

- Gratuito: nome, categoria, endereço, telefone, horário e 1 foto.
- Presença: até 3 fotos, descrição, serviços, WhatsApp, retirada/entrega e redes sociais.
- Destaque: até 6 fotos, posição priorizada, selo verificado, CTA de orçamento e métricas básicas.
- Premium: até 10 fotos, galeria completa, vídeo/link social, prioridade máxima, relatório avançado e participação em banners/novidades.

Os valores exibidos são apenas referência no painel durante o teste; não existe cobrança automática nesta etapa.

## Persistência provisória

A leitura tenta Firestore e cai para `data/negocios.json`. Conteúdo editorial e banners têm fallback embutido em `data/conteudo.json`; no painel, gravações em Firestore são tentadas e, se falharem, ficam salvas em `localStorage` para a sessão/teste.
