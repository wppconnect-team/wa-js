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

const reactions: string[] = [];

function register() {
  wrapModuleFunction(createOrUpdateReactions, (func, ...args) => {
    const [data]: any = args;
    const now = Date.now();
    if (Array.isArray(data)) {
      for (const d of data) {
        try {
          if ((d as any).t < now) {
            continue;
          }
          internalEv.emitAsync('chat.new_reaction', {
            id: MsgKey.fromString((d as any).id),
            orphan: d.orphan,
            orphanReason: d.orphanReason,
            msgId: MsgKey.fromString((d as any).reactionParentKey),
            reactionText: d.reactionText,
            read: d.read,
            sender: createWid((d as any).from)!,
            timestamp: (d as any).t,
          });
        } catch (error) {}
      }
    } else {
      try {
        const inNewReaction = (args as any)[1];
        if (inNewReaction) {
          if (reactions[data.msgKey]) return func(...args);
          reactions[data.msgKey] = data;

          internalEv.emitAsync('chat.new_reaction', {
            id: MsgKey.fromString(data.msgKey),
            orphan: data.orphan,
            orphanReason: null,
            msgId: MsgKey.fromString(data.parentMsgKey),
            reactionText: data.reactionText,
            read: data.read,
            sender: createWid(data.senderUserJid)!,
            timestamp: data.t,
          });
          setTimeout(() => {
            delete reactions[data.msgKey];
          }, 10000);
        }
      } catch (error) {}
    }

    return func(...args);
  });
}
