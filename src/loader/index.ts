/*!
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Debug from 'debug';

import { internalEv } from '../eventEmitter';
import { META_MODULE_ID_BLACKLIST } from './blacklist';
import { LAZY_MODULES, MAX_DISCOVERED_COMPONENTS } from './lazyModules';

const debug = Debug('WA-JS:loader');

/**
 * Is setted true when the loader is injected
 */
export let loaderType: 'meta' | 'unknown' | 'webpack' = 'unknown';

/**
 * Is setted true when the loader is injected
 */
export let isInjected = false;

/**
 * Is setted true when the main loader modules are fully loaded
 */
export let isReady = false;

/**
 * Is setted true when the all loader modules are fully loaded
 */
export let isFullReady = false;

export function onInjected(listener: () => void, delay = 0): void {
  internalEv.on('loader.injected', () => {
    setTimeout(listener, delay);
  });
}

export function onReady(listener: () => void, delay = 0): void {
  internalEv.on('loader.ready', () => {
    setTimeout(listener, delay);
  });
}

export function onFullReady(listener: () => void, delay = 0): void {
  internalEv.on('loader.full_ready', () => {
    setTimeout(listener, delay);
  });
}

export type SearchModuleCondition = (module: any, moduleId: string) => boolean;

export const __debug = () => {
  const global = (self || window) as any;

  return global.require('__debug') as {
    modulesMap: { [key: string]: any };
  };
};

export let moduleRequire: (<T = any>(moduleId: string) => T) & {
  /**
   * module list
   */
  m: { [key: string]: any };
  /**
   * the filename of the script part of the chunk
   */
  u: (id: string) => string;
  /**
   * the chunk ensure function
   */
  e: (id: string) => Promise<void>;
};

/**
 * Fallback modules for forward compatibility
 */
export const fallbackModules: { [key: string]: any } = {};

const waitMainInit = internalEv.waitFor('conn.main_init');
const waitMainReady = internalEv.waitFor('conn.main_ready');

/**
 * Cached snapshot of the filtered Meta modulesMap.
 * Rebuilt only when the upstream module count changes.
 */
let metaModulesCache: { [key: string]: any } | null = null;
let metaModulesCacheKey = -1;

function buildMetaModulesMap(): { [key: string]: any } {
  const modulesMap = __debug().modulesMap;
  const allIds = Object.keys(modulesMap);

  if (metaModulesCache && allIds.length === metaModulesCacheKey) {
    return metaModulesCache;
  }

  const result: { [key: string]: any } = {};
  for (const id of allIds) {
    if (!/^(?:use)?WA/.test(id) || META_MODULE_ID_BLACKLIST.has(id)) {
      continue;
    }
    result[id] = modulesMap[id]?.factory;
  }

  metaModulesCache = result;
  metaModulesCacheKey = allIds.length;
  return result;
}

/**
 * Wait until `predicate()` returns truthy, with exponential backoff.
 * Resolves with the truthy value, or `null` if the timeout elapses.
 */
async function waitUntil<T>(
  predicate: () => T | null | undefined | false,
  { timeout = 30_000, initialDelay = 50, maxDelay = 500 } = {}
): Promise<T | null> {
  const deadline = Date.now() + timeout;
  let delay = initialDelay;
  // Try once before sleeping
  let value = predicate();
  if (value) return value;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, delay));
    value = predicate();
    if (value) return value;
    delay = Math.min(maxDelay, Math.floor(delay * 1.5));
  }
  return null;
}

/**
 * Wait until WhatsApp's Meta module graph stops growing for a quiet window.
 *
 * On a cold load (empty cache / hard reload / reconnection) WhatsApp registers
 * its modules progressively, often well after the loader is injected. Firing
 * `loader.injected` too early runs the onInjected callbacks — e.g.
 * `registerStreamEvent`, which does `Stream.on('change:mode', ...)` — before
 * their store modules exist, permanently pinning those getters to `undefined`.
 * That breaks the `conn.stream_mode_changed` -> `conn.main_ready` chain, so
 * `isFullReady`/`isReady` never become true (root cause of #3419 / #3481).
 *
 * Waiting for the module set to settle lets those callbacks see live modules.
 */
