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

/** Runs in the page and only controls the call returned by its own offer. */
export async function runCallTestScenario({
  to,
  audio,
  maxMs,
}: {
  to: string;
  audio: string;
  maxMs: number;
}): Promise<string | null> {
  const WPP = (window as any).WPP;
  const log = (...args: any[]) =>
    (window as any).wppCallTestLog(args.map(String).join(' '));
  let callId: string | undefined;
  let finished = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pauseTimer: ReturnType<typeof setTimeout> | undefined;
  let resumePause: (() => void) | undefined;
  let acceptedId: string | undefined;
  let playing = false;
  const active = () => callId && WPP.call.getActiveCall()?.id === callId;
  WPP.call.enableAudioInjection();
  WPP.call.startRecording();
  return new Promise<string | null>((resolve) => {
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      clearTimeout(pauseTimer);
      resumePause?.();
      WPP.off('call.state_changed', state);
      WPP.off('call.accepted', accepted);
      WPP.off('call.ended', ended);
      let recording: string | null = null;
      try {
        if (active() || !WPP.call.getActiveCall() || !WPP.call.isRecording())
          recording = WPP.call.stopRecording({ format: 'base64' });
      } catch (error: any) {
        log('[call] recording:', error?.message || error);
      }
      if (active() || !WPP.call.getActiveCall()) {
        WPP.call.enableAudioInjection(false);
        WPP.call.enableAudioCapture(false);
      }
      resolve(recording);
    };
    const state = (call: any) => {
      if (call.id === callId) log('[call] state', call.stateName);
    };
    const play = async () => {
      if (finished || playing || !active()) return;
      playing = true;
      try {
        await WPP.call.playAudio(audio);
        if (finished) return;
        await new Promise<void>((resolve) => {
          resumePause = resolve;
          pauseTimer = setTimeout(resolve, 1500);
        });
        if (!finished && active()) await WPP.call.end(callId);
      } catch (error: any) {
        log('[call] playback:', error?.message || error);
        finish();
      }
    };
    const accepted = (call: any) => {
      acceptedId = call.id;
      if (call.id === callId) void play();
    };
    const ended = (call: any) => {
      if (call.id === callId) {
        log('[call] ended:', call.resultName);
        finish();
      }
    };
    WPP.on('call.state_changed', state);
    WPP.on('call.accepted', accepted);
    WPP.on('call.ended', ended);
    timer = setTimeout(async () => {
      try {
        if (!finished && active()) await WPP.call.end(callId);
      } catch (error: any) {
        log('[call] end:', error?.message || error);
      } finally {
        finish();
      }
    }, maxMs);
    WPP.call
      .offer(to)
      .then((call: any) => {
        if (finished) return;
        if (!call?.id) {
          finish();
          return;
        }
        callId = call.id;
        if (!active()) {
          finish();
          return;
        }
        if (acceptedId === callId) void play();
      })
      .catch((error: any) => {
        log('[call] offer:', error?.message || error);
        finish();
      });
  });
}
