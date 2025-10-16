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

/** @whatsapp 45454
 * @whatsapp 58021 >= 2.2204.13
 * @whatsapp 745454 >= 2.2222.8
 */

export function createUserWid(wid: string, server?: string): Wid {
  return (WidFactory.createUserWid || WidFactory.createUserWidOrThrow)(
    wid,
    server
  );
}

export declare namespace WidFactory {
  function createDeviceWid(wid: string): Wid;

  function createDeviceWidFromUserAndDevice(user: string, device: string): Wid;

  function createUserWid(user: string, server?: string): Wid;

  function createUserWidOrThrow(user: string, server?: string): Wid;

  function createWid(wid: string): Wid;

  function createWidFromWidLike(wid: string | { _serialized: string }): Wid;

  function isWidlike(wid: any): wid is Wid;

  // @deprecated
  function toChatWid(wid: Wid): Wid;

  // @deprecated
  function toUserWid(wid: Wid): Wid;

  function toGroupWid(wid: Wid): Wid;

  function userJidToUserWid(wid: string): Wid;

  function toUserLidOrThrow(wid: Wid): Wid;

  function toUserWidOrThrow(wid: Wid): Wid;

  function createWid(wid: Wid): Wid;
}

exportModule(exports, 'WidFactory', (m) => m.createWid);
