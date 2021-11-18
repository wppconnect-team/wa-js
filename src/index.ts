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
/* eslint-disable simple-import-sort/imports */
import './config';

import './deviceName';
import './patch';

import * as webpack from './webpack';

export { webpack };
export { isInjected, isReady } from './webpack';

export * as config from './config';
export * as internal from './internal';

export { default as auth } from './auth';
export { default as blocklist } from './blocklist';
export { default as chat } from './chat';
export { default as contact } from './contact';
export { default as group } from './group';
export { default as status } from './status';

export * as whatsapp from './whatsapp';

declare const __VERSION__: string;
export const version = __VERSION__;
export const license = 'Apache-2.0';

webpack.injectLoader();
