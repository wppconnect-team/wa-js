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

interface MockWid {
  _serialized: string;
  isUser(): boolean;
  isLid(): boolean;
  toString(): string;
}

interface MockChat {
  id: MockWid;
}

interface MockContact {
  id: MockWid;
}

interface MockProfilePicThumb {
  tag?: string;
  eurl?: string;
  previewEurl?: string;
  imgFull?: string;
  img?: string;
  stale?: boolean;
  eurlStale?: boolean;
}

interface MockFindOrCreateResult {
  chat: MockChat;
  created: boolean;
}

interface SetupOptions {
  chats?: Map<string, MockChat>;
  contacts?: Map<string, MockContact>;
  profilePics?: Map<string, MockProfilePicThumb>;
  updatedProfilePics?: Map<string, MockProfilePicThumb>;
  lids?: Map<string, MockWid>;
  findOrCreateResult?: MockFindOrCreateResult;
  findOrCreateError?: Error;
}

function createWid(serialized: string): MockWid {
  return {
    _serialized: serialized,
    isUser: () => serialized.includes('@c.us') || serialized.includes('@lid'),
    isLid: () => serialized.includes('@lid'),
    toString: () => serialized,
  };
}

function setupTestApi({
  chats = new Map<string, MockChat>(),
  contacts = new Map<string, MockContact>(),
  profilePics = new Map<string, MockProfilePicThumb>(),
  updatedProfilePics = new Map<string, MockProfilePicThumb>(),
  lids = new Map<string, MockWid>(),
  findOrCreateResult,
  findOrCreateError,
}: SetupOptions = {}) {
  const calls: [string, ...string[]][] = [];
  const warnings: string[] = [];

  const load = (
    file: string,
    requireModule: (id: string) => Record<string, unknown>
  ) => {
    const exports: {
      getProfilePictureUrl?: (
        contactId: string | MockWid,
        full?: boolean
      ) => Promise<string | null>;
    } = {};
    runInNewContext(
      transpileModule(
        readFileSync(path.join(__dirname, '../src', file), 'utf8'),
        { compilerOptions: { module: ModuleKind.CommonJS } }
      ).outputText,
      {
        exports,
        require: requireModule,
        console: {
          warn: (msg: string) => {
            warnings.push(msg);
          },
        },
      }
    );
    return exports;
  };

  const api = load('contact/functions/getProfilePictureUrl.ts', (id) => {
    if (id === '../../assert') {
      return {
        assertWid: (widInput: string | MockWid) =>
          typeof widInput === 'string' ? createWid(widInput) : widInput,
      };
    }

    if (id === '../../whatsapp') {
      return {
        ChatStore: {
          get: (wid: MockWid) => chats.get(wid.toString()),
        },
        ContactStore: {
          get: (wid: MockWid) => contacts.get(wid.toString()),
        },
        ProfilePicThumbStore: {
          find: async (wid: MockWid) => {
            calls.push(['ProfilePicThumbStore.find', wid.toString()]);
            return profilePics.get(wid.toString()) || null;
          },
          update: async (wid: MockWid) => {
            calls.push(['ProfilePicThumbStore.update', wid.toString()]);
            return (
              updatedProfilePics.get(wid.toString()) ||
              profilePics.get(wid.toString()) ||
              null
            );
          },
        },
        ApiContact: {
          getAlternateUserWid: (wid: MockWid) =>
            lids.get(wid.toString()) || null,
          getCurrentLid: (wid: MockWid) => lids.get(wid.toString()) || null,
          getPhoneNumber: (wid: MockWid) => lids.get(wid.toString()) || null,
        },
        Wid: class {},
        ProfilePicThumbModel: class {},
      };
    }

    if (id === '../../whatsapp/functions') {
      return {
        findOrCreateLatestChat: async (wid: MockWid, origin: string) => {
          calls.push(['findOrCreateLatestChat', wid.toString(), origin]);
          if (findOrCreateError) {
            throw findOrCreateError;
          }
          return findOrCreateResult;
        },
      };
    }

    throw new Error(`Unexpected dependency: ${id}`);
  });

  return {
    calls,
    warnings,
    getProfilePictureUrl: api.getProfilePictureUrl!,
  };
}

test('returns full profile picture url when available', async () => {
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '551199999999@c.us',
      {
        tag: 'tag123',
        imgFull: 'https://pps.whatsapp.net/full.jpg',
        img: 'https://pps.whatsapp.net/preview.jpg',
      },
    ],
  ]);
  const chats = new Map<string, MockChat>([
    ['551199999999@c.us', { id: createWid('551199999999@c.us') }],
  ]);

  const api = setupTestApi({ profilePics, chats });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBe('https://pps.whatsapp.net/full.jpg');
  expect(api.warnings).toHaveLength(0);
});

