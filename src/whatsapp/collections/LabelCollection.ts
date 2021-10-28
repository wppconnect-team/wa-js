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
import { ChatModel, LabelModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 2.2142.11:59606 */
export declare class LabelCollection extends Collection<LabelModel> {
  static model: LabelModel;
  static staleCollection?: any;
  static resumeOnAvailable?: any;
  checksum?: any;
  initializeAssociationsFromCache(e?: any): any;
  addNewLabel(e?: any, t?: any): any;
  removeAllLabelsMD(chat: ChatModel): any;
  addOrRemoveLabelsMD(e?: any, t?: any): any;
  addOrRemoveLabels(e?: any, t?: any): any;
  deleteLabel(e?: any): any;
  updateLabel(e?: any, t?: any): any;
  getNewLabelColor(): any;
  getLabelColorPalette(): any;
  handleRemove(e?: any): any;
  onResume(): any;
  sync(e?: any): any;
  updateChecksum(e?: any): any;
  getLabelsForModel(e?: any, t?: any): any;
}
exportModule(
  exports,
  { LabelCollection: 'LabelCollection' },
  (m) => m.LabelCollection
);
