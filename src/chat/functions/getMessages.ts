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
import { MSG_TYPE } from '../../whatsapp/enums';
import {
  msgFindByDirection,
  msgFindCallLog,
  msgFindMedia,
  msgFindQuery,
} from '../../whatsapp/functions';
import { RawMessage } from '..';

export interface GetMessagesOptions {
  count?: number;
  direction?: 'after' | 'before';
  id?: string;
  onlyUnread?: boolean;
  media?: 'url' | 'document' | 'all' | 'image';
  includeCallMessages?: boolean;
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
 *
 * // Include call messages along with chat messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   includeCallMessages: true,
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

  // Build params object - use different structure for legacy vs new API
  // TODO: Remove legacy API support after 2026-06-26
  const useLegacyAPI = typeof msgFindQuery === 'function';

  // Legacy API uses MsgKey with added properties
  // New API uses { anchor: MsgKey, count: number }
  const params: any =
    useLegacyAPI && id
      ? (MsgKey.fromString(id) as any)
      : {
          remote: chat.id,
          count,
          direction,
        };

  if (useLegacyAPI) {
    params.count = count;
    params.direction = direction;
  }

  // For new API, prepare anchor parameter
  const newAPIAnchor = id ? MsgKey.fromString(id) : undefined;

  let msgs = [];
  if (options.media === 'all') {
    // TODO: Remove legacy API support after 2026-06-26
    if (useLegacyAPI) {
      const { messages } = await msgFindQuery('media', params);
      if (Array.isArray(messages)) {
        msgs.push(...messages);
      }
    } else {
      const result = await msgFindMedia({
        anchor: newAPIAnchor,
        count,
        mediaType: 'allMedia',
        direction,
        chat: chat.id,
      });
      if (Array.isArray(result)) {
        msgs.push(...result);
      } else if (result?.messages) {
        msgs.push(...result.messages);
      }
    }
  } else if (options.media === 'image') {
    if (useLegacyAPI) {
      const { messages } = await msgFindQuery('media', params);
      for (const Msg of messages) {
        if (Msg.type === 'image') {
          msgs.push(Msg);
        }
      }
    } else {
      const result = await msgFindMedia({
        anchor: newAPIAnchor,
        count,
        mediaType: 'allMedia',
        direction,
        chat: chat.id,
      });
      const messages = Array.isArray(result) ? result : result?.messages || [];
      for (const Msg of messages) {
        if (Msg.type === 'image') {
          msgs.push(Msg);
        }
      }
    }
  } else if (options.media !== undefined) {
    if (useLegacyAPI) {
      params.media = options.media;
      const { messages } = await msgFindQuery('media', params);
      if (Array.isArray(messages)) {
        msgs.push(...messages);
      }
    } else {
      const result = await msgFindMedia({
        anchor: newAPIAnchor,
        count,
        mediaType:
          options.media === 'document'
            ? 'allDocs'
            : options.media === 'url'
              ? 'allLinks'
              : undefined,
        direction,
        chat: chat.id,
      });
      if (Array.isArray(result)) {
        msgs.push(...result);
      } else if (result?.messages) {
        msgs.push(...result.messages);
      }
    }
  } else {
    // TODO: Remove legacy API support after 2026-06-26
    if (useLegacyAPI) {
      msgs = await msgFindQuery(direction, params);
    } else {
      msgs = await msgFindByDirection({
        anchor: newAPIAnchor!,
        count,
        direction,
      });
    }
  }

  if (!options.id && id) {
    const msg = MsgStore.get(id);
    if (msg) {
      msgs.push(msg.attributes);
    }
  }

  msgs = msgs.map((m: any) => {
    if (options?.onlyUnread) m.isNewMsg = true;
    if (m instanceof MsgModel) {
      return m;
    }
    return MsgStore.get(m) || new MsgModel(m);
  });

  // Include call messages if requested
  // WhatsApp's msgFindQuery excludes call_log messages by default
  if (options.includeCallMessages) {
    try {
      let callMsgs;

      // TODO: Remove legacy API support after 2026-06-26
      if (useLegacyAPI) {
        callMsgs = await msgFindQuery(MSG_TYPE.CALL_LOG, params);
      } else {
        callMsgs = await msgFindCallLog({
          anchor: newAPIAnchor,
          count,
        });
      }

      if (callMsgs && callMsgs.length > 0) {
        // Map call messages to MsgModel instances
        const mappedCallMsgs = callMsgs.map((m: any) => {
          if (m instanceof MsgModel) {
            return m;
          }
          return MsgStore.get(m) || new MsgModel(m);
        });

        // Merge call messages with regular messages
        msgs.push(...mappedCallMsgs);

        // Sort messages by timestamp to maintain chronological order
        msgs.sort((a: any, b: any) => {
          const timeA = a.t || a.timestamp || 0;
          const timeB = b.t || b.timestamp || 0;
          return direction === 'before' ? timeB - timeA : timeA - timeB;
        });

        // Limit to the requested count
        if (count > 0 && count !== Infinity) {
          msgs = msgs.slice(0, count);
        }
      }
    } catch (e) {
      // Silently fail if call messages can't be retrieved
      console.warn('Could not retrieve call messages:', e);
    }
  }

  return msgs;
}
