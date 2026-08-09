/*!
 * Copyright 2021 WPPConnect Team
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

import { EventEmitter } from './eventEmitter';
import { EventTypes } from './eventTypes';

export * from './eventTypes';

const debug = Debug('WA-JS:event');

export const internalEv = new EventEmitter<EventTypes>({
  maxListeners: Infinity,
});

export const ev = new EventEmitter<
  EventTypes & { alfa: string; beta: (from: number, to: string) => void }
>({
  maxListeners: Infinity,
});

/**
 * EventEmitter2's `emit` runs listeners synchronously and propagates any
 * listener exception straight into the *emitter's* stack. Combined with lazy
 * module execution on WhatsApp Web >= 2.3000 (where a binding accessed by one
 * listener can still be undefined), a single fragile listener can abort a
 * completely unrelated registrar mid-registration, or kill the loader's
 * lifecycle chain (root cause of #3481's stuck isReady/isFullReady and of
 * feedback loops between retried registrars). Guard both emitters so a
 * listener error is logged and contained at the emit boundary instead of
 * unwinding into whoever happened to emit the event.
 *
 * KNOWN LIMITATION (not solved here): the guard is at the *emit* boundary, so
 * EventEmitter2 still runs a throwing listener's siblings synchronously in the
 * same call — listeners registered AFTER a throwing one on the same event are
 * SKIPPED for that emit (the exception aborts EE2's loop before it reaches
 * them; containment only catches that abort and hides it). Loader lifecycle
 * listeners are `setTimeout`-deferred and safe against this; multiple user
 * listeners on one event are not. Per-listener wrapping is the complete fix and
 * is deliberately left as a follow-up (see review item: listener starvation).
 */
function guardEmit(emitter: EventEmitter<any>, name: string): void {
  const rawEmit = emitter.emit.bind(emitter);
  (emitter as any).emit = (event: any, ...values: any[]): boolean => {
    try {
      return rawEmit(event, ...values);
    } catch (error) {
      // Listener exceptions are surfaced at console.error on BOTH paths: a
      // throwing consumer listener is the user's own bug to find, and a
      // throwing internal one is always a wa-js defect — hiding either behind
      // the off-by-default debug() channel was the error-visibility regression
      // flagged in review (it also regressed pre-guard behavior, where the
      // exception propagated to the console). CONTAINING it (not rethrowing) is
      // the load-bearing part — a listener's own exception escaping the emit
      // boundary is the #3481 root cause, so this must log, not throw.
      const message = `listener error while emitting ${String(event)} on ${name}`;
      console.error(`[WA-JS] ${message}`, error);
      return true;
    }
  };

  // emitAsync collects listener return values synchronously before awaiting
  // them, so a synchronously-throwing listener escapes the returned promise
  // entirely — `emitAsync(...).catch(...)` never sees it. This is what killed
  // `runMetaLoader` at `await emitAsync('loader.injected')`.
  //
  // On error this resolves `[]`, DISCARDING every listener's result — a silent
  // public-API contract change (previously the promise rejected). No in-repo
  // caller reads the results today (all six call sites are fire-and-forget or
  // `.catch(() => null)`), so it is latent, but consumers who do read them get
  // an empty array with the failure only on console.error. Rejecting on a
  // listener bug is not an option (see the containment note above — the throw
  // inside `emitAsync` is not reachable by `.catch` before it is collected).
  const rawEmitAsync = emitter.emitAsync.bind(emitter);
  (emitter as any).emitAsync = async (
    event: any,
    ...values: any[]
  ): Promise<any[]> => {
    try {
      return await rawEmitAsync(event, ...values);
    } catch (error) {
      const message = `listener error while emitting (async) ${String(
        event
      )} on ${name}`;
      console.error(`[WA-JS] ${message}`, error);
      return [];
    }
  };
}

guardEmit(internalEv, 'internalEv');
guardEmit(ev, 'ev');

internalEv.onAny((event, ...values) => {
  ev.emit(event as any, ...values);
  if (debug.enabled) {
    debug(event, ...values);
  }
});

export { EventEmitter };

export const addListener = ev.addListener.bind(ev);
export const emit = ev.emit.bind(ev);
export const emitAsync = ev.emitAsync.bind(ev);
export const eventNames = ev.eventNames.bind(ev);
export const getMaxListeners = ev.getMaxListeners.bind(ev);
export const hasListeners = ev.hasListeners.bind(ev);
export const listenTo = ev.listenTo.bind(ev);
export const listenerCount = ev.listenerCount.bind(ev);
export const listeners = ev.listeners.bind(ev);
export const listenersAny = ev.listenersAny.bind(ev);
export const many = ev.many.bind(ev);
export const off = ev.off.bind(ev);
export const offAny = ev.offAny.bind(ev);
export const on = ev.on.bind(ev);
export const onAny = ev.onAny.bind(ev);
export const once = ev.once.bind(ev);
export const prependAny = ev.prependAny.bind(ev);
export const prependListener = ev.prependListener.bind(ev);
export const prependMany = ev.prependMany.bind(ev);
export const prependOnceListener = ev.prependOnceListener.bind(ev);
export const removeAllListeners = ev.removeAllListeners.bind(ev);
export const removeListener = ev.removeListener.bind(ev);
export const setMaxListeners = ev.setMaxListeners.bind(ev);
export const stopListeningTo = ev.stopListeningTo.bind(ev);
export const waitFor = ev.waitFor.bind(ev);
