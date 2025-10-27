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
import { CallCollection } from '../collections';
import { CALL_STATES } from '../enums';
import { Wid } from '../misc';
import { Model, ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
interface Props {
    id: string;
    peerJid: Wid;
    offerTime: number;
    isVideo: boolean;
    isGroup: boolean;
    groupCallParticipants?: any;
    canHandleLocally: boolean;
    outgoing: boolean;
    webClientShouldHandle: boolean;
    callInfo?: any;
}
interface Session {
    stale?: any;
}
interface Derived {
}
/** @whatsapp 36473
 * @whatsapp 40122 >= 2.2204.13
 * @whatsapp 736473 >= 2.2222.8
 */
export declare interface CallModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 36473
 * @whatsapp 40122 >= 2.2204.13
 * @whatsapp 736473 >= 2.2222.8
 */
export declare class CallModel extends Model<CallCollection> {
    constructor(proterties?: ModelPropertiesContructor<CallModel>, options?: ModelOptions);
    getState(): CALL_STATES;
    setState(state: CALL_STATES): void;
    getCollection(): CallCollection;
}
export {};
