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

export const addListener = ev.addListener;
export const emit = ev.emit;
export const emitAsync = ev.emitAsync;
export const eventNames = ev.eventNames;
export const getMaxListeners = ev.getMaxListeners;
export const hasListeners = ev.hasListeners;
export const listenTo = ev.listenTo;
export const listenerCount = ev.listenerCount;
export const listeners = ev.listeners;
export const listenersAny = ev.listenersAny;
export const many = ev.many;
export const off = ev.off;
export const offAny = ev.offAny;
export const on = ev.on;
export const onAny = ev.onAny;
export const once = ev.once;
export const prependAny = ev.prependAny;
export const prependListener = ev.prependListener;
export const prependMany = ev.prependMany;
export const prependOnceListener = ev.prependOnceListener;
export const removeAllListeners = ev.removeAllListeners;
export const removeListener = ev.removeListener;
export const setMaxListeners = ev.setMaxListeners;
export const stopListeningTo = ev.stopListeningTo;
export const waitFor = ev.waitFor;
