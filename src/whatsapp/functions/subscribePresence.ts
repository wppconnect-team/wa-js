/*!
 * Copyright 2024 WPPConnect Team
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
 * @whatsapp WAWebContactPresenceBridge
 */
export declare function subscribePresence(id: Wid, tcToken?: any): Promise<any>;

/**
 * Subscribe user presence (individual contact).
 * Replaces subscribePresence in WAWebContactPresenceBridge >= ~2.3000.1039447205
 *
 * @whatsapp WAWebContactPresenceBridge >= 2.3000.1039447205
 */
export declare function subscribeUserPresence(id: Wid): Promise<any>;

/**
 * Subscribe group presence.
 * Added in WAWebContactPresenceBridge >= ~2.3000.1039447205
 *
 * @whatsapp WAWebContactPresenceBridge >= 2.3000.1039447205
 */
export declare function subscribeGroupPresence(id: Wid): void;

exportModule(
  exports,
  {
    // WA < ~2.3000.1039447205: 'subscribePresence'; newer: falls back to 'subscribeUserPresence'
    subscribePresence: ['subscribePresence', 'subscribeUserPresence'],
    subscribeGroupPresence: 'subscribeGroupPresence',
  },
  (m, id) =>
    // WA >= ~2.3000.1039447205: module ID is 'WAWebContactPresenceBridge'
    id === 'WAWebContactPresenceBridge' ||
    // Legacy: function was a named export
    !!(m.subscribePresence || m.subscribeUserPresence)
);
