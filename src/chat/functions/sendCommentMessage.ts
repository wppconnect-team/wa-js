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

import { ensureLazyModule } from '../../loader';
import { WPPError } from '../../util';
import { MsgKey, SendMsgResultObject } from '../../whatsapp';
import { sendCommentMessage as sendNativeComment } from '../../whatsapp/functions/sendCommentMessage';
import { getCommentParent } from '../comments';
import { registerCommentEvents } from '../events/registerCommentEvent';

/**
 * Send a text reply inside a community announcement's comments.
 * Check messageSendResult: only OK confirms the send. A failure or exception
 * must not be retried blindly; the comment may already have been delivered.
 * WhatsApp enforces membership and sending permissions.
 * @example
 * ```javascript
 * const result = await WPP.chat.sendCommentMessage('false_123@g.us_MESSAGE', 'Thanks!');
 * ```
 * @category Message
 */
export async function sendCommentMessage(
  messageId: string | MsgKey,
  text: string
): Promise<SendMsgResultObject> {
  if (typeof text !== 'string' || !text.trim()) {
    throw new WPPError(
      'invalid_comment_text',
      'Comment text must not be empty'
    );
  }
  const parent = await getCommentParent(messageId);
  await ensureLazyModule('WAWebSendCommentMessageAction');
  if (typeof sendNativeComment !== 'function') {
    throw new WPPError(
      'comments_not_available',
      'Comment sending is unavailable in this WhatsApp version'
    );
  }
  registerCommentEvents();
  return sendNativeComment(parent, text);
}
