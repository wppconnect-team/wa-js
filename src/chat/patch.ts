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

import { WPPError } from '../util';
import * as webpack from '../webpack';
import { ChatModel, functions, WidFactory } from '../whatsapp';
import { wrapModuleFunction } from '../whatsapp/exportModule';
import {
  createChat,
  findOrCreateLatestChat,
  getChatRecordByAccountLid,
  getEnforceCurrentLid,
  getExisting,
  isUnreadTypeMsg,
  mediaTypeFromProtobuf,
  selectChatForOneOnOneMessage,
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

  /**
   * Patch for fix error on try send message to lids
   */
  wrapModuleFunction(findOrCreateLatestChat, async (func, ...args) => {
    const type = args[1];
    const chatId = args[0];
    let chatParams: any = { chatId: args[0] };
    const context = args[1];
    const options = (args as any)[2];

    if (chatId.isLid()) {
      const lid = getEnforceCurrentLid(chatId);
      chatParams = await selectChatForOneOnOneMessage({ lid });
    }

    const { forceUsync, signal, nextPrivacyMode } = options ?? ({} as any);

    if (signal?.aborted) {
      throw new WPPError('signal_abort_error', 'Signal aborted');
    }

    const existingChat = await getExisting(chatParams.chatId);
    if (existingChat) {
      if (
        type == 'forwardSelectedModals' ||
        type == 'newChatFlow' ||
        type == 'chatInfoTopCard'
      ) {
        return { chat: existingChat, created: false };
      } else {
        return existingChat;
      }
    }

    const createChatParams: {
      createdLocally: boolean;
      notSpam?: boolean;
      lidOriginType?: any;
    } = {
      createdLocally: true,
      lidOriginType: 'general',
    };
    await createChat(chatParams, context, createChatParams, {
      forceUsync,
      nextPrivacyMode,
    });

    const newChat = await getExisting(chatParams.chatId);
    if (!newChat) {
      throw new Error('findChat: new chat not found');
    }

    return newChat;
  });

  wrapModuleFunction(selectChatForOneOnOneMessage, async (func, ...args) => {
    const accountLid = args[0];
    const chatRecords = await getChatRecordByAccountLid(accountLid);

    if (chatRecords.length > 1) {
      throw new WPPError(
        'selectChatForOneOnOneMessageAfterMigration',
        'selectChatForOneOnOneMessageAfterMigration: found multiple chats for unique index account_lid'
      );
    }

    if (chatRecords.length === 1) {
      const chatId = chatRecords[0].id;
      return {
        accountLid,
        chatId: WidFactory.toUserWid(WidFactory.createWid(chatId)),
      };
    }

    return {
      accountLid: accountLid.lid,
      chatId: accountLid.lid,
    };
  });
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
