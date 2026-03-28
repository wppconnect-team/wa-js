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
import { getPrivacyDisallowedListTable } from '../../whatsapp/functions';

const privacyGetDisallowedListSchema = z.object({
  type: z.nativeEnum(PrivacyDisallowedListType),
});

export type PrivacyGetDisallowedListInput = z.infer<
  typeof privacyGetDisallowedListSchema
>;

export type PrivacyGetDisallowedListOutput = string[] | null;

/**
 * Get the disallowed list — contacts who cannot see your privacy
 * (applies when the setting is: my contacts, except...).
 *
 * @example
 * ```javascript
 * // get disallowed list for Last seen
 * const disallowed = await WPP.privacy.getDisallowedList({ type: 'last' });
 *
 * // get disallowed list for profile picture
 * const disallowed = await WPP.privacy.getDisallowedList({ type: 'profile' });
 *
 * // get disallowed list for status
 * const disallowed = await WPP.privacy.getDisallowedList({ type: 'status' });
 *
 * // get disallowed list for group add
 * const disallowed = await WPP.privacy.getDisallowedList({ type: 'groupadd' });
 * ```
 *
 * @category Privacy
 */
export async function getDisallowedList(
  params: PrivacyGetDisallowedListInput
): Promise<PrivacyGetDisallowedListOutput> {
  const { type } = privacyGetDisallowedListSchema.parse(params);
  const list = await getPrivacyDisallowedListTable().get(type);
  if (!list) return null;
  return list.disallowedList;
}
