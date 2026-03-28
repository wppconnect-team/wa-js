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

import { z } from 'zod';

import { sendReactionToMsg } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

const chatSendReactionToMessageSchema = z.object({
  messageId: z.string(),
  reaction: z.union([z.string(), z.literal(false), z.null()]),
});
export type ChatSendReactionToMessageInput = z.infer<
  typeof chatSendReactionToMessageSchema
>;
export type ChatSendReactionToMessageOutput = { sendMsgResult: any };

/**
 * Send a reaction to a message
 *
 * Full Emoji List: https://unicode.org/emoji/charts/full-emoji-list.html
 *
 * @example
 * ```javascript
 * // to react a message
 * WPP.chat.sendReactionToMessage({ messageId: '[message_id]', reaction: '🤯' });
 *
 * // to remove
 * WPP.chat.sendReactionToMessage({ messageId: '[message_id]', reaction: false });
 *
 * ```
 * @category Message
 */
export async function sendReactionToMessage(
  params: ChatSendReactionToMessageInput
): Promise<ChatSendReactionToMessageOutput> {
  const { messageId, reaction: rawReaction } =
    chatSendReactionToMessageSchema.parse(params);

  const msg = await getMessageById({ id: messageId });

  const reaction = rawReaction || '';

  const sendMsgResult = await sendReactionToMsg(msg, reaction);

  return {
    sendMsgResult,
  };
}
