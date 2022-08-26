/*!
 * Copyright 2022 WPPConnect Team
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

import { internalEv } from '../eventEmitter';
import { Config } from './Config';
import { defaultConfig } from './defaultConfig';

export { Config } from './Config';

declare global {
  interface Window {
    WPPConfig: Config;
  }
}

const setted = window.WPPConfig || {};

const merged = { ...defaultConfig, ...setted };

const createHander = <T>(path: (string | number | symbol)[] = []) => ({
  get: (target: T, key: keyof T): any => {
    if (key == 'isProxy') {
      return true;
    }

    if (typeof target[key] === 'object' && target[key] != null) {
      return new Proxy(target[key], createHander<any>([...path, key]));
    }

    return target[key];
  },
  set: (target: T, key: keyof T, value: any) => {
    target[key] = value;

    try {
      internalEv.emitAsync('config.update', {
        config: config,
        key,
        path: [...path, key],
        target,
        value,
      });
    } catch (error) {}

    return true;
  },
});

export const config: Config = new Proxy<Config>(merged, createHander<Config>());

window.WPPConfig = config;
