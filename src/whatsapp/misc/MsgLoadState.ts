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

import { BaseCollection } from '../collections';
import { exportModule } from '../exportModule';
import { Model, MsgModel } from '../models';

/** @whatsapp 38671 */
export declare class MsgLoadState extends Model {
  noEarlierMsgs: any;
  isLoadingEarlierMsgs: any;
  isLoadingRecentMsgs: any;
  isLoadingAroundMsgs: any;
  contextLoaded: any;
}

/** @whatsapp 38671 */
export declare class MsgLoad extends BaseCollection<MsgModel> {
  msgLoadState: MsgLoadState;
  loadRecentPromise?: Promise<any>;
  loadEarlierPromise?: Promise<any>;
  loadAroundPromise?: Promise<any>;
}

exportModule(
  exports,
  {
    MsgLoadState: 'MsgLoadState',
    MsgLoad: (m) => m.ChatMsgsCollection || m.default,
  },
  (m) => m.MsgLoadState
);
