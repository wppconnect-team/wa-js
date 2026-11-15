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

import * as loader from '../loader';
import { WPPError } from '../util';
import { exportModule, wrapModuleFunction } from './exportModule';

const guarded = new WeakSet<object>();
// searchId caches by predicate identity; keep repeated state reads bounded.
const hasLegacyGetter: loader.SearchModuleCondition = (m, id) =>
  !id.startsWith('fallback_') &&
  typeof m.Lid1X1MigrationUtils?.isLidMigrated === 'function';

/** TODO: remove when versions exposing the legacy getter leave wa-version/html. */
export function guardLegacyLidMigration(): void {
  const moduleId = loader.searchId(hasLegacyGetter);
  if (!moduleId) return;
  const native = loader.loadModule(moduleId).Lid1X1MigrationUtils;
  if (guarded.has(native)) return;

  // Register the function path before replacing it so the replacement retains
  // the loader metadata, even if the public getter has already been resolved.
  const binding: { isLidMigrated?: () => boolean } = {};
  exportModule(
    binding,
    { isLidMigrated: 'Lid1X1MigrationUtils.isLidMigrated' },
    (_m, id) => id === moduleId
  );
  wrapModuleFunction(binding.isLidMigrated!, (original, ...args) => {
    try {
      return original(...args);
    } catch (_error) {
      return false;
    }
  });
  guarded.add(native);
}

export function readLegacyLidMigration(): boolean {
  guardLegacyLidMigration();
  const moduleId = loader.searchId(hasLegacyGetter);
  if (!moduleId) {
    throw new WPPError(
      'legacy_lid_migration_unavailable',
      'The legacy LID migration flag is not available in this WhatsApp version'
    );
  }
  return loader.loadModule(moduleId).Lid1X1MigrationUtils.isLidMigrated();
}
