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

import { ensureGroupAndParticipants } from '../../group';
import { Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';

/**
 * Remove admin of community participant
 *
 * @example
 * ```javascript
 * await WPP.community.demoteParticipants('123456@g.us', '123456@c.us');
 * ```
 *
 * @category Community
 */

export async function demoteParticipants(
  communityId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[]
): Promise<any> {
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
