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

export interface FileTestCase {
  /** Full data URI, as a caller of the public API would pass it */
  data: string;
  options: Record<string, any>;
  /** The `type` WhatsApp is expected to store on the message */
  expectedType: string;
  /**
   * Only the top level type is asserted: WhatsApp re-encodes images and PTT
   * audio, so an exact round trip of the mimetype is not stable.
   */
  expectedMimetype: RegExp;
}

export interface FileTestResult {
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
  waveform?: boolean;
  problems?: string;
  error?: string;
}

export const cases: Record<string, FileTestCase> = {
  image: {
    data: `data:image/png;base64,${PNG}`,
    options: { type: 'image', caption: 'wa-js image test' },
    expectedType: 'image',
    expectedMimetype: /^image\//,
  },
  video: {
    data: `data:video/mp4;base64,${MP4}`,
    options: { type: 'video', caption: 'wa-js video test' },
    expectedType: 'video',
    expectedMimetype: /^video\//,
  },
  audio: {
    data: `data:audio/mpeg;base64,${MP3}`,
    // isPtt with waveform is the fragile path, it decodes the file
    options: { type: 'audio', isPtt: true, waveform: true },
    expectedType: 'ptt',
    expectedMimetype: /^audio\//,
  },
  pdf: {
    data: `data:application/pdf;base64,${PDF}`,
    options: { type: 'document', filename: 'wa-js-test.pdf' },
    expectedType: 'document',
    expectedMimetype: /^application\/pdf/,
  },
  text: {
    // Plain text has no magic bytes, so the mimetype cannot be sniffed from the
    // content and has to be given explicitly
    data: `data:text/plain,${encodeURIComponent(TXT)}`,
    options: {
      type: 'document',
      filename: 'wa-js-test.txt',
      mimetype: 'text/plain',
    },
    expectedType: 'document',
    expectedMimetype: /^text\/plain/,
  },
};

/**
 * Resolve the chat every case is sent to, in order of preference:
 *
 * 1. the id passed to {@link send} or {@link all}
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

/**
 * Send one of the {@link cases} and check what WhatsApp stored for it.
 *
 * @example
 * ```javascript
 * // To the chat open in the UI
 * await WPP.dev.sendFileTest.send('video');
 *
 * // To a specific chat
 * await WPP.dev.sendFileTest.send('video', '[number]@c.us');
 * ```
 */
export async function send(
  name: string,
  chatId?: string
): Promise<FileTestResult> {
  const fileCase = cases[name];

  if (!fileCase) {
    throw new Error(
      `Unknown case "${name}", available: ${Object.keys(cases).join(', ')}`
    );
  }

  const started = performance.now();
  const row: FileTestResult = { case: name, ok: false, ms: 0 };

  try {
    const sent = await chat.sendFileMessage(
      target(chatId),
      fileCase.data,
      fileCase.options as any
    );

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
    row.waveform = !!msg.waveform;

    const problems: string[] = [];

    if (row.result !== 'OK') {
      problems.push(`result=${row.result}`);
    }
    if (!(Number(row.ack) >= 1)) {
      problems.push(`ack=${row.ack}`);
    }
    if (row.type !== fileCase.expectedType) {
      problems.push(`type=${row.type}, expected ${fileCase.expectedType}`);
    }
    if (!fileCase.expectedMimetype.test(row.mimetype || '')) {
      problems.push(`mimetype=${row.mimetype}`);
    }
    // A rejected payload uploads as 0 bytes
    if (!(Number(row.size) > 0)) {
      problems.push(`size=${row.size}`);
    }
    if (fileCase.options['isPtt']) {
      // The file really decoded, it was not forwarded as opaque bytes
      if (!(Number(row.duration) > 0)) {
        problems.push(`duration=${row.duration}`);
      }
      if (!row.waveform) {
        problems.push('no waveform');
      }
    }

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
 * Send every case in sequence and print a table of what WhatsApp stored.
 *
 * @example
 * ```javascript
 * // Open a chat in the UI, then
 * await WPP.dev.sendFileTest.all();
 *
 * // Or name the chat
 * await WPP.dev.sendFileTest.all('[number]@c.us');
 * ```
 */
export async function all(chatId?: string): Promise<FileTestResult[]> {
  const names = Object.keys(cases);

  /**
   * Resolved once and passed down, so every case lands in the same chat even if
   * the active chat changes while the run is in progress.
   */
  const to = target(chatId);

  console.log(`sending ${names.length} files to ${to}`);

  const rows: FileTestResult[] = [];

  for (const name of names) {
    rows.push(await send(name, to));
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
    'waveform',
    'ms',
    'problems',
    'error',
  ]);

  const failed = rows.filter((row) => !row.ok).map((row) => row.case);
  console.log(failed.length ? `failed: ${failed.join(', ')}` : 'all passed');

  return rows;
}
