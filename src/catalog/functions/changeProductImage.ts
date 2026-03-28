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
import { convertToFile } from '../../util';
import { OpaqueData } from '../../whatsapp';
import {
  calculateFilehashFromBlob,
  editProduct as EditProduct,
  uploadProductImage as UploadProductImage,
} from '../../whatsapp/functions';

const catalogChangeProductImageSchema = z.object({
  productId: z.string(),
  content: z.string(),
});

export type CatalogChangeProductImageInput = z.infer<
  typeof catalogChangeProductImageSchema
>;

export type CatalogChangeProductImageOutput = any;

/**
 * Replace the main image of a product
 *
 * @example
 * ```javascript
 * await WPP.catalog.changeProductImage({
 *   productId: '[productId]',
 *   content: 'data:image/png;base64,...',
 * });
 * ```
 *
 * @category Catalog
 */
export async function changeProductImage(
  params: CatalogChangeProductImageInput
): Promise<CatalogChangeProductImageOutput> {
  const { productId, content } = catalogChangeProductImageSchema.parse(params);

  const file = await convertToFile(content);
  const opaqueData = await OpaqueData.createFromData(file, file.type);
  const filehash = await calculateFilehashFromBlob(file);

  const url = await UploadProductImage(opaqueData, filehash);

  const product = await assertGetProduct(productId);
  product.imageCdnUrl = url;
  return EditProduct(product);
}
