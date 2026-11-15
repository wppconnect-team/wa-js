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
import * as crypto from 'crypto';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import * as nodeUrl from 'url';
import { runInNewContext } from 'vm';

async function routeDocument(
  target: string,
  version = '2.3000.1054241206-alpha'
) {
  const registered: Array<{ pattern: unknown; callback: any }> = [];
  const calls: any[] = [];
  let launches = 0;
  const exports: any = {};
  const html = '<html>exact locked version</html>';
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/tools/browser.ts'), 'utf8'),
      {
        compilerOptions: { module: ModuleKind.CommonJS },
      }
    ).outputText,
    {
      exports,
      __dirname: path.resolve(__dirname, '../src/tools'),
      process: { env: { WA_VERSION: version } },
      console: { log: () => {}, warn: () => {} },
      require(id: string) {
        if (id === '@wppconnect/wa-version')
          return {
            getLatestVersion: () => '2.3000.1054241206-alpha',
            getPageContent: () => html,
          };
        if (id === 'fs')
          return {
            existsSync: () => false,
            mkdirSync: () => {},
            writeFileSync: () => {},
          };
        if (id === 'playwright-chromium')
          return {
            chromium: {
              launchPersistentContext: async () => {
                launches++;
                throw new Error('Test browser launch');
              },
            },
          };
        if (id === 'file-type') return {};
        if (id === 'crypto') return crypto;
        if (id === 'path') return path;
        if (id === 'url') return nodeUrl;
        throw new Error(`Unexpected dependency ${id}`);
      },
    }
  );
  await exports.preparePage({
    route: (pattern: unknown, callback: any) =>
      registered.push({ pattern, callback }),
    on: () => {},
    addInitScript: () => {},
  });
  const handler = registered.find(
    (r) => typeof r.pattern !== 'string'
  )!.callback;
  await handler(
    {
      fulfill: (value: any) => calls.push({ action: 'fulfill', ...value }),
      continue: () => calls.push({ action: 'continue' }),
    },
    { url: () => target, resourceType: () => 'document' }
  );
  return {
    calls,
    html,
    extract: (html: string) => exports.extractVersionFromHtml(html),
    launches: () => launches,
    start: async () => await exports.getPage(),
  };
}

for (const suffix of ['', '?app_launch=1', '?post_logout=1&app=1']) {
  test(`a pinned root document${suffix} cannot escape to the live version`, async () => {
    const f = await routeDocument('https://web.whatsapp.com/' + suffix);
    expect(f.calls).toEqual([
      {
        action: 'fulfill',
        status: 200,
        contentType: 'text/html',
        body: f.html,
      },
    ]);
  });
}

test('latest document navigation retains the intentional live-network behavior', async () => {
  const f = await routeDocument(
    'https://web.whatsapp.com/?app_launch=1',
    'latest'
  );
  expect(f.calls).toEqual([{ action: 'continue' }]);
});

test('other document paths are not replaced by a WhatsApp index fixture', async () => {
  const f = await routeDocument('https://web.whatsapp.com/help?app_launch=1');
  expect(f.calls).toEqual([{ action: 'continue' }]);
});

test('a missing pinned HTML version fails before a browser can launch', async () => {
  const f = await routeDocument('https://web.whatsapp.com/');
  await expect(f.start()).rejects.toThrow(
    'Cannot determine the selected WhatsApp HTML version'
  );
  expect(f.launches()).toBe(0);
});

test('explicit latest mode does not require a pinned HTML version', async () => {
  const f = await routeDocument('https://web.whatsapp.com/', 'latest');
  await expect(f.start()).rejects.toThrow('Test browser launch');
  expect(f.launches()).toBe(1);
});

test('client_revision identifies snapshots without a main-script version suffix', async () => {
  const f = await routeDocument('https://web.whatsapp.com/');
  expect(
    f.extract('{"server_revision":1053000000,"client_revision":1053060988}')
  ).toBe('2.3000.1053060988');
});

test('older main-script snapshots retain their exact version extraction', async () => {
  const f = await routeDocument('https://web.whatsapp.com/');
  expect(f.extract('src="1054241206_main.js"')).toBe('2.3000.1054241206');
});

test('repeated equal client revisions are valid but conflicting revisions cannot pass a pin', async () => {
  const f = await routeDocument('https://web.whatsapp.com/');
  expect(
    f.extract('{"client_revision":1053060988}{"client_revision":1053060988}')
  ).toBe('2.3000.1053060988');
  expect(
    f.extract('{"client_revision":1053060988}{"client_revision":1054241206}')
  ).toBeNull();
});

test('a server revision alone cannot substitute for the client build', async () => {
  const f = await routeDocument('https://web.whatsapp.com/');
  expect(f.extract('{"server_revision":1053060988}')).toBeNull();
});
