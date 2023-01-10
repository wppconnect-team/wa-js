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

import * as webpack from '../../webpack';
import { exportModule } from '../exportModule';
import { LiveLocationModel } from '../models';
import { BaseCollection } from '.';

/** @whatsapp 85865
 * @whatsapp 985865 >= 2.2222.8
 */
export declare class LiveLocationCollection extends BaseCollection<LiveLocationModel> {
  static model: LiveLocationModel;
  static staleCollection?: any;
  static resumeOnAvailable?: any;
  getActive(e?: any): any;
  processMsg(e?: any, t?: boolean): any;
  removeMsg(e?: any): any;
}
exportModule(
  exports,
  {
    LiveLocationCollection: 'LiveLocationCollectionImpl',
  },
  (m) => m.LiveLocationCollectionImpl
);

const fallback = {};
let cache: any = null;

// Lazy load
Object.defineProperty(fallback, 'LiveLocationCollectionImpl', {
  configurable: true,
  enumerable: true,
  get() {
    if (!cache) {
      class LiveLocationCollection extends BaseCollection<any, any> {}
      LiveLocationCollection.model = LiveLocationModel;
      cache = LiveLocationCollection;
    }
    return cache;
  },
});

webpack.injectFallbackModule('LiveLocationCollection', fallback);
