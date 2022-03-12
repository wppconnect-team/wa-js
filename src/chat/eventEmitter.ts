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

import { MsgKey, Wid } from '../whatsapp';

const debug = Debug('WA-JS:event:chat');

export type UnsubscribeFn = () => void;

export interface EventTypes {
  msg_revoke: {
    /**
     * Author of message, only for groups
     */
    author?: Wid;
    from: Wid;
    /**
     * Message id of revoke event
     */
    id: MsgKey;
    /**
     * Message id of revoked message
     */
    refId: MsgKey;
    to: Wid;
    /**
     * Type of revoke
     */
    type: 'revoke' | 'sender_revoke' | 'admin_revoke';
  };
  msg_ack_change: {
    ack: number;
    /**
     * Who sended the ack, only for groups, broadcast and status
     */
    sender?: Wid;
    /**
     * The chat that sended the messeage
     */
    chat: Wid;
    /**
     * Message id of revoke event
     */
    ids: MsgKey[];
  };
  live_location_start: {
    id: Wid;
    msgId: MsgKey;
    chat: Wid;
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number;
    degrees?: number;
    shareDuration: number;
  };
  live_location_update: {
    id: Wid;
    lastUpdated: number;
    elapsed: number;
    lat: number;
    lng: number;
    accuracy?: number;
    speed?: number;
    degrees?: number;
    comment: string;
  };
  live_location_end: {
    id: Wid;
    chat: Wid;
    seq: number;
  };
}

export const eventEmitter = new Emittery<EventTypes, EventTypes>({
  debug: {
    name: 'ChatEvent',
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
