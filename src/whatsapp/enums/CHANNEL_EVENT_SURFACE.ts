/*!
 * Copyright 2026 WPPConnect Team
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

/** @whatsapp WAWebWamEnumChannelEventSurface >= 2.3000.1032373751
 */
export declare enum CHANNEL_EVENT_SURFACE {
  CHANNEL_UPDATES_HOME = 1,
  CHANNEL_THREAD = 2,
  CHANNEL_DIRECTORY = 3,
  CHANNEL_DIRECTORY_SEARCH = 4,
  CHANNEL_PROFILE = 5,
  CHANNEL_UPDATES_HOME_SEARCH = 6,
  CHANNEL_DIRECTORY_CATEGORIES = 7,
  CHANNEL_DIRECTORY_CATEGORIES_SEARCH = 8,
}

exportModule(
  exports,
  {
    CHANNEL_EVENT_SURFACE: 'CHANNEL_EVENT_SURFACE',
  },
  (m) => m.CHANNEL_EVENT_SURFACE
);
