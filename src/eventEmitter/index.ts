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
