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
import { ChatModel } from '../models';

/**
 * @deprecated
 * @whatsapp 59992
 * @whatsapp 259992 >= 2.2222.8
 * @whatsapp 503153 >= 2.2228.4
 * <= 2.3000.x
 */
export declare function setArchive(
  chat: ChatModel,
  archive: boolean,
  id?: string
): Promise<void>;

/**
 * @whatsapp >= 2.3000.1012117641
 */
export declare function setArchive(
  args: { id: string; archive: boolean }[]
): Promise<void>;

exportModule(
  exports,
  {
    setArchive: 'setArchive',
  },
  (m) => m.setArchive
);
