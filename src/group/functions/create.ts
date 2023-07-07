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
import * as Chat from '../../chat';
import * as Contact from '../../contact';
import { WPPError } from '../../util';
import { ContactStore, UserPrefs, Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';

/**
 * Create a new group
 *
 * The method return a object with the result of each participant as the key
 *
 * @example
 * ```javascript
 * const result = await WPP.group.create('Test Group', ['number@c.us']);
 *
 * console.log(result.gid.toString()); // Get the group ID
 *
 * // Get participant result:
 * console.log(result['number@c.us'].code);
 * console.log(result['number@c.us'].invite_code);
 * console.log(result['number@c.us'].invite_code_exp);
 * console.log(result['number@c.us'].message);
 * console.log(result['number@c.us'].wid);
 *
 * const memberResult = result['number@c.us']; // To a variable
 * // or
 * const memberResult = Object.values(result)[0]; // Always the first member result
 *
 * // How to send a custom invite link
 * const link = 'https://chat.whatsapp.com/' + result['number@c.us'].invite_code;
 * console.log(link);
 *
 * // Create a Subgroup for a community
 * const result = await WPP.group.create('Test Group', ['number@c.us'], 'communit@g.us');
 * ```
 *
 * @category Group
 */
export async function create(
  groupName: string,
  participantsIds: (string | Wid) | (string | Wid)[],
  parentGroup: string | Wid
): Promise<{
  gid: Wid;
  participants: {
    [key: `${number}@c.us`]: {
      wid: string;
      code: number;
      invite_code: string | null;
      invite_code_exp: number | null;
    };
  };
}> {
  if (!Array.isArray(participantsIds)) {
    participantsIds = [participantsIds];
  }

  const participantsWids = participantsIds.map(assertWid);

  const meWid = UserPrefs.getMaybeMeUser();
  const wids: Wid[] = [];

  for (const wid of participantsWids) {
    if (meWid.equals(wid)) {
      continue;
    }

    const contact = ContactStore.get(wid);
    if (contact) {
      wids.push(contact.id);
      continue;
    }

    const info = await Contact.queryExists(wid);

    if (!info) {
      throw new WPPError('participant_not_exists', 'Participant not exists', {
        id: wid,
      });
    }

    if (meWid.equals(info.wid)) {
      continue;
    }

    wids.push(info.wid);
  }

  const parentWid = parentGroup ? assertWid(parentGroup) : undefined;

  const result = await wa_functions.sendCreateGroup(
    groupName,
    wids,
    undefined,
    parentWid
  );

  if (result.gid) {
    const chatGroup = await Chat.find(result.gid);

    // Wait group meta to be not stale
    if (chatGroup.groupMetadata?.stale !== false) {
      await new Promise<void>((resolve) => {
        chatGroup.on('change:groupMetadata.stale', function fn() {
          if (chatGroup.groupMetadata?.stale === false) {
            resolve();
            chatGroup.off('change:groupMetadata.stale', fn);
          }
        });
      });
    }
  }

  const participants: {
    [key: `${number}@c.us`]: {
      wid: string;
      code: number;
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

    participants[userWid as `${number}@c.us`] = {
      wid: userWid,
      code: Number(code),
      invite_code: invite_code,
      invite_code_exp: Number(invite_code_exp) || null,
    };
  }

  return {
    gid: result.gid,
    participants,
  };
}
