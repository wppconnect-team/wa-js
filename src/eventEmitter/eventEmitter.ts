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

import {
  CancelablePromise,
  ConstructorOptions,
  event,
  EventAndListener,
  EventEmitter2,
  eventNS,
  GeneralEventEmitter,
  Listener,
  ListenerFn,
  ListenToOptions,
  OnceOptions,
  WaitForOptions,
} from 'eventemitter2';

exports.EventEmitter = EventEmitter2;

export interface WaitForFilter {
  (...values: any[]): boolean;
}

export interface OnOptions {
  /**
   * invoke the listener in async mode using setImmediate (fallback to setTimeout if not available) or process.nextTick depending on the nextTick option.
   */
  async?: boolean;

  /**
   * additionally wraps the listener to a Promise for later invocation using emitAsync method. This option will be activated by default if its value is undefined and the listener function is an asynchronous function (whose constructor name is AsyncFunction).
   */
  promisify?: boolean;

  /**
   * activates returning a listener object instead of 'this' by the subscription method.
   */
  objectify?: boolean;
}

export type ListenerType<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void]
    ? []
    : [T];

export declare class EventEmitter<EventData> {
  constructor(options?: ConstructorOptions);

  emit<Name extends keyof EventData>(
    event: Name,
    ...args: ListenerType<EventData[Name]>
  ): boolean;

  emitAsync<Name extends keyof EventData>(
    event: Name,
    ...args: ListenerType<EventData[Name]>
  ): Promise<any[]>;

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   */
  addListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void
  ): this | Listener;

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   */
  on<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   */
  on<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: boolean | OnOptions
  ): this;

  /**
   * Adds a listener to the beginning of the listeners array for the specified event.
   */
  prependListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a listener to the beginning of the listeners array for the specified event.
   */
  prependListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: boolean | OnOptions
  ): this;

  /**
   * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.
   */
  once<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.
   */
  once<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: true | OnOptions
  ): this;

  /**
   * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed. The listener is added to the beginning of the listeners array
   */
  prependOnceListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed. The listener is added to the beginning of the listeners array
   */
  prependOnceListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: boolean | OnOptions
  ): this;

  /**
   * Adds a listener that will execute n times for the event before being removed. The listener is invoked only the first n times the event is fired, after which it is removed.
   */
  many<Name extends keyof EventData>(
    event: Name,
    timesToListen: number,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a listener that will execute n times for the event before being removed. The listener is invoked only the first n times the event is fired, after which it is removed.
   */
  many<Name extends keyof EventData>(
    event: Name,
    timesToListen: number,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: boolean | OnOptions
  ): this;

  /**
   * Adds a listener that will execute n times for the event before being removed. The listener is invoked only the first n times the event is fired, after which it is removed. The listener is added to the beginning of the listeners array.
   */
  prependMany<Name extends keyof EventData>(
    event: Name,
    timesToListen: number,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options: OnOptions & { objectify: true }
  ): Listener;

  /**
   * Adds a listener that will execute n times for the event before being removed. The listener is invoked only the first n times the event is fired, after which it is removed. The listener is added to the beginning of the listeners array.
   */
  prependMany<Name extends keyof EventData>(
    event: Name,
    timesToListen: number,
    listener: (...args: ListenerType<EventData[Name]>) => void,
    options?: boolean | OnOptions
  ): this;

  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the callback.
   */
  onAny(listener: EventAndListener): this;

  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the callback. The listener is added to the beginning of the listeners array
   */
  prependAny(listener: EventAndListener): this;

  /**
   * Removes the listener that will be fired when any event is emitted.'
   */
  offAny(listener: ListenerFn): this;

  /**
   * Remove a listener from the listener array for the specified event. Caution: Calling this method changes the array indices in the listener array behind the listener.
   */
  removeListener<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void
  ): this;

  /**
   * Remove a listener from the listener array for the specified event. Caution: Calling this method changes the array indices in the listener array behind the listener.
   */
  off<Name extends keyof EventData>(
    event: Name,
    listener: (...args: ListenerType<EventData[Name]>) => void
  ): this;

  /**
   * Removes all listeners, or those of the specified event.
   */
  removeAllListeners<Name extends keyof EventData>(event?: Name): this;

  /**
   * By default EventEmitters will print a warning if more than 10 listeners are added to it. This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10. This function allows that to be increased. Set to zero for unlimited.
   */
  setMaxListeners(n: number): void;

  /**
   * Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter2.defaultMaxListeners
   */
  getMaxListeners(): number;

  /**
   * Returns an array listing the events for which the emitter has registered listeners.
   *
   * Note: Listeners order not guaranteed
   */
  eventNames<Name extends keyof EventData>(nsAsArray?: boolean): Name[];

  listenerCount<Name extends keyof EventData>(event?: Name): number;

  /**
   * Returns an array of listeners for the specified event. This array can be manipulated, e.g. to remove listeners.
   */
  listeners<Name extends keyof EventData>(event?: Name): ListenerFn[];

  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated, e.g. to remove listeners.
   */
  listenersAny(): ListenerFn[];

  /**
   * Returns a thenable object (promise interface) that resolves when a specific event occurs
   */
  waitFor<Name extends keyof EventData>(
    event: Name,
    timeout?: number
  ): CancelablePromise<ListenerType<EventData[Name]>>;

  /**
   * Returns a thenable object (promise interface) that resolves when a specific event occurs
   */
  waitFor<Name extends keyof EventData>(
    event: Name,
    filter?: WaitForFilter
  ): CancelablePromise<ListenerType<EventData[Name]>>;

  /**
   * Returns a thenable object (promise interface) that resolves when a specific event occurs
   */
  waitFor<Name extends keyof EventData>(
    event: Name,
    options?: WaitForOptions
  ): CancelablePromise<ListenerType<EventData[Name]>>;

  listenTo(
    target: GeneralEventEmitter,
    events: event | eventNS,
    options?: ListenToOptions
  ): this;

  listenTo(
    target: GeneralEventEmitter,
    events: event[],
    options?: ListenToOptions
  ): this;

  listenTo(
    target: GeneralEventEmitter,
    events: object,
    options?: ListenToOptions
  ): this;

  stopListeningTo(
    target?: GeneralEventEmitter,
    event?: event | eventNS
  ): boolean;

  /**
   * Checks whether emitter has any listeners.
   */
  hasListeners<Name extends keyof EventData>(event?: Name): boolean;

  static once(
    emitter: EventEmitter2,
    event: string,
    options?: OnceOptions
  ): CancelablePromise<any[]>;

  static defaultMaxListeners: number;
}
