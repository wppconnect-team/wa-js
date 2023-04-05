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

import { getMyUserId } from '../../conn';
import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { ChatStore, MsgKey, MsgModel, MsgStore, Wid } from '../../whatsapp';
import { getMessageById } from '../functions';

webpack.onInjected(() => register());

function register() {
  MsgStore.on('add', async (msg: MsgModel) => {
    if (msg.isNewMsg) {
      if (msg.quotedStanzaID && !msg.quotedMsgObj) {
        msg.quotedMsgId = new MsgKey({
          id: msg.quotedStanzaID,
          fromMe:
            msg.quotedParticipant?._serialized === getMyUserId()?._serialized,
          remote: msg.quotedRemoteJid ? msg.quotedRemoteJid : msg.id.remote,
          participant: msg.isGroupMsg ? msg.quotedParticipant : undefined,
        });
        (msg as any).quotedMsgObj = await getMessageById(msg.quotedMsgId);
      }
      if (!msg.chat) {
        (msg as any).chat = ChatStore.get(msg.from as Wid);
      }

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
