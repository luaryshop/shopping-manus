# Entregas do redesign

## App público premium

- [x] O app inicia pela busca grande com placeholder sobre necessidades do morador e mostra sugestões enquanto a pessoa digita.
- [x] O app oferece atalhos de intenção para Aberto agora, Emergência 24h, Delivery e Perto de mim.
- [x] O app apresenta categorias com ícones premium para Comércio, Serviços, Saúde, Alimentação, Casa e obra, Beleza, Educação, Pets e Eventos.
- [x] Os cards mostram capa, nome, categoria, bairro, status em tempo real, selo de verificação quando aplicável e ações fixas de WhatsApp e Ligar.
- [x] A ficha da empresa abre em tela cheia no celular, mostra galeria de até 10 fotos, navegação por toque/teclado, ampliar, horários, endereço, Como chegar, redes, serviços/preços, avaliações, compartilhar e favoritos.
- [x] A mensagem de WhatsApp identifica o guia e o clique é registrado por empresa e origem.
- [x] Existem seções para novidades na cidade, mais procurados da semana, perto de você e plantões/emergências.
- [x] O usuário consegue alternar modo claro e escuro; a preferência persiste e respeita redução de movimento.
- [x] O app mantém fallback para o JSON local e informa a fonte dos dados.

## Painel administrativo

- [x] O painel tem visual SaaS premium responsivo, navegação lateral e resumo com KPIs.
- [x] Empresas podem ser pesquisadas, filtradas, criadas, editadas, pausadas, excluídas e marcadas como verificadas/emergência.
- [x] Planos Gratuito, Presença, Destaque e Premium possuem benefícios, limites de fotos e validade editáveis.
- [x] Cadastros pendentes podem ser aprovados ou descartados.
- [x] Contatos exibem WhatsApp, ligações, visitas e exportação CSV/relatório.
- [x] Banners da home podem ser criados, editados, reordenados, ativados/desativados e excluídos.
- [x] Conteúdo de novidades e plantões pode ser gerenciado no painel.
- [x] Configurações permitem ajustar marca, cidade, links sociais, mensagens de WhatsApp e tema.
- [x] O token do GitHub permanece apenas em memória e o gerenciamento de fotos segue limitado ao plano.

## Qualidade e entrega

- [x] Os dados de teste permanecem claramente marcados como fictícios.
- [x] Não há dependência de build; o projeto abre com servidor estático.
- [x] Arquivos JS, JSON e HTML passam por validação sintática/estática.
- [x] A pasta original é preservada em `backup-before-redesign`.

## Pendências antes de produção

- Criar Firebase e repositório GitHub próprios e substituir os valores provisórios em `config.js`.
- Publicar as regras complementares, configurar `isAdmin()` e criar o usuário administrador.
- Trocar dados, telefones, endereços e imagens fictícias pelos dados autorizados das empresas.
- Definir o nome final após verificar domínio, redes sociais e possibilidade de expansão.
- Fazer deploy e validar HTTPS, domínio, analytics, SEO e políticas de privacidade.
