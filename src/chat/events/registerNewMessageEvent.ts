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
import * as loader from '../../loader';
import { ChatStore, MsgModel, MsgStore } from '../../whatsapp';
import { getQuotedMsgObj } from '../../whatsapp/functions';
import { getQuotedMsgKey } from '../functions/';

loader.onInjected(() => register());

function register() {
  // Probe with the `in` operator, never with `typeof prototype.<prop>`:
  // reading the property invokes an accessor with `this` set to the bare
  // prototype. If the getter exists (defined by WhatsApp, or by a previous
  // partial run of this registrar being retried), it throws on a prototype
  // without model data (e.g. `getQuotedMsgKey` -> "Message undefined does not
  // have a reply"), wedging the registrar in a permanent retry loop.
  //
  // The property definitions also run *before* MsgStore.on: they are
  // idempotent, while a repeated `.on` would duplicate 'add' handlers if a
  // retry re-entered this function after the subscription.
  if (!('chat' in MsgModel.prototype)) {
    Object.defineProperty(MsgModel.prototype, 'chat', {
      get: function () {
        return ChatStore.get(this.id?.fromMe ? this.to : this.from);
      },
      configurable: true,
    });
  }

  if (!('isGroupMsg' in MsgModel.prototype)) {
    Object.defineProperty(MsgModel.prototype, 'isGroupMsg', {
      get: function () {
        return this?.chat?.id?.isGroup();
      },
      configurable: true,
    });
  }

  if (!('quotedMsgId' in MsgModel.prototype)) {
    Object.defineProperty(MsgModel.prototype, 'quotedMsgId', {
      get: function () {
        const quotedMsgId = getQuotedMsgKey(this);

        return quotedMsgId;
      },
      configurable: true,
    });
  }

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
}

async function addAttributesMsg(msg: any): Promise<MsgModel> {
  /**
   * @todo, remove this
   */
  if (!(typeof msg.quotedStanzaID === 'undefined')) {
    const quotedMsg = getQuotedMsgObj(msg);
    if (!quotedMsg) return msg;
    Object.defineProperties(msg, {
      _quotedMsgObj: {
        value: quotedMsg,
        writable: false,
      },
      // Fixed quotedMsgId when receive messages from @lid
      quotedMsgId: {
        value: quotedMsg.id,
        writable: false,
      },
    });
  }
  return msg;
}
