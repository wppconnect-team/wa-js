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
  isUsernameKey,
  stripUsernamePrefix,
  UsernameValidationErrorType,
  validateUsername,
  WPPError,
} from '../util';

export class InvalidUsername extends WPPError {
  constructor(
    readonly username: string,
    readonly errorType: UsernameValidationErrorType
  ) {
    super(
      'invalid_username',
      `Invalid username value for ${username}: ${errorType}`,
      { errorType }
    );
  }
}

export class InvalidUsernameKey extends WPPError {
  constructor(readonly key: string) {
    super(
      'invalid_username_key',
      'Invalid username key, it must be a 4 digit numeric PIN'
    );
  }
}

/**
 * Normalize and validate a username
 *
 * Strips a leading `@` and applies WhatsApp's local rules. Returns the
 * normalized username, ready to be handed to a native function.
 *
 * @example
 * ```javascript
 * assertUsername('@someusername'); // 'someusername'
 * assertUsername('ab');            // throws InvalidUsername
 * ```
 */
export function assertUsername(username: string): string {
  const result = validateUsername(username);

  if (!result.isValid) {
    throw new InvalidUsername(username, result.errorType);
  }

  return stripUsernamePrefix(username);
}

/**
 * Validate a username key (the 4 digit numeric PIN that protects a username)
 */
export function assertUsernameKey(key: string): string {
  if (!isUsernameKey(key)) {
    throw new InvalidUsernameKey(key);
  }

  return key;
}
