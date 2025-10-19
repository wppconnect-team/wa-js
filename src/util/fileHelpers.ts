/*!
 * Copyright 2022 WPPConnect Team
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
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @returns Formatted string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Determine the media type for file size validation
 * @param optionsType The media type specified in options ('image', 'video', 'audio', 'document', or 'auto-detect')
 * @param mimeType The MIME type of the file (e.g., 'image/png', 'video/mp4')
 * @returns The determined media type for validation ('image', 'video', 'audio', or 'document')
 */
export function getMediaTypeForValidation(
  optionsType: string,
  mimeType: string
): string {
  // If type is explicitly set and not auto-detect, use it
  if (optionsType && optionsType !== 'auto-detect') {
    return optionsType;
  }

  // Auto-detect based on MIME type
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType.startsWith('audio/')) {
    return 'audio';
  }

  // Default to document for other types
  return 'document';
}
