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

import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { MsgKey, MsgModel, MsgStore, UserPrefs, Wid } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  handleChatSimpleReceipt,
  handleGroupSimpleReceipt,
  handleStatusSimpleReceipt,
  SimpleAckData,
} from '../../whatsapp/functions';

webpack.onFullReady(registerAckMessageEvent);

function registerAckMessageEvent() {
  MsgStore.on('change:ack', (msg: MsgModel) => {
    if (msg.ack === 1) {
      queueMicrotask(() => {
        internalEv.emit('chat.msg_ack_change', {
          ack: msg.ack!,
          chat: msg.to!,
          ids: [msg.id],
        });
      });
    }
  });

  function processSimpleACK(ackData: SimpleAckData) {
    if (ackData.ack < 2 || ackData.ackString === 'sender') {
      return;
    }
    const chatId: Wid = ackData.from;
    const sender: Wid | undefined = ackData.participant || undefined;

    const remote = ackData.from;
    const fromMe =
      !ackData.recipient || UserPrefs.getMeUser().equals(ackData.recipient);

    // Ignore non my messages ACK events
    if (!fromMe) {
      return;
    }

    const keys = ackData.externalIds.map(
      (id) =>
        new MsgKey({
          id,
          remote,
          fromMe,
          participant: ackData.participant,
        })
    );

    internalEv.emit('chat.msg_ack_change', {
      ack: ackData.ack,
      chat: chatId,
      sender: sender,
      ids: keys,
    });
  }

  wrapModuleFunction(handleChatSimpleReceipt, (func, ...args) => {
    const [ackData] = args;
    queueMicrotask(() => {
      processSimpleACK(ackData);
    });
    return func(...args);
  });
  wrapModuleFunction(handleGroupSimpleReceipt, (func, ...args) => {
    const [ackData] = args;
    queueMicrotask(() => {
      processSimpleACK(ackData);
    });
    return func(...args);
  });
  wrapModuleFunction(handleStatusSimpleReceipt, (func, ...args) => {
    const [ackData] = args;
    queueMicrotask(() => {
      processSimpleACK(ackData);
    });
    return func(...args);
  });
}
