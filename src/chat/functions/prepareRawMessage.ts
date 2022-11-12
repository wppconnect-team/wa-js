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

import { assertWid } from '../../assert';
import { getParticipants } from '../../group';
import { WPPError } from '../../util';
import { ChatModel, MsgKey, MsgModel, UserPrefs, Wid } from '../../whatsapp';
import { ACK } from '../../whatsapp/enums';
import { canReplyMsg, unixTime } from '../../whatsapp/functions';
import { defaultSendMessageOptions, RawMessage, SendMessageOptions } from '..';
import { generateMessageID, getMessageById } from '.';

/**
 * Prepare a raw message
 * @category Message
 * @internal
 */
export async function prepareRawMessage<T extends RawMessage>(
  chat: ChatModel,
  message: T,
  options: SendMessageOptions = {}
): Promise<T> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  message = {
    t: unixTime(),
    from: UserPrefs.getMaybeMeUser(),
    to: chat.id,
    self: 'out',
    isNewMsg: true,
    local: true,
    ack: ACK.CLOCK,
    ...message,
  };

  if (options.messageId) {
    if (typeof options.messageId === 'string') {
      options.messageId = MsgKey.fromString(options.messageId);
    }

    if (!options.messageId.fromMe) {
      throw new WPPError(
        'message_key_is_not_from_me',
        'Message key is not from me',
        {
          messageId: options.messageId.toString(),
        }
      );
    }

    if (!options.messageId.remote.equals(chat.id)) {
      throw new WPPError(
        'message_key_remote_id_is_not_same_of_chat',
        'Message key remote ID is not same of chat',
        {
          messageId: options.messageId.toString(),
        }
      );
    }

    message.id = options.messageId;
  }

  if (!message.id) {
    message.id = generateMessageID(chat);
  }

  if (options.mentionedList && !Array.isArray(options.mentionedList)) {
    throw new WPPError(
      'mentioned_list_is_not_array',
      'The option mentionedList is not an array',
      {
        mentionedList: options.mentionedList,
      }
    );
  }

  /**
   * Try to detect mentioned list from message
   */
  if (
    options.detectMentioned &&
    chat.isGroup &&
    (!options.mentionedList || !options.mentionedList.length)
  ) {
    const text = message.type === 'chat' ? message.body : message.caption;

    options.mentionedList = options.mentionedList || [];

    const ids = text?.match(/(?<=@)(\d+)\b/g) || [];

    if (ids.length > 0) {
      const participants = (await getParticipants(chat.id)).map((p) =>
        p.id.toString()
      );

      for (const id of ids) {
        const wid = `${id}@c.us`;
        if (!participants.includes(wid)) {
          continue;
        }
        options.mentionedList.push(wid);
      }
    }
  }

  /**
   * Add the metadata for  mentioned list
   */
  if (options.mentionedList) {
    const mentionedList = options.mentionedList.map((m) =>
      m instanceof Wid ? m : assertWid(m)
    );

    for (const m of mentionedList) {
      if (!m.isUser()) {
        throw new WPPError(
          'mentioned_is_not_user',
          'Mentioned is not an user',
          {
            mentionedId: m.toString(),
          }
        );
      }
    }

    message.mentionedJidList = mentionedList;
  }

  /**
   * Quote a message, like a reply message
   */
  if (options.quotedMsg) {
    if (typeof options.quotedMsg === 'string') {
      options.quotedMsg = MsgKey.fromString(options.quotedMsg);
    }
    if (options.quotedMsg instanceof MsgKey) {
      options.quotedMsg = await getMessageById(options.quotedMsg);
    }

    if (!(options.quotedMsg instanceof MsgModel)) {
      throw new WPPError('invalid_quoted_msg', 'Invalid quotedMsg', {
        quotedMsg: options.quotedMsg,
      });
    }

    if (!options.quotedMsg?.isStatusV3 && !canReplyMsg(options.quotedMsg)) {
      throw new WPPError(
        'quoted_msg_can_not_reply',
        'QuotedMsg can not reply',
        {
          quotedMsg: options.quotedMsg,
        }
      );
    }

    message = {
      ...message,
      ...options.quotedMsg.msgContextInfo(chat.id),
    };
  }

  return message;
}
