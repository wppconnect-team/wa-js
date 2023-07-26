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
import fetch from 'node-fetch';
import * as path from 'path';
import * as prettier from 'prettier';

import { WA_DIR } from './browser';

const WA_VERSION = process.env['WA_VERSION'] || waVersion.getLatestVersion();

async function start() {
  const options = await prettier.resolveConfig(process.cwd());

  if (!fs.existsSync(WA_DIR)) {
    fs.mkdirSync(WA_DIR);
  }
  if (!fs.existsSync(`${WA_DIR}/locales`)) {
    fs.mkdirSync(`${WA_DIR}/locales`);
  }

  const fullVersion =
    waVersion.getAvailableVersions(WA_VERSION).reverse()[0] || WA_VERSION;

  const version = fullVersion.replace('-beta', '');

  const respAsset = await fetch(
    `https://web.whatsapp.com/assets-manifest-${version}.json`
  );

  if (!respAsset.ok) {
    console.error(`No version found for ${WA_VERSION}`);
    return;
  }

  const json = await respAsset.json();

  const files = Object.keys(json)
    .filter((f) => /\.js$/.test(f))
    .filter((f) => !/locales/.test(f) || /locales\/en(\.|-json)/.test(f));

  const downloads = files.map(async (file) => {
    const filePath = path.join(WA_DIR, file);

    if (fs.existsSync(filePath)) {
      return;
    }

    console.log('Downloading: ', file);
    const respFile = await fetch(`https://web.whatsapp.com/${file}`);

    let content = await respFile.text();

    content = content.replace(/([ ,:;=>(){}[\]|&])!1\b/g, '$1false');
    content = content.replace(/([ ,:;=>(){}[\]|&])!0\b/g, '$1true');
    content = content.replace(/\b(return|case)\s*!1\b/g, '$1 false');
    content = content.replace(/\b(return|case)\s*!0\b/g, '$1 true');
    content = content.replace(/\bvoid 0\b/g, 'undefined');
    // Remove sourcemap because it not exists in production
    content = content.replace(/\/\/# sourceMappingURL.*/g, '');

    content = await prettier.format(content, {
      ...options!,
      parser: 'espree',
      printWidth: 120,
    });

    content = `/*! WhatsApp Version: ${version} */\n` + content;

    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    console.log('Done: ', file);
  });

  await Promise.all(downloads);
}
start();
