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

/**
 * Convert different binary container types to a plain ArrayBuffer.
 *
 * Useful when dealing with APIs that may return TypedArrays or SharedArrayBuffer.
 */
export function toArrayBuffer(
  data: ArrayBuffer | ArrayBufferView | ArrayBufferLike | null | undefined
): ArrayBuffer | null {
  if (!data) {
    return null;
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    const view = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return view.slice().buffer;
  }

  // ArrayBufferLike (e.g. SharedArrayBuffer)
  return new Uint8Array(data).slice().buffer;
}
