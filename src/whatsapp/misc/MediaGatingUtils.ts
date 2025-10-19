/*!
 * Copyright 2024 WPPConnect Team
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
 * @whatsapp WAWebMediaGatingUtils
 */
export declare namespace MediaGatingUtils {
  /**
   * Get upload limit for media files based on media type and status origin
   * @whatsapp >= 2.3000.1027640936
   * @param mediaType Media type ('audio', 'video', 'image', 'document', 'sticker', 'sticker-pack')
   * @param fileOrigin File origin for status uploads (e.g., 'STATUS_TAB_CAMERA_PHOTO_LIBRARY')
   * @param isVcardOverMmsDocument Whether this is a vCard over MMS document
   * @returns Upload limit in bytes
   */
  function getUploadLimit(
    mediaType: string,
    fileOrigin?: string | null,
    isVcardOverMmsDocument?: boolean
  ): number;
}

exportModule(
  exports,
  'MediaGatingUtils',
  (m) => m.getUploadLimit && typeof m.getUploadLimit === 'function'
);
