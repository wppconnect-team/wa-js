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
import { ChatModel } from '../models';

/** @whatsapp WAWebSendOrderChatAction >= 2.3000.0
 */
export declare function sendOrderChatAction(
  chat: ChatModel,
  cart: any,
  count: number,
  previewImage: any,
  message: string
): any;

exportModule(
  exports,
  {
    sendOrderChatAction: 'default',
  },
  (m) => m.default?.displayName?.includes('SendOrderChatAction')
);
