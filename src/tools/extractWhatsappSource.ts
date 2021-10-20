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

import * as fs from 'fs';
import * as path from 'path';

import * as wpp from '../';
import { getPage, WA_DIR } from './browser';

declare global {
  interface Window {
    WPP: typeof wpp;
  }
}

async function start() {
  if (!fs.existsSync(WA_DIR)) {
    fs.mkdirSync(WA_DIR);
  }

  const { browser, page } = await getPage();

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

    let content = body.toString('utf8');

    content = content.replace(/\B!1\b/g, 'false');
    content = content.replace(/\B!0\b/g, 'true');
    content = content.replace(/\bvoid 0\b/g, 'undefined');

    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
  });

  await page.waitForFunction(() => window.WPP?.isReady, null, {
    timeout: 0,
  });

  await browser.close();
}
start();
