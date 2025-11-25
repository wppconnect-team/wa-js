# WPPConnect/WA-JS

[![npm version](https://img.shields.io/npm/v/@wppconnect/wa-js.svg?color=green)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Downloads](https://img.shields.io/npm/dm/@wppconnect/wa-js.svg)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect-team/wa-js 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect-team/wa-js 'Percentage of issues still open')

[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/build.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml)
[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/test.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/test.yml)
[![Lint Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/lint.yml??branch=main&label=lint)](https://github.com/wppconnect-team/wa-js/actions/workflows/lint.yml)
[![release-it](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-release--it-e10079.svg)](https://github.com/release-it/release-it)

> WPPConnect/WA-JS is an open-source project with the aim of exporting functions from WhatsApp Web, which can be used to support the creation of any interaction, such as customer service, media sending, intelligence recognition based on phrases and many other things, use your imagination...

## Our online channels

[![Discussions](https://img.shields.io/github/discussions/wppconnect-team/wa-js?label=Discussions&logo=github)](https://github.com/wppconnect-team/wa-js/discussions)
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

This project extracts some functions of WhatsApp sources.

After build, this project generates a file `dist/wppconnect-wa.js` to be used for injection in WhatsApp Web. When injected, it will expose a global variable named `WPP`.

Some parts of `WPP` variable:

- `WPP.webpack` - Scripts to export WhatsApp functions.
- `WPP.whatsapp` - Only exported WhatsApp functions.
- `WPP.chat` - Chat functions and events.
- ...

## Exported WhatsApp modules

There are convention names for some exported modules:

- `...Model` - Class for data structure (`ClassModel`, `MsgModel`)
- `...Collection` - Class for collection of models (`ChatCollection`, `MsgCollection`)
- `...Store` - Default and global instance of a collection (`ChatStore`, `MsgStore`)

## Some Available functions
### General Functions
`WPP.conn.connect` - Connect to WhatsApp Web

`WPP.conn.isAuthenticated` - Check if the connection is authenticated

`WPP.conn.logout` - Logout from WhatsApp Web

`WPP.conn.getBuildConstants` - Current WhatsApp build constants

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.conn).sort()`

### Chat Functions
`WPP.chat.sendTextMessage` - Send a text message

`WPP.chat.sendFileMessage` - Send a file message (medias in general [video, audio, image, pdf])

`WPP.chat.get` - Get chat details

`WPP.chat.deleteMessage` - Delete a message

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.chat).sort()`

### Contact Functions
`WPP.contact.get` - Get contact details

`WPP.contact.getAllContacts` - Get all contacts

`WPP.contact.getStatus` - Get status (`about` field in profile)

`WPP.contact.getCommonGroups` - Get groups in common with one contact

`WPP.contact.getPnLidEntry` - Get PN (Phone Number), Lid and Contact from local cache

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.contact).sort()`

### Blocklist Functions

`WPP.blocklist.blockContact` - Block a contact

`WPP.blocklist.unblockContact` - Unblock a contact

`WPP.blocklist.all` - All blocked contacts

`WPP.blocklist.isBlocked` - Check if contact is blocked

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.blocklist).sort()`

### Group Functions

`WPP.group.create` - Create a new group

`WPP.group.canAdd` - Check if contact can be added to group

`WPP.group.addParticipants` - Add participants to a group

`WPP.group.removeParticipants` - Remove participants from a group.

`WPP.group.canPromote` - Check if contact can be promoted

`WPP.group.promoteParticipants` - Promote participants to admin

`WPP.group.canDemote` - Check if contact can be demoted

`WPP.group.demoteParticipants` - Demote participants from admin.

`WPP.group.getGroupInfoFromInviteCode` - Get group information from an invitation link or an invite code.

`WPP.group.getAllGroups` - Get all groups

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.group).sort()`

### Events
`WPP.chat.on('chat.new_message')` - Event to dispatch on receive a new message

To see all events, check: [https://wppconnect.io/wa-js/types/ev.EventTypes.html](https://wppconnect.io/wa-js/types/ev.EventTypes.html)

## Development

Steps to run locally:

```bash
# install the dependencies
npm install

# build javascript files
npm run build:prd # or build:dev for development

# launch a local browser with automatic injection
# this will also cache the files inside wa-source directory, for next requests
npm run launch:local

# or only run in VSCode
```

Note: to run specific versions run:

```sh
npm run wa-source:clean

npm run build:prd

WA_VERSION="2.3000.1029560485" npm run launch:local
```

To debug or inspect `wa-source` folder, format the files to be easier to understand

```sh
npm run wa-source:format
```

## How to use this project

Basically, you need to inject the `wppconnect-wa.js` file into the browser after WhatsApp page load.

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
