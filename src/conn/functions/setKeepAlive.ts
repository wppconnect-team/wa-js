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

import {
  consistentClearInterval,
  consistentSetInterval,
} from '../../util/consistentTimers';

const originalHasFocus = document.hasFocus;
let interval: any;

/**
 * Set keep alive state, that will force the focused and online state
 *
 * @example
 * ```javascript
 * // To enable
 * await WPP.conn.setKeepAlive();
 *
 * // To disable
 * await WPP.conn.setKeepAlive(false);
 * ```
 */
export function setKeepAlive(enable = true) {
  if (enable) {
    document.hasFocus = () => true;
    // consistent* timers: a consumer can enable this before WhatsApp's mid-boot
    // scheduler swap and disable it after, so create and clear must go through the
    // captured implementations (timer IDs are not portable across the swap).
    interval = consistentSetInterval(
      () => document.dispatchEvent(new Event('scroll')),
      15000
    );
  } else {
    document.hasFocus = originalHasFocus;
    if (interval) {
      consistentClearInterval(interval);
      interval = null;
    }
  }

  return !!interval;
}
