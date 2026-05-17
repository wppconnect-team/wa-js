# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WA-JS (`@wppconnect/wa-js`) is a browser injection library that extracts and wraps WhatsApp Web's internal functions, exposing them as a stable public API (`window.WPP`). It is bundled as a UMD library and injected into the WhatsApp Web page at runtime.

## Commands

```bash
# Build
npm run build:prd        # Production build (minified) → dist/wppconnect-wa.js
npm run build:dev        # Development build (inline source maps)
npm run build:watch      # Watch mode

# Lint
npm run lint             # ESLint + Prettier check

# Docs
npm run docs:build       # Generate TypeDoc API docs

# Local development
npm run build:dev && WA_VERSION=latest npm run launch:local
npm run build:dev && WA_VERSION=<version> npm run launch:local
# Available versions listed in node_modules/@wppconnect/wa-version/html/

# WA source — download bundles (alpha included)
npm run wa-source:populate                          # latest 20 versions (default)
npm run wa-source:populate -- --all                # all versions
npm run wa-source:populate -- --version <version>  # single version
npm run wa-source:populate -- --force              # re-download existing

# WA source — format before debugging internals (see Debugging section)
npm run wa-source:format <version>
```

Available versions (alpha included) are listed in `node_modules/@wppconnect/wa-version/html/`.

## Architecture

### Loader System

The most critical piece. `src/loader/` detects which WhatsApp module system is active and exposes WhatsApp's internal modules to the rest of WA-JS:

- **Meta loader** (WA >= 2.3000.0): Uses `global.require()` with `ErrorGuard.skipGuardGlobal()`
- **Webpack loader** (legacy): Intercepts webpack chunk callbacks at startup

All `src/whatsapp/` imports resolve through this loader system at runtime.

### Module Layout

`src/index.ts` is the entry point and re-exports all feature modules. Each feature module (e.g. `src/chat/`, `src/group/`) follows this internal pattern:

```
<feature>/
├── index.ts          # Re-exports functions and registers patches/events
├── types.ts          # TypeScript types for the feature
├── patch.ts          # Monkey-patches WhatsApp internals (if needed)
├── functions/        # One file per exported function
└── events/           # Event registration and re-emission
```

### `src/whatsapp/`

Low-level bindings to WhatsApp Web's internals, organized by type:
- `models/` — WhatsApp data model classes (Chat, Message, Contact, etc.)
- `collections/` — Backbone-style collections of models
- `stores/` — Singleton global collection instances
- `functions/` — Raw WhatsApp functions extracted from the bundle
- `enums/` — WhatsApp enumerations
- `multidevice/` — Multi-device protocol
- `websocket/` — WebSocket layer

These are **not part of the public API**. Feature modules in `src/<feature>/` wrap them.

### Build Output

Webpack bundles everything into a single UMD file (`dist/wppconnect-wa.js`) exposing the global `WPP`. The `src/tools/` directory contains development utilities (not included in the bundle).

## Debugging WhatsApp Internals

When a WA-JS function breaks after a WhatsApp Web update, the root cause is almost always one of:

- A function was **moved to a different internal module**
- A function was **renamed**
- Arguments changed from **positional to named params** (or vice versa)

### Workflow

**Before inspecting any WhatsApp source**, the bundles must be downloaded and formatted:

1. Download bundles for the target version (if not already done). The default run fetches the latest 20 versions; for an older one pass `--version`:
   ```bash
   npm run wa-source:populate                          # latest 20 (usually sufficient)
   npm run wa-source:populate -- --version <version>  # specific older version
   ```
2. Format so identifiers and structure are readable:
   ```bash
   npm run wa-source:format <version>
   ```

> **Fresh debug session:** If you haven't worked on this WA version before, confirm with the user that they have run both commands above for that version before proceeding. Do not attempt to read `wa-source/<version>/` without the formatted source in place.

Once formatted, search the WA source for the function or module in question, compare old vs. new signatures, and update the corresponding binding in `src/whatsapp/`.

## Version Compatibility

Fixes must support both the new WhatsApp Web version and older versions still listed in `node_modules/@wppconnect/wa-version/html/`.

If a workaround is only needed for older versions, mark it with a TODO so it gets cleaned up once those versions are no longer available:

```ts
// TODO: remove when <version> is no longer available in wa-version/html
```

## Code Conventions

- Node version: 24 (see `.nvmrc`)
- TypeScript strict mode enabled; decorators enabled
- ESLint enforces import ordering (`simple-import-sort`) and file headers
- Prettier: single quotes, trailing commas (ES5)
- Commit messages follow Conventional Commits (enforced by commitlint)
- Pre-commit: lint-staged runs ESLint on staged files
