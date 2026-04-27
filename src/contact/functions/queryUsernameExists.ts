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

import { Wid } from '../../whatsapp';
import { queryUsernameExists as nativeQueryUsernameExists } from '../../whatsapp/functions/sendUsernameQueryExists';

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
 * Some accounts protect their username with a PIN. When the account has PIN
 * protection enabled, this function returns `{ keyRequired: true }` instead of
 * contact info. Pass the numeric PIN as `key` to unlock the result.
 *
 * @example
 * ```javascript
 * // Basic lookup
 * const result = await WPP.contact.queryUsernameExists('someusername');
 * if (result && 'keyRequired' in result) {
 *   // Username is PIN-protected — prompt the user for the PIN
 * } else if (result) {
 *   console.log(result.wid); // The contact's WID
 * }
 *
 * // With PIN
 * const result = await WPP.contact.queryUsernameExists('someusername', '1234');
 * ```
 *
 * @category Contact
 */
export async function queryUsernameExists(
  username: string,
  key?: string
): Promise<QueryUsernameExistsResult | QueryUsernameExistsKeyRequired | null> {
  return nativeQueryUsernameExists(username, key) as Promise<
    QueryUsernameExistsResult | QueryUsernameExistsKeyRequired | null
  >;
}
