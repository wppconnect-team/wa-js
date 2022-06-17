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

import { config } from '../config';
import * as conn from '../conn';
import { internalEv } from '../eventEmitter';
import { Tracker } from './Tracker';

export * from './Tracker';

declare const __VERSION__: string;
export const waVersion = __VERSION__;

/**
 * Always keep the main tracker only for version report
 */
const mainTracker = new Tracker('G-MTQ4KY110F');

const otherTracker = config.googleAnalyticsId
  ? new Tracker(config.googleAnalyticsId)
  : null;

internalEv.on('webpack.injected', () => {
  const authenticated = conn.isAuthenticated();
  const method = conn.isMultiDevice() ? 'multidevice' : 'legacy';

  // Add version info
  mainTracker.setUserProperty('method', method);
  mainTracker.setUserProperty('wa_js', waVersion);
  mainTracker.setUserProperty(
    'whatsapp',
    (window as any).Debug?.VERSION || '-'
  );

  mainTracker.trackEvent('page_view', { authenticated, method });

  if (otherTracker) {
    otherTracker.setUserProperty('method', method);
    otherTracker.setUserProperty('wa_js', waVersion);
    otherTracker.setUserProperty(
      'whatsapp',
      (window as any).Debug?.VERSION || '-'
    );

    otherTracker.trackEvent('page_view', { authenticated, method });
  }
});

if (!config.disableGoogleAnalytics) {
  internalEv.on('conn.authenticated', () => {
    const method = conn.isMultiDevice() ? 'multidevice' : 'legacy';
    mainTracker.trackEvent('login', { method });
    if (otherTracker) {
      mainTracker.trackEvent('login', { method });
    }
  });

  internalEv.on('conn.logout', () => {
    const method = conn.isMultiDevice() ? 'multidevice' : 'legacy';
    mainTracker.trackEvent('logout', { method });
    if (otherTracker) {
      otherTracker.trackEvent('logout', { method });
    }
  });
}
