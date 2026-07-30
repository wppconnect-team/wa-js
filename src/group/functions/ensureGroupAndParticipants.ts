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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { ChatModel, ParticipantModel, Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';
import { ensureGroup } from '.';

/**
 * Find a participant of a group, tolerating PN <-> LID addressing.
 *
 * Groups migrated to LID addressing keep their participant collection keyed by
 * `@lid` wids, so looking a member up by its phone number wid returns nothing
 * and every participant operation fails with `not_valid_group_participants` /
 * `group_participant_not_found` (close #3527). Try the alternate addressing of
 * the wid before giving up.
 */
export function findGroupParticipant(
  groupChat: ChatModel,
  wid: Wid
): ParticipantModel | undefined {
  const participants = groupChat.groupMetadata?.participants;

  if (!participants) {
    return undefined;
  }

  const candidates: (Wid | null | undefined)[] = [wid];

  try {
    candidates.push(
      wid.isLid()
        ? wa_functions.getPhoneNumber?.(wid)
        : wa_functions.getCurrentLid?.(wid)
    );
  } catch (_error) {
    // The lid <-> pn mapping is not always available, keep the direct lookup
  }

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const participant = participants.get(candidate);

    if (participant) {
      return participant;
    }
  }

  return undefined;
}

export async function ensureGroupAndParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[],
  createIfNotExists = false
) {
  const groupChat = await ensureGroup(groupId, true);

  if (!Array.isArray(participantsIds)) {
    participantsIds = [participantsIds];
  }

  const wids = participantsIds.map(assertWid);

  const participants = wids.map<ParticipantModel>((wid) => {
    let participant = findGroupParticipant(groupChat, wid);

    if (!participant && createIfNotExists) {
      participant = new ParticipantModel({
        id: wid,
      });
    }

    if (!participant) {
      throw new WPPError(
        'group_participant_not_found',
        `Group ${groupChat.id._serialized}: Participant '${wid._serialized}' not found`
      );
    }

    return participant;
  });

  return {
    groupChat,
    participants,
  };
}
