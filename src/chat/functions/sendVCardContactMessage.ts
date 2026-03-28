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
import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import {
  ContactModel,
  ContactStore,
  VCard,
  VCardData,
  Wid,
} from '../../whatsapp';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  sendMessageOptionsSchema,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface VCardContact {
  id: string | Wid;
  name: string;
}

const vCardContactSchema = z.object({ id: z.string(), name: z.string() });

const chatSendVCardContactMessageSchema = z.object({
  chatId: z.string(),
  contacts: z.array(vCardContactSchema),
  options: sendMessageOptionsSchema.optional(),
});
export type ChatSendVCardContactMessageInput = z.infer<
  typeof chatSendVCardContactMessageSchema
>;
export type ChatSendVCardContactMessageOutput = SendMessageReturn;

/**
 * Send one or more contacts as a vCard message
 *
 * @example
 * ```javascript
 * // Send a single contact by ID (name resolved from contact store)
 * WPP.chat.sendVCardContactMessage({
 *   chatId: '[number]@c.us',
 *   contacts: ['[contact]@c.us'],
 * });
 *
 * // Send a single contact with a custom display name
 * WPP.chat.sendVCardContactMessage({
 *   chatId: '[number]@c.us',
 *   contacts: [{ id: '[contact]@c.us', name: 'John Doe' }],
 * });
 *
 * // Send multiple contacts at once
 * WPP.chat.sendVCardContactMessage({
 *   chatId: '[number]@c.us',
 *   contacts: [
 *     { id: '[contact1]@c.us', name: 'Alice' },
 *     { id: '[contact2]@c.us', name: 'Bob' },
 *   ],
 * });
 * ```
 * @category Message
 */
export async function sendVCardContactMessage(
  params: ChatSendVCardContactMessageInput
): Promise<ChatSendVCardContactMessageOutput> {
  const {
    chatId,
    contacts,
    options: opts = {},
  } = chatSendVCardContactMessageSchema.parse(params);
  const options: SendMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as SendMessageOptions),
  };

  const vcards: VCardData[] = [];

  for (const contact of contacts) {
    const id = contact.id;
    let name = contact.name;

    let contactModel = ContactStore.get(id);
    if (!contactModel) {
      contactModel = new ContactModel({
        id: assertWid(id),
        name,
      });
    }

    const user = getMyUserWid();

    if (!name && contactModel.id.equals(user)) {
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

  return sendRawMessage({ chatId, rawMessage: message, options });
}
