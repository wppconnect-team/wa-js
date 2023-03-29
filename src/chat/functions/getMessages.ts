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

import { assertGetChat } from '../../assert';
import { isMultiDevice } from '../../conn';
import { MsgKey, MsgModel, MsgStore, Wid } from '../../whatsapp';
import { msgFindQuery, MsgFindQueryParams } from '../../whatsapp/functions';
import { RawMessage } from '..';

export interface GetMessagesOptions {
  count?: number;
  direction?: 'after' | 'before';
  id?: string;
  onlyUnread?: boolean;
  media?: 'url' | 'document' | 'all' | 'image';
}

/**
 * Fetch messages from a chat
 *
 * @example
 * ```javascript
 * // Some messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 * });
 *
 * // All messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: -1,
 * });
 *
 * // Last 20 unread messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   onlyUnread: true,
 * });
 *
 * // All unread messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: -1,
 *   onlyUnread: true,
 * });
 *
 * // 20 messages before specific message
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   direction: 'before',
 *   id: '<full message id>'
 * });
 *
 * // Only media messages (url, document and links)
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'all',
 * });
 *
 * // Only image messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'image',
 * });
 *
 * // Only document messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'document',
 * });
 *
 * // Only link (url) messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'url',
 * });
 * ```
 * @category Message
 * @return  {RawMessage[]} List of raw messages
 */
export async function getMessages(
  chatId: string | Wid,
  options: GetMessagesOptions = {}
): Promise<RawMessage[]> {
  const chat = assertGetChat(chatId);

  let count = options.count || 20;
  const direction = options.direction === 'after' ? 'after' : 'before';
  const id = options.id || chat.lastReceivedKey?.toString();

  if (options.onlyUnread) {
    if (!chat.hasUnread) {
      return [];
    }

    // If marked as unread, return last 2 messages
    const unreadCount = chat.unreadCount < 0 ? 2 : chat.unreadCount;

    if (count < 0) {
      count = unreadCount;
    } else {
      count = Math.min(count, unreadCount);
    }
  }

  // Fix for multidevice
  if (count === -1 && isMultiDevice()) {
    count = Infinity;
  }

  if (!options.id && id) {
    count--;
  }

  const params: MsgFindQueryParams = id
    ? (MsgKey.fromString(id) as any)
    : {
        remote: chat.id,
      };

  params.count = count;
  params.direction = direction;

  let msgs = [];
  if (options.media === 'all') {
    const { messages } = await msgFindQuery('media', params);
    msgs = messages;
  } else if (options.media === 'image') {
    const { messages } = await msgFindQuery('media', params);
    for (const Msg of messages) {
      if (Msg.type === 'image') {
        msgs.push(Msg);
      }
    }
  } else if (options.media !== undefined) {
    params.media = options.media;
    msgs = await msgFindQuery('media', params);
  } else {
    msgs = await msgFindQuery(direction, params);
  }

  if (!options.id && id) {
    const msg = MsgStore.get(id);
    if (msg) {
      msgs.push(msg.attributes);
    }
  }

  msgs = msgs.map((m: any) => {
    if (m instanceof MsgModel) {
      return m;
    }
    return MsgStore.get(m) || new MsgModel(m);
  });

  return msgs;
}
