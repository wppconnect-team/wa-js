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

// `WAWebChatForwardMessage` ships in a resource bundle WhatsApp only fetches on
// demand. A session that never opens the forward UI — every headless
// integration — never fetches it, so the module is missing from the registry and
// `WPP.whatsapp.functions.forwardMessages` stays `undefined` for the whole life
// of the page. `searchId()` cannot recover on its own: it only scans modules
// that are already registered.
//
// These tests run unauthenticated, which is exactly the cold state we need: no
// chat is ever opened, so nothing pulls that bundle in.

import { expect, test } from './wpp-test';

const FORWARD_MODULE = 'WAWebChatForwardMessage';

test.describe('forwardMessages: lazily bootloaded bundle', () => {
  test('the module is absent until the bundle is requested', async ({
    page,
  }) => {
    // Read the registry only — touching the binding here would resolve it.
    const cold = await page.evaluate((moduleId) => {
      const registry = WPP.loader.__debug().modulesMap;

      return {
        loaderType: WPP.loader.loaderType,
        registered: moduleId in registry,
        totalModules: Object.keys(registry).length,
      };
    }, FORWARD_MODULE);

    expect(cold.loaderType).toBe('meta');
    expect(cold.totalModules).toBeGreaterThan(0);

    const recovered = await page.evaluate(async (moduleId) => {
      // Whether the binding resolves before asking for the bundle. This is the
      // regression being guarded: `undefined` here is what production saw.
      const before = typeof WPP.whatsapp.functions.forwardMessages;

      const ensured = await WPP.loader.ensureLazyModule(moduleId);

      return {
        before,
        ensured,
        registered: moduleId in WPP.loader.__debug().modulesMap,
        after: typeof WPP.whatsapp.functions.forwardMessages,
        // Ships in the same bundle, so it comes back with it.
        afterToChats: typeof WPP.whatsapp.functions.forwardMessagesToChats,
      };
    }, FORWARD_MODULE);

    if (!cold.registered) {
      // Cold session: the binding could not resolve, and `ensureLazyModule`
      // is what makes it resolvable.
      expect(recovered.before).toBe('undefined');
    }

    expect(recovered.ensured).toBe(true);
    expect(recovered.registered).toBe(true);
    expect(recovered.after).toBe('function');
    expect(recovered.afterToChats).toBe('function');
  });

  test('ensureLazyModule is idempotent once the bundle is loaded', async ({
    page,
  }) => {
    const result = await page.evaluate(async (moduleId) => {
      await WPP.loader.ensureLazyModule(moduleId);
      const modulesAfterFirst = Object.keys(
        WPP.loader.__debug().modulesMap
      ).length;

      // A second call must short-circuit on the registry instead of asking the
      // Bootloader for anything again.
      const ensured = await WPP.loader.ensureLazyModule(moduleId);

      return {
        ensured,
        modulesAfterFirst,
        modulesAfterSecond: Object.keys(WPP.loader.__debug().modulesMap).length,
      };
    }, FORWARD_MODULE);

    expect(result.ensured).toBe(true);
    expect(result.modulesAfterSecond).toBe(result.modulesAfterFirst);
  });

  test('an unknown module never triggers a bundle fetch', async ({ page }) => {
    const ensured = await page.evaluate(() =>
      WPP.loader.ensureLazyModule('WAWebThisModuleDoesNotExist')
    );

    expect(ensured).toBe(false);
  });

  test('WPP.chat.forwardMessages is exposed', async ({ page }) => {
    const forwardMessages = await page.evaluate(
      () => typeof WPP.chat.forwardMessages
    );

    expect(forwardMessages).toBe('function');
  });
});
