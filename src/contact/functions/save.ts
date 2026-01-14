/*!
 * Copyright 2025 WPPConnect Team
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
import { ApiContact, ContactModel } from '../../whatsapp';
import {
  saveContactAction,
  saveContactActionV2,
} from '../../whatsapp/functions';
import { get } from './get';

/**
 * Create new or update a contact in the device
 *
 * @example
 * ```javascript
 * await WPP.contact.save('5533999999999@c.us', 'John', {
 *   surname: 'Doe',
 *   syncAddressBook: true,
 * });
 * ```
 *
 * @category Contact
 */

export async function save(
  contactId: string | any,
  firstName: string,
  options?: {
    /** @deprecated Use lastName instead */
    surname?: string;
    /** @deprecated Use syncAddressBook instead, this one with typo was updated */
    syncAdressBook?: boolean;
    lastName?: string;
    syncAddressBook?: boolean;
  }
): Promise<ContactModel | undefined> {
  if (!contactId || !firstName) {
    throw new WPPError(
      'send_the_required_fields',
      'Please, send the contact id like <number@c.us> and the name for your contact'
    );
  }

  if (options?.syncAdressBook !== undefined) {
    console.warn(
      '[WPPConnect Warning] The "syncAdressBook" option is deprecated due to a typo. Please use "syncAddressBook" instead.'
    );
  }

  const wid = assertWid(contactId);
  const alternateWid = ApiContact.getAlternateUserWid(wid);

  const lid = wid.isLid()
    ? wid.user
    : alternateWid?.isLid()
      ? alternateWid.user
      : null;

  const phoneNumber =
    wid.server === 'c.us'
      ? wid.user
      : alternateWid.server === 'c.us'
        ? alternateWid.user
        : null;

  const syncToAddressbook =
    options?.syncAddressBook ?? options?.syncAdressBook ?? true;

  const lastName = options?.lastName ?? options?.surname ?? '';

  // Version >= 2.3000.1030209354 uses object parameter API
  if (isWhatsAppVersionGTE('2.3000.1030209354')) {
    await saveContactActionV2({
      phoneNumber,
      prevPhoneNumber: null,
      lid,
      username: null,
      firstName,
      lastName,
      syncToAddressbook,
    });
  } else {
    if (!phoneNumber) {
      throw new WPPError(
        'invalid_contact_id_for_legacy_version',
        'For WhatsApp versions below 2.3000.1030209354, only phone number contacts are supported'
      );
    }

    // Version < 2.3000.1030209354 uses positional parameters
    // saveContactAction(phoneNumber, prevPhoneNumber, lid, username, firstName, lastName, syncToAddressbook)
    await saveContactAction(
      phoneNumber,
      null,
      null,
      null,
      firstName,
      lastName,
      syncToAddressbook
    );
  }
  return await get(contactId);
}
