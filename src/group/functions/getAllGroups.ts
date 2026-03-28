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

import { get } from '../../chat';
import { ChatModel } from '../../whatsapp';
import { queryAllGroups } from '../../whatsapp/functions';

export type GroupGetAllGroupsOutput = ChatModel[];

/**
 * Get all groups
 *
 * @example
 * ```javascript
 * WPP.group.getAllGroups();
 * ```
 *
 * @category Group
 */
export async function getAllGroups(): Promise<GroupGetAllGroupsOutput> {
  const groupsArr = [];
  const groups = await queryAllGroups();
  for (const grp of groups) {
    const g = get({ chatId: grp.id._serialized });

    if (g) {
      groupsArr.push(g);
    }
  }
  return groupsArr;
}
