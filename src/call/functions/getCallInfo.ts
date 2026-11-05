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

import { requireActiveCall, requireVoipStack } from './requireVoipStack';

/**
 * Get detailed information about the active call from the VoIP engine:
 * duration, participants (mute and video state), result, etc.
 *
 * @example
 * ```javascript
 * const info = await WPP.call.getCallInfo();
 * console.log(info.callActiveDuration, info.participants);
 * ```
 *
 * @category Call
 */
export async function getCallInfo(callId?: string): Promise<any> {
  requireActiveCall(callId);
  const voipStack = await requireVoipStack();

  const json = await voipStack.getCallInfo();
  if (!json) {
    return null;
  }

  return voipStack.parsers.parseCallInfo(json);
}
