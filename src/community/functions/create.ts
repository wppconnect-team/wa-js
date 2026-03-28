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
import {
  sendCreateCommunity,
  sendLinkSubgroups,
} from '../../whatsapp/functions';

const communityCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  subgroupIds: z.array(z.string()),
});

export type CommunityCreateInput = z.infer<typeof communityCreateSchema>;

export type CommunityCreateOutput = any; // TODO: define output type based on sendCreateCommunity and sendLinkSubgroups results

/**
 * Create a community
 *
 * @example
 * ```javascript
 * const community = await WPP.community.create({
 *   name: 'My Community',
 *   description: 'Community description',
 *   subgroupIds: ['[groupId1]', '[groupId2]'],
 * });
 * ```
 *
 * @category Community
 */
export async function create(
  params: CommunityCreateInput
): Promise<CommunityCreateOutput> {
  const { name, description, subgroupIds } =
    communityCreateSchema.parse(params);

  const subGroupsWids = subgroupIds.map(assertWid);
  const result = await sendCreateCommunity({
    name,
    desc: description,
    closed: false,
  });
  const linkGroups = await sendLinkSubgroups({
    parentGroupId: result.wid,
    subgroupIds: subGroupsWids,
  });

  return {
    wid: result.wid,
    subGroups: linkGroups,
  };
}
