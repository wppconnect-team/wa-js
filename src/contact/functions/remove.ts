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
import { ContactModel } from '../../whatsapp';
import { deleteContactAction, getIsMyContact } from '../../whatsapp/functions';
import { get } from './get';

const contactRemoveSchema = z.object({
  chatId: z.string(),
});

export type ContactRemoveInput = z.infer<typeof contactRemoveSchema>;

export type ContactRemoveOutput = ContactModel | undefined;

/**
 * Remove/delete contact in the device
 *
 * @example
 * ```javascript
 * await WPP.contact.remove({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */

export async function remove(
  params: ContactRemoveInput
): Promise<ContactRemoveOutput> {
  const { chatId: rawChatId } = contactRemoveSchema.parse(params);

  const chatId = assertWid(rawChatId);
  const contact = await get({ chatId: chatId.toString() });
  if (!contact) throw new WPPError('contact_not_found', 'Contact not found');
  const isMyContact = getIsMyContact(contact);
  if (!isMyContact)
    throw new WPPError(
      'number_is_not_your_contact',
      `The number ${chatId._serialized} is not your contact`
    );

  // Version 2.3000.1030110621+ uses the new object-based API
  if (chatId.isLid()) {
    // Username contact - needs both lid and username
    const username = contact.username;
    await deleteContactAction({
      lid: chatId.toString(),
      username: username,
    });
  } else {
    // Regular contact
    await deleteContactAction({ phoneNumber: chatId });
  }

  return await get({ chatId: chatId.toString() });
}
