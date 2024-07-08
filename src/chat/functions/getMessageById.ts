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

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';
import { MsgKey, MsgModel, MsgStore, StatusV3Store } from '../../whatsapp';
import { getSearchContext } from '../../whatsapp/functions';

const debug = Debug('WA-JS:message:getMessageById');

/**
 * Get message by a single ID or array of IDs
 *
 * @example
 * ```javascript
 * // Single message
 * WPP.chat.getMessageById('true_[number]@c.us_ABCDEF');
 *
 * // List of messages
 * WPP.chat.getMessageById(['true_[number]@c.us_ABCDEF', 'false_[number]@c.us_789456']);
 * ```
 *
 * @category Message
 * @return  {Promise<MsgModel> | Promise<MsgModel[]>} List of raw messages
 */
export async function getMessageById(id: string | MsgKey): Promise<MsgModel>;
export async function getMessageById(
  ids: (string | MsgKey)[]
): Promise<MsgModel[]>;
export async function getMessageById(
  ids: string | MsgKey | (string | MsgKey)[]
): Promise<MsgModel | MsgModel[]> {
  let isSingle = false;

  if (!Array.isArray(ids)) {
    isSingle = true;
    ids = [ids];
  }

  const msgsKeys = ids.map((id) => MsgKey.fromString(id.toString()));

  let msgs: MsgModel[] = [];
  for (const msgKey of msgsKeys) {
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
          debug(`searching remote message with id ${msgKey.toString()}`);
          const result = getSearchContext(chat, msgKey);
          await result.collection.loadAroundPromise;

          msg = chat.msgs.get(msgKey) || result.collection.get(msgKey);
        }
      }
    }

    if (!msg) {
      debug(`message id ${msgKey.toString()} not found`);
      throw new WPPError(
        'msg_not_found',
        `Message ${msgKey.toString()} not found`,
        {
          id: msgKey.toString(),
        }
      );
    }

    msgs.push(msg);
  }

  msgs = msgs.map((m: any) => {
    if (m instanceof MsgModel) {
      return m;
    }
    return MsgStore.get(m) || new MsgModel(m);
  });

  if (isSingle) {
    return msgs[0];
  }
  return msgs;
}
