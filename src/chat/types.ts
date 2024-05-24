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

import { ModelPropertiesContructor, MsgKey, MsgModel, Wid } from '../whatsapp';
import { SendMsgResult } from '../whatsapp/enums';

export interface SendMessageOptions {
  /**
   * Create a new chat to a new contact
   *
   * @default false
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Hello new contact', {
   *   createChat: true
   * });
   * ```
   */
  createChat?: boolean;

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
  detectMentioned?: boolean;

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
  markIsRead?: boolean;

  /**
   *
   */
  messageId?: string | MsgKey;

  /**
   * Define a mentioned list for a message
   * This option work better with a message with mension
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Hello @123 and @456', {
   *   mentionedList: ['123@c.us', '456@c.us']
   * })
   * ```
   */
  mentionedList?: (string | Wid)[];

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
  quotedMsg?: string | MsgKey | MsgModel;

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
  waitForAck?: boolean;
  /**
   * Delay some time (in ms) before sending message
   * While delaying, Typing Status is used to look like a human interaction
   * @default 0
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('[number]@c.us', 'Delay with typing', {
   *   delay: 4000
   * })
   * ```
   */
  delay?: number;
}

export interface SendMessageReturn {
  id: string;
  from?: string;
  to?: string;
  latestEditMsgKey?: MsgKey;
  ack: number;
  sendMsgResult: Promise<SendMsgResult>;
}

export type RawMessage = ModelPropertiesContructor<MsgModel>;
