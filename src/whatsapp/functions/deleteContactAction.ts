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
 * await deleteContactAction({ phoneNumber: wid });
 *
 * // Delete username contact
 * await deleteContactAction({ username: 'john', lid: '123' });
 */
export declare function deleteContactAction(params: {
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
