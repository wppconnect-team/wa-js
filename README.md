# WPPConnect/WA-JS

[![npm version](https://img.shields.io/npm/v/@wppconnect/wa-js.svg?color=green)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Downloads](https://img.shields.io/npm/dm/@wppconnect/wa-js.svg)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect-team/wa-js 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect-team/wa-js 'Percentage of issues still open')

[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/build.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml)
[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/test.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/test.yml)
[![Lint Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/lint.yml??branch=main&label=lint)](https://github.com/wppconnect-team/wa-js/actions/workflows/lint.yml)
[![release-it](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-release--it-e10079.svg)](https://github.com/release-it/release-it)

> WPPConnect/WA-JS is an open-source project with the aim of exporting functions from WhatsApp Web, which can be used to support the creation of any interaction, such as customer service, media sending, intelligence recognition based on phrases artificial and many other things, use your imagination...

## Notas de versão e build

Para alterar o número de versão utilizado nos builds execute a atualização no campo `version` do arquivo [`package.json`](./package.json). Após ajustar o valor, recomenda-se rodar `npm install` (para atualizar o lockfile) e o comando de build desejado, por exemplo `npm run build:prd`. Caso utilize o fluxo de releases oficial, também é possível disparar `npm run release`, que aplica o `version bump`, atualiza o changelog e publica o pacote.

## Documentação das correções relacionadas à criação de chats

As alterações recentes garantem que mensagens enviadas para contatos sem histórico local criem o chat e preencham corretamente o **LID** antes da persistência. Os principais pontos são:

- `src/chat/patch.ts` intercepta `createChatRecord` para preencher `accountLid` com o LID resolvido a partir do contato ou via `queryExists`, além de tentar novamente a gravação em caso de erros transitórios. O mesmo arquivo mantém uma cache simples de LIDs em `ContactStore` e preserva os patches já existentes para conversão de LIDs.
- `src/chat/functions/sendRawMessage.ts` tenta novamente obter o chat via `assertFindChat` quando `assertGetChat` lança `InvalidChat`, permitindo que mensagens de texto abram novos chats automaticamente.
- `src/chat/functions/sendFileMessage.ts` replica a lógica de fallback para `InvalidChat`, permitindo que o envio de arquivos também gere o chat quando necessário.
- `src/whatsapp/models/ContactModel.ts` expõe a propriedade opcional `lid`, possibilitando armazenar o identificador resolvido do contato no cache local.

Com essas mudanças, chamar `WPP.contact.queryExists('<numero>@c.us')` antes da primeira mensagem garante que o LID esteja disponível e evita falhas de persistência ao enviar textos ou arquivos.

### Criando uma biblioteca própria mais estável

Para reutilizar essas proteções em uma biblioteca personalizada (por exemplo, quando você cria um _wrapper_ com todas as funções do `WPP.chat`), utilize os _helpers_ expostos em `src/chat/helpers/ensureChat.ts` e `src/chat/helpers/resolveChatLid.ts`:

1. Sempre que for recuperar um chat antes de enviar qualquer mensagem, chame `ensureChat(chatId, { createChat: true/false })`. Esse helper unifica a lógica de _fallback_ (`assertGetChat` → `assertFindChat`) e garante que o LID seja resolvido automaticamente.
2. Caso precise sincronizar o LID manualmente (por exemplo, em rotinas batch), você pode chamar `resolveChatLid(chatId)` diretamente. A função mantém um cache interno e atualiza o `ContactStore`, evitando chamadas duplicadas ao servidor.
3. Nas suas funções de envio, reutilize o mesmo chat retornado por `ensureChat` para montar a mensagem e seguir com `sendRawMessage`/`sendFileMessage`. Isso garante que a conversa já esteja pronta para persistir no IndexedDB sem erros de `Lid is missing`.

Exportamos os helpers no pacote principal (`import { ensureChat } from 'wppconnect/wa-js/chat'`), o que facilita a criação de uma API estável sem duplicar código interno.

## Our online channels

[![Discord](https://img.shields.io/discord/844351092758413353?color=blueviolet&label=Discord&logo=discord&style=flat)](https://discord.gg/JU5JGGKGNG)
[![YouTube](https://img.shields.io/youtube/channel/subscribers/UCD7J9LG08PmGQrF5IS7Yv9A?label=YouTube)](https://www.youtube.com/c/wppconnect)
[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/LJaQu6ZyNvnBPNAVRbX00K)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/wppconnect)


### Top Contributors (last 45 days) widget
---
![Top Contributors (Last 45 days) widget](https://embeddables.devactivity.com/orgs/wppconnect-team/508ecbcd-e55e-4e31-a647-6674f134b5bf.svg)
---
<sup><sub>Check also our [Public Dashboard](https://app.devactivity.com/public/?organizationLogin=wppconnect-team) powered by [devActivity](https://devactivity.com/?ref=public_widget)</sub></sup>

## How does it work

This project extract some functions of WhatsApp sources, that uses webpack.

After build, this project generate a file `dist/wppconnect-wa.js` to be used for injection in WhatsApp Web. When injected, it will explose a global variable named `WPP`.

Some parts of `WPP` variable:

- `WPP.webpack` - Scripts to exports WhatsApp functions.
- `WPP.whatsapp` - Only exported WhatsApp functions.
- `WPP.chat` - Chat functions and events.
- ...

## Exported WhatsApp modules

There are a convection name for some exported modules:

- `...Model` - Class for data structure (`ClassModel`, `MsgModel`)
- `...Collection` - Class for collection of models (`ChatCollection`, `MsgCollection`)
- `...Store` - Default and global instance of a collection (`ChatStore`, `MsgStore`)

## Some Available functions
### General Functions
`WPP.conn.connect` - Connect to WhatsApp Web

`WPP.conn.isAuthenticated` - Check if the connection is authenticated

`WPP.conn.logout` - Logout from WhatsApp Web

### Chat Functions
`WPP.chat.sendTextMessage` - Send a text message

`WPP.chat.sendImageMessage` - Send an image message

`WPP.chat.sendVideoMessage` - Send a video message

`WPP.chat.sendFileMessage` - Send a file message

`WPP.chat.sendAudioMessage` - Send an audio message

`WPP.chat.getChat` - Get chat details

`WPP.chat.deleteMessage` - Delete a message

### Contact Functions
`WPP.contact.getContact` - Get contact details

`WPP.contact.blockContact` - Block a contact

`WPP.contact.unblockContact` - Unblock a contact

`WPP.contact.getAllContacts` - Get all contacts

### Group Functions
`WPP.group.createGroup` - Create a new group

`WPP.group.addParticipant` - Add a participant to a group

`WPP.group.removeParticipant` - Remove a participant from a group.

`WPP.group.promoteParticipant` - Promote a participant to admin

`WPP.group.demoteParticipant` - Demote a participant from admin.

`WPP.group.getGroupInfoFromInviteCode` - Get group information from an invitation link or an invite code.

### Events
`WPP.chat.on('chat.new_message')` - Event to dispatch on receive a new message

To see all events, check: [https://wppconnect.io/wa-js/types/ev.EventTypes.html](https://wppconnect.io/wa-js/types/ev.EventTypes.html)

## Development

Steps to run locally:

```bash
# install the depencencies
npm install

# download whatsapp javascript and prettify (optional)
npm run wa-source

# build javascript files
npm run build:prd # or build:dev for development

# launch a local browser with automatic injection
npm run launch:local

# or only run in VSCode
```

## How to use this project

Basicaly, you need to inject the `wppconnect-wa.js` file into the browser after WhatsApp page load.

### TamperMonkey or GreaseMonkey

```javascript
// ==UserScript==
// @name         WA-JS Teste
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simple example of WA-JS
// @author       You
// @match        https://web.whatsapp.com/*
// @icon         https://www.google.com/s2/favicons?domain=whatsapp.com
// @require      https://github.com/wppconnect-team/wa-js/releases/download/nightly/wppconnect-wa.js
// @grant        none
// ==/UserScript==

/* globals WPP */

(function () {
  'use strict';

  WPP.webpack.onReady(function () {
    alert('Ready to use WPPConnect WA-JS');
  });

  // Your code here...
})();
```

### Playwright

```typescript
import * as playwright from 'playwright-chromium';

async function start() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://web.whatsapp.com/');

  await page.addScriptTag({
    path: require.resolve('@wppconnect/wa-js'),
  });

  // Wait WA-JS load
  await page.waitForFunction(() => window.WPP?.isReady);

  // Evaluating code: See https://playwright.dev/docs/evaluating/
  const isAuthenticated: string = await page.evaluate(() =>
    WPP.conn.isAuthenticated()
  );

  // Sending message: See https://playwright.dev/docs/evaluating/
  const sendResult: string = await page.evaluate(
    (to, message) => WPP.chat.sendTextMessage(to, message),
    to,
    message
  );
}

start();
```

## License

Copyright 2021 WPPConnect Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
