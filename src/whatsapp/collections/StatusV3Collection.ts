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

import { RawMessage } from '../../chat';
import { exportModule } from '../exportModule';
import { Wid } from '../misc';
import { StatusV3Model } from '../models';
import { BaseCollection } from '.';

/** @whatsapp 59387
 * @whatsapp 459387 >= 2.2222.8
 */
export declare class StatusV3Collection extends BaseCollection<StatusV3Model> {
  static model: StatusV3Model;
  loadMore(e?: any, t?: any, r?: any): any;
  sync(e?: any): any;
  logMetrics(e?: any): any;
  hasSynced(): boolean;
  handleUpdate(rawMsg?: RawMessage, checksum?: any, isMsgUpdate?: boolean): any;
  updateChecksum(e?: any): any;
  addStatusMessages(wid: Wid, msgs: RawMessage[]): any;
  getUnexpired(e?: any): any;
  getMyStatus(): StatusV3Model;
  static comparator(): any;
}
exportModule(
  exports,
  {
    StatusV3Collection: 'StatusV3CollectionImpl',
  },
  (m) => m.StatusV3CollectionImpl || m.StatusV3Collection
);
