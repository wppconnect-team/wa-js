/*!
 * Copyright 2023 WPPConnect Team
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

import { assertWid } from '../../assert';
import { GroupMetadataStore, Wid } from '../../whatsapp';
import { getMembershipApprovalRequests } from '../../whatsapp/functions';

/**
 * Retrieve a lista of a membership approval requests
 *
 * @example
 * ```javascript
 * await WPP.group.getMembershipRequests(12345645@g.us);
 * ```
 *
 * @category Group
 */
export async function getMembershipRequests(groupId: string | Wid): Promise<
  {
    addedBy: Wid;
    id: Wid;
    parentGroupId?: Wid;
    requestMethod: 'InviteLink' | 'LinkedGroupJoin' | 'NonAdminAdd';
    t: number;
  }[]
> {
  groupId = assertWid(groupId);
  await GroupMetadataStore.find(groupId);
  return await getMembershipApprovalRequests(groupId);
}
