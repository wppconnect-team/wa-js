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

// These tests need a logged in session, run `npm run test:prepare` before.

import { expect, test } from './wpp-test';

type CustomListResult = {
  /** The chat targeted by the custom list appears in the list */
  target: boolean;
  /** Any other chat is filtered out of the list */
  other: boolean;
} | null;

test.describe('setChatList: custom list', () => {
  test.beforeEach(async ({ loggedPage }) => {
    const isAuthenticated = await loggedPage.evaluate(() =>
      WPP.conn.isAuthenticated()
    );

    test.skip(
      !isAuthenticated,
      'Requires a logged in session, run `npm run test:prepare`'
    );

    await loggedPage.waitForFunction(() => WPP.isFullReady);
  });

  /**
   * WhatsApp Web stores 1:1 chats by LID or by phone number depending on the
   * addressing mode, the custom list must accept both for the same chat.
   */
  for (const direction of ['pn-to-lid', 'lid-to-pn'] as const) {
    test(`matches a chat by its equivalent id (${direction})`, async ({
      loggedPage,
    }) => {
      const result = await loggedPage.evaluate<CustomListResult, string>(
        async (direction) => {
          const chats = await WPP.chat.list({ onlyUsers: true });

          // Send to setChatList the id that the chat is NOT stored by
          const equivalentIdOf = (chat: (typeof chats)[number]) =>
            direction === 'pn-to-lid'
              ? chat.id.isLid()
                ? WPP.whatsapp.lidPnCache?.getPhoneNumber?.(chat.id)
                : undefined
              : chat.id.server === 'c.us'
                ? WPP.whatsapp.lidPnCache?.getCurrentLid?.(chat.id)
                : undefined;

          const target = chats
            .map((chat) => ({ chat, equivalentId: equivalentIdOf(chat) }))
            .find(({ equivalentId }) => equivalentId);

          if (!target?.equivalentId) {
            return null;
          }

          // The same contact can have both a phone number and a LID chat, the
          // control chat must not be any of the ids of the target one
          const targetIds = [target.chat.id, target.equivalentId].map((id) =>
            id.toString()
          );

          const other = chats.find(
            (chat) =>
              !targetIds.includes(chat.id.toString()) &&
              !targetIds.includes(equivalentIdOf(chat)?.toString() ?? '')
          );

          if (!other) {
            return null;
          }

          try {
            await WPP.chat.setChatList('custom' as any, [
              target.equivalentId.toString(),
            ]);

            return {
              target: WPP.whatsapp.functions.getShouldAppearInList(target.chat),
              other: WPP.whatsapp.functions.getShouldAppearInList(other),
            };
          } finally {
            await WPP.chat.setChatList('all' as any);
          }
        },
        direction
      );

      test.skip(
        result == null,
        `No chat with a cached ${direction} mapping is available`
      );

      expect(result?.target, 'the chat of the custom list must be shown').toBe(
        true
      );
      expect(result?.other, 'any other chat must be hidden').toBe(false);
    });
  }
});
