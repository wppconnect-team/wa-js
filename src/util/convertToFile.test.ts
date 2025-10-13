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
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isBase64, isUrl } from '.';
import { convertToFile } from './convertToFile';

// Mock external dependencies
vi.mock('file-type', () => ({
  default: {
    fromBuffer: vi.fn(),
  },
}));

vi.mock('parse-data-url', () => ({
  default: vi.fn(),
}));

vi.mock('.', () => ({
  isBase64: vi.fn(),
  isUrl: vi.fn(),
}));

// Create typed mocks
const mockFileType = FileType as any;
const mockParseDataURL = parseDataURL as any;
const mockIsBase64 = isBase64 as any;
const mockIsUrl = isUrl as any;

describe('convertToFile', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    mockFileType.fromBuffer.mockResolvedValue(null);
    mockParseDataURL.mockReturnValue(null);
    mockIsBase64.mockReturnValue(false);
    mockIsUrl.mockReturnValue(false);

    // Mock global fetch
    global.fetch = vi.fn();
  });

  describe('File input', () => {
    it('should return the same File if input is already a File', async () => {
      const originalFile = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });

      const result = await convertToFile(originalFile);

      expect(result).toBe(originalFile);
      expect(result.name).toBe('test.txt');
      expect(result.type).toBe('text/plain');
    });
  });

  describe('URL input', () => {
    it('should fetch and convert URL to File', async () => {
      const mockBlob = new Blob(['fetched content'], { type: 'text/plain' });
      const mockResponse = {
        blob: vi.fn().mockResolvedValue(mockBlob),
      };

      mockIsUrl.mockReturnValue(true);
      (global.fetch as any).mockResolvedValue(mockResponse);
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'text/plain',
        ext: 'txt',
      });

      const result = await convertToFile('https://example.com/test.txt');

      expect(fetch).toHaveBeenCalledWith('https://example.com/test.txt');
      expect(mockResponse.blob).toHaveBeenCalled();
      expect(result).toBeInstanceOf(File);
      expect(result.name).toBe('text.txt');
      expect(result.type).toBe('text/plain');
    });

    it('should use provided mimetype and filename for URL', async () => {
      const mockBlob = new Blob(['fetched content'], { type: 'image/jpeg' });
      const mockResponse = {
        blob: vi.fn().mockResolvedValue(mockBlob),
      };

      mockIsUrl.mockReturnValue(true);
      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await convertToFile(
        'https://example.com/image.jpg',
        'image/jpeg',
        'custom-image.jpg'
      );

      expect(result.name).toBe('custom-image.jpg');
      expect(result.type).toBe('image/jpeg');
    });
  });

  describe('Data URL input', () => {
    it('should parse valid data URL', async () => {
      const mockBuffer = Buffer.from('test data');
      const mockParsed = {
        contentType: 'text/plain',
        toBuffer: vi.fn().mockReturnValue(mockBuffer),
      };

      mockIsUrl.mockReturnValue(false);
      mockParseDataURL.mockReturnValue(mockParsed);
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'text/plain',
        ext: 'txt',
      });

      const result = await convertToFile('data:text/plain;base64,dGVzdCBkYXRh');

      expect(mockParseDataURL).toHaveBeenCalledWith(
        'data:text/plain;base64,dGVzdCBkYXRh'
      );
      expect(mockParsed.toBuffer).toHaveBeenCalled();
      expect(result).toBeInstanceOf(File);
      expect(result.name).toBe('text.txt');
      expect(result.type).toBe('text/plain');
    });

    it('should handle base64 string without data URL prefix', async () => {
      const mockBuffer = Buffer.from('test data');
      const mockParsed = {
        contentType: '', // Empty so file type detection will run
        toBuffer: vi.fn().mockReturnValue(mockBuffer),
      };

      mockIsUrl.mockReturnValue(false);
      mockParseDataURL.mockReturnValueOnce(null).mockReturnValue(mockParsed);
      mockIsBase64.mockReturnValue(true);
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'image/png',
        ext: 'png',
      });

      const result = await convertToFile('dGVzdCBkYXRh');

      expect(mockParseDataURL).toHaveBeenCalledWith('dGVzdCBkYXRh');
      expect(mockParseDataURL).toHaveBeenCalledWith(
        'data:;base64,dGVzdCBkYXRh'
      );
      expect(result).toBeInstanceOf(File);
      expect(result.name).toBe('image.png');
      expect(result.type).toBe('image/png');
      expect(mockFileType.fromBuffer).toHaveBeenCalled();
    });

    it('should use provided mimetype for data URL', async () => {
      const mockBuffer = Buffer.from('test data');
      const mockParsed = {
        contentType: 'text/plain',
        toBuffer: vi.fn().mockReturnValue(mockBuffer),
      };

      mockIsUrl.mockReturnValue(false);
      mockParseDataURL.mockReturnValue(mockParsed);

      const result = await convertToFile(
        'data:text/plain;base64,dGVzdCBkYXRh',
        'text/custom',
        'custom.txt'
      );

      expect(result.name).toBe('custom.txt');
      expect(result.type).toBe('text/custom');
    });

    it('should throw error for invalid data URL', async () => {
      mockIsUrl.mockReturnValue(false);
      mockParseDataURL.mockReturnValue(null);
      mockIsBase64.mockReturnValue(false);

      await expect(convertToFile('invalid-data')).rejects.toBe(
        'invalid_data_url'
      );
    });
  });

  describe('Blob input', () => {
    it('should convert Blob to File', async () => {
      const blob = new Blob(['blob content'], { type: 'text/plain' });
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'text/plain',
        ext: 'txt',
      });

      const result = await convertToFile(blob);

      expect(result).toBeInstanceOf(File);
      expect(result.name).toBe('text.txt');
      expect(result.type).toBe('text/plain');
    });

    it('should use provided filename and mimetype for Blob', async () => {
      const blob = new Blob(['blob content'], { type: 'application/json' });

      const result = await convertToFile(blob, 'text/custom', 'data.json');

      expect(result.name).toBe('data.json');
      expect(result.type).toBe('text/custom');
    });
  });

  describe('File type detection', () => {
    it('should detect file type when not provided', async () => {
      const blob = new Blob(['content']);
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'image/jpeg',
        ext: 'jpg',
      });

      const result = await convertToFile(blob);

      expect(mockFileType.fromBuffer).toHaveBeenCalled();
      expect(result.name).toBe('image.jpg');
      expect(result.type).toBe('image/jpeg');
    });

    it('should use default values when file type detection fails', async () => {
      const blob = new Blob(['content']);
      mockFileType.fromBuffer.mockResolvedValue(null);

      const result = await convertToFile(blob);

      expect(result.name).toBe('unknown');
      expect(result.type).toBe('application/octet-stream');
    });

    it('should not detect file type when both filename and mimetype are provided', async () => {
      const blob = new Blob(['content']);

      const result = await convertToFile(blob, 'text/plain', 'test.txt');

      expect(mockFileType.fromBuffer).not.toHaveBeenCalled();
      expect(result.name).toBe('test.txt');
      expect(result.type).toBe('text/plain');
    });

    it('should detect only missing information', async () => {
      const blob = new Blob(['content']);
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'image/png',
        ext: 'png',
      });

      // Test with only filename provided
      const result1 = await convertToFile(blob, undefined, 'test.txt');
      expect(result1.name).toBe('test.txt');
      expect(result1.type).toBe('image/png');

      // Reset mock
      vi.clearAllMocks();
      mockFileType.fromBuffer.mockResolvedValue({
        mime: 'image/png',
        ext: 'png',
      });

      // Test with only mimetype provided
      const result2 = await convertToFile(blob, 'text/plain');
      expect(result2.name).toBe('image.png');
      expect(result2.type).toBe('text/plain');
    });
  });

  describe('File properties', () => {
    it('should set lastModified timestamp', async () => {
      const blob = new Blob(['content']);
      const before = Date.now();

      const result = await convertToFile(blob, 'text/plain', 'test.txt');

      const after = Date.now();
      expect(result.lastModified).toBeGreaterThanOrEqual(before);
      expect(result.lastModified).toBeLessThanOrEqual(after);
    });

    it('should preserve file content', async () => {
      const content = 'test file content';
      const blob = new Blob([content], { type: 'text/plain' });

      const result = await convertToFile(blob, 'text/plain', 'test.txt');

      const resultText = await result.text();
      expect(resultText).toBe(content);
    });
  });
});
