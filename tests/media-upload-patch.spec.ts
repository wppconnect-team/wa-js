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

// This integration check needs a logged-in session so chat patches reach the
// full-ready phase. Run `npm run test:prepare` before the test suite.

import { expect, test } from './wpp-test';

test('media upload worker A/B property stays disabled after injection', async ({
  loggedPage,
}) => {
  const isAuthenticated = await loggedPage.evaluate(() =>
    WPP.conn.isAuthenticated()
  );

  test.skip(
    !isAuthenticated,
    'Requires a logged in session, run `npm run test:prepare`'
  );

  await loggedPage.waitForFunction(() => WPP.isFullReady);

  const value = await loggedPage.evaluate(() =>
    WPP.whatsapp.functions.getABPropConfigValue(
      'web_media_encrypt_upload_in_worker_enabled'
    )
  );

  expect(value).toBe(false);
});
