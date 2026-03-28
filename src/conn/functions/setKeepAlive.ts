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

import { z } from 'zod';

const originalHasFocus = document.hasFocus;
let interval: any;

const connSetKeepAliveSchema = z.object({
  enable: z.boolean().optional(),
});

export type ConnSetKeepAliveInput = z.infer<typeof connSetKeepAliveSchema>;

export type ConnSetKeepAliveOutput = boolean;

/**
 * Set keep alive state, that will force the focused and online state
 *
 * @example
 * ```javascript
 * // To enable
 * await WPP.conn.setKeepAlive({ enable: true });
 *
 * // To disable
 * await WPP.conn.setKeepAlive({ enable: false });
 * ```
 */
export function setKeepAlive(
  params: ConnSetKeepAliveInput = {}
): ConnSetKeepAliveOutput {
  const { enable = true } = connSetKeepAliveSchema.parse(params);

  if (enable) {
    document.hasFocus = () => true;
    interval = setInterval(
      () => document.dispatchEvent(new Event('scroll')),
      15000
    );
  } else {
    document.hasFocus = originalHasFocus;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  return !!interval;
}
