/*!
 * Copyright 2025 WPPConnect Team
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
import Debug from 'debug';

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { createWid } from '../../util/createWid';
import { CallModel, CallStore } from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';

const debug = Debug('WA-JS:call:registerIncomingCallEvent');

loader.onInjected(() => void register());

/**
 * Call ids already emitted, to avoid duplicated events when more than one
 * WhatsApp entry point reports the same call.
 */
const emittedCalls = new Set<string>();

/**
 * Wait until the `CallStore` getter resolves.
 *
 * `WAWebCallCollection` lives in a lazily loaded chunk, so it may still be
 * unregistered when `loader.injected` fires. Reading `CallStore` once at that
 * moment can yield `undefined` and leave the hooks permanently uninstalled -
 * the getter stays lazy, so retrying is enough to recover.
 */
async function waitForCallStore(timeout = 60_000): Promise<any> {
  const deadline = Date.now() + timeout;
  let delay = 100;

  for (;;) {
    const store: any = CallStore;
    if (store) {
      return store;
    }
    if (Date.now() >= deadline) {
      return null;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay = Math.min(1_000, Math.floor(delay * 1.5));
  }
}

function isIncomingCall(call: CallModel): boolean {
  const states: any = CALL_STATES;

  let state: any;
  try {
    state = call.getState?.();
  } catch (_error) {
    state = undefined;
  }

  const incomingStates = [
    states?.INCOMING_RING, // < 2.3000.10213.x
    states?.ReceivedCall,
    states?.ReceivedCallWithoutOffer,
  ].filter((s) => s !== undefined && s !== null);

  // Fallback for when the state (or the enum) is not available yet
  if (state == null || !incomingStates.length) {
    return !call.outgoing;
  }

  return incomingStates.includes(state);
}

/**
 * Emit `call.incoming_call` for a call model.
 *
 * WhatsApp only finishes populating the model (`offerTime`, `isVideo` and the
 * call state) right after the hooked function returns, so the emission is
 * deferred to the next tick to expose the final values.
 */
function emitIncomingCall(call: CallModel, origin: string): void {
  if (!call?.id || emittedCalls.has(call.id)) {
    return;
  }

  emittedCalls.add(call.id);
  if (emittedCalls.size > 100) {
    emittedCalls.clear();
    emittedCalls.add(call.id);
  }

  setTimeout(() => {
    if (!isIncomingCall(call)) {
      debug(`ignoring non incoming call via ${origin}`, call);
      return;
    }

    debug(`New call via ${origin}`, call);

    internalEv.emit('call.incoming_call', {
      id: call.id,
      isGroup: call.isGroup,
      isVideo: call.isVideo,
      // The native VoIP stack never fills `offerTime` (it stays 0)
      offerTime: call.offerTime || Math.floor(Date.now() / 1000),
      sender: createWid(call.peerJid),
      peerJid: call.peerJid,
    });
  }, 0);
}

async function register(): Promise<void> {
  const store = await waitForCallStore();

  if (!store) {
    debug('CallStore not available, incoming call event was not registered');
    return;
  }

  debug('Registering incoming call event listeners');

  /**
   * Legacy signaling path (`WAWebVoipActionWebHandleIncomingSignalingMessage`).
   *
   * Since the native VoIP stack was introduced,
   * `WAWebVoipHandleIncomingSignalingMessage` forwards the offer to the stack
   * interface and returns early, so this only runs on older WhatsApp versions
   * and when the stack interface is unavailable.
   *
   * TODO: remove when 2.3000.10xx is no longer available in wa-version/html
   */
  if (typeof store.processIncomingCall === 'function') {
    const originalProcessIncomingCall = store.processIncomingCall.bind(
      store
    ) as (...args: any[]) => CallModel;

    store.processIncomingCall = function (...args: any[]) {
      const call = originalProcessIncomingCall(...args);
      if (call) {
        emitIncomingCall(call, 'processIncomingCall');
      }
      return call;
    };
  } else {
    debug('CallStore.processIncomingCall not found');
  }

  /**
   * Native VoIP stack path (WhatsApp >= 2.3000).
   *
   * The stack raises `CallEvent.CallStateChanged`, which reaches
   * `WAWebVoipBridgeCallStateHandlers.setCallState`. That handler builds a new
   * `CallModel` and registers it with `setActiveCall` before applying the call
   * state, and never goes through `processIncomingCall`.
   */
  if (typeof store.setActiveCall === 'function') {
    const originalSetActiveCall = store.setActiveCall.bind(store) as (
      ...args: any[]
    ) => any;

    store.setActiveCall = function (call: CallModel | null, ...args: any[]) {
      const result = originalSetActiveCall(call, ...args);
      if (call) {
        emitIncomingCall(call, 'setActiveCall');
      }
      return result;
    };
  } else {
    debug('CallStore.setActiveCall not found');
  }
}
