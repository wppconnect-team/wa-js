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

import Debug from 'debug';
import { z } from 'zod';

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';
import { MsgKey, MsgModel, MsgStore, StatusV3Store } from '../../whatsapp';
import { getSearchContext } from '../../whatsapp/functions';

const debug = Debug('WA-JS:message:getMessageById');

const chatGetMessageByIdSchema = z.object({
  id: z.string(),
});
export type ChatGetMessageByIdInput = z.infer<typeof chatGetMessageByIdSchema>;
export type ChatGetMessageByIdOutput = MsgModel;

/**
 * Get message by ID
 *
 * @example
 * ```javascript
 * WPP.chat.getMessageById({ id: 'true_[number]@c.us_ABCDEF' });
 * ```
 *
 * @category Message
 * @return  {Promise<MsgModel>} Raw message
 */
export async function getMessageById(
  params: ChatGetMessageByIdInput
): Promise<ChatGetMessageByIdOutput> {
  const { id } = chatGetMessageByIdSchema.parse(params);

  const msgKey = MsgKey.fromString(id);

  let msg = MsgStore.get(msgKey);

  const isStatus =
    typeof msgKey.remote?.isStatusV3 == 'function'
      ? msgKey.remote?.isStatusV3()
      : msgKey.remote?.toString()?.includes('status@broadcast');

  if (!msg) {
    if (isStatus) {
      msg = StatusV3Store.getMyStatus().msgs.get(msgKey);
    } else {
      const chat = assertGetChat(msgKey.remote);
      msg = chat.msgs.get(msgKey);

      if (!msg) {
        debug(`searching remote message with id ${msgKey._serialized}`);
        const result = getSearchContext(chat, msgKey);
        await result.collection.loadAroundPromise;

        msg = chat.msgs.get(msgKey) || result.collection.get(msgKey);
      }
    }
  }

  if (!msg) {
    debug(`message id ${msgKey._serialized} not found`);
    throw new WPPError(
      'msg_not_found',
      `Message ${msgKey._serialized} not found`,
      {
        id: msgKey._serialized,
      }
    );
  }

  if (msg instanceof MsgModel) {
    return msg;
  }
  return MsgStore.get(msg) || new MsgModel(msg);
}
