[English](./README.md) | **Português (Brasil)**

<p align="center">
  <a href="https://wppconnect.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://wppconnect-team.github.io/brand/wppconnect-dark.png" />
      <img src="https://wppconnect-team.github.io/brand/wppconnect-light.png" alt="WPPConnect" width="220" height="121" />
    </picture>
  </a>
</p>

# WPPConnect/WA-JS

Exponha funções do WhatsApp Web pela API `WPP` no navegador.

Um projeto do ecossistema WPPConnect, mantido pela WPPConnect Team.

[Primeiros passos](#primeiros-passos) | [Documentação](#documentação) | [Como contribuir](#como-contribuir) | [Apoie a WPPConnect](#apoie-o-projeto)

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE) [![npm version](https://img.shields.io/npm/v/@wppconnect/wa-js)](https://www.npmjs.com/package/@wppconnect/wa-js) [![CI](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml) [![Open Collective](https://img.shields.io/badge/Open%20Collective-WPPConnect-blue)](https://opencollective.com/wppconnect)

## Visão geral

Para desenvolvedores de extensões e integrações que precisam executar código dentro do WhatsApp Web. O bundle gerado `dist/wppconnect-wa.js` expõe módulos de conversas, contatos, conexão e outros; ele é executado no navegador.

## Funcionalidades

- Operações de conversa e mídia, grupos, comunidades, canais e catálogo comercial.
- Eventos de conexão, configurações de perfil/privacidade, etiquetas e listas de conversas.
- Módulos exportados do WhatsApp com tipos e ferramentas de injeção no navegador.

## Primeiros passos

Use Node.js/npm para compilar e um navegador com WhatsApp Web para executar. O `package.json` declara WhatsApp Web `>=2.3000.1038792969-alpha`; cada recurso pode variar com as atualizações do WhatsApp.

```sh
git clone https://github.com/wppconnect-team/wa-js.git
cd wa-js
npm ci
npm run build:prd
npm run launch:local
```

O launcher abre um navegador com o bundle injetado. Após entrar na conta, execute o trecho no console de desenvolvimento dessa página para consultar o estado de autenticação:

```javascript
WPP.loader.onReady(() => {
  console.log(WPP.conn.isAuthenticated());
});
```

## Configuração

Defina `window.WPPConfig` antes da injeção para as opções de [src/config](src/config/). `WA_VERSION` seleciona uma versão em cache ou baixada pelo launcher local. Carregue apenas um bundle `WPP` padrão por página; as notas de referência explicam nomes globais personalizados.

## Documentação

- [Referência da API e eventos](https://wppconnect.io/wa-js/)
- [Módulos de código](./src/)
- [Detalhes técnicos e agradecimentos preservados](documentation/readme-reference.md)

## Ecossistema WPPConnect

| Projeto | Finalidade | Quando usar |
| --- | --- | --- |
| [WPPConnect](https://github.com/wppconnect-team/wppconnect) | Controle o WhatsApp Web em aplicações Node.js. | Incorporar automação a uma aplicação Node.js. |
| [Wppconnect Extension](https://github.com/wppconnect-team/wppconnect-extension) | Envie mensagens e anexos configurados por uma extensão Chrome para WhatsApp Web. | Usar uma interface Chrome sobre WA-JS. |
| [WPPConnect/WA-JS API SERVER](https://github.com/wppconnect-team/wa-js-api-server) | Forneça metadados de preview de URLs e payloads PNG para integrações WA-JS. | Oferecer um serviço auxiliar de preview de links. |
| [WPPConnect/WA-Version](https://github.com/wppconnect-team/wa-version) | Acompanhe versões do WhatsApp Web e obtenha o conteúdo de páginas armazenadas. | Investigar compatibilidade entre versões do WhatsApp Web. |

## Apoie o projeto

A WPPConnect é mantida por uma comunidade de código aberto. Seu apoio ajuda a financiar a manutenção, a infraestrutura, a documentação e o trabalho das pessoas que desenvolvem o ecossistema.

Se a WPPConnect ajuda seu projeto ou sua empresa, considere fazer uma contribuição pontual ou apoiar de forma recorrente.

**[Apoie a WPPConnect no Open Collective](https://opencollective.com/wppconnect)**

As contribuições são voluntárias. Consulte a página oficial para acompanhar as informações financeiras atuais. Você também pode ajudar com código, testes, documentação, traduções e relatos de problemas bem descritos.

Beneficiários oficiais adicionais em [.github/FUNDING.yml](.github/FUNDING.yml): [joaosouz4dev](https://github.com/sponsors/joaosouz4dev), [manfe](https://github.com/sponsors/manfe).

## Como contribuir

Contribuições de código, testes, exemplos, documentação e traduções são bem-vindas. Para mudanças maiores, discuta a proposta em uma issue primeiro. Ao relatar um problema, informe as versões do projeto/runtime, uma reprodução mínima e logs sem dados sensíveis. Atualize `README.md` e `README.pt-BR.md` na mesma alteração quando mudar instalação, configuração, funcionalidades, exemplos, licença ou arrecadação.

Após instalar as dependências de desenvolvimento, use as verificações pertinentes à sua alteração:

```sh
npm run build:prd
npm run lint
npm test
```

Exemplos e testes que dependem de conta exigem validação separada com uma conta de teste autorizada. Nunca anexe credenciais ou arquivos de sessão a uma issue.

## Comunidade e suporte

Use as [issues do repositório](https://github.com/wppconnect-team/wa-js/issues) para bugs reproduzíveis e propostas de funcionalidades. Para dúvidas de uso, participe pelos canais oficiais:

- [Discord](https://discord.gg/JU5JGGKGNG)
- [Telegram](https://t.me/wppconnect)
- [YouTube](https://www.youtube.com/c/wppconnect)

Este projeto é independente e não é afiliado nem endossado pelo WhatsApp ou pela Meta. Siga os termos aplicáveis e obtenha autorização para operações de conta e mensagens.

## Licença

[Apache License 2.0 (Apache-2.0)](./LICENSE).

Copyright 2021 WPPConnect Team.

O documento jurídico original e os avisos de autoria existentes são preservados. Componentes de terceiros mantêm seus próprios termos.
