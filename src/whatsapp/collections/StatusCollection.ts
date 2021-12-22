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
import { Wid } from '../misc';
import { StatusModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 2.2147.16:22360 */
export declare class StatusCollection extends Collection<StatusModel> {
  static model: StatusModel;
  static idClass: typeof Wid;
  static staleCollection?: any;
  static resumeOnAvailable?: any;
  onResume(): any;
}
exportModule(
  exports,
  { StatusCollection: (m) => m.StatusCollectionImpl || m.StatusCollection },
  (m) => m.StatusCollectionImpl || m.StatusCollection
);
