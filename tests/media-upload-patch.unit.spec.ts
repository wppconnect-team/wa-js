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

import { expect, test } from '@playwright/test';

import {
  forceMediaUploadMainThread,
  MEDIA_UPLOAD_WORKER_AB_PROP,
} from '../src/chat/functions/forceMediaUploadMainThread';

test.describe('media upload A/B property patch', () => {
  test('forces the worker upload property off without calling WhatsApp', () => {
    let calls = 0;
    const getABPropConfigValue = () => {
      calls += 1;
      return true;
    };

    const result = forceMediaUploadMainThread(
      getABPropConfigValue,
      MEDIA_UPLOAD_WORKER_AB_PROP
    );

    expect(result).toBe(false);
    expect(calls).toBe(0);
  });

  test('delegates unrelated properties and preserves their result', () => {
    const value = { enabled: true };
    const receivedKeys: unknown[] = [];
    const getABPropConfigValue = (key: unknown) => {
      receivedKeys.push(key);
      return value;
    };

    const result = forceMediaUploadMainThread(
      getABPropConfigValue,
      'unrelated_property'
    );

    expect(result).toBe(value);
    expect(receivedKeys).toEqual(['unrelated_property']);
  });
});
