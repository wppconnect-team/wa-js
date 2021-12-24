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

import parseDataURL from 'data-urls';
import FileType from 'file-type';

export async function convertToFile(
  data: string,
  mimetype?: string,
  filename?: string
): Promise<File> {
  const parsed = parseDataURL(data);
  if (!parsed) {
    throw 'invalid_data_url';
  }

  if (!mimetype) {
    mimetype = parsed.mimeType.essence;
  }

  const buffer = parsed.body;
  const blob = new Blob(
    [new Uint8Array(buffer, buffer.byteOffset, buffer.length)],
    { type: mimetype }
  );

  if (!filename) {
    const result = await FileType.fromBuffer(buffer);
    if (result) {
      const baseType = result.mime.split('/')[0];
      filename = `${baseType}.${result.ext}`;
    } else {
      filename = 'unknown';
    }
  }

  return new File([blob], filename, {
    type: mimetype,
    lastModified: Date.now(),
  });
}
