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
import { LinkPreviewOptions, MessageButtonsOptions, SendMessageOptions, SendMessageReturn } from '..';
export type TextMessageOptions = SendMessageOptions & MessageButtonsOptions & LinkPreviewOptions;
/**
 * Send a text message
 *
 * @example
 * ```javascript
 * WPP.chat.sendTextMessage('[number]@c.us', 'Hello new contact', {
 *   createChat: true
 * });
 *
 * // With Buttons
 * // Attention: The buttons are an alternative solution we found to make it work. There is no guarantee that they will continue functioning, or when they might stop: The only certainty is: They will stop, so use them responsibly.
 * WPP.chat.sendTextMessage('[number]@c.us', 'Hello', {
 *   useInteractiveMessage: true, // False for legacy
 *   buttons: [
 *     {
 *       url: 'https://wppconnect.io/',
 *       text: 'WPPConnect Site'
 *     },
 *     {
 *       phoneNumber: '+55 11 22334455',
 *       text: 'Call me'
 *     },
 *     {
 *       id: 'your custom id 1',
 *       text: 'Some text'
 *     },
 *     {
 *       code: '789890',
 *       text: 'Another text'
 *     }
 *   ],
 *   title: 'Title text', // Optional
 *   footer: 'Footer text' // Optional
 * });
 * ```
 * @category Message
 */
export declare function sendTextMessage(chatId: any, content: any, options?: TextMessageOptions): Promise<SendMessageReturn>;
