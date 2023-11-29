/*!
 * Copyright 2023 WPPConnect Team
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

import { iAmAdmin } from '../../group';
import { WPPError } from '../../util';
import { MsgKey, MsgModel } from '../../whatsapp';
import { KIC_ENTRY_POINT_TYPE } from '../../whatsapp/enums';
import {
  keepMessage as KeepMessage,
  undoKeepMessage,
} from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

/**
 * Keep or unkeep a message in a group chat with expiration
 *
 * @example
 * ```javascript
 * // To keep a message in chat
 * WPP.chat.keepMessage('true_[number]@c.us_ABCDEF', true);
 *
 * // To unkeep a message in chat
 * WPP.chat.keepMessage('true_[number]@c.us_ABCDEF', false);
 * ```
 * @category Chat
 */
export async function keepMessage(
  msgId: string | MsgKey,
  value = true
): Promise<MsgModel> {
  const msg = await getMessageById(msgId);
  //const chat = get(msg.id.remote) as unknown as ContactModel;
  if (!(await iAmAdmin(msg.id.remote))) {
    throw new WPPError('you_not_group_admin', 'You is not a group admin');
  } else if (msg.isExpired()) {
    throw new WPPError('msg_expired', 'This message has expired');
  } else if (value) {
    await KeepMessage(msg, KIC_ENTRY_POINT_TYPE.CHAT);
    return await getMessageById(msgId);
  } else {
    await undoKeepMessage(
      msg,
      { deleteExpired: true },
      KIC_ENTRY_POINT_TYPE.CHAT
    );
    return await getMessageById(msgId);
  }
}
