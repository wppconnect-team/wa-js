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

import { WPPError } from '../../util';
import { MsgModel } from '../../whatsapp';
import { getMessageById } from './getMessageById';
import { getQuotedMsgKey } from './getQuotedMsgKey';

const chatGetQuotedMsgSchema = z.object({
  msgId: z.string(),
});
export type ChatGetQuotedMsgInput = z.infer<typeof chatGetQuotedMsgSchema>;
export type ChatGetQuotedMsgOutput = MsgModel;

/**
 * Get a quoted message
 *
 * @category Chat
 */
export async function getQuotedMsg(
  params: ChatGetQuotedMsgInput
): Promise<ChatGetQuotedMsgOutput> {
  const { msgId } = chatGetQuotedMsgSchema.parse(params);
  const msg = await getMessageById({ id: msgId });

  if (!msg.quotedStanzaID) {
    throw new WPPError(
      'message_not_have_a_reply',
      `Message ${msgId} does not have a reply`,
      {
        msgId,
      }
    );
  }

  const quotedMsgId = await getQuotedMsgKey({ msgId });
  return await getMessageById({ id: quotedMsgId._serialized });
}
