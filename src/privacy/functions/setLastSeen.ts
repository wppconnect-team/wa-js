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

/**
 * Set who can see your last seen status.
 *
 * @example
 * ```javascript
 * Set value for who can see your last seen like 'all'
 * await WPP.privacy.setLastSeen('all');
 *
 * Set value for who can see your last seen like 'none'
 * await WPP.privacy.setLastSeen('none');
 *
 * Set value for who can see your last seen like 'only your contacts'
 * await WPP.privacy.setLastSeen('contacts');
 *
 * Set value for who can see your last seen like 'your contacts', but with excepts
 * await WPP.privacy.setLastSeen('contact_blacklist', [
 *   { id: '[number]@c.us', action: 'add' },
 *   { id: '[number]@c.us', action: 'remove' }
 * ]);
 * ```
 *
 * @category Privacy
 */

import { PrivacyDisallowedListType } from '../../enums';
import { WPPError } from '../../util';
import {
  getUserPrivacySettings,
  setPrivacyForOneCategory,
} from '../../whatsapp/functions';
import { prepareDisallowedList } from './prepareDisallowedList';

export enum setLastSeenTypes {
  all = 'all',
  contacts = 'contacts',
  none = 'none',
  contact_blacklist = 'contact_blacklist',
}
export async function setLastSeen(
  value: setLastSeenTypes,
  disallowedList?: { id: string; action: 'add' | 'remove' }[]
): Promise<setLastSeenTypes> {
  if (
    typeof value !== 'string' ||
    !Object.values(setLastSeenTypes).includes(value)
  ) {
    throw new WPPError(
      'incorrect_type',
      `Incorrect type ${value || '<empty>'} for set last seen privacy`,
      {
        value,
      }
    );
  }
  const disallowed = await prepareDisallowedList(
    PrivacyDisallowedListType.LastSeen,
    value,
    disallowedList
  );
  await setPrivacyForOneCategory(
    {
      name: 'last',
      value: value,
      dhash: value === 'contact_blacklist' ? disallowed.dhash : null,
      users:
        value === 'contact_blacklist' ? disallowed.idsFormatted : undefined,
    },
    value === 'contact_blacklist' ? disallowed.allUsers : undefined
  );
  return getUserPrivacySettings().lastSeen as any;
}
