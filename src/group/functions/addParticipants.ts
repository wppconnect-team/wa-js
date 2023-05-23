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

import { compare } from 'compare-versions';

import { createWid, WPPError } from '../../util';
import { ContactStore, functions, ParticipantModel, Wid } from '../../whatsapp';
import { ensureGroupAndParticipants } from './ensureGroupAndParticipants';

declare global {
  interface Window {
    Debug: {
      VERSION: string;
    };
  }
}

const messageCodes: {
  [key: number]: string;
} = {
  200: 'OK',
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
 * const result = await WPP.group.addParticipants('[group@g.us]', [number@c.us]);
 *
 * // Get participant result:
 * console.log(result['123@c.us'].code);
 * console.log(result['123@c.us'].invite_code);
 * console.log(result['123@c.us'].invite_code_exp);
 * console.log(result['123@c.us'].message);
 * console.log(result['123@c.us'].wid);
 *
 * const memberResult = result['123@c.us']; // To a variable
 * // or
 * const memberResult = Object.values(result)[0]; // Always the first member result
 *
 * // How to send a custom invite link
 * const link = 'https://chat.whatsapp.com/' + result['123@c.us'].invite_code;
 * console.log(link);
 * ```
 *
 * @category Group
 */
export async function addParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[]
): Promise<{
  [key: `${number}@c.us`]: {
    wid: string;
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

  let members: any[] = [];

  if (compare(self.Debug.VERSION, '2.2320.0', '>=')) {
    if (groupChat.groupMetadata?.isLidAddressingMode) {
      members = participants.map((p: ParticipantModel) => ({
        phoneNumber: p.id,
        lid: functions.getCurrentLid(p.id),
      }));
    } else {
      members = participants.map((p: ParticipantModel) => ({
        phoneNumber: p.id,
      }));
    }
  } else {
    if (groupChat.groupMetadata?.isLidAddressingMode) {
      members = participants.map((p: ParticipantModel) =>
        functions.getCurrentLid(p.id)
      );
    } else {
      members = participants.map((p: ParticipantModel) => p.id);
    }
  }

  const result = await functions.sendAddParticipants(groupChat.id, members);

  if (result.status >= 400) {
    throw new WPPError(
      'group_add_participant_error',
      'Failed to add participants to the group',
      { groupId, participantsIds }
    );
  }

  const data: {
    [key: `${number}@c.us`]: {
      wid: string;
      code: number;
      message: string;
      invite_code: string | null;
      invite_code_exp: number | null;
    };
  } = {};

  for (const r of result.participants || []) {
    let userWid: string | null = null;
    let code: string | null = null;
    let invite_code: string | null = null;
    let invite_code_exp: string | null = null;

    if ('userWid' in r) {
      userWid = r.userWid.toString();
      code = r.code;
      invite_code = r.invite_code;
      invite_code_exp = r.invite_code_exp;
    } else {
      userWid = Object.keys(r)[0] as `${number}@c.us`;

      const d = (r as any)[userWid];
      code = d.code;
      invite_code = d.invite_code;
      invite_code_exp = d.invite_code_exp;
    }

    if (code !== '403') {
      try {
        ContactStore.gadd(createWid(userWid) as any, { silent: true });
      } catch (error) {}
    }

    data[userWid as `${number}@c.us`] = {
      wid: userWid,
      code: Number(code),
      message: messageCodes[Number(code)] || "Can't Join., unknown error",
      invite_code: invite_code,
      invite_code_exp: Number(invite_code_exp) || null,
    };
  }

  return data;
}
