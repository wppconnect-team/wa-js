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

import { assertWid } from '../../assert';
import { BusinessProfileModel, BusinessProfileStore } from '../../whatsapp';

const contactGetBusinessProfileSchema = z.object({
  chatId: z.string(),
});

export type ContactGetBusinessProfileInput = z.infer<
  typeof contactGetBusinessProfileSchema
>;

export type ContactGetBusinessProfileOutput = BusinessProfileModel;

/**
 * Get the business profile of a contact
 *
 * @example
 * ```javascript
 * const url = await WPP.contact.getBusinessProfile({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */

export async function getBusinessProfile(
  params: ContactGetBusinessProfileInput
): Promise<ContactGetBusinessProfileOutput> {
  const { chatId } = contactGetBusinessProfileSchema.parse(params);

  const wid = assertWid(chatId);

  const profile = await BusinessProfileStore.fetchBizProfile(wid);

  return profile;
}
