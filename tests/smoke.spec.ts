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

// Smoke tests: validate the WPP bundle loads against the live WhatsApp Web
// page and that every public module still exposes the functions we ship in
// the README. They run unauthenticated (no QR scan needed) — the WhatsApp
// bundle resolves modules before login, and the loader flips `WPP.isReady`
// as soon as that is done. These tests catch the most common breakage:
// WhatsApp Web ships an update and one of our patched modules disappears
// or is renamed.

import { expect, test } from './wpp-test';

const expectedFunctions: Record<string, string[]> = {
  blocklist: ['all', 'blockContact', 'isBlocked', 'unblockContact'],
  cart: ['add', 'clear', 'get', 'remove', 'submit', 'update'],
  catalog: [
    'createProduct',
    'delProducts',
    'editProduct',
    'getMyCatalog',
    'getProductById',
    'getProducts',
  ],
  chat: ['deleteMessage', 'get', 'sendFileMessage', 'sendTextMessage'],
  community: [
    'addSubgroups',
    'create',
    'deactivate',
    'getParticipants',
    'getSubgroups',
    'removeSubgroups',
  ],
  conn: [
    'getBuildConstants',
    'getStreamData',
    'isAuthenticated',
    'logout',
  ],
  contact: [
    'get',
    'getCommonGroups',
    'getStatus',
    'list',
    'queryWidExists',
  ],
  group: [
    'addParticipants',
    'canAdd',
    'canDemote',
    'canPromote',
    'create',
    'demoteParticipants',
    'getAllGroups',
    'getGroupInfoFromInviteCode',
    'promoteParticipants',
    'removeParticipants',
  ],
  labels: [
    'addNewLabel',
    'addOrRemoveLabels',
    'deleteLabel',
    'editLabel',
    'getAllLabels',
    'getLabelById',
  ],
  newsletter: [
    'create',
    'destroy',
    'edit',
    'follow',
    'getSubscribers',
    'mute',
    'search',
    'unfollow',
  ],
  order: ['accept', 'decline', 'get', 'update'],
  privacy: [
    'get',
    'setAbout',
    'setAddGroup',
    'setLastSeen',
    'setOnline',
    'setProfilePic',
    'setReadReceipts',
    'setStatus',
  ],
  profile: [
    'getMyProfileName',
    'getMyProfilePicture',
    'getMyStatus',
    'isBusiness',
    'setMyProfileName',
    'setMyProfilePicture',
    'setMyStatus',
  ],
  status: [
    'get',
    'getMyStatus',
    'sendImageStatus',
    'sendReadStatus',
    'sendTextStatus',
    'sendVideoStatus',
  ],
};

test.describe('smoke: bundle injection', () => {
  test('WPP global is exposed and reports ready', async ({ page }) => {
    const probe = await page.evaluate(() => ({
      hasWPP: typeof (window as any).WPP === 'object',
      isReady: (window as any).WPP?.isReady === true,
      isInjected: (window as any).WPP?.isInjected === true,
      version: (window as any).WPP?.version,
      license: (window as any).WPP?.license,
    }));

    expect(probe.hasWPP).toBe(true);
    expect(probe.isInjected).toBe(true);
    expect(probe.isReady).toBe(true);
    expect(probe.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(probe.license).toBe('Apache-2.0');
  });

  test('event emitter helpers are wired on WPP', async ({ page }) => {
    const eventApi = await page.evaluate(() => {
      const wpp = (window as any).WPP;
      return ['on', 'off', 'once', 'emit', 'waitFor'].map(
        (name) => typeof wpp?.[name]
      );
    });

    expect(eventApi).toEqual(['function', 'function', 'function', 'function', 'function']);
  });
});

test.describe('smoke: module surface', () => {
  for (const [moduleName, fns] of Object.entries(expectedFunctions)) {
    test(`WPP.${moduleName} exposes its public functions`, async ({ page }) => {
      const result = await page.evaluate(
        ({ moduleName, fns }) => {
          const mod = (window as any).WPP?.[moduleName];
          if (!mod) {
            return { exists: false, missing: fns };
          }
          const missing = fns.filter((fn) => typeof mod[fn] !== 'function');
          return { exists: true, missing };
        },
        { moduleName, fns }
      );

      expect(result.exists, `WPP.${moduleName} is missing`).toBe(true);
      expect(
        result.missing,
        `WPP.${moduleName} is missing functions: ${result.missing.join(', ')}`
      ).toEqual([]);
    });
  }
});
