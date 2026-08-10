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

/**
 * Local username rules, mirrored from WhatsApp's
 * `WAWebUsernameConstants` and `WAWebUsernameValidationUtils`.
 *
 * These are the same checks WhatsApp Web applies before it sends a username
 * query, so running them locally avoids a pointless round trip and, more
 * importantly, keeps "this username is malformed" distinguishable from "this
 * username does not exist" (WhatsApp reports both as an empty result).
 */

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 35;
export const USERNAME_KEY_LENGTH = 4;

const ALLOWED_CHARS = /^[A-Za-z0-9_.]*$/;
const HAS_LETTER = /[A-Za-z]/;
const USERNAME_KEY = /^[0-9]{4}$/;

const INVALID_DOMAIN_SUFFIXES = [
  '.com',
  '.org',
  '.net',
  '.int',
  '.edu',
  '.gov',
  '.mil',
  '.arpa',
  '.html',
  '.htm',
  '.txt',
  '.xml',
];

const INVALID_WORDS = ['whatsapp', 'instagram', 'facebook', 'oculus'];

export type UsernameValidationErrorType =
  | 'INVALID_CHARACTER'
  | 'INVALID_LENGTH'
  | 'INVALID_NO_LETTERS'
  | 'INVALID_PERIODS'
  | 'INVALID_DOMAIN_SUFFIX'
  | 'INVALID_WWW_PREFIX'
  | 'INVALID_WORD';

export type UsernameValidationResult =
  | { isValid: true }
  | { isValid: false; errorType: UsernameValidationErrorType };

/**
 * Remove the leading `@` from a username, if present
 *
 * WhatsApp accepts a prefixed username but logs a warning and reports it, so
 * always strip it before handing the value to a native function.
 *
 * @example
 * ```javascript
 * stripUsernamePrefix('@someusername'); // 'someusername'
 * stripUsernamePrefix('someusername');  // 'someusername'
 * ```
 */
export function stripUsernamePrefix(username: string): string {
  return username.startsWith('@') ? username.slice(1) : username;
}

/**
 * Validate a username against WhatsApp's local rules
 *
 * The `@` prefix is stripped before validating.
 *
 * @example
 * ```javascript
 * validateUsername('someusername'); // { isValid: true }
 * validateUsername('ab');           // { isValid: false, errorType: 'INVALID_LENGTH' }
 * ```
 */
export function validateUsername(username: string): UsernameValidationResult {
  const value = stripUsernamePrefix(username);
  const lower = value.toLowerCase();

  if (!ALLOWED_CHARS.test(value)) {
    return { isValid: false, errorType: 'INVALID_CHARACTER' };
  }

  if (
    value.length < USERNAME_MIN_LENGTH ||
    value.length > USERNAME_MAX_LENGTH
  ) {
    return { isValid: false, errorType: 'INVALID_LENGTH' };
  }

  if (!HAS_LETTER.test(value)) {
    return { isValid: false, errorType: 'INVALID_NO_LETTERS' };
  }

  if (value.startsWith('.') || value.endsWith('.') || value.includes('..')) {
    return { isValid: false, errorType: 'INVALID_PERIODS' };
  }

  if (lower.startsWith('www.')) {
    return { isValid: false, errorType: 'INVALID_WWW_PREFIX' };
  }

  if (INVALID_DOMAIN_SUFFIXES.some((suffix) => lower.endsWith(suffix))) {
    return { isValid: false, errorType: 'INVALID_DOMAIN_SUFFIX' };
  }

  if (INVALID_WORDS.some((word) => lower.includes(word))) {
    return { isValid: false, errorType: 'INVALID_WORD' };
  }

  return { isValid: true };
}

/**
 * Check whether a value is a valid username key (a 4 digit numeric PIN)
 */
export function isUsernameKey(key: string): boolean {
  return USERNAME_KEY.test(key);
}
