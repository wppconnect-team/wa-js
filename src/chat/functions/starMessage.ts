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

/**
 * Star/Unstar a message
 *
 * @example
 * ```javascript
 * // star a message
 * WPP.chat.starMessage('<message id>');
 *
 * // unstar a message
 * WPP.chat.starMessage('<message id>', false);
 * ```
 * @category Message
 */
export async function starMessage(
  id: string,
  star: boolean
): Promise<StarMessageReturn>;
/**
 * Star/Unstar messages
 *
 * @example
 * ```javascript
 * // star messages
 * WPP.chat.starMessage(['<message id>', '<message id>']);
 *
 * // unstar messages
 * WPP.chat.starMessage(['<message id>', '<message id>'], false);
 * ```
 * @category Message
 */
export async function starMessage(
  ids: string[],
  star: boolean
): Promise<StarMessageReturn[]>;
export async function starMessage(
  ids: string | string[],
  star = true
): Promise<StarMessageReturn | StarMessageReturn[]> {
  let isSingle = false;

  if (!Array.isArray(ids)) {
    isSingle = true;
    ids = [ids];
  }

  const allMessages = await getMessageById(ids);

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

  if (isSingle) {
    return results[0];
  }

  return results;
}
