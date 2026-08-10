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

import { exportModule } from '../exportModule';
import { Wid } from '../misc';
import { ChatModel } from '../models';

/**
 * Origin of a chat creation, forwarded to WhatsApp as `chatOriginType`.
 *
 * WhatsApp keeps an allow list of origins that may create a LID chat
 * (`WAWebChatOriginTypes.VALID_LID_ORIGINS`). Creating a LID chat with an
 * origin outside that list makes `WAWebCreateChat` emit an error-level log
 * and report it, so prefer one of the allowed values below.
 */
export type ChatOriginType =
  /** Generic chat creation. Allowed to create LID chats. */
  | 'createChat'
  /** Chat created from a `@username` lookup. Allowed to create LID chats. */
  | 'username_contactless_search'
  /** Chat created from a username change notification. Allowed to create LID chats. */
  | 'username_change_notification'
  /** @deprecated Not allowed to create LID chats. */
  | 'forwardSelectedModals'
  /** @deprecated Not allowed to create LID chats. */
  | 'newChatFlow'
  /** @deprecated Not allowed to create LID chats. */
  | 'chatInfoTopCard';

/** @whatsapp WAWebFindChatAction
 */
export declare function findOrCreateLatestChat(
  wid: Wid,
  type?: ChatOriginType
): Promise<{
  chat: ChatModel;
  created: boolean;
}>;

exportModule(
  exports,
  {
    findOrCreateLatestChat: 'findOrCreateLatestChat',
  },
  (m) => m.findOrCreateLatestChat
);
