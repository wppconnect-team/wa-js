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
import { forwardMessages as forwardMessagesWhatsApp } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

const chatForwardMessagesSchema = z.object({
  toChatId: z.string(),
  msgsIds: z.array(z.string()),
  options: z
    .object({
      displayCaptionText: z.boolean().optional(),
      multicast: z.boolean().optional(),
      appendedText: z.boolean().optional(),
    })
    .optional(),
});
export type ChatForwardMessagesInput = z.infer<
  typeof chatForwardMessagesSchema
>;
export type ChatForwardMessagesOutput = Array<any>;

/**
 * Forward many messages to a chat
 *
 * @example
 * ```javascript
 * // Forward messages
 * WPP.chat.forwardMessages({ toChatId: '[number]@c.us', msgsId: ['true_[number]@c.us_ABCDEF', ...] });
 * ```
 * @category Message
 * @return  {any} Any
 */
export async function forwardMessages(
  params: ChatForwardMessagesInput
): Promise<ChatForwardMessagesOutput> {
  const { toChatId, msgsIds, options } =
    chatForwardMessagesSchema.parse(params);
  const chat = await assertFindChat(toChatId);
  const msgs = await Promise.all(msgsIds.map((id) => getMessageById({ id })));

  return await forwardMessagesWhatsApp({
    chat,
    msgs,
    multicast: options?.multicast ?? false,
    includeCaption: options?.displayCaptionText ?? false,
    appendedText: options?.appendedText ?? false,
  });
}
