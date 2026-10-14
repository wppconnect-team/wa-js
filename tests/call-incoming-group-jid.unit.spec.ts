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

async function incomingCall(pathName: 'native' | 'legacy', call: any) {
  const events: any[] = [];
  const timers: Array<() => void> = [];
  let inject: () => void;
  const store = {
    setActiveCall: () => 'native-result',
    processIncomingCall: () => call,
  };
  const context = createContext({
    exports: {},
    Date,
    setTimeout: (callback: () => void) => timers.push(callback),
    require(id: string) {
      if (id === 'debug') return () => () => undefined;
      if (id === '../../loader') {
        return { onInjected: (callback: () => void) => (inject = callback) };
      }
      if (id === '../../eventEmitter') {
        return { internalEv: { emit: (...args: any[]) => events.push(args) } };
      }
      if (id === '../../util/createWid') {
        return { createWid: (peer: any) => ({ peer }) };
      }
      if (id === '../../whatsapp') return { CallStore: store };
      if (id === '../../whatsapp/enums') {
        return { CALL_STATES: { ReceivedCall: 'received' } };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  const source = readFileSync(
    path.join(__dirname, '../src/call/events/registerIncomingCallEvent.ts'),
    'utf8'
  );
  runInContext(
    transpileModule(source, {
      compilerOptions: { module: ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText,
    context
  );
  inject!();
  await Promise.resolve();
  if (pathName === 'native') {
    expect((store.setActiveCall as any)(call)).toBe('native-result');
  } else {
    expect(store.processIncomingCall()).toBe(call);
  }
  timers.forEach((callback) => callback());
  expect(events).toHaveLength(1);
  expect(events[0][0]).toBe('call.incoming_call');
  return events[0][1];
}

for (const pathName of ['native', 'legacy'] as const) {
  test(`${pathName} forwards the group identifier provided by WhatsApp`, async () => {
    const groupJid = { _serialized: '120363111111111111@g.us' };
    const call = {
      id: 'group-call',
      isGroup: true,
      isVideo: true,
      peerJid: '5511999999999@c.us',
      groupJid,
      offerTime: 123,
      getState: () => 'received',
    };
    const event = await incomingCall(pathName, call);
    expect(event.groupJid).toBe(groupJid);
    expect(event.peerJid).toBe(call.peerJid);
    expect(event.sender).toEqual({ peer: call.peerJid });
    expect(event.offerTime).toBe(123);
  });

  test(`${pathName} does not expose a group identifier for an individual call`, async () => {
    const event = await incomingCall(pathName, {
      id: 'individual-call',
      isGroup: false,
      groupJid: 'stale-group@g.us',
      peerJid: '5511999999999@c.us',
      outgoing: false,
    });
    expect(event.groupJid).toBeUndefined();
  });

  test(`${pathName} does not infer a missing group identifier from the caller`, async () => {
    const event = await incomingCall(pathName, {
      id: 'group-without-jid',
      isGroup: true,
      peerJid: '5511999999999@c.us',
      outgoing: false,
    });
    expect(event.groupJid).toBeUndefined();
  });
}
