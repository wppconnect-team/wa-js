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

/** @whatsapp 62583 */
export declare enum SOCKET_STATE {
  OPENING = 'OPENING',
  PAIRING = 'PAIRING',
  UNPAIRED = 'UNPAIRED',
  UNPAIRED_IDLE = 'UNPAIRED_IDLE',
  CONNECTED = 'CONNECTED',
  TIMEOUT = 'TIMEOUT',
  CONFLICT = 'CONFLICT',
  UNLAUNCHED = 'UNLAUNCHED',
  PROXYBLOCK = 'PROXYBLOCK',
  TOS_BLOCK = 'TOS_BLOCK',
  SMB_TOS_BLOCK = 'SMB_TOS_BLOCK',
  DEPRECATED_VERSION = 'DEPRECATED_VERSION',
}

/** @whatsapp 62583 */
export declare enum SOCKET_STREAM {
  DISCONNECTED = 'DISCONNECTED',
  SYNCING = 'SYNCING',
  RESUMING = 'RESUMING',
  CONNECTED = 'CONNECTED',
}

/** @whatsapp 62583 */
export declare enum WATCHED_SOCKET_STATE {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

exportModule(
  exports,
  {
    SOCKET_STATE: (m) => m.SOCKET_STATE || m.default.SOCKET_STATE,
    SOCKET_STREAM: (m) => m.SOCKET_STREAM || m.default.SOCKET_STREAM,
    WATCHED_SOCKET_STATE: (m) =>
      m.WATCHED_SOCKET_STATE || m.default.WATCHED_SOCKET_STATE,
  },
  (m) => m.SOCKET_STATE || m.default.SOCKET_STATE
);
