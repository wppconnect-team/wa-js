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

- `WPP.loader` - Scripts to export WhatsApp functions.
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

`WPP.conn.getStreamData` - Get current stream mode and info (connection state)

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

### Newsletter (Channels) Functions

`WPP.newsletter.create` - Create a new newsletter (WhatsApp Channel)

`WPP.newsletter.edit` - Edit an existing newsletter (name, description, picture)

`WPP.newsletter.destroy` - Delete a newsletter you own

`WPP.newsletter.follow` / `WPP.newsletter.unfollow` - Follow or unfollow a newsletter

`WPP.newsletter.mute` - Mute notifications from a newsletter

`WPP.newsletter.search` - Search newsletters by name or country

`WPP.newsletter.getSubscribers` - Get the subscriber list of a newsletter you own

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.newsletter).sort()`

### Community Functions

`WPP.community.create` - Create a new community

`WPP.community.deactivate` - Deactivate (delete) a community

`WPP.community.addSubgroups` - Add existing groups as subgroups of a community

`WPP.community.removeSubgroups` - Remove subgroups from a community

`WPP.community.getSubgroups` - Get all subgroups of a community

`WPP.community.getParticipants` - Get all participants across the community

`WPP.community.getAnnouncementGroup` - Get the announcement group of a community

`WPP.community.promoteParticipants` / `WPP.community.demoteParticipants` - Promote or demote community admins

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.community).sort()`

### Catalog Functions

`WPP.catalog.getMyCatalog` - Get the catalog of the connected business account

`WPP.catalog.getProducts` - Get products of any business contact

`WPP.catalog.getProductById` - Get a single product by id

`WPP.catalog.createProduct` - Create a new product in your catalog

`WPP.catalog.editProduct` - Edit an existing product

`WPP.catalog.delProducts` - Delete one or more products

`WPP.catalog.addProductImage` / `WPP.catalog.changeProductImage` / `WPP.catalog.removeProductImage` - Manage product images

`WPP.catalog.setProductVisibility` - Show or hide a product

`WPP.catalog.createCollection` / `WPP.catalog.editCollection` / `WPP.catalog.deleteCollection` / `WPP.catalog.getCollections` - Manage product collections

`WPP.catalog.updateCartEnabled` - Enable or disable cart for the catalog

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.catalog).sort()`

### Cart Functions

`WPP.cart.add` - Add a product to the cart of a business chat

`WPP.cart.update` - Update the quantity of an item in the cart

`WPP.cart.remove` - Remove an item from the cart

`WPP.cart.get` - Get the current cart for a business chat

`WPP.cart.clear` - Empty the cart

`WPP.cart.submit` - Submit the cart and send the order

`WPP.cart.getThumbFromCart` - Get the cart thumbnail preview

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.cart).sort()`

### Order Functions

`WPP.order.get` - Get the details of an order received in a chat

`WPP.order.accept` - Accept an order

`WPP.order.decline` - Decline an order

`WPP.order.update` - Update an order (e.g. change status)

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.order).sort()`

### Status Functions

`WPP.status.sendTextStatus` - Post a text status

`WPP.status.sendImageStatus` - Post an image status

`WPP.status.sendVideoStatus` - Post a video status

`WPP.status.sendReadStatus` - Mark a status as seen

`WPP.status.get` - Get the status feed of a contact

`WPP.status.getMyStatus` - Get your own status feed

`WPP.status.remove` - Remove one of your statuses

`WPP.status.updateParticipants` - Update who can see your statuses

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.status).sort()`

### Labels Functions

`WPP.labels.getAllLabels` - Get every label defined in the account

`WPP.labels.getLabelById` - Get a label by id

`WPP.labels.addNewLabel` - Create a new label

`WPP.labels.editLabel` - Rename or recolor a label

`WPP.labels.deleteLabel` - Delete a single label

`WPP.labels.deleteAllLabels` - Delete every label in the account

