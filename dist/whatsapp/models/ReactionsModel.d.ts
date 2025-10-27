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
import { AggReactionsCollection, ReactionsCollection } from '../collections';
import { MsgKey, Wid } from '../misc';
import { Model, ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
import { ReactionsSendersModel } from './ReactionsSendersModel';
interface Props {
    id: Wid;
    reactionByMe?: ReactionsSendersModel;
}
interface Session {
}
interface Derived {
}
/** @whatsapp 80666
 * @whatsapp 81130 >= 2.2220.8
 * @whatsapp 981130 >= 2.2222.8
 */
export declare interface ReactionsModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 80666
 * @whatsapp 81130 >= 2.2220.8
 * @whatsapp 981130 >= 2.2222.8
 */
export declare class ReactionsModel extends Model {
    constructor(proterties?: ModelPropertiesContructor<ReactionsModel>, options?: ModelOptions);
    reactions: AggReactionsCollection;
    unreadSenders(): {
        msgKey: string;
        parentMsgKey: MsgKey;
        reactionText: string;
        senderUserJid: string;
    }[];
    getCollection(): ReactionsCollection;
}
export {};
