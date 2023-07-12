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
 * Is setted true when the loader is injected
 */
export let isInjected = false;

/**
 * Is setted true when the all webpack modules are fully loaded
 */
export let isReady = false;

export function onInjected(listener: () => void): void {
  internalEv.on('webpack.injected', async () =>
    Promise.resolve()
      .then(listener)
      .catch(() => null)
  );
}

export function onReady(listener: () => void): void {
  internalEv.on('webpack.ready', () =>
    Promise.resolve()
      .then(listener)
      .catch(() => null)
  );
}

export type SearchModuleCondition = (module: any, moduleId: string) => boolean;

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

export function injectLoader(): void {
  if (isInjected) {
    return;
  }

  const chunkName = 'webpackChunkwhatsapp_web_client';

  const global = (self || window) as any;
  const chunk = global[chunkName] || [];
  if (typeof global[chunkName] === 'undefined') {
    global[chunkName] = chunk;
  }

  const injectFunction = async (__webpack_require__: any) => {
    webpackRequire = __webpack_require__;

    isInjected = true;
    debug('injected');
    await internalEv.emitAsync('webpack.injected').catch(() => null);

    const availablesRuntimes = new Array(10000)
      .fill(1)
      .map((v, k) => v + k)
      .filter((v) => {
        const filename = webpackRequire.u(v);
        if (filename.includes('undefined')) {
          return false;
        }
        if (filename.includes('locales')) {
          return navigator.languages.some((lang) =>
            filename.includes(`locales/${lang}`)
          );
        }
        return true;
      });

    const sortWeight: [RegExp, number][] = [
      [/vendor.*main~/, 85],
      [/vendor.*main/, 84],
      [/vendor.*lazy.*high/, 75],
      [/vendor.*lazy.*low/, 74],
      [/vendor/, 83],
      [/main~/, 82],
      [/locale/, 81],
      [/main/, 80],
      [/lazy.*high.*~/, 73],
      [/lazy.*high/, 72],
      [/lazy.*low.*~/, 71],
      [/lazy.*low/, 70],
      [/lazy/, 1],
    ];

    const sortValue = (id: string) => {
      const filename = webpackRequire.u(id);

      for (const w of sortWeight) {
        if (w[0].test(filename)) {
          return w[1];
        }
      }

      return 0;
    };

    const sorted = availablesRuntimes.sort(
      (a, b) => sortValue(b) - sortValue(a)
    );

    // Use sequential file load
    for (const v of sorted) {
      try {
        await webpackRequire.e(v);
      } catch (error) {
        debug('load file error', webpackRequire.e(v));
      }
    }

    isReady = true;
    debug('ready to use');
    await internalEv.emitAsync('webpack.ready').catch(() => null);
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
  if (typeof webpackRequire.m[moduleId] === 'undefined') {
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
  const module = /^\d+$/.test(moduleId)
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

  if (/^\d+$/.test(moduleId)) {
    throw new Error('Invalid fallback ID');
  }

  fallbackModules[moduleId] = content;
}
