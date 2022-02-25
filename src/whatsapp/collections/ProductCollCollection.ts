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
import { ProductCollModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 12496 */
export declare class ProductCollCollection extends Collection<ProductCollModel> {
  static model: ProductCollModel;
  static staleCollection?: any;
  findCollectionsList(e?: any, t?: any, r?: any): any;
  getCollectionModels(e?: any): any;
  findCollectionProducts(e?: any, t?: any): any;
}
exportModule(
  exports,
  {
    ProductCollCollection: (m) =>
      m.ProductCollCollectionImpl || m.ProductCollCollection,
  },
  (m) => m.ProductCollCollectionImpl || m.ProductCollCollection
);
