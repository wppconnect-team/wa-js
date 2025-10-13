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

import { describe, expect, it } from 'vitest';

import { formatFileSize, getMediaTypeForValidation } from './fileHelpers';

describe('formatFileSize', () => {
  it('should return "0 Bytes" for zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });

  it('should format bytes correctly', () => {
    expect(formatFileSize(1)).toBe('1 Bytes');
    expect(formatFileSize(512)).toBe('512 Bytes');
    expect(formatFileSize(1023)).toBe('1023 Bytes');
  });

  it('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(2048)).toBe('2 KB');
    expect(formatFileSize(10240)).toBe('10 KB');
    expect(formatFileSize(102400)).toBe('100 KB');
    expect(formatFileSize(1048575)).toBe('1024 KB');
  });

  it('should format megabytes correctly', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(1572864)).toBe('1.5 MB');
    expect(formatFileSize(2097152)).toBe('2 MB');
    expect(formatFileSize(10485760)).toBe('10 MB');
    expect(formatFileSize(104857600)).toBe('100 MB');
    expect(formatFileSize(1073741823)).toBe('1024 MB');
  });

  it('should format gigabytes correctly', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
    expect(formatFileSize(1610612736)).toBe('1.5 GB');
    expect(formatFileSize(2147483648)).toBe('2 GB');
    expect(formatFileSize(10737418240)).toBe('10 GB');
    expect(formatFileSize(107374182400)).toBe('100 GB');
  });

  it('should handle decimal precision correctly', () => {
    expect(formatFileSize(1100)).toBe('1.07 KB');
    expect(formatFileSize(1536000)).toBe('1.46 MB');
    expect(formatFileSize(1536000000)).toBe('1.43 GB');
  });

  it('should handle edge cases', () => {
    // Very small positive numbers (less than 1 byte)
    // These will have negative log values, resulting in undefined size units
    // Testing actual behavior rather than expected ideal behavior
    expect(formatFileSize(0.1)).toBe('102.4 undefined');
    expect(formatFileSize(0.9)).toBe('921.6 undefined');
  });

  it('should handle large file sizes', () => {
    // Very large numbers (beyond GB range)
    // The function only supports up to GB, so larger values result in undefined
    const largeSize = 1024 * 1024 * 1024 * 1024; // 1 TB
    expect(formatFileSize(largeSize)).toBe('1 undefined');

    const veryLargeSize = largeSize * 10; // 10 TB
    expect(formatFileSize(veryLargeSize)).toBe('10 undefined');
  });

  // File size cannot be negative, but testing function behavior with negative input
  it('should handle negative numbers', () => {
    // Math.log of negative numbers returns NaN
    expect(formatFileSize(-1024)).toBe('NaN undefined');
    expect(formatFileSize(-1048576)).toBe('NaN undefined');
  });

  it('should maintain precision up to 2 decimal places', () => {
    expect(formatFileSize(1234)).toBe('1.21 KB');
    expect(formatFileSize(1234567)).toBe('1.18 MB');
    expect(formatFileSize(1234567890)).toBe('1.15 GB');
  });

  it('should handle exact powers of 1024', () => {
    expect(formatFileSize(Math.pow(1024, 0))).toBe('1 Bytes');
    expect(formatFileSize(Math.pow(1024, 1))).toBe('1 KB');
    expect(formatFileSize(Math.pow(1024, 2))).toBe('1 MB');
    expect(formatFileSize(Math.pow(1024, 3))).toBe('1 GB');
  });

  it('should handle common file sizes', () => {
    // Common document sizes
    expect(formatFileSize(5 * 1024)).toBe('5 KB'); // Small text file
    expect(formatFileSize(500 * 1024)).toBe('500 KB'); // Medium document

    // Common image sizes
    expect(formatFileSize(2 * 1024 * 1024)).toBe('2 MB'); // High-res photo
    expect(formatFileSize(10 * 1024 * 1024)).toBe('10 MB'); // Large image

    // Common video sizes
    expect(formatFileSize(100 * 1024 * 1024)).toBe('100 MB'); // Short video
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB'); // Movie file
  });

  it('should handle fractional bytes correctly', () => {
    // Test values between 1 and 1024 bytes
    expect(formatFileSize(1.5)).toBe('1.5 Bytes');
    expect(formatFileSize(10.25)).toBe('10.25 Bytes');
    expect(formatFileSize(999.99)).toBe('999.99 Bytes');
  });

  it('should handle boundary values', () => {
    // Test exact boundary values between units
    expect(formatFileSize(1023.99)).toBe('1023.99 Bytes');
    expect(formatFileSize(1024.01)).toBe('1 KB');

    expect(formatFileSize(1048575.99)).toBe('1024 KB');
    expect(formatFileSize(1048576.01)).toBe('1 MB');

    expect(formatFileSize(1073741823.99)).toBe('1024 MB');
    expect(formatFileSize(1073741824.01)).toBe('1 GB');
  });
});

