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

/**
 * Google Analytics 4
 * @see https://www.optimizesmart.com/what-is-measurement-protocol-in-google-analytics-4-ga4/
 */

import * as conn from './conn';
import { internalEv } from './eventEmitter';
import { config } from './config';

declare const __VERSION__: string;
export const version = __VERSION__;

const id = config.googleAnalyticsId;

const endPoint = 'https://www.google-analytics.com/g/collect';

let session_hits = 0;

function randomNumber() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

function getUserId() {
  const userId =
    localStorage.getItem('cid') ||
    randomNumber() + '.' + Math.floor(Date.now() / 1000);

  localStorage.setItem('cid', userId);

  return userId;
}

const eventModel: Record<string, string> = {
  v: '2', // Protocol Version
  tid: id, // Measurement ID
  sr: screen.width + 'x' + screen.height, // Screen Resolution
  ul: (navigator.language || '').toLowerCase(), // User Language
  cid: getUserId(), // Client ID
  dl: location.href, // Document location
  dr: document.referrer, // Document referrer
  dt: document.querySelector('title')?.innerText || 'WhatsApp', // Document title
  sid: String(Math.floor(Date.now() / 1000)), // Session ID
  seg: '1', // Session Engaged
  sct: '1', // Session Count
  _s: '1', // Session Hits count
};

function sendBeacon(data: Record<string, string>) {
  const queryString = new URLSearchParams(data);

  navigator.sendBeacon(`${endPoint}?${queryString.toString()}`);
}

function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  const data: Record<string, string> = {
    ...eventModel,
    en: eventName, // Event Name
    _s: String(session_hits++),
  };

  for (const k in params) {
    const v = params[k];

    switch (typeof v) {
      case 'boolean':
      case 'string':
        data[`ep.${k}`] = String(v);
        break;
      case 'number':
        data[`epn.${k}`] = String(v);
        break;
    }
  }

  sendBeacon(data);
}

if (!config.disableGoogleAnalytics) {
  internalEv.on('webpack.injected', () => {
    // Add version info
    eventModel['up.wa_js'] = version;
    eventModel['up.whatsapp'] = (window as any).Debug?.VERSION || '-';

    const authenticated = conn.isAuthenticated();

    trackEvent('page_view', { authenticated });
  });

  internalEv.on('conn.authenticated', () => {
    const method = conn.isMultiDevice() ? 'multidevice' : 'legacy';
    trackEvent('login', { method });
  });

  internalEv.on('conn.logout', () => {
    const method = conn.isMultiDevice() ? 'multidevice' : 'legacy';
    trackEvent('logout', { method });
  });
}
