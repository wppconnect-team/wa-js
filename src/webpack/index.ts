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

const debug = Debug('WA-JS:webpack');

/**
 * Global initialization lock state stored in window
 */
interface InitLockState {
  state: 'not_started' | 'initializing' | 'completed';
  initPromise: Promise<void> | null;
  loaderType: 'meta' | 'unknown' | 'webpack';
  isInjected: boolean;
  isReady: boolean;
  isFullReady: boolean;
  timers: number[];
  webpackRequire: any;
}

declare global {
  interface Window {
    __WPP_INIT_LOCK__?: InitLockState;
  }
}

/**
 * Get or create the global initialization lock state
 */
function getOrCreateLockState(): InitLockState {
  const global = (self || window) as Window;

  if (!global.__WPP_INIT_LOCK__) {
    global.__WPP_INIT_LOCK__ = {
      state: 'not_started',
      initPromise: null,
      loaderType: 'unknown',
      isInjected: false,
      isReady: false,
      isFullReady: false,
      timers: [],
      webpackRequire: undefined,
    };
  }

  return global.__WPP_INIT_LOCK__;
}

/**
 * Synchronize local module state from global lock state
 */
function syncLocalStateFromGlobal(): void {
  const lockState = getOrCreateLockState();

  loaderType = lockState.loaderType;
  isInjected = lockState.isInjected;
  isReady = lockState.isReady;
  isFullReady = lockState.isFullReady;

  if (lockState.webpackRequire) {
    webpackRequire = lockState.webpackRequire;
  }
}

/**
 * Update global lock state from local module state
 */
function syncGlobalStateFromLocal(): void {
  const lockState = getOrCreateLockState();

  lockState.loaderType = loaderType;
  lockState.isInjected = isInjected;
  lockState.isReady = isReady;
  lockState.isFullReady = isFullReady;
  lockState.webpackRequire = webpackRequire;
}

/**
 * Is setted true when the loader is injected
 */
export let loaderType: 'meta' | 'unknown' | 'webpack' = 'unknown';

/**
 * Is setted true when the loader is injected
 */
export let isInjected = false;

/**
 * Is setted true when the main webpack modules are fully loaded
 */
export let isReady = false;

/**
 * Is setted true when the all webpack modules are fully loaded
 */
export let isFullReady = false;

export function onInjected(listener: () => void, delay = 0): void {
  internalEv.on('webpack.injected', () => {
    setTimeout(listener, delay);
  });
}

export function onReady(listener: () => void, delay = 0): void {
  internalEv.on('webpack.ready', () => {
    setTimeout(listener, delay);
  });
}

