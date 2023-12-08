/*!
 * Copyright 2022 WPPConnect Team
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
import { Wid } from '../misc';

/**
 * @whatsapp 355813
 */
export declare function GROUP_JID(jid: Wid): Promise<any>;
export declare function CHAT_JID(jid: Wid): Promise<any>;

exportModule(
  exports,
  {
    GROUP_JID: 'GROUP_JID',
    CHAT_JID: 'CHAT_JID',
  },
  (m) => m.GROUP_JID && m.CHAT_JID && m.wapNodeToVoipXml
);
