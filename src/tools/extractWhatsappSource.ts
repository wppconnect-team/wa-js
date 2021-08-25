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
import * as jsbeautify from 'js-beautify';
import * as path from 'path';
import * as playwright from 'playwright';
import * as prettier from 'prettier';

declare global {
  interface Window {
    WPP: any;
  }
}

const URL = 'https://web.whatsapp.com/';

const WA_DIR = path.resolve(__dirname, '../../wa-source');

async function start() {
  if (!fs.existsSync(WA_DIR)) {
    fs.mkdirSync(WA_DIR);
  }

  const browser = await playwright.chromium.launchPersistentContext(
    path.resolve(__dirname, '../../userDataDir')
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

  page.on('response', async (response) => {
    const contentType = response.headers()['content-type'] || '';

    if (!contentType.startsWith('application/javascript')) {
      return;
    }

    const url = response.url();
    const fileName = path.basename(url, '.js') + '.js';
    const filePath = path.join(WA_DIR, fileName);

    if (fs.existsSync(filePath)) {
      return;
    }
    console.log('Downloading: ', fileName);

    const body = await response.body();

    fs.writeFileSync(filePath, body, { encoding: 'utf8' });
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

  await page.waitForFunction(() => window.WPP?.isReady, null, {
    timeout: 0,
  });

  await browser.close();
}
start();
