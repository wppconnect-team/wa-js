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
 * Add product in cart
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.add('[number]@c.us', [
 *   { id: 'productId', qnt: 2 },
 * ]);
 * ```
 *
 * @category Cart
 */

import { getProductById } from '../../catalog';
import { WPPError } from '../../util';
import { CartModel, CartStore, ProductModel } from '../../whatsapp';
import {
  addProductToCart,
  updateProductQuantityCart,
} from '../../whatsapp/functions';

export async function add(
  chatId: string,
  products: {
    id: string;
    qnt: number;
  }[]
): Promise<CartModel | undefined> {
  if (!chatId || !products) {
    throw new WPPError(
      'send_required_params',
      `For add item in cart send chatId and products array`
    );
  }
  for (const product of products) {
    const get = await getProductById(chatId, product.id as any);
    if (get) {
      const prod = new ProductModel({
        id: get.id,
        isHidden: get.is_hidden || false,
        catalogWid: chatId,
        url: get.url,
        name: get.name,
        description: get.description,
        availability: get.availability,
        maxAvailable: (get as any)?.maxAvailable,
        reviewStatus: get?.capability_to_review_status[0].value,
        currency: get.currency,
        priceAmount1000: get.price,
        salePriceAmount1000: null,
        retailerId: get.retailer_id,
        imageCount:
          get.image_cdn_urls.length + get.additional_image_cdn_urls.length,
        additionalImageCdnUrl: get.additional_image_cdn_urls,
        additionalImageHashes: get.image_hashes_for_whatsapp,
        imageCdnUrl: get.image_cdn_urls[0].value,
        imageHash: get.image_hashes_for_whatsapp[0],
      });
      await addProductToCart(prod);
      await updateProductQuantityCart(prod, product.qnt);
    }
  }
  return CartStore.findCart(chatId);
}
