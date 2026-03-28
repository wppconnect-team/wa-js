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

import { z } from 'zod';

import { updateCartEnabled as UpdateCartEnabled } from '../../whatsapp/functions';

const catalogUpdateCartEnabledSchema = z.object({
  enabled: z.boolean(),
});

export type CatalogUpdateCartEnabledInput = z.infer<
  typeof catalogUpdateCartEnabledSchema
>;

export type CatalogUpdateCartEnabledOutput = void;

/**
 * Enable or disable the cart feature in your catalog
 *
 * @example
 * ```javascript
 * // Enable cart
 * await WPP.catalog.updateCartEnabled({ enabled: true });
 *
 * // Disable cart
 * await WPP.catalog.updateCartEnabled({ enabled: false });
 * ```
 *
 * @category Catalog
 */
export async function updateCartEnabled(
  params: CatalogUpdateCartEnabledInput
): Promise<CatalogUpdateCartEnabledOutput> {
  const { enabled } = catalogUpdateCartEnabledSchema.parse(params);

  return await UpdateCartEnabled(enabled);
}
