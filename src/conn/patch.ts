/*!
 * Copyright 2024 WPPConnect Team
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

import * as loader from '../loader';
import { IsOfficialClient } from '../whatsapp';
import { SANITIZED_VERSION_STR } from '../whatsapp/contants';

loader.onInjected(() => {
  /**
   * When sending logs to the WhatsApp server, it will always report that the ocVersion is true.
   */
  IsOfficialClient.isOfficialClient = true;

  /**
   * WhatsApp only sets window.Debug late in the app boot and gates it
   * behind a gatekeeper (gk 26258), so it can be absent or delayed.
   * Expose it early for consumers that rely on Debug.VERSION, keeping
   * the native object when it exists.
   */
  const global = self as any;
  if (!global.Debug?.VERSION && SANITIZED_VERSION_STR) {
    global.Debug = {
      ...global.Debug,
      VERSION: SANITIZED_VERSION_STR,
    };
  }
});
