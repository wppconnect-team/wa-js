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

import { ev, internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  getCachedVoipStackInterface,
  getVoipStackInterface,
  sendWAWebVoipSignalingXmpp,
  VoipStackInterface,
} from '../../whatsapp/functions';
import { decodeStanza, WapNode } from '../../whatsapp/websocket';

const debug = Debug('WA-JS:call:registerSignalingEvent');

const patchedStacks = new WeakSet<object>();
let isOutgoingWrapped = false;

let isRegistered = false;

// Retried when fully ready, in case the module was not registered yet
loader.onInjected(register);
loader.onFullReady(register);

function hasListeners() {
  return ev.hasListeners('call.signaling');
}

/**
 * The VoIP stack receives some nodes wrapped by `WADeprecatedWapParser`
 */
function toWapNode(node: any): WapNode | undefined {
  if (!node) {
    return undefined;
  }
  return typeof node.node === 'function' ? node.node() : node;
}

function emitSignaling(
  direction: 'incoming' | 'outgoing',
  node: WapNode | undefined,
  peerJid?: string,
  callId?: string
) {
  if (!node?.tag) {
    return;
  }

  internalEv.emit('call.signaling', {
    id: callId || node.attrs?.['call-id'],
    direction,
    type: String(node.tag),
    peerJid,
    attrs: { ...(node.attrs || {}) },
    node,
  });
}

/**
 * Observe the `<call>` children the stack receives. There is no call id
 * argument: the id comes from the `call-id` attribute of the node.
 */
function patchStack(stack: VoipStackInterface | null) {
  if (!stack) {
    return;
  }

  ensureOutgoingWrapped();

  if (patchedStacks.has(stack)) {
    return;
  }
  patchedStacks.add(stack);

  const incoming: { [method: string]: (args: any[]) => [any, any] } = {
    // (voipNode, platform, appVersion, e, t, isOffline, callerNotContact, peerJid, tcToken)
    handleIncomingSignalingOffer: (args) => [args[0], args[7]],
    handleIncomingSignalingMessage: (args) => [
      args[0]?.xmlNode,
      args[0]?.peerJid,
    ],
    handleIncomingSignalingAck: (args) => [args[0]?.xmlNode, args[0]?.peerJid],
  };

  for (const method of Object.keys(incoming)) {
    const original = stack[method];
    if (typeof original !== 'function') {
      continue;
    }

    stack[method] = function (this: any, ...args: any[]) {
      if (hasListeners()) {
        try {
          const [node, peerJid] = incoming[method](args);
          emitSignaling('incoming', toWapNode(node), peerJid?.toString());
        } catch (error) {
          debug(`failed to emit incoming signaling from ${method}`, error);
        }
      }
      return original.apply(this, args);
    };
  }
}

/**
 * `WAWebVoipSendSignalingXmpp` ships in a lazy bundle, so its binding only
 * resolves after the bundle is registered. Retried on every stack access
 * until it is wrapped, in case the bundle failed to load.
 */
function ensureOutgoingWrapped() {
  if (isOutgoingWrapped) {
    return;
  }

  loader
    .ensureLazyModule('WAWebVoipSendSignalingXmpp')
    .then(wrapOutgoing)
    .catch((error) => debug('failed to load outgoing signaling', error));
}

function wrapOutgoing() {
  if (isOutgoingWrapped || typeof sendWAWebVoipSignalingXmpp !== 'function') {
    return;
  }
  isOutgoingWrapped = true;

  wrapModuleFunction(sendWAWebVoipSignalingXmpp, (func, ...args) => {
    const [params] = args;

    if (hasListeners() && params?.xmlPayload) {
      decodeStanza(params.xmlPayload, (data) => Promise.resolve(data))
        .then((node) =>
          emitSignaling('outgoing', node, params.peerJid, params.callId)
        )
        .catch((error) => debug('failed to decode outgoing signaling', error));
    }

    return func(...args);
  });
}

function register() {
  if (isRegistered) {
    return;
  }

  if (typeof getVoipStackInterface !== 'function') {
    debug('getVoipStackInterface not found, signaling event disabled');
    return;
  }
  isRegistered = true;

  // Every consumer of the stack, including the incoming stanza handler,
  // resolves it through this function
  wrapModuleFunction(getVoipStackInterface, async (func, ...args) => {
    const stack = await func(...args);
    patchStack(stack);
    return stack;
  });

  if (typeof getCachedVoipStackInterface === 'function') {
    wrapModuleFunction(getCachedVoipStackInterface, (func, ...args) => {
      const stack = func(...args);
      patchStack(stack);
      return stack;
    });

    patchStack(getCachedVoipStackInterface());
  }
}
