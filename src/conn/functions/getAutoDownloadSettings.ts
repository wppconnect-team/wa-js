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

import {
  getAutoDownloadAudio,
  getAutoDownloadDocuments,
  getAutoDownloadPhotos,
  getAutoDownloadVideos,
} from '../../whatsapp/misc/UserPrefsGeneral';

/**
 * Get auto-download settings for media types
 *
 * @example
 * ```javascript
 * // Get current settings
 * const settings = WPP.conn.getAutoDownloadSettings();
 * console.log(settings);
 * // { photos: true, audio: true, videos: false, documents: false }
 * ```
 *
 * @category Config
 */
export function getAutoDownloadSettings(): {
  photos: boolean;
  audio: boolean;
  videos: boolean;
  documents: boolean;
} {
  return {
    photos: getAutoDownloadPhotos(),
    audio: getAutoDownloadAudio(),
    videos: getAutoDownloadVideos(),
    documents: getAutoDownloadDocuments(),
  };
}
