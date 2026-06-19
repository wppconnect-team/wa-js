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
 * @whatsapp 153438 >= 2.2301.5
 *
 * When `membershipApprovalMode` is `false` (default) the server must respond
 * with a `<group>` node; when `true` it must respond with
 * `<membership_approval_request>`.  If the wrong node is returned the function
 * throws `UnexpectedJoinGroupViaInviteResponse` (see WAWebBackendErrors).
 */
export declare function joinGroupViaInvite(
  code: string,
  membershipApprovalMode: boolean
): Promise<{ gid: Wid }>;

exportModule(
  exports,
  {
    joinGroupViaInvite: 'joinGroupViaInvite',
  },
  (m) => m.joinGroupViaInvite && m.resetGroupInviteCode
);
