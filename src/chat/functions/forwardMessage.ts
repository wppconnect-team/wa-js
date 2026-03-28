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

import { assertFindChat } from '../../assert';
import { forwardMessagesToChats } from '../../whatsapp/functions';
import { getMessageById } from '..';

const chatForwardMessageSchema = z.object({
  toChatId: z.string(),
  msgId: z.string(),
  options: z
    .object({
      displayCaptionText: z.boolean().optional(),
      multicast: z.boolean().optional(),
    })
    .optional(),
});
export type ChatForwardMessageInput = z.infer<typeof chatForwardMessageSchema>;
export type ChatForwardMessageOutput = boolean;

/**
 * Forward message to a chat
 *
 * @example
 * ```javascript
 * // Forward message
 * WPP.chat.forwardMessage({ toChatId: '[number]@c.us', msgId: 'true_[number]@c.us_ABCDEF' });
 * ```
 * @category Message
 * @return  {any} Any
 */
export async function forwardMessage(
  params: ChatForwardMessageInput
): Promise<ChatForwardMessageOutput> {
  const { toChatId, msgId, options } = chatForwardMessageSchema.parse(params);
  const chat = await assertFindChat(toChatId);

  const msg = await getMessageById({ id: msgId });

  return await forwardMessagesToChats(
    [msg],
    [chat],
    options?.displayCaptionText
  );
}
