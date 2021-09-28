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

import * as webpack from '../webpack';

const moduleIdMap = new WeakMap<any, string>();

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
        [key: string]: null | undefined | string | ((module: any) => any);
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
      get: () => {
        let value = undefined;
        const moduleId = webpack.searchId(condition);

        if (!moduleId) {
          throw `Module ${name} not found with ${condition.toString()}`;
        }

        const module = webpack.webpackRequire(moduleId);

        switch (typeof property) {
          case 'function':
            value = property(module);
            if (!value) {
              throw `Property ${property.toString()} not found in module ${name}`;
            }
            break;
          case 'string':
            value = property.split('.').reduce((a, b) => a[b], module);
            if (!value) {
              throw `Property ${property} not found in module ${name}`;
            }
            break;
          default:
            value = module;
        }

        // Avoid re-searching modules
        if (value) {
          Object.defineProperty(exports, name, {
            value,
          });

          try {
            moduleIdMap.set(value, moduleId);
          } catch (error) {}
        }

        return value;
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
      [name]: 'default',
    },
    (m) => names.includes(m.default.prototype.proxyName)
  );
}
