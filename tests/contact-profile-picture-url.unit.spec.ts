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

function pictureApi(hooks: {
  model?: any;
  getImg?: ((model: any) => any) | null;
  getImgFull?: ((model: any) => any) | null;
}) {
  const finds: unknown[] = [];
  const exports: any = {};
  const functionsStub: any = {};
  // A null getter simulates an old WhatsApp build whose module lacks it.
  if (hooks.getImg !== null) {
    functionsStub.getImg = hooks.getImg || ((model: any) => model.img ?? null);
  }
  if (hooks.getImgFull !== null) {
    functionsStub.getImgFull =
      hooks.getImgFull || ((model: any) => model.imgFull ?? null);
  }
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../assert') {
        return { assertWid: (contactId: unknown) => contactId };
      }
      if (id === '../../whatsapp') {
        return {
          ProfilePicThumbStore: {
            find: async (wid: unknown) => {
              finds.push(wid);
              return hooks.model === undefined ? null : hooks.model;
            },
          },
          Wid: {},
        };
      }
      if (id === '../../whatsapp/functions') {
        return functionsStub;
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(
          __dirname,
          '../src/contact/functions/getProfilePictureUrl.ts'
        ),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    getProfilePictureUrl: (contactId: unknown, full?: boolean) =>
      Promise.resolve(exports.getProfilePictureUrl(contactId, full)),
    finds,
  };
}

test('resolves the full url through the getters on newer builds', async () => {
  const api = pictureApi({
    model: { eurl: 'https://cdn/full' },
    getImgFull: () => 'https://cdn/full',
  });

  await expect(api.getProfilePictureUrl('1@c.us', true)).resolves.toBe(
    'https://cdn/full'
  );
  // A cold lookup reaches the store exactly once and creates nothing.
  expect(api.finds).toEqual(['1@c.us']);
});

test('resolves the preview url through the getters on newer builds', async () => {
  const api = pictureApi({
    model: { eurl: 'https://cdn/preview' },
    getImg: () => 'https://cdn/preview',
  });

  await expect(api.getProfilePictureUrl('1@c.us', false)).resolves.toBe(
    'https://cdn/preview'
  );
  expect(api.finds).toEqual(['1@c.us']);
});

test('keeps undefined while the model is stale', async () => {
  const api = pictureApi({
    model: { stale: true },
    getImgFull: () => null,
    getImg: () => null,
  });

  await expect(
    api.getProfilePictureUrl('1@c.us', true)
  ).resolves.toBeUndefined();
  await expect(
    api.getProfilePictureUrl('1@c.us', false)
  ).resolves.toBeUndefined();
});

test('falls back to the model properties on older builds', async () => {
  const api = pictureApi({
    model: { img: 'https://cdn/img', imgFull: 'https://cdn/imgFull' },
    getImg: null,
    getImgFull: null,
  });

  await expect(api.getProfilePictureUrl('1@c.us', true)).resolves.toBe(
    'https://cdn/imgFull'
  );
  await expect(api.getProfilePictureUrl('1@c.us', false)).resolves.toBe(
    'https://cdn/img'
  );
});

test('returns undefined when no profile picture model exists', async () => {
  const api = pictureApi({ model: null });

  await expect(
    api.getProfilePictureUrl('1@c.us', true)
  ).resolves.toBeUndefined();
  expect(api.finds).toEqual(['1@c.us']);
});
