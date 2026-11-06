# Viva Ira — guia local de Iracemápolis

Este pacote é um protótipo funcional de um guia de comércios e serviços de Iracemápolis-SP. A marca usada nesta versão é provisória: **Viva Ira**. O nome pode ser trocado em `config.js` sem alterar a lógica do app.

## O que foi reformulado

A página pública agora começa pelo problema do morador: busca ampla, sugestões enquanto digita, atalhos de intenção, categorias com ícones, plantões e emergência. Os cards mostram status em tempo real, bairro, confiança e botões fixos de WhatsApp e ligação. A ficha da empresa abre em tela cheia no celular com galeria, endereço, rota, horários, redes, serviços, avaliações, compartilhamento e favoritos.

O painel `admin.html` foi redesenhado como uma central SaaS responsiva. Ele reúne visão geral, empresas, planos, cadastros, contatos, banners editáveis, novidades, plantões e configurações. O gerenciamento de fotos via GitHub continua disponível dentro do editor de empresa, com token mantido apenas em memória.

## Planos — escada de upgrade (Gratuito → Premium)

| Degrau | Preço ref. | O que a empresa GANHA ao subir |
|---|---|---|
| 1. **Gratuito** | R$ 0 | Nome, categoria, endereço, telefone, horário e 1 foto |
| 2. **Presença** | R$ 39 | Descrição e serviços, botão de WhatsApp, retirada/entrega/orçamento, até 3 fotos |
| 3. **Destaque** | R$ 79 | Prioridade nas listas, selo Verificado, métricas básicas de contatos, até 6 fotos |
| 4. **Premium** | R$ 149 | **Botões de Instagram e Facebook**, prioridade na home, banners e novidades, relatório avançado, até 10 fotos |

Tudo é definido em `config.js` (`PLANOS` + `FEATURES`). O app aplica sozinho: o **limite de fotos** e os **botões de Instagram/Facebook (só Premium)**. Os demais recursos são política comercial documentada na matriz do painel. Os preços são só referência; não existe cobrança automática.

## Novidades desta versão

- **Cadastro com plano:** o formulário público tem seletor de plano e um painel que mostra os benefícios do plano escolhido (e o que o próximo degrau oferece). O plano escolhido é gravado em `ira_cadastros.plano`.
- **Botões Instagram e Facebook (Premium):** aparecem na ficha da empresa em "Siga a empresa". Cliques são contabilizados (`instagram` / `facebook`) e aparecem na aba Contatos. Empresas de outros planos não exibem os botões, mesmo que tenham links salvos.
- **Aba "Planos e upgrade":** escada de upgrade, receita mensal estimada, planos vencidos, oportunidades de upgrade (empresas fora do Premium, por contatos) e matriz de recursos.
- **Aba "Mensagens prontas":** 12 textos de WhatsApp (3 por plano: boas-vindas, convite de upgrade, renovação) editáveis, com variáveis (`{nome}`, `{plano}`, `{preco}`, `{proximo}`, `{ganhos}`, `{validade}`…), prévia com dados de uma empresa real, botão Copiar e Abrir no WhatsApp. Também há o botão **Mensagem** nas abas Empresas e Cadastros.
- **Mensagem que o cliente envia à empresa:** o texto que já vem preenchido no WhatsApp quando o cliente toca em "WhatsApp" agora é por plano, com o nome da empresa (`{empresa}`, `{marca}`, `{cidade}`). Edite na aba Mensagens prontas.
- **Aprovar cadastro** agora abre o editor já preenchido (o plano começa como Gratuito; ative o plano pago depois de confirmar com a empresa). Ao escolher um plano pago, a validade é sugerida em 30 dias.
- **Mensagem de WhatsApp do app:** a mensagem definida em Configurações agora é realmente usada na página pública, e as configurações são gravadas também no Firestore.

## Regras do Firestore

Atualize as regras com o arquivo `firestore.rules.ira-ADICIONAR.txt`: ele passou a aceitar o campo `plano` nos cadastros, os tipos de clique `instagram` e `facebook`, e criou a coleção `ira_mensagens` (somente administrador).

## Acesso ao painel administrativo

O painel fica em `admin.html` e usa o Firebase Authentication. Ele não possui senha padrão nem cadastro público de administrador. Para testar sem senha, existe um botão **Entrar sem senha · modo local**, exibido somente quando o endereço for `localhost`, `127.0.0.1` ou `::1`. Nesse modo, o Firebase não autentica o acesso: os dados editados ficam no navegador e o botão nunca aparece em um domínio publicado. No Firebase Console do projeto configurado em `config.js`, abra **Authentication → Sign-in method**, ative **Email/Password** e depois abra **Users → Add user** para criar o e-mail e a senha que serão usados no painel.

Não abra `admin.html` por duplo clique (`file://`), porque os módulos JavaScript e o Firebase podem ser bloqueados pelo navegador. Rode `python3 -m http.server 8080` na pasta do projeto e acesse `http://localhost:8080/admin.html`.

Se aparecer “Usuário não encontrado”, o usuário ainda não foi criado no Authentication. Se aparecer “login por e-mail ainda não foi ativado”, ative o provedor Email/Password.

## Testar localmente

Na pasta que contém `index.html`:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`. O app tenta ler Firestore; se não conseguir, usa `data/negocios.json` e `data/conteudo.json`.

O painel depende do login do Firebase configurado no projeto provisório. As funções públicas de cadastro e contatos dependem das regras complementares em `firestore.rules.ira-ADICIONAR.txt`.

## Antes de produção

Crie um Firebase e um repositório GitHub próprios, substitua os valores de `config.js`, publique as regras com uma função `isAdmin()` segura, troque telefones/endereço/fotos fictícios e confirme os links sociais. A pasta `backup-before-redesign` preserva a versão anterior ao redesign.

## Ideias de nomes

Além de Viva Ira, boas alternativas são **Perto de Ira**, **Conecta Ira**, **Ira em Rede**, **Mapa da Cidade**, **Aqui em Ira**, **Vitrine Ira** e **Meu Comércio Ira**. Antes de decidir, confira domínio, redes sociais, facilidade de pronúncia e possibilidade de expansão para cidades próximas.
