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

import { exportModule } from '../exportModule';

/**
 * The name of the event.
 */
type Event = string | symbol;

/**
 * The callback function.
 */
type Listener = (...args: any[]) => void;

/** @whatsapp 2.2147.14:95863 */
export declare class EventEmitter {
  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   *
   * @param eventName The name of the event.
   * @param listener The callback function.
   * @param context The value of `this` provided for the call to `listener`
   * @returns Returns a reference to the `EventEmitter`, so that calls can be chained.
   */
  on(eventName: Event, listener: Listener, context?: any): this;

  /**
   * Adds a one-time listener function for the event named eventName.
   *
   * @param eventName The name of the event.
   * @param listener The callback function.
   * @param context The value of `this` provided for the call to `listener`
   * @returns Returns a reference to the `EventEmitter`, so that calls can be chained.
   */
  once(eventName: Event, listener: Listener, context?: any): this;

  /**
   * Removes the specified listener from the listener array for the event named eventName.
   *
   * @param eventName The name of the event.
   * @param listener The callback function.
   * @param context The value of `this` provided for the call to `listener`
   * @returns Returns a reference to the `EventEmitter`, so that calls can be chained.
   */
  off(eventName?: Event, listener?: Listener, context?: any): this;

  /**
   * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
   * @returns Returns a reference to the `EventEmitter`, so that calls can be chained.
   */
  trigger(eventName: Event, ...args: any[]): this;

  stopListening(context?: any, eventName?: Event, listener?: Listener): this;

  /**
   * @param context The value of `this` provided for the call to `listener`
   * @param eventName The name of the event.
   * @param listener The callback function.
   */
  listenTo(context: any, eventName: Event, listener?: Listener): this;

  /**
   * @param context The value of `this` provided for the call to `listener`
   * @param eventName The name of the event.
   * @param listener The callback function.
   */
  listenToOnce(context: any, eventName: Event, listener?: Listener): this;

  /**
   * @param context The value of `this` provided for the call to `listener`
   * @param eventName The name of the event.
   * @param listener The callback function.
   */
  listenToAndRun(context: any, eventName: Event, listener?: Listener): this;

  isListening(eventName: Event): boolean;

  /**
   * Alias of `on`
   * @alias on
   */
  bind(eventName: Event, listener: Listener, context?: any): this;

  /**
   * Alias of `off`
   * @alias off
   */
  unbind(eventName?: Event, listener?: Listener, context?: any): this;
  /**
   * Alias of `off`
   * @alias off
   */
  removeListener(eventName?: Event, listener?: Listener, context?: any): this;
  /**
   * Removes all listeners.
   * @returns Returns a reference to the `EventEmitter`, so that calls can be chained.
   */
  removeAllListeners(): this;
  /**
   * Alias of `trigger`
   * @alias trigger
   */
  emit(eventName: Event, ...args: any[]): this;
}

exportModule(
  exports,
  {
    EventEmitter: 'default',
  },
  (m) =>
    m.default.toString().includes('Callback parameter passed is not a function')
);
