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
import * as wa_functions from '../../whatsapp/functions';
import { ensureGroupAndParticipants } from './ensureGroupAndParticipants';

export async function addParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[]
): Promise<void> {
  const { groupChat, participants } = await ensureGroupAndParticipants(
    groupId,
    participantsIds,
    true
  );

  if (
    participants.some((p) => groupChat.groupMetadata?.participants.get(p.id))
  ) {
    throw new WPPError(
      'group_participant_already_a_group_member',
      `Group ${groupChat.id._serialized}: Group participant already a group member`
    );
  }

  return wa_functions.addParticipants(groupChat, participants);
}
