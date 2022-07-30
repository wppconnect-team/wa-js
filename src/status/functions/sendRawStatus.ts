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
import {
  ChatStore,
  ContactStore,
  MsgKey,
  ParticipantModel,
  UserPrefs,
  WidFactory,
} from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createMsgProtobuf,
  encryptAndSendGroupMsg,
  encryptAndSendMsg,
  markForgetSenderKey,
  randomHex,
  updateParticipants,
} from '../../whatsapp/functions';
import { defaultSendStatusOptions } from '..';

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

  const result = await Chat.sendRawMessage('status@broadcast', message, {
    ...options,
    createChat: true,
  });

  result.sendMsgResult.then(() => {
    ChatStore.resyncMessages();
  });

  return result;
}

let isForgot = false;

async function updateStatusGroup() {
  const myContacts = ContactStore.getModelsArray()
    .filter((c) => c.isMyContact && !c.isContactBlocked)
    .filter((c) => c.notifyName && !c.isMe)
    .map((c) => c.id);

  myContacts.push(UserPrefs.getMaybeMeUser());

  const participants = myContacts.map(
    (id) =>
      new ParticipantModel({
        id,
        isAdmin: false,
        isSuperAdmin: false,
      })
  );

  const group = WidFactory.createWid('status@broadcast');

  await updateParticipants({
    group,
    participants,
    version: Date.now(),
    isOffline: false,
  });

  if (!isForgot) {
    isForgot = true;

    await markForgetSenderKey(group, myContacts);
  }
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

      result.inviteLinkGroupTypeV2 = 0;
      result.previewType = 0;
    }

    return result;
  });

  // Force to send as group for broadcast list
  wrapModuleFunction(encryptAndSendMsg, async (func, ...args) => {
    const [msg] = args;

    try {
      return await func(...args);
    } catch (error: any) {
      if (
        !msg.to?.isStatusV3() ||
        error.message !== '[messaging] unsupported remote jid type'
      ) {
        throw error;
      }

      await updateStatusGroup();

      let c;
      if (msg.asMms) {
        const t = msg.isUnsentPhoneMsg();
        c = t ? { type: msg.type } : msg.avParams();
      }

      const proto = createMsgProtobuf(msg, c || {});

      return await encryptAndSendGroupMsg(msg, proto);
    }
  });
});
