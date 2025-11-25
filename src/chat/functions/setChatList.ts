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

import { WPPError } from '../../util';
import * as webpack from '../../webpack';
import { Cmd } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  getShouldAppearInList,
  isFilterExcludedFromSearchTreatmentInInboxFlow,
} from '../../whatsapp/functions';

/**
 * Set custom Chat list in panel of whatsapp
 * * @example
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

  if (type == FilterChatListTypes.CUSTOM && ids) {
    allowSet = new Set<string>(ids);
    Cmd.trigger('set_active_filter', 'unread');
    Cmd.trigger('set_active_filter');
    return {
      type: type as any,
      list: ids,
    };
  } else if (type == FilterChatListTypes.ALL) {
    Cmd.trigger('set_active_filter');
    return {
      type: type as any,
    };
  } else if (type == FilterChatListTypes.LABELS) {
    Cmd.trigger('set_active_filter', FilterChatListTypes.LABELS, ids![0]);
    return {
      type: type as any,
    };
  } else {
    Cmd.trigger('set_active_filter', 'unread');
    Cmd.trigger('set_active_filter', type);
    return {
      type: type as any,
    };
  }
}

webpack.onFullReady(applyPatch, 1000);

function applyPatch() {
  wrapModuleFunction(getShouldAppearInList, (func, ...args) => {
    const [chat] = args;

    if (filterType === FilterChatListTypes.CUSTOM) {
      const chatId = chat.id?.toString();
      if (chatId && allowSet.has(chatId)) {
        return true;
      }
      return false;
    }
    return func(...args);
  });
  /**
   * If a custom list is set and the user clicks on 'favorites' or 'unread,'
   * show the correct list, not just the allowed contacts.
   */
  wrapModuleFunction(
    isFilterExcludedFromSearchTreatmentInInboxFlow,
    async (func, ...args) => {
      const [type] = args;

      if (type === FilterChatListTypes.LABELS) return func(...args);

      if (filterType == FilterChatListTypes.CUSTOM) {
        filterType = FilterChatListTypes.ALL;
        Cmd.trigger('set_active_filter', 'default');
        Cmd.trigger('set_active_filter', type);
      }

      filterType = FilterChatListTypes.ALL;
      Cmd.trigger('set_active_filter', type);
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
