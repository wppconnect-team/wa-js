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

/**
 * @whatsapp WAWebCreateChat >= 2.3000.0
 * findChat internally uses this function to create a new chat
 * to create a chat use Chat.findChat(wid) instead
 */
export declare function createChat(
  chatParams: any,
  context: any,
  options: any,
  extra: any
): Promise<any>;

exportModule(
  exports,
  {
    createChat: 'createChat',
  },
  (m) => m.createChat
);
