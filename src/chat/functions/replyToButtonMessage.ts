/*!
 * Copyright 2024 WPPConnect Team
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

import { WPPError } from '../../util';
import { sendTextMsgToChat } from '../../whatsapp/functions';
import { get } from './get';

export interface ButtonReplyOptions {
  /**
   * The index of the button to reply to (0-based)
   * For example: 0 for first button, 1 for second button
   */
  buttonIndex: number;
}

/**
 * Reply to a button message by clicking a specific button
 *
 * @example
 * ```javascript
 * // Reply to the first button (Yes)
 * await WPP.chat.replyToButtonMessage(
 *   '[number]@c.us',
 *   'messageId',
 *   { buttonIndex: 0 }
 * );
 *
 * // Reply to the second button (No)
 * await WPP.chat.replyToButtonMessage(
 *   '[number]@c.us',
 *   'messageId',
 *   { buttonIndex: 1 }
 * );
 * ```
 * @category Message
 */
export async function replyToButtonMessage(
  chatId: any,
  messageId: string,
  options: ButtonReplyOptions
): Promise<any> {
  const { buttonIndex } = options;

  // Get the chat
  const chat = get(chatId);

  if (!chat) {
    throw new WPPError('chat_not_found', `Chat ${chatId} not found`);
  }

  // Get the message
  const msg = chat.msgs.get(messageId);

  if (!msg) {
    throw new WPPError('message_not_found', `Message ${messageId} not found`);
  }

  // Validate that the message has buttons
  if (!msg.hydratedButtons || !Array.isArray(msg.hydratedButtons)) {
    throw new WPPError(
      'no_buttons_in_message',
      'This message does not have buttons'
    );
  }

  // Validate button index
  if (buttonIndex < 0 || buttonIndex >= msg.hydratedButtons.length) {
    throw new WPPError(
      'invalid_button_index',
      `Button index ${buttonIndex} is out of range. Valid range: 0-${msg.hydratedButtons.length - 1}`
    );
  }

  const button = msg.hydratedButtons[buttonIndex];

  // Extract button information
  let buttonId: string;
  let buttonText: string;
  let buttonSubtype: string;

  if (button.quickReplyButton) {
    // Quick reply button
    buttonId = button.quickReplyButton.id;
    buttonText = button.quickReplyButton.displayText;
    buttonSubtype = 'quick_reply';
  } else if (button.urlButton) {
    // URL button
    buttonId = `${button.index}`;
    buttonText = button.urlButton.displayText;
    buttonSubtype = 'url';
  } else if (button.callButton) {
    // Call button
    buttonId = `${button.index}`;
    buttonText = button.callButton.displayText;
    buttonSubtype = 'call';
  } else {
    throw new WPPError(
      'unsupported_button_type',
      'This button type is not supported'
    );
  }

  // Only quick reply buttons can be replied to with template_button_reply
  if (buttonSubtype !== 'quick_reply') {
    throw new WPPError(
      'button_not_replyable',
      'Only quick reply buttons can be replied to. URL and Call buttons cannot be replied to programmatically.'
    );
  }

  // Prepare the reply options
  const replyOptions = {
    quotedMsg: msg,
    selectedIndex: button.index,
    selectedId: buttonId,
    // selectedCarouselCardIndex is only for carousel buttons
  };

  // Send the reply using WhatsApp's internal function
  const result = await sendTextMsgToChat(chat, buttonText, replyOptions);

  return result;
}