async function waitForMetaModulesSettle({
  quiet = 750,
  timeout = 20_000,
  poll = 100,
}: { quiet?: number; timeout?: number; poll?: number } = {}): Promise<void> {
  const moduleCount = (): number => {
    try {
      return Object.keys(__debug().modulesMap).length;
    } catch {
      return 0;
    }
  };

  const deadline = Date.now() + timeout;
  let last = moduleCount();
  let lastChangeAt = Date.now();

  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, poll));
    const current = moduleCount();
    if (current !== last) {
      last = current;
      lastChangeAt = Date.now();
    } else if (current > 0 && Date.now() - lastChangeAt >= quiet) {
      debug(`meta modules settled at ${current} (quiet ${quiet}ms)`);
      return;
    }
  }
  debug(`meta modules settle timed out after ${timeout}ms (count ${last})`);
}

/**
 * Install setter traps on `global.__d` and `global.require` so the Meta
 * loader is started the moment WhatsApp assigns either of those globals.
 *
 * Falls back to a 250ms poll for environments where the trap cannot be
 * installed (e.g., the globals are non-configurable or already set).
 */
function setupMetaLoaderWatcher(global: any): void {
  const tryStart = () => {
    if (loaderType !== 'unknown') return;
    if (!global.require || !global.__d) return;
    void runMetaLoader(global);
  };

  if (global.require && global.__d) {
    tryStart();
    return;
  }

  const installTrap = (prop: '__d' | 'require') => {
    const existing = Object.getOwnPropertyDescriptor(global, prop);
    if (existing && existing.configurable === false) return false;
    let value: any = existing?.value;
    try {
      Object.defineProperty(global, prop, {
        configurable: true,
        enumerable: true,
        get() {
          return value;
        },
        set(v) {
          value = v;
          tryStart();
        },
      });
      return true;
    } catch {
      return false;
    }
  };

  const trappedD = installTrap('__d');
  const trappedReq = installTrap('require');

  // Fallback poll – cheap safety net if the traps could not be installed
  // or were overwritten with a non-configurable property by the host.
  const fallbackTimer = setInterval(() => {
    if (loaderType !== 'unknown') {
      clearInterval(fallbackTimer);
      return;
    }
    tryStart();
  }, 250);

  // Stop the fallback after 60s; by then either the loader started or
  // it never will on this page.
  setTimeout(() => clearInterval(fallbackTimer), 60_000);

  if (!trappedD || !trappedReq) {
    debug('meta loader: setter trap unavailable, relying on fallback poll');
  }
}

async function runMetaLoader(global: any): Promise<void> {
  if (loaderType !== 'unknown') return;
  loaderType = 'meta';

  // A wrap to work like webpack
  moduleRequire = function (id: string) {
    try {
      global.ErrorGuard.skipGuardGlobal(true);
      return global.importNamespace(id);
    } catch (_error) {}
    return null;
  } as any;

  Object.defineProperty(moduleRequire, 'm', {
    get: () => buildMetaModulesMap(),
  });

  // Cold-load fix (#3419 / #3481): wait for WhatsApp's module graph to settle
  // before firing the injected callbacks. Otherwise store getters accessed by
  // those callbacks (e.g. registerStreamEvent's `Stream.on(...)`) get pinned to
  // `undefined` while their module is still pending registration, which breaks
  // the `conn.main_ready` chain and leaves `isReady` stuck at false.
  await waitForMetaModulesSettle();

  isInjected = true;
  debug('injected');
  await internalEv.emitAsync('loader.injected').catch(() => null);

  await waitMainInit;

  // Replace the legacy 1s sleep with a condition-based wait: poll until a
  // well-known core module is resolvable. This is typically much faster
  // than 1s but caps at 5s to preserve the original safety margin.
  const ready = await waitUntil(
    () => {
      try {
        return moduleRequire('WAWebUserPrefsMeUser');
      } catch {
        return null;
      }
    },
    { timeout: 5_000, initialDelay: 25, maxDelay: 250 }
  );
  if (!ready) {
    debug('meta loader: core module not resolvable within 5s, continuing');
  }

  isReady = true;
  debug('ready to use');
  await internalEv.emitAsync('loader.ready').catch(() => null);

  if ((window as any).wppForceMainLoad) {
    debug('wppForceMainLoad is set, waiting 5 seconds');
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } else {
    debug('waiting main ready');
    await waitMainReady;
  }
  isFullReady = true;
  debug('full ready to use');
  await internalEv.emitAsync('loader.full_ready').catch(() => null);
}

