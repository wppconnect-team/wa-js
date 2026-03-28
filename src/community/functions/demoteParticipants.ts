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

import { z } from 'zod';

import { ensureGroupAndParticipants } from '../../group';
import * as wa_functions from '../../whatsapp/functions';

const communityDemoteParticipantsSchema = z.object({
  communityId: z.string(),
  participantsIds: z.array(z.string()),
});

export type CommunityDemoteParticipantsInput = z.infer<
  typeof communityDemoteParticipantsSchema
>;

export type CommunityDemoteParticipantsOutput = any;

/**
 * Remove admin role from community participants
 *
 * @example
 * ```javascript
 * await WPP.community.demoteParticipants({
 *   communityId: '[chatId]',
 *   participantsIds: ['[number]@[c.us | lid]'],
 * });
 * ```
 *
 * @category Community
 */
export async function demoteParticipants(
  params: CommunityDemoteParticipantsInput
): Promise<CommunityDemoteParticipantsOutput> {
  const { communityId, participantsIds } =
    communityDemoteParticipantsSchema.parse(params);

  const { groupChat, participants } = await ensureGroupAndParticipants(
    communityId,
    participantsIds
  );
  try {
    await wa_functions.demoteCommunityParticipants(groupChat, participants);
    return {
      participants: participantsIds,
      success: true,
    };
  } catch (error) {
    return {
      participants: participantsIds,
      success: false,
      error: error,
    };
  }
}
