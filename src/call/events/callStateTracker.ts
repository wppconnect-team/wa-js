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
 * `WAWebVoipWaCallEnums.CallState`
 */
export const CALL_STATE_NAMES: { [state: number]: string } = {
  0: 'None',
  1: 'Calling',
  2: 'PreacceptReceived',
  3: 'ReceivedCall',
  4: 'AcceptSent',
  5: 'AcceptReceived',
  6: 'CallActive',
  7: 'CallActiveElseWhere',
  8: 'ReceivedCallWithoutOffer',
  9: 'Rejoining',
  10: 'Link',
  11: 'ConnectedLonely',
  12: 'PreCalling',
  13: 'CallStateEnding',
  14: 'CallBCallStarting',
};

/**
 * `WAWebVoipWaCallEnums.CallLogResult`
 */
export const CALL_RESULT_NAMES: { [result: number]: string } = {
  0: 'invalid',
  1: 'canceled',
  2: 'missed',
  3: 'unavailable',
  4: 'rejected',
  5: 'connected',
  6: 'accepted_elsewhere',
  7: 'failed',
  8: 'connected_lonely',
};

/**
 * `WAWebVoipWaCallEnums.VideoState`
 */
export const VIDEO_STATE_NAMES: { [state: number]: string } = {
  0: 'disabled',
  1: 'enabled',
  2: 'paused',
  3: 'upgrade_request',
  4: 'upgrade_accept',
  5: 'upgrade_reject',
  6: 'stopped',
  10: 'unknown_peer',
  11: 'upgrade_request',
  20: 'error',
};

const STATE = {
  None: 0,
  Calling: 1,
  PreacceptReceived: 2,
  AcceptReceived: 5,
  CallActive: 6,
  CallActiveElseWhere: 7,
  PreCalling: 12,
  CallStateEnding: 13,
};

interface TrackedCall {
  state?: number;
  outgoing?: boolean;
  ringing?: boolean;
  accepted?: boolean;
  ended?: boolean;
  selfMuted?: boolean;
  peerMuted?: boolean;
}

export type TrackerEmission = [event: string, data: any];

const MAX_TRACKED_CALLS = 20;

/**
 * Turns the VoIP bridge messages (`frontendFireAndForget` calls) into WA-JS
 * call events.
 *
 * Kept free of WhatsApp dependencies so it can be unit tested.
 */
export class CallStateTracker {
  protected calls = new Map<string, TrackedCall>();

  handle(name: string, payload: any, activeCallId?: string): TrackerEmission[] {
    switch (name) {
      case 'setCallState':
        return this.handleCallState(payload?.callState, payload?.callInfo);
      case 'handleMuteStateChange':
        return this.handleMuteState(payload?.callInfo, activeCallId);
      case 'handleVideoStateChange':
        return this.handleVideoState(payload?.videoStateData, activeCallId);
    }
    return [];
  }

  protected getCall(id: string): TrackedCall {
    let call = this.calls.get(id);
    if (!call) {
      call = {};
      this.calls.set(id, call);
      if (this.calls.size > MAX_TRACKED_CALLS) {
        this.calls.delete(this.calls.keys().next().value as string);
      }
    }
    return call;
  }

  protected baseData(info: any) {
    return {
      id: info.callId as string,
      peerJid: info.peerJid,
      groupJid: info.isGroupCall ? info.groupJid : undefined,
      isGroup: !!info.isGroupCall,
      isVideo: !!info.videoEnabled,
      isOutgoing: !!info.isCaller,
    };
  }

  protected handleCallState(state: number, info: any): TrackerEmission[] {
    if (typeof state !== 'number' || !info?.callId) {
      return [];
    }

    const call = this.getCall(info.callId);
    if (call.ended || call.state === state) {
      return [];
    }

    const previousState = call.state;
    call.state = state;

    const base = this.baseData(info);
    const result: TrackerEmission[] = [
      [
        'call.state_changed',
        {
          ...base,
          state,
          stateName: CALL_STATE_NAMES[state] || String(state),
          previousState,
        },
      ],
    ];

    if (
      (state === STATE.Calling || state === STATE.PreCalling) &&
      info.isCaller &&
      !call.outgoing
    ) {
      call.outgoing = true;
      result.push(['call.outgoing_call', base]);
    }

    if (state === STATE.PreacceptReceived && !call.ringing) {
      call.ringing = true;
      result.push(['call.ringing', base]);
    }

    if (
      (state === STATE.AcceptReceived || state === STATE.CallActive) &&
      !call.accepted
    ) {
      call.accepted = true;
      result.push(['call.accepted', base]);
    }

    const isTerminal =
      state === STATE.CallStateEnding ||
      state === STATE.CallActiveElseWhere ||
      (state === STATE.None && previousState !== undefined);

    if (isTerminal) {
      call.ended = true;
      const callResult =
        typeof info.callResult === 'number' ? info.callResult : undefined;
      result.push([
        'call.ended',
        {
          ...base,
          wasConnected: !!call.accepted,
          endedByMe: info.callEndedByMe,
          result: callResult,
          resultName:
            callResult === undefined
              ? undefined
              : CALL_RESULT_NAMES[callResult],
          duration: info.callDuration,
          activeDuration: info.callActiveDuration,
        },
      ]);
    }

    return result;
  }

  protected handleMuteState(
    info: any,
    activeCallId?: string
  ): TrackerEmission[] {
    const id: string | undefined = info?.callId || activeCallId;
    if (!id || !Array.isArray(info?.participants)) {
      return [];
    }

    const participants = info.participants.map((p: any) => ({
      jid: p.jid,
      isSelf: !!p.isSelf,
      isMuted: !!p.isMuted,
    }));
    const self = participants.find((p: any) => p.isSelf);
    const peers = participants.filter((p: any) => !p.isSelf);

    const selfMuted: boolean | undefined = self ? self.isMuted : undefined;
    const peerMuted: boolean | undefined =
      peers.length === 1 ? peers[0].isMuted : undefined;

    const call = this.getCall(id);

    // Group calls report each participant, so always forward them
    if (
      peers.length <= 1 &&
      call.selfMuted === selfMuted &&
      call.peerMuted === peerMuted
    ) {
      return [];
    }
    call.selfMuted = selfMuted;
    call.peerMuted = peerMuted;

    return [['call.mute_state', { id, selfMuted, peerMuted, participants }]];
  }

  protected handleVideoState(
    data: any,
    activeCallId?: string
  ): TrackerEmission[] {
    if (!data || !activeCallId || typeof data.videoState !== 'number') {
      return [];
    }

    return [
      [
        'call.video_state',
        {
          id: activeCallId,
          isSelf: !!data.isSelf,
          jid: data.userJid,
          state: data.videoState,
          stateName: VIDEO_STATE_NAMES[data.videoState],
        },
      ],
    ];
  }
}
