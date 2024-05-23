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
import { WPPError } from '../../util';
import { MsgModel } from '../../whatsapp';
import { ACK } from '../../whatsapp/enums';
import {
  addAndSendMessageEdit,
  addAndSendMsgToChat,
  addNewsletterMsgsRecords,
  msgDataFromMsgModel,
  sendNewsletterMessageJob,
  updateNewsletterMsgRecord,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { getMessageById, markIsRead, prepareRawMessage } from '.';

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
    // Try to mark is read and ignore errors
    await markIsRead(chat.id).catch(() => null);
  }

  debug(`sending message (${rawMessage.type}) with id ${rawMessage.id}`);
  let result = null as any;
  if (chat?.isNewsletter && rawMessage.type) {
    const validTypes = ['chat', 'image', 'video', 'poll_creation'];
    if (!validTypes.includes(rawMessage.type))
      throw new WPPError(
        'type_not_valid_for_newsletter',
        'Please, send a valid type for send message to newsletter. Valid types: "chat", "image", "video", "poll_creation"'
      );
    const msg = new MsgModel(rawMessage as any);
    await addNewsletterMsgsRecords([await msgDataFromMsgModel(msg)]);
    const resultNewsletter = await sendNewsletterMessageJob({
      type:
        rawMessage.type == 'chat' && !rawMessage.editMsgType
          ? 'text'
          : rawMessage.type == 'poll_creation'
            ? 'pollCreation'
            : 'media',
      msgData: rawMessage,
      msg: new MsgModel(rawMessage as any),
      newsletterJid: chat.id.toString(),
    });
    chat.msgs.add(msg);

    if (resultNewsletter.success) {
      msg.t = resultNewsletter.ack.t;
      msg.serverId = resultNewsletter.serverId;
    }
    msg.updateAck(ACK.SENT, true);
    await updateNewsletterMsgRecord(msg);
    result = [msg, 'OK'];
  } else if (
    rawMessage.type === 'protocol' &&
    rawMessage.subtype === 'message_edit'
  ) {
    const msg = await getMessageById(rawMessage.protocolMessageKey);
    await addAndSendMessageEdit(msg, rawMessage);
    result = [await getMessageById(rawMessage.protocolMessageKey), null];
  } else {
    result = await addAndSendMsgToChat(chat, rawMessage);
  }
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
    ...(message.latestEditMsgKey && {
      id_latestEditMsgKey: message.latestEditMsgKey._serialized,
    }),
    sendMsgResult: result[1]!,
  };
}
