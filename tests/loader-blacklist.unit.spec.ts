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

import { expect, test } from '@playwright/test';

import { isMetaModuleBlacklisted } from '../src/loader/blacklist';

test.describe('loader blacklist', () => {
  test('skips every WAWebMoment locale module', () => {
    for (const id of [
      'WAWebMoment-en-in',
      'WAWebMoment-es-do',
      'WAWebMoment-sw',
    ]) {
      expect(isMetaModuleBlacklisted(id)).toBe(true);
    }
  });

  test('skips explicitly blacklisted modules', () => {
    expect(
      isMetaModuleBlacklisted('WAWebEmojiPanelContentEmojiSearchEmpty.react')
    ).toBe(true);
  });

  test('does not skip unrelated modules', () => {
    expect(isMetaModuleBlacklisted('WAWebChatCollection')).toBe(false);
    expect(isMetaModuleBlacklisted('WAWebMomentHelper')).toBe(false);
  });
});
