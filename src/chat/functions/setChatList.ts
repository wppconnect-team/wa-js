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

import * as loader from '../../loader';
import { WPPError } from '../../util';
import {
  ChatModel,
  ChatSearchFilter,
  ChatStore,
  Cmd,
  lidPnCache,
} from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  getShouldAppearInList,
  isFilterExcludedFromSearchTreatmentInInboxFlow,
} from '../../whatsapp/functions';

let allowSet: Set<string> = new Set();
let filterType: string = 'all';

export enum FilterChatListTypes {
  ALL = 'all',
  CUSTOM = 'custom',
  UNREAD = 'unread',
  PERSONAL = 'personal',
  NON_CONTACT = 'non_contact',
  GROUP = 'group',
  FAVORITES = 'favorites',
  CONTACT = 'contact',
  BUSINESS = 'business',
  BROADCAST = 'broadcast',
  LABELS = 'labels',
  ASSIGNED_TO_YOU = 'assigned_to_you',
}

/**
 * Force the chat list panel to filter the chats again.
 *
 * Needed for the `custom` and `all` types: both keep WhatsApp on the "all"
 * filter, so there is no filter change to re-render the panel, only what
 * `getShouldAppearInList` answers changes. The panel filters the chats again on
 * a `sort` of the chat collection.
 */
function refreshChatList(): void {
  ChatStore?.trigger?.('sort');
}

/**
 * Check if a chat belongs to the custom list.
 *
 * WhatsApp Web stores 1:1 chats by LID or by phone number depending on the
 * addressing mode, while callers usually only know one of them, so a literal
 * comparison is not enough: fallback to the equivalent id from the local
 * LID/PN cache.
 */
function isAllowedChat(chat: ChatModel): boolean {
  const chatId = chat.id;
  if (!chatId) {
    return false;
  }

  if (allowSet.has(chatId.toString())) {
    return true;
  }

  /**
   * This runs inside of WhatsApp's chat list render, a throw here would break
   * the whole list, so never assume a complete Wid instance.
   */
  if (typeof chatId.isLid !== 'function') {
    return false;
  }

  const equivalentId = chatId.isLid()
    ? lidPnCache?.getPhoneNumber?.(chatId)
    : chatId.server === 'c.us'
      ? lidPnCache?.getCurrentLid?.(chatId)
      : undefined;

  return equivalentId ? allowSet.has(equivalentId.toString()) : false;
}

/**
 * Set custom Chat list in panel of whatsapp
 *
 * For the `custom` type, ids are matched against the chat id and also against
 * the equivalent phone number or LID, so both `number@c.us` and `number@lid`
 * work no matter how the chat is stored.
 *
 * @example
 * ```javascript
 * // Your custom list
 * WPP.chat.setChatList('custom', ['number@c.us', 'number2@c.us']);
 *
 * // List only with unread chats
 * WPP.chat.setChatList('unread');
 *
 * // List only with favorites chats
 * WPP.chat.setChatList('favorites');
 *
 * // List only with groups chats
 * WPP.chat.setChatList('group');
 *
 * // List only labels chat
 * WPP.chat.setChatList('labels', '454545_labelId');
 * ```
 * @category Chat
 */
export async function setChatList(
  type: FilterChatListTypes,
  ids?: string | string[]
): Promise<{ type: FilterChatListTypes; list?: string[] }> {
  filterType = type;
  if (!type) {
    throw new WPPError('send_type_filter', `Please send a valid type filter`);
  } else if (type == FilterChatListTypes.LABELS && !ids) {
    throw new WPPError('send_labelId', `Please send a valid label id`);
  } else if (type == FilterChatListTypes.CUSTOM && !ids) {
    throw new WPPError('send_ids', `Please send a valid ids`);
  }

  // normalize ids to array, when string it's a single id
  if (typeof ids == 'string') ids = [ids];

  /**
   * `Cmd.setActiveFilter` only forwards to `Cmd.trigger('set_active_filter')`,
   * it is not asynchronous, and WhatsApp ignores a filter equal to the current
   * one, so it must be called only once per change: two calls in a row are
   * compared against the filter of the last render and the second one is
   * dropped as unchanged, leaving the panel on the intermediate filter.
   */
  if (type == FilterChatListTypes.CUSTOM && ids) {
    allowSet = new Set<string>(ids);
    Cmd.setActiveFilter();
    refreshChatList();
    return {
      type: type as any,
      list: ids,
    };
  } else if (type == FilterChatListTypes.ALL) {
    Cmd.setActiveFilter();
    refreshChatList();
    return {
      type: type as any,
    };
  } else if (type == FilterChatListTypes.LABELS) {
    Cmd.setActiveFilter(FilterChatListTypes.LABELS, ids![0]);
    return {
      type: type as any,
    };
  } else {
    Cmd.setActiveFilter(type as ChatSearchFilter);
    return {
      type: type as any,
    };
  }
}

loader.onFullReady(applyPatch, 1000);

function applyPatch() {
  wrapModuleFunction(getShouldAppearInList, (func, ...args) => {
    const [chat] = args;

    if (filterType === FilterChatListTypes.CUSTOM) {
      return isAllowedChat(chat);
    }
    return func(...args);
  });
  /**
   * Reset custom filter when user switches to another filter type
   */
  wrapModuleFunction(
    isFilterExcludedFromSearchTreatmentInInboxFlow,
    (func, ...args) => {
      const [type] = args;

      // If we have a custom filter active and user is switching to a different filter,
      // reset our custom filter state
      if (filterType === FilterChatListTypes.CUSTOM && type !== undefined) {
        filterType = FilterChatListTypes.ALL;
      }

      return func(...args);
    }
  );
}

/**
 * Custom Wrap function with the callback
 *
 * This is not the best way to fix the wrapper for this function;
 * I need to improve it soon. However, the idea is to make it work.
 * Due to the lack of time and the urgency in the WhatsApp groups,
 * I'm committing it this way to provide a quick solution.
 */
export function wrapShouldAppearFunction<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  callback: (func: TFunc, ...args: Parameters<TFunc>) => ReturnType<TFunc>
): TFunc {
  const wrappedFunc: any = (...args: Parameters<TFunc>) => {
    return callback(func, ...args);
  };
  Object.defineProperties(
    wrappedFunc,
    Object.getOwnPropertyDescriptors(getShouldAppearInList)
  );

  return wrappedFunc as TFunc;
}
