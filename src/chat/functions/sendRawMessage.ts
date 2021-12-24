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

import { assertFindChat, assertGetChat } from '../../assert';
import { addAndSendMsgToChat } from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { markIsRead, prepareRawMessage } from '.';

const debug = Debug('WA-JS:message');

/**
 * Send a raw message
 *
 * @category Message
 */
export async function sendRawMessage(
  chatId: any,
  rawMessage: RawMessage,
  options: SendMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const chat = options.createChat
    ? await assertFindChat(chatId)
    : assertGetChat(chatId);

  rawMessage = await prepareRawMessage(chat, rawMessage, options);

  if (options.markIsRead) {
    debug(`marking chat is read before send message`);
    await markIsRead(chat.id);
  }

  debug(`sending message (${rawMessage.type}) with id ${rawMessage.id}`);
  const result = await addAndSendMsgToChat(chat, rawMessage);
  debug(`message ${rawMessage.id} queued`);

  const message = await result[0];

  if (options.waitForAck) {
    debug(`waiting ack for ${rawMessage.id}`);

    const sendResult = await result[1];

    debug(
      `ack received for ${rawMessage.id} (ACK: ${message.ack}, SendResult: ${sendResult})`
    );
  }

  return {
    id: message.id.toString(),
    ack: message.ack!,
    sendMsgResult: result[1]!,
  };
}
