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

const communityPromoteParticipantsSchema = z.object({
  communityId: z.string(),
  participantsIds: z.array(z.string()),
});

export type CommunityPromoteParticipantsInput = z.infer<
  typeof communityPromoteParticipantsSchema
>;

export type CommunityPromoteParticipantsOutput = any;

/**
 * Promote community participants to admin
 *
 * @example
 * ```javascript
 * await WPP.community.promoteParticipants({
 *   communityId: '123456@g.us',
 *   participantsIds: ['[number]@c.us', '[number]@lid'],
 * });
 * ```
 *
 * @category Community
 */
export async function promoteParticipants(
  params: CommunityPromoteParticipantsInput
): Promise<CommunityPromoteParticipantsOutput> {
  const { communityId, participantsIds } =
    communityPromoteParticipantsSchema.parse(params);

  const { groupChat, participants } = await ensureGroupAndParticipants(
    communityId,
    participantsIds
  );

  return wa_functions.promoteCommunityParticipants(groupChat, participants);
}
