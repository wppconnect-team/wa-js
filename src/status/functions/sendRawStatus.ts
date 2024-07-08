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

import { assertWid } from '../../assert';
import * as Chat from '../../chat';
import * as webpack from '../../webpack';
import { MsgKey, UserPrefs } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createMsgProtobuf,
  encryptAndSendMsg,
  encryptAndSendStatusMsg,
  getABPropConfigValue,
  primaryFeatureEnabled,
  randomHex,
} from '../../whatsapp/functions';
import { defaultSendStatusOptions } from '..';
import { postSendStatus } from './postSendStatus';

export interface SendStatusOptions {
  waitForAck?: boolean;
  // Only for text status
  messageId?: string | MsgKey;
  // Only image and video status
  caption?: string;
}

export async function sendRawStatus(
  message: Chat.RawMessage,
  options: SendStatusOptions = {}
) {
  const messageId = new MsgKey({
    fromMe: true,
    id: randomHex(16),
    participant: UserPrefs.getMaybeMeUser(),
    remote: assertWid('status@broadcast'),
  });

  options = {
    ...defaultSendStatusOptions,
    messageId,
    ...options,
  };

  message.author = UserPrefs.getMaybeMeUser();

  const result = await Chat.sendRawMessage('status@broadcast', message, {
    ...options,
    createChat: true,
  });

  postSendStatus(result);

  return result;
}

webpack.onInjected(() => {
  // allow to send backgroundColor, textColor and font for status
  wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
    const [msg] = args;

    const result = func(...args);

    if (result.extendedTextMessage) {
      if (typeof msg.backgroundColor === 'number') {
        result.extendedTextMessage.backgroundArgb = msg.backgroundColor;
      }
      if (typeof msg.textColor === 'number') {
        result.extendedTextMessage.textArgb = msg.textColor;
      }
      if (typeof msg.font === 'number') {
        result.extendedTextMessage.font = msg.font;
      }

      result.extendedTextMessage.inviteLinkGroupTypeV2 = 0;
      result.extendedTextMessage.previewType = 0;
    }

    return result;
  });

  // Force to send as group for broadcast list
  wrapModuleFunction(encryptAndSendMsg, async (func, ...args) => {
    const [msg, perf] = args;
    if (msg.data.to?.toString() == 'status@broadcast') {
      const proto = createMsgProtobuf(msg.data);
      try {
        await encryptAndSendStatusMsg(msg as any, proto, perf);
        return {
          t: msg.data.t,
          sync: null,
          phash: null,
          addressingMode: null,
          count: null,
          error: null,
        };
      } catch (error) {
        return null;
      }
    }
    return await func(...args);
  });
});

webpack.onFullReady(() => {
  // Force to load buttons and post status in whatsapp web
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'web_status_posting_enabled':
        return 1;
      case 'post_status_in_companion':
        return 1;
    }
    return func(...args);
  });

  wrapModuleFunction(primaryFeatureEnabled, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'post_status_in_companion':
        return true;
      case 'text_status_creation_support':
        return true;
    }
    return func(...args);
  });
});
