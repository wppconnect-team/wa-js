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

test.describe('chat list filters', () => {
  test('emits the effective filter for native tab clicks', async ({
    loggedPage,
  }) => {
    await loggedPage.waitForFunction(() => WPP.isFullReady);

    const filterTabs = loggedPage.locator(
      '[role="tablist"][aria-label="chat-list-filters"] [role="tab"]'
    );
    expect(await filterTabs.count()).toBeGreaterThan(1);

    await filterTabs.nth(0).click();
    const filterEvent = loggedPage.evaluate(async () => {
      const [activeFilter] = await WPP.waitFor('chat.active_filter', 5_000);
      return activeFilter;
    });

    try {
      await filterTabs.nth(1).click();
      await expect(filterEvent).resolves.toMatchObject({ kind: 'unread' });
    } finally {
      await filterTabs.nth(0).click();
    }
  });

  test('matches a phone-number ID to its LID chat', async ({ loggedPage }) => {
    await loggedPage.waitForFunction(() => WPP.isFullReady);

    const matched = await loggedPage.evaluate(async () => {
      const chats = await WPP.chat.list({ onlyUsers: true });
      const candidate = chats
        .map((chat) => ({
          chat,
          phoneNumber: chat.id.isLid()
            ? WPP.whatsapp.lidPnCache?.getPhoneNumber?.(chat.id)
            : undefined,
        }))
        .find(({ phoneNumber }) => phoneNumber);

      if (!candidate?.phoneNumber) {
        return null;
      }

      try {
        await WPP.chat.setChatList('custom' as any, [
          candidate.phoneNumber.toString(),
        ]);
        return WPP.whatsapp.functions.getShouldAppearInList(candidate.chat);
      } finally {
        await WPP.chat.setChatList('all' as any);
      }
    });

    test.skip(
      matched == null,
      'No chat with a cached LID mapping is available'
    );

    expect(matched).toBe(true);
  });
});
