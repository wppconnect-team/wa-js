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

import { z } from 'zod';

import * as UserPrefsGeneral from '../../whatsapp/misc/UserPrefsGeneral';

const connSetAutoDownloadSettingsSchema = z.object({
  photos: z.boolean().optional(),
  audio: z.boolean().optional(),
  videos: z.boolean().optional(),
  documents: z.boolean().optional(),
});

export type ConnSetAutoDownloadSettingsInput = z.infer<
  typeof connSetAutoDownloadSettingsSchema
>;

export type ConnSetAutoDownloadSettingsOutput = void;

/**
 * Set auto-download settings for media types
 *
 * @example
 * ```javascript
 * // Disable video and document auto-download
 * await WPP.conn.setAutoDownloadSettings({
 *   videos: false,
 *   documents: false
 * });
 *
 * // Enable only photos
 * await WPP.conn.setAutoDownloadSettings({
 *   photos: true,
 *   audio: false,
 *   videos: false,
 *   documents: false
 * });
 * ```
 *
 * @category Config
 */
export async function setAutoDownloadSettings(
  params: ConnSetAutoDownloadSettingsInput
): Promise<ConnSetAutoDownloadSettingsOutput> {
  const { photos, audio, videos, documents } =
    connSetAutoDownloadSettingsSchema.parse(params);

  if (photos !== undefined) {
    UserPrefsGeneral.setAutoDownloadPhotos(photos);
  }

  if (audio !== undefined) {
    UserPrefsGeneral.setAutoDownloadAudio(audio);
  }

  if (videos !== undefined) {
    UserPrefsGeneral.setAutoDownloadVideos(videos);
  }

  if (documents !== undefined) {
    UserPrefsGeneral.setAutoDownloadDocuments(documents);
  }

  // Reload the page to ensure settings are applied immediately
  window.location.reload();
}
