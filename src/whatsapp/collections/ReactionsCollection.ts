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

import { exportModule } from '../exportModule';
import { ReactionsModel } from '../models';
import { BaseCollection } from './BaseCollection';

/** @whatsapp 57162
 * @whatsapp 257162 >= 2.2222.8
 */
export declare class ReactionsCollection extends BaseCollection<ReactionsModel> {
  static model: ReactionsModel;
  static comparator(): any;
  addOrUpdateReaction(e?: any): any;
  removeReaction(e?: any): void;
  getAggregateEmojiAndSender(e?: any, t?: any): any;
  markReactionsAsRead(e?: any): void;
  getExistingSenderModelFromReactionDetails(e?: any): any;
  updateFailedPropsForExistingSentReaction(e?: any): void;
  shouldUpdateAck(e?: any): any;
  deleteReactionsByParentMessageKey(e?: any): void;
}

exportModule(
  exports,
  { ReactionsCollection: 'ReactionsCollectionImpl' },
  (m) => m.ReactionsCollectionImpl
);
