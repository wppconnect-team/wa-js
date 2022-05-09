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

export function fetchDataFromPNG(url: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onerror = reject;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const buffer = Buffer.from(data.filter((_, i) => i % 4 < 3)); // Skip alfa color

      // Get the image size
      const size =
        (buffer[1] << 56) +
        (buffer[2] << 48) +
        (buffer[3] << 40) +
        (buffer[4] << 32) +
        (buffer[5] << 24) +
        (buffer[6] << 16) +
        (buffer[7] << 8) +
        buffer[8];

      resolve(new Uint8Array(buffer.subarray(9, size + 9)));
    };
  });
}
