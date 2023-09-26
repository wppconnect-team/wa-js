/*!
 * Copyright 2022 WPPConnect Team
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
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { upsertVotes } from '../../whatsapp/functions';
import { getMessageById } from '../functions';

webpack.onFullReady(register);

function register() {
  wrapModuleFunction(upsertVotes, async (func, ...args) => {
    const [data] = args;

    for (const d of data) {
      try {
        const msg = await getMessageById(d.parentMsgKey);
        const selectedOptions: any = [];

        for (const opt of d.selectedOptionLocalIds) {
          selectedOptions[opt] = msg.pollOptions.filter(
            (i: any) => i.localId == opt
          )[0];
        }
        internalEv
          .emitAsync('chat.poll_response', {
            msgId: d.parentMsgKey,
            chatId: d.parentMsgKey.remote,
            selectedOptions: selectedOptions,
            timestamp: d.senderTimestampMs,
            sender: d.sender,
          })
          .catch(() => null);
      } catch (error) {}
    }

    return func(...args);
  });
}
