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

import { ensureGroup } from './';

const groupIAmRestrictedMemberSchema = z.object({
  groupId: z.string(),
});

export type GroupIAmRestrictedMemberInput = z.infer<
  typeof groupIAmRestrictedMemberSchema
>;
export type GroupIAmRestrictedMemberOutput = boolean;

export async function iAmRestrictedMember(
  params: GroupIAmRestrictedMemberInput
): Promise<GroupIAmRestrictedMemberOutput> {
  const { groupId } = groupIAmRestrictedMemberSchema.parse(params);
  const groupChat = await ensureGroup({ groupId });
  return groupChat.groupMetadata!.participants.iAmRestrictedMember();
}
