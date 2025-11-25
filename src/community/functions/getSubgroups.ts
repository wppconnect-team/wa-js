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

import { WPPError } from '../../util';
import { GroupMetadataStore, Wid } from '../../whatsapp';

/**
 * Get all subgroups of a community
 * You can pass id of group community, or id of a inside a grupo
 *
 * @example
 * ```javascript
 * await WPP.community.getSubgroups('123456@g.us');
 * ```
 *
 * @category Community
 */

export function getSubgroups(communityId: string | Wid): Wid[] {
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
