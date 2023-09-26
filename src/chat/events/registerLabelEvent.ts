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

import { isMainReady } from '../../conn';
import { internalEv } from '../../eventEmitter';
import { getLabelById, Label } from '../../labels';
import * as webpack from '../../webpack';
import { ChatModel } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  addToLabelCollection,
  removeLabelFromCollection,
} from '../../whatsapp/functions';
import { get as getChat } from '../functions/';

webpack.onFullReady(register);

function register() {
  async function processLabelEvent(event: 'add' | 'remove', ...args: any) {
    const data = args[0];
    const ids = Array.isArray(data[1]) ? data[1] : [data[1]];
    const chatId = data[0];

    if (isMainReady()) {
      const labels = [] as Label[];
      for (const id of ids) {
        labels.push(await getLabelById(id));
      }
      internalEv.emit('chat.update_label', {
        chat: getChat(chatId) as ChatModel,
        ids: ids,
        labels: labels,
        type: event,
      });
    }
  }

  wrapModuleFunction(addToLabelCollection, async (func, ...args) => {
    queueMicrotask(() => {
      processLabelEvent('add', args);
    });
    return func(...args);
  });

  wrapModuleFunction(removeLabelFromCollection, async (func, ...args) => {
    queueMicrotask(() => {
      processLabelEvent('remove', args);
    });
    return func(...args);
  });
}
