/*!
 * Copyright 2022 WPPConnect Team
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

import { Stringable } from '../../types';
import { MsgKey, MsgModel } from '../../whatsapp';
import { canReplyMsg } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

/**
 * Get if message can reply
 *
 * @example
 * ```javascript
 * WPP.chat.canReply('[message_id]');
 * ```
 * @category Message
 */
export async function canReply(
  messageId: string | MsgKey | MsgModel | Stringable
): Promise<boolean> {
  if (
    !(messageId instanceof MsgModel) &&
    typeof messageId !== 'string' &&
    typeof messageId.toString === 'function'
  ) {
    messageId = messageId.toString();
  }

  const msg =
    messageId instanceof MsgModel
      ? messageId
      : await getMessageById(messageId.toString());

  return canReplyMsg(msg);
}
