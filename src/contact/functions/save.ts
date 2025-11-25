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

import { compare } from 'compare-versions';

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { ContactModel } from '../../whatsapp';
import { saveContactAction } from '../../whatsapp/functions';
import { get } from './get';

/**
 * Create new or update a contact in the device
 *
 * @example
 * ```javascript
 * await WPP.contact.save('5533999999999@c.us', 'John', {
 *   surname: 'Doe',
 *   syncAdressBook: true,
 * });
 * ```
 *
 * @category Contact
 */

export async function save(
  contactId: string | any,
  name: string,
  options?: { surname?: string; syncAdressBook?: boolean }
): Promise<ContactModel | undefined> {
  if (!contactId || !name) {
    throw new WPPError(
      'send_the_required_fields',
      'Please, send the contact id like <number@c.us> and the name for your contact'
    );
  }
  contactId = assertWid(contactId);
  const cleanContactId = (contactId?.toString() || '').split('@')[0];
  if (!cleanContactId) {
    throw new WPPError('invalid_contact_id', 'Invalid contact ID format');
  }
  if (compare(self.Debug.VERSION, '2.3000.1029', '>=')) {
    await saveContactAction(
      cleanContactId,
      null,
      null,
      null,
      name,
      options?.surname ?? '',
      options?.syncAdressBook ?? true
    );
  } else {
    await saveContactAction(
      cleanContactId,
      null,
      name,
      options?.surname ?? '',
      options?.syncAdressBook ?? true
    );
  }
  return await get(contactId);
}