describe('getMediaTypeForValidation', () => {
  it('should return the specified type when optionsType is not auto-detect', () => {
    expect(getMediaTypeForValidation('image', 'video/mp4')).toBe('image');
    expect(getMediaTypeForValidation('video', 'image/png')).toBe('video');
    expect(getMediaTypeForValidation('audio', 'application/pdf')).toBe('audio');
    expect(getMediaTypeForValidation('document', 'image/jpeg')).toBe(
      'document'
    );
  });

  it('should auto-detect image types from MIME type', () => {
    expect(getMediaTypeForValidation('auto-detect', 'image/png')).toBe('image');
    expect(getMediaTypeForValidation('auto-detect', 'image/jpeg')).toBe(
      'image'
    );
    expect(getMediaTypeForValidation('auto-detect', 'image/gif')).toBe('image');
    expect(getMediaTypeForValidation('auto-detect', 'image/webp')).toBe(
      'image'
    );
    expect(getMediaTypeForValidation('auto-detect', 'image/svg+xml')).toBe(
      'image'
    );
    expect(getMediaTypeForValidation('auto-detect', 'image/bmp')).toBe('image');
    expect(getMediaTypeForValidation('auto-detect', 'image/tiff')).toBe(
      'image'
    );
  });

  it('should auto-detect video types from MIME type', () => {
    expect(getMediaTypeForValidation('auto-detect', 'video/mp4')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/avi')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/mov')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/wmv')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/flv')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/webm')).toBe(
      'video'
    );
    expect(getMediaTypeForValidation('auto-detect', 'video/mkv')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/quicktime')).toBe(
      'video'
    );
  });

  it('should auto-detect audio types from MIME type', () => {
    expect(getMediaTypeForValidation('auto-detect', 'audio/mp3')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/mpeg')).toBe(
      'audio'
    );
    expect(getMediaTypeForValidation('auto-detect', 'audio/wav')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/ogg')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/aac')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/flac')).toBe(
      'audio'
    );
    expect(getMediaTypeForValidation('auto-detect', 'audio/m4a')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/webm')).toBe(
      'audio'
    );
  });

  it('should default to document for unknown MIME types', () => {
    expect(getMediaTypeForValidation('auto-detect', 'application/pdf')).toBe(
      'document'
    );
    expect(getMediaTypeForValidation('auto-detect', 'application/msword')).toBe(
      'document'
    );
    expect(
      getMediaTypeForValidation('auto-detect', 'application/vnd.ms-excel')
    ).toBe('document');
    expect(getMediaTypeForValidation('auto-detect', 'text/plain')).toBe(
      'document'
    );
    expect(getMediaTypeForValidation('auto-detect', 'application/json')).toBe(
      'document'
    );
    expect(getMediaTypeForValidation('auto-detect', 'application/xml')).toBe(
      'document'
    );
    expect(getMediaTypeForValidation('auto-detect', 'application/zip')).toBe(
      'document'
    );
  });

  it('should handle empty or undefined optionsType by auto-detecting', () => {
    expect(getMediaTypeForValidation('', 'image/png')).toBe('image');
    expect(getMediaTypeForValidation('', 'video/mp4')).toBe('video');
    expect(getMediaTypeForValidation('', 'audio/mp3')).toBe('audio');
    expect(getMediaTypeForValidation('', 'application/pdf')).toBe('document');
  });

  it('should handle case sensitivity in MIME types', () => {
    expect(getMediaTypeForValidation('auto-detect', 'IMAGE/PNG')).toBe(
      'document'
    ); // Uppercase won't match
    expect(getMediaTypeForValidation('auto-detect', 'Video/MP4')).toBe(
      'document'
    ); // Mixed case won't match
    expect(getMediaTypeForValidation('auto-detect', 'AUDIO/MP3')).toBe(
      'document'
    ); // Uppercase won't match
  });

  it('should handle edge cases in MIME types', () => {
    // Empty MIME type
    expect(getMediaTypeForValidation('auto-detect', '')).toBe('document');

    // MIME type with parameters
    expect(
      getMediaTypeForValidation('auto-detect', 'image/png; charset=utf-8')
    ).toBe('image');
    expect(
      getMediaTypeForValidation(
        'auto-detect',
        'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      )
    ).toBe('video');

    // Malformed MIME types
    expect(getMediaTypeForValidation('auto-detect', 'not-a-mime-type')).toBe(
      'document'
    );
    expect(getMediaTypeForValidation('auto-detect', '/png')).toBe('document');
    expect(getMediaTypeForValidation('auto-detect', 'image/')).toBe('image'); // Still starts with image/
  });

  it('should prioritize explicit type over MIME type detection', () => {
    // Even if MIME type suggests different media type, explicit type should win
    expect(getMediaTypeForValidation('document', 'image/png')).toBe('document');
    expect(getMediaTypeForValidation('image', 'video/mp4')).toBe('image');
    expect(getMediaTypeForValidation('video', 'audio/mp3')).toBe('video');
    expect(getMediaTypeForValidation('audio', 'application/pdf')).toBe('audio');
  });

  it('should handle common WhatsApp supported formats', () => {
    // Common image formats supported by WhatsApp
    expect(getMediaTypeForValidation('auto-detect', 'image/jpeg')).toBe(
      'image'
    );
    expect(getMediaTypeForValidation('auto-detect', 'image/png')).toBe('image');
    expect(getMediaTypeForValidation('auto-detect', 'image/webp')).toBe(
      'image'
    );

    // Common video formats supported by WhatsApp
    expect(getMediaTypeForValidation('auto-detect', 'video/mp4')).toBe('video');
    expect(getMediaTypeForValidation('auto-detect', 'video/3gpp')).toBe(
      'video'
    );

    // Common audio formats supported by WhatsApp
    expect(getMediaTypeForValidation('auto-detect', 'audio/aac')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/mp4')).toBe('audio');
    expect(getMediaTypeForValidation('auto-detect', 'audio/mpeg')).toBe(
      'audio'
    );
    expect(getMediaTypeForValidation('auto-detect', 'audio/ogg')).toBe('audio');

    // Document formats
    expect(getMediaTypeForValidation('auto-detect', 'application/pdf')).toBe(
      'document'
    );
    expect(
      getMediaTypeForValidation(
        'auto-detect',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    ).toBe('document');
  });
});
