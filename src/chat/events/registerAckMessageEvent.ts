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
import { MsgKey, MsgModel, MsgStore, Wid } from '../../whatsapp';

webpack.onInjected(() => registerAckMessageEvent());

function processACK(e: any) {
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

  internalEv.emit('chat.msg_ack_change', {
    ack: e.ack,
    chat: chatId,
    sender: sender,
    ids: keys,
  });
}

function registerAckMessageEvent() {
  MsgStore.on('change:ack', (msg: MsgModel) => {
    if (msg.ack === 1) {
      internalEv.emit('chat.msg_ack_change', {
        ack: msg.ack,
        chat: msg.to!,
        ids: [msg.id],
      });
    }
  });

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
