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

import * as webpack from '../webpack';
import { ChatModel, ContactStore, functions } from '../whatsapp';
import { wrapModuleFunction } from '../whatsapp/exportModule';
import {
  createChat,
  createChatRecord,
  findChat,
  getEnforceCurrentLid,
  getExisting,
  isLidMigrated,
  isUnreadTypeMsg,
  mediaTypeFromProtobuf,
  shouldHaveAccountLid,
  toUserLid,
  typeAttributeFromProtobuf,
} from '../whatsapp/functions';
import { resolveChatLid } from './helpers/resolveChatLid';

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
    const [chatId, chatRecord] = args as [ChatModel['id'], any];

    if (chatRecord && !chatRecord.accountLid && chatId?.isUser?.()) {
      const lid = await resolveChatLid(chatId);
      if (lid) {
        chatRecord.accountLid = lid._serialized;
      }
    }

    const maxAttempts = 5;
    let delay = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await func(...args);
      } catch (err) {
        if (attempt === maxAttempts) {
          throw err;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  });

  wrapModuleFunction(findChat, async (func, ...args) => {
    const [chatId] = args;

    if (!chatId.isLid()) {
      return await func(...args);
    }

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

  wrapModuleFunction(getEnforceCurrentLid, (_func, ...args) => {
    const [UserWid] = args;

    try {
      const LID = toUserLid ? toUserLid(UserWid) : null;
      return LID || UserWid;
    } catch {
      return UserWid;
    }
  });

  wrapModuleFunction(shouldHaveAccountLid, () => false);

  wrapModuleFunction(isLidMigrated, (func, ...args) => {
    try {
      return func(...args);
    } catch {
      return false;
    }
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
