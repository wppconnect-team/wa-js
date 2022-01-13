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

import { exportModule } from '../exportModule';
import { ProductModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 2.2149.4:26491 */
export declare class ProductCollection extends Collection<ProductModel> {
  static model: ProductModel;
  getProductModels(e?: boolean): any;
  evictImagesFromCache(e?: any): any;
  static comparator(): any;
}
exportModule(
  exports,
  { ProductCollection: (m) => m.ProductCollectionImpl || m.ProductCollection },
  (m) => m.ProductCollectionImpl || m.ProductCollection
);
