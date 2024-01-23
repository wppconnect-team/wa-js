# WPPConnect/WA-JS

[![npm version](https://img.shields.io/npm/v/@wppconnect/wa-js.svg?color=green)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Downloads](https://img.shields.io/npm/dm/@wppconnect/wa-js.svg)](https://www.npmjs.com/package/@wppconnect/wa-js)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect/wa-js 'Average time to resolve an issue')
[![Percentage of issues still open](https://isitmaintained.com/badge/open/wppconnect-team/wa-js.svg)](https://isitmaintained.com/project/wppconnect/wa-js 'Percentage of issues still open')

[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/build.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml)
[![Build Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/test.yml?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/test.yml)
[![Lint Status](https://img.shields.io/github/actions/workflow/status/wppconnect-team/wa-js/lint.yml??branch=main&label=lint)](https://github.com/wppconnect-team/wa-js/actions/workflows/lint.yml)
[![release-it](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-release--it-e10079.svg)](https://github.com/release-it/release-it)

> WPPConnect/WA-JS is an open-source project with the aim of exporting functions from WhatsApp Web, which can be used to support the creation of any interaction, such as customer service, media sending, intelligence recognition based on phrases artificial and many other things, use your imagination...

## Our online channels

[![Discord](https://img.shields.io/discord/844351092758413353?color=blueviolet&label=Discord&logo=discord&style=flat)](https://discord.gg/JU5JGGKGNG)
[![Telegram Group](https://img.shields.io/badge/Telegram-Group-32AFED?logo=telegram)](https://t.me/wppconnect)
[![WhatsApp Group](https://img.shields.io/badge/WhatsApp-Group-25D366?logo=whatsapp)](https://chat.whatsapp.com/LJaQu6ZyNvnBPNAVRbX00K)
[![YouTube](https://img.shields.io/youtube/channel/subscribers/UCD7J9LG08PmGQrF5IS7Yv9A?label=YouTube)](https://www.youtube.com/c/wppconnect)

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

## Development

Steps to run locally:

```bash
# install the depencencies
npm install

# download whatsapp javascript and prettify (optional)
npm run wa-source

# build javascript files
npm run build:prd # or build:dev for development

# lauch a local browser with automatic injection
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
