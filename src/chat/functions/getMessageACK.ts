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

import {
  MsgInfoParticipantModel,
  MsgInfoStore,
  MsgKey,
  Wid,
} from '../../whatsapp';
import { ACK } from '../../whatsapp/enums';
import { getMessageById } from '..';

export interface ParticipantStatusACK {
  id: string;
  wid: Wid;
  deliveredAt?: number;
  readAt?: number;
  playedAt?: number;
}

/**
 * Get message ACK from a message
 *
 * @example
 * ```javascript
 * // Get message ACK
 * const ackInfo = await WPP.chat.getMessageACK('true_[number]@c.us_ABCDEF');
 *
 * console.log(ackInfo.deliveryRemaining); // Delivery Remaining
 * console.log(ackInfo.readRemaining); // Read Remaining
 * console.log(ackInfo.playedRemaining); // PlayedRemaining, for audio(ptt) only
 *
 * console.log(ackInfo.participants[0].deliveredAt); // Delivered At, in timestamp format
 * console.log(ackInfo.participants[0].readAt); // Read At, in timestamp format
 * console.log(ackInfo.participants[0].playedAt); // Played At, in timestamp format, for audio(ptt) only
 *
 * //To get only how was received
 * const received = ackInfo.participants.filter(p => p.deliveredAt || p.readAt || p.playedAt);
 *
 * //To get only how was read
 * const read = ackInfo.participants.filter(p => p.readAt || p.playedAt);
 *
 * //To get only how was played
 * const played = ackInfo.participants.filter(p => p.playedAt);
 * ```
 * @category Message
 * @return  {any} Any
 */
export async function getMessageACK(msgId: string | MsgKey): Promise<{
  ack: ACK;
  fromMe: boolean;
  deliveryRemaining: number;
  readRemaining: number;
  playedRemaining: number;
  participants: ParticipantStatusACK[];
}> {
  const msg = await getMessageById(msgId);

  const info = await MsgInfoStore.find(msg.id);

  const participants = new Map<string, ParticipantStatusACK>();

  const callback = (
    m: MsgInfoParticipantModel,
    type: 'deliveredAt' | 'readAt' | 'playedAt'
  ) => {
    const id = m.id.toString();

    const status = participants.get(id) || { id, wid: m.id };

    status[type] = m.t;

    participants.set(id, status);
  };

  info?.delivery.forEach((p) => callback(p, 'deliveredAt'));
  info?.read.forEach((p) => callback(p, 'readAt'));
  info?.played.forEach((p) => callback(p, 'playedAt'));

  return {
    ack: msg.ack!,
    fromMe: msg.id.fromMe,
    deliveryRemaining: info?.deliveryRemaining || 0,
    readRemaining: info?.readRemaining || 0,
    playedRemaining: info?.playedRemaining || 0,
    participants: Array.from(participants.values()),
  };
}
