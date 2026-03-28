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

import { PrivacyDisallowedListType } from '../../enums';
import {
  getUserPrivacySettings,
  setPrivacyForOneCategory,
} from '../../whatsapp/functions';
import { prepareDisallowedList } from './prepareDisallowedList';

export enum SetLastSeenTypes {
  all = 'all',
  contacts = 'contacts',
  none = 'none',
  contact_blacklist = 'contact_blacklist',
}

const privacySetLastSeenSchema = z.object({
  value: z.enum(SetLastSeenTypes),
  disallowedList: z
    .array(z.object({ id: z.string(), action: z.enum(['add', 'remove']) }))
    .optional(),
});

export type PrivacySetLastSeenInput = z.infer<typeof privacySetLastSeenSchema>;

export type PrivacySetLastSeenOutput = SetLastSeenTypes;

/**
 * Set who can see your last seen status.
 *
 * @example
 * ```javascript
 * await WPP.privacy.setLastSeen({ value: 'all' });
 *
 * await WPP.privacy.setLastSeen({ value: 'none' });
 *
 * await WPP.privacy.setLastSeen({ value: 'contacts' });
 *
 * await WPP.privacy.setLastSeen({
 *   value: 'contact_blacklist',
 *   disallowedList: [
 *     { id: '[chatId]', action: 'add' },
 *     { id: '[chatId]', action: 'remove' },
 *   ],
 * });
 * ```
 *
 * @category Privacy
 */
export async function setLastSeen(
  params: PrivacySetLastSeenInput
): Promise<PrivacySetLastSeenOutput> {
  const { value, disallowedList } = privacySetLastSeenSchema.parse(params);
  const disallowed = await prepareDisallowedList({
    type: PrivacyDisallowedListType.LastSeen,
    value,
    disallowedList,
  });
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
  return getUserPrivacySettings().lastSeen as SetLastSeenTypes;
}
