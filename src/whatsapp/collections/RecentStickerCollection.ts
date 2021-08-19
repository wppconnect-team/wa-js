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

import { StickerModel } from '../models';
import { Collection } from './Collection';

/**
 * @moduleID 76071
 * @whatsapp 2.2126.14
 */
export declare class RecentStickerCollection extends Collection<StickerModel> {
  static model: StickerModel;
  enqueue(e?: any): any;
  setChecksum(e?: any): any;
  sync(e?: any): any;
  isSynced(): boolean;
}
