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
import { ChatModel } from '..';
import { EventEmitter } from '.';
/** @whatsapp 88102
 * @whatsapp 81572 >= 2.2218.4
 * @whatsapp 781572 >= 2.2222.8
 */
export declare class ComposeBoxActionsClass extends EventEmitter {
    focus(e?: any, t?: any): void;
    send(e?: any, t?: any): void;
    paste(e?: any, t?: any): void;
    sendPaste(e?: any, t?: any): void;
    toggleQuickReplies(e?: any, t?: any): void;
    addMsgSendingLogAttributes(e?: any, t?: any): void;
    setCtwaContextLinkData(e?: any, t?: any): void;
    setTextContent(chat: ChatModel, text: string): void;
}
/** @whatsapp WAWebComposeBoxActions >= 2.3000.0
 */
export declare const ComposeBoxActions: ComposeBoxActionsClass;