export function injectLoader(): void {
  if (isInjected) {
    return;
  }

  const global = (self || window) as any;

  /* BEGIN: For WhatsApp >= 2.3000.0 */
  setupMetaLoaderWatcher(global);
  /* END: For WhatsApp >= 2.3000.0 */

  const chunkName = 'webpackChunkwhatsapp_web_client';

  const chunk = global[chunkName] || [];
  if (!chunk || chunk?.length === 0) {
    Object.defineProperty(global, chunkName, chunk);
  } else {
    loaderType = 'webpack';
  }

  const injectFunction = async (__webpack_require__: any) => {
    loaderType = 'webpack';
    moduleRequire = __webpack_require__;

    isInjected = true;
    debug('injected');
    await internalEv.emitAsync('loader.injected').catch(() => null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const allRuntimes = new Array(10000)
      .fill(1)
      .map((v, k) => v + k)
      .filter((v) => {
        const filename = moduleRequire.u(v);
        if (filename.includes('locales')) {
          return navigator.languages.some((lang) =>
            filename.includes(`locales/${lang}`)
          );
        }
        return !filename.includes('undefined');
      });

    const mainRuntimes = allRuntimes.filter((v) => {
      const filename = moduleRequire.u(v);
      return filename.includes('main') && !filename.includes('locales');
    });

    // Use sequential file load
    for (const v of mainRuntimes) {
      try {
        await moduleRequire.e(v);
      } catch (_error) {
        debug('load file error', moduleRequire.u(v));
      }
    }

    isReady = true;
    debug('ready to use');
    await internalEv.emitAsync('loader.ready').catch(() => null);

    debug('wppForceMainLoad', (window as any).wppForceMainLoad);

    if ((window as any).wppForceMainLoad) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else {
      await waitMainReady;
    }

    debug('loading full runtime files');

    // Use sequential file load
    for (const v of allRuntimes) {
      try {
        await moduleRequire.e(v);
      } catch (_error) {
        debug('load file error', moduleRequire.u(v));
      }
    }

    debug('all runtime files loaded');

    isFullReady = true;
    debug('full ready to use');
    await internalEv.emitAsync('loader.full_ready').catch(() => null);
  };

  const id = Date.now();
  chunk.push([
    [id],
    {},
    (__webpack_require__: any) => {
      moduleRequire = __webpack_require__;

      queueMicrotask(() => injectFunction(__webpack_require__));
    },
  ]);
}

const sourceModuleMap = new Map<string, boolean>();

export function moduleSource(moduleId: string) {
  if (loaderType !== 'webpack') {
    return '';
  }

  if (!moduleRequire.m[moduleId]) {
    return '';
  }

  if (sourceModuleMap.has(moduleId)) {
    return sourceModuleMap.get(moduleId);
  }

  const source = moduleRequire.m[moduleId].toString();

  sourceModuleMap.set(moduleId, source);
  return source;
}

const pureComponentMap = new Map<string, boolean>();

let _reactRef: any = null;
function getReact(): any {
  if (_reactRef) return _reactRef;
  try {
    _reactRef = moduleRequire('WAWebReact');
  } catch {
    /* not yet available */
  }
  if (!_reactRef) {
    try {
      _reactRef = (self as any).require?.('react');
    } catch {
      /* ignore */
    }
  }
  return _reactRef;
}

function moduleLooksLikeReact(module: any): boolean {
  if (!module) return false;
  const React = getReact();
  const candidates = [
    module,
    module.default,
    ...(typeof module === 'object' ? Object.values(module) : []),
  ];
  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === 'object' && (c as any).$$typeof) return true;
    if (
      React &&
      typeof c === 'function' &&
      c.prototype &&
      ((React.Component && c.prototype instanceof React.Component) ||
        (React.PureComponent && c.prototype instanceof React.PureComponent))
    ) {
      return true;
    }
  }
  return false;
}

// Cache for searchId results based on condition function reference
const searchIdCache = new Map<SearchModuleCondition, string | null>();
// For negative (null) results we also remember how many modules were registered
// at the time of the miss. WhatsApp Web (>= 2.3000, Meta loader) registers its
// modules progressively, often well after the loader is injected, so a finder
// that runs early can miss a module that simply hasn't been registered yet.
// Caching that miss permanently means the binding never recovers even after the
// module loads (root cause of #3419). We therefore only trust a cached null
// while the module set is unchanged, and re-scan once new modules appear.
const searchIdMissModuleCount = new Map<SearchModuleCondition, number>();

