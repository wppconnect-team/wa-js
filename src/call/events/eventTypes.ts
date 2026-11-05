/*!
 * Copyright 2022 WPPConnect Team
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
 * Common data of the call state events
 */
export interface CallEventData {
  /**
   * The call id
   */
  id: string;
  /**
   * Wid of the other party (for group calls, the creator)
   */
  peerJid: any;
  /**
   * Group of a group call, when there is one
   */
  groupJid?: any;
  isGroup: boolean;
  isVideo: boolean;
  /**
   * The call was started by you
   */
  isOutgoing: boolean;
}

export interface CallEventTypes {
  /**
   * Triggered when you start a call (by `WPP.call.offer` or any other way)
   *
   * @example
   * ```javascript
   * WPP.on('call.outgoing_call', (call) => {
   *   console.log('Calling', call.peerJid);
   * });
   * ```
   */
  'call.outgoing_call': CallEventData;
  /**
   * Triggered on every state change of the active call, incoming or outgoing.
   *
   * `state` is a `WAWebVoipWaCallEnums.CallState` value; `stateName` is its
   * name (Calling, PreacceptReceived, ReceivedCall, AcceptSent,
   * AcceptReceived, CallActive, CallStateEnding, ...)
   *
   * @example
   * ```javascript
   * WPP.on('call.state_changed', (call) => {
   *   console.log(call.id, call.stateName);
   * });
   * ```
   */
  'call.state_changed': CallEventData & {
    state: number;
    stateName: string;
    previousState?: number;
  };
  /**
   * Triggered when the other party's device starts ringing (outgoing calls)
   */
  'call.ringing': CallEventData;
  /**
   * Triggered when the call is answered and connects
   *
   * @example
   * ```javascript
   * WPP.on('call.accepted', async (call) => {
   *   await WPP.call.playAudio('https://example.com/welcome.mp3');
   * });
   * ```
   */
  'call.accepted': CallEventData;
  /**
   * Triggered when the call ends, for any reason
   *
   * @example
   * ```javascript
   * WPP.on('call.ended', (call) => {
   *   console.log(call.id, call.resultName, call.activeDuration);
   * });
   * ```
   */
  'call.ended': CallEventData & {
    /**
     * The call connected before ending
     */
    wasConnected: boolean;
    /**
     * You ended the call
     */
    endedByMe?: boolean;
    /**
     * `WAWebVoipWaCallEnums.CallLogResult` value
     */
    result?: number;
    /**
     * canceled, missed, unavailable, rejected, connected,
     * accepted_elsewhere, failed or connected_lonely
     */
    resultName?: string;
    /**
     * Duration since the call started, in milliseconds
     */
    duration?: number;
    /**
     * Duration while connected, in milliseconds
     */
    activeDuration?: number;
  };
  /**
   * Triggered when you or another participant mutes or unmutes the microphone
   */
  'call.mute_state': {
    id: string;
    selfMuted?: boolean;
    /**
     * Mute state of the other party, for 1:1 calls
     */
    peerMuted?: boolean;
    participants: { jid: any; isSelf: boolean; isMuted: boolean }[];
  };
  /**
   * Triggered when you or another participant turns the camera on or off,
   * or requests to upgrade the call to video
   */
  'call.video_state': {
    id: string;
    isSelf: boolean;
    jid?: any;
    /**
     * `WAWebVoipWaCallEnums.VideoState` value
     */
    state: number;
    stateName?: string;
  };
  /**
   * Triggered for every call signaling stanza received or sent
   * (offer, preaccept, accept, transport, relaylatency, mute_v2,
   * terminate, reject, ...). Only emitted while there is a listener.
   *
   * @example
   * ```javascript
   * WPP.on('call.signaling', (msg) => {
   *   console.log(msg.direction, msg.type, msg.attrs);
   * });
   * ```
   */
  'call.signaling': {
    /**
     * The call id, from the `call-id` attribute
     */
    id?: string;
    direction: 'incoming' | 'outgoing';
    /**
     * The stanza tag: offer, accept, terminate, ...
     */
    type: string;
    peerJid?: string;
    attrs: { [key: string]: any };
    /**
     * The raw WapNode
     */
    node: any;
  };
  /**
   * Triggered for each audio frame of the active call, after
   * `WPP.call.enableAudioCapture()`. Frames are 16 kHz mono, 60 ms long
   * (960 samples).
   *
   * @example
   * ```javascript
   * WPP.call.enableAudioCapture({ format: 'int16-base64' });
   * WPP.on('call.audio_frame', (frame) => {
   *   if (frame.source === 'remote') {
   *     // send frame.samples to a speech-to-text service
   *   }
   * });
   * ```
   */
  'call.audio_frame': {
    /**
     * The active call id, when there is one
     */
    id?: string;
    /**
     * `remote`: what you hear; `local`: what you send
     */
    source: 'remote' | 'local';
    sampleRate: number;
    format: 'float32' | 'int16-base64';
    /**
     * `Float32Array` for `float32`, base64 of little-endian Int16 PCM for
     * `int16-base64`
     */
    samples: Float32Array | string;
    /**
     * `performance.now()` when the frame was captured
     */
    timestamp: number;
  };
  /**
   * Triggered when you a incoming call
   *
   * @example
   * ```javascript
   * WPP.on('call.incoming_call', (call) => {
   *   // Your code
   *   //Example: Reject any incoming call
   *   WPP.call.rejectCall(call.id);
   * });
   * ```
   */
  'call.incoming_call': {
    /**
     * The call id
     */
    id: string;
    /**
     * Is a call from a group
     */
    isGroup: boolean;
    /**
     * Is call with video
     */
    isVideo: boolean;
    /**
     * timestamp of offer
     */
    offerTime: number;
    /**
     * Wid of sender without device id
     */
    sender: any;
    /**
     * Wid of sender with device id
     */
    peerJid: any;
    /**
     * Group identifier supplied by WhatsApp for an incoming group call.
     * Undefined for individual calls or when WhatsApp does not supply it.
     */
    groupJid?: any;
  };
}
