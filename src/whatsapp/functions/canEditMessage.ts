/*!
 * Copyright 2022 WPPConnect Team
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

import * as webpack from '../../webpack';
import { exportModule } from '../exportModule';
import { MsgModel } from '../models';

/**
 * @whatsapp 591988 >= 2.2244.5
 */
export declare function canEditMessage(msg: MsgModel): boolean;

exportModule(
  exports,
  {
    canEditMessage: 'canEditMessage',
  },
  (m) => m.canEditMessage
);

webpack.injectFallbackModule('canEditMessage', {
  canEditMessage: (msg: MsgModel) => {
    if (!msg.isSentByMe) return false;
    if (msg.type !== 'chat') return false;
    if (msg.isForwarded) return false;
    if ('out' !== msg.self) return false;
    if (new Date().getTime() / 1e3 > msg.t! + 900) return false;
    return true;
  },
});
