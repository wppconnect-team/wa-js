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

export interface ChatEventTypes {
  change: string;
  idle: undefined;
  msg_revoke: {
    /**
     * Author of message, only for groups
     */
    author?: Wid;
    from: Wid;
    /**
     * Message id of revoke event
     */
    id: MsgKey;
    /**
     * Message id of revoked message
     */
    refId: MsgKey;
    to: Wid;
  };
  msg_ack_change: {
    ack: number;
    /**
     * Who sended the ack, only for groups, broadcast and status
     */
    sender?: Wid;
    /**
     * The chat that sended the messeage
     */
    chat: Wid;
    /**
     * Message id of revoke event
     */
    ids: MsgKey[];
  };
}

export interface GetMessagesOptions {
  count?: number;
  direction?: 'after' | 'before';
  id?: string;
}

export interface DeleteMessageReturn {
  id: string;
  sendMsgResult: Promise<SendMsgResult>;
  isRevoked: boolean;
  isDeleted: boolean;
}

export interface SendMessageOptions {
  /**
   * Create a new chat to a new contact
   *
   * @default false
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('<number>@c.us', 'Hello new contact', {
   *   createChat: true
   * });
   * ```
   */
  createChat?: boolean;

  /**
   * Automatic detect and add the mentioned contacts with @<number>
   *
   * @default true
   *
   * @example
   * ```javascript
   * WPP.chat.sendTextMessage('<number>@c.us', 'Hello @123 and @456', {
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
   * WPP.chat.sendTextMessage('<number>@c.us', 'Replying your message', {
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
   * WPP.chat.sendTextMessage('<number>@c.us', 'Hello @123 and @456', {
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
   * WPP.chat.sendTextMessage('<number>@c.us', 'This is a reply', {
   *   quotedMsg: 'true_<number>@c.us_3EB0F435D95D32C4C638'
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
   * WPP.chat.sendTextMessage('<number>@c.us', 'Wait for sent', {
   *   waitForAck: true
   * })
   * ```
   */
  waitForAck?: boolean;
}

export interface SendMessageReturn {
  id: string;
  ack: number;
  sendMsgResult: Promise<SendMsgResult>;
}

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

export type TextMessageOptions = SendMessageOptions & MessageButtonsOptions;

export interface FileMessageOptions extends SendMessageOptions {
  type: string;
  caption?: string;
  filename?: string;
  mimetype?: string;
}

export interface AutoDetectMessageOptions extends FileMessageOptions {
  type: 'auto-detect';
}

export interface AudioMessageOptions extends FileMessageOptions {
  type: 'audio';
  isPtt?: boolean;
}

export interface DocumentMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'document';
}

export interface ImageMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'image';
  isViewOnce?: boolean;
}

export interface StickerMessageOptions extends FileMessageOptions {
  type: 'sticker';
}

export interface VideoMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'video';
  isGif?: boolean;
}

export interface VCardContact {
  id: string | Wid;
  name: string;
}

export type AllMessageOptions = SendMessageOptions &
  MessageButtonsOptions &
  Partial<ListMessageOptions>;

export type RawMessage = ModelPropertiesContructor<MsgModel>;
