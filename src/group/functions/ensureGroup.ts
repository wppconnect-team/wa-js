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

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';
import { ChatModel, GroupMetadataStore } from '../../whatsapp';

const groupEnsureGroupSchema = z.object({
  groupId: z.string(),
  checkIsAdmin: z.boolean().optional(),
});

export type GroupEnsureGroupInput = z.infer<typeof groupEnsureGroupSchema>;
export type GroupEnsureGroupOutput = ChatModel;

export async function ensureGroup(
  params: GroupEnsureGroupInput
): Promise<GroupEnsureGroupOutput> {
  const { groupId, checkIsAdmin = false } =
    groupEnsureGroupSchema.parse(params);

  const groupChat = assertGetChat(groupId);

  if (!groupChat.id.isGroup()) {
    throw new WPPError(
      'not_a_group',
      `Chat ${groupChat.id._serialized} is not a group`
    );
  }

  const datagroup = await GroupMetadataStore.find(groupChat.id);

  if (
    checkIsAdmin &&
    !datagroup.participants.iAmAdmin() &&
    datagroup.memberAddMode !== 'all_member_add'
  ) {
    throw new WPPError(
      'group_you_are_not_admin',
      `You are not admin in ${groupChat.id._serialized}`
    );
  }

  return groupChat;
}
