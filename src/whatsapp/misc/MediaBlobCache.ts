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

/** @whatsapp 84866
 * @whatsapp 284866 >= 2.2222.8
 */
export declare class MediaBlobCacheImpl {
  is24h: boolean;
  getOrCreateURL(filehash: string): string;
  revokeURL(filehash: string, blob: Blob): void;
  get(filehash: string): Blob;
  has(filehash: string): boolean;
  touch(filehash: string): void;
  put(filehash: string, blob: Blob): void;
  clear(): void;
  increaseUsageCount(filehash: string): void;
  decreaseUsageCount(filehash: string): void;
}

/** @whatsapp 84866
 * @whatsapp 284866 >= 2.2222.8
 */
export declare const MediaBlobCache: MediaBlobCacheImpl;

exportModule(
  exports,
  {
    MediaBlobCacheImpl: [
      'InMemoryMediaBlobCacheImpl', // @whatsapp >= 2.2329.7
      'MediaBlobCacheImpl', // @whatsapp < 2.2329.7
    ],
    MediaBlobCache: [
      'InMemoryMediaBlobCache', // @whatsapp >= 2.2329.7
      'MediaBlobCache', // @whatsapp < 2.2329.7
    ],
  },
  (m) =>
    m.InMemoryMediaBlobCacheImpl || // @whatsapp >= 2.2329.7
    m.MediaBlobCache // @whatsapp < 2.2329.7
);
