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

import { exportModule } from '../exportModule';
import { Wid } from '../misc';

/**
 * Deletes a contact from the contact list (legacy API).
 *
 * @whatsapp WAWebDeleteContactAction >= 2.3000.0
 * @whatsapp ~2.3000.1030040369
 *
 * @param number - Phone number string
 *
 * @deprecated Since around WhatsApp version 2.3000.1030110621. Use the new object-based API instead.
 *             Use `deleteContactActionV2({ phoneNumber: wid })` for regular contacts
 *             or `deleteContactActionV2({ username, lid })` for username contacts.
 *
 * @example
 * // Deprecated usage
 * await deleteContactAction('5511999999999');
 *
 * // Use this instead
 * await deleteContactActionV2({ phoneNumber: wid });
 */
export declare function deleteContactAction(number: string): Promise<void>;

/**
 * Deletes a contact from the contact list.
 *
 * @whatsapp WAWebDeleteContactAction >= 2.3000.1030110621
 *
 * @param params - Object with contact identifiers
 * @param params.phoneNumber - Contact phone number as Wid (for regular contacts)
 * @param params.username - Contact username (for username contacts)
 * @param params.lid - Contact LID (for username contacts)
 *
 * @example
 * // Delete regular contact by phone number
 * await deleteContactActionV2({ phoneNumber: wid });
 *
 * // Delete username contact
 * await deleteContactActionV2({ username: 'john', lid: '123' });
 */
export declare function deleteContactActionV2(params: {
  phoneNumber?: Wid;
  username?: string;
  lid?: string;
}): Promise<void>;

exportModule(
  exports,
  {
    deleteContactAction: 'deleteContactAction',
    deleteContactActionV2: 'deleteContactAction',
  },
  (m) => m.deleteContactAction
);
