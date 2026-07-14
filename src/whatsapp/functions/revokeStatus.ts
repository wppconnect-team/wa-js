/*!
 * Copyright 2024 WPPConnect Team
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
import { ChatModel, MsgModel } from '../models';

/**
 * @whatsapp WAWebRevokeStatusAction
 */
export declare function revokeStatus(
  chat: ChatModel,
  msg: MsgModel
): Promise<any>;

exportModule(
  exports,
  {
    // WA >= 2.3000.1042652105 replaced the default action component with a named
    // `sendStatusRevokeMsgAction` export. Older versions still expose it as `default`.
    revokeStatus: ['default', 'sendStatusRevokeMsgAction'],
  },
  /**
   * This module only loaded after device is connected
   * I be creating other function for check expires based directily from files
   */
  // TODO: remove the legacy `default.displayName` branch when 2.30xx pre-1042652105 is no longer available in wa-version/html
  (m, id) =>
    m.default?.displayName?.includes('RevokeStatusAction') ||
    id === 'WAWebRevokeStatusAction'
);
