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

import { ChatModel } from '../models';
import { CollectionCache } from './CollectionCache';

/**
 * @moduleID 18917
 * @whatsapp 2.2126.14
 */
export declare class ChatCollection extends CollectionCache<ChatModel> {
  static model: ChatModel;
  static comparator(): any;
  notSpam?: any;
  promises?: any;
  enableSortListener(e?: any): any;
  disableSortListener(): any;
  setIndexes(): any;
  active(): any;
  sync(): any;
  getKeysForResyncMsgs(): any;
  resyncMessages(): any;
  unstarAllMessages(e?: any, t?: any): any;
  forwardMessagesToChats(e?: any, t?: any): any;
}
