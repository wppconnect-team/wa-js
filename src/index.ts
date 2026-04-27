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

/* eslint-disable simple-import-sort/exports */
import './config';
import './deviceName';
import './gtag';

import * as loader from './loader';

export { isFullReady, isInjected, isReady } from './loader';
export { loader };

export { config, Config } from './config';

export * as blocklist from './blocklist';
export * as call from './call';
export * as cart from './cart';
export * as catalog from './catalog';
export * as chat from './chat';
export * as community from './community';
export * as conn from './conn';
export * as contact from './contact';
export * as ev from './eventEmitter';
export * as group from './group';
export * as indexdb from './indexdb';
export * as labels from './labels';
export * as newsletter from './newsletter';
export * as order from './order';
export * as privacy from './privacy';
export * as profile from './profile';
export * as status from './status';
export * as util from './util';
export * as whatsapp from './whatsapp';

export {
  emit,
  emitAsync,
  eventNames,
  getMaxListeners,
  hasListeners,
  listenerCount,
  listeners,
  listenersAny,
  listenTo,
  many,
  off,
  offAny,
  on,
  onAny,
  once,
  prependAny,
  prependListener,
  prependMany,
  prependOnceListener,
  removeAllListeners,
  removeListener,
  setMaxListeners,
  stopListeningTo,
  waitFor,
} from './eventEmitter';

declare const __VERSION__: string;
declare const __SUPPORTED_WHATSAPP_WEB__: string;
export const version = __VERSION__;
export const supportedWhatsappWeb = __SUPPORTED_WHATSAPP_WEB__;
export const license = 'Apache-2.0';

loader.injectLoader();
