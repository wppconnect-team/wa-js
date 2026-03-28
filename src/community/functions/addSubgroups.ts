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
import { sendLinkSubgroups as SendLinkSubgroups } from '../../whatsapp/functions';

const communityAddSubgroupsSchema = z.object({
  communityId: z.string(),
  subgroupIds: z.array(z.string()),
});

export type CommunityAddSubgroupsInput = z.infer<
  typeof communityAddSubgroupsSchema
>;

export type CommunityAddSubgroupsOutput = {
  failedGroups: { error: string; jid: string }[];
  linkedGroupJids: string[];
};

/**
 * Add groups to a community
 *
 * @example
 * ```javascript
 * await WPP.community.addSubgroups({
 *   communityId: '123456@g.us',
 *   subgroupIds: ['[groupId1]', '[groupId2]'],
 * });
 * ```
 *
 * @category Community
 */
export async function addSubgroups(
  params: CommunityAddSubgroupsInput
): Promise<CommunityAddSubgroupsOutput> {
  const { communityId, subgroupIds } =
    communityAddSubgroupsSchema.parse(params);

  const parentWid = assertWid(communityId);
  const subGroupsWids = subgroupIds.map(assertWid);
  return await SendLinkSubgroups({
    parentGroupId: parentWid,
    subgroupIds: subGroupsWids,
  });
}
