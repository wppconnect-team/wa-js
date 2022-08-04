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
import {
  ContactModel,
  ContactStore,
  UserPrefs,
  VCard,
  VCardData,
  Wid,
} from '../../whatsapp';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface VCardContact {
  id: string | Wid;
  name: string;
}

/**
 * Send a VCard as message
 * @example
 * ```javascript
 * // single contact
 * WPP.chat.sendVCardContactMessage('[number]@c.us', {
 *   id: '123456@c.us',
 *   name: 'The Contact Name'
 * });
 *
 * // multiple contacts
 * WPP.chat.sendVCardContactMessage('[number]@c.us', [
 *   {
 *     id: '123456@c.us',
 *     name: 'The Contact Name'
 *   },
 *   {
 *     id: '456789@c.us',
 *     name: 'Another Contact'
 *   },
 * ]);
 *
 * ```
 * @category Message
 */
export async function sendVCardContactMessage(
  chatId: any,
  contacts: string | Wid | VCardContact | (string | Wid | VCardContact)[],
  options: SendMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  if (!Array.isArray(contacts)) {
    contacts = [contacts];
  }

  const vcards: VCardData[] = [];

  for (const contact of contacts) {
    let id = '';
    let name = '';

    if (typeof contact === 'object' && 'name' in contact) {
      id = contact.id.toString();
      name = contact.name;
    } else {
      id = contact.toString();
    }

    let contactModel = ContactStore.get(id);
    if (!contactModel) {
      contactModel = new ContactModel({
        id: assertWid(id),
        name,
      });
    }

    if (!name && contactModel.id.equals(UserPrefs.getMaybeMeUser())) {
      name = contactModel.displayName;
    }

    if (name) {
      // Create a clone
      contactModel = new ContactModel(contactModel.attributes);
      contactModel.name = name;
      Object.defineProperty(contactModel, 'formattedName', { value: name });
      Object.defineProperty(contactModel, 'displayName', { value: name });
    }

    vcards.push(VCard.vcardFromContactModel(contactModel));
  }

  const message: RawMessage = {};

  if (vcards.length === 1) {
    message.type = 'vcard';
    message.body = vcards[0].vcard;
    message.vcardFormattedName = vcards[0].displayName;
  } else {
    message.type = 'multi_vcard';
    message.vcardList = vcards;
  }

  return sendRawMessage(chatId, message, options);
}
