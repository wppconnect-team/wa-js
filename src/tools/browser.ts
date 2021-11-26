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
import * as fs from 'fs';
import * as path from 'path';
import * as playwright from 'playwright-chromium';

export const URL = 'https://web.whatsapp.com/';
export const WA_DIR = path.resolve(__dirname, '../../wa-source');

const WA_VERSION = process.env['WA_VERSION'];

type LaunchArguments = Parameters<
  typeof playwright.chromium.launchPersistentContext
>;

export async function getPage(options?: LaunchArguments[1]) {
  const browser = await playwright.chromium.launchPersistentContext(
    path.resolve(__dirname, '../../userDataDir'),
    options
  );

  const page = browser.pages().length
    ? browser.pages()[0]
    : await browser.newPage();

  page.route('https://crashlogs.whatsapp.net/**', (route) => {
    route.abort();
  });

  page.route('https://web.whatsapp.com/**', (route, request) => {
    if (request.url() === URL) {
      return route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: waVersion.getPageContent(WA_VERSION),
      });
    }

    const fileName = path.basename(request.url());
    const filePathDist = path.join(
      path.resolve(__dirname, '../../dist/'),
      fileName
    );

    if (request.url().includes('dist') && fs.existsSync(filePathDist)) {
      return route.fulfill({
        status: 200,
        contentType: 'text/javascript; charset=UTF-8',
        body: fs.readFileSync(filePathDist, { encoding: 'utf8' }),
      });
    }

    const filePathSource = path.join(WA_DIR, fileName);

    if (fs.existsSync(filePathSource)) {
      return route.fulfill({
        status: 200,
        contentType: 'text/javascript; charset=UTF-8',
        body: fs.readFileSync(filePathSource, { encoding: 'utf8' }),
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

  page.on('domcontentloaded', async (page) => {
    await page.addScriptTag({
      url: `${URL}dist/wppconnect-wa.js`,
    });
  });

  setTimeout(async () => {
    await page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await page
      .waitForFunction(
        () => (window as any).Debug.VERSION,
        {},
        { timeout: 120000 }
      )
      .catch(() => null);

    const version = await page
      .evaluate(() => (window as any).Debug.VERSION)
      .catch(() => null);

    console.log('WhatsApp Version: ', version);
  }, 1000);

  return { browser, page };
}
