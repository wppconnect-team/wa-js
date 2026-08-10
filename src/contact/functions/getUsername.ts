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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { ContactStore, Wid } from '../../whatsapp';
import { queryWidUsernameExists } from '../../whatsapp/functions/sendQueryUsernameExists';

export interface GetUsernameResult {
  /** The current username, `undefined` when the contact has none */
  username?: string;
  /** Whether the username differs from the one previously stored */
  usernameChanged: boolean;
  /** Whether a username was already known for this contact */
  wasPreviouslyKnown: boolean;
  /** Whether the phone number behind the LID is known locally */
  isPhoneNumberKnown: boolean;
  /** The previously stored username, when it changed */
  oldUsername?: string;
}

/**
 * Get the username (@username) currently associated with a LID
 *
 * This is the reverse of {@link queryUsernameExists}: it answers "which
 * username does this contact have now?". Use it to refresh a username you
 * displayed earlier, since usernames are mutable while the LID is not.
 *
 * By default the locally stored username is returned when there is one. Pass
 * `refresh` to always query the server, which also updates the local record.
 *
 * @example
 * ```javascript
 * // Cached when available, otherwise queried
 * const result = await WPP.contact.getUsername('[lid]@lid');
 * console.log(result.username);
 *
 * // Always hit the server and refresh the stored value
 * const result = await WPP.contact.getUsername('[lid]@lid', true);
 * if (result.usernameChanged) {
 *   console.log(`${result.oldUsername} is now ${result.username}`);
 * }
 * ```
 *
 * @param contactId The contact LID. Only LIDs carry a username.
 * @param refresh Skip the local record and query the server
 *
 * @category Contact
 */
export async function getUsername(
  contactId: string | Wid,
  refresh = false
): Promise<GetUsernameResult> {
  const wid = assertWid(contactId);

  if (!wid.isLid()) {
    throw new WPPError(
      'contact_is_not_a_lid',
      `Usernames are only available for LIDs, received ${wid.toString()}`
    );
  }

  if (!refresh) {
    const username = ContactStore.get(wid)?.username;

    if (username != null) {
      return {
        username,
        usernameChanged: false,
        wasPreviouslyKnown: true,
        isPhoneNumberKnown: false,
      };
    }
  }

  if (typeof queryWidUsernameExists !== 'function') {
    throw new WPPError(
      'query_wid_username_exists_not_available',
      'This WhatsApp Web version does not support querying a username by LID'
    );
  }

  const result = await queryWidUsernameExists(wid);

  return {
    username: result?.username,
    usernameChanged: result?.usernameChanged === true,
    wasPreviouslyKnown: result?.wasPreviouslyKnown === true,
    isPhoneNumberKnown: result?.isPhoneNumberKnown === true,
    oldUsername: result?.oldUsername,
  };
}
