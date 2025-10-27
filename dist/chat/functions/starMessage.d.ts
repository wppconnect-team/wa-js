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
export interface StarMessageReturn {
    id: string;
    star: boolean;
}
/**
 * Star/Unstar a message
 *
 * @example
 * ```javascript
 * // star a message
 * WPP.chat.starMessage('<message id>');
 *
 * // unstar a message
 * WPP.chat.starMessage('<message id>', false);
 * ```
 * @category Message
 */
export declare function starMessage(id: string, star: boolean): Promise<StarMessageReturn>;
/**
 * Star/Unstar messages
 *
 * @example
 * ```javascript
 * // star messages
 * WPP.chat.starMessage(['<message id>', '<message id>']);
 *
 * // unstar messages
 * WPP.chat.starMessage(['<message id>', '<message id>'], false);
 * ```
 * @category Message
 */
export declare function starMessage(ids: string[], star: boolean): Promise<StarMessageReturn[]>;
