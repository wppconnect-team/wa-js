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
import * as prettier from 'prettier';

import * as wpp from '../';
import { getPage, WA_DIR } from './browser';

declare global {
  interface Window {
    WPP: typeof wpp;
  }
}

const WA_VERSION = process.env['WA_VERSION'] || waVersion.getLatestVersion();

async function start() {
  const args = process.argv.slice(2);

  if (!fs.existsSync(WA_DIR)) {
    fs.mkdirSync(WA_DIR);
  }

  const options = await prettier.resolveConfig(process.cwd());

  const { browser, page } = await getPage({
    args,
  });

  const downloads: Promise<void>[] = [];

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

    let resolve: any = null;
    downloads.push(
      new Promise((r) => {
        resolve = r;
      })
    );

    console.log('Downloading: ', fileName);

    const body = await response.body();

    let content = body.toString('utf8');

    content = content.replace(/([ ,:;=>(){}[\]|&])!1\b/g, '$1false');
    content = content.replace(/([ ,:;=>(){}[\]|&])!0\b/g, '$1true');
    content = content.replace(/\b(return|case)\s*!1\b/g, '$1 false');
    content = content.replace(/\b(return|case)\s*!0\b/g, '$1 true');
    content = content.replace(/\bvoid 0\b/g, 'undefined');
    // Remove sourcemap because it not exists in production
    content = content.replace(/\/\/# sourceMappingURL.*/g, '');

    content = prettier.format(content, {
      ...options!,
      parser: 'espree',
      printWidth: 120,
    });

    content = `/*! WhatsApp Version: ${WA_VERSION} */\n` + content;

    fs.writeFileSync(filePath, content, { encoding: 'utf8' });

    resolve?.();
  });

  await page.waitForFunction(() => window.WPP?.isReady, null, {
    timeout: 0,
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await Promise.all(downloads);

  await browser.close();
}
start();
