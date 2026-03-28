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
import { sendSetGroupSubject } from '../../whatsapp/functions';
import { ensureGroup } from './';

const groupSetSubjectSchema = z.object({
  groupId: z.string(),
  subject: z.string(),
});

export type GroupSetSubjectInput = z.infer<typeof groupSetSubjectSchema>;
export type GroupSetSubjectOutput = boolean;

/**
 * Define the group subject
 *
 * @example
 * ```javascript
 * await WPP.group.setSubject({ groupId: '[group-id]@g.us', subject: 'new group subject' });
 * ```
 *
 * @category Group
 */
export async function setSubject(
  params: GroupSetSubjectInput
): Promise<GroupSetSubjectOutput> {
  const { groupId, subject } = groupSetSubjectSchema.parse(params);
  const groupChat = await ensureGroup({ groupId });

  if (!groupChat.groupMetadata?.canSetSubject()) {
    throw new WPPError(
      'you_are_not_allowed_set_group_subject',
      `You are not allowed to set group subject in ${groupChat.id._serialized}`,
      {
        groupId: groupChat.id.toString(),
      }
    );
  }

  await sendSetGroupSubject(groupChat.id, subject);

  groupChat.name = subject;
  groupChat.formattedTitle = subject;

  return true;
}
