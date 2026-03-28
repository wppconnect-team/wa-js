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
import * as wa_functions from '../../whatsapp/functions';
import { ensureGroup } from './ensureGroup';
import { ensureGroupAndParticipants } from './ensureGroupAndParticipants';

const groupRemoveParticipantsSchema = z.object({
  groupId: z.string(),
  participantsIds: z.array(z.string()),
});

export type GroupRemoveParticipantsInput = z.infer<
  typeof groupRemoveParticipantsSchema
>;
export type GroupRemoveParticipantsOutput = void;

/**
 * Remove participants of a group
 *
 * @example
 * ```javascript
 * // One member
 * await WPP.group.removeParticipants({ groupId: '123456@g.us', participantsIds: ['123456@c.us'] });
 *
 * // More than one member
 * await WPP.group.removeParticipants({ groupId: '123456@g.us', participantsIds: ['123456@c.us','123456@c.us'] });
 * ```
 *
 * @category Group
 */
export async function removeParticipants(
  params: GroupRemoveParticipantsInput
): Promise<GroupRemoveParticipantsOutput> {
  const { groupId, participantsIds } =
    groupRemoveParticipantsSchema.parse(params);

  const groupChat = await ensureGroup({ groupId, checkIsAdmin: true });
  const validParticipantStrings: string[] = [];
  const wids = participantsIds.map(assertWid);

  wids.forEach((wid) => {
    const participant = groupChat.groupMetadata?.participants.get(wid);
    if (participant) validParticipantStrings.push(wid.toString());
  });

  if (validParticipantStrings.length === 0)
    throw new WPPError(
      'not_valid_group_participants',
      `No valid participants found for the group ${groupId}`
    );

  const { participants } = await ensureGroupAndParticipants({
    groupId,
    participantsIds: validParticipantStrings,
  });

  if (
    participants.some(
      (p) => !groupChat.groupMetadata?.participants.canRemove(p)
    )
  ) {
    throw new WPPError(
      'group_participant_is_not_a_group_member',
      `Group ${groupChat.id._serialized}: Group participant is not a group member`
    );
  }

  return wa_functions.removeParticipants(groupChat, participants);
}
