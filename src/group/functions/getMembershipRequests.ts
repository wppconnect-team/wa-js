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
import { GroupMetadataStore, Wid } from '../../whatsapp';
import { getMembershipApprovalRequests } from '../../whatsapp/functions';

const groupGetMembershipRequestsSchema = z.object({
  groupId: z.string(),
});

export type GroupGetMembershipRequestsInput = z.infer<
  typeof groupGetMembershipRequestsSchema
>;
export type GroupGetMembershipRequestsOutput = {
  addedBy: Wid;
  id: Wid;
  parentGroupId?: Wid;
  requestMethod: 'InviteLink' | 'LinkedGroupJoin' | 'NonAdminAdd';
  t: number;
}[];

/**
 * Retrieve a lista of a membership approval requests
 *
 * @example
 * ```javascript
 * await WPP.group.getMembershipRequests({ groupId: '12345645@g.us' });
 * ```
 *
 * @category Group
 */
export async function getMembershipRequests(
  params: GroupGetMembershipRequestsInput
): Promise<GroupGetMembershipRequestsOutput> {
  const { groupId: rawGroupId } =
    groupGetMembershipRequestsSchema.parse(params);
  const groupId = assertWid(rawGroupId);
  await GroupMetadataStore.find(groupId);
  return await getMembershipApprovalRequests(groupId);
}
