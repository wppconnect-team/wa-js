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

import { ChatModel, ChatStore } from '../../whatsapp';

export interface ChatListOptions {
  onlyGroups?: boolean;
  onlyUsers?: boolean;
  onlyWithUnreadMessage?: boolean;
}

/**
 * Return a list of chats
 *
 * @example
 * ```javascript
 * // All chats
 * const chat = await WPP.chat.list();
 *
 * // Only users chats
 * const chat = await WPP.chat.list({onlyUsers: true});
 *
 * // Only groups chats
 * const chat = await WPP.chat.list({onlyGroups: true});
 * ```
 *
 * @category Chat
 */
export async function list(options: ChatListOptions): Promise<ChatModel[]> {
  let models = ChatStore.models;

  if (options.onlyUsers) {
    models = models.filter((c) => c.isUser);
  }

  if (options.onlyGroups) {
    models = models.filter((c) => c.isGroup);
  }

  if (options.onlyWithUnreadMessage) {
    models = models.filter((c) => c.hasUnread);
  }

  return models;
}
