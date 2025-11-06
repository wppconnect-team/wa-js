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

/**
 * @whatsapp WAWebApiContact
 * Exposing Lid / PhoneNumber cache functions
 * These functions manage the cache mapping between LID and Phone Numbers.
 * Without hitting whatsapp api.
 */
export declare namespace lidPnCache {
  function getPhoneNumber(lidWid: Wid): Wid | undefined;
  function getCurrentLid(phoneWid: Wid): Wid | undefined;
  function getLidEntry(
    lidWid: Wid
  ): { lid: Wid; phoneNumber: Wid; phoneNumberCreatedAt: number } | undefined;
  function add(
    lidWid: Wid,
    entry: { lid: Wid; phoneNumber: Wid; phoneNumberCreatedAt: number }
  ): void;
  function getAllLids(): Wid[];
  function clear(): void;
  function remove(lidWid: Wid): void;
}

exportModule(
  exports,
  { lidPnCache: 'lidPnCache' },
  (m) => m.lidPnCache && m.getLidEntry && m.getPhoneNumber && m.getCurrentLid
);
