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
import { ChatStore, MsgModel, MsgStore, Wid } from '../../whatsapp';
import { getQuotedMsg } from '../functions/';

webpack.onInjected(() => register());

function register() {
  MsgStore.on('add', async (msg: MsgModel) => {
    if (msg.isNewMsg) {
      msg = await addAttributesMsg(msg);
      queueMicrotask(() => {
        if (msg.type === 'ciphertext') {
          msg.once('change:type', () => {
            queueMicrotask(() => {
              internalEv.emit('chat.new_message', msg);
            });
          });
        }

        internalEv.emit('chat.new_message', msg);
      });
    }
  });
}

async function addAttributesMsg(msg: any): Promise<MsgModel> {
  if (typeof msg.chat === 'undefined')
    msg.chat = ChatStore.get(msg.from as Wid);
  msg.isGroupMsg = msg.isGroupMsg || msg?.chat?.isGroup;

  if (!(typeof msg.quotedStanzaID === 'undefined')) {
    const replyMsg = await getQuotedMsg(msg.id);
    msg._quotedMsgObj = replyMsg;
    msg.quotedMsgId = replyMsg.id;
  }
  return msg;
}
