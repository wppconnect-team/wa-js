/*!
 * Copyright 2022 WPPConnect Team
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

import { getMyDeviceId } from '../conn';
import { internalEv } from '../eventEmitter';
import { createWid } from '../util';
import * as webpack from '../webpack';
import {
  ChatModel,
  ContactStore,
  functions,
  MsgModel,
  MsgStore,
} from '../whatsapp';
import { wrapModuleFunction } from '../whatsapp/exportModule';
import {
  createChat,
  createChatRecord,
  findChat,
  getExisting,
  isUnreadTypeMsg,
  mediaTypeFromProtobuf,
  typeAttributeFromProtobuf,
} from '../whatsapp/functions';

webpack.onFullReady(applyPatch, 1000);
webpack.onFullReady(applyPatchModel);

function applyPatch() {
  wrapModuleFunction(mediaTypeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.deviceSentMessage) {
      const { message: n } = proto.deviceSentMessage;
      return n ? mediaTypeFromProtobuf(n) : null;
    }
    if (proto.ephemeralMessage) {
      const { message: n } = proto.ephemeralMessage;
      return n ? mediaTypeFromProtobuf(n) : null;
    }
    if (proto.viewOnceMessage) {
      const { message: n } = proto.viewOnceMessage;
      return n ? mediaTypeFromProtobuf(n) : null;
    }

    return func(...args);
  });

  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;

    if (proto.ephemeralMessage) {
      const { message: n } = proto.ephemeralMessage;
      return n ? typeAttributeFromProtobuf(n) : 'text';
    }
    if (proto.deviceSentMessage) {
      const { message: n } = proto.deviceSentMessage;
      return n ? typeAttributeFromProtobuf(n) : 'text';
    }
    if (proto.viewOnceMessage) {
      const { message: n } = proto.viewOnceMessage;
      return n ? typeAttributeFromProtobuf(n) : 'text';
    }

    return func(...args);
  });

  /**
   * Reinforce unread messages for buttons and lists
   */
  wrapModuleFunction(isUnreadTypeMsg, (func, ...args) => {
    const [msg] = args;

    switch (msg.type) {
      case 'buttons_response':
      case 'hsm':
      case 'list':
      case 'list_response':
      case 'template_button_reply':
        return true;
    }

    return func(...args);
  });

  wrapModuleFunction(createChatRecord, async (func, ...args) => {
    const [wid, chatRecord]: any = args;
    const maxAttempts = 5;
    let delay = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await func(...args);
      } catch (err) {
        if (attempt === maxAttempts) {
          return await new Promise((resolve) => {
            const request = indexedDB.open('model-storage');

            request.onsuccess = function (event: any) {
              const db = event.target.result;

              const chat = Object.assign({ id: wid.toString() }, chatRecord);

              const transaction = db.transaction('chat', 'readwrite');
              const store = transaction.objectStore('chat');
              const addRequest = store.add(chat);

              addRequest.onsuccess = () => {
                internalEv.emit('chat:chat_error' as any, {
                  deviceJid: getMyDeviceId()?.toString(),
                  chatId: wid?.toString(),
                  error: 'success-attempt-to-get-chat-record',
                  attempt: attempt,
                  recoveredChat: false,
                  wid: wid,
                  attributos: chatRecord,
                });
                resolve(undefined);
              };

              addRequest.onerror = (event: any) => {
                internalEv.emit('chat:chat_error' as any, {
                  deviceJid: getMyDeviceId()?.toString(),
                  chatId: wid?.toString(),
                  error: 'errored-manual-attempt-to-get-chat-record',
                  attempt: attempt,
                  recoveredChat: false,
                  errorData: event?.target?.error?.toString(),
                  wid: wid,
                  attributos: chatRecord,
                  originalError: err?.toString(),
                });
                throw err;
              };
            };
          });
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  });

  wrapModuleFunction(findChat, async (func, ...args) => {
    const [chatId] = args;
    const contact = ContactStore.get(chatId);
    const existingChat = await getExisting(chatId);
    if (!existingChat && contact) {
      const chatParams: any = { chatId };
      await createChat(
        chatParams,
        'createChat',
        {
          createdLocally: true,
          lidOriginType: 'general',
        },
        {}
      );
      return await func(...args)!;
    }
    return await func(...args);
  });

  /*  wrapModuleFunction(processRenderableMessages, async (func, ...args) => {
    const [messages] = args;
    for (const message of messages) {
      checkMessage(message);
    }
    return await func(...args);
  });*/

  function checkMessage(message: any) {
    if (
      message.id?.remote?._serialized === 'status@broadcast' ||
      !message.id?._serialized
    )
      return;
    setTimeout(async () => {
      if (
        message.type === 'chat' ||
        message.type === 'image' ||
        message.type === 'video' ||
        message.type === 'ptt'
      ) {
        const exist = MsgStore.get(message.id?._serialized);
        if (!exist) {
          const chat = await getExisting(
            createWid(message.id!.remote!._serialized!) as any
          );
          const contact = ContactStore.get(message.id?.remote?._serialized);

          const data = {
            chatId: message.id?.remote?.toString(),
            deviceJid: getMyDeviceId()?.toString(),
            chatExist: chat ? chat.id.toString() : null,
            contactExist: contact ? contact.id.toString() : null,
            error: 'message-not-found-store',
            body: message?.body,
            msgId: message.id?.toString(),
            time: message?.t,
            type: message?.type,
            local: 'receive-message-parse',
            recoveredChat: false,
          };

          if (!chat) {
            console.log(
              'Iniciado tentativa de recuperar chat: ',
              message.id?.remote?._serialized
            );
            const chatId = createWid(message.id?.remote?._serialized);
            const chatParams = { chatId };

            await createChat(
              chatParams,
              'chatListUtils',
              {
                createdLocally: true,
                lidOriginType: 'general',
              },
              {}
            );
            const newChat = await getExisting(chatId as any);
            data.recoveredChat = true;
            newChat?.msgs.add(
              new MsgModel({
                ...message,
                isNewMsg: true,
              })
            );
          } else {
            data.recoveredChat = false;
            chat?.msgs.add(
              new MsgModel({
                ...message,
                isNewMsg: true,
              })
            );
          }

          internalEv.emit('chat:chat_error' as any, data);
        }
      }
    }, 5000);
  }

  /*wrapModuleFunction(getExisting, async (func, ...args) => {
    const existingChat = await func(...args);
    const contact = ContactStore.get(args[0]);
    const chatParams: any = { chatId: args[0] };

    if (contact && !existingChat) {
      console.log(
        'Found chat error. Fixing chat issue!',
        contact?.id?.toString()
      );
      internalEv.emit('chat:chat_error' as any, {
        chatId: contact?.id?.toString(),
        deviceJid: getMyDeviceId()?.toString(),
        error: 'chat-not-found',
        local: 'get-message-existing',
      });
      await createChat(
        chatParams,
        'chatListUtils',
        {
          createdLocally: true,
          lidOriginType: 'general',
        },
        {}
      );
      return await getExisting(chatParams.chatId);
    } else {
      return existingChat;
    }
  });*/

  /*wrapModuleFunction(findOrCreateLatestChat, async (func, ...args) => {
    const chatId = args[0];
    const chatParams: any = { chatId: args[0] };
    const context = args[1];
    const options = (args as any)[2];
    const existingChat = await getExisting(chatParams.chatId);
    const { forceUsync, nextPrivacyMode } = options ?? ({} as any);
    const contact = ContactStore.get(chatId);

    if (contact && !existingChat) {
      internalEv.emit('chat:chat_error' as any, {
        chatId: contact?.id?.toString(),
        error: 'chat-not-found',
        local: 'send-message',
      });
      await createChat(
        chatParams,
        context,
        {
          createdLocally: true,
          lidOriginType: 'general',
        },
        {
          forceUsync,
          nextPrivacyMode,
        }
      );
      const existingChat = await getExisting(chatParams.chatId);
      return { chat: existingChat as ChatModel, created: false };
    } else {
      return await func(...args);
    }
  });*/
}

function applyPatchModel() {
  const funcs: {
    [key: string]: (...args: any[]) => any;
  } = {
    shouldAppearInList: functions.getShouldAppearInList,
    isUser: functions.getIsUser,
    isPSA: functions.getIsPSA,
    isGroup: functions.getIsGroup,
    isNewsletter: functions.getIsNewsletter,
    previewMessage: functions.getPreviewMessage,
    showChangeNumberNotification: functions.getShowChangeNumberNotification,
    hasUnread: functions.getHasUnread,
  };

  for (const attr in funcs) {
    const func = funcs[attr];
    if (typeof (ChatModel.prototype as any)[attr] === 'undefined') {
      Object.defineProperty(ChatModel.prototype, attr, {
        get: function () {
          return func(this);
        },
        configurable: true,
      });
    }
  }
}
