/*!
 * Copyright 2024 WPPConnect Team
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
import { isWhatsAppVersionGTE } from '../../conn/functions';
import { WPPError } from '../../util';
import { ContactModel, Wid } from '../../whatsapp';
import {
  deleteContactAction,
  deleteContactActionV2,
  getIsMyContact,
} from '../../whatsapp/functions';
import { get } from './get';

/**
 * Remove/delete contact in the device
 *
 * @example
 * ```javascript
 * await WPP.contact.remove('5533999999999@c.us');
 * ```
 *
 * @category Contact
 */

export async function remove(
  contactId: string | Wid
): Promise<ContactModel | undefined> {
  contactId = assertWid(contactId);
  const contact = await get(contactId);
  if (!contact) throw new WPPError('contact_not_found', 'Contact not found');
  const isMyContact = getIsMyContact(contact);
  if (!isMyContact)
    throw new WPPError(
      'number_is_not_your_contact',
      `The number ${contactId._serialized} is not your contact`
    );

  // Version 2.3000.1030110621+ uses the new object-based API
  if (isWhatsAppVersionGTE('2.3000.1030110621')) {
    if (contactId.isLid()) {
      // Username contact - needs both lid and username
      const username = contact.username;
      await deleteContactActionV2({
        lid: contactId.toString(),
        username: username,
      });
    } else {
      // Regular contact
      await deleteContactActionV2({ phoneNumber: contactId });
    }
  } else {
    // Legacy API for older versions
    await deleteContactAction(contactId.user);
  }

  return await get(contactId);
}
