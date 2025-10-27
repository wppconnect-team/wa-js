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
import { ChatCollection } from '../collections';
import { MsgKey, MsgLoad, Wid } from '../misc';
import { Model } from './Model';
import { MsgModel } from './MsgModel';
export interface PropsChatBase {
    id: Wid;
    pendingMsgs: boolean;
    labels?: string[];
}
export interface SessionChatBase {
    msgChunks: MsgLoad[];
    lastReceivedKey?: MsgKey;
    unreadMsgAnchor: any;
    disableUnreadAnchor: any;
    msgsLength: number;
    msgsChanged: number;
}
/** @whatsapp 58492
 * @whatsapp 558492 >= 2.2222.8
 */
export declare class ModelChatBase extends Model<ChatCollection> {
    msgs: MsgLoad;
    onEmptyMRM(): void;
    removeMsg(msg: MsgModel): void;
    getAllCMCs(): MsgLoad[];
    getAllMsgs(): MsgModel[];
    replaceMsgsCollection(collecton: MsgLoad): void;
    removeMsgsCollection(collecton: MsgLoad): void;
    notifyMsgCollectionMerge(...args: any[]): void;
}
