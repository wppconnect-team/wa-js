/*!
 * Copyright 2022 WPPConnect Team
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

import { convertToFile } from '../../util';
import {
  OpaqueData,
  ProductImageModel,
  ProductModel,
  UserPrefs,
} from '../../whatsapp';
import {
  addProduct,
  calculateFilehashFromBlob,
  uploadProductImage,
} from '../../whatsapp/functions';

/**
 * Create new product
 *
 * @example
 * ```javascript
 * const myCatalog = await WPP.catalog.addProduct(
    {
      name: 'Product name', 
      image: 'base64 image string', 
      description: 'product description',
      price: '89.90',
      isHidden: false,
      url: 'https://wppconnect.io',
      retailerId: 'AKA001',
    }
  );
 * ```
 *
 * @return Your created product
 */

export interface createProductParams {
  name: string;
  image: string;
  description?: string;
  price?: number;
  isHidden?: boolean;
  url?: string;
  retailerId?: string;
  currency?: string;
}
export async function createProduct(
  params: createProductParams
): Promise<ProductModel> {
  const file = await convertToFile(params.image);

  const opaqueData = await OpaqueData.createFromData(file, file.type);
  const filehash = await calculateFilehashFromBlob(file);

  const url = await uploadProductImage(opaqueData, filehash);

  const Product = new ProductModel();
  Product.name = params.name.toString();
  Product.catalogWid = UserPrefs.getMeUser();
  Product.imageCdnUrl = url;
  Product.productImageCollection = new ProductImageModel({
    mediaUrl: url,
  });
  if (params.description) Product.description = params.description;
  if (params.price) {
    Product.priceAmount1000 = params.price * 10000;
    Product.currency = params.currency || 'BRL';
  }
  if (params.isHidden) Product.isHidden = params.isHidden;
  if (params.url) Product.url = params.url;
  if (params.retailerId) Product.retailerId = params.retailerId;

  return await addProduct(Product, 100, 100);
  /*const catalog = CatalogStore.get(UserPrefs.getMeUser());
  return catalog?.addProduct(Product)*/
}
