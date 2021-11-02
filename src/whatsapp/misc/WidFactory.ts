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

/** @whatsapp 2.2142.12:89573 */
export declare namespace WidFactory {
  function createDeviceWid(wid: string): Wid;

  function createDeviceWidFromUserAndDevice(user: string, device: string): Wid;

  function createUserWid(user: string, server?: string): Wid;

  function createWid(wid: string): Wid;

  function createWidFromWidLike(wid: string | { _serialized: string }): Wid;

  function isWidlike(wid: any): wid is Wid;

  function toChatWid(wid: Wid): Wid;

  function toUserWid(wid: Wid): Wid;

  function userJidToUserWid(wid: string): Wid;
}

exportModule(exports, 'WidFactory', (m) => m.createWid);
