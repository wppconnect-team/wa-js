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
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { createContext, runInContext } from 'vm';

function mediaPrepApi(registry: Record<string, any>) {
  const exports: any = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../exportModule') {
        return {
          exportModule: (
            ex: any,
            name: string,
            condition: (m: any, moduleId: string) => unknown
          ) => {
            Object.defineProperty(ex, name, {
              enumerable: true,
              configurable: true,
              get() {
                for (const [moduleId, module] of Object.entries(registry)) {
                  if (condition(module, moduleId)) {
                    return module;
                  }
                }
                return undefined;
              },
            });
          },
        };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/whatsapp/misc/MediaPrep.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return exports;
}

const prepRawMedia = (...args: any[]) => ({ prepared: args });

test('resolves prepRawMedia from the legacy combined module', async () => {
  const api = mediaPrepApi({
    '42': {
      uploadProductImage: () => undefined,
      MediaPrep: class {},
      prepRawMedia,
    },
  });

  expect(api.MediaPrep.prepRawMedia).toBe(prepRawMedia);
});

test('resolves prepRawMedia after WhatsApp splits the module', async () => {
  // Recent builds gut WAWebMediaPrep down to its display name and move
  // prepRawMedia to WAWebPrepRawMedia, so the legacy combined finder
  // matches nothing and every media send fails.
  const api = mediaPrepApi({
    '1001': { displayName: 'WAWebMediaPrep' },
    WAWebPrepRawMedia: { prepRawMedia },
  });

  expect(api.MediaPrep).toBeDefined();
  expect(api.MediaPrep.prepRawMedia).toBe(prepRawMedia);
});

test('keeps resolving the legacy module when the split one is absent', async () => {
  const combined = {
    uploadProductImage: () => undefined,
    MediaPrep: class {},
    prepRawMedia,
  };
  const api = mediaPrepApi({ '42': combined });

  expect(api.MediaPrep).toBe(combined);
});

test('stays undefined when no module provides media preparation', async () => {
  const api = mediaPrepApi({ '7': { displayName: 'WAWebMediaPrep' } });

  expect(api.MediaPrep).toBeUndefined();
});
