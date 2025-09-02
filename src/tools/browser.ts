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
import * as crypto from 'crypto';
import FileType from 'file-type';
import * as fs from 'fs';
import * as path from 'path';
import * as playwright from 'playwright-chromium';
import * as url from 'url';

export const URL = 'https://web.whatsapp.com/';
export const WA_DIR = path.resolve(__dirname, '../../wa-source');

const WA_VERSION = process.env['WA_VERSION'] || waVersion.getLatestVersion();

type LaunchArguments = Parameters<
  typeof playwright.chromium.launchPersistentContext
>;

export async function preparePage(page: playwright.Page) {
  page.route('https://crashlogs.whatsapp.net/**', (route) => route.abort());
  page.route('https://dit.whatsapp.net/deidentified_telemetry', (route) =>
    route.abort()
  );

  page.route(
    /^https:\/\/(web\.whatsapp\.com|static\.whatsapp\.net)\//,
    async (route, request) => {
      if (request.url() === URL) {
        return route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: waVersion.getPageContent(WA_VERSION),
        });
      }

      const fileName = path.basename(url.parse(request.url()).pathname!);
      const filePathDist = path.join(
        path.resolve(__dirname, '../../dist/'),
        fileName
      );

      if (request.url().includes('dist') && fs.existsSync(filePathDist)) {
        return route.fulfill({
          status: 200,
          contentType: 'text/javascript; charset=UTF-8',
          body: fs.readFileSync(filePathDist, 'utf8'),
        });
      }

      const filePathSource = path.join(WA_DIR, fileName);
      if (fs.existsSync(filePathSource)) {
        return route.fulfill({
          status: 200,
          contentType: 'text/javascript; charset=UTF-8',
          body: fs.readFileSync(filePathSource, 'utf8'),
        });
      }

      const hash = crypto
        .createHash('md5')
        .update(request.url())
        .digest('hex')
        .substring(0, 12);
      const ext = path.extname(fileName) || '.js';
      const safeFileName = `${hash}${ext}`;
      const filePathSourceHash = path.join(WA_DIR, safeFileName);

      if (fs.existsSync(filePathSourceHash)) {
        return route.fulfill({
          status: 200,
          contentType: 'text/javascript; charset=UTF-8',
          body: fs.readFileSync(filePathSourceHash, 'utf8'),
        });
      }

      if (fileName.endsWith('.js')) {
        if (!fs.existsSync(WA_DIR)) fs.mkdirSync(WA_DIR);

        const response = await route.fetch();
        const body = await response.body();
        fs.writeFileSync(filePathSourceHash, body);
      }

      return route.continue();
    }
  );

  page.addInitScript(() => {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()))
      .catch(() => null);

    // Disable service worker registration
    // @ts-expect-error: Service worker registration is intentionally disabled
    navigator.serviceWorker.register = new Promise(() => {});

    setInterval(() => {
      window.onerror = console.error;
      window.onunhandledrejection = console.error;
    }, 500);
  });

  page.on('load', async () => {
    await page.addScriptTag({ url: `${URL}dist/wppconnect-wa.js` });

    const mediaPath = path.resolve(__dirname, '../../media/');
    if (!fs.existsSync(mediaPath)) return;

    fs.readdirSync(mediaPath).forEach(async (filename) => {
      const filePath = path.join(mediaPath, filename);
      const content = fs.readFileSync(filePath, 'base64');
      const mime = await FileType.fromFile(filePath);

      const base64 = `data:${mime?.mime || 'application/octet-stream'};base64,${content}`;
      page.evaluate(
        ({ filename, base64 }) => {
          (window as any).media = (window as any).media || {};
          (window as any).media[filename] = base64;
        },
        { filename, base64 }
      );
    });
  });
}

export async function getPage(options?: LaunchArguments[1]) {
  let userDataDir = path.resolve(__dirname, '../../userDataDir');
  if (Array.isArray(options?.args)) {
    const index = options?.args.findIndex((a) =>
      a.startsWith('--user-data-dir')
    );
    if (index > -1) {
      const param = options?.args[index];
      options.args.splice(index, 1);
      userDataDir = param.split('=')[1] || userDataDir;
    }
  }

  const browser = await playwright.chromium.launchPersistentContext(
    userDataDir,
    options
  );
  const page = browser.pages().length
    ? browser.pages()[0]
    : await browser.newPage();

  await preparePage(page);

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 });

  // Aguarda o WPPConnect ser carregado
  await page.waitForFunction(() => !!(window as any).WPP?.whatsapp, {
    timeout: 120000,
  });

  // Obtém versão do WhatsApp
  const version = await page.evaluate(
    () => (window as any).Debug?.VERSION || (window as any).WPP?.version || null
  );

  console.log('WhatsApp Version: ', version);

  return { browser, page, version };
}
