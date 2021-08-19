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

import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 53965
 * @whatsapp 2.2126.14
 */
interface Props {
  id?: any;
  isHidden: boolean;
  catalogWid?: any;
  url?: any;
  description?: any;
  availability?: any;
  reviewStatus?: any;
  canAppeal: boolean;
  currency?: any;
  priceAmount1000?: any;
  salePriceAmount1000?: any;
  salePriceStartDate?: any;
  salePriceEndDate?: any;
  retailerId?: any;
  imageCount?: any;
  index?: any;
  additionalImageCdnUrl?: any;
  additionalImageHashes?: any;
  imageCdnUrl?: any;
  imageHash?: any;
  t?: any;
}

/** @moduleID 53965
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
  old?: any;
  checkmark?: any;
  productImageCollection?: any;
  productMsgMediaData?: any;
  fetchedFromServer?: any;
}

/** @moduleID 53965
 * @whatsapp 2.2126.14
 */
interface Derived {}

/** @moduleID 53965
 * @whatsapp 2.2126.14
 */
export declare interface ProductModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 53965
 * @whatsapp 2.2126.14
 */
export declare class ProductModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<ProductModel>,
    options?: ModelOptions
  );
  triggerImageUpdate(): any;
  markOld(): any;
  markProductImagesOld(): any;
  getHeadImageFile(): any;
  evictImagesFromCache(): any;
  getPreviewImage(): any;
}
