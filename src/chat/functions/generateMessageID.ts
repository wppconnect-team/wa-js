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

import { assertWid } from '../../assert';
import { getMyUserLid, getMyUserWid } from '../../conn';
import { ChatModel, MsgKey, Wid } from '../../whatsapp';
import { randomMessageId } from '../../whatsapp/functions';

/**
 * Generate a new message ID
 *
 * @category Message
 */
export async function generateMessageID(
  chat: string | ChatModel | Wid
): Promise<MsgKey> {
  let to: Wid;

  if (chat instanceof Wid) {
    to = chat;
  } else if (chat instanceof ChatModel) {
    to = chat.id;
  } else {
    to = assertWid(chat);
  }

  // The outgoing 'from' is a *user* WID (no device id) whose addressing mode
  // matches the chat, mirroring WhatsApp Web's WAWebMsgDataUtils.genOutgoingMsgData:
  // - groups address the sender by LID (@lid)
  // - 1:1 / newsletter chats match their own id: @lid chat → @lid, @c.us → @c.us
  // After the LID migration most 1:1 chats are @lid; sending a @c.us 'from' to a
  // @lid chat makes the recipient resolve us as an "unknown user" without a phone.
  let from: Wid;
  if (to.isGroup()) {
    from = getMyUserLid();
  } else {
    from = to.isLid() ? getMyUserLid() : getMyUserWid();
  }
  const participant = to.isGroup() ? from : undefined;

  return new MsgKey({
    from,
    to,
    id: await Promise.resolve(randomMessageId()),
    participant,
    selfDir: 'out',
  });
}
