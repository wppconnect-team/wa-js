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

import { ChatModel, ParticipantModel } from '..';
import { exportModule } from '../exportModule';

/** @whatsapp 97449 */
export declare function addParticipants(
  group: ChatModel,
  participants: ParticipantModel[]
): Promise<void>;

/** @whatsapp 97449 */
export declare function removeParticipants(
  group: ChatModel,
  participants: ParticipantModel[]
): Promise<void>;

/** @whatsapp 97449 */
export declare function promoteParticipants(
  group: ChatModel,
  participants: ParticipantModel[]
): Promise<void>;

/** @whatsapp 97449 */
export declare function demoteParticipants(
  group: ChatModel,
  participants: ParticipantModel[]
): Promise<void>;

exportModule(
  exports,
  {
    addParticipants: 'addParticipants',
    removeParticipants: 'removeParticipants',
    promoteParticipants: 'promoteParticipants',
    demoteParticipants: 'demoteParticipants',
  },
  (m) =>
    m.addParticipants &&
    m.removeParticipants &&
    m.promoteParticipants &&
    m.demoteParticipants &&
    !m.updateParticipants
);
