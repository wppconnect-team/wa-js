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
import { EventEmitter } from './eventEmitter';
import { EventTypes } from './eventTypes';
export * from './eventTypes';
export declare const internalEv: EventEmitter<EventTypes>;
export declare const ev: EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export { EventEmitter };
export declare const addListener: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
})[Name]>) => void) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}> | import("eventemitter2").Listener;
export declare const emit: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, ...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
})[Name]>) => boolean;
export declare const emitAsync: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, ...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
})[Name]>) => Promise<any[]>;
export declare const eventNames: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(nsAsArray?: boolean) => Name[];
export declare const getMaxListeners: () => number;
export declare const hasListeners: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event?: Name | undefined) => boolean;
export declare const listenTo: {
    (target: import("eventemitter2").GeneralEventEmitter, events: import("eventemitter2").event | import("eventemitter2").eventNS, options?: import("eventemitter2").ListenToOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
    (target: import("eventemitter2").GeneralEventEmitter, events: import("eventemitter2").event[], options?: import("eventemitter2").ListenToOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
    (target: import("eventemitter2").GeneralEventEmitter, events: object, options?: import("eventemitter2").ListenToOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const listenerCount: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event?: Name | undefined) => number;
export declare const listeners: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event?: Name | undefined) => import("eventemitter2").ListenerFn[];
export declare const listenersAny: () => import("eventemitter2").ListenerFn[];
export declare const many: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, timesToListen: number, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, timesToListen: number, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: boolean | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const off: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
})[Name]>) => void) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const offAny: (listener: import("eventemitter2").ListenerFn) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const on: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: boolean | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const onAny: (listener: import("eventemitter2").EventAndListener) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const once: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: true | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const prependAny: (listener: import("eventemitter2").EventAndListener) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const prependListener: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: boolean | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const prependMany: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, timesToListen: number, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, timesToListen: number, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: boolean | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const prependOnceListener: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options: import("./eventEmitter").OnOptions & {
        objectify: true;
    }): import("eventemitter2").Listener;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>) => void, options?: boolean | import("./eventEmitter").OnOptions): EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    }>;
};
export declare const removeAllListeners: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event?: Name | undefined) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const removeListener: <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, listener: (...args: import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
})[Name]>) => void) => EventEmitter<import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
    alfa: string;
    beta: (from: number, to: string) => void;
}>;
export declare const setMaxListeners: (n: number) => void;
export declare const stopListeningTo: (target?: import("eventemitter2").GeneralEventEmitter, event?: import("eventemitter2").event | import("eventemitter2").eventNS) => boolean;
export declare const waitFor: {
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, timeout?: number): import("eventemitter2").CancelablePromise<import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>>;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, filter?: import("./eventEmitter").WaitForFilter): import("eventemitter2").CancelablePromise<import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>>;
    <Name extends "config.update" | "blocklist.sync" | "call.incoming_call" | keyof import("./eventTypes").ChatEventTypes | keyof import("./eventTypes").ConnEventTypes | "group.participant_changed" | "order.payment_status" | "status.sync" | keyof import("./eventTypes").WebpackEvents | "alfa" | "beta">(event: Name, options?: import("eventemitter2").WaitForOptions): import("eventemitter2").CancelablePromise<import("./eventEmitter").ListenerType<(import("./eventTypes").BlocklistEventTypes & import("./eventTypes").CallEventTypes & import("./eventTypes").ChatEventTypes & import("./eventTypes").ConfigEventTypes & import("./eventTypes").ConnEventTypes & import("./eventTypes").GroupEventTypes & import("./eventTypes").OrderEventTypes & import("./eventTypes").StatusEventTypes & import("./eventTypes").WebpackEvents & {
        alfa: string;
        beta: (from: number, to: string) => void;
    })[Name]>>;
};
