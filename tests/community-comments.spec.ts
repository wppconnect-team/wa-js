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

import { expect, test } from '@playwright/test';
import { chromium } from 'playwright-chromium';

import { preparePage, URL } from '../src/tools/browser';

test('comment bindings resolve on a fresh unauthenticated page without sending', async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_EXECUTABLE,
  });
  try {
    const probe = await browser.newPage();
    const userAgent = await probe.evaluate(() => navigator.userAgent);
    await probe.close();
    const context = await browser.newContext({
      userAgent: userAgent.replace('HeadlessChrome', 'Chrome'),
    });
    const page = await context.newPage();
    await preparePage(page);
    await page.addInitScript(() => {
      (window as any).wppForceMainLoad = true;
    });
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await page.waitForFunction(() => window.WPP?.isFullReady, null, {
      timeout: 120_000,
    });
    const result = await page.evaluate(async () => {
      const ensured = await WPP.loader.ensureLazyModule(
        'WAWebSendCommentMessageAction'
      );
      const reader = WPP.whatsapp.functions.getCommentsByParentMsgKey;
      const sender = WPP.whatsapp.functions.sendCommentMessage;
      return {
        publicReader: typeof WPP.chat.getComments,
        publicSender: typeof WPP.chat.sendCommentMessage,
        reader: typeof reader,
        readerModule: WPP.whatsapp._moduleIdMap.get(reader),
        sender: typeof sender,
        senderModule: WPP.whatsapp._moduleIdMap.get(sender),
        store: Boolean(WPP.whatsapp.CommentStore),
        ensured,
      };
    });
    expect(result).toEqual({
      publicReader: 'function',
      publicSender: 'function',
      reader: 'function',
      readerModule: 'WAWebAddonCommentTableMode',
      sender: 'function',
      senderModule: 'WAWebSendCommentMessageAction',
      store: true,
      ensured: true,
    });
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  } finally {
    await browser.close();
  }
});
