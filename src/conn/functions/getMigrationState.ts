/*!
 * Copyright 2025 WPPConnect Team
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

import { isLidMigrated, shouldHaveAccountLid } from '../../whatsapp/functions';
import { Lid1X1MigrationUtils, UserPrefs, Wid } from '../../whatsapp/misc';

/**
 * Migration state information for the current WhatsApp account
 */
export interface MigrationState {
  /** Whether the account has been migrated to LID (Linked Identity) system */
  isLidMigrated: boolean;
  /** Whether the sync session has been migrated */
  isSyncdSessionMigrated: boolean;
  /** Whether old messaging rules should still be applied */
  shouldApplyNonMigratedMessagingRules: boolean;
  /** Whether the account should have an account LID */
  shouldHaveAccountLid: boolean;
  /** The current user's LID, if available */
  currentLid?: Wid;
  /** The current user's PN, if available */
  currentPn?: Wid;
}

/**
 * Get comprehensive migration state information for debugging and monitoring
 *
 * This function aggregates various LID (Linked Identity) migration-related
 * information to help understand the current state of the account's migration
 * from the legacy @c.us addressing system to the newer @lid system.
 *
 * @returns Object containing all available migration state information
 *
 * @example
 * ```typescript
 * const state = WPP.conn.getMigrationState();
 * console.log('Account migrated:', state.isLidMigrated);
 * console.log('Current LID:', state.currentLid);
 * console.log('Should have LID:', state.shouldHaveAccountLid);
 * ```
 * @category Connection
 */
export function getMigrationState(): MigrationState {
  const state: MigrationState = {
    isLidMigrated: false,
    isSyncdSessionMigrated: false,
    shouldApplyNonMigratedMessagingRules: false,
    shouldHaveAccountLid: false,
  };

  try {
    // Get basic migration flags
    state.isLidMigrated = isLidMigrated();
  } catch (_) {
    console.warn('isLidMigrated function is not available');
  }

  try {
    state.isSyncdSessionMigrated =
      Lid1X1MigrationUtils.isSyncdSessionMigrated();
  } catch (_) {
    console.warn('isSyncdSessionMigrated function is not available');
  }

  try {
    state.shouldApplyNonMigratedMessagingRules =
      Lid1X1MigrationUtils.shouldApplyNonMigratedMessagingRules();
  } catch (_) {
    console.warn(
      'shouldApplyNonMigratedMessagingRules function is not available'
    );
  }

  try {
    state.shouldHaveAccountLid = shouldHaveAccountLid();
  } catch (_) {
    console.warn('shouldHaveAccountLid function is not available');
  }

  // Try to get current LID
  try {
    // Get me user's WID (without device ID)
    state.currentLid = UserPrefs.getMaybeMeLidUser();
  } catch (_) {
    console.warn('getMaybeMeLidUser function is not available');
  }

  // Try to get current PN
  try {
    // Get me user's WID (without device ID)
    state.currentPn = UserPrefs.getMaybeMePnUser();
  } catch (_) {
    console.warn('getMaybeMePnUser function is not available');
  }

  return state;
}
