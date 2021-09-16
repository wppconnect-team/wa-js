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

/**
 * @whatsapp 2.2132.6:45792
 */
export declare const Base64: {
  BASE64_DATA_URL_SCHEME: 'data:image/jpeg;base64,';
  encodeB64(data: ArrayLike<number> | ArrayBufferLike): string;
  encodeB64UrlSafe(
    data: ArrayLike<number> | ArrayBufferLike,
    t?: boolean
  ): string;
  decodeB64(data: string): ArrayBufferLike;
  decodeB64UrlSafe(data: string): ArrayBufferLike;
  decodeB64ToJsArray(data: string): number[];
  sizeWhenB64Decoded(data: ArrayLike<number> | ArrayBufferLike): number;
};

exportModule(exports, 'Base64', (m) => m.encodeB64 && m.decodeB64);
