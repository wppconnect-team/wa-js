/*!
 * Copyright 2024 WPPConnect Team
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

import { WPPError } from '../../util';
import { GroupMetadataStore, Wid } from '../../whatsapp';

const communityGetSubgroupsSchema = z.object({
  communityId: z.string(),
});

export type CommunityGetSubgroupsInput = z.infer<
  typeof communityGetSubgroupsSchema
>;

export type CommunityGetSubgroupsOutput = Wid[];

/**
 * Get all subgroups of a community
 *
 * You can pass the community ID or the ID of any group inside the community
 *
 * @example
 * ```javascript
 * const subgroups = WPP.community.getSubgroups({ communityId: '123456@g.us' });
 * ```
 *
 * @category Community
 */
export function getSubgroups(
  params: CommunityGetSubgroupsInput
): CommunityGetSubgroupsOutput {
  const { communityId } = communityGetSubgroupsSchema.parse(params);

  const groupData = GroupMetadataStore.get(communityId.toString());
  if (!groupData) {
    throw new WPPError(
      'group_not_exist',
      `GroupId ${communityId?.toString()} not exists`
    );
  }

  if (groupData.joinedSubgroups?.length > 0) {
    return groupData.joinedSubgroups;
  } else {
    const parentGroupData = GroupMetadataStore.get(
      groupData.parentGroup?.toString()
    )!;
    return parentGroupData.joinedSubgroups;
  }
}
