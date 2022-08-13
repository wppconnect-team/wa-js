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

import { assertGetProduct } from '../../assert';
import { ProductModel } from '../../whatsapp';
import { editProduct as EditProduct } from '../../whatsapp/functions';

/**
 * Remove image on product
 * This function remove additional images of product
 * for change main image use @changeProductImage
 *
 * @example
 * ```javascript
 * await WPP.catalog.removeProductImage('68685985868923', '0');
 * ```
 * @param index - Index of array additionalImageCdnUrl
 * @category Catalog
 */

export async function removeProductImage(
  productId: string,
  index: string
): Promise<ProductModel> {
  const product = await assertGetProduct(productId);
  product.additionalImageCdnUrl.splice(index, 1);

  return EditProduct(product);
}
