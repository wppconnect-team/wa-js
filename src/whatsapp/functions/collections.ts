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
import { Wid } from '../misc';

/** @whatsapp 409465 >= 2.2228.14
 */
export declare function createCollection(...args: any[]): Promise<any>;

/** @whatsapp 409465 >= 2.2228.14
 */
export declare function deleteCollection(
  id: string,
  sessionId: string
): Promise<any>;

/** @whatsapp 409465 >= 2.2228.14
 */
export declare function editCollection(
  collectionId: string,
  collectionName: string | undefined,
  collectionBoolea: boolean,
  productsToAdd: string[],
  productsToRemove: string[],
  sessionId: string
): Promise<any>;

export interface QueryCollectionsIQtParams {
  afterCursor?: string;
  catalogWid?: Wid;
  directConnectionEncryptedInfo?: any;
  height?: 100;
  width?: 100;
  limit: number;
  productsCount?: number;
}

/** @whatsapp 409465 >= 2.2228.14
 */
export declare function queryCollectionsIQ(
  params: QueryCollectionsIQtParams
): any;

exportModule(
  exports,
  {
    createCollection: 'createCollection',
    deleteCollection: 'deleteCollection',
    editCollection: 'editCollection',
    queryCollectionsIQ: 'queryCollectionsIQ',
  },
  (m) => m.createCollection
);
