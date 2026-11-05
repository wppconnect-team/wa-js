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

import { CallStateTracker } from '../src/call/events/callStateTracker';

function info(extra: any = {}) {
  return {
    callId: 'CALL-1',
    peerJid: '123@lid',
    isCaller: true,
    videoEnabled: false,
    isGroupCall: false,
    ...extra,
  };
}

function state(tracker: CallStateTracker, callState: number, extra?: any) {
  return tracker
    .handle('setCallState', { callState, callInfo: info(extra) })
    .map(([event]) => event);
}

test.describe('CallStateTracker', () => {
  test('maps an outgoing call lifecycle to events', () => {
    const tracker = new CallStateTracker();

    expect(state(tracker, 1)).toEqual([
      'call.state_changed',
      'call.outgoing_call',
    ]);
    expect(state(tracker, 2)).toEqual(['call.state_changed', 'call.ringing']);
    expect(state(tracker, 5)).toEqual(['call.state_changed', 'call.accepted']);
    expect(state(tracker, 6)).toEqual(['call.state_changed']);

    const ended = tracker.handle('setCallState', {
      callState: 13,
      callInfo: info({
        callResult: 5,
        callEndedByMe: true,
        callActiveDuration: 12,
      }),
    });
    expect(ended.map(([e]) => e)).toEqual(['call.state_changed', 'call.ended']);
    expect(ended[1][1]).toMatchObject({
      id: 'CALL-1',
      wasConnected: true,
      endedByMe: true,
      resultName: 'connected',
      activeDuration: 12,
    });

    // Nothing after the call ended
    expect(state(tracker, 0)).toEqual([]);
  });

  test('ignores repeated states', () => {
    const tracker = new CallStateTracker();

    state(tracker, 1);
    expect(state(tracker, 1)).toEqual([]);
  });

  test('incoming call accepted and missed', () => {
    const tracker = new CallStateTracker();

    expect(state(tracker, 3, { isCaller: false })).toEqual([
      'call.state_changed',
    ]);
    expect(state(tracker, 4, { isCaller: false })).toEqual([
      'call.state_changed',
    ]);
    expect(state(tracker, 6, { isCaller: false })).toEqual([
      'call.state_changed',
      'call.accepted',
    ]);

    const missed = new CallStateTracker();
    state(missed, 3, { callId: 'CALL-2', isCaller: false });
    const ended = missed.handle('setCallState', {
      callState: 0,
      callInfo: info({ callId: 'CALL-2', isCaller: false, callResult: 2 }),
    });
    expect(ended[1]).toEqual([
      'call.ended',
      expect.objectContaining({ wasConnected: false, resultName: 'missed' }),
    ]);
  });

  test('emits mute changes only when they change', () => {
    const tracker = new CallStateTracker();
    const callInfo = (peerMuted: boolean) => ({
      callId: 'CALL-1',
      participants: [
        { jid: 'me@lid', isSelf: true, isMuted: false },
        { jid: 'peer@lid', isSelf: false, isMuted: peerMuted },
      ],
    });

    const first = tracker.handle('handleMuteStateChange', {
      callInfo: callInfo(true),
    });
    expect(first[0][1]).toMatchObject({ selfMuted: false, peerMuted: true });

    expect(
      tracker.handle('handleMuteStateChange', { callInfo: callInfo(true) })
    ).toEqual([]);
    expect(
      tracker.handle('handleMuteStateChange', { callInfo: callInfo(false) })
    ).toHaveLength(1);
  });

  test('uses the active call id for video state', () => {
    const tracker = new CallStateTracker();

    expect(
      tracker.handle(
        'handleVideoStateChange',
        { videoStateData: { isSelf: false, videoState: 1, userJid: 'p' } },
        'CALL-1'
      )
    ).toEqual([
      [
        'call.video_state',
        {
          id: 'CALL-1',
          isSelf: false,
          jid: 'p',
          state: 1,
          stateName: 'enabled',
        },
      ],
    ]);
  });

  test('ignores unrelated messages', () => {
    expect(new CallStateTracker().handle('trackVoipActivity', {})).toEqual([]);
  });
});
