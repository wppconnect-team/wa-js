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
import { CallModel } from '../models';
import { Collection } from './Collection';
/** @whatsapp 60868
 * @whatsapp 31218 >= 2.2204.13
 * @whatsapp 160868 >= 2.2222.8
 */
export declare class CallCollection extends Collection<CallModel> {
    static model: CallModel;
    $CallCollectionImpl$p_1?: () => any;
    activeCall: CallModel | null;
    isInConnectedCall: boolean;
    pendingOffers: Record<string, any>;
    pendingVoipCapChecks: Record<string, any>;
    _cachePolicy: any;
    _events: Record<string, any>;
    _index: Record<string, any>;
    _inflight: Record<string, any>;
    _listenId: string;
    _models: CallModel[];
    _staleCollection: boolean;
    cleanupPendingOffer(a?: any): any;
    processIncomingCall(a?: any, b?: any, e?: any): any;
    setActiveCall(a?: any): any;
    setIsInConnectedCall(flag: boolean): any;
}
