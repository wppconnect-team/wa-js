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

import { MsgKey } from '../../whatsapp';

const chatGetPlatformFromMessageSchema = z.object({
  messageId: z.string(),
});
export type ChatGetPlatformFromMessageInput = z.infer<
  typeof chatGetPlatformFromMessageSchema
>;
export type ChatGetPlatformFromMessageOutput =
  | 'android'
  | 'iphone'
  | 'web'
  | 'unknown';

/**
 * Get the platform message from message ID
 *
 * The platform can be:
 * * android
 * * iphone
 * * web
 * * unknown
 *
 * @example
 * ```javascript
 * // to get platform from a message
 * const platform = WPP.chat.getPlatformFromMessage('[message_id]');
 * ```
 * @category Message
 */
export function getPlatformFromMessage(
  params: ChatGetPlatformFromMessageInput
): ChatGetPlatformFromMessageOutput {
  const { messageId } = chatGetPlatformFromMessageSchema.parse(params);

  /**
   * Based Bailyes
   * @see https://github.com/adiwajshing/Baileys/blob/19484e5cfced4c2d229687e74f714534375a57a3/src/Utils/messages.ts#L600
   */
  const msgKey = MsgKey.fromString(messageId.toString());

  if (msgKey.id.length > 21) {
    return 'android';
  }

  if (msgKey.id.startsWith('3A')) {
    return 'iphone';
  }

  if (msgKey.id.startsWith('3EB0')) {
    return 'web';
  }

  return 'unknown';
}
