/*!
 * Copyright 2021 WPPConnect Team
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

import { Wid } from '../../whatsapp';
import { sendCreateCommunity } from '../../whatsapp/functions';
import { sendLinkSubgroups } from './sendLinkSubgroups';

/**
 * Create community
 *
 * @example
 * ```javascript
 * await WPP.community.create('Name for community', 'description for community', ['120363048977606406@g.us', ''120363048977606406@g.us']);
 * ```
 */
export async function create(
  name: string,
  desc: string,
  subGroupsIds: Wid[]
): Promise<any> {
  const community = await sendCreateCommunity({
    name: name,
    desc: desc,
    closed: false,
  });
  console.log(community);
  return await sendLinkSubgroups(community.wid, subGroupsIds);
}
