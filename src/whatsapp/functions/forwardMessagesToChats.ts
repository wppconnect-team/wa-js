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

import { injectFallbackModule } from '../../webpack';
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

injectFallbackModule('forwardMessagesToChats', {
  forwardMessagesToChats: (
    msgs: MsgModel[],
    chats: ChatModel[],
    displayCaptionText?: boolean
  ): Promise<boolean> =>
    ChatStore.forwardMessagesToChats(msgs, chats, displayCaptionText),
});
