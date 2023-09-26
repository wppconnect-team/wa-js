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
import { Wid } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { updateDBForGroupAction } from '../../whatsapp/functions';

webpack.onFullReady(register);

function register() {
  const eventTypes = ['add', 'remove', 'demote', 'promote'];

  wrapModuleFunction(updateDBForGroupAction, (func, ...args) => {
    const [meta, action] = args;

    let actionType = action.actionType || action.action;
    if (eventTypes.includes(actionType)) {
      queueMicrotask(() => {
        const participants: Wid[] = action.participants.map((p) => {
          if ('id' in p) {
            return p.id;
          }
          return p;
        });

        if (
          actionType === 'add' &&
          (action.isInvite || action.reason === 'invite')
        ) {
          actionType = 'join';
        } else if (
          actionType === 'remove' &&
          participants.some((p) => p.equals(meta.author))
        ) {
          actionType = 'leave';
        }

        internalEv.emit('group.participant_changed', {
          author: meta.author?.toString(),
          authorPushName: meta.pushname,
          groupId: meta.chatId.toString(),
          action: actionType as any,
          operation: (action.actionType || action.action) as any,
          participants: participants.map((p) => p.toString()),
        });
      });
    }
    return func(...args);
  });
}
