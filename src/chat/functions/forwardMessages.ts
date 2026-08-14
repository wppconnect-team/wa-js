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
import { MsgKey, MsgModel, Wid } from '../../whatsapp';
import { forwardMessages as forwardMessagesWhatsApp } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

export interface ForwardMessagesOptions {
  displayCaptionText?: boolean;
  multicast?: boolean;
  appendedText?: boolean;
}

/**
 * Forward many messages to a chat
 *
 * @example
 * ```javascript
 * // Forward messages
 * WPP.chat.forwardMessages('[number]@c.us', ['true_[number]@c.us_ABCDEF', ...]);
 * ```
 * @category Message
 * @returns The messages that could **not** be forwarded — an empty array means
 * every message went through. WhatsApp collects them as it forwards and does
 * not reject, so a resolved promise is not by itself a success.
 */
export async function forwardMessages(
  toChatId: string | Wid,
  msgsId: string[] | MsgKey[] | MsgModel[],
  options: ForwardMessagesOptions = {}
): Promise<Array<any>> {
  const chat = await assertFindChat(toChatId);
  const msgs: MsgModel[] = [];

  for (const msg of msgsId) {
    if (msg instanceof MsgModel) {
      msgs.push(msg);
    } else {
      msgs.push(await getMessageById(msg));
    }
  }

  /**
   * `WAWebChatForwardMessage` ships in a bundle WhatsApp only fetches when
   * something needs it, and a session that never opens the forward UI never
   * does. Ask for the bundle before touching the binding: otherwise the module
   * is missing from the registry, the getter resolves to `undefined` and every
   * forward on that page fails with "forwardMessages is not a function".
   */
  await ensureLazyModule('WAWebChatForwardMessage');

  if (typeof forwardMessagesWhatsApp !== 'function') {
    throw new WPPError(
      'forward_messages_not_available',
      "WhatsApp's forwardMessages function is not available in this session"
    );
  }

  return await forwardMessagesWhatsApp({
    chat,
    msgs,
    multicast: options.multicast ?? false,
    includeCaption: options.displayCaptionText ?? false,
    appendedText: options.appendedText ?? false,
  });
}
