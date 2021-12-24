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

import { ButtonCollection, ReplyButtonModel } from '../../whatsapp';
import { RawMessage } from '..';

export interface MessageButtonsOptions {
  /**
   * List of buttons, with at least 1 option and a maximum of 3
   */
  buttons?: Array<{
    id: string;
    text: string;
  }>;
  /**
   * Title for buttons, only for text message
   */
  title?: string;
  /**
   * Footer text for buttons
   */
  footer?: string;
}

/**
 * Prepare a message for buttons
 *
 * @category Message
 * @internal
 */
export function prepareMessageButtons<T extends RawMessage>(
  message: T,
  options: MessageButtonsOptions
): T {
  if (!options.buttons) {
    return message as any;
  }

  if (!Array.isArray(options.buttons)) {
    throw 'Buttons options is not a array';
  }

  if (options.buttons.length === 0 || options.buttons.length > 3) {
    throw 'Buttons options must have between 1 and 3 options';
  }

  message.title = options.title;
  message.footer = options.footer;
  message.isDynamicReplyButtonsMsg = true;

  message.dynamicReplyButtons = options.buttons.map((b) => ({
    buttonId: b.id,
    buttonText: { displayText: b.text },
    type: 1,
  }));

  // For UI only
  message.replyButtons = new ButtonCollection();
  message.replyButtons.add(
    message.dynamicReplyButtons.map(
      (b) =>
        new ReplyButtonModel({
          id: b.buttonId,
          displayText: b.buttonText?.displayText || undefined,
        })
    )
  );

  return message;
}
