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

import parseDataURL from 'data-urls';
import Debug from 'debug';
import Emittery from 'emittery';
import FileType from 'file-type';

import { assertFindChat, assertGetChat, assertWid } from '../assert';
import { WPPError } from '../util';
import * as webpack from '../webpack';
import {
  ButtonCollection,
  ChatModel,
  ChatStore,
  ClockSkew,
  Constants,
  Features,
  MediaPrep,
  MsgKey,
  MsgModel,
  MsgStore,
  OpaqueData,
  ReplyButtonModel,
  UserPrefs,
  Wid,
} from '../whatsapp';
import { SendMsgResult } from '../whatsapp/enums';
import {
  addAndSendMsgToChat,
  findChat,
  msgFindQuery,
  MsgFindQueryParams,
  randomMessageId,
  sendClear,
  sendDelete,
} from '../whatsapp/functions';
import {
  AudioMessageOptions,
  DeleteMessageReturn,
  DocumentMessageOptions,
  ImageMessageOptions,
  SendMessageReturn,
  VideoMessageOptions,
} from '.';
import {
  ChatEventTypes,
  GetMessagesOptions,
  ListMessageOptions,
  MessageButtonsOptions,
  RawMessage,
  SendMessageOptions,
  TextMessageOptions,
} from './types';

const debugChat = Debug('WA-JS:chat');
const debugMessage = Debug('WA-JS:message');

export class Chat extends Emittery<ChatEventTypes> {
  public defaultSendMessageOptions: SendMessageOptions = {
    createChat: false,
    waitForAck: true,
  };

  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    ChatStore.on(Constants.COLLECTION_HAS_SYNCED, () => {
      debugChat(Constants.COLLECTION_HAS_SYNCED);
    });

    this.registerEvents();

