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

import { QuickReplyModel } from '../models';
import { Collection } from './Collection';

/**
 * @moduleID 55165
 * @whatsapp 2.2126.14
 */
export declare class QuickReplyCollection extends Collection<QuickReplyModel> {
  static model: QuickReplyModel;
  checksum?: any;
  flushCountsTimer?: any;
  sortQuickReply(): any;
  onCountsFlushed(): any;
  filterShortcuts(e?: any): any;
  sync(e?: any): any;
  periodicFlush(): any;
  updateChecksum(e?: any): any;
  synced(): any;
  hasPendingCounts(): boolean;
  getAllPendingCounts(): any;
  flushCounts(): any;
}
