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
import { StatusStore } from '../../whatsapp';
import { queryExists } from './queryExists';

const contactGetStatusSchema = z.object({
  chatId: z.string(),
});

export type ContactGetStatusInput = z.infer<typeof contactGetStatusSchema>;

export type ContactGetStatusOutput = string | null;

/**
 * Get the current text status
 *
 * @example
 * ```javascript
 * await WPP.contact.getStatus({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */

export async function getStatus(
  params: ContactGetStatusInput
): Promise<ContactGetStatusOutput> {
  const { chatId } = contactGetStatusSchema.parse(params);

  const wid = assertWid(chatId);

  const exists = await queryExists({ chatId: wid.toString() });

  if (!exists) {
    return null;
  }

  const model = await StatusStore.find(wid);

  return model.status || null;
}
