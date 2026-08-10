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

import { assertUsername, assertUsernameKey } from '../../assert';
import { Wid } from '../../whatsapp';
import { queryUsernameExists as nativeQueryUsernameExists } from '../../whatsapp/functions/sendQueryUsernameExists';

export interface QueryUsernameExistsResult {
  wid: Wid;
  biz: boolean;
  bizInfo?: {
    verifiedName?: {
      isApi: boolean;
      level: string;
      name: string;
      privacyMode: any;
      serial?: string;
    };
  };
  username?: string;
  wasUpdated: boolean;
  isUsernameSearch: true;
}

export interface QueryUsernameExistsKeyRequired {
  keyRequired: true;
  username?: string;
  isUsernameSearch: true;
}

/**
 * Check if a WhatsApp username (@username) exists
 *
 * A leading `@` is optional and stripped before querying. The username is
 * validated locally first, using the same rules as WhatsApp Web, and throws
 * {@link InvalidUsername} when malformed — WhatsApp reports a malformed
 * username and an unknown one identically, so validating up front keeps the
 * two distinguishable and avoids a pointless round trip.
 *
 * Some accounts protect their username with a 4 digit PIN. When the account
 * has PIN protection enabled, this function returns `{ keyRequired: true }`
 * instead of contact info. Pass the PIN as `key` to unlock the result.
 *
 * The returned `wid` is the contact's LID. Usernames are mutable and the LID
 * is not, so resolve once and store the LID: use it for every later operation
 * instead of looking the username up again.
 *
 * @example
 * ```javascript
 * // Basic lookup, with or without the @ prefix
 * const result = await WPP.contact.queryUsernameExists('@someusername');
 * if (!result) {
 *   // Username does not exist
 * } else if ('keyRequired' in result) {
 *   // Username is PIN-protected — prompt the user for the PIN
 * } else {
 *   console.log(result.wid); // The contact's LID, store this
 * }
 *
 * // With PIN
 * const result = await WPP.contact.queryUsernameExists('someusername', '1234');
 * ```
 *
 * @param username The username, with or without the leading `@`
 * @param key The 4 digit numeric PIN, for PIN-protected usernames
 *
 * @throws {InvalidUsername} When the username does not match WhatsApp's rules
 * @throws {InvalidUsernameKey} When `key` is not a 4 digit numeric PIN
 *
 * @category Contact
 */
export async function queryUsernameExists(
  username: string,
  key?: string
): Promise<QueryUsernameExistsResult | QueryUsernameExistsKeyRequired | null> {
  const normalized = assertUsername(username);

  if (key != null) {
    assertUsernameKey(key);
  }

  return nativeQueryUsernameExists(normalized, key) as Promise<
    QueryUsernameExistsResult | QueryUsernameExistsKeyRequired | null
  >;
}
