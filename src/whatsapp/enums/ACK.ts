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

/** @whatsapp 35470
 * @whatsapp 69618 >= 2.2204.13
 */
export declare enum ACK {
  MD_DOWNGRADE = -7,
  INACTIVE = -6,
  CONTENT_UNUPLOADABLE = -5,
  CONTENT_TOO_BIG = -4,
  CONTENT_GONE = -3,
  EXPIRED = -2,
  FAILED = -1,
  CLOCK = 0,
  SENT = 1,
  RECEIVED = 2,
  READ = 3,
  PLAYED = 4,
  PEER = 5,
}

/** @whatsapp 35470
 * @whatsapp 69618 >= 2.2204.13
 */
export declare enum EDIT_ATTR {
  SENDER_REVOKE = 7,
  ADMIN_REVOKE = 8,
}

/** @whatsapp 35470
 * @whatsapp 69618 >= 2.2204.13
 */
export declare enum ACK_STRING {
  SENDER = 'sender',
  DELIVERY = 'delivery',
  READ = 'read',
  PLAYED = 'played',
  INACTIVE = 'inactive',
  READ_SELF = 'read-self',
  PLAYED_SELF = 'played-self',
}

exportModule(
  exports,
  {
    ACK: ['ACK', 'default.ACK'],
    EDIT_ATTR: ['EDIT_ATTR', 'default.EDIT_ATTR'],
    ACK_STRING: ['ACK_STRING', 'default.ACK_STRING'],
  },
  (m) => m.ACK || m.default.ACK
);
