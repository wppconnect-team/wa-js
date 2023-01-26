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
import { Wid } from '../../whatsapp';
import {
  sendCreateCommunity,
  sendLinkSubgroups,
} from '../../whatsapp/functions';

/**
 * Create a community
 *
 * @example
 * ```javascript
 * await WPP.community.create('Name for community', 'description for community', ['120363048977606406@g.us', ''120363048977606406@g.us']);
 * ```
 */
export async function create(
  name: string,
  desc: string,
  subGroupsIds: (string | Wid) | (string | Wid)[]
): Promise<any> {
  if (!Array.isArray(subGroupsIds)) {
    subGroupsIds = [subGroupsIds];
  }

  const subGroupsWids = subGroupsIds.map(assertWid);
  const result = await sendCreateCommunity({
    name: name,
    desc: desc,
    closed: false,
  });
  await sendLinkSubgroups({
    parentGroupId: result.wid,
    subgroupIds: subGroupsWids,
  });

  return {
    wid: result.wid,
    subGroups: subGroupsWids,
  };
}
