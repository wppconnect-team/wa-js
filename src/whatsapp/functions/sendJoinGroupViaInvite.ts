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

import * as webpack from '../../webpack';
import { Wid } from '..';
import { exportModule } from '../exportModule';
import { joinGroupViaInvite } from './joinGroupViaInvite';

/** @whatsapp 69586
 * @whatsapp 769586 >= 2.2222.8
 */
export declare function sendJoinGroupViaInvite(code: string): Promise<Wid>;

exportModule(
  exports,
  {
    sendJoinGroupViaInvite: 'sendJoinGroupViaInvite',
  },
  (m) => m.sendJoinGroupViaInvite
);

webpack.injectFallbackModule('sendJoinGroupViaInvite', {
  sendJoinGroupViaInvite: async (groupId: Wid) => {
    return await joinGroupViaInvite(groupId).then((value) => value.gid);
  },
});
