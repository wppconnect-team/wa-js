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

import { ContactModel, ContactStore, LabelStore } from '../../whatsapp';

const contactListSchema = z.object({
  onlyMyContacts: z.boolean().optional(),
  withLabels: z.array(z.string()).optional(),
});

export type ContactListInput = z.infer<typeof contactListSchema>;

export type ContactListOutput = ContactModel[];

/**
 * Return a list of contacts
 *
 * @example
 * ```javascript
 * // All contacts
 * const contats = await WPP.contact.list({});
 *
 * // Only my contacts
 * const contacts = await WPP.contact.list({ onlyMyContacts: true });
 *
 * // Only with label Text
 * const contacts = await WPP.contact.list({ withLabels: ['Test'] });
 *
 * // Only with label id
 * const contacts = await WPP.contact.list({ withLabels: ['1'] });
 *
 * // Only with label with one of text or id
 * const contacts = await WPP.contact.list({ withLabels: ['Alfa','5'] });
 * ```
 *
 * @category Contact
 */
export async function list(
  params: ContactListInput = {}
): Promise<ContactListOutput> {
  const { onlyMyContacts, withLabels } = contactListSchema.parse(params);

  let models = ContactStore.getModelsArray().slice();

  if (onlyMyContacts) {
    models = models.filter((c) => c.isMyContact);
  }

  if (withLabels) {
    const ids = withLabels.map((value) => {
      const label = LabelStore.findFirst((l) => l.name === value);

      if (label) {
        return label.id;
      }

      return value;
    });

    models = models.filter((c) => c.labels?.some((id) => ids.includes(id)));
  }
  return models;
}
