/*!
 * Copyright 2021 WPPConnect Team
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

import { compare } from 'compare-versions';

import { assertWid } from '../../assert';
import { ContactModel, ContactStore, Wid } from '../../whatsapp';
import { SANITIZED_VERSION_STR } from '../../whatsapp/contants';
import * as wa_functions from '../../whatsapp/functions';
import { BlocklistResult } from '../types';

export async function blockContact(
  chatId: string | Wid
): Promise<BlocklistResult> {
  const wid = assertWid(chatId);

  const contact = ContactStore.get(wid) || new ContactModel({ id: wid });

  if (compare(SANITIZED_VERSION_STR, '2.2323.4', '>=')) {
    await wa_functions.blockContact({
      contact,
      blockEntryPoint: 'block_list',
      bizOptOutArgs: null,
    });
  } else {
    await wa_functions.blockContact(contact);
  }

  return {
    wid,
    isBlocked: contact.isBlocked(),
  };
}
