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
export interface ResultCreateNewsletter {
    idJid: string;
    inviteCode: string;
    inviteLink: string;
    name: string;
    state: string;
    subscribersCount: number;
    description: string | null;
    timestamp: number;
}
/**
 * Edit the newsletter data
 *
 * @example
 * ```javascript
 * // To edit name
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * name: 'New Name'
 * });
 *
 * // To edit description
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * description: 'New description'
 * });
 *
 * // To change picture
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * picture: '<base64_image>'
 * });
 *
 * // To remove picture
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * picture: null
 * });
 * ```
 *
 * @category Newsletter
 */
export declare function edit(newsletterId: string, opts: {
    name?: string;
    description?: string;
    picture?: string;
}): Promise<ResultCreateNewsletter>;
