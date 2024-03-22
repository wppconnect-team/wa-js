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
import { BaseCollection } from './BaseCollection';

/** @whatsapp 16770
 * @whatsapp 316770 >= 2.2222.8
 */
export declare class LabelCollection extends BaseCollection<LabelModel> {
  static model: LabelModel;
  static staleCollection?: any;
  static resumeOnAvailable?: any;
  checksum?: any;
  initializeAssociationsFromCache(e?: any): any;
  addNewLabel(labelName: string, labelColor: string): any;
  removeAllLabelsMD(chat: ChatModel): any;
  addOrRemoveLabelsMD(e?: any, t?: any): any;
  addOrRemoveLabels(e?: any, t?: any): any;
  deleteLabel(id: string): any;
  updateLabel(e?: any, t?: any): any;
  getNewLabelColor(): any;
  getNextAvailableColor(): any;
  getLabelColorPalette(): any;
  handleRemove(e?: any): any;
  updateChecksum(e?: any): any;
  getLabelsForModel(e?: any, t?: any): any;
  _find(): any;
}
exportModule(
  exports,
  { LabelCollection: 'LabelCollectionImpl' },
  (m) => m.LabelCollectionImpl
);
