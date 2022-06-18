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

import { CatalogCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import { ProductModel } from '.';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: Wid;
  afterCursor?: any;
  index?: any;
}

interface Session {
  stale?: any;
  fetchedFromServer?: any;
}

interface Derived {}

/** @whatsapp 52388
 * @whatsapp 652388 >= 2.2222.8
 */
export declare interface CatalogModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 52388
 * @whatsapp 652388 >= 2.2222.8
 */
export declare class CatalogModel extends Model<CatalogCollection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<CatalogModel>,
    options?: ModelOptions
  );
  triggerProductUpdate(): any;
  triggerMsgUpdate(): any;
  markProductCollectionOld(): any;
  addProduct(e?: any): any;
  editProduct(e: ProductModel): any;
  pullProduct(e?: any): any;
  updateProduct(e?: any): any;
  getCollection(): CatalogCollection;
}

exportProxyModel(exports, 'CatalogModel');
