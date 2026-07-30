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

import * as chat from '../chat';
import * as conn from '../conn';
import { MP3, MP4, PDF, PNG, TXT } from './fixtures';

/**
 * Cases are named `<group>.<case>` so a whole group can be run at once, and so
 * adding a group does not collide with the existing names.
 *
 * A new group only needs entries with their own `run`, which is why each case
 * performs its own send instead of sharing a payload shape: a reply needs
 * `quotedMsg`, a file needs a data URI, and those do not fit one signature.
 */
export type TestGroup = 'regular' | 'files';

export interface TestCase {
  group: TestGroup;
  /** Perform the send */
  run(chatId: string): Promise<chat.SendMessageReturn>;
  /** Check the stored message, returning every problem found */
  check?(msg: any): string[];
}

export interface TestResult {
  case: string;
  ok: boolean;
  ms: number;
  id?: string;
  ack?: number;
  result?: string | null;
  type?: string;
  mimetype?: string;
  size?: number;
  duration?: number | string;
  problems?: string;
  error?: string;
}

function regularCase(
  body: string,
  options: Record<string, any> = {}
): TestCase {
  return {
    group: 'regular',
    run: (chatId) => chat.sendTextMessage(chatId, body, options),
    check: (msg) => {
      const problems: string[] = [];

      if (msg.type !== 'chat') {
        problems.push(`type=${msg.type}, expected chat`);
      }
      if (msg.body !== body) {
        problems.push(`body=${JSON.stringify(msg.body)}`);
      }

      return problems;
    },
  };
}

function fileCase(
  data: string,
  options: Record<string, any>,
  expected: { type: string; mimetype: RegExp }
): TestCase {
  return {
    group: 'files',
    run: (chatId) => chat.sendFileMessage(chatId, data, options as any),
    check: (msg) => {
      const problems: string[] = [];

      if (msg.type !== expected.type) {
        problems.push(`type=${msg.type}, expected ${expected.type}`);
      }
      /**
       * Only the top level type is checked: WhatsApp re-encodes images and PTT
       * audio, so an exact round trip of the mimetype is not stable.
       */
      if (!expected.mimetype.test(msg.mimetype || '')) {
        problems.push(`mimetype=${msg.mimetype}`);
      }
      // A rejected payload uploads as 0 bytes
      if (!(Number(msg.size) > 0)) {
        problems.push(`size=${msg.size}`);
      }
      if (options['isPtt']) {
        // The file really decoded, it was not forwarded as opaque bytes
        if (!(Number(msg.duration) > 0)) {
          problems.push(`duration=${msg.duration}`);
        }
        if (!msg.waveform) {
          problems.push('no waveform');
        }
      }

      return problems;
    },
  };
}

