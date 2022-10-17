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
import { ChatModel, MsgKey, UserPrefs, Wid, WidFactory } from '../../whatsapp';
import { randomMessageId } from '../../whatsapp/functions';

/**
 * Generate a new message ID
 *
 * @category Message
 */
export function generateMessageID(chat: string | ChatModel | Wid): MsgKey {
  const from = UserPrefs.getMaybeMeUser();
  let to: Wid;

  if (chat instanceof Wid) {
    to = chat;
  } else if (chat instanceof ChatModel) {
    to = chat.id;
  } else {
    to = assertWid(chat);
  }

  let participant = undefined;

  if (to.isGroup()) {
    participant = WidFactory.toUserWid(from);
  }

  return new MsgKey({
    from,
    to,
    id: randomMessageId(),
    participant,
    selfDir: 'out',
  });
}
