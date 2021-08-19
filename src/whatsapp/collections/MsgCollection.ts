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

import { MsgModel } from '../models';
import { CollectionCache } from './CollectionCache';

/**
 * @moduleID 94558
 * @whatsapp 2.2126.14
 */
export declare class MsgCollection extends CollectionCache<MsgModel> {
  static model: MsgModel;
  lastReceivedReceipt?: any;
  lastReceivedPaymentTransaction?: any;
  preAck?: any;
  pendingAdd?: any;
  ftsCache?: any;
  productListMessagesPrefetchChain?: any;
  onSearchTag(): any;
  removeFromCollection(e?: any): any;
  getStarred(e?: any, t?: any, r?: any, a?: any): any;
  getMessagesById(e?: any): any;
  queryVcard(e?: any): any;
  incrementalStarredUpdate(e?: any): any;
  search(e?: any, t?: number, r?: any, a?: any, i?: any): any;
  queryMedia(e?: any, t?: any, r?: any, a?: any, i?: any): any;
  getContext(e?: any, t?: any, r?: any): any;
  hasSynced(): boolean;
  getKeysForResyncReceipts(): any;
  resyncReceipts(): any;
  updateLastReceipt(e?: any, t?: any): any;
  updateLastTransactionTime(e?: any, t?: any): any;
  processMultipleMessages(e?: any, t?: any, r?: any, a?: any): any;
  markAllAsStale(): any;
}
