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
import { TextFontStyle } from '../../enums';
import { SendStatusOptions } from './sendRawStatus';
export interface TextStatusOptions extends SendStatusOptions {
    font?: TextFontStyle;
    backgroundColor?: string | number;
}
/**
 * Send a text message to status stories
 *
 * @example
 * ```javascript
 * WPP.status.sendTextStatus(`Bootstrap primary color: #0275d8`, { backgroundColor: '#0275d8', font: 2});
 * ```
 */
export declare function sendTextStatus(content: any, options?: TextStatusOptions): Promise<any>;
