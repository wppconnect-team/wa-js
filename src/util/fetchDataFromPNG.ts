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

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const rgbData = new Uint8Array(Math.floor((data.length * 3) / 4));
      for (let i = 0, j = 0; i < data.length; i += 4) {
        rgbData[j++] = data[i]; // R
        rgbData[j++] = data[i + 1]; // G
        rgbData[j++] = data[i + 2]; // B
      }

      let size = BigInt(0);
      for (let i = 0; i < 8; i++) {
        size = (size << BigInt(8)) + BigInt(rgbData[i]);
      }

      const dataSize = Number(size);

      resolve(rgbData.subarray(8, 8 + dataSize));
    };
  });
}
