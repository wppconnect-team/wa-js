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

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';
import { MsgKey, MsgModel, PinInChatStore } from '../../whatsapp';
import { ACK, MSG_TYPE, PIN_STATE, SendMsgResult } from '../../whatsapp/enums';
import { sendPinInChatMsg } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

/**
 * Pin a message in chat
 *
 * @example
 * ```javascript
 * // Pin a message in chat
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF');
 *
 * // Pin a message in chat for 30 days
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', 2592000);
 *
 * // Unpin a message
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', false);
 * // or
 * WPP.chat.unpinMsg('true_[number]@c.us_ABCDEF');
 * ```
 * @category Chat
 */
export async function pinMsg(
  msgId: string | MsgKey,
  pin = true,
  seconds = 604800 // default 7 days
): Promise<{ message: MsgModel; pinned: boolean; result: SendMsgResult }> {
  const msg = await getMessageById(msgId);
  const chat = assertGetChat(msg.id.remote);
  const pinned = PinInChatStore.getByParentMsgKey(msg.id);

  if (chat.isNewsletter) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The msg ${msgId.toString()} was not pinned. Not can pin in Newsletter`,
      { msgId, pin: pin }
    );
  } else if (chat.isGroup && !chat.groupMetadata?.participants?.iAmMember()) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `You not a member of group, to pin msg ${msgId.toString()}`,
      { msgId, pin: pin }
    );
  } else if (
    chat.isGroup &&
    (chat.groupMetadata?.restrict || chat.groupMetadata?.announce) &&
    !chat.groupMetadata?.participants.iAmAdmin()
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `You not have permission to pin msg ${msgId.toString()}`,
      { msgId, pin: pin }
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
      { msgId, pin: pin }
    );
  } else if (
    pinned &&
    pinned.pinType === (pin ? PIN_STATE.PIN : PIN_STATE.UNPIN)
  ) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The msg ${msgId.toString()} is already ${pin ? 'pinned' : 'unpinned'}`,
      { msgId, pin: pin }
    );
  }

  const result = await sendPinInChatMsg(
    msg,
    pin == true ? PIN_STATE.PIN : PIN_STATE.UNPIN,
    pin ? seconds : undefined
  );

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
export async function unpinMsg(msgId: string | MsgKey) {
  return pinMsg(msgId, false);
}
