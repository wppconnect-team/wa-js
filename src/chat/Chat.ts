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
  ChatPresence,
  ChatStore,
  Clock,
  Constants,
  ContactModel,
  ContactStore,
  Features,
  MediaPrep,
  MsgKey,
  MsgModel,
  MsgStore,
  OpaqueData,
  ReplyButtonModel,
  UserPrefs,
  VCard,
  VCardData,
  Wid,
} from '../whatsapp';
import { SendMsgResult } from '../whatsapp/enums';
import {
  addAndSendMsgToChat,
  findChat,
  markUnread,
  msgFindQuery,
  MsgFindQueryParams,
  randomMessageId,
  sendClear,
  sendDelete,
  sendSeen,
} from '../whatsapp/functions';
import {
  AudioMessageOptions,
  DeleteMessageReturn,
  DocumentMessageOptions,
  ImageMessageOptions,
  SendMessageReturn,
  StickerMessageOptions,
  VCardContact,
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
    detectMentioned: true,
    waitForAck: true,
    markIsRead: true,
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

  protected registerRevokeMessageEvent() {
    /**
     * processMultipleMessages receive all msgs events before the screen processing,
     * so for some events, like revoke, is called here and not in MsgStore,
     * because the message is not in MsgStore
     */
    const processMultipleMessages = MsgStore.processMultipleMessages;

    MsgStore.processMultipleMessages = (
      chatId: Wid,
      msgs: RawMessage[],
      ...args: any[]
    ) => {
      return new Promise((resolve, reject) => {
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
        processMultipleMessages
          .call(MsgStore, chatId, msgs, ...args)
          .then(resolve, reject);
      });
    };
  }

  protected registerAckMessageEvent() {
    MsgStore.on('change:ack', (msg: MsgModel) => {
      if (msg.ack === 1) {
        this.emit('msg_ack_change', {
          ack: msg.ack,
          chat: msg.to!,
          ids: [msg.id],
        });
      }
    });

    const processACK = (e: any) => {
      let ids: string[] = e.id;

      if (!Array.isArray(ids)) {
        ids = [ids];
      }

      let chatId: Wid = e.to;
      let sender: Wid | undefined = e.participant;

      if (e.broadcast) {
        chatId = e.broadcast;
        sender = e.to;
      }

      const keys = ids.map(
        (id) =>
          new MsgKey({
            from: e.from,
            to: chatId,
            id: id,
            selfDir: 'out',
          })
      );

      this.emit('msg_ack_change', {
        ack: e.ack,
        chat: chatId,
        sender: sender,
        ids: keys,
      });
    };

    const msgHandlerModule = webpack.search((m) =>
      m.default.toString().includes('Msg:out of order ack')
    );

    if (msgHandlerModule) {
      const originalCall = msgHandlerModule.default;

      msgHandlerModule.default = async ([e]: [any]) => {
        if (e.cmd === 'ack' || e.cmd === 'acks') {
          processACK(e);
        }

        return originalCall.call(msgHandlerModule, [e]);
      };
    }

    const msgInfoHandlerModule = webpack.search(
      (m) =>
        m.default.toString().includes('ack') &&
        m.default.toString().includes('acks') &&
        m.default.toString().includes('default.updateInfo')
    );

    if (msgInfoHandlerModule) {
      const originalCall = msgInfoHandlerModule.default;

      msgInfoHandlerModule.default = async ([e]: [any]) => {
        if (e.cmd === 'ack' || e.cmd === 'acks') {
          processACK(e);
        }

        return originalCall.call(msgHandlerModule, [e]);
      };
    }
  }

  protected registerEvents() {
    this.registerRevokeMessageEvent();
    this.registerAckMessageEvent();
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
   * Mark a chat as read and send SEEN event
   *
   * @example
   * ```javascript
   * // Some messages
   * WPP.chat.markIsRead('<number>@c.us');
   * ```
   */
  async markIsRead(chatId: string | Wid) {
    const chat = assertGetChat(chatId);

    const unreadCount = chat.unreadCount!;

    await sendSeen(chat, true);

    return {
      wid: chat.id,
      unreadCount,
    };
  }

  /**
   * Mark a chat as unread
   *
   * @example
   * ```javascript
   * // Some messages
   * WPP.chat.markIsUnread('<number>@c.us');
   * ```
   */
  async markIsUnread(chatId: string | Wid) {
    const chat = assertGetChat(chatId);

    await markUnread(chat, true);

    return {
      wid: chat.id,
    };
  }

  /**
   * Mark a chat to composing state
   * and keep sending "is writting a message"
   *
   * @example
   * ```javascript
   * // Mark is composing
   * WPP.chat.markIsComposing('<number>@c.us');
   *
   * // Mark is composing for 5 seconds
   * WPP.chat.markIsComposing('<number>@c.us', 5000);
   * ```
   */
  async markIsComposing(chatId: string | Wid, duration?: number) {
    const chat = assertGetChat(chatId);

    await chat.presence.subscribe();

    await ChatPresence.markComposing(chat);

    if (chat.pausedTimerId) {
      clearTimeout(chat.pausedTimerId);
      chat.unset('pausedTimerId');
    }

    if (duration) {
      chat.pausedTimerId = setTimeout(() => {
        this.markIsPaused(chatId);
      }, duration);
    }
  }

  /**
   * Mark a chat to recording state
   * and keep sending "is recording"
   *
   * @example
   * ```javascript
   * // Mark is recording
   * WPP.chat.markIsRecording('<number>@c.us');
   *
   * // Mark is recording for 5 seconds
   * WPP.chat.markIsRecording('<number>@c.us', 5000);
   * ```
   */
  async markIsRecording(chatId: string | Wid, duration?: number) {
    const chat = assertGetChat(chatId);

    await chat.presence.subscribe();

    await ChatPresence.markRecording(chat);

    if (duration) {
      chat.pausedTimerId = setTimeout(() => {
        this.markIsPaused(chatId);
      }, duration);
    }
  }

  /**
   * Mark a chat is paused state
   *
   * @example
   * ```javascript
   * // Mark as recording
   * WPP.chat.markIsPaused('<number>@c.us');
   * ```
   */
  async markIsPaused(chatId: string | Wid) {
    const chat = assertGetChat(chatId);

    await chat.presence.subscribe();

    await ChatPresence.markPaused(chat);
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
    const id = options.id || chat.lastReceivedKey?.toString();

    // Fix for multidevice
    if (count === -1 && Features.supportsFeature('MD_BACKEND')) {
      count = Infinity;
    }

    if (!options.id && id) {
      count--;
    }

    const params: MsgFindQueryParams = id
      ? (MsgKey.fromString(id) as any)
      : {
          remote: chat.id,
        };

    params.count = count;
    params.direction = direction;

    const msgs = await msgFindQuery(direction, params);

    if (!options.id && id) {
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

  generateMessageID(chat: string | ChatModel | Wid): MsgKey {
    let to: Wid;

    if (chat instanceof Wid) {
      to = chat;
    } else if (chat instanceof ChatModel) {
      to = chat.id;
    } else {
      to = assertWid(chat);
    }

    return new MsgKey({
      from: UserPrefs.getMaybeMeUser(),
      to: to,
      id: randomMessageId(),
      selfDir: 'out',
    });
  }

  prepareMessageButtons<T extends RawMessage>(
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

  async prepareRawMessage<T extends RawMessage>(
    chat: ChatModel,
    message: T,
    options: SendMessageOptions = {}
  ): Promise<T> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    message = {
      t: Clock.globalUnixTime(),
      from: UserPrefs.getMaybeMeUser(),
      to: chat.id,
      self: 'out',
      isNewMsg: true,
      local: true,
      ack: Constants.ACK.CLOCK,
      ...message,
    };

    if (options.messageId) {
      if (typeof options.messageId === 'string') {
        options.messageId = MsgKey.fromString(options.messageId);
      }

      if (!options.messageId.fromMe) {
        throw new WPPError(
          'message_key_is_not_from_me',
          'Message key is not from me',
          {
            messageId: options.messageId.toString(),
          }
        );
      }

      if (!options.messageId.remote.equals(chat.id)) {
        throw new WPPError(
          'message_key_remote_id_is_not_same_of_chat',
          'Message key remote ID is not same of chat',
          {
            messageId: options.messageId.toString(),
          }
        );
      }

      message.id = options.messageId;
    }

    if (!message.id) {
      message.id = this.generateMessageID(chat);
    }

    if (options.mentionedList && !Array.isArray(options.mentionedList)) {
      throw new WPPError(
        'mentioned_list_is_not_array',
        'The option mentionedList is not an array',
        {
          mentionedList: options.mentionedList,
        }
      );
    }

    /**
     * Try to detect mentioned list from message
     */
    if (
      options.detectMentioned &&
      (!options.mentionedList || !options.mentionedList.length)
    ) {
      const text = message.type === 'chat' ? message.body : message.caption;

      options.mentionedList = options.mentionedList || [];

      const ids = text?.match(/(?<=@)(\d+)\b/g) || [];

      for (const id of ids) {
        options.mentionedList.push(assertWid(id));
      }
    }

    /**
     * Add the metadata for  mentioned list
     */
    if (options.mentionedList) {
      const mentionedList = options.mentionedList.map((m) =>
        m instanceof Wid ? m : assertWid(m)
      );

      for (const m of mentionedList) {
        if (!m.isUser()) {
          throw new WPPError(
            'mentioned_is_not_user',
            'Mentioned is not an user',
            {
              mentionedId: m.toString(),
            }
          );
        }
      }

      message.mentionedJidList = mentionedList;
    }

    /**
     * Quote a message, like a reply message
     */
    if (options.quotedMsg) {
      if (typeof options.quotedMsg === 'string') {
        options.quotedMsg = MsgKey.fromString(options.quotedMsg);
      }
      if (options.quotedMsg instanceof MsgKey) {
        options.quotedMsg = await this.getMessageById(
          options.quotedMsg.remote,
          options.quotedMsg.toString()
        );
      }

      if (!(options.quotedMsg instanceof MsgModel)) {
        throw new WPPError('invalid_quoted_msg', 'Invalid quotedMsg', {
          quotedMsg: options.quotedMsg,
        });
      }

      if (!options.quotedMsg.canReply()) {
        throw new WPPError(
          'quoted_msg_can_not_reply',
          'QuotedMsg can not reply',
          {
            quotedMsg: options.quotedMsg,
          }
        );
      }

      message = {
        ...message,
        ...options.quotedMsg.msgContextInfo(chat),
      };
    }

    return message;
  }

  async sendRawMessage(
    chatId: any,
    rawMessage: RawMessage,
    options: SendMessageOptions = {}
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    const chat = options.createChat
      ? await assertFindChat(chatId)
      : assertGetChat(chatId);

    rawMessage = await this.prepareRawMessage(chat, rawMessage, options);

    if (options.markIsRead) {
      debugMessage(`marking chat is read before send message`);
      await this.markIsRead(chat.id);
    }

    debugMessage(
      `sending message (${rawMessage.type}) with id ${rawMessage.id}`
    );
    const result = await addAndSendMsgToChat(chat, rawMessage);
    debugMessage(`message ${rawMessage.id} queued`);

    const message = await result[0];

    if (options.waitForAck) {
      debugMessage(`waiting ack for ${rawMessage.id}`);

      const sendResult = await result[1];

      debugMessage(
        `ack received for ${rawMessage.id} (ACK: ${message.ack}, SendResult: ${sendResult})`
      );
    }

    return {
      id: message.id.toString(),
      ack: message.ack!,
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

    let rawMessage: RawMessage = {
      body: content,
      type: 'chat',
      subtype: null,
      urlText: null,
      urlNumber: null,
    };

    rawMessage = this.prepareMessageButtons(rawMessage, options);

    return await this.sendRawMessage(chatId, rawMessage, options);
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

  /**
   * Send a file message, that can be an audio, document, image, sticker or video
   *
   * @example
   * ```javascript
   * // Single document
   * WPP.chat.sendFileMessage(
   *  '<number>@c.us',
   *  'data:image/jpeg;base64,<a long base64 file...>',
   *  {
   *    type: 'document',
   *    caption: 'My document', // Optional
   *    filename: 'myfile.doc', // Optional
   *    mimetype: 'application/msword' // Optional
   *  }
   * );
   *
   * // Image with view once
   * WPP.chat.sendFileMessage(
   *  '<number>@c.us',
   *  'data:image/jpeg;base64,<a long base64 file...>',
   *  {
   *    type: 'image',
   *    caption: 'My image', // Optional
   *    isViewOnce: true
   *  }
   * );
   *
   * // PTT audio
   * WPP.chat.sendFileMessage(
   *  '<number>@c.us',
   *  'data:audio/mp3;base64,<a long base64 file...>',
   *  {
   *    type: 'audio',
   *    isPtt: true // false for common audio
   *  }
   * );
   *
   * // Image with view buttons
   * WPP.chat.sendFileMessage(
   *  '<number>@c.us',
   *  'data:image/jpeg;base64,<a long base64 file...>',
   *  {
   *    type: 'image',
   *    caption: 'My image'
   *    buttons: [
   *      {
   *        id: 'your custom id 1',
   *        text: 'Some text'
   *      },
   *      {
   *        id: 'another id 2',
   *        text: 'Another text'
   *      }
   *    ],
   *    footer: 'Footer text' // Optional
   *  }
   * );
   *
   * // Image as Sticker
   * WPP.chat.sendFileMessage(
   *   '<number>@c.us',
   *   'data:image/png;base64,<a long base64 file...>',
   *   {
   *     type: 'sticker'
   *   }
   * );
   * ```
   *
   * @return  {SendMessageReturn} The result
   */
  async sendFileMessage(
    chatId: any,
    content: any,
    options:
      | AudioMessageOptions
      | DocumentMessageOptions
      | ImageMessageOptions
      | VideoMessageOptions
      | StickerMessageOptions
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...{
        type: 'auto-detect',
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
    } else if (options.type === 'sticker') {
      rawMediaOptions.asSticker = true;
    }

    const mediaPrep = MediaPrep.prepRawMedia(opaqueData, rawMediaOptions);

    // The generated message in `sendToChat` is merged with `productMsgOptions`
    let rawMessage = await this.prepareRawMessage<RawMessage>(
      chat,
      {
        caption: options.caption,
      },
      options
    );

    rawMessage = this.prepareMessageButtons(rawMessage, options as any);

    if (options.markIsRead) {
      debugMessage(`marking chat is read before send file`);
      await this.markIsRead(chat.id);
    }

    debugMessage(`sending message (${options.type}) with id ${rawMessage.id}`);
    const sendMsgResult = mediaPrep.sendToChat(chat, {
      caption: options.caption,
      isViewOnce,
      productMsgOptions: rawMessage,
    });

    // Wait for message register
    const message = await new Promise<MsgModel>((resolve) => {
      chat.msgs.on('add', function fn(msg: MsgModel) {
        if (msg.id === rawMessage.id) {
          chat.msgs.off('add', fn);
          resolve(msg);
        }
      });
    });
    debugMessage(`message file ${message.id} queued`);

    function uploadStage(mediaData: any, stage: string) {
      debugMessage(`message file ${message.id} is ${stage}`);
    }

    message.on('change:mediaData.mediaStage', uploadStage);

    sendMsgResult.finally(() => {
      message.off('change:mediaData.mediaStage', uploadStage);
    });

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
      sendMsgResult,
    };
  }

  async sendVCardContactMessage(
    chatId: any,
    contacts: string | Wid | VCardContact | (string | Wid | VCardContact)[],
    options: SendMessageOptions = {}
  ): Promise<SendMessageReturn> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    if (!Array.isArray(contacts)) {
      contacts = [contacts];
    }

    const vcards: VCardData[] = [];

    for (const contact of contacts) {
      let id = '';
      let name = '';

      if (typeof contact === 'object' && 'name' in contact) {
        id = contact.id.toString();
        name = contact.name;
      } else {
        id = contact.toString();
      }

      let contactModel = ContactStore.get(id);
      if (!contactModel) {
        contactModel = new ContactModel({
          id: assertWid(id),
          name,
        });
      }

      if (!name && contactModel.id.equals(UserPrefs.getMaybeMeUser())) {
        name = contactModel.displayName;
      }

      if (name) {
        // Create a clone
        contactModel = new ContactModel(contactModel.attributes);
        contactModel.name = name;
        Object.defineProperty(contactModel, 'formattedName', { value: name });
        Object.defineProperty(contactModel, 'displayName', { value: name });
      }

      vcards.push(VCard.vcardFromContactModel(contactModel));
    }

    const message: RawMessage = {};

    if (vcards.length === 1) {
      message.type = 'vcard';
      message.body = vcards[0].vcard;
      message.vcardFormattedName = vcards[0].displayName;
    } else {
      message.type = 'multi_vcard';
      message.vcardList = vcards;
    }

    return this.sendRawMessage(chatId, message, options);
  }
}
