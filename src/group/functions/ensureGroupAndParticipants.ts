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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { ChatModel, ParticipantModel } from '../../whatsapp';
import { ensureGroup } from '.';

const groupEnsureGroupAndParticipantsSchema = z.object({
  groupId: z.string(),
  participantsIds: z.array(z.string()),
  createIfNotExists: z.boolean().optional(),
});

export type GroupEnsureGroupAndParticipantsInput = z.infer<
  typeof groupEnsureGroupAndParticipantsSchema
>;
export type GroupEnsureGroupAndParticipantsOutput = {
  groupChat: ChatModel;
  participants: ParticipantModel[];
};

export async function ensureGroupAndParticipants(
  params: GroupEnsureGroupAndParticipantsInput
): Promise<GroupEnsureGroupAndParticipantsOutput> {
  const {
    groupId,
    participantsIds,
    createIfNotExists = false,
  } = groupEnsureGroupAndParticipantsSchema.parse(params);

  const groupChat = await ensureGroup({ groupId, checkIsAdmin: true });

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
