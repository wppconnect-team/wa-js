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

/** @whatsapp 15688
 */
export declare namespace Lid1X1MigrationUtils {
  /** Removed in WA >= 2.3000.1054281195 */
  const isLidMigrated: (() => boolean) | undefined;
  function isPureLidSyncDSession(): boolean | null | undefined;
  function isSyncdSessionMigrated(): boolean;
  function setIsLidMigrated(a?: any): any;
  function shouldApplyNonMigratedMessagingRules(): any;
}

exportModule(
  exports,
  {
    Lid1X1MigrationUtils: 'Lid1X1MigrationUtils',
  },
  // isLidMigrated was removed in WA >= 2.3000.1054281195
  (m) =>
    m.Lid1X1MigrationUtils?.isLidMigrated ||
    m.Lid1X1MigrationUtils?.isPureLidSyncDSession
);
