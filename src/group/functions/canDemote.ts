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

import { ensureGroupAndParticipants } from './';

const groupCanDemoteSchema = z.object({
  groupId: z.string(),
  participantsIds: z.array(z.string()),
});

export type GroupCanDemoteInput = z.infer<typeof groupCanDemoteSchema>;
export type GroupCanDemoteOutput = boolean;

/**
 * Check if your account is allowed to demote participants
 *
 * @example
 * ```javascript
 * await WPP.group.canDemote({ groupId: 'group@g.us', participantsIds: ['number@c.us'] });
 * console.log(result);
 * ```
 *
 * @category Group
 */
export async function canDemote(
  params: GroupCanDemoteInput
): Promise<GroupCanDemoteOutput> {
  const { groupId, participantsIds } = groupCanDemoteSchema.parse(params);
  const { groupChat, participants } = await ensureGroupAndParticipants({
    groupId,
    participantsIds,
  });

  return participants.every((p) =>
    groupChat.groupMetadata!.participants.canDemote(p)
  );
}
