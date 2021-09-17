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

import { exportModule } from '../exportModule';
import { CallModel } from '../models';
import { Collection } from './Collection';

/**
 * @whatsapp 2.2126.14:74692
 * @whatsapp 2.2136.9:15971
 * @whatsapp 2.2136.10:15971
 */
export declare class CallCollection extends Collection<CallModel> {
  static model: CallModel;
  pendingOffers?: any;
  pendingVoipCapChecks?: any;
  handleQuery(): any;
  processIncomingCall(e?: any, t?: any, r?: any): any;
  cleanupPendingOffer(e?: any): any;
  setActiveCall(e?: any): any;
}
exportModule(
  exports,
  { CallCollection: 'CallCollection' },
  (m) => m.CallCollection
);
