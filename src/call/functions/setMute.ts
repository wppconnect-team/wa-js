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

import { WPPError } from '../../util';
import { requireActiveCallStack } from './requireVoipStack';

/**
 * Mute or unmute your microphone in the active call
 *
 * @example
 * ```javascript
 * await WPP.call.setMute(true);
 * ```
 *
 * @category Call
 */
export async function setMute(
  muted: boolean,
  callId?: string
): Promise<boolean> {
  const { voipStack } = await requireActiveCallStack(callId);

  const status = await voipStack.setCallMute(!!muted);
  if (status) {
    throw new WPPError('call_mute_failed', `Failed to set mute: ${status}`, {
      status,
    });
  }

  return true;
}
