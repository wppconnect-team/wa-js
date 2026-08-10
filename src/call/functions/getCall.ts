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

import { CallModel, CallStore } from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';

/**
 * Check if a call is in one of the incoming ringing states
 */
export function isIncomingCall(call: CallModel): boolean {
  const states: any = CALL_STATES;

  let state: any;
  try {
    state = call.getState?.();
  } catch (_error) {
    return false;
  }

  return (
    // Fix for mantain compatibility with older versions of whatsapp web
    state === states?.INCOMING_RING ||
    // >= 2.3000.10213.x
    state === states?.ReceivedCall ||
    state === states?.ReceivedCallWithoutOffer
  );
}

/**
 * Find a call model, by id or the first incoming one.
 *
 * Since the native VoIP stack, WhatsApp keeps the call only in
 * `CallStore.activeCall`: `WAWebVoipBridgeCallStateHandlers.setCallState`
 * builds the `CallModel` and hands it to `CallCollection.setActiveCall`, which
 * only assigns `activeCall` and never adds it to the collection. So
 * `CallStore.get()` and `CallStore.getModelsArray()` are empty and only see
 * calls created by the legacy `processIncomingCall` path.
 */
export function getCall(callId?: string): CallModel | undefined {
  const activeCall: CallModel | undefined =
    (CallStore as any)?.activeCall || undefined;

  if (callId) {
    if (activeCall?.id === callId) {
      return activeCall;
    }
    return CallStore.get(callId);
  }

  // First incoming ring or call group
  if (activeCall && (isIncomingCall(activeCall) || activeCall.isGroup)) {
    return activeCall;
  }

  return CallStore.getModelsArray().find((c) => isIncomingCall(c) || c.isGroup);
}

/**
 * Check if a call is the one currently handled by the native VoIP stack.
 *
 * The stack functions (`acceptCall`, `rejectCall`, `endCall`) have no call id
 * argument, they always act on the active call.
 */
export function isActiveCall(call: CallModel): boolean {
  return (CallStore as any)?.activeCall?.id === call.id;
}
