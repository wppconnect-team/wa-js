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

/**
 * @whatsapp 49835
 */
export declare enum CALL_STATES {
  INCOMING_RING = 'INCOMING_RING',
  OUTGOING_RING = 'OUTGOING_RING',
  OUTGOING_CALLING = 'OUTGOING_CALLING',
  CONNECTING = 'CONNECTING',
  CONNECTION_LOST = 'CONNECTION_LOST',
  ACTIVE = 'ACTIVE',
  HANDLED_REMOTELY = 'HANDLED_REMOTELY',
  ENDED = 'ENDED',
  REJECTED = 'REJECTED',
  REMOTE_CALL_IN_PROGRESS = 'REMOTE_CALL_IN_PROGRESS',
  FAILED = 'FAILED',
  NOT_ANSWERED = 'NOT_ANSWERED',
}

exportModule(
  exports,
  {
    CALL_STATES: 'CALL_STATES',
  },
  (m) => m.CALL_STATES
);
