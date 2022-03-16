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

import { exportModule } from '../exportModule';

/** @whatsapp 13194 */
export declare function isAuthenticated(): boolean;

/**
 * @whatsapp 13194
 * whatsapp >= 2.2208.11
 */
export declare function isLoggedIn(): boolean;

exportModule(
  exports,
  {
    isAuthenticated: (m) => m.isLoggedIn || m.Z,
    isLoggedIn: (m) => m.isLoggedIn || m.Z,
  },
  (m) =>
    (m.Z?.toString().includes('isRegistered') &&
      m.Z?.toString().includes('getLoginTokens')) ||
    m.isLoggedIn // whatsapp >= 2.2208.11
);