    debugChat('initialized');
  }

  protected registerEvents() {
    /**
     * processMultipleMessages receive all msgs events before the screen processing,
     * so for some events, like revoke, is called here and not in MsgStore,
     * because the message is not in MsgStore
     */
    const processMultipleMessages = MsgStore.processMultipleMessages;

    MsgStore.processMultipleMessages = async (
      chatId: Wid,
      msgs: RawMessage[],
      ...args: any[]
    ) => {
      // try...catch to avoid screen block
      try {
        for (const msg of msgs) {
          if (!msg.isNewMsg) {
            continue;
          }

          if (msg.type === 'protocol' && msg.subtype === 'revoke') {
            this.emit('msg_revoke', {
              author: msg.author,
              from: msg.from!,
              id: msg.id!,
              refId: msg.protocolMessageKey!,
              to: msg.to!,
            });
          }
        }
      } catch (error) {}

      // Call the original method
      return processMultipleMessages.call(MsgStore, chatId, msgs, ...args);
    };
  }

  async find(chatId: string | Wid): Promise<ChatModel> {
    const wid = assertWid(chatId);
    return findChat(wid);
  }

  get(chatId: string | Wid): ChatModel | undefined {
    const wid = assertWid(chatId);
    return ChatStore.get(wid);
  }

  async delete(chatId: string | Wid) {
    const wid = assertWid(chatId);

    const chat = assertGetChat(wid);

    sendDelete(chat);

    let status = 200;

    if (chat.promises.sendDelete) {
      const result = await chat.promises.sendDelete.catch(() => ({
        status: 500,
      }));
      status = result.status || status;
    }

    return {
      wid,
      status,
    };
  }

  async clear(chatId: string | Wid, keepStarred = true) {
    const wid = assertWid(chatId);

    const chat = assertGetChat(wid);

    sendClear(chat, keepStarred);

    let status = 200;

    if (chat.promises.sendClear) {
      const result = await chat.promises.sendClear.catch(() => ({
        status: 500,
      }));
      status = result.status || status;
    }

    return {
      wid,
      status,
      keepStarred,
    };
  }

  /**
   * Fetch messages from a chat
   *
   * @example
   * ```javascript
   * // Some messages
   * WPP.chat.getMessages('<number>@c.us', {
   *   count: 20,
   * });
   *
   * // All messages
   * WPP.chat.getMessages('<number>@c.us', {
   *   count: -1,
   * });
   *
   * // 20 messages before specific message
   * WPP.chat.getMessages('<number>@c.us', {
   *   count: 20,
   *   direction: 'before',
   *   id: '<full message id>'
   * });
   * ```
   *
   * @return  {RawMessage[]} List of raw messages
   */
  async getMessages(
    chatId: string | Wid,
    options: GetMessagesOptions = {}
  ): Promise<RawMessage[]> {
    const chat = assertGetChat(chatId);

    let count = options.count || 20;
    const direction = options.direction === 'after' ? 'after' : 'before';
    const id = options.id || chat.lastReceivedKey!.toString();

    // Fix for multidevice
    if (count === -1 && Features.supportsFeature('MD_BACKEND')) {
      count = Infinity;
    }

    if (!options.id) {
      count--;
    }

    const params: MsgFindQueryParams = MsgKey.fromString(id) as any;

    params.count = count;
    params.direction = direction;

    const msgs = await msgFindQuery(direction, params);

    if (!options.id) {
      const msg = MsgStore.get(id);
      if (msg) {
        msgs.push(msg.attributes);
      }
    }

    return msgs;
  }

  async getMessageById(chatId: string | Wid, id: string): Promise<MsgModel>;
  async getMessageById(
    chatId: string | Wid,
    ids: string[]
  ): Promise<MsgModel[]>;
  async getMessageById(
    chatId: string | Wid,
    ids: string | string[]
  ): Promise<MsgModel | MsgModel[]> {
    const chat = assertGetChat(chatId);
    const debug = debugMessage.extend('getMessageById');

    let isSingle = false;

    if (!Array.isArray(ids)) {
      isSingle = true;
      ids = [ids];
    }

    const msgsKeys = ids.map((id) => MsgKey.fromString(id));

    const msgs: MsgModel[] = [];
    for (const msgKey of msgsKeys) {
      let msg = chat.msgs.get(msgKey);

      if (!msg) {
        debug(`searching remote message with id ${msgKey.toString()}`);
        const result = chat.getSearchContext(msgKey);
        await result.collection.loadAroundPromise;

        msg = chat.msgs.get(msgKey);
      }

      if (!msg) {
        debug(`message id ${msgKey.toString()} not found`);
        throw new WPPError(
          'msg_not_found',
          `Message ${msgKey.toString()} not found`,
          {
            id: msgKey.toString(),
          }
        );
      }

      msgs.push(msg);
    }

    if (isSingle) {
      return msgs[0];
    }
    return msgs;
  }

  async deleteMessage(
    chatId: string | Wid,
    id: string,
    deleteMediaInDevice: boolean,
    revoke: boolean
  ): Promise<DeleteMessageReturn>;
  async deleteMessage(
    chatId: string | Wid,
    ids: string[],
    deleteMediaInDevice: boolean,
    revoke: boolean
  ): Promise<DeleteMessageReturn[]>;
  async deleteMessage(
    chatId: string | Wid,
    ids: string | string[],
    deleteMediaInDevice = false,
    revoke = false
  ): Promise<DeleteMessageReturn | DeleteMessageReturn[]> {
    const chat = assertGetChat(chatId);

    let isSingle = false;

    if (!Array.isArray(ids)) {
      isSingle = true;
      ids = [ids];
    }

    const msgs = await this.getMessageById(chatId, ids);

    const results: any[] = [];
    for (const msg of msgs) {
      let sendMsgResult: SendMsgResult = SendMsgResult.ERROR_UNKNOWN;
      let isRevoked = false;
      let isDeleted = false;

      if (msg.type === Constants.MSG_TYPE.REVOKED) {
        // Message is already revoked
        sendMsgResult = SendMsgResult.ERROR_UNKNOWN;
        isRevoked = true;
      } else if (revoke) {
        sendMsgResult = await chat.sendRevokeMsgs([msg], deleteMediaInDevice);
        if (sendMsgResult === SendMsgResult.OK) {
          isRevoked = true;
        }
      } else {
        sendMsgResult = await chat.sendDeleteMsgs([msg], deleteMediaInDevice);
        if (sendMsgResult === SendMsgResult.OK) {
          isDeleted = true;
        }
      }

      results.push({
        id: msg.id.toString(),
        sendMsgResult,
        isRevoked,
        isDeleted,
      });
    }

    if (isSingle) {
      return results[0];
    }
    return results;
  }

  prepareMessageButtons(
    message: RawMessage,
    options: MessageButtonsOptions
  ): RawMessage {
    if (!options.buttons) {
      return message;
    }

    if (!Array.isArray(options.buttons)) {
      throw 'Buttons options is not a array';
    }

    if (options.buttons.length === 0 || options.buttons.length > 3) {
      throw 'Buttons options must have between 1 and 3 options';
    }

    if (message.type === 'chat') {
      message.contentText = message.body;
    } else {
      message.contentText = message.caption;
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

  async sendRawMessage(
    chatId: any,
    message: RawMessage,
    options: SendMessageOptions = {}
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    const chat = options.createChat
      ? await assertFindChat(chatId)
      : assertGetChat(chatId);

    message = {
      t: ClockSkew.globalUnixTime(),
      from: UserPrefs.getMaybeMeUser(),
      to: chat.id,
      self: 'out',
      isNewMsg: true,
      local: true,
      ack: Constants.ACK.CLOCK,
      ...message,
    };

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

      const sendResult = await result[1];

      debugMessage(
        `ack received for ${message.id} (ACK: ${finalMessage.ack}, SendResult: ${sendResult})`
      );
    }

    return {
      id: finalMessage.id.toString(),
      ack: finalMessage.ack!,
      message: finalMessage,
      sendMsgResult: result[1]!,
    };
  }

  async sendTextMessage(
    chatId: any,
    content: any,
    options: TextMessageOptions = {}
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    let message: RawMessage = {
      body: content,
      type: 'chat',
      subtype: null,
      urlText: null,
      urlNumber: null,
    };

    message = this.prepareMessageButtons(message, options);

    return await this.sendRawMessage(chatId, message, options);
  }

  /**
   * Send a list message
   *
   * @example
   * ```javascript
   * WPP.chat.sendListMessage('<number>@c.us', {
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
   */
  async sendListMessage(
    chatId: any,
    options: ListMessageOptions
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
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

    return await this.sendRawMessage(chatId, message, options);
  }

  protected async convertToFile(
    data: string,
    mimetype?: string,
    filename?: string
  ): Promise<File> {
    const parsed = parseDataURL(data);
    if (!parsed) {
      throw 'invalid_data_url';
    }

    if (!mimetype) {
      mimetype = parsed.mimeType.essence;
    }

    const buffer = parsed.body;
    const blob = new Blob(
      [new Uint8Array(buffer, buffer.byteOffset, buffer.length)],
      { type: mimetype }
    );

    if (!filename) {
      const result = await FileType.fromBuffer(buffer);
      if (result) {
        const baseType = result.mime.split('/')[0];
        filename = `${baseType}.${result.ext}`;
      } else {
        filename = 'unknown';
      }
    }

    return new File([blob], filename, {
      type: mimetype,
      lastModified: Date.now(),
    });
  }

  async sendFileMessage(
    chatId: any,
    content: any,
    options:
      | AudioMessageOptions
      | DocumentMessageOptions
      | ImageMessageOptions
      | VideoMessageOptions
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...{
        type: 'document',
      },
      ...options,
    };

    const chat = options.createChat
      ? await assertFindChat(chatId)
      : assertGetChat(chatId);

    const file = await this.convertToFile(
      content,
      options.mimetype,
      options.filename
    );

    const opaqueData = await OpaqueData.createFromData(file, file.type);

    const rawMediaOptions: {
      isPtt?: boolean;
      asDocument?: boolean;
      asGif?: boolean;
      isAudio?: boolean;
      asSticker?: boolean;
    } = {};

    let isViewOnce: boolean | undefined;

    if (options.type === 'audio') {
      rawMediaOptions.isPtt = options.isPtt;
    } else if (options.type === 'image') {
      isViewOnce = options.isViewOnce;
    } else if (options.type === 'video') {
      rawMediaOptions.asGif = options.isGif;
    } else if (options.type === 'document') {
      rawMediaOptions.asDocument = true;
    }

    const mediaPrep = MediaPrep.prepRawMedia(opaqueData, rawMediaOptions);

    // Force a known mesage ID
    const id = new MsgKey({
      from: UserPrefs.getMaybeMeUser(),
      to: chat.id,
      id: randomMessageId(),
      selfDir: 'out',
    });

    // The generated message in `sendToChat` is merged with `productMsgOptions`
    const productMsgOptions = { id };

    debugMessage(`sending message (${options.type}) with id ${id}`);
    const sendMsgResult = mediaPrep.sendToChat(chat, {
      caption: options.caption,
      isViewOnce,
      productMsgOptions,
    });

    const message = await new Promise<MsgModel>((resolve) => {
      chat.msgs.on('add', function fn(msg: MsgModel) {
        if (msg.id === id) {
          chat.msgs.off('add', fn);
          resolve(msg);
        }
      });
    });
    debugMessage(`message file ${message.id} queued`);

    if (options.waitForAck) {
      debugMessage(`waiting ack for ${message.id}`);

      const sendResult = await sendMsgResult;

      debugMessage(
        `ack received for ${message.id} (ACK: ${message.ack}, SendResult: ${sendResult})`
      );
    }

    return {
      id: message.id.toString(),
      ack: message.ack!,
      message: message,
      sendMsgResult,
    };
  }
}
