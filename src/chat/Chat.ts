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

import Debug from 'debug';
import Emittery from 'emittery';

import { assertFindChat, assertGetChat, assertWid } from '../assert';
import * as webpack from '../webpack';
import {
  ChatModel,
  ChatStore,
  ClockSkew,
  Constants,
  MsgKey,
  UserPrefs,
  Wid,
} from '../whatsapp';
import {
  addAndSendMsgToChat,
  findChat,
  randomMessageId,
} from '../whatsapp/functions';
import { ChatRawMessage } from '.';
import { ChatEventTypes, ChatSendMessageOptions } from './types';

const debugChat = Debug('WPP:chat');
const debugMessage = Debug('WPP:message');

export class Chat extends Emittery<ChatEventTypes> {
  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    ChatStore.on(Constants.COLLECTION_HAS_SYNCED, () => {
      debugChat(Constants.COLLECTION_HAS_SYNCED);
    });

    debugChat('initialized');
  }

  async find(chatId: string | Wid): Promise<ChatModel> {
    const wid = assertWid(chatId);
    return findChat(wid);
  }

  get(chatId: string | Wid): ChatModel | undefined {
    const wid = assertWid(chatId);
    return ChatStore.get(wid);
  }

  async sendRawMessage(
    chatId: any,
    message: ChatRawMessage,
    options: ChatSendMessageOptions = {}
  ): Promise<any> {
    const chat = options.createChat
      ? await assertFindChat(chatId)
      : assertGetChat(chatId);

    message = Object.assign(
      {},
      {
        t: ClockSkew.globalUnixTime(),
        from: UserPrefs.getMaybeMeUser(),
        to: chat.id,
        self: 'out',
        isNewMsg: true,
        local: true,
        ack: Constants.ACK.CLOCK,
      },
      message
    );

    if (!message.id) {
      message.id = new MsgKey({
        from: UserPrefs.getMaybeMeUser(),
        to: chat.id,
        id: randomMessageId(),
        selfDir: 'out',
      });
    }

    debugMessage(`sending message (${message.type}) with id ${message.id}`);
    const result = await addAndSendMsgToChat(chat, message);
    debugMessage(`message ${message.id} queued`);

    const finalMessage = await result[0];

    if (options.waitForAck) {
      debugMessage(`waiting ack for ${message.id}`);

      await result[1];

      debugMessage(`ack received for ${message.id} (ACK: ${finalMessage.ack})`);
    }

    return {
      id: finalMessage.id.toString(),
      ack: finalMessage.ack,
    };
  }

  async sendTextMessage(
    chatId: any,
    content: any,
    options: ChatSendMessageOptions = {}
  ): Promise<any> {
    const message: ChatRawMessage = {
      body: content,
      type: 'chat',
      subtype: null,
      urlText: null,
      urlNumber: null,
    };

    const result = await this.sendRawMessage(chatId, message, options);

    return result;
  }
}
