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

/** @whatsapp 2.2142.12:90672 */
export declare enum OUTWARD_TYPES {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  PTT = 'ptt',
  STICKER = 'sticker',
  DOCUMENT = 'document',
  PRODUCT = 'product',
  UNKNOWN = 'unknown',
}

exportModule(
  exports,
  {
    OUTWARD_TYPES: 'OUTWARD_TYPES',
  },
  (m) => m.OUTWARD_TYPES
);
