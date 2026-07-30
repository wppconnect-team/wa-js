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

import type { RawMessage } from '../dist/chat';
import { expect, test } from './wpp-test';

test('prepareRawMessage detects @all without sending a message', async ({
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

  const result = await loggedPage.evaluate(async () => {
    const chat = (await WPP.chat.list({ onlyGroups: true })).find(
      (item) => item.canSend
    );

    if (!chat) {
      return null;
    }

    const prepare = (message: RawMessage, detectMentioned = true) =>
      WPP.chat.prepareRawMessage(chat, message, { detectMentioned });

    const detected = await prepare({ type: 'chat', body: 'Hello @all' });
    const boundary = await prepare({
      type: 'chat',
      body: 'Hello @alligator',
    });
    const email = await prepare({ type: 'chat', body: 'mail@all.com' });
    const disabled = await prepare({ type: 'chat', body: 'Hello @all' }, false);
    const preserved = await prepare({
      type: 'chat',
      body: 'Hello @all',
      nonJidMentions: 2,
    });

    return {
      detected: detected.nonJidMentions ?? 0,
      boundary: boundary.nonJidMentions ?? 0,
      email: email.nonJidMentions ?? 0,
      disabled: disabled.nonJidMentions ?? 0,
      preserved: preserved.nonJidMentions ?? 0,
    };
  });

  test.skip(!result, 'No writable group chat is available');

  expect(result!.detected & 1).toBe(1);
  expect(result!.boundary & 1).toBe(0);
  expect(result!.email & 1).toBe(0);
  expect(result!.disabled & 1).toBe(0);
  expect(result!.preserved).toBe(3);
});
