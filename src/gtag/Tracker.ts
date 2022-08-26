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

import { debounce } from 'typescript-debounce-decorator';

function randomNumber(min = 0, max = 2147483647) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * [Tracker description]
 *
 * @see https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/
 */
export class Tracker {
  static collectURL = 'https://www.google-analytics.com/g/collect';
  static pageLoadHash = randomNumber();

  static get clientState() {
    const firstVisit = !localStorage['cid'];

    const cid =
      localStorage['cid'] ||
      sessionStorage['cid'] ||
      randomNumber(1000000000) + '.' + Math.floor(Date.now() / 1000);

    localStorage['cid'] = sessionStorage['cid'] = cid;

    return { firstVisit, cid };
  }

  private events: [
    string,
    Record<string, string | number | boolean> | undefined,
    number
  ][] = [];
  private userProperties: { [key: string]: any } = {};

  private lastTime = Date.now();
  private hitsCount = 1;

  constructor(readonly trackingId: string) {}

  private get sid() {
    const sid_key = `${this.trackingId}_sid`;

    const sid = sessionStorage[sid_key] || Math.floor(Date.now() / 1000);

    sessionStorage[sid_key] = sid;

    return sid;
  }

  private get sct() {
    const sct_key = `${this.trackingId}_sct`;
    let count = parseInt(localStorage[sct_key]);

    if (isNaN(count)) {
      count = 0;
    }

    localStorage[sct_key] = count + 1;

    return localStorage[sct_key];
  }

  private getHeader() {
    const { cid, firstVisit } = Tracker.clientState;

    return {
      v: 2, // Protocol Version
      tid: this.trackingId, // Measurement ID
      _p: Tracker.pageLoadHash, // Screen Resolution
      cid: cid, // Client ID
      _fv: firstVisit ? 1 : void 0, // Client ID
      ul: (navigator.language || '').toLowerCase() || void 0, // User Language
      sr: `${screen.width}x${screen.height}`,
      _s: this.hitsCount++, // Session Hits count
      sid: this.sid, // Session ID
      sct: this.sct, // Session Count
      seg: 1, // Session Engaged
      dl: location.href, // Document location
      dr: document.referrer, // Document referrer
      dt: document.title, // Document title
      //   _dbg: 1, // Debug
    };
  }

  /**
   * Get the current user properties
   */
  private getUserProperties() {
    const userProperties = this.userProperties;
    this.userProperties = {};

    const data = Object.entries(userProperties)
      .filter(([, v]) => typeof v !== 'undefined')
      .map(([k, v]) => {
        if (typeof v === 'number') {
          return [`upn.${k}`, String(v)];
        }
        return [`up.${k}`, String(v)];
      });

    return data;
  }

  /**
   * Process all queued events
   */
  @debounce(1000)
  private processEvents() {
    const events = this.events;
    this.events = [];

    if (!events.length) {
      return;
    }

    const eventsData = events.map(([name, params, time]) => {
      const data: [string, string][] = [];

      data.push(['en', name]);
      data.push(['_ee', '1']);

      if (params) {
        for (const k in params) {
          const v = params[k];
          if (typeof v === 'undefined') {
            continue;
          } else if (typeof v === 'number') {
            data.push([`epn.${k}`, String(v)]);
          } else {
            data.push([`ep.${k}`, String(v)]);
          }
        }
      }

      data.push(['_et', String(time)]);

      return data;
    });

    const header = Object.entries(this.getHeader())
      .filter(([, v]) => typeof v !== 'undefined')
      .map(([k, v]) => [k, String(v)]);

    header.push(...this.getUserProperties());

    const url = new URLSearchParams(header);

    if (eventsData.length === 1) {
      for (const [k, v] of eventsData[0]) {
        url.append(k, v);
      }
      navigator.sendBeacon(`${Tracker.collectURL}?${url.toString()}`);
    } else {
      // Send a batch of events
      const data = eventsData.map((e) => new URLSearchParams(e).toString());

      navigator.sendBeacon(
        `${Tracker.collectURL}?${url.toString()}`,
        data.join('\n')
      );
    }
  }

  /**
   * Send a user engagement each 5 minutes
   */
  @debounce(300000)
  private processUserEngagement() {
    this.trackEvent('user_engagement');
  }

  public trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) {
    const now = Date.now();
    const time = now - this.lastTime;
    this.lastTime = now;

    this.events.push([eventName, params, time]);
    this.processEvents();
    this.processUserEngagement();
  }

  public setUserProperty(key: string, value: any) {
    this.userProperties[key] = value;
    this.trackEvent('user_engagement');
  }
}
