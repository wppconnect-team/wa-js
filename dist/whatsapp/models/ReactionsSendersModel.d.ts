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
import { Model, ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
interface Props {
    id?: any;
    msgKey?: string;
    parentMsgKey?: string;
    reactionText?: string;
    timestamp?: number;
    senderUserJid?: string;
    read?: boolean;
    orphan?: number;
    ack?: number;
    isSendFailure?: boolean;
}
interface Session {
    senderObj?: any;
}
interface Derived {
    isFailed: boolean;
    parentMsg?: any;
}
/**
 * @whatsapp 81130
 * @whatsapp 981130 >= 2.2222.8
 */
export declare interface ReactionsSendersModel extends ModelProxy<Props, Session, Derived> {
}
/**
 * @whatsapp 81130
 * @whatsapp 981130 >= 2.2222.8
 */
export declare class ReactionsSendersModel extends Model {
    constructor(proterties?: ModelPropertiesContructor<ReactionsSendersModel>, options?: ModelOptions);
}
export {};
