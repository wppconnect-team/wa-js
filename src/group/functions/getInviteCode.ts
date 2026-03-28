/*!
 * Copyright 2026 WPPConnect Team
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

import { z } from 'zod';

import { sendQueryGroupInviteCode } from '../../whatsapp/functions';
import { ensureGroup } from './';

const groupGetInviteCodeSchema = z.object({
  groupId: z.string(),
});

export type GroupGetInviteCodeInput = z.infer<typeof groupGetInviteCodeSchema>;
export type GroupGetInviteCodeOutput = string;

/**
 * Get the currend invite code of the group
 *
 * @example
 * ```javascript
 * const code = WPP.group.getInviteCode({ groupId: '[group-id]@g.us' });
 * const link = 'https://chat.whatsapp.com/' + code;
 * ```
 *
 * @category Group
 */
export async function getInviteCode(
  params: GroupGetInviteCodeInput
): Promise<GroupGetInviteCodeOutput> {
  const { groupId } = groupGetInviteCodeSchema.parse(params);
  const groupChat = await ensureGroup({ groupId, checkIsAdmin: true });

  return await sendQueryGroupInviteCode(groupChat.id);
}
