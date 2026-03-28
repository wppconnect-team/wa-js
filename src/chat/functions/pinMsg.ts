/*!
 * Copyright 2024 WPPConnect Team
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

import { z } from 'zod';

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';
import { MsgModel, PinInChatStore } from '../../whatsapp';
import {
  ACK,
  MSG_TYPE,
  PIN_STATE,
  PinExpiryDurationOption,
  SendMsgResult,
} from '../../whatsapp/enums';
import { sendPinInChatMsg } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

const chatPinMsgSchema = z.object({
  msgId: z.string(),
  pin: z.boolean().optional(),
  duration: z
    .enum(PinExpiryDurationOption)
    .default(PinExpiryDurationOption.SevenDays)
    .optional(),
});
export type ChatPinMsgInput = z.infer<typeof chatPinMsgSchema>;
export type ChatPinMsgOutput = {
  message: MsgModel;
  pinned: boolean;
  result: SendMsgResult;
};

/**
 * Pin a message in chat
 *
 * @param msgId - Message ID to pin/unpin
 * @param pin - True to pin, false to unpin
 * @param duration - Pin duration option. Use PinExpiryDurationOption enum for precise control.
 *
 * @since 3.18.9 - BREAKING CHANGE: The `seconds` parameter (number) has been replaced with `PinExpiryDurationOption` enum.
 * For backward compatibility, numbers are still accepted but will ALWAYS default to 7 days,
 * regardless of the value passed. Use `PinExpiryDurationOption` enum for precise duration control.
 *
 * @example
 * ```javascript
 * // Pin a message in chat with default duration (7 days)
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF');
 *
 * // Pin a message in chat for 30 days (RECOMMENDED)
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', true, WPP.whatsapp.PinExpiryDurationOption.ThirtyDays);
 *
 * // Pin a message in chat for 1 day
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', true, WPP.whatsapp.PinExpiryDurationOption.OneDay);
 *
 * // DEPRECATED: Passing numbers (always results in 7 days)
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', true, 2592000); // Ignored, defaults to 7 days
 *
 * // Unpin a message
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', false);
 * // or
 * WPP.chat.unpinMsg('true_[number]@c.us_ABCDEF');
 * ```
 * @category Chat
 */
export async function pinMsg(
  params: ChatPinMsgInput
): Promise<ChatPinMsgOutput> {
  const { msgId, pin = true, duration } = chatPinMsgSchema.parse(params);

  const msg = await getMessageById({ id: msgId });
  const chat = assertGetChat(msg.id.remote);
  const pinned = PinInChatStore.getByParentMsgKey(msg.id);

  if (chat.id.isNewsletter()) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The msg ${msgId.toString()} was not pinned. Not can pin in Newsletter`,
      { msgId, pin }
    );
  } else if (
    chat.id.isGroup() &&
    !chat.groupMetadata?.participants?.iAmMember()
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `You not a member of group, to pin msg ${msgId.toString()}`,
      { msgId, pin }
    );
  } else if (
    chat.id.isGroup() &&
    (chat.groupMetadata?.restrict || chat.groupMetadata?.announce) &&
    !chat.groupMetadata?.participants.iAmAdmin()
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `You not have permission to pin msg ${msgId.toString()}`,
      { msgId, pin }
    );
  } else if (
    msg.isNotification ||
    msg.isViewOnce ||
    msg.type === MSG_TYPE.REVOKED ||
    (msg?.ack || 0) < ACK.SENT
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The msg ${msgId.toString()} not can be pinned`,
      { msgId, pin }
    );
  } else if (
    pinned &&
    pinned.pinType === (pin ? PIN_STATE.PIN : PIN_STATE.UNPIN)
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The msg ${msgId.toString()} is already ${pin ? 'pinned' : 'unpinned'}`,
      { msgId, pin }
    );
  }

  const pinExpiryOption = pin ? duration : undefined;

  const result = await sendPinInChatMsg(
    msg,
    pin === true ? PIN_STATE.PIN : PIN_STATE.UNPIN,
    pinExpiryOption
  );

  if (!result) {
    throw new WPPError(
      'pin_send_error',
      `Failed to ${pin ? 'pin' : 'unpin'} message ${msgId.toString()}`,
      { msgId, pin }
    );
  }

  return {
    message: msg,
    pinned: result.messageSendResult === SendMsgResult.OK ? pin : !pin,
    result: result.messageSendResult,
  };
}

/**
 * Unpin a message in chat
 *
 * @alias pin
 *
 * @example
 * ```javascript
 * // Unpin a message
 * WPP.chat.unpinMsg('true_[number]@c.us_ABCDEF');
 *
 * // Alias for
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', false);
 * ```
 * @category Chat
 */
export async function unpinMsg(msgId: string) {
  return pinMsg({ msgId, pin: false });
}
