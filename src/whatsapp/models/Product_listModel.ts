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

import { MsgKey } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 12439
 * @whatsapp 2.2126.14
 */
interface Props {
  id: MsgKey;
  catalogId?: any;
  title?: any;
}

/** @moduleID 12439
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
}

/** @moduleID 12439
 * @whatsapp 2.2126.14
 */
interface Derived {}

/** @moduleID 12439
 * @whatsapp 2.2126.14
 */
export declare interface Product_listModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 12439
 * @whatsapp 2.2126.14
 */
export declare class Product_listModel extends Model {
  idClass: typeof MsgKey;
  constructor(
    proterties?: ModelPropertiesContructor<Product_listModel>,
    options?: ModelOptions
  );
  triggerProductRemoved(e?: any): any;
  triggerProductUpdate(): any;
  getNextProductBatchToLoad(): any;
  getPageSize(): any;
  getProductSize(): any;
  setProductLoadingStatus(e?: any, t?: any): any;
  getProductLoadingStatus(e?: any): any;
  getTotalProductsFetchedOrFailed(): any;
  getProductList(): any;
  getSections(): any;
  getSectionsCount(): any;
  isFetching(): boolean;
}
