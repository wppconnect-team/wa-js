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
  /** @deprecated The native getter is absent in newer WhatsApp versions. */
  function isLidMigrated(): boolean;
  /** @deprecated Native migration setter retained for type compatibility. */
  function setIsLidMigrated(a?: any): any;
  function isPureLidSyncDSession(): boolean | null | undefined;
  function isSyncdSessionMigrated(): boolean;
  function shouldApplyNonMigratedMessagingRules(): any;
}

exportModule(
  exports,
  {
    Lid1X1MigrationUtils: 'Lid1X1MigrationUtils',
  },
  (m) =>
    typeof m.Lid1X1MigrationUtils?.isLidMigrated === 'function' ||
    typeof m.Lid1X1MigrationUtils?.isPureLidSyncDSession === 'function'
);
