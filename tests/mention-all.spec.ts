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

import { expect, test } from './wpp-test';

test('prepareRawMessage detects @all without sending a message', async ({
  loggedPage,
}) => {
  await loggedPage.waitForFunction(() => WPP.isFullReady);

  const result = await loggedPage.evaluate(async () => {
    const chat = (await WPP.chat.list({ onlyGroups: true })).find(
      (item) => item.canSend
    );

    if (!chat) {
      return null;
    }

    const detected = await WPP.chat.prepareRawMessage(
      chat,
      { type: 'chat', body: 'Hello @all' },
      { detectMentioned: true }
    );
    const boundary = await WPP.chat.prepareRawMessage(
      chat,
      { type: 'chat', body: 'Hello @alligator' },
      { detectMentioned: true }
    );
    const disabled = await WPP.chat.prepareRawMessage(
      chat,
      { type: 'chat', body: 'Hello @all' },
      { detectMentioned: false }
    );
    const preserved = await WPP.chat.prepareRawMessage(
      chat,
      { type: 'chat', body: 'Hello @all', nonJidMentions: 2 },
      { detectMentioned: true }
    );

    return {
      detected: (detected as any).nonJidMentions ?? 0,
      boundary: (boundary as any).nonJidMentions ?? 0,
      disabled: (disabled as any).nonJidMentions ?? 0,
      preserved: preserved.nonJidMentions ?? 0,
    };
  });

  test.skip(!result, 'No writable group chat is available');

  expect(result!.detected & 1).toBe(1);
  expect(result!.boundary & 1).toBe(0);
  expect(result!.disabled & 1).toBe(0);
  expect(result!.preserved).toBe(3);
});
