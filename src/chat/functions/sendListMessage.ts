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

import { WPPError } from '../../util';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface ListMessageOptions extends SendMessageOptions {
  buttonText: string;
  description: string;
  sections: Array<{
    title: string;
    rows: Array<{
      rowId: string;
      title: string;
      description: string;
    }>;
  }>;
}

/**
 * Send a list message
 *
 * @example
 * ```javascript
 * WPP.chat.sendListMessage('[number]@c.us', {
 *   buttonText: 'Click Me!',
 *   description: "Hello it's list message",
 *   sections: [{
 *     title: 'Section 1',
 *     rows: [{
 *       rowId: 'rowid1',
 *       title: 'Row 1',
 *       description: "Hello it's description 1",
 *     },{
 *       rowId: 'rowid2',
 *       title: 'Row 2',
 *       description: "Hello it's description 2",
 *     }]
 *   }]
 * });
 * ```
 * @category Message
 */
export async function sendListMessage(
  chatId: any,
  options: ListMessageOptions
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const sections = options.sections;

  if (!Array.isArray(sections)) {
    throw new WPPError('invalid_list_type', 'Sections must be an array');
  }

  if (sections.length === 0 || sections.length > 10) {
    throw new WPPError(
      'invalid_list_size',
      'Sections options must have between 1 and 10 options'
    );
  }

  const list: RawMessage['list'] = {
    buttonText: options.buttonText,
    description: options.description,
    listType: 1,
    sections,
  };

  const message: RawMessage = {
    type: 'list',
    list,
  };

  return await sendRawMessage(chatId, message, options);
}
