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

import { z } from 'zod';

import { WPPError } from '../../util';
import * as webpack from '../../webpack';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { typeAttributeFromProtobuf } from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  sendMessageOptionsSchema,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface ListMessageOptions extends SendMessageOptions {
  buttonText: string;
  description: string;
  title?: string;
  footer?: string;
  sections: Array<{
    title: string;
    rows: Array<{
      rowId: string;
      title: string;
      description: string;
    }>;
  }>;
}

const listMessageOptionsSchema = sendMessageOptionsSchema.extend({
  buttonText: z.string(),
  description: z.string(),
  title: z.string().optional(),
  footer: z.string().optional(),
  sections: z.array(
    z.object({
      title: z.string(),
      rows: z.array(
        z.object({
          rowId: z.string(),
          title: z.string(),
          description: z.string(),
        })
      ),
    })
  ),
});

const chatSendListMessageSchema = z.object({
  chatId: z.string(),
  options: listMessageOptionsSchema,
});
export type ChatSendListMessageInput = z.infer<
  typeof chatSendListMessageSchema
>;
export type ChatSendListMessageOutput = SendMessageReturn;

/**
 * Send a list message
 *
 * @example
 * ```javascript
 * WPP.chat.sendListMessage({
 *   chatId: '[number]@c.us',
 *   options: {
 *     buttonText: 'Click Me!',
 *     description: "Hello it's list message",
 *     title: 'Hello user',
 *     footer: 'Click and choose one',
 *     sections: [{
 *       title: 'Section 1',
 *       rows: [{
 *         rowId: 'rowid1',
 *         title: 'Row 1',
 *         description: "Hello it's description 1",
 *       },{
 *         rowId: 'rowid2',
 *         title: 'Row 2',
 *         description: "Hello it's description 2",
 *       }]
 *     }]
 *   }
 * });
 * ```
 * @category Message
 */
export async function sendListMessage(
  params: ChatSendListMessageInput
): Promise<ChatSendListMessageOutput> {
  const { chatId, options: opts } = chatSendListMessageSchema.parse(params);
  const options: ListMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as ListMessageOptions),
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
    description: options.description || ' ',
    title: options.title,
    footerText: options.footer,
    listType: 1,
    sections,
  };

  const message: RawMessage = {
    type: 'list',
    list,
    footer: options.footer,
  };

  return await sendRawMessage({ chatId, rawMessage: message, options });
}

webpack.onFullReady(() => {
  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.listMessage) {
      return 'text';
    }
    return func(...args);
  });
});
