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

import { compare } from 'compare-versions';
import Debug from 'debug';

import { internalEv } from '../eventEmitter';

const debug = Debug('WA-JS:webpack');

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

export function injectLoader(): void {
  if (isInjected) {
    return;
  }

  const global = (self || window) as any;

  /* BEGIN: For WhatsApp >= 2.3000.0 */
  const metaTimer = setInterval(async () => {
    if (loaderType !== 'unknown') {
      clearInterval(metaTimer);
      return;
    }
    if (!global.require || !global.__d) {
      return;
    }
    loaderType = 'meta';

    // A wrap to work like webpack
    webpackRequire = function (id: string) {
      try {
        global.ErrorGuard.skipGuardGlobal(true);
        return global.importNamespace(id);
      } catch (error) {}
      return null;
    } as any;

    Object.defineProperty(webpackRequire, 'm', {
      get: () => {
        const modulesMap = __debug().modulesMap;
        const ids = Object.keys(modulesMap).filter((id) =>
          /^(?:use)?WA/.test(id)
        );
        const result: any = {};

        for (const id of ids) {
          result[id] = modulesMap[id]?.factory;
        }

        return result;
      },
    });

    isInjected = true;
    debug('injected');
    await internalEv.emitAsync('webpack.injected').catch(() => null);

    await waitMainInit;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isReady = true;
    debug('ready to use');
    await internalEv.emitAsync('webpack.ready').catch(() => null);

    if ((window as any).wppForceMainLoad) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else {
      await waitMainReady;
    }
    isFullReady = true;
    debug('full ready to use');
    await internalEv.emitAsync('webpack.full_ready').catch(() => null);
  }, 1000);

  /* END: For WhatsApp >= 2.3000.0 */

  const chunkName = 'webpackChunkwhatsapp_web_client';

  const chunk = global[chunkName] || [];
  if (compare(self.Debug.VERSION, '2.3000.0', '>=')) {
    Object.defineProperty(global, chunkName, chunk);
  } else {
    loaderType = 'webpack';
  }

  const injectFunction = async (__webpack_require__: any) => {
    loaderType = 'webpack';
    webpackRequire = __webpack_require__;

    isInjected = true;
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
      } catch (error) {
        debug('load file error', webpackRequire.u(v));
      }
    }

    isReady = true;
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
      } catch (error) {
        debug('load file error', webpackRequire.u(v));
      }
    }

    isFullReady = true;
    debug('full ready to use');
    await internalEv.emitAsync('webpack.full_ready').catch(() => null);
  };

  const id = Date.now();
  chunk.push([
    [id],
    {},
    (__webpack_require__: any) => {
      webpackRequire = __webpack_require__;

      queueMicrotask(() => injectFunction(__webpack_require__));
    },
  ]);
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
