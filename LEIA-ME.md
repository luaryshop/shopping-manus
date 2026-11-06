# Viva Ira — guia local de Iracemápolis

Este pacote é um protótipo funcional de um guia de comércios e serviços de Iracemápolis-SP. A marca usada nesta versão é provisória: **Viva Ira**. O nome pode ser trocado em `config.js` sem alterar a lógica do app.

## O que foi reformulado

A página pública agora começa pelo problema do morador: busca ampla, sugestões enquanto digita, atalhos de intenção, categorias com ícones, plantões e emergência. Os cards mostram status em tempo real, bairro, confiança e botões fixos de WhatsApp e ligação. A ficha da empresa abre em tela cheia no celular com galeria, endereço, rota, horários, redes, serviços, avaliações, compartilhamento e favoritos.

O painel `admin.html` foi redesenhado como uma central SaaS responsiva. Ele reúne visão geral, empresas, planos, cadastros, contatos, banners editáveis, novidades, plantões e configurações. O gerenciamento de fotos via GitHub continua disponível dentro do editor de empresa, com token mantido apenas em memória.

## Planos atuais

- **Gratuito:** nome, categoria, endereço, telefone, horário e 1 foto.
- **Presença:** descrição, serviços, WhatsApp, redes sociais e até 3 fotos.
- **Destaque:** prioridade nas listas, selo Verificado, até 6 fotos e métricas básicas.
- **Premium:** prioridade na home, até 10 fotos, relatório avançado e participação em banners/novidades.

Os preços em `config.js` são somente referência visual no protótipo. Não existe cobrança automática.

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
