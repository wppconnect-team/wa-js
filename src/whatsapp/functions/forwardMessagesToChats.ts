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

import { injectFallbackModule } from '../../loader';
import { exportModule } from '../exportModule';
import { ChatModel, MsgModel } from '../models';
import { ChatStore } from '../stores';

/** @whatsapp 69951
 * @whatsapp 450192 >= 2.2353.0
 */
export declare function forwardMessagesToChats(
  msgs: MsgModel[],
  chats: ChatModel[],
  displayCaptionText?: boolean
): Promise<boolean>;

exportModule(
  exports,
  { forwardMessagesToChats: 'forwardMessagesToChats' },
  (m) => m.forwardMessagesToChats
);

/**
 * On WhatsApp Web >= 2.3000 the Chat collection no longer carries
 * `forwardMessagesToChats`, and `WAWebForwardMessagesToChat` ships in a bundle
 * WhatsApp only fetches on demand (see `LAZY_MODULES`). Offering this fallback
 * unconditionally made `searchId` resolve to it while that bundle was still
 * absent, and `exportModule` then pins the binding for the rest of the page —
 * so the real function could never take over and calls failed inside
 * `ChatStore.forwardMessagesToChats`. Only claim the name where the collection
 * method actually exists; elsewhere the miss stays unpinned and the binding
 * recovers as soon as the bundle is loaded.
 */
injectFallbackModule('forwardMessagesToChats', {
  get forwardMessagesToChats() {
    if (typeof ChatStore?.forwardMessagesToChats !== 'function') {
      return undefined;
    }

    return (
      msgs: MsgModel[],
      chats: ChatModel[],
      displayCaptionText?: boolean
    ): Promise<boolean> =>
      ChatStore.forwardMessagesToChats(msgs, chats, displayCaptionText);
  },
});
