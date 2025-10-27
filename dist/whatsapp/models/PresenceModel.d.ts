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
import { ChatstateCollection } from '../collections';
import { Wid } from '../misc';
import { ChatstateModel } from './ChatstateModel';
import { Model, ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
interface Props {
    id: Wid;
}
interface Session {
    isOnline: boolean;
    hasData: boolean;
    isSubscribed: boolean;
    withholdDisplayStage?: any;
    forceDisplay: boolean;
    chatActive: boolean;
    withholdDisplayTimer?: any;
    forceDisplayTimer?: any;
    chatstate?: ChatstateModel;
}
interface Derived {
    isGroup: boolean;
    isUser: boolean;
}
/** @whatsapp 30000
 * @whatsapp 330000 >= 2.2222.8
 */
export declare interface PresenceModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 30000
 * @whatsapp 330000 >= 2.2222.8
 */
export declare class PresenceModel extends Model {
    idClass: typeof Wid;
    allowedIds?: any;
    chatstates: ChatstateCollection;
    constructor(proterties?: ModelPropertiesContructor<PresenceModel>, options?: ModelOptions);
    getCollection(): any;
}
export {};
