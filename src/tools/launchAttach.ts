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

import * as playwright from 'playwright-chromium';

import { preparePage, URL } from './browser';

async function start() {
  console.log('Connecting to Chrome');
  const browser = await playwright.chromium.connectOverCDP(
    'http://localhost:9222'
  );
  console.log('Connected');

  const context = browser.contexts()[0];

  const page = context.pages().length
    ? context.pages()[0]
    : await context.newPage();

  console.log('Preparing page');
  await preparePage(page);

  setTimeout(async () => {
    console.log('Opening WhatsApp WEB');
    await page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    await page
      .waitForFunction(
        () => (window as any).Debug?.VERSION,
        {},
        { timeout: 120000 }
      )
      .catch(() => null);

    const version = await page
      .evaluate(() => (window as any).Debug.VERSION)
      .catch(() => null);

    console.log('WhatsApp Version: ', version);
  }, 1000);

  page.on('load', (page) => {
    const debug = process.env['DEBUG'] || '*';

    page.evaluate((debug: string) => {
      localStorage.setItem('debug', debug);
    }, debug);
  });
}
start();
