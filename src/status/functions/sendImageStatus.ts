/*!
 * Copyright 2026 WPPConnect Team
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
import { sendFileMessage, SendMessageReturn } from '../../chat';
import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import { MsgKey } from '../../whatsapp';
import { randomHex } from '../../whatsapp/functions';

const statusSendImageStatusSchema = z.object({
  content: z.any(),
  waitForAck: z.boolean().default(true),
  messageId: z.any().optional(),
  caption: z.string().optional(),
});

export type StatusSendImageStatusInput = z.infer<
  typeof statusSendImageStatusSchema
>;

export type StatusSendImageStatusOutput = SendMessageReturn;

/**
 * Send a image message to status stories
 *
 * @example
 * ```javascript
 * WPP.status.sendImageStatus({ content: 'data:image/jpeg;base64,<a long base64 file...>' });
 * ```
 */
export async function sendImageStatus(
  params: StatusSendImageStatusInput
): Promise<StatusSendImageStatusOutput> {
  const {
    content,
    waitForAck,
    messageId: userMessageId,
    caption,
  } = statusSendImageStatusSchema.parse(params);

  const me = getMyUserWid();

  const messageId =
    userMessageId ??
    new MsgKey({
      fromMe: true,
      id: randomHex(16),
      participant: me,
      remote: assertWid('status@broadcast'),
    });

  return sendFileMessage('status@broadcast', content, {
    waitForAck,
    messageId,
    caption,
    type: 'image',
  });
}
