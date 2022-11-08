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
import { GroupMetadataModel } from '../models';
import { BaseCollection } from '.';

/** @whatsapp 63928
 * @whatsapp 963928 >= 2.2222.8
 */
export declare class GroupMetadataCollection extends BaseCollection<GroupMetadataModel> {
  static model: GroupMetadataModel;
  handlePendingInvite(): any;
}
exportModule(
  exports,
  { GroupMetadataCollection: 'default.constructor' },
  (m) => typeof m.default.onParentGroupChange === 'function'
);
