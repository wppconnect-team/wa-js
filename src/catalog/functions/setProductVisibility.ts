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

import { assertGetProduct } from '../../assert';
import { ProductModel } from '../../whatsapp';
import { productVisibilitySet } from '../../whatsapp/functions';

const catalogSetProductVisibilitySchema = z.object({
  productId: z.string(),
  isHidden: z.boolean(),
});

export type CatalogSetProductVisibilityInput = z.infer<
  typeof catalogSetProductVisibilitySchema
>;

export type CatalogSetProductVisibilityOutput = ProductModel;

/**
 * Show or hide a product in your catalog
 *
 * @example
 * ```javascript
 * // Hide a product
 * await WPP.catalog.setProductVisibility({ productId: '[productId]', isHidden: true });
 *
 * // Make a product visible
 * await WPP.catalog.setProductVisibility({ productId: '[productId]', isHidden: false });
 * ```
 *
 * @category Catalog
 */
export async function setProductVisibility(
  params: CatalogSetProductVisibilityInput
): Promise<CatalogSetProductVisibilityOutput> {
  const { productId, isHidden } =
    catalogSetProductVisibilitySchema.parse(params);

  await productVisibilitySet(productId, isHidden);
  return await assertGetProduct(productId);
}
