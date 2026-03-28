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

import { Stream } from '../../whatsapp';

const connMarkAvailableSchema = z.object({
  available: z.boolean().optional(),
});

export type ConnMarkAvailableInput = z.infer<typeof connMarkAvailableSchema>;

export type ConnMarkAvailableOutput = boolean;

export type ConnMarkUnavailableOutput = boolean;

/**
 * Set the online state to online
 *
 * @example
 * ```javascript
 * await WPP.conn.markAvailable({ available: true });
 * ```
 */
export async function markAvailable(
  params: ConnMarkAvailableInput = {}
): Promise<ConnMarkAvailableOutput> {
  const { available = true } = connMarkAvailableSchema.parse(params);

  Object.defineProperty(Stream, 'available', {
    get: () => available,
    set: (v) => {
      if (v != available) {
        return;
      }
      Stream.trigger('change:available');
    },
    configurable: true,
  });

  if (available) {
    Stream.markAvailable();
  } else {
    Stream.markUnavailable();
  }

  return true;
}

/**
 * Set the online state to offline
 *
 * @example
 * ```javascript
 * await WPP.conn.markUnavailable();
 * ```
 */
export async function markUnavailable(): Promise<ConnMarkUnavailableOutput> {
  return markAvailable({ available: false });
}
