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

// eslint-disable-next-line simple-import-sort/imports
import './config';

import './deviceName';
import './patch';

import auth from './auth';
import blocklist from './blocklist';
import chat from './chat';
import group from './group';
import status from './status';
import * as webpack from './webpack';

export { auth, blocklist, chat, group, status, webpack };

export * as Auth from './auth';
export * as Chat from './chat';
export * as config from './config';
export * as Group from './group';
export * as Status from './status';
export { isInjected, isReady } from './webpack';
export * as whatsapp from './whatsapp';

webpack.injectLoader();
