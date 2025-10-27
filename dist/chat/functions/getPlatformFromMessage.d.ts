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
import { Stringable } from '../../types';
import { MsgKey, MsgModel } from '../../whatsapp';
/**
 * Get the platform message from message ID
 *
 * The platform can be:
 * * android
 * * iphone
 * * web
 * * unknown
 *
 * @example
 * ```javascript
 * // to get platform from a message
 * const platform = WPP.chat.getPlatformFromMessage('[message_id]');
 * ```
 * @category Message
 */
export declare function getPlatformFromMessage(messageId: string | MsgKey | MsgModel | Stringable): 'android' | 'iphone' | 'web' | 'unknown';
