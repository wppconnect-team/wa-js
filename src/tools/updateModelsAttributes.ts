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
import { Page } from 'playwright-chromium';
import { Project } from 'ts-morph';

import * as wpp from '../';
import { getPage } from './browser';

declare global {
  interface Window {
    WPP: typeof wpp;
  }
}

const DIR_MODEL = path.resolve(__dirname, '../../src/whatsapp/models');

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function getModelAttributes(page: Page, modelName: string) {
  const result = await page.evaluate((modelName: string) => {
    const result: {
      props: string[];
      session: string[];
      derived: string[];
    } = {
      props: [],
      session: [],
      derived: [],
    };

    const modules: any = window.WPP.whatsapp as any;

    const model = modules[modelName];

    if (model) {
      result.props = model.prototype.__props || [];
      result.session = model.prototype.__session || [];
      result.derived = model.prototype.__derived || [];
    }

    return result;
  }, modelName);

  return result;
}

async function start() {
  const { browser, page } = await getPage();

  await page.waitForFunction(() => window.WPP?.isReady, null, {
    timeout: 0,
  });

  page.on('console', (message) => {
    if (message.type() !== 'debug') {
      console.log('browser', message.type(), message.text());
    }
  });

  const files = fs.readdirSync(DIR_MODEL);

  const project = new Project({
    tsConfigFilePath: path.resolve(__dirname, '../../tsconfig.json'),
  });

  for (const fileName of files) {
    if (fileName === 'index.ts') {
      continue;
    }

    const modelName = path.basename(fileName, path.extname(fileName));

    const attributes = await getModelAttributes(page, modelName);

    const filePath = path.join(DIR_MODEL, fileName);
    const fileSource = project.getSourceFileOrThrow(filePath);

    for (const typeName of Object.keys(attributes)) {
      const interfaceDefinition = fileSource.getInterface(
        capitalizeFirstLetter(typeName)
      );

      if (!interfaceDefinition) {
        continue;
      }

      let attrNames = (attributes as any)[typeName] as string[];

      attrNames = attrNames.filter((attrName) => !/^_/.test(attrName));

      const props = interfaceDefinition.getProperties();

      for (const prop of props) {
        if (!attrNames.includes(prop.getName())) {
          prop.remove();
        }
      }

      for (const attrName of attrNames) {
        const prop = interfaceDefinition.getProperty(attrName);
        const index = attrNames.indexOf(attrName);

        if (prop) {
          const structure = prop.getStructure();
          prop.remove();
          interfaceDefinition.insertProperty(index, structure);
          continue;
        }

        let type = 'any';

        if (/^(is|can)/.test(attrName)) {
          type = 'boolean';
        }

        interfaceDefinition.insertProperty(index, {
          name: attrName,
          hasQuestionToken: type === 'any',
          type,
        });
      }
    }
  }

  await browser.close();

  await project.save();
}

start();
