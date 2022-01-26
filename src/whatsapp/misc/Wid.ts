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
/** @whatsapp 69678 */
export declare class Wid {
  constructor(
    id: string,
    options?: { intentionallyUsePrivateConstructor: boolean }
  );

  _serialized: string;

  agent?: string;

  device?: string;

  equals(wid: unknown): boolean;

  getDeviceId(): number;

  getSignalAddress(): string;

  isBroadcast(): boolean;

  isCompanion(): boolean;

  isGreaterThan(wid: unknown): boolean;

  isGroup(): boolean;

  isGroupCall(): boolean;

  isLessThan(wid: unknown): boolean;

  isOfficialBizAccount(): boolean;

  isPSA(): boolean;

  isServer(): boolean;

  isStatusV3(): boolean;

  isUser(): boolean;

  server: string;

  toJid(): string;

  toJSON(): string;

  toString(option?: { legacy?: boolean; formatFull?: boolean }): string;

  user: string;

  canBeWid(wid: string): boolean;

  static equals(a: string | Wid, b: string | Wid): boolean;

  static isBroadcast(wid: string | Wid): boolean;

  static isGreaterThan(a: string | Wid, b: string | Wid): boolean;

  static isGroup(wid: string | Wid): boolean;

  static isGroupCall(wid: string | Wid): boolean;

  static isLessThan(a: string | Wid, b: string | Wid): boolean;

  static isOfficialBizAccount(wid: string | Wid): boolean;

  static isPSA(wid: string | Wid): boolean;

  static isServer(wid: string | Wid): boolean;

  static isStatusV3(wid: string | Wid): boolean;

  static isUser(wid: string | Wid): boolean;

  static isWid(wid: string | Wid): boolean;

  static isXWid(server: string, wid: string | Wid): boolean;

  static user(wid: string): string | undefined;
}

exportModule(
  exports,
  {
    Wid: 'default',
  },
  (m) => m.default.isXWid
);
