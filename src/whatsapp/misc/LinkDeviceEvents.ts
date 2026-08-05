/*!
 * Copyright 2026 WPPConnect Team
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
import { EventEmitter } from './EventEmitter';

export type LinkDeviceEvent =
  | 'link_device_events:error_alt_linking'
  | 'link_device_events:force_manual_refresh'
  | 'link_device_events:primary_hello_received'
  | 'link_device_events:refresh_alt_linking_code';

/** @whatsapp WAWebLinkDeviceEvents */
export declare class LinkDeviceEventsClass extends EventEmitter {
  on(eventName: LinkDeviceEvent, listener: () => void, context?: any): this;
  off(eventName: LinkDeviceEvent, listener: () => void, context?: any): this;
}

/** @whatsapp WAWebLinkDeviceEvents */
export declare const LinkDeviceEvents: LinkDeviceEventsClass;

exportModule(
  exports,
  {
    LinkDeviceEvents: 'WAWebLinkDeviceEvents',
  },
  (m, id) =>
    id === 'WAWebLinkDeviceEvents' ||
    m.WAWebLinkDeviceEvents?.triggerRefreshAltLinkingCode
);
