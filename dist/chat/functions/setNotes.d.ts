/*!
 * Copyright 2022 WPPConnect Team
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
import { NoteModel, Wid } from '../../whatsapp';
/**
 * Set notes for a contact
 * Only when are connected with business device
 * @example
 * ```javascript
 * WPP.chat.setNotes('[number]@c.us', 'Text for your notes');
 * ```
 * @category Chat
 */
export declare function setNotes(chatId: string | Wid, content: string): Promise<NoteModel | null>;
