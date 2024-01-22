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

import { Label } from '../../labels';
import { ChatModel, MsgKey, MsgModel, Wid } from '../../whatsapp';

export interface ChatEventTypes {
  /**
   * Triggered when change the active chat
   *
   * @example
   * ```javascript
   * WPP.on('chat.active_chat', (chat) => {
   *   // Your code
   * });
   * ```
   */
  'chat.active_chat': ChatModel;
  /**
   * Triggered when new message is received
   *
   * @example
   * ```javascript
   * WPP.on('chat.new_message', (msg) => {
   *   // Your code
   * });
   * ```
   */
  'chat.new_message': MsgModel;
  'chat.msg_revoke': {
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
    /**
     * Type of revoke
     */
    type: 'revoke' | 'sender_revoke' | 'admin_revoke';
  };
  'chat.msg_ack_change': {
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

  /**
   * On Message edit
   */
  'chat.msg_edited': {
    chat: Wid;
    id: string;
    msg: MsgModel;
  };

  'chat.live_location_start': {
    id: Wid;
    msgId: MsgKey;
    chat: Wid;
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number;
    degrees?: number;
    shareDuration: number;
  };
  /**
   * @deprecated Temporary unsuported by WhatsApp Web Multi-Device
   */
  'chat.live_location_update': {
    id: Wid;
    lastUpdated: number;
    elapsed: number;
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number;
    degrees?: number;
    comment: string;
  };
  /**
   * @deprecated Temporary unsuported by WhatsApp Web Multi-Device
   */
  'chat.live_location_end': {
    id: Wid;
    chat: Wid;
    seq: number;
  };

  /**
   * Triggered when a new reaction is received
   *
   * @example
   * ```javascript
   * WPP.on('chat.new_reaction', (msg) => {
   *   // Your code
   * });
   * ```
   */
  'chat.new_reaction': {
    /**
     * Reaction ID
     */
    id: MsgKey;
    /**
     * Message ID that received the reaction
     */
    msgId: MsgKey;
    /**
     * The reaction emoji or empty if removed
     */
    reactionText: string;
    read: boolean;
    sender: Wid;
    orphan: number;
    orphanReason: any;
    timestamp: number;
  };

  /**
   * On presence change
   */
  'chat.presence_change': {
    id: Wid;
    isOnline: boolean;
    isGroup: boolean;
    isUser: boolean;
    shortName: string;
    state: string;
    t: number;
    isContact?: boolean;
    participants?: {
      id: string;
      state: string;
      shortName: string;
    }[];
  };

  /**
   * On Poll response
   */
  'chat.poll_response': {
    msgId: MsgKey;
    chatId: Wid;
    selectedOptions: number[];
    timestamp: number;
    sender: Wid;
  };

  /**
   * On Labels update
   */
  'chat.update_label': {
    chat: ChatModel;
    ids: string[];
    labels: Label[];
    type: 'add' | 'remove';
  };
}
