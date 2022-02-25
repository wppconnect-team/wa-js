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
import { StickerPackModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 44333 */
export declare class StickerPackCollection extends Collection<StickerPackModel> {
  static model: StickerPackModel;
  checksum?: any;
  pageFetchStates?: any;
  createPlaceholder(e?: any): StickerPackModel;
  preFetch(): any;
  fetchAt(e?: any, t?: any, r?: any): any;
  hasFetchedData(): boolean;
  isFetchingData(): boolean;
  pageWithIndex(e?: any): any;
  sync(e?: any): any;
  setChecksum(e?: any, t?: any): any;
  static comparator(): any;
}
exportModule(
  exports,
  {
    StickerPackCollection: (m) =>
      m.StickerPackCollectionImpl || m.StickerPackCollection,
  },
  (m) => m.StickerPackCollectionImpl || m.StickerPackCollection
);
