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

import {
  BrowserContext,
  chromium,
  firefox,
  Page,
  test as base,
  webkit,
} from '@playwright/test';
import * as os from 'os';
import * as path from 'path';

export { expect } from '@playwright/test';

export type TestOptions = {
  loggedContext: BrowserContext;
  loggedPage: Page;
};

const prepareWhatsAppPage = async (page: Page) => {
  // Inject via addInitScript, not addScriptTag: WhatsApp Web >= 2.3000 ships a
  // strict nonce-based CSP with no 'unsafe-inline', so addScriptTag's inline
  // <script> is blocked ("Executing inline script violates ... script-src ...
  // nonce-..."). addInitScript is evaluated by the browser via CDP before the
  // page's own scripts (not as a DOM node), so it bypasses the page CSP — the
  // same mechanism a MAIN-world extension content script uses, and the timing
  // (document_start) the Meta loader's __d/require setter traps are built for.
  // Must be registered before navigation so it runs on the initial load.
  await page.addInitScript({
    path: path.join(__dirname, '../dist/wppconnect-wa.js'),
  });

  await page.goto('https://web.whatsapp.com/', {
    waitUntil: 'domcontentloaded',
  });

  // The loader converges via timers (retry poll + 500ms generation tick) once
  // WhatsApp registers its modules, so allow generous headroom over the
  // Playwright default (30s) for `isReady` on a cold, unauthenticated page.
  await page.waitForFunction(() => WPP && WPP.isReady, undefined, {
    timeout: 120_000,
  });
};

export const test = base.extend<TestOptions>({
  page: async ({ page }, use) => {
    await prepareWhatsAppPage(page);

    await use(page);
  },
  loggedContext: async ({ browserName, contextOptions }, use) => {
    const userDataDir = path.join(os.tmpdir(), `wa-js-test-${browserName}`);

    const browsers = { chromium, firefox, webkit };

    const loggedContext = await browsers[browserName].launchPersistentContext(
      userDataDir,
      contextOptions
    );

    await use(loggedContext);
    await loggedContext.close();
  },
  loggedPage: async ({ loggedContext: cleanContext }, use) => {
    const cleanPage = cleanContext.pages().length
      ? cleanContext.pages()[0]
      : await cleanContext.newPage();

    await prepareWhatsAppPage(cleanPage);

    await use(cleanPage);
    await cleanPage.close();
  },
});
