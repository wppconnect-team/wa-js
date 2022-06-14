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

import { InferArgs, InferReturn, wrapFunction } from '../util';
import * as webpack from '../webpack';

const moduleIdMap = new WeakMap<any, string>();
const functionPathMap = new WeakMap<any, string>();

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
          console.error(
            `Module ${name} was not found with ${condition.toString()}`
          );
          return undefined;
        }

        const module = webpack.webpackRequire(moduleId);

        if (Array.isArray(property)) {
          for (const p of property) {
            valueFn = () => p.split('.').reduce((a, b) => a?.[b], module);
            if (valueFn()) {
              functionPath = p;
              break;
            }
          }
          if (!valueFn()) {
            console.error(
              `Property ${property.join(
                ' or '
              )} was not found for ${name} in module ${moduleId}`
            );
            return undefined;
          }
        } else {
          switch (typeof property) {
            case 'string':
              valueFn = () =>
                property.split('.').reduce((a, b) => a?.[b], module);
              if (!valueFn()) {
                console.error(
                  `Property ${property} was not found for ${name} in module ${moduleId}`
                );
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
          } catch (error) {}

          return valueFn();
        }

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

  const module = webpack.webpackRequire(moduleId);

  const functionPath = functionPathMap.get(func);

  if (!functionPath) {
    console.error('function path was not found');
    return;
  }

  const parts = functionPath.split('.');

  const functionName = parts.pop();

  if (!functionName) {
    console.error(`function was not found in the module ${moduleId}`);
    return;
  }

  const baseModule = parts.reduce((a, b) => a?.[b], module);

  baseModule[functionName] = wrapFunction(
    func.bind(baseModule) as TFunc,
    callback
  );

  moduleIdMap.set(baseModule[functionName], moduleId);
  functionPathMap.set(baseModule[functionName], functionPath);
}
