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

import { ContactStore, functions, Wid } from '../../whatsapp';

const contactGetCommonGroupsSchema = z.object({
  chatId: z.string(),
});

export type ContactGetCommonGroupsInput = z.infer<
  typeof contactGetCommonGroupsSchema
>;

export type ContactGetCommonGroupsOutput = Wid[];

/**
 * Get all commons groups for the contact
 *
 * @example
 * ```javascript
 * const groups_ids = await WPP.contact.getCommonGroups({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */
export async function getCommonGroups(
  params: ContactGetCommonGroupsInput
): Promise<ContactGetCommonGroupsOutput> {
  const { chatId } = contactGetCommonGroupsSchema.parse(params);

  const contact = ContactStore.get(chatId);

  if (!contact) {
    return [];
  }

  const groups = await functions.findCommonGroups(contact);
  return groups.getModelsArray().map((g) => g.id);
}