function isReactResolvedCached(moduleId: string, module: any): boolean {
  if (pureComponentMap.has(moduleId)) {
    return pureComponentMap.get(moduleId) as boolean;
  }
  const result = moduleLooksLikeReact(module);
  pureComponentMap.set(moduleId, result);
  return result;
}

export function isReactComponent(moduleId: string): boolean {
  if (pureComponentMap.has(moduleId)) {
    return pureComponentMap.get(moduleId) as boolean;
  }

  let isPure = false;

  // Legacy webpack: cheap regex on source avoids resolving the module.
  if (loaderType === 'webpack') {
    const ignoreRE = /\w+\.(Pure)?Component\s*\{/;
    const source = moduleSource(moduleId);
    isPure = ignoreRE.test(source);
  } else {
    // Meta loader: inspect the resolved module. Skip if it errors.
    try {
      const module = moduleRequire(moduleId);
      isPure = moduleLooksLikeReact(module);
    } catch {
      isPure = false;
    }
  }

  pureComponentMap.set(moduleId, isPure);
  return isPure;
}

/**
 * Lazy-built name-token index: map from lowercased token -> module IDs that
 * contain that token. Tokens are extracted from module IDs by splitting on
 * camelCase boundaries, '.', '_', and '-'. Used to accelerate hinted searches.
 */
let tokenIndex: Map<string, string[]> | null = null;
let tokenIndexKey = -1;

function tokenize(id: string): string[] {
  return id
    .split(/(?=[A-Z])|[._-]/)
    .map((s) => s.toLowerCase())
    .filter(Boolean);
}

function buildTokenIndex(): Map<string, string[]> {
  const ids = Object.keys(moduleRequire.m);
  if (tokenIndex && ids.length === tokenIndexKey) {
    return tokenIndex;
  }
  const index = new Map<string, string[]>();
  for (const id of ids) {
    for (const token of tokenize(id)) {
      let bucket = index.get(token);
      if (!bucket) {
        bucket = [];
        index.set(token, bucket);
      }
      bucket.push(id);
    }
  }
  tokenIndex = index;
  tokenIndexKey = ids.length;
  return index;
}

/**
 * Return module IDs that look like good candidates for a hint string.
 * The hint may be a token (e.g. "MsgCollection") or a regex.
 */
function candidatesForHint(hint: string | RegExp): string[] {
  const ids = Object.keys(moduleRequire.m);
  if (hint instanceof RegExp) {
    return ids.filter((id) => hint.test(id));
  }
  const index = buildTokenIndex();
  const tokens = tokenize(hint);
  if (!tokens.length) return [];
  // Intersect buckets for all tokens
  let candidates: string[] | null = null;
  for (const t of tokens) {
    const bucket = index.get(t);
    if (!bucket) return [];
    if (!candidates) {
      candidates = bucket.slice();
    } else {
      const set = new Set(bucket);
      candidates = candidates.filter((id) => set.has(id));
      if (!candidates.length) return [];
    }
  }
  return candidates || [];
}

/**
 * Return the module id from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 * @param hint Optional name-token or regex to narrow the candidate set
 *             (e.g. "MsgCollection" or /^WAWebMsg/). When provided,
 *             matching modules are tried first; on miss we fall back to a
 *             full scan.
 */
export function searchId(
  condition: SearchModuleCondition,
  reverse = false,
  hint?: string | RegExp
): string | null {
  // Check cache first. Positive results are stable; a cached null is only
  // trustworthy while no new modules have registered since the miss — otherwise
  // the module we wanted may have loaded in the meantime (#3419).
  const cached = searchIdCache.get(condition);
  if (cached) {
    return cached;
  }
  if (cached === null) {
    if (
      searchIdMissModuleCount.get(condition) ===
      Object.keys(moduleRequire.m).length
    ) {
      return null;
    }
    // Stale negative cache: new modules appeared, fall through and re-scan.
  }

  const allIds = Object.keys(moduleRequire.m);
  const orderedAll = reverse ? allIds.slice().reverse() : allIds;

  // Build the iteration order: hinted candidates first, then everything else.
  let ids: string[];
  if (hint) {
    const hinted = candidatesForHint(hint);
    if (hinted.length) {
      const seen = new Set(hinted);
      ids = reverse
        ? hinted
            .slice()
            .reverse()
            .concat(orderedAll.filter((id) => !seen.has(id)))
        : hinted.concat(orderedAll.filter((id) => !seen.has(id)));
    } else {
      ids = orderedAll;
    }
  } else {
    ids = orderedAll;
  }

  const timer = setTimeout(() => {
    debug(`Searching for: ${condition.toString()}`);
  }, 500);

  for (const moduleId of ids) {
    // For legacy webpack we can cheaply test source without resolving.
    if (loaderType === 'webpack' && isReactComponent(moduleId)) {
      continue;
    }

    try {
      const module = moduleRequire(moduleId);

      // For Meta loader, check on the already-resolved module to avoid
      // resolving twice.
      if (loaderType !== 'webpack' && isReactResolvedCached(moduleId, module)) {
        continue;
      }

      if (condition(module, moduleId)) {
        debug(`Module found: ${moduleId} - ${condition.toString()}`);
        clearTimeout(timer);
        searchIdCache.set(condition, moduleId);
        return moduleId;
      }
    } catch (_error) {
      continue;
    }
  }

  const fallbackIds = Object.keys(fallbackModules);

  for (const moduleId of fallbackIds) {
    try {
      const module = fallbackModules[moduleId];

      if (condition(module, moduleId)) {
        debug(`Fallback Module found: ${moduleId} - ${condition.toString()}`);
        clearTimeout(timer);
        searchIdCache.set(condition, moduleId);
        return moduleId;
      }
    } catch (_error) {
      continue;
    }
  }

  clearTimeout(timer);
  debug(`Module not found: ${condition.toString()}`);
  searchIdCache.set(condition, null);
  // Remember the module count at miss time so the cached null is re-evaluated
  // once WhatsApp registers more modules (see searchIdMissModuleCount above).
  searchIdMissModuleCount.set(condition, allIds.length);
  return null;
}

/**
 * Return the module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 * @param hint Optional name-token or regex to narrow the candidate set.
 */
export function search<T = any>(
  condition: SearchModuleCondition,
  reverse = false,
  hint?: string | RegExp
): T | null {
  const moduleId = searchId(condition, reverse, hint);

  if (!moduleId) {
    return null;
  }

  return loadModule<T>(moduleId);
}
/**
 * Return the module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export function modules(
  condition?: SearchModuleCondition,
  reverse = false
): { [key: string]: any } {
  const modules: { [key: string]: any } = {};

  let ids = Object.keys(moduleRequire.m);

  if (reverse) {
    ids = ids.reverse();
  }
  for (const moduleId of ids) {
    if (loaderType === 'webpack' && isReactComponent(moduleId)) {
      continue;
    }

    try {
      const module = loadModule(moduleId);

      if (loaderType !== 'webpack' && isReactResolvedCached(moduleId, module)) {
        continue;
      }

      if (!condition || condition(module, moduleId)) {
        modules[moduleId] = module;
      }
    } catch (_error) {
      continue;
    }
  }
  debug(
    `${
      Object.keys(modules).length
    } modules found with: ${condition?.toString()}`
  );

  return modules;
}

export function loadModule<T = any>(moduleId: string) {
  const module = !/^fallback_/.test(moduleId)
    ? moduleRequire(moduleId)
    : fallbackModules[moduleId];

  return module as T;
}

/**
 * Inject a new module content
 * @param moduleId Module ID
 * @param content The module content
 * @returns
 */
export function injectFallbackModule(
  moduleId: number | string,
  content: any
): void {
  moduleId = moduleId + '';

  if (/^fallback_/.test(moduleId)) {
    throw new Error('Invalid fallback ID');
  }

  fallbackModules[`fallback_${moduleId}`] = content;
}

/**
 * WhatsApp's Bootloader: the runtime that fetches resource bundles on demand.
 * Only exists on the Meta loader (WA >= 2.3000).
 */
interface Bootloader {
  /**
   * Fetch the resource bundles of `components` and require them, then invoke
   * `callback`. Throws synchronously for a name that is not a known component.
   */
  loadModules(
    components: string[],
    callback: () => void,
    context: string
  ): unknown;
  __debug?: {
    /** Component name -> the resources its bundle is made of. */
    componentMap?: Map<string, unknown>;
  };
}

/** Components already handed to the Bootloader, so we never refetch one. */
const bootloadedComponents = new Set<string>();

/** In-flight {@link ensureLazyModule} calls, keyed by module id. */
const ensureLazyModulePromises = new Map<string, Promise<boolean>>();

function getBootloader(): Bootloader | null {
  try {
    // `moduleRequire` goes through `importNamespace`, which wraps a CommonJS
    // module as `{ default: exports }`, so accept either shape.
    const module = moduleRequire<any>('Bootloader');
    const bootloader: Bootloader | undefined =
      typeof module?.loadModules === 'function' ? module : module?.default;

    return typeof bootloader?.loadModules === 'function' ? bootloader : null;
  } catch (_error) {
    return null;
  }
}

/**
 * Whether `moduleId` is currently in the registry `searchId` scans.
 */
function isModuleRegistered(moduleId: string): boolean {
  try {
    return moduleId in moduleRequire.m;
  } catch (_error) {
    return false;
  }
}

/**
 * Components to try for a lazy module: the recorded ones that still exist,
 * followed by a bounded set rediscovered from the live component map.
 */
function candidateComponents(moduleId: string): string[] {
  const source = LAZY_MODULES[moduleId];

  if (!source) {
    return [];
  }

  const componentMap = getBootloader()?.__debug?.componentMap;

  if (!componentMap || typeof componentMap.keys !== 'function') {
    return source.components;
  }

  const candidates = source.components.filter((name) => componentMap.has(name));

  if (source.pattern) {
    let discovered = 0;

    for (const name of componentMap.keys()) {
      if (discovered >= MAX_DISCOVERED_COMPONENTS) {
        break;
      }
      if (source.pattern.test(name) && !candidates.includes(name)) {
        candidates.push(name);
        discovered++;
      }
    }
  }

  return candidates;
}

function bootloadComponent(
  bootloader: Bootloader,
  component: string,
  timeout = 30_000
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(`Bootloader timed out loading '${component}'`));
    }, timeout);

    try {
      bootloader.loadModules(
        [component],
        () => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve();
        },
        'WA-JS'
      );
    } catch (error) {
      settled = true;
      clearTimeout(timer);
      reject(error);
    }
  });
}

