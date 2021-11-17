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

import { Stringable } from '../../types';
import { exportModule } from '../exportModule';
import { Collection } from './Collection';

/** @whatsapp 2.2144.11:36513 */
export declare class CollectionCache<C, A = C | C[]> extends Collection<C> {
  static cachePolicy: {
    id: string;
    policy: string;
    trigger: string;
  };

  onResume: (...args: any) => any;

  initializeFromCache(value: A): void;

  saveToCache(): void;

  findQuery(
    id: Stringable,
    options?: { logOnSend?: boolean; set?: boolean }
  ): Promise<C | undefined>;

  find(
    id: Stringable,
    options?: { logOnSend?: boolean; set?: boolean }
  ): Promise<C | undefined>;

  update(
    id: Stringable,
    options?: { logOnSend?: boolean; set?: boolean }
  ): Promise<C | undefined>;

  handle(values: A): void;

  gadd(id: C | Stringable): C;

  gaddUp(id: C | Stringable): C;

  delete(): void;

  isStateStale(id: Stringable): boolean;
}

exportModule(exports, { CollectionCache: 'default' }, (m) => m.CACHE_POLICY);
