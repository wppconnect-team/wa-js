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

import * as util from '../util';
import {
  ChatModel,
  ChatStore,
  ClockSkew,
  Constants,
  ModelPropertiesContructor,
  MsgKey,
  MsgModel,
  UserPrefs,
} from '../whatsapp';
import { addAndSendMsgToChat, randomMessageId } from '../whatsapp/functions';

export function get(chatId: string): ChatModel | undefined {
  const wid = util.createWid(chatId);

  if (!wid) {
    throw 'invalid id';
  }

  return ChatStore.get(wid);
}

export async function sendMessage(
  chatId: any,
  content: any,
  options = {}
): Promise<any> {
  console.log(options);

  const chat = get(chatId);

  if (!chat) {
    return null;
  }

  const newMsgId = new MsgKey({
    from: UserPrefs.getMaybeMeUser(),
    to: chat.id,
    id: randomMessageId(),
    selfDir: 'out',
  });

  const message: ModelPropertiesContructor<MsgModel, 'id'> = {
    id: newMsgId,
    body: content,
    type: 'chat',
    subtype: null,
    t: ClockSkew.globalUnixTime(),
    from: UserPrefs.getMaybeMeUser(),
    to: chat.id,
    self: 'out',
    isNewMsg: true,
    local: true,
    ack: Constants.ACK.CLOCK,
    urlText: null,
    urlNumber: null,
  };

  const result = await addAndSendMsgToChat(chat, message);

  return result;
}