export const cases: Record<string, TestCase> = {
  'regular.text': regularCase('wa-js text test'),
  /**
   * The link preview itself needs network and is best effort, so it is not
   * checked, this is here for the preview code path.
   */
  'regular.link': regularCase('wa-js link test https://wppconnect.io'),

  'files.image': fileCase(
    `data:image/png;base64,${PNG}`,
    { type: 'image', caption: 'wa-js image test' },
    { type: 'image', mimetype: /^image\// }
  ),
  'files.video': fileCase(
    `data:video/mp4;base64,${MP4}`,
    { type: 'video', caption: 'wa-js video test' },
    { type: 'video', mimetype: /^video\// }
  ),
  'files.audio': fileCase(
    `data:audio/mpeg;base64,${MP3}`,
    // isPtt with waveform is the fragile path, it decodes the file
    { type: 'audio', isPtt: true, waveform: true },
    { type: 'ptt', mimetype: /^audio\// }
  ),
  'files.pdf': fileCase(
    `data:application/pdf;base64,${PDF}`,
    { type: 'document', filename: 'wa-js-test.pdf' },
    { type: 'document', mimetype: /^application\/pdf/ }
  ),
  'files.text': fileCase(
    // Plain text has no magic bytes, so the mimetype cannot be sniffed from the
    // content and has to be given explicitly
    `data:text/plain,${encodeURIComponent(TXT)}`,
    { type: 'document', filename: 'wa-js-test.txt', mimetype: 'text/plain' },
    { type: 'document', mimetype: /^text\/plain/ }
  ),
};

/**
 * Resolve the chat to send to, in order of preference:
 *
 * 1. the id passed to {@link sendTests}
 * 2. the chat currently open in the UI, so opening a chat and running the
 *    helper sends there
 * 3. your own chat, so a run with nothing open does not message anybody else
 */
function target(chatId?: string): string {
  if (chatId) {
    return chatId;
  }

  const activeChat = chat.getActiveChat();

  if (activeChat?.id) {
    return activeChat.id.toString();
  }

  return conn.getMyUserWid().toString();
}

function select(only?: string): string[] {
  const names = Object.keys(cases);

  if (!only) {
    return names;
  }

  if (cases[only]) {
    return [only];
  }

  const group = names.filter((name) => name.startsWith(`${only}.`));

  if (group.length) {
    return group;
  }

  const groups = Array.from(new Set(names.map((name) => name.split('.')[0])));

  throw new Error(
    `Unknown test "${only}". Groups: ${groups.join(', ')}. Cases: ${names.join(', ')}`
  );
}

async function runCase(name: string, chatId: string): Promise<TestResult> {
  const testCase = cases[name]!;
  const started = performance.now();
  const row: TestResult = { case: name, ok: false, ms: 0 };

  try {
    const sent = await testCase.run(chatId);

    /**
     * Awaiting works whether sendMsgResult is the resolved value or a promise.
     */
    const sendResult: any = await sent.sendMsgResult;
    const msg: any = await chat.getMessageById(sent.id);

    row.id = sent.id;
    row.ack = sent.ack;
    row.result = sendResult?.messageSendResult ?? null;
    row.type = msg.type;
    row.mimetype = msg.mimetype;
    row.size = msg.size;
    row.duration = msg.duration;

    const problems: string[] = [];

    if (row.result !== 'OK') {
      problems.push(`result=${row.result}`);
    }
    if (!(Number(row.ack) >= 1)) {
      problems.push(`ack=${row.ack}`);
    }
    problems.push(...(testCase.check?.(msg) || []));

    row.ok = problems.length === 0;

    if (problems.length) {
      row.problems = problems.join('; ');
    }
  } catch (error: any) {
    row.error = error?.message || String(error);
  }

  row.ms = Math.round(performance.now() - started);
  console.log(row.ok ? `✅ ${name}` : `❌ ${name}`, row);

  return row;
}

/**
 * Send the test messages and check what WhatsApp stored for each one.
 *
 * Everything goes to the chat open in the UI unless a chat id is given.
 *
 * @example
 * ```javascript
 * // Everything
 * await WPP.dev.sendTests();
 *
 * // One group
 * await WPP.dev.sendTests('files');
 * await WPP.dev.sendTests('regular');
 *
 * // One case
 * await WPP.dev.sendTests('files.video');
 *
 * // To a specific chat
 * await WPP.dev.sendTests('files', '[number]@c.us');
 *
 * // The cases themselves
 * WPP.dev.cases;
 * ```
 */
export async function sendTests(
  only?: string,
  chatId?: string
): Promise<TestResult[]> {
  const names = select(only);

  /**
   * Resolved once and passed down, so every case lands in the same chat even if
   * the active chat changes while the run is in progress.
   */
  const to = target(chatId);

  console.log(`running ${names.length} send test(s) on ${to}`);

  const rows: TestResult[] = [];

  for (const name of names) {
    rows.push(await runCase(name, to));
  }

  console.table(rows, [
    'case',
    'ok',
    'ack',
    'result',
    'type',
    'mimetype',
    'size',
    'duration',
    'ms',
    'problems',
    'error',
  ]);

  const failed = rows.filter((row) => !row.ok).map((row) => row.case);
  console.log(failed.length ? `failed: ${failed.join(', ')}` : 'all passed');

  return rows;
}
