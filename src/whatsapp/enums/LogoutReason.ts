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

/** @whatsapp 2.2142.12:82735 */
export declare enum LogoutReason {
  USER_INITIATED = 'user_initiated',
  SYNCD_FAILURE = 'syncd_failure',
  CRITICAL_SYNC_TIMEOUT = 'critical_sync_timeout',
  UNKNOWN_COMPANION = 'unknown_companion',
  CLIENT_VERSION_OUTDATED = 'client_version_outdated',
  SYNCD_ERROR_DURING_BOOTSTRAP = 'syncd_error_during_bootstrap',
  ACCOUNT_SYNC_ERROR = 'account_sync_error',
  CLIENT_FATAL_ERROR = 'client_fatal_error',
  UNKNOWN = 'unknown',
}

exportModule(
  exports,
  {
    LogoutReason: 'LogoutReason',
  },
  (m) => m.LogoutReason
);
