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
import { createWid } from '../../util';
import * as webpack from '../../webpack';
import { MsgKey } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { createOrUpdateReactions } from '../../whatsapp/functions';

webpack.onFullReady(register);

function register() {
  wrapModuleFunction(createOrUpdateReactions, (func, ...args) => {
    const [data] = args;

    for (const d of data) {
      try {
        internalEv.emitAsync('chat.new_reaction', {
          id: MsgKey.fromString(d.msgKey),
          orphan: d.orphan,
          orphanReason: d.orphanReason,
          msgId: MsgKey.fromString(d.parentMsgKey),
          reactionText: d.reactionText,
          read: d.read,
          sender: createWid(d.senderUserJid)!,
          timestamp: d.timestamp,
        });
      } catch (error) {}
    }

    return func(...args);
  });
}
