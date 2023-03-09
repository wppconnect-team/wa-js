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

import FileType from 'file-type';
import parseDataURL from 'parse-data-url';

import { isBase64 } from '.';

export async function convertToFile(
  data: string | Blob | File,
  mimetype?: string,
  filename?: string
): Promise<File> {
  if (data instanceof File) {
    return data;
  }

  let blob: Blob | null = null;
  if (typeof data === 'string') {
    let parsed = parseDataURL(data);

    if (!parsed && isBase64(data)) {
      parsed = parseDataURL('data:;base64,' + data);
    }

    if (!parsed) {
      throw 'invalid_data_url';
    }

    if (!mimetype) {
      mimetype = parsed.contentType;
    }

    const buffer = parsed.toBuffer();
    blob = new Blob(
      [new Uint8Array(buffer, buffer.byteOffset, buffer.length)],
      {
        type: mimetype,
      }
    );
  } else {
    blob = data;
  }

  if (!filename || !mimetype) {
    const result = await FileType.fromBuffer(await blob.arrayBuffer());
    if (result) {
      const baseType = result.mime.split('/')[0];
      filename = filename || `${baseType}.${result.ext}`;
      mimetype = mimetype || result.mime;
    }

    filename = filename || 'unknown';
    mimetype = mimetype || 'application/octet-stream';
  }

  return new File([blob], filename, {
    type: mimetype,
    lastModified: Date.now(),
  });
}
