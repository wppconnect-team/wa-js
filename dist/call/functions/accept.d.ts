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
 * Accept a incoming call
 *
 * @example
 * ```javascript
 * // Accept any incoming call
 * WPP.call.accept();
 *
 * // Accept specific call id
 * WPP.call.accept(callId);
 *
 * // Accept any incoming call
 * WPP.on('call.incoming_call', (call) => {
 *   setTimeout(() => {
 *     WPP.call.accept(call.id);
 *   }, 1000);
 * });
 * ```
 *
 * @param   {string}  callId  The call ID, empty to accept the first one
 * @return  {[type]}          [return description]
 */
export declare function accept(callId?: string): Promise<boolean>;