export function onFullReady(listener: () => void, delay = 0): void {
  internalEv.on('webpack.full_ready', () => {
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

export let webpackRequire: (<T = any>(moduleId: string) => T) & {
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
 * Perform Meta loader initialization (WhatsApp >= 2.3000.0)
 */
async function performMetaLoaderInit(): Promise<void> {
  const global = (self || window) as any;
  const lockState = getOrCreateLockState();

  return new Promise<void>((resolve) => {
    const metaTimer = setInterval(async () => {
      if (loaderType !== 'unknown') {
        clearInterval(metaTimer);
        return;
      }
      if (!global.require || !global.__d) {
        return;
      }
      loaderType = 'meta';
      lockState.loaderType = 'meta';

      // A wrap to work like webpack
      webpackRequire = function (id: string) {
        try {
          global.ErrorGuard.skipGuardGlobal(true);
          return global.importNamespace(id);
        } catch (_error) {}
        return null;
      } as any;

      Object.defineProperty(webpackRequire, 'm', {
        get: () => {
          const modulesMap = __debug().modulesMap;
          const ids = Object.keys(modulesMap).filter(
            (id) =>
              /^(?:use)?WA/.test(id) &&
              // Fix for error "bx(...): Unknown file path "9550""
              ![
                'WAWebEmojiPanelContentEmojiSearchEmpty.react',
                'WAWebMoment-es-do',
              ].includes(id)
          );
          const result: any = {};

          for (const id of ids) {
            result[id] = modulesMap[id]?.factory;
          }

          return result;
        },
      });

      clearInterval(metaTimer);

      isInjected = true;
      lockState.isInjected = true;
      syncGlobalStateFromLocal();
      debug('injected');
      await internalEv.emitAsync('webpack.injected').catch(() => null);

      await waitMainInit;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      isReady = true;
      lockState.isReady = true;
      syncGlobalStateFromLocal();
      debug('ready to use');
      await internalEv.emitAsync('webpack.ready').catch(() => null);

      if ((window as any).wppForceMainLoad) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        await waitMainReady;
      }
      isFullReady = true;
      lockState.isFullReady = true;
      syncGlobalStateFromLocal();
      debug('full ready to use');
      await internalEv.emitAsync('webpack.full_ready').catch(() => null);

      resolve();
    }, 1000);

    // Store timer ID for cleanup
    lockState.timers.push(metaTimer as any);
  });
}

/**
 * Perform Webpack loader initialization
 */
async function performWebpackLoaderInit(
  __webpack_require__: any
): Promise<void> {
  const lockState = getOrCreateLockState();

  loaderType = 'webpack';
  lockState.loaderType = 'webpack';
  webpackRequire = __webpack_require__;

  isInjected = true;
  lockState.isInjected = true;
  syncGlobalStateFromLocal();
  debug('injected');
  await internalEv.emitAsync('webpack.injected').catch(() => null);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const allRuntimes = new Array(10000)
    .fill(1)
    .map((v, k) => v + k)
    .filter((v) => {
      const filename = webpackRequire.u(v);
      if (filename.includes('locales')) {
        return navigator.languages.some((lang) =>
          filename.includes(`locales/${lang}`)
        );
      }
      return !filename.includes('undefined');
    });

  const mainRuntimes = allRuntimes.filter((v) => {
    const filename = webpackRequire.u(v);
    return filename.includes('main') && !filename.includes('locales');
  });

  // Use sequential file load
  for (const v of mainRuntimes) {
    try {
      await webpackRequire.e(v);
    } catch (_error) {
      debug('load file error', webpackRequire.u(v));
    }
  }

  isReady = true;
  lockState.isReady = true;
  syncGlobalStateFromLocal();
  debug('ready to use');
  await internalEv.emitAsync('webpack.ready').catch(() => null);

  if ((window as any).wppForceMainLoad) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } else {
    await waitMainReady;
  }

  // Use sequential file load
  for (const v of allRuntimes) {
    try {
      await webpackRequire.e(v);
    } catch (_error) {
      debug('load file error', webpackRequire.u(v));
    }
  }

  isFullReady = true;
  lockState.isFullReady = true;
  syncGlobalStateFromLocal();
  debug('full ready to use');
  await internalEv.emitAsync('webpack.full_ready').catch(() => null);
}

/**
 * Coordinate initialization - starts both Meta and Webpack loaders
 */
async function performInitialization(): Promise<void> {
  const global = (self || window) as any;

  // Start Meta loader detection
  const metaPromise = performMetaLoaderInit();

  // Setup Webpack loader detection
  const chunkName = 'webpackChunkwhatsapp_web_client';
  const chunk = global[chunkName] || [];
  if (!chunk || chunk?.length === 0) {
    Object.defineProperty(global, chunkName, { value: chunk });
  } else {
    loaderType = 'webpack';
    getOrCreateLockState().loaderType = 'webpack';
  }

  const id = Date.now();
  chunk.push([
    [id],
    {},
    (__webpack_require__: any) => {
      webpackRequire = __webpack_require__;
      queueMicrotask(() => performWebpackLoaderInit(__webpack_require__));
    },
  ]);

  // Wait for whichever loader completes first (Meta or Webpack)
  await metaPromise;
}

export function injectLoader(): void {
  const lockState = getOrCreateLockState();

  // Case 1: Already completed - reuse existing initialization
  if (lockState.state === 'completed') {
    debug('lock state: completed, reusing existing initialization');
    syncLocalStateFromGlobal();
    return;
  }

  // Case 2: In progress - wait for it to complete then sync
  if (lockState.state === 'initializing' && lockState.initPromise) {
    debug('lock state: initializing, waiting for completion');
    lockState.initPromise
      .then(() => {
        syncLocalStateFromGlobal();
        debug('synced state from completed initialization');
      })
      .catch(() => {
        debug('initialization failed, state not synced');
      });
    return;
  }

  // Case 3: Not started - acquire lock and initialize
  if (lockState.state === 'not_started') {
    debug('lock state: not_started, starting initialization');
    lockState.state = 'initializing';

    const initPromise = performInitialization();
    lockState.initPromise = initPromise;

    initPromise
      .then(() => {
        lockState.state = 'completed';
        syncLocalStateFromGlobal();
        // Clear timers
        if (lockState.timers.length > 0) {
          debug(`clearing ${lockState.timers.length} timers`);
          lockState.timers.forEach(clearInterval);
          lockState.timers = [];
        }
        debug('initialization completed');
      })
      .catch((error) => {
        lockState.state = 'not_started'; // allow retry
        debug('initialization failed:', error);
      });
  }
}

const sourceModuleMap = new Map<string, boolean>();

export function moduleSource(moduleId: string) {
  if (loaderType !== 'webpack') {
    return '';
  }

  if (!webpackRequire.m[moduleId]) {
    return '';
  }

  if (sourceModuleMap.has(moduleId)) {
    return sourceModuleMap.get(moduleId);
  }

  const source = webpackRequire.m[moduleId].toString();

  sourceModuleMap.set(moduleId, source);
  return source;
}

const pureComponentMap = new Map<string, boolean>();

export function isReactComponent(moduleId: string) {
  if (pureComponentMap.has(moduleId)) {
    return pureComponentMap.get(moduleId);
  }

  const ignoreRE = /\w+\.(Pure)?Component\s*\{/;

  const source = moduleSource(moduleId);

  const isPure = ignoreRE.test(source);

  pureComponentMap.set(moduleId, isPure);
  return isPure;
}

/**
 * Return the webpack module id from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export function searchId(
  condition: SearchModuleCondition,
  reverse = false
): string | null {
  let ids = Object.keys(webpackRequire.m);

  if (reverse) {
    ids = ids.reverse();
  }

  const timer = setTimeout(() => {
    debug(`Searching for: ${condition.toString()}`);
  }, 500);

  for (const moduleId of ids) {
    if (isReactComponent(moduleId)) {
      continue;
    }

    try {
      const module = webpackRequire(moduleId);

      if (condition(module, moduleId)) {
        debug(`Module found: ${moduleId} - ${condition.toString()}`);
        clearTimeout(timer);
        return moduleId;
      }
    } catch (_error) {
      continue;
    }
  }

  ids = Object.keys(fallbackModules);

  for (const moduleId of ids) {
    try {
      const module = fallbackModules[moduleId];

      if (condition(module, moduleId)) {
        debug(`Fallback Module found: ${moduleId} - ${condition.toString()}`);
        clearTimeout(timer);
        return moduleId;
      }
    } catch (_error) {
      continue;
    }
  }

  debug(`Module not found: ${condition.toString()}`);
  return null;
}

/**
 * Return the webpack module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export function search<T = any>(
  condition: SearchModuleCondition,
  reverse = false
): T | null {
  const moduleId = searchId(condition, reverse);

  if (!moduleId) {
    return null;
  }

  return loadModule<T>(moduleId);
}
/**
 * Return the webpack module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export function modules(
  condition?: SearchModuleCondition,
  reverse = false
): { [key: string]: any } {
  const modules: { [key: string]: any } = {};

  let ids = Object.keys(webpackRequire.m);

  if (reverse) {
    ids = ids.reverse();
  }
  for (const moduleId of ids) {
    if (isReactComponent(moduleId)) {
      continue;
    }

    try {
      const module = loadModule(moduleId);

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
    ? webpackRequire(moduleId)
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
