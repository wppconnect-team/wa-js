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

import * as wa_functions from '../../whatsapp/functions';

export interface HistorySyncProgress {
  progress: number | null;
  paused: boolean;
  inProgress: boolean;
}

/**
 * Return the current state of syncing old messages progress
 *
 * @example
 * ```javascript
 * const info = WPP.conn.getHistorySyncProgress();
 * console.log(info.progress); // Output: 50
 * console.log(info.paused); // Output: false0
 * console.log(info.inProgress); // Output: true
 * ```
 */
export function getHistorySyncProgress(): HistorySyncProgress {
  const info = wa_functions.getHistorySyncProgress();

  return {
    progress: info.progress,
    paused: info.paused || false,
    inProgress: info.inProgress || false,
  };
}
