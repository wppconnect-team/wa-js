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
import { exportModule } from '../exportModule';

/**
 * @whatsapp 437722 >= 2.2222.8
 */
export declare function sendAddParticipants(
  group: Wid,
  participants: (Wid | { phoneNumber: Wid; lid?: Wid })[]
): Promise<{
  participants?: (
    | {
        [key: `${number}@c.us`]: {
          code: string;
          invite_code: string | null;
          invite_code_exp: string | null;
        };
      }
    | {
        userWid: Wid;
        code: string;
        invite_code: string | null;
        invite_code_exp: string | null;
      }
  )[];
  status: number;
  [key: `${number}@c.us`]: number;
}>;

/**
 * @whatsapp 437722 >= 2.2222.8
 */
export declare function sendRemoveParticipants(
  group: Wid,
  participants: Wid[]
): Promise<void>;

/**
 * @whatsapp 437722 >= 2.2222.8
 */
export declare function sendPromoteParticipants(
  group: Wid,
  participants: Wid[]
): Promise<void>;

/**
 * @whatsapp 437722 >= 2.2222.8
 */
export declare function sendDemoteParticipants(
  group: Wid,
  participants: Wid[]
): Promise<void>;

exportModule(
  exports,
  {
    sendAddParticipants: ['sendAddParticipants', 'addGroupParticipants'],
    sendRemoveParticipants: [
      'sendRemoveParticipants',
      'removeGroupParticipants',
    ],
    sendPromoteParticipants: [
      'sendPromoteParticipants',
      'promoteGroupParticipants',
    ],
    sendDemoteParticipants: [
      'sendDemoteParticipants',
      'demoteGroupParticipants',
    ],
  },
  (m) =>
    (m.sendAddParticipants &&
      m.sendRemoveParticipants &&
      m.sendPromoteParticipants &&
      m.sendDemoteParticipants) || // @whatsapp < 2.2301.5
    (m.addGroupParticipants &&
      m.removeGroupParticipants &&
      m.promoteGroupParticipants &&
      m.demoteGroupParticipants) // @whatsapp >= 2.2301.5
);
