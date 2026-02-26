/*!
 * Copyright 2026 WPPConnect Team
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

export interface GetMessagesFromRowIdOptions {
  /**
   * The minimum rowId (exclusive) to start fetching messages from
   */
  minRowId: number;
  /**
   * Maximum number of messages to return
   * @default 1000
   * Use -1 to get all available messages (use with caution on large datasets)
   */
  limit?: number;
}

/**
 * Get messages from IndexedDB 'model-storage' database starting from a specific rowId
 *
 * This function queries the IndexedDB database directly using the rowId index,
 * retrieving messages with rowId greater than the specified value.
 * It's useful for pagination or fetching messages in chronological order.
 *
 * @example
 * ```javascript
 * // Get 1000 messages after rowId 999960610
 * const messages = await WPP.indexdb.getMessagesFromRowId({ minRowId: 999960610 });
 *
 * // Get 500 messages after rowId 999960610
 * const messages = await WPP.indexdb.getMessagesFromRowId({
 *   minRowId: 999960610,
 *   limit: 500
 * });
 *
 * // Get all available messages after rowId (use with caution)
 * const messages = await WPP.indexdb.getMessagesFromRowId({
 *   minRowId: 999960610,
 *   limit: -1
 * });
 * ```
 * @category IndexedDB
 * @return Promise that resolves to an array of message objects from IndexedDB
 */
export async function getMessagesFromRowId(
  options: GetMessagesFromRowIdOptions
): Promise<any[]> {
  const { minRowId, limit = 1000 } = options;

  // Validate minRowId
  if (typeof minRowId !== 'number') {
    throw new Error('minRowId must be a number');
  }

  if (!Number.isFinite(minRowId)) {
    throw new Error('minRowId must be a finite number');
  }

  if (minRowId < 0) {
    throw new Error('minRowId must be a non-negative number');
  }

  // Validate limit
  if (typeof limit !== 'number') {
    throw new Error('limit must be a number');
  }

  if (!Number.isFinite(limit)) {
    throw new Error('limit must be a finite number');
  }

  if (limit !== -1 && limit <= 0) {
    throw new Error('limit must be either -1 (unlimited) or a positive number');
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('model-storage');

    request.onsuccess = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['message'], 'readonly');
      const objectStore = transaction.objectStore('message');
      const index = objectStore.index('rowId');

      const range = IDBKeyRange.lowerBound(minRowId, true); // true = exclusive
      const results: any[] = [];
      const cursorRequest = index.openCursor(range);

      cursorRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor && (limit < 0 || results.length < limit)) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          db.close();
          resolve(results);
        }
      };

      cursorRequest.onerror = function () {
        db.close();
        reject(cursorRequest.error);
      };
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}
