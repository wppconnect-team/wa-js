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

import { assertGetChat } from '../../assert';
import { Cmd, MsgModel } from '../../whatsapp';
import { getMessageById } from '.';

export interface StarMessageReturn {
  id: string;
  star: boolean;
}

interface MsgsPerChat {
  [key: string]: MsgModel[];
}

const chatStarMessageSchema = z.object({
  ids: z.array(z.string()),
  star: z.boolean().optional(),
});
export type ChatStarMessageInput = z.infer<typeof chatStarMessageSchema>;
export type ChatStarMessageOutput = StarMessageReturn | StarMessageReturn[];

/**
 * Star/Unstar a message or messages
 *
 * @example
 * ```javascript
 * // star a message
 * WPP.chat.starMessage({ ids: '<message id>' });
 *
 * // unstar a message
 * WPP.chat.starMessage({ ids: '<message id>', star: false });
 *
 * // star messages
 * WPP.chat.starMessage({ ids: ['<message id>', '<message id>'] });
 * ```
 * @category Message
 */
export async function starMessage(
  params: ChatStarMessageInput
): Promise<ChatStarMessageOutput> {
  const { ids, star = true } = chatStarMessageSchema.parse(params);

  const allMessages = await Promise.all(
    ids.map((id) => getMessageById({ id }))
  );

  // group messages by chat
  const msgsPerChat: MsgsPerChat = allMessages.reduce((r, msg) => {
    const id = msg.id.remote.toString();
    r[id] = r[id] || [];
    r[id].push(msg);
    return r;
  }, {} as MsgsPerChat);

  const results: StarMessageReturn[] = allMessages.map((m) => ({
    id: m.id.toString(),
    star: m.star || false,
  }));

  for (const chatId in msgsPerChat) {
    const chat = assertGetChat(chatId);
    const msgs = msgsPerChat[chatId];

    if (star) {
      Cmd.sendStarMsgs(chat, msgs);
    } else {
      Cmd.sendUnstarMsgs(chat, msgs);
    }

    if (chat.promises.sendStarMsgs) {
      await chat.promises.sendStarMsgs;
    }
  }

  return results;
}
