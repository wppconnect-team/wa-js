/*!
 * Copyright 2021 WPPConnect Team
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
 * @whatsapp 49835
 * @whatsapp 749835 >= 2.2222.8
 * @whatsapp 873297 >= 2.2230.8
 */
export declare enum CALL_STATES {
    INCOMING_RING = "INCOMING_RING",
    OUTGOING_RING = "OUTGOING_RING",
    OUTGOING_CALLING = "OUTGOING_CALLING",
    CONNECTING = "CONNECTING",
    CONNECTION_LOST = "CONNECTION_LOST",
    ACTIVE = "ACTIVE",
    HANDLED_REMOTELY = "HANDLED_REMOTELY",
    ENDED = "ENDED",
    REJECTED = "REJECTED",
    REMOTE_CALL_IN_PROGRESS = "REMOTE_CALL_IN_PROGRESS",
    FAILED = "FAILED",
    NOT_ANSWERED = "NOT_ANSWERED"
}
export declare enum CALL_STATES {
    None = 0,
    Calling = 1,
    PreacceptReceived = 2,
    ReceivedCall = 3,
    AcceptSent = 4,
    AcceptReceived = 5,
    CallActive = 6,
    CallActiveElseWhere = 7,
    ReceivedCallWithoutOffer = 8,
    Rejoining = 9,
    Link = 10,
    ConnectedLonely = 11,
    PreCalling = 12,
    CallStateEnding = 13,
    CallBCallStarting = 14
}
