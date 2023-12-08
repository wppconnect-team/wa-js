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
import { functions, MsgKey, UserPrefs } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  CHAT_JID,
  createMsgProtobuf,
  encryptAndSendMsg,
  encryptAndSendSenderKeyMsg,
  GROUP_JID,
  randomHex,
} from '../../whatsapp/functions';
import { defaultSendStatusOptions, updateParticipants } from '..';
import { postSendStatus } from './postSendStatus';

export interface SendStatusOptions {
  waitForAck?: boolean;
  messageId?: string | MsgKey;
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

  message.ctwaContext = message.ctwaContext || {};
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
    const [, data] = args;

    try {
      return await func(...args);
    } catch (error: any) {
      const to = data.to;

      if (
        !to?.isStatusV3() ||
        error.message !== '[messaging] unsupported remote jid type'
      ) {
        throw error;
      }

      if (localStorage.getItem('wpp-status-participants') !== 'custom') {
        await updateParticipants();
      }

      const participants = await functions.getParticipants(to);

      if (!participants || participants.participants.length === 0) {
        throw new Error('empty participants for status@broadcast');
      }

      await functions.markForgetSenderKey(
        to,
        participants.participants.map(assertWid)
      );

      args[1].to.server = 'g.us';

      return await func(...args);
    }
  });

  wrapModuleFunction(encryptAndSendSenderKeyMsg, async (func, ...args) => {
    if (args[1].to.user === 'status') {
      args[1].to.server = 'broadcast';
    }

    return await func(...args);
  });

  wrapModuleFunction(GROUP_JID, async (func, ...args) => {
    if (args[0].toString().includes('broadcast')) {
      return await CHAT_JID(...args);
    }
    return await func(...args);
  });
});
