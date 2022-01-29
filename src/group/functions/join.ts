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

import { sendJoinGroupViaInvite } from '../../whatsapp/functions';

/**
 * Join in a group from an invite code.
 *
 * @example
 * ```javascript
 * await WPP.group.join('abcde....');
 * ```
 *
 * @category Group
 */
export async function join(inviteCode: string) {
  inviteCode = inviteCode.replace('chat.whatsapp.com/', '');
  inviteCode = inviteCode.replace('invite/', '');
  inviteCode = inviteCode.replace('https://', '');
  inviteCode = inviteCode.replace('http://', '');

  const result = await sendJoinGroupViaInvite(inviteCode);

  return {
    id: result.toString(),
  };
}
