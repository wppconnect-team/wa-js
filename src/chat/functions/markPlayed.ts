/*!
 * Copyright 2022 WPPConnect Team
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

import { markPlayed as MarkPlayed } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

const chatMarkPlayedSchema = z.object({
  messageId: z.string(),
});
export type ChatMarkPlayedInput = z.infer<typeof chatMarkPlayedSchema>;
export type ChatMarkPlayedOutput = any;

/**
 * Mark message as played
 *
 * @example
 * ```javascript
 * WPP.chat.markPlayed({ messageId: '[message_id]' });
 * ```
 * @category Message
 */
export async function markPlayed(
  params: ChatMarkPlayedInput
): Promise<ChatMarkPlayedOutput> {
  const { messageId } = chatMarkPlayedSchema.parse(params);

  const msg = await getMessageById({ id: messageId });

  await MarkPlayed(msg);
  return await getMessageById({ id: messageId });
}
