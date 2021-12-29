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
import { ChatStore, ContactStore, Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';

export async function create(
  groupName: string,
  participantsIds: (string | Wid) | (string | Wid)[]
) {
  if (!Array.isArray(participantsIds)) {
    participantsIds = [participantsIds];
  }

  const participantsWids = participantsIds.map(assertWid);

  const wids: Wid[] = [];

  for (const wid of participantsWids) {
    console.log('wid', wid);
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

    wids.push(info.wid);
  }

  ChatStore.on('all', console.log);

  const result = await wa_functions.sendCreateGroup(groupName, wids);

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

  return result;
}
