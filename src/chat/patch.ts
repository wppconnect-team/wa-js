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

import * as loader from '../loader';
import { ChatModel, functions } from '../whatsapp';
import { wrapModuleFunction } from '../whatsapp/exportModule';
import {
  createChatRecord,
  getABPropConfigValue,
  isLidMigrated,
  isUnreadTypeMsg,
  mediaTypeFromProtobuf,
  typeAttributeFromProtobuf,
} from '../whatsapp/functions';
import { forceMediaUploadMainThread } from './functions/forceMediaUploadMainThread';

loader.onFullReady(applyPatch, 1000);
loader.onFullReady(applyPatchModel);

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

  wrapModuleFunction(isLidMigrated, (func, ...args) => {
    try {
      return func(...args);
    } catch {
      return false;
    }
  });

  /**
   * Keep media encryption/upload on the main thread.
   *
   * When the `web_media_encrypt_upload_in_worker_enabled` AB prop is enabled,
   * WAWebUploadManager routes `encryptAndUpload` through
   * WAWebUploadManagerWorkerBridge, which delegates the work to a backend
   * worker with `sendAndReceive('media', 'encryptAndUpload', ...)`. That worker
   * never answers in an injected page, so the returned promise never settles:
   * the message stays at `mediaStage=UPLOADING` with no HTTP request and no
   * error, and any send queued behind it stalls too.
   *
   * Forcing the prop off selects WAWebUploadManagerMainThread, which uploads
   * normally. Text sending is not affected either way.
   */
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    return forceMediaUploadMainThread(func, ...args);
  });
}

function applyPatchModel() {
  const funcs: {
    [key: string]: (...args: any[]) => any;
  } = {
    shouldAppearInList: functions.getShouldAppearInList,
    isUser: (chat: ChatModel) => chat.id.isUser(),
    isPSA: (chat: ChatModel) => chat.id.isPSA(),
    isGroup: (chat: ChatModel) => chat.id.isGroup(),
    isNewsletter: (chat: ChatModel) => chat.id.isNewsletter(),
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
