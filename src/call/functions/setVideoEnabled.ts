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
import { requireActiveCall, requireActiveCallStack } from './requireVoipStack';

/**
 * Turn your camera on or off in the active call.
 *
 * Enabling the camera in a voice call requests the upgrade to a video call.
 *
 * @example
 * ```javascript
 * await WPP.call.setVideoEnabled(false);
 * ```
 *
 * @category Call
 */
export async function setVideoEnabled(
  enabled: boolean,
  callId?: string
): Promise<boolean> {
  const { voipStack, call } = await requireActiveCallStack(callId);
  requireActiveCall(call.id);

  const status =
    enabled && !call.isVideo && !call.isGroup
      ? await voipStack.requestVideoUpgrade()
      : await voipStack.setCallVideoMute(!enabled);

  if (status) {
    throw new WPPError(
      'call_video_failed',
      `Failed to set video state: ${status}`,
      { status }
    );
  }

  return true;
}
