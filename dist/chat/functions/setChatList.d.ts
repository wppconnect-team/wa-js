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
export declare enum FilterChatListTypes {
    ALL = "all",
    CUSTOM = "custom",
    UNREAD = "unread",
    PERSONAL = "personal",
    NON_CONTACT = "non_contact",
    GROUP = "group",
    FAVORITES = "favorites",
    CONTACT = "contact",
    BUSINESS = "business",
    BROADCAST = "broadcast",
    LABELS = "labels",
    ASSIGNED_TO_YOU = "assigned_to_you"
}
export declare function setChatList(type: FilterChatListTypes, ids?: string | string[]): Promise<{
    type: FilterChatListTypes;
    list?: string[];
}>;
/**
 * Custom Wrap function with the callback
 *
 * This is not the best way to fix the wrapper for this function;
 * I need to improve it soon. However, the idea is to make it work.
 * Due to the lack of time and the urgency in the WhatsApp groups,
 * I'm committing it this way to provide a quick solution.
 */
export declare function wrapShouldAppearFunction<TFunc extends (...args: any[]) => any>(func: TFunc, callback: (func: TFunc, ...args: Parameters<TFunc>) => ReturnType<TFunc>): TFunc;
