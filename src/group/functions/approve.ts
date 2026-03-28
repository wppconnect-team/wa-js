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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { membershipApprovalRequestAction } from '../../whatsapp/functions';

const groupApproveSchema = z.object({
  groupId: z.string(),
  membershipIds: z.array(z.string()),
});

export type GroupApproveInput = z.infer<typeof groupApproveSchema>;
export type GroupApproveOutput = { error: any; wid: Wid }[];

/**
 * Approve a membership request to group
 *
 * @example
 * ```javascript
 * await WPP.group.approve({ groupId: '12345645@g.us', membershipIds: ['5554999999999@c.us'] });
 * ```
 *
 * @category Group
 */
export async function approve(
  params: GroupApproveInput
): Promise<GroupApproveOutput> {
  const { groupId: rawGroupId, membershipIds } =
    groupApproveSchema.parse(params);
  const groupId = assertWid(rawGroupId);
  const wids = membershipIds.map(assertWid);

  try {
    return await membershipApprovalRequestAction(groupId, wids, 'Approve');
  } catch (_error) {
    throw new WPPError(
      'error_on_accept_membership_request',
      `Error on accept member on group ${groupId.toString()}`
    );
  }
}
