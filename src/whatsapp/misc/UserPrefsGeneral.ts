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

import { exportModule } from '../exportModule';

/**
 * Get auto-download setting for photos
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.0
 */
export declare function getAutoDownloadPhotos(): boolean;

/**
 * Set auto-download setting for photos
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.0
 */
export declare function setAutoDownloadPhotos(value: boolean): void;

/**
 * Get auto-download setting for audio
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.0
 */
export declare function getAutoDownloadAudio(): boolean;

/**
 * Set auto-download setting for audio
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 */
export declare function setAutoDownloadAudio(value: boolean): void;

/**
 * Get auto-download setting for videos
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 */
export declare function getAutoDownloadVideos(): boolean;

/**
 * Set auto-download setting for videos
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 */
export declare function setAutoDownloadVideos(value: boolean): void;

/**
 * Get auto-download setting for documents
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 */
export declare function getAutoDownloadDocuments(): boolean;

/**
 * Set auto-download setting for documents
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 */
export declare function setAutoDownloadDocuments(value: boolean): void;

/**
 * Get theme setting
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 * @returns Theme value: "light" or "dark"
 */
export declare function getTheme(): string;

/**
 * Set theme setting
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.1032022795
 * @param value Theme value: "light" or "dark"
 */
export declare function setTheme(value: string): void;

exportModule(
  exports,
  {
    getAutoDownloadPhotos: 'getAutoDownloadPhotos',
    setAutoDownloadPhotos: 'setAutoDownloadPhotos',
    getAutoDownloadAudio: 'getAutoDownloadAudio',
    setAutoDownloadAudio: 'setAutoDownloadAudio',
    getAutoDownloadVideos: 'getAutoDownloadVideos',
    setAutoDownloadVideos: 'setAutoDownloadVideos',
    getAutoDownloadDocuments: 'getAutoDownloadDocuments',
    setAutoDownloadDocuments: 'setAutoDownloadDocuments',
    getTheme: 'getTheme',
    setTheme: 'setTheme',
  },
  (m) => m.getAutoDownloadPhotos && m.setAutoDownloadPhotos && m.getTheme
);
