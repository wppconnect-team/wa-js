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

import { CartCollection } from '../collections';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 59706
 * @whatsapp 2.2126.14
 */
interface Props {
  id?: any;
  priceAmount1000?: any;
  currency?: any;
  quantity?: any;
  imageHash?: any;
  imageCdnUrl?: any;
}

/** @moduleID 59706
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
}

/** @moduleID 59706
 * @whatsapp 2.2126.14
 */
interface Derived {}

/** @moduleID 59706
 * @whatsapp 2.2126.14
 */
export declare interface CartItemModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 59706
 * @whatsapp 2.2126.14
 */
export declare class CartItemModel extends Model<CartCollection> {
  constructor(
    proterties?: ModelPropertiesContructor<CartItemModel>,
    options?: ModelOptions
  );
  getCollection(): CartCollection;
}
