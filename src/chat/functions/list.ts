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

import {
  ChatModel,
  ChatStore,
  GroupMetadataStore,
  LabelStore,
} from '../../whatsapp';

export interface ChatListOptions {
  onlyGroups?: boolean;
  onlyUsers?: boolean;
  onlyWithUnreadMessage?: boolean;
  withLabels?: string[];
}

/**
 * Return a list of chats
 *
 * @example
 * ```javascript
 * // All chats
 * const chats = await WPP.chat.list();
 *
 * // Only users chats
 * const chats = await WPP.chat.list({onlyUsers: true});
 *
 * // Only groups chats
 * const chats = await WPP.chat.list({onlyGroups: true});
 *
 * // Only with label Text
 * const chats = await WPP.chat.list({withLabels: ['Test']});
 *
 * // Only with label id
 * const chats = await WPP.chat.list({withLabels: ['1']});
 *
 * // Only with label with one of text or id
 * const chats = await WPP.chat.list({withLabels: ['Alfa','5']});
 * ```
 *
 * @category Chat
 */
export async function list(
  options: ChatListOptions = {}
): Promise<ChatModel[]> {
  let models = ChatStore.getModelsArray().slice();

  if (options.onlyUsers) {
    models = models.filter((c) => c.isUser);
  }

  if (options.onlyGroups) {
    models = models.filter((c) => c.isGroup);
  }

  if (options.onlyWithUnreadMessage) {
    models = models.filter((c) => c.hasUnread);
  }

  if (options.withLabels) {
    const ids = options.withLabels.map((value) => {
      const label = LabelStore.findFirst((l) => l.name === value);

      if (label) {
        return label.id;
      }

      return value;
    });

    models = models.filter((c) => c.labels?.some((id) => ids.includes(id)));
  }

  for (const chat of models) {
    if (chat.isGroup) {
      await GroupMetadataStore.find(chat.id);
    }
  }

  return models;
}
