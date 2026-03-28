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

import { assertFindChat } from '../../assert';
import { getAnnouncementGroup } from '../../community';
import { WPPError } from '../../util';
import { GroupMetadataStore, MsgModel } from '../../whatsapp';
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
  sendMessageOptionsSchema,
  SendMessageReturn,
  SendMsgResultObject,
} from '..';
import { getMessageById, markIsRead, prepareRawMessage } from '.';

const debug = Debug('WA-JS:message');

const chatSendRawMessageSchema = z.object({
  chatId: z.string(),
  rawMessage: z.custom<RawMessage>(),
  options: sendMessageOptionsSchema.optional(),
});
export type ChatSendRawMessageInput = z.infer<typeof chatSendRawMessageSchema>;
export type ChatSendRawMessageOutput = SendMessageReturn;

/**
 * Send a raw message
 *
 * @category Message
 */
export async function sendRawMessage(
  params: ChatSendRawMessageInput
): Promise<ChatSendRawMessageOutput> {
  const {
    chatId,
    rawMessage: rawMsg,
    options: opts = {},
  } = chatSendRawMessageSchema.parse(params);
  const options: SendMessageOptions = {
    ...defaultSendMessageOptions,
    ...opts,
  };

  // Always use assertFindChat to properly handle @lid chats and other cases
  const chat = await assertFindChat(chatId);

  /**
   * When the group is groupType 'COMMUNITY', its a instance of a group created, you can
   * not send message for this grouptype. You only can send message for linked announcement groups
   */
  if (chat.id.isGroup() && chat.isParentGroup) {
    const groupData = GroupMetadataStore.get(chat.id?.toString());
    if (groupData?.groupType == 'COMMUNITY') {
      const announceGroup = getAnnouncementGroup({
        communityId: groupData.id._serialized,
      });
      throw new WPPError(
        'can_not_send_message_to_this_groupType',
        `You can not send message to this groupType 'COMMUNITY', send for Announcement Group. Correct announcement groupId: ${announceGroup?.toString()}`
      );
    }
  }

  const rawMessage = await prepareRawMessage({
    chat,
    message: rawMsg,
    options,
  });

  if (options.markIsRead) {
    debug(`marking chat is read before send message`);
    // Try to mark is read and ignore errors
    await markIsRead({ chatId: chat.id._serialized }).catch(() => null);
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
    const msg = await getMessageById({
      id: rawMessage.protocolMessageKey,
    });
    await addAndSendMessageEdit(msg, rawMessage);
    result = [
      (await getMessageById({ id: rawMessage.protocolMessageKey })) as MsgModel,
      null,
    ];
  } else {
    result = await addAndSendMsgToChat(chat, rawMessage);
  }

  debug(`message ${rawMessage.id} queued`);

  const message = await result[0];

  let sendMsgResult: SendMsgResultObject | null = null;

  if (options.waitForAck) {
    debug(`waiting ack for ${rawMessage.id}`);

    if (result[1]) {
      sendMsgResult = await result[1];
    }

    debug(
      `ack received for ${rawMessage.id} (ACK: ${message.ack}, SendResult: ${sendMsgResult?.messageSendResult})`
    );
  }

  return {
    id: message.id.toString(),
    ack: message.ack!,
    ...(message.latestEditMsgKey && {
      latestEditMsgKey: message.latestEditMsgKey,
    }),
    ...(message.from && {
      from: message.from.toString(),
    }),
    ...(chat && {
      to: chat.id.toString(),
    }),
    sendMsgResult: sendMsgResult!,
  };
}
