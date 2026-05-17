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

/**
 * Populates wa-source/<version>/ directories by downloading WhatsApp Web JS
 * bundles for every version listed in node_modules/@wppconnect/wa-version/html/.
 *
 * Usage:
 *   npm run wa-source:populate                         # latest 20 versions (default)
 *   npm run wa-source:populate -- --all                # all versions
 *   npm run wa-source:populate -- --version <version>  # single version
 *   npm run wa-source:populate -- --force              # re-download already populated versions
 */

import * as waVersion from '@wppconnect/wa-version';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

const WA_SOURCE_DIR = path.resolve(__dirname, '../../wa-source');
const CONCURRENCY = 5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractJsUrls(html: string): string[] {
  const urls: string[] = [];
  const re = /src="(https:\/\/[^"]*\.js[^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

/** Reproduces the filename convention used in browser.ts */
function hashedFilename(fileUrl: string): string {
  const rawName = path.basename(new URL(fileUrl).pathname);
  let name = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
  if (name.length > 50) name = name.substring(0, 50);
  const hash = crypto
    .createHash('md5')
    .update(fileUrl)
    .digest('hex')
    .substring(0, 5);
  return `${hash}-${name}`;
}

function download(fileUrl: string, redirects = 5): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (redirects === 0) {
      return reject(new Error(`Too many redirects: ${fileUrl}`));
    }
    const req = https.get(fileUrl, (res) => {
      if (
        res.statusCode !== undefined &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        return resolve(download(res.headers.location, redirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(
          new Error(`HTTP ${res.statusCode ?? 'unknown'} for ${fileUrl}`)
        );
      }
      const chunks: Buffer[] = [];
      res.on('data', (c: Buffer) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

/** Run up to `limit` promises concurrently */
async function pool<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const queue = [...tasks];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, () =>
    (async () => {
      while (queue.length) {
        const task = queue.shift()!;
        results.push(await task());
      }
    })()
  );
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

async function processVersion(version: string, force: boolean): Promise<void> {
  const versionDir = path.join(WA_SOURCE_DIR, version);
  const indexHtml = path.join(versionDir, 'index.html');

  if (!force && fs.existsSync(indexHtml)) {
    console.log(`  ⏭  ${version} — already populated, skipping`);
    return;
  }

  let html: string;
  try {
    html = waVersion.getPageContent(version);
  } catch (e) {
    console.error(`  ❌ ${version} — could not get page content:`, e);
    return;
  }

  if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true });
  }

  fs.writeFileSync(indexHtml, html);

  const jsUrls = extractJsUrls(html);
  console.log(`  📥 ${version} — downloading ${jsUrls.length} JS file(s)...`);

  const tasks = jsUrls.map((jsUrl) => async () => {
    const filename = hashedFilename(jsUrl);
    const dest = path.join(versionDir, filename);

    if (!force && fs.existsSync(dest)) return;

    try {
      const data = await download(jsUrl);
      fs.writeFileSync(dest, data);
    } catch (e) {
      console.warn(`    ⚠️  Failed: ${filename} — ${(e as Error).message}`);
    }
  });

  await pool(tasks, CONCURRENCY);
  console.log(`  ✅ ${version} — done`);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const DEFAULT_LATEST = 20;

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const all = args.includes('--all');
  const versionFlag = args.indexOf('--version');
  const singleVersion = versionFlag !== -1 ? args[versionFlag + 1] : undefined;

  const allVersions = waVersion.getAvailableVersions(undefined, true);

  let versions: string[];
  if (singleVersion) {
    versions = [singleVersion];
  } else if (all) {
    versions = allVersions;
  } else {
    versions = allVersions.slice(-DEFAULT_LATEST);
  }

  console.log(
    `🚀 Processing ${versions.length} version(s)${all ? ' (all)' : !singleVersion ? ` (latest ${DEFAULT_LATEST})` : ''}${force ? ' [force]' : ''}...\n`
  );

  for (const version of versions) {
    await processVersion(version, force);
  }

  console.log('\n🎉 Done!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
