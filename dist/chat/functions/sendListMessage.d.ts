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
import { SendMessageOptions, SendMessageReturn } from '..';
export interface ListMessageOptions extends SendMessageOptions {
    buttonText: string;
    description: string;
    title?: string;
    footer?: string;
    sections: Array<{
        title: string;
        rows: Array<{
            rowId: string;
            title: string;
            description: string;
        }>;
    }>;
}
/**
 * Send a list message
 *
 * @example
 * ```javascript
 * WPP.chat.sendListMessage('[number]@c.us', {
 *   buttonText: 'Click Me!', //required
 *   description: "Hello it's list message", //required
 *   title: 'Hello user', //optional
 *   footer: 'Click and choose one', //optional
 *   sections: [{
 *     title: 'Section 1',
 *     rows: [{
 *       rowId: 'rowid1',
 *       title: 'Row 1',
 *       description: "Hello it's description 1",
 *     },{
 *       rowId: 'rowid2',
 *       title: 'Row 2',
 *       description: "Hello it's description 2",
 *     }]
 *   }]
 * });
 * ```
 * @category Message
 */
export declare function sendListMessage(chatId: any, options: ListMessageOptions): Promise<SendMessageReturn>;
