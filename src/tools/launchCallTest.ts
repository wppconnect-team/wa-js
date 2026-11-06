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

/**
 * Places a call, plays an audio file to the other party and saves a
 * recording of both sides, all driven from Node.js.
 *
 * Chrome DevTools must stay closed during the call: while it is open the
 * VoIP engine stalls and the other party sees the call "reconnecting".
 *
 * Usage:
 *   npm run build:dev
 *   npm run launch:call-test -- <number> [audio-file]
 *
 * Environment variables (alternative to the arguments):
 *   CALL_TO          number to call, with country code
 *   CALL_AUDIO       audio file to play (wav, mp3, ogg), default
 *                    src/tools/assets/call-test.wav
 *   CALL_MAX_SECONDS hang up after this many seconds, default 60
 */

import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_AUDIO = path.resolve(__dirname, 'assets/call-test.wav');

const MIME_TYPES: { [ext: string]: string } = {
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/ogg',
  '.m4a': 'audio/mp4',
};

function readAudioAsDataUrl(file: string) {
  const mime =
    MIME_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

async function waitForLogin(page: any) {
  console.log('⏳ Waiting for WhatsApp login (scan the QR code if asked)...');

  // The page reloads during startup, so poll instead of a single wait
  for (;;) {
    const ready = await page
      .evaluate(() => {
        const WPP = (window as any).WPP;
        return !!WPP?.isFullReady && WPP.conn.isAuthenticated();
      })
      .catch(() => false);

    if (ready) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }
}

async function start() {
  // Read by ./browser when it is loaded
  process.env['WA_VERSION'] = process.env['WA_VERSION'] || 'latest';
  const { getPage } = await import('./browser');

  const [argTo, argAudio] = process.argv.slice(2);
  const number = (argTo || process.env['CALL_TO'] || '').trim();
  if (!number) {
    throw new Error(
      'Missing the number to call: npm run launch:call-test -- <number> [audio-file]'
    );
  }
  const to = number.includes('@') ? number : `${number}@c.us`;
  const audioFile = path.resolve(
    argAudio || process.env['CALL_AUDIO'] || DEFAULT_AUDIO
  );
  const maxSeconds = Number(process.env['CALL_MAX_SECONDS'] || 60);

  if (!fs.existsSync(audioFile)) {
    throw new Error(`Audio file not found: ${audioFile}`);
  }

  const { browser, page } = await getPage({
    headless: false,
    viewport: null,
    // The virtual microphone and WhatsApp's call audio need autoplay
    args: ['--autoplay-policy=no-user-gesture-required'],
  });

  await page.exposeFunction('wppCallTestLog', (message: string) =>
    console.log(message)
  );

  await waitForLogin(page);
  console.log(`📞 Calling ${to} and playing ${path.basename(audioFile)}`);

  const wavBase64: string | null = await page.evaluate(
    ({ to, audio, maxMs }) => {
      const WPP = (window as any).WPP;
      const log = (...args: any[]) =>
        (window as any).wppCallTestLog(args.map(String).join(' '));

      WPP.call.enableAudioInjection();
      WPP.call.startRecording();

      return new Promise<string | null>((resolve) => {
        let finished = false;
        const finish = () => {
          if (finished) {
            return;
          }
          finished = true;
          clearTimeout(maxTimer);
          resolve(WPP.call.stopRecording({ format: 'base64' }));
        };

        WPP.on('call.state_changed', (call: any) =>
          log('[call] state', call.stateName)
        );
        WPP.on('call.ringing', () => log('[call] ringing'));

        WPP.on('call.accepted', async () => {
          log('[call] accepted, playing audio');
          try {
            await WPP.call.playAudio(audio);
            log('[call] audio finished');
            await new Promise((r) => setTimeout(r, 1_500));
            await WPP.call.end();
          } catch (error: any) {
            log('[call] error:', error?.message || error);
          }
        });

        WPP.on('call.ended', (call: any) => {
          log(
            '[call] ended:',
            call.resultName,
            `${((call.activeDuration || 0) / 1000).toFixed(1)}s connected`
          );
          setTimeout(finish, 500);
        });

        const maxTimer = setTimeout(() => {
          log('[call] max duration reached, hanging up');
          WPP.call.end().catch(() => undefined);
          setTimeout(finish, 1_000);
        }, maxMs);

        WPP.call.offer(to).catch((error: any) => {
          log('[call] offer failed:', error?.message || error);
          finish();
        });
      });
    },
    { to, audio: readAudioAsDataUrl(audioFile), maxMs: maxSeconds * 1000 }
  );

  if (wavBase64) {
    const output = path.resolve(
      __dirname,
      `../../media/call-${new Date().toISOString().replace(/[:.]/g, '-')}.wav`
    );
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, Buffer.from(wavBase64, 'base64'));
    console.log(`💾 Recording saved to ${output}`);
  }

  await browser.close();
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
