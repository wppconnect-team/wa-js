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
    mediaObject?: any;
    deprecatedMms3Url?: any;
    directPath?: any;
    filehash?: any;
    height?: any;
    index?: any;
    mediaKey?: any;
    mediaKeyTimestamp?: any;
    mimetype?: any;
    size?: any;
    type?: any;
    encFilehash?: any;
    width?: any;
    isPlaceholder: boolean;
}
interface Session {
    stale?: any;
    mediaData?: any;
}
interface Derived {
}
/** @whatsapp 99718
 * @whatsapp 89867 >= 2.2204.13
 * @whatsapp 689867 >= 2.2222.8
 */
export declare interface StickerModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 99718
 * @whatsapp 89867 >= 2.2204.13
 * @whatsapp 689867 >= 2.2222.8
 */
export declare class StickerModel extends Model {
    constructor(proterties?: ModelPropertiesContructor<StickerModel>, options?: ModelOptions);
    downloadMedia(): any;
    sendToChat(e?: any, t?: any): any;
    static getPlaceholder(): StickerModel;
}
export {};
