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
import { runInNewContext } from 'vm';

import { WPPError } from '../src/util/errors';

interface TestMessage {
  body?: string;
  caption?: string;
  type: string;
}

type TestButton =
  | { id: string; text: string }
  | { phoneNumber: string; text: string }
  | { url: string; text: string }
  | { code: string; text: string };

interface TestOptions {
  buttons: TestButton[];
  footer?: string;
  title?: string;
}

interface PreparedMessage extends TestMessage {
  footer?: string;
  interactiveHeader: {
    hasMediaAttachment: boolean;
    title?: string;
  };
  interactivePayload: {
    buttons: Array<{ name: string; buttonParamsJson?: string }>;
    messageVersion: number;
  };
  interactiveType: string;
  nativeFlowInteractiveMsg: boolean;
  nativeFlowName: string;
}

type PrepareMessageButtons = (
  message: TestMessage,
  options: TestOptions
) => PreparedMessage;

function prepareMessageButtons(message: TestMessage, options: TestOptions) {
  const moduleExports: { prepareMessageButtons?: PrepareMessageButtons } = {};

  runInNewContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/prepareMessageButtons.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports: moduleExports,
      require(id: string) {
        if (id === '../../loader') return { onFullReady: () => undefined };
        if (id === '../../util') return { WPPError };
        if (id === '../../whatsapp') {
          return {
            TemplateButtonCollection: class {
              add() {}
            },
            TemplateButtonModel: class {
              constructor(properties: object) {
                Object.assign(this, properties);
              }
            },
            websocket: {},
          };
        }
        if (id === '../../whatsapp/contants') return { DROP_ATTR: undefined };
        if (id === '../../whatsapp/exportModule') {
          return { wrapModuleFunction: () => undefined };
        }
        if (id === '../../whatsapp/functions') return {};
        if (id === '..') return {};
        if (id === './buttonsParser') return {};
        if (id === './createNativeFlowButtons') {
          const nativeFlowExports: Record<string, unknown> = {};
          runInNewContext(
            transpileModule(
              readFileSync(
                path.join(
                  __dirname,
                  '../src/chat/functions/createNativeFlowButtons.ts'
                ),
                'utf8'
              ),
              { compilerOptions: { module: ModuleKind.CommonJS } }
            ).outputText,
            {
              exports: nativeFlowExports,
              require(dependency: string) {
                if (dependency === '../../util') return { WPPError };
                throw new Error(`Unexpected dependency: ${dependency}`);
              },
            }
          );
          return nativeFlowExports;
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }
  );

  if (!moduleExports.prepareMessageButtons) {
    throw new Error('prepareMessageButtons was not exported');
  }

  return moduleExports.prepareMessageButtons(message, options);
}

test('prepares reply buttons as a native interactive message', () => {
  const message = prepareMessageButtons(
    { body: 'Choose an option', type: 'chat' },
    {
      title: 'Options',
      footer: 'Tap a button',
      buttons: [
        { id: 'confirm', text: 'Confirm' },
        { id: 'cancel', text: 'Cancel' },
      ],
    }
  );

  expect(message).toMatchObject({
    type: 'interactive',
    caption: 'Choose an option',
    footer: 'Tap a button',
    nativeFlowInteractiveMsg: true,
    nativeFlowName: 'quick_reply',
    interactiveType: 'native_flow',
    interactiveHeader: {
      title: 'Options',
      hasMediaAttachment: false,
    },
    interactivePayload: {
      messageVersion: 1,
      buttons: [
        {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: 'Confirm',
            id: 'confirm',
          }),
        },
        {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: 'Cancel',
            id: 'cancel',
          }),
        },
      ],
    },
  });
  expect(message).not.toHaveProperty('interactiveMessage');
  expect(message).not.toHaveProperty('buttons');
});

test('uses the mixed native flow for different CTA button types', () => {
  const message = prepareMessageButtons(
    { body: 'Contact us', type: 'chat' },
    {
      buttons: [
        { url: 'https://wppconnect.io', text: 'Open site' },
        { phoneNumber: '+551122334455', text: 'Call' },
      ],
    }
  );

  expect(message.nativeFlowName).toBe('mixed');
  expect(
    message.interactivePayload.buttons.map((button) => button.name)
  ).toEqual(['cta_url', 'cta_call']);
});

test('prepares a copy-code button for coupons', () => {
  const message = prepareMessageButtons(
    { body: 'Use your coupon', type: 'chat' },
    {
      buttons: [{ code: 'SAVE20', text: 'Copy coupon' }],
    }
  );

  expect(message).toMatchObject({
    nativeFlowName: 'cta_copy',
    interactivePayload: {
      buttons: [
        {
          name: 'cta_copy',
          buttonParamsJson: JSON.stringify({
            display_text: 'Copy coupon',
            copy_code: 'SAVE20',
          }),
        },
      ],
    },
  });
});

test('marks the native header when buttons are attached to image media', () => {
  const message = prepareMessageButtons(
    { caption: 'Image caption', type: 'image' },
    {
      buttons: [{ id: 'open', text: 'Open' }],
    }
  );

  expect(message).toMatchObject({
    type: 'interactive',
    caption: 'Image caption',
    interactiveHeader: {
      hasMediaAttachment: true,
      mediaType: 'IMAGE',
    },
  });
});
