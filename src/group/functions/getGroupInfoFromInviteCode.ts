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

import { WPPError } from '../../util';
import { sendQueryGroupInvite } from '../../whatsapp/functions';

/**
 * Get group info from an inviteCode
 *
 * @example
 * ```javascript
 * await WPP.group.getGroupInfoFromInviteCode('<inviteCode>');
 * ```
 *
 * @category Group
 */
export async function getGroupInfoFromInviteCode(inviteCode: string) {
  inviteCode = inviteCode.replace('chat.whatsapp.com/', '');
  inviteCode = inviteCode.replace('invite/', '');
  inviteCode = inviteCode.replace('https://', '');
  inviteCode = inviteCode.replace('http://', '');

  const result = await sendQueryGroupInvite(inviteCode).catch(() => null);

  if (!result) {
    throw new WPPError('invalid_invite_code', 'Invalid Invite Code', {
      inviteCode,
    });
  }

  return {
    ...result,
    descOwner: result.descOwner?.toString(),
    id: result.id.toString(),
    owner: result.owner?.toString(),
    participants: result.participants.map((p) => ({
      ...p,
      id: p.id.toString(),
    })),
    subjectOwner: result.subjectOwner?.toString(),
  };
}
