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
import { RawMessage } from '..';
export type MessageButtonsTypes = {
    id: string;
    text: string;
} | {
    phoneNumber: string;
    text: string;
} | {
    url: string;
    text: string;
} | {
    code: string;
    text: string;
};
export interface MessageButtonsOptions {
    /**
     * List of buttons, with at least 1 option and a maximum of 3
     */
    buttons?: Array<MessageButtonsTypes>;
    /**
     * Title for buttons, only for text message
     */
    title?: string;
    /**
     * Footer text for buttons
     */
    footer?: string;
}
/**
 * Prepare a message for buttons
 *
 * @category Message
 * @internal
 */
export declare function prepareMessageButtons<T extends RawMessage>(message: T, options: MessageButtonsOptions): T;
