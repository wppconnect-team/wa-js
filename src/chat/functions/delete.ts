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

import { z } from 'zod';

import { assertFindChat, assertWid } from '../../assert';
import { Wid } from '../../whatsapp';
import { sendDelete } from '../../whatsapp/functions';

const chatDeleteSchema = z.object({
  chatId: z.string(),
});
export type ChatDeleteInput = z.infer<typeof chatDeleteSchema>;
export type ChatDeleteOutput = { wid: Wid; status: number };

/**
 * Delete a chat
 *
 * @category Chat
 */
async function _delete(params: ChatDeleteInput): Promise<ChatDeleteOutput> {
  const { chatId } = chatDeleteSchema.parse(params);
  const wid = assertWid(chatId);

  const chat = await assertFindChat(wid);

  sendDelete(chat);

  let status = 200;

  if (chat.promises.sendDelete) {
    const result = await chat.promises.sendDelete.catch(() => ({
      status: 500,
    }));
    status = (result as any).status || status;
  }

  return {
    wid,
    status,
  };
}

// Avoid reserved word error
export { _delete as delete };
