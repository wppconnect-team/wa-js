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

import { assertFindChat } from '../../assert';
import { ensureLazyModule } from '../../loader';
import { WPPError } from '../../util';
import { MsgKey, Wid } from '../../whatsapp';
import { forwardMessagesToChats } from '../../whatsapp/functions';
import { getMessageById } from '..';

/** @deprecated Use ForwardMessagesOptions instead */
export interface ForwardMessageOptions {
  displayCaptionText?: boolean;
  multicast?: boolean;
}

/**
 * Only warn once per page: a forwarding integration can call this thousands of
 * times, and the message is the same every time.
 */
let deprecationWarned = false;

/**
 * Forward message to a chat
 *
 * @example
 * ```javascript
 * // Forward message
 * WPP.chat.forwardMessage('[number]@c.us', 'true_[number]@c.us_ABCDEF');
 * ```
 * @category Message
 * @return  {any} Any
 *
 * @deprecated Use {@link forwardMessages} instead, passing the message as a
 * single-element array: `WPP.chat.forwardMessages(chatId, [msgId])`. It is the
 * forwarding path for WhatsApp Web >= 2.3000 and additionally supports
 * `appendedText`. Scheduled for removal on or after 2026-11-14.
 */
export async function forwardMessage(
  toChatId: string | Wid,
  msgId: string | MsgKey,
  options: ForwardMessageOptions = {}
): Promise<boolean> {
  if (!deprecationWarned) {
    deprecationWarned = true;
    console.warn(
      `[WPP.chat.forwardMessage] DEPRECATION WARNING: forwardMessage is deprecated ` +
        `and scheduled for removal on or after 2026-11-14. ` +
        `Use WPP.chat.forwardMessages(chatId, [msgId]) instead.`
    );
  }

  const chat = await assertFindChat(toChatId);

  const msg = await getMessageById(msgId);

  /**
   * `WAWebForwardMessagesToChat` ships in the same on-demand bundle as
   * `WAWebChatForwardMessage`, so it is missing for the same reason: a session
   * that never opens the forward UI never fetches it.
   */
  await ensureLazyModule('WAWebForwardMessagesToChat');

  if (typeof forwardMessagesToChats !== 'function') {
    throw new WPPError(
      'forward_messages_to_chats_not_available',
      "WhatsApp's forwardMessagesToChats function is not available in this session"
    );
  }

  return await forwardMessagesToChats(
    [msg],
    [chat],
    options.displayCaptionText
  );
}
