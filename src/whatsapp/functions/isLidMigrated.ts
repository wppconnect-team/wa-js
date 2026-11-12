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

import { injectFallbackModule } from '../../loader';
import { exportModule } from '../exportModule';
import { readLegacyLidMigration } from '../legacyLidMigration';

/**
 * @deprecated The native account migration flag was removed in newer WhatsApp
 * versions. Throws legacy_lid_migration_unavailable when it is not available.
 * The pure-LID session flag does not represent the same state.
 */
export declare function isLidMigrated(): boolean;

exportModule(
  exports,
  { isLidMigrated: ['Lid1X1MigrationUtils.isLidMigrated', 'isLidMigrated'] },
  (m, id) =>
    typeof m.Lid1X1MigrationUtils?.isLidMigrated === 'function' ||
    id === 'fallback_isLidMigrated'
);

injectFallbackModule('isLidMigrated', {
  isLidMigrated: readLegacyLidMigration,
});
