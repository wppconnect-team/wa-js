/*!
 * Copyright 2023 WPPConnect Team
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

import { getMyUserId } from '../../conn';
import { WPPError } from '../../util';
import { MsgKey, MsgModel, Wid } from '../../whatsapp';

/**
 * Get a quoted message
 *
 * @category Chat
 */
export function getQuotedMsgKey(msg: MsgModel): MsgKey {
  if (!msg.quotedStanzaID) {
    throw new WPPError(
      'message_not_have_a_reply',
      `Message ${msg.id} does not have a reply`,
      {
        id: msg.id,
      }
    );
  }

  const remote = msg.quotedRemoteJid ? msg.quotedRemoteJid : msg.id.remote;
  const fromMe = getMyUserId()?.equals(msg.quotedParticipant) || false;

  const isStatus =
    typeof Wid.isStatusV3 === 'function'
      ? Wid.isStatusV3(remote)
      : Wid.isStatus(remote);

  const quotedMsgId = new MsgKey({
    id: msg.quotedStanzaID,
    fromMe: fromMe,
    remote: remote,
    participant:
      Wid.isGroup(msg.from!) || Wid.isGroup(msg.to!) || isStatus
        ? msg.quotedParticipant
        : undefined,
  });
  return quotedMsgId;
}
