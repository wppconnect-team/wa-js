/*!
 * Copyright 2023 WPPConnect Team
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

/** @whatsapp 388536
 */
export declare function addToLabelCollection(
  e: any,
  t: any,
  i: any
): Promise<any>;
export declare function createLabelItemId(e: any, t: any, r: any): Promise<any>;
export declare function getParentCollection(e: any): Promise<any>;
export declare function initializeLabels(e: any): Promise<any>;
export declare function removeLabelFromCollection(
  e: any,
  t: any,
  i: any
): Promise<any>;

exportModule(
  exports,
  {
    addToLabelCollection: 'addToLabelCollection',
    createLabelItemId: 'createLabelItemId',
    getParentCollection: 'getParentCollection',
    initializeLabels: 'initializeLabels',
    removeLabelFromCollection: 'removeLabelFromCollection',
  },
  (m) => m.addToLabelCollection
);
