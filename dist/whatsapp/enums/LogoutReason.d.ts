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
/** @whatsapp 83578
 * @whatsapp 88950 >= 2.2218.4
 * @whatsapp 788950 >= 2.2222.8
 * @whatsapp WAWebLogoutReasonConstants >= 2.3000.x
 */
export declare enum LogoutReason {
    UserInitiated = "user_initiated",
    SyncdFailure = "syncd_failure",
    InvalidAdvStatus = "invalid_adv_status",
    CriticalSyncTimeout = "critical_sync_timeout",
    SyncdTimeout = "syncd_timeout",
    HistorySyncTimeout = "history_sync_timeout",
    AccountSyncTimeout = "account_sync_timeout",
    MDOptOut = "md_opt_out",
    UnknownCompanion = "unknown_companion",
    ClientVersionOutdated = "client_version_outdated",
    SyncdErrorDuringBootstrap = "syncd_error_during_bootstrap",
    AccountSyncError = "account_sync_error",
    ClientFatalError = "client_fatal_error",
    StorageQuotaExceeded = "storage_quota_exceeded",
    PrimaryIdentityKeyChange = "primary_identity_key_change",
    MissingEncSalt = "missing_enc_salt",
    MissingScreenLockSalt = "missing_screen_lock_salt",
    AccountLocked = "account_locked",
    UNKNOWN = "unknown"
}
export declare enum LOGOUT_REASON_CODE {
    CLIENT_FATAL = "0",
    SYNC_FAIL = "1",
    INITIAL_HISTORY_SYNC_TIMEOUT = "2",
    ACCOUNT_LOCKED = "3"
}
