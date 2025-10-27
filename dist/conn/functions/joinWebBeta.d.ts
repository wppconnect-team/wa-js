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
/**
 * Join or leave of WhatsApp Web beta program.
 * Will return the value seted
 *
 * @example
 * ```javascript
 * // For join on Beta
 * WPP.conn.joinWebBeta(true);
 *
 * // For leave of Beta
 * WPP.conn.joinWebBeta(true);
 * ```
 */
export declare function joinWebBeta(value: boolean): Promise<boolean>;
