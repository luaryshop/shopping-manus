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
