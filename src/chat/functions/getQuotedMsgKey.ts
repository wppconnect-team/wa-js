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

import { z } from 'zod';

import { getMyUserId } from '../../conn';
import { WPPError } from '../../util';
import { MsgKey, Wid } from '../../whatsapp';
import { getMessageById } from './getMessageById';

const chatGetQuotedMsgKeySchema = z.object({
  msgId: z.string(),
});
export type ChatGetQuotedMsgKeyInput = z.infer<
  typeof chatGetQuotedMsgKeySchema
>;
export type ChatGetQuotedMsgKeyOutput = MsgKey;

/**
 * Get a quoted message
 *
 * @category Chat
 */
export async function getQuotedMsgKey(
  params: ChatGetQuotedMsgKeyInput
): Promise<ChatGetQuotedMsgKeyOutput> {
  const { msgId } = chatGetQuotedMsgKeySchema.parse(params);
  const msgModel = await getMessageById({ id: msgId });

  if (!msgModel.quotedStanzaID) {
    throw new WPPError(
      'message_not_have_a_reply',
      `Message ${msgModel.id} does not have a reply`,
      {
        id: msgModel.id,
      }
    );
  }

  const remote = msgModel.quotedRemoteJid
    ? msgModel.quotedRemoteJid
    : msgModel.id.remote;
  const fromMe = getMyUserId()?.equals(msgModel.quotedParticipant) || false;

  const isStatus =
    typeof Wid.isStatusV3 === 'function'
      ? Wid.isStatusV3(remote)
      : Wid.isStatus(remote);

  const quotedMsgId = new MsgKey({
    id: msgModel.quotedStanzaID,
    fromMe: fromMe,
    remote: remote,
    participant:
      Wid.isGroup(msgModel.from!) || Wid.isGroup(msgModel.to!) || isStatus
        ? msgModel.quotedParticipant
        : undefined,
  });
  return quotedMsgId;
}
