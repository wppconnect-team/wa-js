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
import Emittery from 'emittery';

import { AuthCode } from '.';

const debug = Debug('WA-JS:event:conn');

export type UnsubscribeFn = () => void;

export interface EventTypes {
  auth_code_change: AuthCode | null;
  /**
   * Triggered afted a success QR code scan
   *
   * @example
   * ```javascript
   * WPP.conn.on('authenticated', () => {
   *   // Your code
   * });
   * ```
   */
  authenticated: undefined;
  logout: undefined;
  /**
   * Triggered when the main interface is loaded, but is syncing
   *
   * @example
   * ```javascript
   * WPP.conn.on('main_loaded', () => {
   *   // Your code
   * });
   * ```
   */
  main_loaded: undefined;
  /**
   * Triggered when the main interface is loaded, authenticated and ready to send message
   *
   * @example
   * ```javascript
   * WPP.conn.on('main_ready', () => {
   *   // Your code
   * });
   * ```
   */
  main_ready: undefined;
  qrcode_idle: undefined;
  require_auth: undefined;
}

export const eventEmitter = new Emittery<EventTypes, EventTypes>({
  debug: {
    name: 'ConnEvent',
    enabled: debug.enabled,
    logger: (type, debugName, eventName, eventData) => {
      debug(eventName, eventData);
    },
  },
});

eventEmitter.bindMethods(exports);

/**
 * Subscribe to one event.
 * @event
 * @returns An unsubscribe method.
 */
export declare function on<Name extends keyof EventTypes>(
  eventName: Name,
  listener: (eventData: EventTypes[Name]) => void | Promise<void>
): UnsubscribeFn;

/**
 * Subscribe to one or more events only once. It will be unsubscribed after the first event.
 * @event
 */
export declare function once<Name extends keyof EventTypes>(
  eventName: Name
): Promise<EventTypes[Name]>;

/**
 * @event
 */
export declare function off<Name extends keyof EventTypes>(
  eventName: Name,
  listener: (eventData: EventTypes[Name]) => void | Promise<void>
): void;

/**
 * Clear all event listeners on the instance.
 *
 * If `eventName` is given, only the listeners for that event are cleared.
 *
 * @event
 */
export declare function clearListeners<Name extends keyof EventTypes>(
  eventName?: Name | Name[]
): void;

/**
 * The number of listeners for the `eventName` or all events if not specified.
 * @event
 */
export declare function listenerCount<Name extends keyof EventTypes>(
  eventName?: Name | Name[]
): number;
