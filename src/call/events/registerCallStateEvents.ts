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

import Debug from 'debug';

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { CallStore } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { frontendFireAndForget } from '../../whatsapp/functions';
import { updateMediaSession } from '../media/mediaSession';
import { CallStateTracker } from './callStateTracker';

const debug = Debug('WA-JS:call:registerCallStateEvents');

const tracker = new CallStateTracker();

const VOIP_BRIDGE_MESSAGES = new Set([
  'setCallState',
  'handleMuteStateChange',
  'handleVideoStateChange',
]);

let isRegistered = false;

// Retried when fully ready, in case the module was not registered yet
loader.onInjected(register);
loader.onFullReady(register);

/**
 * The native VoIP stack reports every state, mute and video change to the UI
 * through `WAWebBackendApi.frontendFireAndForget(name, payload)`, handled by
 * `WAWebVoipWebBridgeApi`. The bridge handlers are copied into a merged map
 * when it loads, so the call site is wrapped instead of the handlers.
 */
function register() {
  if (isRegistered) {
    return;
  }

  if (typeof frontendFireAndForget !== 'function') {
    debug('frontendFireAndForget not found, call state events disabled');
    return;
  }
  isRegistered = true;

  wrapModuleFunction(frontendFireAndForget, (func, ...args) => {
    const [name, payload] = args;

    if (VOIP_BRIDGE_MESSAGES.has(name)) {
      try {
        const activeCallId = (CallStore as any)?.activeCall?.id;
        const emissions = tracker.handle(name, payload, activeCallId);

        for (const [event, data] of emissions) {
          if (event === 'call.ended') updateMediaSession(data.id, true);
          else if (
            event === 'call.state_changed' &&
            data.state !== 0 &&
            data.state !== 7 &&
            data.state !== 13
          )
            updateMediaSession(data.id);
        }
        if (emissions.length) {
          // Emit after WhatsApp has updated its own call model
          setTimeout(() => {
            for (const [event, data] of emissions) {
              internalEv.emit(event as any, data);
            }
          }, 0);
        }
      } catch (error) {
        debug('failed to handle VoIP bridge message', name, error);
      }
    }

    return func(...args);
  });
}
