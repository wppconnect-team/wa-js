/*!
 * Copyright 2024 WPPConnect Team
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

import {
  ChatModel,
  ChatStore,
  GroupMetadataStore,
  LabelStore,
  NewsletterStore,
} from '../../whatsapp';
import { get } from './get';

const chatListSchema = z.object({
  options: z
    .object({
      id: z.string().optional(),
      count: z.number().optional(),
      direction: z.enum(['after', 'before']).optional(),
      onlyCommunities: z.boolean().optional(),
      onlyGroups: z.boolean().optional(),
      onlyNewsletter: z.boolean().optional(),
      onlyUsers: z.boolean().optional(),
      onlyWithUnreadMessage: z.boolean().optional(),
      onlyArchived: z.boolean().optional(),
      withLabels: z.array(z.string()).optional(),
      ignoreGroupMetadata: z.boolean().optional(),
    })
    .optional(),
});
export type ChatListInput = z.infer<typeof chatListSchema>;
export type ChatListOutput = ChatModel[];

/**
 * Return a list of chats
 *
 * @example
 * ```javascript
 * // All chats
 * const chats = await WPP.chat.list();
 *
 * // Some chats
 * const chats = await WPP.chat.list({ options: { count: 20 } });
 *
 * // 20 chats before specific chat
 * const chats = await WPP.chat.list({ options: { count: 20, direction: 'before', id: '[number]@c.us' } });
 *
 * // Only users chats
 * const chats = await WPP.chat.list({ options: { onlyUsers: true } });
 *
 * // Only groups chats
 * const chats = await WPP.chat.list({ options: { onlyGroups: true } });
 *
 * // Only communities chats
 * const chats = await WPP.chat.list({ options: { onlyCommunities: true } });
 *
 * // Only Newsletter
 * const chats = await WPP.chat.list({ options: { onlyNewsletter: true } });
 *
 * // Only with label text
 * const chats = await WPP.chat.list({ options: { withLabels: ['Test'] } });
 *
 * // Only archived chats
 * const chats = await WPP.chat.list({ options: { onlyArchived: true } });
 * ```
 *
 * @category Chat
 */
export async function list(
  params: ChatListInput = {}
): Promise<ChatListOutput> {
  const { options = {} } = chatListSchema.parse(params);
  // Setting the check to null, so it doesn't break existing codes.
  const count = options.count == null ? Infinity : options.count!;
  const direction = options.direction === 'before' ? 'before' : 'after';

  // Getting All Chats.
  // Slice is used here to duplicate the array, then we can modify it without change the WhatsApp internal variables.
  // Also known as "shallow copy".
  let models = options.onlyNewsletter
    ? NewsletterStore.getModelsArray().slice()
    : ChatStore.getModelsArray().slice();

  // Filtering Based on Options.
  if (options.onlyUsers) {
    models = models.filter((c) => c.isUser);
  }

  if (options.onlyGroups) {
    models = models.filter((c) => c.id.isGroup());
  }

  if (options.onlyCommunities) {
    models = models.filter(
      (c) => c.id.isGroup() && c.groupMetadata?.groupType === 'COMMUNITY'
    );
  }

  if (options.onlyWithUnreadMessage) {
    models = models.filter((c) => c.hasUnread);
  }

  if (options.onlyArchived) {
    models = models.filter((c) => c.archive);
  }

  if (options.withLabels) {
    const ids = options.withLabels!.map((value) => {
      const label = LabelStore.findFirst((l) => l.name === value);
      return label ? label.id : value;
    });

    models = models.filter((c) => c.labels?.some((id) => ids.includes(id)));
  }

  // Getting The Chat to start from.
  // Searching for chat (index) here, so it gets applied after all filtering.
  const indexChat = options.id ? get({ chatId: options.id!.toString() }) : null;
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
  if (!options.ignoreGroupMetadata) {
    for (const chat of models) {
      if (chat.id.isGroup()) {
        await GroupMetadataStore.find(chat.id);
      }
    }
  }

  return models;
}
