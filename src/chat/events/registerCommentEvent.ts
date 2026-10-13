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

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { CommentModel } from '../../whatsapp/models/CommentModel';
import { CommentStore } from '../../whatsapp/stores';
import { CommentEvent, serializeComment } from '../comments';

loader.onFullReady(registerCommentEvents);

let registered = false;

/** Register once; older WhatsApp versions without comments remain usable. */
export function registerCommentEvents(): void {
  if (registered || !loader.search((m) => m.CommentCollection?.byParent))
    return;
  const store = CommentStore;
  if (!store) return;
  registered = true;
  for (const [event, action] of [
    ['add', 'add'],
    ['change', 'update'],
    ['remove', 'remove'],
  ] as const) {
    store.on(event, (comment: CommentModel) => {
      if (!comment.id || !comment.parentMsgKey) return;
      const data: CommentEvent = { action, comment: serializeComment(comment) };
      internalEv.emitAsync('chat.comment', data).catch(() => undefined);
    });
  }
}
