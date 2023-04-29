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
import { ChatStore, MsgKey, MsgModel, MsgStore } from '../../whatsapp';
import { getQuotedMsg } from '../functions/';

webpack.onInjected(() => register());

function register() {
  MsgStore.on('add', (msg: MsgModel) => {
    if (msg.isNewMsg) {
      queueMicrotask(async () => {
        msg = await addAttributesMsg(msg);
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

  if (typeof MsgModel.prototype.chat === 'undefined') {
    Object.defineProperty(MsgModel.prototype, 'chat', {
      get: function () {
        return ChatStore.get(this.id.fromMe ? this.to : this.from);
      },
      configurable: true,
    });
  }

  if (typeof MsgModel.prototype.isGroupMsg === 'undefined') {
    Object.defineProperty(MsgModel.prototype, 'isGroupMsg', {
      get: function () {
        return this?.chat?.isGroup;
      },
      configurable: true,
    });
  }

  if (typeof MsgModel.prototype.quotedMsgId === 'undefined') {
    Object.defineProperty(MsgModel.prototype, 'quotedMsgId', {
      get: function () {
        const quotedMsgId = new MsgKey({
          id: this.quotedStanzaID,
          fromMe: getMyUserId()?.equals(this.quotedParticipant) || false,
          remote: this.quotedRemoteJid ? this.quotedRemoteJid : this.id.remote,
          participant: this.isGroupMsg ? this.quotedParticipant : undefined,
        });

        return quotedMsgId;
      },
      configurable: true,
    });
  }
}

async function addAttributesMsg(msg: any): Promise<MsgModel> {
  /**
   * @todo, remove this
   */
  if (!(typeof msg.quotedStanzaID === 'undefined')) {
    const replyMsg = await getQuotedMsg(msg.id);
    Object.defineProperties(msg, {
      _quotedMsgObj: {
        value: replyMsg,
        writable: false,
      },
    });
  }
  return msg;
}
