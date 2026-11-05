/*!
 * Copyright 2024 WPPConnect Team
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
import { CallStore } from '../../whatsapp';
import { getVoipStackInterface } from '../../whatsapp/functions';
import { requireActiveCall } from './requireVoipStack';

/**
 * `WAWebVoipSignalingEnums.EndCallReason.Self` - ended by the local user
 */
const END_CALL_REASON_SELF = 2;

/**
 * End a call using the WhatsApp Web native VoIP stack
 *
 * @example
 * ```javascript
 * // End any call
 * WPP.call.end();
 *
 * // End only if the active call is this one
 * WPP.call.end(callId);
 * ```
 *
 * @return  {Promise<boolean>}
 */
export async function end(callId?: string): Promise<boolean> {
  if (callId) {
    requireActiveCall(callId);
  }

  const voipStack = await getVoipStackInterface();
  if (!voipStack) {
    throw new WPPError(
      'voip_stack_not_found',
      'VoIP stack interface is not available'
    );
  }

  // Marks the call as ended by us instead of missed on the call log,
  // like the end button in `useWAWebVoipCallHandlers` does
  const activeCall: any = (CallStore as any)?.activeCall;
  if (activeCall) {
    activeCall.userEndedCall = true;
  }

  // endCall(reason, isUserInitiated)
  await voipStack.endCall(END_CALL_REASON_SELF, true);

  return true;
}
