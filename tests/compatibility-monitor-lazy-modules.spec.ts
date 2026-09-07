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

import { getPage } from '../src/tools/browser';

test('compatibility bindings resolve on a cold WhatsApp page', async () => {
  const { browser, page } = await getPage();
  try {
    await page.addInitScript(() => {
      (window as any).wppForceMainLoad = true;
    });
    await page.waitForFunction(() => window.WPP?.isFullReady, null, {
      timeout: 120_000,
    });
    const reactions = await page.evaluate(() => {
      const native = WPP.loader.loadModule<any>('WAWebReactionsModels');
      const collection = WPP.whatsapp.AggReactionsCollection;
      return {
        type: typeof collection,
        sameConstructor:
          collection === new native.Reactions().reactions.constructor,
        moduleId: WPP.whatsapp._moduleIdMap.get(collection),
      };
    });
    expect.soft(reactions.type).toBe('function');
    expect.soft(reactions.sameConstructor).toBe(true);
    expect.soft(reactions.moduleId).toBe('WAWebReactionsModels');

    for (const [moduleId, binding] of [
      ['WAWebGenerateEventCallLink', 'createEventCallLink'],
      ['WAWebGroupGetCommunityParticipantsJob', 'getCommunityParticipants'],
      ['WAWebSetPrivacyForOneCategoryAction', 'setPrivacyForOneCategory'],
    ]) {
      const result = await page.evaluate(
        async ({ moduleId, binding }) => {
          const ensured = await WPP.loader.ensureLazyModule(moduleId);
          const fn = (WPP.whatsapp.functions as any)[binding];
          return {
            ensured,
            type: typeof fn,
            moduleId: WPP.whatsapp._moduleIdMap.get(fn),
          };
        },
        { moduleId, binding }
      );
      expect.soft(result.ensured, moduleId).toBe(true);
      expect.soft(result.type, binding).toBe('function');
      expect.soft(result.moduleId, binding).toBe(moduleId);
    }
  } finally {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await browser.close();
  }
});
