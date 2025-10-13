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

import { describe, expect, it } from 'vitest';

import { isUrl } from './isUrl';

describe('isUrl', () => {
  it('should return true for valid HTTP URLs', () => {
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('http://www.example.com')).toBe(true);
    expect(isUrl('http://example.com/path')).toBe(true);
    expect(isUrl('http://example.com:8080')).toBe(true);
  });

  it('should return true for valid HTTPS URLs', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('https://www.example.com')).toBe(true);
    expect(isUrl('https://example.com/path')).toBe(true);
    expect(isUrl('https://example.com:443')).toBe(true);
  });

  it('should handle URLs with query parameters and fragments', () => {
    expect(isUrl('https://example.com?param=value')).toBe(true);
    expect(isUrl('https://example.com#fragment')).toBe(true);
    expect(isUrl('https://example.com/path?param=value#fragment')).toBe(true);
  });

  it('should handle case insensitive protocols', () => {
    expect(isUrl('HTTP://example.com')).toBe(true);
    expect(isUrl('HTTPS://example.com')).toBe(true);
    expect(isUrl('Http://example.com')).toBe(true);
    expect(isUrl('Https://example.com')).toBe(true);
  });

  it('should handle URLs with whitespace', () => {
    expect(isUrl('  https://example.com  ')).toBe(true);
    expect(isUrl('\t\nhttp://example.com\n\t')).toBe(true);
  });

  it('should return false for invalid inputs', () => {
    expect(isUrl('')).toBe(false);
    expect(isUrl('   ')).toBe(false);
    expect(isUrl(null as any)).toBe(false);
    expect(isUrl(undefined as any)).toBe(false);
    expect(isUrl(123 as any)).toBe(false);
    expect(isUrl({} as any)).toBe(false);
  });

  it('should return false for non-HTTP/HTTPS protocols', () => {
    expect(isUrl('ftp://example.com')).toBe(false);
    expect(isUrl('file:///path/to/file')).toBe(false);
    expect(isUrl('mailto:user@example.com')).toBe(false);
    expect(isUrl('tel:+1234567890')).toBe(false);
  });

  it('should return false for URLs without protocol', () => {
    expect(isUrl('example.com')).toBe(false);
    expect(isUrl('www.example.com')).toBe(false);
    expect(isUrl('//example.com')).toBe(false);
  });

  it('should return false for malformed URLs', () => {
    expect(isUrl('http://')).toBe(false);
    expect(isUrl('https://')).toBe(false);
    expect(isUrl('http:// ')).toBe(false);
    expect(isUrl('http://[invalid')).toBe(false);
  });

  it('should efficiently handle large base64 strings (data URLs)', () => {
    const largeBase64 = 'data:image/png;base64,' + 'A'.repeat(10000);
    expect(isUrl(largeBase64)).toBe(false);
  });

  it('should efficiently handle very long non-URL strings', () => {
    const longString = 'not-a-url-' + 'x'.repeat(5000);
    expect(isUrl(longString)).toBe(false);
  });

  it('should accept reasonable length URLs', () => {
    const reasonableUrl =
      'https://example.com/' + 'path/'.repeat(50) + '?param=value';
    expect(isUrl(reasonableUrl)).toBe(true);
  });
});
