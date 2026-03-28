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

export enum SetAddGroupTypes {
  all = 'all',
  contacts = 'contacts',
  contact_blacklist = 'contact_blacklist',
}

const privacySetAddGroupSchema = z.object({
  value: z.enum(SetAddGroupTypes),
  disallowedList: z
    .array(z.object({ id: z.string(), action: z.enum(['add', 'remove']) }))
    .optional(),
});

export type PrivacySetAddGroupInput = z.infer<typeof privacySetAddGroupSchema>;

export type PrivacySetAddGroupOutput = SetAddGroupTypes;

/**
 * Set who can add you to a group.
 *
 * @example
 * ```javascript
 * await WPP.privacy.setAddGroup({ value: 'all' });
 *
 * await WPP.privacy.setAddGroup({ value: 'contacts' });
 *
 * await WPP.privacy.setAddGroup({
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
export async function setAddGroup(
  params: PrivacySetAddGroupInput
): Promise<PrivacySetAddGroupOutput> {
  const { value, disallowedList } = privacySetAddGroupSchema.parse(params);
  const disallowed = await prepareDisallowedList({
    type: PrivacyDisallowedListType.GroupAdd,
    value,
    disallowedList,
  });
  await setPrivacyForOneCategory(
    {
      name: PrivacyDisallowedListType.GroupAdd,
      value: value,
      dhash: value === 'contact_blacklist' ? disallowed.dhash : null,
      users:
        value === 'contact_blacklist' ? disallowed.idsFormatted : undefined,
    },
    value === 'contact_blacklist' ? disallowed.allUsers : undefined
  );
  return getUserPrivacySettings().groupAdd as SetAddGroupTypes;
}
