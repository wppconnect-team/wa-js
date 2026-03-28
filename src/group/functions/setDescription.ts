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

import { WPPError } from '../../util';
import {
  randomMessageId,
  sendSetGroupDescription,
} from '../../whatsapp/functions';
import { ensureGroup } from './';

const groupSetDescriptionSchema = z.object({
  groupId: z.string(),
  description: z.string(),
});

export type GroupSetDescriptionInput = z.infer<
  typeof groupSetDescriptionSchema
>;
export type GroupSetDescriptionOutput = true;

/**
 * Define the group description
 *
 * @example
 * ```javascript
 * await WPP.group.setDescription({ groupId: '[group-id]@g.us', description: 'new group description' });
 * ```
 *
 * @category Group
 */
export async function setDescription(
  params: GroupSetDescriptionInput
): Promise<GroupSetDescriptionOutput> {
  const { groupId, description } = groupSetDescriptionSchema.parse(params);
  const groupChat = await ensureGroup({ groupId });

  if (!groupChat.groupMetadata?.canSetDescription()) {
    throw new WPPError(
      'you_are_not_allowed_set_group_description',
      `You are not allowed to set group description in ${groupChat.id._serialized}`,
      {
        groupId: groupChat.id.toString(),
      }
    );
  }

  /**
   * @todo change randomMessageId to randomHex
   */
  const tagId = await Promise.resolve(randomMessageId());

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
