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
import { CallModel, CallStore } from '../../whatsapp';
import {
  getVoipStackInterface,
  VoipStackInterface,
} from '../../whatsapp/functions';
import { enableCallInterface } from './enableCallInterface';

/**
 * Enable the call interface and resolve the native VoIP stack
 */
export async function requireVoipStack(): Promise<VoipStackInterface> {
  await enableCallInterface();

  const voipStack = await getVoipStackInterface();
  if (!voipStack) {
    throw new WPPError(
      'voip_stack_not_found',
      'VoIP stack interface is not available'
    );
  }

  return voipStack;
}

/**
 * Get the active call, optionally checking its id.
 *
 * The native VoIP stack only acts on the active call, so every in-call
 * function goes through this check.
 */
export function requireActiveCall(callId?: string): CallModel {
  const activeCall: CallModel | null = (CallStore as any)?.activeCall || null;

  if (!activeCall || (callId && activeCall.id !== callId)) {
    throw new WPPError(
      'call_not_found',
      `Active call ${callId || '<empty>'} not found`,
      { callId, activeCallId: activeCall?.id }
    );
  }

  return activeCall;
}

/**
 * Wait for the VoIP stack to register the call started by us as active
 */
export async function waitForActiveCall(
  predicate: (call: CallModel) => boolean = () => true,
  timeout = 3_000
): Promise<CallModel | undefined> {
  const deadline = Date.now() + timeout;

  for (;;) {
    const activeCall: CallModel | undefined = (CallStore as any)?.activeCall;
    if (activeCall && predicate(activeCall)) {
      return activeCall;
    }
    if (Date.now() >= deadline) {
      return undefined;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
