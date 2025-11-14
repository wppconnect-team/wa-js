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

import { Lid1X1MigrationUtils, UserPrefs, Wid } from '../misc';
import { isLidMigrated } from './isLidMigrated';
import { shouldHaveAccountLid } from './shouldHaveAccountLid';

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
 * const state = WPP.whatsapp.functions.getMigrationState();
 * console.log('Account migrated:', state.isLidMigrated);
 * console.log('Current LID:', state.currentLid);
 * console.log('Should have LID:', state.shouldHaveAccountLid);
 * ```
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
    // Function might not be available
  }

  try {
    state.isSyncdSessionMigrated =
      Lid1X1MigrationUtils.isSyncdSessionMigrated();
  } catch (_) {
    // Function might not be available
  }

  try {
    state.shouldApplyNonMigratedMessagingRules =
      Lid1X1MigrationUtils.shouldApplyNonMigratedMessagingRules();
  } catch (_) {
    // Function might not be available
  }

  try {
    state.shouldHaveAccountLid = shouldHaveAccountLid();
  } catch (_) {
    // Function might not be available
  }

  // Try to get current LID and PN
  try {
    // Get me user's WID
    const [pnWid, lidWid] = UserPrefs.getMePNandLIDWids();
    state.currentLid = lidWid;
    state.currentPn = pnWid;
  } catch (_) {
    // Functions might not be available or migration not complete
  }

  return state;
}
