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

import { assertGetChat, assertWid } from '../../assert';
import { getPnLidEntry } from '../../contact';
import { Wid } from '../../whatsapp';
import { isLidMigrated, sendDelete } from '../../whatsapp/functions';

/**
 * Delete a chat
 *
 * @category Chat
 */
async function _delete(chatId: string | Wid) {
  let wid = assertWid(chatId);

  if (!isLidMigrated() && wid.server === 'lid') {
    const pnWid = await getPnLidEntry(wid);

    if (pnWid?.phoneNumber) wid = assertWid(pnWid.phoneNumber?._serialized);
  }

  const chat = assertGetChat(wid);

  sendDelete(chat);

  let status = 200;

  if (chat.promises.sendDelete) {
    const result = await chat.promises.sendDelete.catch(() => ({
      status: 500,
    }));
    status = result.status || status;
  }

  return {
    wid,
    status,
  };
}

// Avoid reserved word error
export { _delete as delete };
