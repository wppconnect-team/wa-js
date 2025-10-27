/*!
 * Copyright 2024 WPPConnect Team
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
import { Wid } from '../../whatsapp';
import { SendMessageOptions, SendMessageReturn } from '..';
export interface CatalogMessageOptions extends SendMessageOptions {
    jpegThumbnail?: string;
    title?: string;
    description?: string;
    textMessage?: string;
}
/**
 * Send catalog message
 *
 * @example
 * ```javascript
 * WPP.chat.sendCatalogMessage(
 *  '[number]@c.us',
 *  '[number]@c.us',
 * {
 *   title: 'My Catalog',
 *   description: 'This is my catalog',
 *   textMessage: 'Check out my catalog',
 *   jpegThumbnail: 'data:image/jpeg;base64,...'
 * }
 * );
 * ```
 *
 * @category Message
 */
export declare function sendCatalogMessage(chatToSend: string | Wid, chatFromCatalog: string | Wid, opts: CatalogMessageOptions): Promise<SendMessageReturn>;
