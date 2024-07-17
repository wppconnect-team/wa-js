/*!
 * Copyright 2024 WPPConnect Team
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

/**
 * Get thumb of a cart
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.getThumbFromCart('[number]@c.us');
 * ```
 *
 * @category Cart
 */

import { createWid } from '../../util';
import { CartStore, CatalogStore } from '../../whatsapp';

export async function getThumbFromCart(wid: string): Promise<string> {
  const cart = await CartStore.findCart(wid);

  const item = cart?.cartItemCollection?.at(0);
  if (!item || !cart) return '';

  const catalog = CatalogStore.get(createWid(wid) as any);
  if (!catalog) return '';

  const product = (catalog.productCollection as any).get(item.id);
  if (!product) return '';

  const productImage = await product?.getProductImageCollectionHead();
  if (!productImage) return '';

  const mediaData = productImage?.mediaData;
  if (mediaData == null) return '';

  if (mediaData.preview) {
    const base64 = await mediaData?.preview?.getBase64();
    if (base64 != null) return base64;
  }

  return '';
}
