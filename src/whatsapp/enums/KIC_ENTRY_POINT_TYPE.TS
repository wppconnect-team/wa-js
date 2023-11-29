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

import { exportModule } from '../exportModule';

/**
 * @whatsapp 982015
 */
export declare enum KIC_ENTRY_POINT_TYPE {
  CHAT_INFO = 1,
  SEARCH = 2,
  CHAT = 3,
  MEDIA = 4,
  DOCS = 5,
  LINKS = 6,
}

exportModule(
  exports,
  {
    KIC_ENTRY_POINT_TYPE: 'KIC_ENTRY_POINT_TYPE',
  },
  (m) => m.KIC_ENTRY_POINT_TYPE
);