`WPP.labels.addOrRemoveLabels` - Apply or remove labels on chats / messages in bulk

`WPP.labels.getLabelColorPalette` / `WPP.labels.getNewLabelColor` - Helpers for label colors

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.labels).sort()`

### Profile Functions

`WPP.profile.getMyProfileName` / `WPP.profile.setMyProfileName` - Read or change your profile name

`WPP.profile.getMyStatus` / `WPP.profile.setMyStatus` - Read or change your "about" text

`WPP.profile.getMyProfilePicture` - Get your current profile picture

`WPP.profile.setMyProfilePicture` / `WPP.profile.removeMyProfilePicture` - Set or remove your profile picture

`WPP.profile.isBusiness` - Check whether the connected account is a Business account

`WPP.profile.editBusinessProfile` - Edit business profile fields (description, address, etc.)

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.profile).sort()`

### Privacy Functions

`WPP.privacy.get` - Get the current privacy settings as an object

`WPP.privacy.setLastSeen` - Configure who can see your "last seen"

`WPP.privacy.setOnline` - Configure who can see when you are online

`WPP.privacy.setProfilePic` - Configure who can see your profile picture

`WPP.privacy.setReadReceipts` - Enable or disable read receipts

`WPP.privacy.setStatus` - Configure who can see your status updates

`WPP.privacy.setAbout` - Configure who can see your "about" text

`WPP.privacy.setAddGroup` - Configure who can add you to groups

`WPP.privacy.getDisallowedList` - Get the disallowed list (used together with `setAddGroup` / `setStatus` when set to `contact_blacklist`)

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.privacy).sort()`

### Labels vs Lists

WhatsApp has two separate chat-organization features that share the same internal infrastructure but serve different purposes:

| | `WPP.labels` | `WPP.lists` |
|---|---|---|
| **Account** | Business only | Personal + Business |
| **Purpose** | Tag chats for CRM workflows (e.g. "New lead", "Pending") | Group chats into named tabs (e.g. "Family", "Work") |
| **Visible as** | Colored label chips on chats | Tabs at the top of the chat list |
| **API guard** | `assertIsBusiness()` — throws on personal accounts | No business check |

Use `WPP.labels` for business label management. Use `WPP.lists` to create and manage chat grouping lists on any account type.

#### Lists Functions

`WPP.lists.create` - Create a new list

`WPP.lists.list` - Get all custom lists

`WPP.lists.addChats` - Add chats to a list

`WPP.lists.removeChats` - Remove chats from a list

`WPP.lists.rename` - Rename a list

`WPP.lists.remove` - Delete a list

For the most up-to-date list of available functions, launch the project locally and run this in your browser console:

`Object.keys(WPP.lists).sort()`

### Events

#### Connection Events

`WPP.on('conn.stream_mode_changed', callback)` - Triggered when the connection mode changes

Stream modes:
- `QR` - QR code is displayed, waiting for scan
- `MAIN` - Main interface is loaded and ready
- `SYNCING` - Syncing messages and data
- `OFFLINE` - Connection is offline
- `CONFLICT` - Login conflict detected
- `PROXYBLOCK` - Blocked by proxy
- `TOS_BLOCK` - Blocked for Terms of Service violation
- `SMB_TOS_BLOCK` - SMB blocked for Terms of Service violation
- `DEPRECATED_VERSION` - WhatsApp version is deprecated

```javascript
WPP.on('conn.stream_mode_changed', (mode) => {
  console.log('Connection mode:', mode);
  if (mode === 'MAIN') {
    console.log('WhatsApp is ready!');
  }
});
```

`WPP.on('conn.stream_info_changed', callback)` - Triggered when the internal connection state changes

Stream info states:
- `OFFLINE` - Connection is offline
- `OPENING` - Opening connection
- `PAIRING` - Pairing with phone
- `SYNCING` - Syncing messages
- `RESUMING` - Resuming connection
- `CONNECTING` - Connecting to server
- `NORMAL` - Normal operation

```javascript
WPP.on('conn.stream_info_changed', (info) => {
  console.log('Connection state:', info);
});
```

#### Chat Events

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

### Testing

The project ships a Playwright suite under `tests/`. Two flavours are available:

```bash
# Smoke tests — no QR scan needed.
# Loads the live wppconnect-wa.js bundle on web.whatsapp.com and verifies
# every public WPP module still exposes the functions documented above.
# Useful as an early-warning when WhatsApp Web ships an update that breaks
# our patches.
npm test -- tests/smoke.spec.ts

