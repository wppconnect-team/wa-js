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

import { Stream } from '../../whatsapp';
import { StreamInfo, StreamMode } from '../../whatsapp/enums';

export interface StreamData {
  mode: StreamMode;
  info: StreamInfo | undefined;
}

/**
 * Get current stream mode and info
 *
 * @example
 * ```javascript
 * const streamData = WPP.conn.getStreamData();
 * console.log(streamData.mode); // 'MAIN', 'QR', 'SYNCING', etc.
 * console.log(streamData.info); // 'NORMAL', 'OPENING', 'SYNCING', etc.
 * ```
 */
export function getStreamData(): StreamData {
  return {
    mode: Stream.mode,
    info: Stream.info,
  };
}
