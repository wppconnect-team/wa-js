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
import { StatusV3Model } from '../models';
import { BaseCollection } from '.';

/** @whatsapp 2.2147.14:70173 */
export declare class StatusV3Collection extends BaseCollection<StatusV3Model> {
  static model: StatusV3Model;
  loadMore(e?: any, t?: any, r?: any): any;
  sync(e?: any): any;
  logMetrics(e?: any): any;
  hasSynced(): boolean;
  handleUpdate(e?: any, t?: any, r?: any): any;
  updateChecksum(e?: any): any;
  addStatusMessages(e?: any, t?: any): any;
  getUnexpired(e?: any): any;
  getMyStatus(): any;
  static comparator(): any;
}
exportModule(
  exports,
  {
    StatusV3Collection: (m) => m.StatusV3CollectionImpl || m.StatusV3Collection,
  },
  (m) => m.StatusV3CollectionImpl || m.StatusV3Collection
);
