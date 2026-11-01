**English** | [Português (Brasil)](./README.pt-BR.md)

<p align="center">
  <a href="https://wppconnect.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://wppconnect-team.github.io/brand/v2/wppconnect-dark.png" />
      <img src="https://wppconnect-team.github.io/brand/v2/wppconnect-light.png" alt="WPPConnect" width="220" height="121" />
    </picture>
  </a>
</p>

# WPPConnect/WA-JS

Expose WhatsApp Web functions through the browser-side `WPP` API.

A project in the WPPConnect ecosystem, maintained by WPPConnect Team.

[Getting started](#getting-started) | [Documentation](#documentation) | [Contributing](#contributing) | [Support WPPConnect](#support-the-project)

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](./LICENSE) [![npm version](https://img.shields.io/npm/v/@wppconnect/wa-js)](https://www.npmjs.com/package/@wppconnect/wa-js) [![CI](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/wppconnect-team/wa-js/actions/workflows/build.yml) [![Open Collective](https://img.shields.io/badge/Open%20Collective-WPPConnect-blue)](https://opencollective.com/wppconnect)

## Overview

For extension and browser-integration developers who need to execute code inside WhatsApp Web. The generated `dist/wppconnect-wa.js` bundle exposes chat, contact, connection and other modules; it is not a Node.js WhatsApp client.

## Features

- Chat and media operations, groups, communities, channels and business catalog functions.
- Connection events, profile/privacy settings, labels and chat lists.
- Typed exported WhatsApp modules and browser-injection tooling.

## Getting started

Use Node.js/npm for the build and a browser with WhatsApp Web for execution. `package.json` declares WhatsApp Web `>=2.3000.1038792969-alpha`; individual capabilities may vary with WhatsApp updates.

```sh
git clone https://github.com/wppconnect-team/wa-js.git
cd wa-js
npm ci
npm run build:prd
npm run launch:local
```

The launcher opens a browser with the bundle injected. After signing in, evaluate this in that page's developer console to inspect the current authentication state:

```javascript
WPP.loader.onReady(() => {
  console.log(WPP.conn.isAuthenticated());
});
```

## Configuration

Set `window.WPPConfig` before injection for supported options in [src/config](src/config/). `WA_VERSION` selects a cached/downloaded version for the local launcher. Only load one default `WPP` bundle per page; the reference notes explain custom global names.

## Documentation

- [API reference and events](https://wppconnect.io/wa-js/)
- [Source modules](./src/)
- [Retained technical details and acknowledgments](documentation/readme-reference.md)

## WPPConnect ecosystem

| Project | Purpose | When to use it |
| --- | --- | --- |
| [WPPConnect](https://github.com/wppconnect-team/wppconnect) | Control WhatsApp Web from Node.js applications. | Embed automation in a Node.js application. |
| [Wppconnect Extension](https://github.com/wppconnect-team/wppconnect-extension) | Send configured messages and attachments through a Chrome extension for WhatsApp Web. | Use a Chrome UI over WA-JS. |
| [WPPConnect/WA-JS API SERVER](https://github.com/wppconnect-team/wa-js-api-server) | Serve URL-preview metadata and PNG payloads for WA-JS integrations. | Provide a companion link-preview service. |
| [WPPConnect/WA-Version](https://github.com/wppconnect-team/wa-version) | Track WhatsApp Web versions and retrieve stored page content. | Investigate WhatsApp Web version compatibility. |

## Support the project

WPPConnect is maintained by an open-source community. Your support helps fund maintenance, infrastructure, documentation, and the people working on the ecosystem.

If WPPConnect helps your project or business, consider making a one-time contribution or becoming a recurring supporter.

**[Support WPPConnect on Open Collective](https://opencollective.com/wppconnect)**

Contributions are voluntary. See the official page for current financial information. You can also help with code, tests, documentation, translations and well-described issue reports.

Additional official beneficiaries in [.github/FUNDING.yml](.github/FUNDING.yml): [joaosouz4dev](https://github.com/sponsors/joaosouz4dev), [manfe](https://github.com/sponsors/manfe).

## Contributing

Contributions of code, tests, examples, documentation and translations are welcome. For larger changes, discuss the approach in an issue first. Include the project/runtime versions, a minimal reproduction and sanitized logs when reporting a problem. Update both `README.md` and `README.pt-BR.md` in the same change when installation, configuration, features, examples, licensing or funding changes.

After installing the development dependencies, use the repository checks relevant to your change:

```sh
npm run build:prd
npm run lint
npm test
```

Account-dependent examples and tests require separate validation with an authorized test account. Never attach credentials or session files to an issue.

## Community and support

Use [repository issues](https://github.com/wppconnect-team/wa-js/issues) for reproducible bugs and feature proposals. For usage questions, join the community through the official channels:

- [Discord](https://discord.gg/JU5JGGKGNG)
- [Telegram](https://t.me/wppconnect)
- [YouTube](https://www.youtube.com/c/wppconnect)

This project is independent and is not affiliated with or endorsed by WhatsApp or Meta. Follow applicable terms and obtain authorization for account and messaging operations.

## License

[Apache License 2.0 (Apache-2.0)](./LICENSE).

Copyright 2021 WPPConnect Team.

The original legal document and existing copyright notices are preserved. Third-party components retain their own terms.
