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

import { count } from 'console';
import Debug from 'debug';
import Emittery from 'emittery';

const debug = Debug('WPP:webpack');

interface WebpackEvents {
  injected: undefined;
  ready: undefined;
}

const emitter = new Emittery<WebpackEvents>();

/**
 * Is setted true when the loader is injected
 */
export let isInjected = false;

/**
 * Is setted true when the all webpack modules are fully loaded
 */
export let isReady = false;

export function onInjected(listener: () => void): void {
  emitter.on('injected', listener);
}

export function onReady(listener: () => void): void {
  emitter.on('ready', listener);
}

export type SearchModuleCondition = (module: any, moduleId?: string) => boolean;

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

export function injectLoader(): void {
  if (isInjected) {
    return;
  }

  const chunkName = 'webpackChunkwhatsapp_web_client';

  const self = window as any;
  const chunk = (self[chunkName] = self[chunkName] || []);

  const id = Date.now();
  chunk.push([
    [id],
    {},
    async (__webpack_require__: any) => {
      webpackRequire = __webpack_require__;

      isInjected = true;
      debug('injected');
      await emitter.emitSerial('injected').catch(() => null);

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

      await Promise.all(availablesRuntimes.map((v) => webpackRequire.e(v)));

      isReady = true;
      debug('ready to use');
      await emitter.emitSerial('ready').catch(() => null);
    },
  ]);
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

  const ignoreRE = /\w+\.PureComponent\s*\{/;

  for (const moduleId of ids) {
    const source = webpackRequire.m[moduleId].toString();
    if (ignoreRE.test(source)) {
      continue;
    }

    try {
      const module = webpackRequire(moduleId);

      if (condition(module, moduleId)) {
        debug(`Module found: ${moduleId} - ${condition.toString()}`);
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

  if (moduleId) {
    return webpackRequire(moduleId) as T;
  }

  return null;
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
    try {
      const module = webpackRequire(moduleId);

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
