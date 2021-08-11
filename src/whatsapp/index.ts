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

export * from './collections';
export * as functions from './functions';
export * from './misc';
export * from './stores';

/**
 * WhatsApp Module Map
 *
 * Not Necessary for Collections and Models
 */
function getModuleByName(name: string) {
  // Search export module with the same name of collection
  if (/\w+Collection$/.test(name)) {
    const value = webpack.search((m) => m[name]);
    if (value) {
      return value[name];
    }
  }

  // Search export module with proxyName equals model name (ChatModel => proxyName="chat")
  if (/\w+Model$/.test(name)) {
    const proxyName = name
      .replace(/Model$/, '')
      .replace(/^(\w)/, (l) => l.toLowerCase());

    const value = webpack.search(
      (m) => m.default.prototype.proxyName === proxyName
    );
    if (value) {
      return value.default;
    }
  }

  // Search export module with the same name of collection and default global collection
  if (/\w+Store$/.test(name)) {
    const storeName = name.replace(/Store$/, 'Collection');

    const value = webpack.search((m) => m['default'] instanceof m[storeName]);
    if (value) {
      return value.default;
    }
  }
  return undefined;
}

const cache: { [key: string]: any } = {};

module.exports = new Proxy(exports, {
  get: (target, name) => {
    let value: any = Reflect.get(cache, name);

    if (value) {
      return value;
    }

    value = target[name];

    if (!value && typeof name === 'string') {
      value = getModuleByName(name);
    }

    if (value) {
      Reflect.set(cache, name, value);
    }

    return value;
  },
});
