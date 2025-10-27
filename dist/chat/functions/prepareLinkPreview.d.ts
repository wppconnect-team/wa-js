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
import { RawMessage } from '..';
export interface LinkPreviewOptions {
    /**
     * Send text message with link preview
     *
     * @default true
     *
     * @example
     * ```javascript
     * // Automatic detection
     * WPP.chat.sendTextMessage('[number]@c.us', 'See https://www.youtube.com/watch?v=v1PBptSDIh8');
     *
     * // Overriding the title and description
     * WPP.chat.sendTextMessage('[number]@c.us', 'See https://www.youtube.com/watch?v=v1PBptSDIh8', {
     *   linkPreview: {
     *     title: 'Another text',
     *     description: 'Another description'
     *   }
     * });
     * ```
     */
    linkPreview?: boolean | {
        title?: string;
        description?: string;
        canonicalUrl?: string;
        matchedText?: string;
        richPreviewType?: number;
        thumbnail?: string;
        doNotPlayInline: boolean;
    };
}
/**
 * Prepare a message for link preview
 *
 * @category Message
 * @internal
 */
export declare function prepareLinkPreview<T extends RawMessage>(message: T, options: LinkPreviewOptions): Promise<T>;
