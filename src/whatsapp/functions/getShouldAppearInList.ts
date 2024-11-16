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

import { injectFallbackModule } from '../../webpack';
import { exportModule } from '../exportModule';
import { ChatModel } from '../models';

/**
 * @whatsapp WAWebGetters
 */
export declare function getShouldAppearInList(chat: ChatModel): boolean;
export declare function getPreviewMessage(chat: ChatModel): any[];
export declare function getShowChangeNumberNotification(
  chat: ChatModel
): boolean;
export declare function getShouldShowUnreadDivider(chat: ChatModel): boolean;
export declare function getHasUnread(chat: ChatModel): boolean;

exportModule(
  exports,
  {
    getShouldAppearInList: 'getShouldAppearInList',
    getPreviewMessage: 'getPreviewMessage',
    getShowChangeNumberNotification: 'getShowChangeNumberNotification',
    getShouldShowUnreadDivider: 'getShouldShowUnreadDivider',
  },
  (m) =>
    m.getShouldAppearInList &&
    m.getPreviewMessage &&
    m.getShowChangeNumberNotification &&
    m.getShouldShowUnreadDivider
);

exportModule(
  exports,
  {
    getHasUnread: 'getHasUnread',
  },
  (m) => m.getHasUnread
);

injectFallbackModule('getShouldAppearInList', {
  getShouldAppearInList: (chat: ChatModel) => chat.shouldAppearInList,
  getPreviewMessage: (chat: ChatModel) => chat.previewMessage,
  getShowChangeNumberNotification: (chat: ChatModel) =>
    chat.showChangeNumberNotification,
  getShouldShowUnreadDivider: (chat: ChatModel) => chat.shouldShowUnreadDivider,
});

injectFallbackModule('getHasUnread', {
  getHasUnread: (chat: ChatModel) => chat.hasUnread,
});
