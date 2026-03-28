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
import { editProduct as EditProduct } from '../../whatsapp/functions';

const catalogRemoveProductImageSchema = z.object({
  productId: z.string(),
  index: z.string(),
});

export type CatalogRemoveProductImageInput = z.infer<
  typeof catalogRemoveProductImageSchema
>;

export type CatalogRemoveProductImageOutput = ProductModel;

/**
 * Remove an additional image from a product by its index
 *
 * @example
 * ```javascript
 * await WPP.catalog.removeProductImage({
 *   productId: '[productId]',
 *   index: '0',
 * });
 * ```
 *
 * @category Catalog
 */
export async function removeProductImage(
  params: CatalogRemoveProductImageInput
): Promise<CatalogRemoveProductImageOutput> {
  const { productId, index } = catalogRemoveProductImageSchema.parse(params);

  const product = await assertGetProduct(productId);
  product.additionalImageCdnUrl.splice(index, 1);

  return EditProduct(product);
}
