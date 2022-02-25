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

import { Wid } from '..';
import { GROUP_SETTING_TYPE } from '../enums';
import { exportModule } from '../exportModule';

/** @whatsapp 57490 */
export declare function sendSetGroupSubject(
  groupId: Wid,
  subject: string
): Promise<void>;

/** @whatsapp 57490 */
export declare function sendSetGroupDescription(
  groupId: Wid,
  description: string,
  tagId: string,
  previousTagId?: string
): Promise<void>;

/** @whatsapp 57490 */
export declare function sendSetGroupProperty(
  groupId: Wid,
  property: GROUP_SETTING_TYPE,
  value: number
): Promise<void>;

exportModule(
  exports,
  {
    sendSetGroupSubject: 'sendSetGroupSubject',
    sendSetGroupDescription: 'sendSetGroupDescription',
    sendSetGroupProperty: 'sendSetGroupProperty',
  },
  (m) =>
    m.sendSetGroupSubject && m.sendSetGroupDescription && m.sendSetGroupProperty
);