/**
 * Make sure a module that ships in a lazily bootloaded bundle is registered.
 *
 * WhatsApp Web >= 2.3000 splits its module graph into resource bundles the
 * Bootloader fetches on demand, so a module whose bundle the session never
 * needed is absent from the registry and `searchId()` can never find it — the
 * binding stays `undefined` for the whole life of the page no matter how often
 * it is retried. Call this before using such a binding: it asks WhatsApp to
 * fetch the bundle exactly like the UI would, which registers the module and
 * lets the existing lazy getters resolve.
 *
 * Best-effort by design. Returns whether `moduleId` is registered when it
 * finishes; `false` on the legacy webpack loader (where nothing is lazy) and
 * for modules absent from {@link LAZY_MODULES}. Each component is fetched at
 * most once per page, so repeated calls after a failure cost nothing.
 *
 * @param moduleId The module the caller needs
 */
export function ensureLazyModule(moduleId: string): Promise<boolean> {
  if (isModuleRegistered(moduleId)) {
    return Promise.resolve(true);
  }

  let pending = ensureLazyModulePromises.get(moduleId);

  if (!pending) {
    pending = resolveLazyModule(moduleId).finally(() => {
      ensureLazyModulePromises.delete(moduleId);
    });
    ensureLazyModulePromises.set(moduleId, pending);
  }

  return pending;
}

async function resolveLazyModule(moduleId: string): Promise<boolean> {
  if (loaderType !== 'meta') {
    return false;
  }

  const bootloader = getBootloader();

  if (!bootloader) {
    debug(`Bootloader unavailable, cannot load '${moduleId}'`);
    return false;
  }

  for (const component of candidateComponents(moduleId)) {
    if (bootloadedComponents.has(component)) {
      continue;
    }
    bootloadedComponents.add(component);

    debug(`Bootloading '${component}' to register '${moduleId}'`);

    try {
      await bootloadComponent(bootloader, component);
    } catch (error) {
      debug(`Bootloading '${component}' failed: ${error}`);
      continue;
    }

    if (isModuleRegistered(moduleId)) {
      debug(`'${moduleId}' registered by '${component}'`);
      return true;
    }
  }

  return isModuleRegistered(moduleId);
}
