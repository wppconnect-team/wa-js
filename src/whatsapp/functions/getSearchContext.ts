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
import { MsgKey, MsgLoad } from '../misc';
import { ChatModel, MsgModel } from '../models';

/**
 * @whatsapp 738599 >= 2.2242.5
 */
export declare function getSearchContext(
  chat: ChatModel,
  msg: MsgModel | MsgKey,
  options?: {
    isQuotedMsgAvailable: boolean;
  }
): {
  collection: MsgLoad;
  msg?: MsgModel;
  key?: MsgKey;
  highlightMsg: true;
};

exportModule(
  exports,
  {
    getSearchContext: 'getSearchContext',
  },
  (m) => m.getSearchContext
);
