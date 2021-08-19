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
import { Collection } from './Collection';

/**
 * @moduleID 2448
 * @whatsapp 2.2126.14
 */
export declare class StarredMsgCollection extends Collection<MsgModel> {
  static model: MsgModel;
  syncPromise?: any;
  isSynced: boolean;
  process(e?: any, t?: any, r?: any, a?: any): any;
  sync(e?: any): any;
  updateMsgs(e?: any, t?: any, r?: any): any;
  static comparator(): any;
}
