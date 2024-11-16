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
import { getShouldAppearInList } from '../../whatsapp/functions';

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
 * ```
 * @category Chat
 */
let allowList: string[] = [];
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
  ASSIGNED_TO_YOU = 'assigned_to_you',
}
export async function setChatList(
  type: FilterChatListTypes,
  ids: string | string[]
): Promise<{ type: FilterChatListTypes; list?: string[] }> {
  filterType = type;
  if (!type) {
    throw new WPPError('send_type_filter', `Please send a valid type filter`);
  }
  if (typeof ids == 'string') ids = [ids];
  if (type == FilterChatListTypes.CUSTOM) {
    allowList = ids;
    Cmd.trigger('set_active_filter', 'unread');
    Cmd.trigger('set_active_filter');
    return {
      type: type as any,
      list: allowList,
    };
  } else if (type == FilterChatListTypes.ALL) {
    Cmd.trigger('set_active_filter');
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

webpack.onFullReady(applyPatch, 2000);

function applyPatch() {
  wrapModuleFunction(getShouldAppearInList, (func, ...args) => {
    const [chat] = args;

    if (filterType === FilterChatListTypes.CUSTOM) {
      if (allowList.includes(chat.id?.toString())) {
        return true;
      }
      return false;
    }
    return func(...args);
  });
}
