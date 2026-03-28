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

import { PresenceStore, Wid, WidFactory } from '../../whatsapp';

const contactUnsubscribePresenceSchema = z.object({
  ids: z.array(z.string()),
});

export type ContactUnsubscribePresenceInput = z.infer<
  typeof contactUnsubscribePresenceSchema
>;

export type ContactUnsubscribePresenceOutput = Wid[];

/**
 * Unsubscribe presence of a contact
 *
 * @example
 * ```javascript
 * await WPP.contact.unsubscribePresence({ ids: ['[chatId]'] });
 * await WPP.contact.unsubscribePresence({ ids: ['[chatId]', '[chatId]'] });
 * ```
 *
 * @category Contact
 */

export async function unsubscribePresence(
  params: ContactUnsubscribePresenceInput
): Promise<ContactUnsubscribePresenceOutput> {
  const { ids } = contactUnsubscribePresenceSchema.parse(params);

  const result = [];
  for (const id of ids) {
    const wid = WidFactory.createWid(id);
    const presence = PresenceStore.get(wid);
    if (!presence) {
      result.push(wid);
      continue;
    }
    presence.delete();
    result.push(wid);
  }
  return result;
}
