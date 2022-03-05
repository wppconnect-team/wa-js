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

import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import {
  randomMessageId,
  sendSetGroupDescription,
} from '../../whatsapp/functions';
import { ensureGroup } from './';

/**
 * Define the group description
 *
 * @example
 * ```javascript
 * await WPP.group.setDescription('[group-id]@g.us', 'new group description');
 * ```
 *
 * @category Group
 */
export async function setDescription(
  groupId: string | Wid,
  description: string
) {
  const groupChat = await ensureGroup(groupId);

  if (!groupChat.groupMetadata?.canSetDescription()) {
    throw new WPPError(
      'you_are_not_allowed_set_group_description',
      `You are not allowed to set group description in ${groupChat.id._serialized}`,
      {
        groupId: groupChat.id.toString(),
      }
    );
  }

  const tagId = randomMessageId();

  await sendSetGroupDescription(
    groupChat.id,
    description,
    tagId,
    groupChat.groupMetadata?.descId
  );

  groupChat.groupMetadata!.descId = tagId;
  groupChat.groupMetadata!.desc = description;

  return true;
}
