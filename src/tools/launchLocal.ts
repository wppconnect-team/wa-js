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

import * as waVersion from '@wppconnect/wa-version';
import * as path from 'path';
import * as playwright from 'playwright';

const URL = 'https://web.whatsapp.com/';

async function start() {
  const browser = await playwright.chromium.launchPersistentContext(
    path.resolve(__dirname, '../../userDataDir'),
    {
      headless: false,
      devtools: true,
    }
  );

  const page = browser.pages().length
    ? browser.pages()[0]
    : await browser.newPage();

  page.route('**', (route, request) => {
    if (request.url() === URL) {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: waVersion.getPageContent(),
      });
    }

    return route.continue();
  });

  page.addInitScript(() => {
    // Remove existent service worker
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      })
      .catch(() => null);

    // Disable service worker registration
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    navigator.serviceWorker.register = new Promise(() => {});
  });

  page.on('domcontentloaded', async () => {
    await page.addScriptTag({
      path: path.resolve(__dirname, '../../dist/wppconnect-wa.js'),
    });
  });

  await page.goto(URL, {
    waitUntil: 'domcontentloaded',
  });
}
start();
