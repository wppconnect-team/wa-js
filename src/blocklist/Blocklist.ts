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

import Debug from 'debug';
import Emittery from 'emittery';

import { assertWid } from '../assert';
import * as webpack from '../webpack';
import { BlocklistStore, ContactModel, ContactStore, Wid } from '../whatsapp';
import { blockContact, unblockContact } from '../whatsapp/functions';
import { BlocklistEventTypes, BlocklistResult } from '.';

const debug = Debug('WPP:blocklist');

export class Blocklist extends Emittery<BlocklistEventTypes> {
  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    BlocklistStore.on('sort', () => {
      debug('synced');
      this.emit('sync');
    });

    debug('initialized');
  }

  all(): Wid[] {
    return BlocklistStore.models.map((b) => b.id);
  }

  isBlocked(chatId: string | Wid): boolean {
    const wid = assertWid(chatId);

    const contact = ContactStore.get(wid) || new ContactModel({ id: wid });

    return contact.isBlocked();
  }

  async blockContact(chatId: string | Wid): Promise<BlocklistResult> {
    const wid = assertWid(chatId);

    const contact = ContactStore.get(wid) || new ContactModel({ id: wid });

    await blockContact(contact);

    return {
      wid,
      isBlocked: contact.isBlocked(),
    };
  }

  async unblockContact(chatId: string | Wid): Promise<BlocklistResult> {
    const wid = assertWid(chatId);

    const contact = ContactStore.get(wid) || new ContactModel({ id: wid });

    await unblockContact(contact);

    return {
      wid,
      isBlocked: contact.isBlocked(),
    };
  }
}
