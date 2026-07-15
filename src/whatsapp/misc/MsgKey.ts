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

import { exportModule } from '../exportModule';
import { Wid } from './Wid';

/** @whatsapp 65212
 * @whatsapp 32219 >= 2.2204.13
 * @whatsapp 465212 >= 2.2222.8
 */
export declare class MsgKey {
  constructor(
    options:
      | {
          from: Wid;
          to: Wid;
          id: string;
          participant?: any;
          selfDir: 'in' | 'out';
        }
      | { fromMe: boolean; remote: Wid; id: string; participant?: any }
  );

  fromMe: boolean;
  id: string;
  remote: Wid;
  participant: any;
  _serialized: string;
  toString(): string;
  clone(): MsgKey;
  equals(key: unknown): key is MsgKey;

  static fromString(key: string): MsgKey;

  /**
   * @whatsapp >= 2.2208.7
   */
  static newId(): Promise<string>;
}

exportModule(
  exports,
  {
    MsgKey: 'default',
  },
  (m) => {
    if (
      !m?.default?.toString().includes('MsgKey error: obj is null/undefined')
    ) {
      return false;
    }

    /**
     * WhatsApp >= 2.3000.1042401057 caches the serialized key in a minified
     * property (`this.$1 = [...].join('_')`) instead of `this._serialized`,
     * so message keys stopped exposing `_serialized` (events like ack and
     * sendMessage delivered ids without it). Alias the minified property
     * back to an own enumerable `_serialized` on each instance.
     */
    try {
      const proto = m.default.prototype;
      const cached = /\breturn this\.([$A-Za-z_][\w$]*)/.exec(
        Function.prototype.toString.call(proto.toString)
      )?.[1];

      if (
        cached &&
        cached !== '_serialized' &&
        !Object.getOwnPropertyDescriptor(proto, cached)
      ) {
        Object.defineProperty(proto, cached, {
          configurable: true,
          get: function (this: any) {
            return this._serialized;
          },
          set: function (this: any, value: string) {
            Object.defineProperty(this, '_serialized', {
              value,
              writable: true,
              enumerable: true,
              configurable: true,
            });
          },
        });
      }
    } catch {}

    return true;
  }
);
