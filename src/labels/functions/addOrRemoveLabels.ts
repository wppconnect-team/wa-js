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

import { assertGetChat, assertIsBusiness } from '../../assert';
import { LabelStore, Wid } from '../../whatsapp';

export interface AddOrRemoveLabelsOptions {
  labelId: string;
  type: 'add' | 'remove';
}

/**
 * Add or remove label from chats
 * @example
 * ```javascript
 * await WPP.labels.addOrRemoveLabels(
 *   ['<number>@c.us','<number>@c.us'],
 *   [{labelId:'76', type:'add'},{labelId:'75', type:'remove'}]
 * )
 * ```
 */
export async function addOrRemoveLabels(
  chatIds: string | Wid | (string | Wid)[],
  options: AddOrRemoveLabelsOptions | AddOrRemoveLabelsOptions[]
): Promise<any> {
  assertIsBusiness();

  if (!Array.isArray(chatIds)) {
    chatIds = [chatIds];
  }
  if (!Array.isArray(options)) {
    options = [options];
  }

  const chats = chatIds.map((e) => assertGetChat(e));
  const labels = options.map((e) => {
    return {
      id: e.labelId,
      type: e.type,
    };
  });

  return await LabelStore.addOrRemoveLabels(labels, chats);
}
