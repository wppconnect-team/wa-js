/*!
 * Copyright 2023 WPPConnect Team
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
export interface CallOfferOptions {
    isVideo?: boolean;
}
/**
 * Send a call offer
 *
 * This method only will send a call offer, but there are no audio/video
 *
 * @example
 * ```javascript
 * // Send a call offer
 * WPP.call.offer('[number]@c.us');
 * // Send a video call offer
 * WPP.call.offer('[number]@c.us', {isVideo: true});
 * ```
 */
export declare function offer(to: string | Wid, options?: CallOfferOptions): Promise<any>;
