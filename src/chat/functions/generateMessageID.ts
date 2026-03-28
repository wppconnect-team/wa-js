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

import { assertWid } from '../../assert';
import { getMyUserLid, getMyUserWid } from '../../conn';
import { MsgKey } from '../../whatsapp';
import { randomMessageId } from '../../whatsapp/functions';

const chatGenerateMessageIDSchema = z.object({
  chatId: z.string(),
});
export type ChatGenerateMessageIDInput = z.infer<
  typeof chatGenerateMessageIDSchema
>;
export type ChatGenerateMessageIDOutput = MsgKey;

/**
 * Generate a new message ID
 *
 * @category Message
 */
export async function generateMessageID(
  params: ChatGenerateMessageIDInput
): Promise<ChatGenerateMessageIDOutput> {
  const { chatId } = chatGenerateMessageIDSchema.parse(params);

  const wid = assertWid(chatId);

  // For group messages, use LID format for both 'from' and 'participant'
  const from = wid.isGroup() ? getMyUserLid() : getMyUserWid();
  const participant = wid.isGroup() ? from : undefined;

  return new MsgKey({
    from,
    to: wid,
    id: await Promise.resolve(randomMessageId()),
    participant,
    selfDir: 'out',
  });
}
