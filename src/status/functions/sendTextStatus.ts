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

import { assertColor } from '../../assert';
import * as Chat from '../../chat';
import { TextFontStyle } from '../../enums';
import { sendRawStatus } from '.';

const statusSendTextStatusSchema = z.object({
  content: z.any(),
  waitForAck: z.boolean().default(true),
  messageId: z.any().optional(),
  caption: z.string().optional(),
  font: z.enum(TextFontStyle).optional(),
  backgroundColor: z.union([z.string(), z.number()]).optional(),
});

export type StatusSendTextStatusInput = z.infer<
  typeof statusSendTextStatusSchema
>;

export type StatusSendTextStatusOutput = Chat.SendMessageReturn;

/**
 * Send a text message to status stories
 *
 * @example
 * ```javascript
 * WPP.status.sendTextStatus({ content: 'Bootstrap primary color: #0275d8', backgroundColor: '#0275d8', font: 2 });
 * ```
 */
export async function sendTextStatus(
  params: StatusSendTextStatusInput
): Promise<StatusSendTextStatusOutput> {
  const {
    content,
    waitForAck,
    messageId,
    caption,
    font: fontParam,
    backgroundColor: bgParam,
  } = statusSendTextStatusSchema.parse(params);

  let backgroundColor = assertColor('#000000');
  let font = 0;

  if (['number', 'string'].includes(typeof bgParam)) {
    backgroundColor = assertColor(bgParam);
  }

  if (fontParam !== undefined && fontParam >= 0 && fontParam <= 5) {
    font = fontParam;
  }

  const message: Chat.RawMessage = {
    body: content,
    type: 'chat',
    richPreviewType: 0,
    inviteGrpType: 0,
    font,
    backgroundColor,
  };

  return sendRawStatus({ message, waitForAck, messageId, caption });
}
