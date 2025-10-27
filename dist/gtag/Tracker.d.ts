/*!
 * Copyright 2022 WPPConnect Team
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
/**
 * [Tracker description]
 *
 * @see https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/
 */
export declare class Tracker {
    readonly trackingId: string;
    static collectURL: string;
    static pageLoadHash: number;
    static get clientState(): {
        firstVisit: boolean;
        cid: any;
    };
    private events;
    private userProperties;
    private lastTime;
    private hitsCount;
    documentTitle: string;
    constructor(trackingId: string);
    private get sid();
    private get sct();
    private getHeader;
    /**
     * Get the current user properties
     */
    private getUserProperties;
    /**
     * Process all queued events
     */
    private processEvents;
    /**
     * Send a user engagement each 5 minutes
     */
    private processUserEngagement;
    trackEvent(eventName: string, params?: Record<string, string | number | boolean>): void;
    setUserProperty(key: string, value: any): void;
}
