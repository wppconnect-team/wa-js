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
    id?: string;
    displayText?: string;
}
interface Session {
    stale?: any;
    selected?: any;
}
interface Derived {
}
/** @whatsapp 15871
 * @whatsapp 315871 >= 2.2222.8
 */
export declare interface ReplyButtonModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 15871
 * @whatsapp 315871 >= 2.2222.8
 */
export declare class ReplyButtonModel extends Model {
    constructor(proterties?: ModelPropertiesContructor<ReplyButtonModel>, options?: ModelOptions);
}
export {};
