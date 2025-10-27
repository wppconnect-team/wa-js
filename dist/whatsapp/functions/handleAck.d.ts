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
import { Wid } from '../misc';
export interface SimpleAckData {
    type: string;
    stanzaId: string;
    externalIds: string[];
    from: Wid;
    participant: null | Wid;
    recipient: null;
    ts: number;
    ack: number;
    ackString: null | string;
    offline: null;
    biz?: null;
}
/**
 * @whatsapp 90756
 * @deprecated
 * @whatsapp 590756 >= 2.2222.8
 * @whatsapp 585294 >= 2.2230.8
 */
export declare function handleStatusSimpleAck(ackData: SimpleAckData): Promise<any>;
/**
 * @whatsapp 48309
 * @deprecated
 * @whatsapp 648309 >= 2.2222.8
 * @whatsapp 471873 >= 2.2230.8
 */
export declare function handleChatSimpleAck(ackData: SimpleAckData): Promise<any>;
/**
 * @whatsapp 84947
 * @deprecated
 * @whatsapp 284947 >= 2.2222.8
 * @whatsapp 359554 >= 2.2230.8
 */
export declare function handleGroupSimpleAck(ackData: SimpleAckData): Promise<any>;
/** @whatsapp 90756
 * @whatsapp 590756 >= 2.2222.8
 * @whatsapp 585294 >= 2.2230.8
 */
export declare function handleStatusSimpleReceipt(ackData: SimpleAckData): Promise<any>;
/** @whatsapp 48309
 * @whatsapp 648309 >= 2.2222.8
 * @whatsapp 471873 >= 2.2230.8
 */
export declare function handleChatSimpleReceipt(ackData: SimpleAckData): Promise<any>;
/** @whatsapp 84947
 * @whatsapp 284947 >= 2.2222.8
 * @whatsapp 359554 >= 2.2230.8
 */
export declare function handleGroupSimpleReceipt(ackData: SimpleAckData): Promise<any>;
