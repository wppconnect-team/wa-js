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

/** @whatsapp 32219 */
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
}

exportModule(
  exports,
  {
    MsgKey: 'default',
  },
  (m) => m.default.toString().includes('MsgKey error: obj is null/undefined')
);
