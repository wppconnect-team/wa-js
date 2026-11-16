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

import { exportModule } from '../exportModule';

/**
 * Final result of a call, as written to the call log
 *
 * @whatsapp WAWebVoipWaCallEnums
 */
export declare enum CALL_LOG_RESULT {
  Invalid = 0,
  Canceled = 1,
  Missed = 2,
  Unavailable = 3,
  Rejected = 4,
  Connected = 5,
  AcceptedElsewhere = 6,
  Failed = 7,
  ConnectedLonely = 8,
}

/**
 * Video state of a call participant
 *
 * @whatsapp WAWebVoipWaCallEnums
 */
export declare enum VOIP_VIDEO_STATE {
  Disabled = 0,
  Enabled = 1,
  Paused = 2,
  UpgradeRequest = 3,
  UpgradeAccept = 4,
  UpgradeReject = 5,
  Stopped = 6,
  UnknownPeer = 10,
  UpgradeRequestV2 = 11,
  Error = 20,
}

/**
 * Reason passed to the VoIP stack when ending a call
 *
 * @whatsapp WAWebVoipSignalingEnums
 */
export declare enum END_CALL_REASON {
  Unknown = 0,
  Timeout = 1,
  Self = 2,
  RejectDoNotDisturb = 3,
  RejectBlocked = 4,
  MicPermissionDenied = 5,
  CameraPermissionDenied = 6,
}

exportModule(
  exports,
  {
    CALL_LOG_RESULT: 'CallLogResult',
    VOIP_VIDEO_STATE: 'VideoState',
  },
  (m) => m.CallLogResult && m.VideoState && m.CallState
);

exportModule(
  exports,
  {
    END_CALL_REASON: 'EndCallReason',
  },
  (m) => m.EndCallReason && m.TYPE_NAME
);
