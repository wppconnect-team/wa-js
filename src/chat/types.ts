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

import {
  ModelPropertiesContructor,
  MsgKey,
  MsgModel,
  SendMsgResultObject,
  Wid,
} from '../whatsapp';

export type { SendMsgResultObject };

export const sendMessageOptionsSchema = z.object({
  /**
   * Create a new chat to a new contact
   *
   * @deprecated This option is no longer used. Chats are automatically created when sending messages.
   * @default false
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Hello new contact', {
   *   createChat: true
   * });
   * ```
   */
  createChat: z.boolean().optional(),

  /**
   * Automatic detect and add the mentioned contacts with @[number]
   *
   * @default true
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Hello @123 and @456', {
   *   detectMentioned: true
   * });
   * ```
   */
  detectMentioned: z.boolean().optional(),

  /**
   * Automatically mark chat is read after send a message
   *
   * @default true
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Replying your message', {
   *   markIsRead: true
   * });
   * ```
   */
  markIsRead: z.boolean().optional(),

  /**
   * Override the generated message ID
   */
  messageId: z.union([z.string(), z.custom<MsgKey>()]).optional(),

  /**
   * Define a mentioned list for a message.
   * This option works better with a message with mention.
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Hello @123 and @456', {
   *   mentionedList: ['123@c.us', '456@c.us']
   * })
   * ```
   */
  mentionedList: z.array(z.union([z.string(), z.custom<Wid>()])).optional(),

  /**
   * Quote a message, like a reply message
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'This is a reply', {
   *   quotedMsg: 'true_[number]@c.us_3EB0F435D95D32C4C638'
   * })
   * ```
   */
  quotedMsg: z
    .union([z.string(), z.custom<MsgKey>(), z.custom<MsgModel>()])
    .optional(),

  /**
   * Quote a message using a previously saved payload.
   * The payload must be the JSON string representation of a raw message.
   * Raw messages can be obtained when using {@link getMessageById} or {@link getMessages}.
   * When provided it has priority over {@link quotedMsg}.
   */
  quotedMsgPayload: z.string().optional(),

  /**
   * Wait for send while the ACK of message is SENT(1)
   *
   * @default true
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Wait for sent', {
   *   waitForAck: true
   * })
   * ```
   */
  waitForAck: z.boolean().optional(),

  /**
   * Delay some time (in ms) before sending message.
   * While delaying, Typing Status is used to look like a human interaction.
   *
   * @default 0
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Delay with typing', {
   *   delay: 4000
   * })
   * ```
   */
  delay: z.number().optional(),
});

export type SendMessageOptions = z.infer<typeof sendMessageOptionsSchema>;

export interface SendMessageReturn {
  id: string;
  from?: string;
  to?: string;
  latestEditMsgKey?: MsgKey;
  ack: number;
  sendMsgResult: Promise<SendMsgResultObject>;
}

export type RawMessage = ModelPropertiesContructor<MsgModel>;
