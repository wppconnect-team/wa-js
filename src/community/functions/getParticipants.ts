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

import { assertWid } from '../../assert';
import { getCommunityParticipants as GetCommunityParticipants } from '../../whatsapp/functions';

const communityGetParticipantsSchema = z.object({
  communityId: z.string(),
});

export type CommunityGetParticipantsInput = z.infer<
  typeof communityGetParticipantsSchema
>;

export type CommunityGetParticipantsOutput = any;

/**
 * Get all participants of a community
 *
 * @example
 * ```javascript
 * const participants = await WPP.community.getParticipants({ communityId: '123456@g.us' });
 * ```
 *
 * @category Community
 */
export async function getParticipants(
  params: CommunityGetParticipantsInput
): Promise<CommunityGetParticipantsOutput> {
  const { communityId } = communityGetParticipantsSchema.parse(params);

  const wid = assertWid(communityId);
  return GetCommunityParticipants(wid);
}
