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
import { MediaEntry, OpaqueData } from '../misc';
export interface ThumbnailData {
    thumbnail: OpaqueData;
    mediaType: string;
    mediaKeyInfo: {
        key: string;
        timestamp: number;
    };
    uploadOrigin: number;
    forwardedFromWeb: boolean;
    signal?: AbortSignal;
    timeout: number;
    isViewOnce: boolean;
}
/**
 * @whatsapp 74460
 * @whatsapp 474460 >= 2.2222.8
 */
export declare function uploadThumbnail(data: ThumbnailData): Promise<{
    kind: string;
    mediaEntry: MediaEntry;
    filehash: string;
}>;
