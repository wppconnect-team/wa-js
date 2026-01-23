/*!
 * Copyright 2026 WPPConnect Team
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

import { exportModule } from '../exportModule';

export declare interface LruMediaStore {
  get(key: string): Promise<ArrayBuffer | Uint8Array | null>;
  put(key: string, value: ArrayBuffer | Uint8Array): Promise<void>;
  del(key: string): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
  has(key: string): Promise<boolean>;
}
export declare const LruMediaStore: LruMediaStore;

exportModule(
  exports,
  {
    LruMediaStore: 'LruMediaStore',
  },
  (m) =>
    m.LruMediaStore &&
    typeof m.LruMediaStore.get === 'function' &&
    typeof m.LruMediaStore.put === 'function' &&
    typeof m.LruMediaStore.del === 'function' &&
    typeof m.LruMediaStore.clear === 'function' &&
    typeof m.LruMediaStore.count === 'function' &&
    typeof m.LruMediaStore.has === 'function'
);
