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
import { convertToFile } from '../../util';
import { OpaqueData } from '../../whatsapp';
import {
  calculateFilehashFromBlob,
  editProduct as EditProduct,
  uploadProductImage as UploadProductImage,
} from '../../whatsapp/functions';

/**
 * Add image on product
 * This function include additional images on product
 * for change main image use @changeProductImage
 *
 * @example
 * ```javascript
 * await WPP.catalog.addProductImage('686859858689', 'data:image/jpeg;base64,.....');
 * ```
 *
 * @category Catalog
 */

export async function addProductImage(
  productId: string,
  content: string
): Promise<any> {
  const file = await convertToFile(content);
  const opaqueData = await OpaqueData.createFromData(file, file.type);
  const filehash = await calculateFilehashFromBlob(file);

  const url = await UploadProductImage(opaqueData, filehash);

  const product = await assertGetProduct(productId);
  product.additionalImageCdnUrl.push(url);

  return EditProduct(product);
}
