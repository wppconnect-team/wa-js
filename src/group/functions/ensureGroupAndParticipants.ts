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
import { ParticipantModel, Wid } from '../../whatsapp';
import { ensureGroup } from '.';

export function ensureGroupAndParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[],
  createIfNotExists = false
) {
  const groupChat = ensureGroup(groupId, true);

  if (!Array.isArray(participantsIds)) {
    participantsIds = [participantsIds];
  }

  const wids = participantsIds.map(assertWid);

  const participants = wids.map<ParticipantModel>((wid) => {
    let participant = groupChat.groupMetadata?.participants.get(wid);

    if (!participant && createIfNotExists) {
      participant = new ParticipantModel({
        id: wid,
      });
    }

    if (!participant) {
      throw new WPPError(
        'group_participant_not_found',
        `Chat ${groupChat.id._serialized} is not a group`
      );
    }

    return participant;
  });

  return {
    groupChat,
    participants,
  };
}
