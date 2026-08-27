/*!
 * Copyright 2026 WPPConnect Team
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

import { ensureLazyModule } from '../loader';
import { WPPError } from '../util';

/**
 * Resolve one of `WAWebGroupCommunityJob`'s functions, bootloading its bundle
 * first.
 *
 * From WA ~2.3000.1045986927 the module moved out of the eagerly loaded
 * bundles into a resource bundle the Bootloader only fetches on demand, and
 * every component that pulls it is a `.react` flow. A session that never opens
 * the community UI therefore never registers the module: `searchId()` cannot
 * find it however many times it re-scans and the binding stays `undefined` for
 * the whole life of the page.
 *
 * The binding has to be read *after* the bundle is in place, hence the thunk —
 * passing the function itself would evaluate the getter too early.
 *
 * @param getter Reads the binding once the module is registered
 */
export async function ensureCommunityJob<T>(getter: () => T): Promise<T> {
  await ensureLazyModule('WAWebGroupCommunityJob');

  const fn = getter();

  if (typeof fn !== 'function') {
    throw new WPPError(
      'community_function_not_available',
      "WhatsApp's community functions are not available in this session"
    );
  }

  return fn;
}
