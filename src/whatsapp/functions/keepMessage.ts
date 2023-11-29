/*!
 * Copyright 2023 WPPConnect Team
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

import { MsgModel } from '..';
import { exportModule } from '../exportModule';

/**
 * @whatsapp 170235
 */
export declare function keepMessage(msg: MsgModel, t: number): Promise<any>;
export declare function undoKeepMessage(
  msg: MsgModel,
  options: { deleteExpired: boolean },
  n: number
): Promise<any>;

exportModule(
  exports,
  {
    keepMessage: 'keepMessage',
    undoKeepMessage: 'undoKeepMessage',
  },
  (m) => m.keepMessage
);
