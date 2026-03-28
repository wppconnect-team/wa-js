/*!
 * Copyright 2026 WPPConnect Team
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

import { z } from 'zod';

import { assertWid } from '../../assert';
import * as Chat from '../../chat';
import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import * as webpack from '../../webpack';
import { MsgKey } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createMsgProtobuf,
  encryptAndSendMsg,
  encryptAndSendStatusMsg,
  getABPropConfigValue,
  primaryFeatureEnabled,
  randomHex,
} from '../../whatsapp/functions';
import { postSendStatus } from './postSendStatus';

const statusSendRawStatusSchema = z.object({
  message: z.custom<Chat.RawMessage>(),
  waitForAck: z.boolean().default(true),
  messageId: z.any().optional(),
  caption: z.string().optional(),
});

export type StatusSendRawStatusInput = z.infer<
  typeof statusSendRawStatusSchema
>;

export type StatusSendRawStatusOutput = Chat.SendMessageReturn;

export async function sendRawStatus(
  params: StatusSendRawStatusInput
): Promise<StatusSendRawStatusOutput> {
  const {
    message,
    waitForAck,
    messageId: userMessageId,
    caption,
  } = statusSendRawStatusSchema.parse(params);

  const me = getMyUserWid();

  const messageId =
    userMessageId ??
    new MsgKey({
      fromMe: true,
      id: randomHex(16),
      participant: me,
      remote: assertWid('status@broadcast'),
    });

  message.author = me;
  // caption is not in the protobuf, but whatsapp web accepts it as a custom property
  (message as any).caption = caption;

  const result = await Chat.sendRawMessage({
    chatId: 'status@broadcast',
    rawMessage: message,
    options: {
      waitForAck,
      messageId,
    },
  });

  postSendStatus({ result });

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
      } catch (_error) {
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
