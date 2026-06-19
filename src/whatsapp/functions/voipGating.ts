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

/**
 * @whatsapp WAWebVoipGatingUtils
 */
export declare function isCallingEnabled(): boolean;
export declare function isUnsupportedBrowserForWebCalling(): boolean;
export declare function isVoipDownloadEnabled(): boolean;
export declare function getUnsupportedBrowserReason(): string | null;

exportModule(
  exports,
  {
    isCallingEnabled: 'isCallingEnabled',
    isUnsupportedBrowserForWebCalling: 'isUnsupportedBrowserForWebCalling',
    isVoipDownloadEnabled: 'isVoipDownloadEnabled',
    getUnsupportedBrowserReason: 'getUnsupportedBrowserReason',
  },
  (m) => m.isCallingEnabled && m.isVoipDownloadEnabled
);