test('returns preview profile picture url when full is false', async () => {
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '551199999999@c.us',
      {
        tag: 'tag123',
        imgFull: 'https://pps.whatsapp.net/full.jpg',
        img: 'https://pps.whatsapp.net/preview.jpg',
      },
    ],
  ]);
  const chats = new Map<string, MockChat>([
    ['551199999999@c.us', { id: createWid('551199999999@c.us') }],
  ]);

  const api = setupTestApi({ profilePics, chats });
  const result = await api.getProfilePictureUrl('551199999999@c.us', false);

  expect(result).toBe('https://pps.whatsapp.net/preview.jpg');
  expect(api.warnings).toHaveLength(0);
});

test('resolves eurl when imgFull is undefined', async () => {
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '551199999999@c.us',
      {
        tag: 'tag123',
        eurl: 'https://pps.whatsapp.net/eurl_full.jpg',
        imgFull: undefined,
      },
    ],
  ]);
  const chats = new Map<string, MockChat>([
    ['551199999999@c.us', { id: createWid('551199999999@c.us') }],
  ]);

  const api = setupTestApi({ profilePics, chats });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBe('https://pps.whatsapp.net/eurl_full.jpg');
  expect(api.warnings).toHaveLength(0);
});

test('resolves active LID chat when PN chat is not present', async () => {
  const lids = new Map<string, MockWid>([
    ['551199999999@c.us', createWid('123456789@lid')],
  ]);
  const chats = new Map<string, MockChat>([
    ['123456789@lid', { id: createWid('123456789@lid') }],
  ]);
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '123456789@lid',
      {
        tag: 'tagLid',
        imgFull: 'https://pps.whatsapp.net/lid_full.jpg',
        img: 'https://pps.whatsapp.net/lid_preview.jpg',
      },
    ],
  ]);

  const api = setupTestApi({ profilePics, chats, lids });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBe('https://pps.whatsapp.net/lid_full.jpg');
  expect(api.calls).toContainEqual([
    'ProfilePicThumbStore.find',
    '123456789@lid',
  ]);
});

test('triggers ProfilePicThumbStore.update when tag is present but url is not in initial find', async () => {
  const lids = new Map<string, MockWid>([
    ['551199999999@c.us', createWid('123456789@lid')],
  ]);
  const chats = new Map<string, MockChat>([
    ['123456789@lid', { id: createWid('123456789@lid') }],
  ]);
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '123456789@lid',
      {
        tag: '485111646',
        eurl: undefined,
        imgFull: undefined,
      },
    ],
  ]);
  const updatedProfilePics = new Map<string, MockProfilePicThumb>([
    [
      '123456789@lid',
      {
        tag: '485111646',
        eurl: 'https://pps.whatsapp.net/refreshed.jpg',
      },
    ],
  ]);

  const api = setupTestApi({ profilePics, updatedProfilePics, chats, lids });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBe('https://pps.whatsapp.net/refreshed.jpg');
  expect(api.calls).toContainEqual([
    'ProfilePicThumbStore.update',
    '123456789@lid',
  ]);
  expect(api.warnings).toHaveLength(0);
});

test('triggers findOrCreateLatestChat when chat and contact are not cached', async () => {
  const findOrCreateResult = {
    chat: { id: createWid('123456789@lid') },
    created: true,
  };
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '123456789@lid',
      {
        tag: 'tagNew',
        imgFull: 'https://pps.whatsapp.net/created_chat.jpg',
      },
    ],
  ]);

  const api = setupTestApi({ findOrCreateResult, profilePics });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBe('https://pps.whatsapp.net/created_chat.jpg');
  expect(api.calls).toContainEqual([
    'findOrCreateLatestChat',
    '551199999999@c.us',
    'createChat',
  ]);
});

test('logs specific warning when contact is not registered on WhatsApp', async () => {
  const api = setupTestApi({
    findOrCreateError: new Error('No LID for user'),
  });
  const result = await api.getProfilePictureUrl('554891150434@c.us', true);

  expect(result).toBeNull();
  expect(api.warnings).toHaveLength(1);
  expect(api.warnings[0]).toBe(
    '[WPP.contact.getProfilePictureUrl] Contact 554891150434@c.us is not registered on WhatsApp.'
  );
});

test('logs warning when no active chat and no profile picture is found', async () => {
  const api = setupTestApi({
    findOrCreateError: new Error('Failed to find or create chat'),
  });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBeNull();
  expect(api.warnings).toHaveLength(1);
  expect(api.warnings[0]).toContain('Active chat not found');
});

test('logs warning when profile picture has no tag or is restricted by privacy', async () => {
  const chats = new Map<string, MockChat>([
    ['551199999999@c.us', { id: createWid('551199999999@c.us') }],
  ]);
  const profilePics = new Map<string, MockProfilePicThumb>([
    [
      '551199999999@c.us',
      {
        tag: '',
        imgFull: undefined,
      },
    ],
  ]);

  const api = setupTestApi({ chats, profilePics });
  const result = await api.getProfilePictureUrl('551199999999@c.us', true);

  expect(result).toBeNull();
  expect(api.warnings).toHaveLength(1);
  expect(api.warnings[0]).toContain('Profile picture not found');
});
