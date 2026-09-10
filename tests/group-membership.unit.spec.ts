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

import { WPPError } from '../src/util/errors';

function wid(id: string) {
  return {
    isLid: () => id.endsWith('@lid'),
    isPSA: () => false,
    toJid: () => id,
    toString: () => id,
  };
}

function membershipApi(
  action: 'approve' | 'reject',
  native: (...args: any[]) => Promise<any>,
  isLidAddressingMode = true,
  identityError?: Error
) {
  const preparations: any[] = [];
  function load(name: string) {
    const exports: any = {};
    const context = createContext({
      exports,
      require(id: string) {
        if (id === '../../util') return { WPPError };
        if (id === '../../assert') {
          return {
            assertWid: (id: any) => (typeof id === 'string' ? wid(id) : id),
          };
        }
        if (id === '../../whatsapp/functions') {
          return {
            membershipApprovalRequestAction: native,
            getGroupMutationParticipant(
              contact: any,
              mode: boolean,
              context: string
            ) {
              preparations.push({ contact, mode, context });
              if (identityError) throw identityError;
              return contact.id.isLid()
                ? { lid: contact.id, username: contact.username }
                : { phoneNumber: contact.id };
            },
          };
        }
        if (id === '../../whatsapp') {
          return {
            GroupMetadataStore: { find: async () => ({ isLidAddressingMode }) },
            ContactStore: {
              find: async (id: any) => ({ id, username: 'member' }),
            },
          };
        }
        if (id === './getMembershipRequestParticipants') {
          return load('getMembershipRequestParticipants');
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    });
    runInContext(
      transpileModule(
        readFileSync(
          path.join(__dirname, `../src/group/functions/${name}.ts`),
          'utf8'
        ),
        { compilerOptions: { module: ModuleKind.CommonJS } }
      ).outputText,
      context
    );
    return exports;
  }
  const exports = load(action);
  return Object.assign(
    (ids: any) => Promise.resolve(exports[action]('123@g.us', ids)),
    { preparations }
  );
}

for (const action of ['approve', 'reject'] as const) {
  test(`${action} passes PN and LID descriptors and returns each native result`, async () => {
    const calls: any[] = [];
    const phone = wid('5511@c.us');
    const lid = wid('777@lid');
    const results = [
      { wid: phone, error: null },
      { wid: lid, error: 403 },
    ];
    const api = membershipApi(action, async (group, participants, type) => {
      // The native job selects lid/phoneNumber, then passes it to widToUserJid.
      for (const participant of participants) {
        const id = participant.lid || participant.phoneNumber;
        expect(id.isPSA()).toBe(false);
      }
      calls.push({ group, participants, type });
      return results;
    });
    expect(await api([phone, lid])).toBe(results);
    expect(calls).toHaveLength(1);
    expect(calls[0].group.toJid()).toBe('123@g.us');
    expect(calls[0].participants).toEqual([
      { phoneNumber: phone },
      { lid, username: 'member' },
    ]);
    expect(calls[0].type).toBe(action === 'approve' ? 'Approve' : 'Reject');
    expect(api.preparations).toEqual([
      {
        contact: { id: phone, username: 'member' },
        mode: true,
        context: 'membershipApprovalRequest',
      },
      {
        contact: { id: lid, username: 'member' },
        mode: true,
        context: 'membershipApprovalRequest',
      },
    ]);
  });

  test(`${action} accepts a single string identifier`, async () => {
    let participants: any[] = [];
    const api = membershipApi(action, async (_group, members) => {
      participants = members;
      return [];
    });
    await api('777@lid');
    expect(participants).toHaveLength(1);
    expect(participants[0].lid.toJid()).toBe('777@lid');
    expect(participants[0].phoneNumber).toBeUndefined();
  });

  test(`${action} preserves the error code without retrying a native failure`, async () => {
    let calls = 0;
    const api = membershipApi(action, async () => {
      calls++;
      throw new Error('server rejected the request');
    });
    await expect(api('5511@c.us')).rejects.toMatchObject({
      code:
        action === 'approve'
          ? 'error_on_accept_membership_request'
          : 'error_on_reject_membership_request',
    });
    expect(calls).toBe(1);
  });

  test(`${action} passes PN group mode to the native identity helper`, async () => {
    const api = membershipApi(action, async () => [], false);
    await api('5511@c.us');
    expect(api.preparations[0].mode).toBe(false);
  });

  test(`${action} stops before the request when native identity resolution fails`, async () => {
    let calls = 0;
    const api = membershipApi(
      action,
      async () => {
        calls++;
        return [];
      },
      true,
      new Error('missing identity')
    );
    await expect(api('777@lid')).rejects.toMatchObject({
      code:
        action === 'approve'
          ? 'error_on_accept_membership_request'
          : 'error_on_reject_membership_request',
    });
    expect(calls).toBe(0);
  });
}
