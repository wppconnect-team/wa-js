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

import * as util from 'util';

import * as wpp from '../';
import { getPage } from './browser';

declare global {
  interface Window {
    WPP: typeof wpp;
  }
  const WPP: typeof wpp;
  const logStanzaInput: (...args: any[]) => null;
  const logStanzaOutput: (...args: any[]) => null;
}

function inspect(msg: any) {
  return util.inspect(msg, {
    colors: true,
    compact: 10,
    depth: null,
    showHidden: false,
  });
}

async function start() {
  const args = process.argv.slice(2);

  const { page } = await getPage({
    headless: false,
    devtools: false,
    viewport: null,
    args,
  });

  page.exposeFunction('logStanzaInput', (id: string, data: any) => {
    console.log(`Stanza Input (${id}): `, inspect(data));
  });

  page.exposeFunction('logStanzaOutput', (id: string, data: any) => {
    console.log(`Stanza Output (${id}): `, inspect(data));
  });

  page.on('load', async (page) => {
    await page.waitForFunction(() => WPP?.isReady, null, {
      timeout: 0,
    });

    page.evaluate(() => {
      const module = WPP.webpack.search(
        (m) => m.sendIq && m.sendSmaxIq && m.sendIqWithoutRetry
      );

      const sendIq = module.sendIq;
      module.sendIq = function (stanzaData: any, ...args: any[]) {
        const id = stanzaData?.attrs?.id || '';
        logStanzaInput(id, stanzaData);
        const result = sendIq(stanzaData, ...args);
        result.then((r: any) => logStanzaOutput(id, r));
        return result;
      };
      const sendSmaxIq = module.sendSmaxIq;
      module.sendSmaxIq = function (stanzaData: any, ...args: any[]) {
        const id = stanzaData?.attrs?.id || '';
        logStanzaInput(id, stanzaData);
        const result = sendSmaxIq(stanzaData, ...args);
        result.then((r: any) => logStanzaOutput(id, r));
        return result;
      };
      const sendIqWithoutRetry = module.sendIqWithoutRetry;
      module.sendIqWithoutRetry = function (stanzaData: any, ...args: any[]) {
        const id = stanzaData?.attrs?.id || '';
        logStanzaInput(id, stanzaData);
        const result = sendIqWithoutRetry(stanzaData, ...args);
        result.then((r: any) => logStanzaOutput(id, r));
        return result;
      };
    });
  });
}
start();
