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

import { exportProxyModel } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id?: any;
  isHidden: boolean;
  reviewStatus?: any;
  totalItemsCount?: any;
  afterCursor?: any;
}

interface Session {
  stale?: any;
}

interface Derived {}

/** @whatsapp 94629
 * @whatsapp 394629 >= 2.2222.8
 */
export declare interface ProductCollModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 94629
 * @whatsapp 394629 >= 2.2222.8
 */
export declare class ProductCollModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<ProductCollModel>,
    options?: ModelOptions
  );
  addProducts(e?: any): any;
}

exportProxyModel(exports, 'ProductCollModel');
