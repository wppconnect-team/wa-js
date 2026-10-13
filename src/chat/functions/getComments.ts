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

import { WPPError } from '../../util';
import { MsgKey } from '../../whatsapp';
import { getCommentsByParentMsgKey } from '../../whatsapp/functions/getCommentsByParentMsgKey';
import { Comment, getCommentParent, serializeComment } from '../comments';
import { registerCommentEvents } from '../events/registerCommentEvent';

/**
 * Read locally synchronized replies to a community announcement, oldest first.
 * Does not mark comments as read or request missing history from the phone.
 * Revoked comments and encrypted placeholders keep their type and have no body.
 * @example
 * ```javascript
 * const comments = await WPP.chat.getComments('false_123@g.us_MESSAGE');
 * ```
 * @category Message
 */
export async function getComments(
  messageId: string | MsgKey
): Promise<Comment[]> {
  const parent = await getCommentParent(messageId);
  if (typeof getCommentsByParentMsgKey !== 'function') {
    throw new WPPError(
      'comments_not_available',
      'Comments are unavailable in this WhatsApp version'
    );
  }
  registerCommentEvents();
  const comments = await getCommentsByParentMsgKey([parent.id]);
  return comments
    .map(serializeComment)
    .sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id));
}