# Full test project (smoke + any other *.spec.ts)
npm test
```

Tests that need an authenticated session use the `loggedPage` fixture from
`tests/wpp-test.ts`. To bootstrap that session once (this opens a real
browser so you can scan the QR), run:

```bash
npm run test:prepare
```

The session is cached under your OS temp dir (`wa-js-test-<browser>`) and
reused by subsequent runs.

### Comparing WhatsApp Web Versions

To compare changes between two WhatsApp Web versions, use the helper script:

Note: You need to run locally in multiple versions to download the scripts to wa-source folder, otherwise will not have anything to compare. To do it use: `WA_VERSION="<version-here>" npm run launch:local`

```bash
# Compare two versions (overview of module differences)
./scripts/compare-wa-versions.sh 2.3000.1031980585 2.3000.1031992593

# Compare a specific module between versions
./scripts/compare-wa-versions.sh 2.3000.1031980585 2.3000.1031992593 WAWebUpdateUnreadChatAction

# List available versions
./scripts/compare-wa-versions.sh
```

This is useful for:
- Tracking API changes between WhatsApp Web updates
- Identifying when function signatures changed
- Finding new or removed modules

## Building with a custom global variable name

If you are developing an extension or automation tool that may run on the same WhatsApp Web page alongside other WA-JS-based projects, you can compile your own build of this library under a different global variable name to avoid conflicts.

### When to do this

By default, WA-JS exposes itself as `window.WPP`. If two tools built on WA-JS are injected into the same page using the default name, they will overwrite each other. Building under a custom name (e.g. `window.MYWPP`) ensures each tool owns its own isolated global.

### Steps

**1. Clone the repository and install dependencies**

```bash
git clone https://github.com/wppconnect-team/wa-js.git
cd wa-js
npm install
```

**2. Change the global variable name in `webpack.config.js`**

Find the `output.library` block and replace `'WPP'` with your chosen name:

```js
// webpack.config.js
output: {
  filename: 'wppconnect-wa.js',
  path: path.resolve(__dirname, 'dist'),
  library: {
    name: 'MYWPP', // <-- your custom global variable name
    type: 'global',
  },
},
```

**3. Update the pre-injection config key in `src/config/index.ts`**

Replace every occurrence of `WPPConfig` with `<YOURNAME>Config` (e.g. `MYWPPConfig`). There are three occurrences in that file:

```ts
// Before
interface Window { WPPConfig: Config; }
const setted = window.WPPConfig || {};
window.WPPConfig = config;

// After (using MYWPP as example)
interface Window { MYWPPConfig: Config; }
const setted = window.MYWPPConfig || {};
window.MYWPPConfig = config;
```

**4. Build the production bundle**

```bash
npm run build:prd
```

The compiled file will be available at:

```
dist/wppconnect-wa.js
```

### Result

When your custom build is injected into WhatsApp Web:

- The library is available as **`window.MYWPP`** (your chosen name).
- **`window.WPP` is not set** — there is no conflict with other WA-JS builds on the same page.
- Pre-injection configuration is read from **`window.MYWPPConfig`** instead of `window.WPPConfig`.

**Pre-injection usage example:**

```javascript
// Set this before injecting your custom build
window.MYWPPConfig = {
  deviceName: 'My Extension',
};

// After injection, use your custom global
window.MYWPP.loader.onReady(function () {
  console.log('My extension is ready');
});
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

  WPP.loader.onReady(function () {
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
