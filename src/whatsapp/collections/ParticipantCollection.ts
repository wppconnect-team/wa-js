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
import { ParticipantModel } from '../models';
import { Collection } from './Collection';

/** @whatsapp 69125 */
export declare class ParticipantCollection extends Collection<ParticipantModel> {
  static model: ParticipantModel;
  static comparator(): any;
  canAdd(): boolean;
  canPromote(participant: ParticipantModel): boolean;
  canDemote(participant: ParticipantModel): boolean;
  canRemove(participant: ParticipantModel): boolean;
  canVerifyIdentity(participant: ParticipantModel): boolean;
  iAmMember(): boolean;
  iAmRestrictedMember(): boolean;
  iAmAdmin(): boolean;
  iAmSuperAdmin(): boolean;
  getAdmins(): ParticipantModel[];
  getSuperAdmin(): ParticipantModel;
}

exportModule(
  exports,
  {
    ParticipantCollection: 'default',
  },
  (m) => m.default.model === ParticipantModel && m.default.prototype.iAmMember
);
