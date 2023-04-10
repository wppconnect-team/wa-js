/*!
 * Copyright 2023 WPPConnect Team
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
  Wid,
} from '../../whatsapp';
import { get } from './get';

export interface ChatListOptions {
  id?: Wid;
  count?: number;
  direction?: 'after' | 'before';
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
 * // Some chats
 * const chats = WPP.chat.list({count: 20});
 *
 * // 20 chats before specific chat
 * const chats = WPP.chat.list({count: 20, direction: 'before', id: '[number]@c.us'});
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
  // Setting the check to null, so it doesn't break existing codes.
  const count = options.count == null ? Infinity : options.count;
  const direction = options.direction === 'before' ? 'before' : 'after';

  // Getting All Chats.
  // IDK, why we use slice here. don't think its needed.
  let models = ChatStore.getModelsArray().slice();

  // Filtering Based on Options.
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
      return label ? label.id : value;
    });

    models = models.filter((c) => c.labels?.some((id) => ids.includes(id)));
  }

  // Getting The Chat to start from.
  // Searching for chat (index) here, so it gets applied after all filtering.
  const indexChat = options?.id ? get(options.id) : null;
  const startIndex = indexChat ? models.indexOf(indexChat as any) : 0;

  if (direction === 'before') {
    const fixStartIndex = startIndex - count < 0 ? 0 : startIndex - count;
    const fixEndIndex =
      fixStartIndex + count >= startIndex ? startIndex : fixStartIndex + count;
    models = models.slice(fixStartIndex, fixEndIndex);
  } else {
    models = models.slice(startIndex, startIndex + count);
  }

  // Attaching Group Metadata on Found Chats.
  for (const chat of models) {
    if (chat.isGroup) {
      await GroupMetadataStore.find(chat.id);
    }
  }

  return models;
}
