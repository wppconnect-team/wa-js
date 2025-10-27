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
import { CartModel } from '../models';
import { Collection } from './Collection';
/** @whatsapp 12392
 * @whatsapp 612392 >= 2.2222.8
 */
export declare class CartCollection extends Collection<CartModel> {
    static model: CartModel;
    static cachePolicy?: any;
    imageWidth?: any;
    imageHeight?: any;
    findCart(e?: any): any;
}
