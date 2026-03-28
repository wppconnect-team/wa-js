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
import { ContactModel, ContactStore } from '../../whatsapp';

const contactGetSchema = z.object({
  chatId: z.string(),
});

export type ContactGetInput = z.infer<typeof contactGetSchema>;

export type ContactGetOutput = ContactModel | undefined;

/**
 * Get a contact by chatId
 *
 * @example
 * ```javascript
 * await WPP.contact.get({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */

export async function get(params: ContactGetInput): Promise<ContactGetOutput> {
  const { chatId } = contactGetSchema.parse(params);

  const wid = assertWid(chatId);

  return ContactStore.get(wid);
}
