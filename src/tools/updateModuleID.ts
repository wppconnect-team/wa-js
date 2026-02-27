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
import fetch from 'node-fetch';
import * as path from 'path';
import { JSDoc, Node, Project } from 'ts-morph';

import * as wpp from '../';
import { getPage } from './browser';

declare global {
  interface Window {
    WPP: typeof wpp;
  }
}

export const DIR_BASE = path.resolve(__dirname, '../../src/whatsapp');
const dirs = [''];

dirs.push(
  ...fs
    .readdirSync(DIR_BASE, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
);

async function start() {
  const { browser, page } = await getPage();

  page.addInitScript(() => {
    setInterval(() => {
      (window as any).wppForceMainLoad = true;
    }, 500);
  });

  await page.waitForFunction(() => window.WPP?.isFullReady, null, {
    timeout: 0,
  });

  page.on('console', (message) => {
    if (message.type() !== 'debug') {
      console.log('browser', message.type(), message.text());
    }
  });

  const result = await page.evaluate((dirs: string[]) => {
    const result: any = {};

    const modules: any = window.WPP.whatsapp as any;

    for (const dir of dirs) {
      const submodules = dir ? modules[dir] : modules;
      if (!submodules) {
        continue;
      }

      for (const name of Object.keys(submodules)) {
        let module: any;
        try {
          module = submodules[name];
        } catch (_error) {}

        const resultName = dir ? `${dir}.${name}` : name;

        result[resultName] = window.WPP.whatsapp._moduleIdMap.get(module);
      }
    }

    return result;
  }, dirs);

  const version = await page
    .evaluate(() => (window as any).Debug.VERSION)
    .catch(() => null);

  // if any pending request is hanging we unroute them to avoid errors, before browser close
  await page.unrouteAll({ behavior: 'ignoreErrors' });

  await browser.close();

  delete result['_moduleIdMap'];
  for (const dir of dirs) {
    delete result[dir];
  }

  let exitCode = 0;
  /**
   * Theses modules only loaded after device is connected
   * I be creating other function for check expires based directily from files
   * This will not directly affect the function call, it continues to work normally.
   */
  const ignoreFailModules: string[] = [
    'functions.createCollection',
    'functions.deleteCollection',
    'functions.editCollection',
    'functions.forwardMessages',
    'functions.setPushname',
    'functions.revokeStatus',
    'functions.muteNewsletter', // removed in version 2.3000.1032373751
    'functions.unmuteNewsletter', // removed in version 2.3000.1032373751
    'functions.toggleNewsletterAdminActivityMuteStateAction', // new in version >= 2.3000.1032373751
    'functions.msgFindQuery', // stopped working in WA version ~2.3000.1034162388
    'functions.msgFindBefore', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindAfter', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindByDirection', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindCallLog', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindEvents', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindMedia', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindSearch', // added in WA version 2.3000.1034162388, but not available in older versions
    'functions.msgFindStarred', // added in WA version 2.3000.1034162388, but not available in older versions
  ];

  for (const moduleName of Object.keys(result)) {
    if (!result[moduleName] && !ignoreFailModules.includes(moduleName)) {
      if (
        process.env['SEND_WEBHOOK_FAILURE'] &&
        process.env['DISCORD_WEBHOOK_URL_FAILURE']
      ) {
        const message = {
          content: `**Alert:**\nModule not found: ${moduleName}. v: ${version}\n\n See more at: ${process.env['URL_ACTION']}`,
        };

        await fetch(process.env['DISCORD_WEBHOOK_URL_FAILURE'], {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }).catch((error) =>
          console.error('Error on send message to discord:', error)
        );
      }
      exitCode = 1;
      console.error(`Module not found: ${moduleName}`);
    }
  }

  if (!process.argv.includes('--dry-run')) {
    const project = new Project({
      tsConfigFilePath: path.resolve(__dirname, '../../tsconfig.json'),
    });

    for (const dir of dirs) {
      const filePath = `${DIR_BASE}${dir ? '/' + dir : ''}/index.ts`;

      const mainFile = project.getSourceFileOrThrow(filePath);

      for (const [name, declarations] of mainFile.getExportedDeclarations()) {
        const resultName = dir ? `${dir}.${name}` : name;

        if (!result[resultName]) {
          continue;
        }

        const moduleID = `${result[resultName]}`;
        if (!moduleID) {
          continue;
        }

        for (const d of declarations) {
          let docs: JSDoc[] = [];

          if (Node.isJSDocable(d)) {
            docs = d.getJsDocs();
            if (!docs.length) {
              d.addJsDoc('\n');
              docs = d.getJsDocs();
            }
          } else if (Node.isVariableDeclaration(d)) {
            const parent = d.getParent().getParent();

            if (!parent || !Node.isJSDocable(parent)) {
              continue;
            }

            docs = parent.getJsDocs();
            if (!docs.length) {
              parent.addJsDoc('\n');
              docs = parent.getJsDocs();
            }
          } else {
            continue;
          }

          if (!docs.length) {
            continue;
          }
          const tags = docs[0].getTags() || [];
          let hasID = false;

          for (const tag of tags) {
            const currId = (tag.getCommentText() || '').split(' ')[0];

            if (moduleID === currId) {
              hasID = true;
            }
          }
          if (!hasID) {
            docs[0].addTag({
              tagName: 'whatsapp',
              text: `${moduleID} >= ${version}`,
            });
          }
        }
      }
    }

    await project.save();
  }

  process.exit(exitCode);
}
start();
