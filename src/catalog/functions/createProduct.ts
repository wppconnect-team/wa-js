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

const catalogCreateProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  isHidden: z.boolean().optional(),
  url: z.string().optional(),
  retailerId: z.string().optional(),
  currency: z.string().optional(),
});

export type CatalogCreateProductInput = z.infer<
  typeof catalogCreateProductSchema
>;

export type CatalogCreateProductOutput = ProductModel;

/**
 * Create a new product in your catalog
 *
 * @example
 * ```javascript
 * const product = await WPP.catalog.createProduct({
 *   name: 'My Product',
 *   image: 'data:image/png;base64,...',
 *   description: 'Product description',
 *   price: 1000,
 *   currency: 'BRL',
 * });
 * ```
 *
 * @category Catalog
 */
export async function createProduct(
  params: CatalogCreateProductInput
): Promise<CatalogCreateProductOutput> {
  const {
    name,
    image,
    description,
    price,
    isHidden,
    url,
    retailerId,
    currency,
  } = catalogCreateProductSchema.parse(params);

  const file = await convertToFile(image);

  const opaqueData = await OpaqueData.createFromData(file, file.type);
  const filehash = await calculateFilehashFromBlob(file);

  const productUrl = await uploadProductImage(opaqueData, filehash);

  const Product = new ProductModel();
  Product.name = name.toString();

  const mePNWid = UserPrefs.getMaybeMePnUser();
  const meLIDWid = UserPrefs.getMaybeMeLidUser();

  Product.catalogWid = mePNWid || meLIDWid;
  Product.imageCdnUrl = productUrl;
  Product.productImageCollection = new ProductImageModel({
    mediaUrl: productUrl,
  });
  if (description) Product.description = description;
  if (price) {
    Product.priceAmount1000 = price * 10000;
    Product.currency = currency || 'BRL';
  }
  if (isHidden) Product.isHidden = isHidden;
  if (url) Product.url = url;
  if (retailerId) Product.retailerId = retailerId;

  return await addProduct(Product, 100, 100);
}
