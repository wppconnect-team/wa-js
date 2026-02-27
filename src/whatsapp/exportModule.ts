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

import { wrapShouldAppearFunction } from '../chat/functions/setChatList';
import { trackException } from '../gtag';
import { InferArgs, InferReturn, wrapFunction } from '../util';
import * as webpack from '../webpack';

const debug = Debug('WA-JS:export');

class CustomWeakMap extends WeakMap<object, string> {
  protected stringMap = new Map<string, string>();

  delete(key: object | string) {
    if (typeof key === 'string') {
      return this.stringMap.delete(key);
    }
    return super.delete(key);
  }
  get(key: object | string) {
    if (typeof key === 'string') {
      return this.stringMap.get(key);
    }
    return super.get(key);
  }
  has(key: object | string) {
    if (typeof key === 'string') {
      return this.stringMap.has(key);
    }
    return super.has(key);
  }
  set(key: object | string, value: string) {
    if (typeof key === 'string') {
      this.stringMap.set(key, value);
      return this;
    }
    super.set(key, value);
    return this;
  }
}

const moduleIdMap = new CustomWeakMap();
const functionPathMap = new CustomWeakMap();

export const _moduleIdMap = moduleIdMap;

/**
 * The object of this function is to override the exports to create getters.
 *
 * You can export a single module or specific functions
 *
 * Note: To create a documented type, you can use `export declare` to define types only
 *
 * @param exports The exports variable
 * @param properties A single name or a map of exported data
 * @param condition The seach condition to find the module
 */
export function exportModule(
  exports: any,
  properties:
    | string
    | {
        [key: string]: null | undefined | string | string[];
      },
  condition: webpack.SearchModuleCondition
): void {
  if (typeof properties === 'string') {
    properties = {
      [properties]: null,
    };
  }

  for (const name of Object.keys(properties)) {
    const property = properties[name];

    Object.defineProperty(exports, name, {
      enumerable: true,
      configurable: true,
      get() {
        let valueFn: any = undefined;
        let functionPath: string | undefined = undefined;

        const moduleId = webpack.searchId(condition);

        if (!moduleId) {
          const description = `Module ${name} was not found with ${condition.toString()}`;

          /**
           * Theses modules only loaded after device is connected
           * I be creating other function for check expires based directily from files
           * This will not directly affect the function call, it continues to work normally.
           */
          const ignoreFailModules: string[] = [
            'revokeStatus',
            'toggleNewsletterAdminActivityMuteStateAction',
            'msgFindQuery', // stopped working in WA version ~2.3000.1034162388
            'msgFindBefore', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindAfter', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindByDirection', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindCallLog', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindEvents', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindMedia', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindSearch', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
            'msgFindStarred', // added in WA version 2.3000.1034162388, but not available in older versions, remove this line when older versions are no longer supported
          ];
          if (!ignoreFailModules.includes(name)) {
            console.error(description);
            trackException(description);
          }
          Object.defineProperty(this, name, {
            get: () => undefined,
          });
          return undefined;
        }

        const module = webpack.loadModule(moduleId);

        if (Array.isArray(property)) {
          for (const p of property) {
            valueFn = () => p.split('.').reduce((a, b) => a?.[b], module);
            if (valueFn()) {
              functionPath = p;
              break;
            }
          }
          if (!valueFn()) {
            const description = `Property ${property.join(
              ' or '
            )} was not found for ${name} in module ${moduleId}`;
            console.error(description);
            trackException(description);
            Object.defineProperty(this, name, {
              get: () => undefined,
            });
            return undefined;
          }
        } else {
          switch (typeof property) {
            case 'string':
              valueFn = () =>
                property.split('.').reduce((a, b) => a?.[b], module);
              if (!valueFn()) {
                const description = `Property ${property} was not found for ${name} in module ${moduleId}`;
                console.error(description);
                trackException(description);
                Object.defineProperty(this, name, {
                  get: () => undefined,
                });
                return undefined;
              }
              functionPath = property;
              break;
            default:
              valueFn = () => module;
          }
        }

        // Avoid re-searching modules
        if (valueFn) {
          Object.defineProperty(this, name, {
            get: valueFn,
          });

          try {
            const value = valueFn();
            moduleIdMap.set(value, moduleId);
            if (functionPath) {
              functionPathMap.set(value, functionPath);
            }
          } catch (_error) {}

          return valueFn();
        }

        Object.defineProperty(this, name, {
          get: () => undefined,
        });
        return undefined;
      },
    });
  }
}

export function exportProxyModel(exports: any, name: string) {
  const baseName = name.replace(/Model$/, '');

  const names: string[] = [baseName];

  // ChatModel => "chat"
  names.push(baseName.replace(/^(\w)/, (l) => l.toLowerCase()));

  // CartItemModel => "cart-item"
  // ProductListModel => "product_list"
  const parts = baseName.split(/(?=[A-Z])/);

  names.push(parts.join('-').toLowerCase());
  names.push(parts.join('_').toLowerCase());

  exportModule(
    exports,
    {
      [name]: ['default', name, baseName],
    },
    (m) =>
      names.includes(
        m.default?.prototype?.proxyName ||
          m[name]?.prototype?.proxyName ||
          m[baseName]?.prototype?.proxyName
      )
  );
}

/**
 * Wrap a exported function from a module
 *
 * @param func The original function
 * @param callback A callback to wrap the function
 * 
 * @example
 * ```typescript
 *wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
   const [message] = args; // Extract arguments
   const result = func(...args); // Call the original function
   // Logic to change the result
   return result; // The new return
 });
 * ```
 */
export function wrapModuleFunction<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  callback: (func: TFunc, ...args: InferArgs<TFunc>) => InferReturn<TFunc>
) {
  if (typeof func !== 'function') {
    console.error('func is not a function');
    return;
  }

  const moduleId = _moduleIdMap.get(func);

  if (!moduleId) {
    console.error('func is not an exported function');
    return;
  }

  const module = webpack.loadModule(moduleId);

  const functionPath = functionPathMap.get(func);

  if (!functionPath) {
    console.error('function path was not found');
    return;
  }

  debug.extend('wrap')(`Wrapping '${functionPath} for module ${moduleId}'`);

  const parts = functionPath.split('.');

  const functionName = parts.pop();

  if (!functionName) {
    const description = `function was not found in the module ${moduleId}`;
    console.error(description);
    trackException(description);
    return;
  }

  const baseModule = parts.reduce((a, b) => a?.[b], module);
  if (functionName == 'getShouldAppearInList') {
    baseModule[functionName] = wrapShouldAppearFunction(
      func.bind(baseModule) as TFunc,
      callback
    );
  } else {
    baseModule[functionName] = wrapFunction(
      func.bind(baseModule) as TFunc,
      callback
    );
  }

  moduleIdMap.set(baseModule[functionName], moduleId);
  functionPathMap.set(baseModule[functionName], functionPath);
}
