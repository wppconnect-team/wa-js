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

import { createWid, WPPError } from '../../util';
import { ContactStore, Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';
import { ensureGroupAndParticipants } from './ensureGroupAndParticipants';

const messageCodes: {
  [key: number]: string;
} = {
  403: "Can't join this group because the number was restricted it.",
  409: "Can't join this group because the number is already a member of it.",
};

/**
 * Add one or more participants to a group
 *
 * The method return a object with the result of each participant as the key
 *
 * @example
 * ```javascript
 * await WPP.group.addParticipants('[group@g.us]', [number@c.us]);
 * ```
 *
 * @category Group
 */
export async function addParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[]
): Promise<{
  [key: `${number}@c.us`]: {
    code: number;
    message: string;
    invite_code: string | null;
    invite_code_exp: number | null;
  };
}> {
  const { groupChat, participants } = await ensureGroupAndParticipants(
    groupId,
    participantsIds,
    true
  );

  const result = await wa_functions.sendAddParticipants(
    groupChat.id,
    participants.map((p) => p.id)
  );

  if (result.status >= 400) {
    throw new WPPError(
      'group_add_participant_error',
      'Failed to add participants to the group',
      { groupId, participantsIds }
    );
  }

  const data: {
    [key: `${number}@c.us`]: {
      code: number;
      message: string;
      invite_code: string | null;
      invite_code_exp: number | null;
    };
  } = {};

  for (const r of result.participants || []) {
    const firstKey = Object.keys(r)[0] as `${number}@c.us`;

    const d = r[firstKey];

    if (d.code !== '403') {
      try {
        ContactStore.gadd(createWid(firstKey) as any, { silent: true });
      } catch (error) {}
    }

    data[firstKey] = {
      code: Number(d.code),
      message: messageCodes[Number(d.code)] || "Can't Join.",
      invite_code: d.invite_code,
      invite_code_exp: Number(d.invite_code) || null,
    };
  }

  return data;
}
