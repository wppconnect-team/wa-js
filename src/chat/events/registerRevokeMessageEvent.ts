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
import { MsgStore, Wid } from '../../whatsapp';
import { RawMessage } from '..';

webpack.onInjected(() => registerRevokeMessageEvent());

function registerRevokeMessageEvent() {
  /**
   * processMultipleMessages receive all msgs events before the screen processing,
   * so for some events, like revoke, is called here and not in MsgStore,
   * because the message is not in MsgStore
   */
  const processMultipleMessages = MsgStore.processMultipleMessages;

  const revokeTypes = ['revoke', 'sender_revoke', 'admin_revoke'];

  MsgStore.processMultipleMessages = (
    chatId: Wid,
    msgs: RawMessage[],
    ...args: any[]
  ) => {
    return new Promise((resolve, reject) => {
      // try...catch to avoid screen block
      try {
        for (const msg of msgs) {
          if (!msg.isNewMsg) {
            continue;
          }

          if (msg.type === 'protocol' && revokeTypes.includes(msg.subtype!)) {
            internalEv.emit('chat.msg_revoke', {
              author: msg.author,
              from: msg.from!,
              id: msg.id!,
              refId: msg.protocolMessageKey!,
              to: msg.to!,
              type: msg.subtype as any,
            });
          }
        }
      } catch (error) {}

      // Call the original method
      processMultipleMessages
        .call(MsgStore, chatId, msgs, ...args)
        .then(resolve, reject);
    });
  };
}
