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
import { MsgKey, MsgModel } from '../../whatsapp';
import { getMessageById } from './getMessageById';

/**
 * Get a reply message
 *
 * @category Chat
 */
export async function getQuotedMsg(id: string | MsgKey): Promise<MsgModel> {
  const msg = await getMessageById(id);

  if (!msg.quotedStanzaID && !msg.quotedMsgId) {
    throw new WPPError(
      'message_not_have_a_reply',
      `Message ${id} does not have a reply`,
      {
        id,
      }
    );
  }

  const replyMsgId = new MsgKey({
    id: msg.quotedStanzaID,
    fromMe: msg.quotedParticipant?._serialized === getMyUserId()?._serialized,
    remote: msg.quotedRemoteJid ? msg.quotedRemoteJid : msg.id.remote,
    participant: msg.isGroupMsg ? msg.quotedParticipant : undefined,
  });
  return await getMessageById(replyMsgId);
}
