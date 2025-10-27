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
 * Get the video file duration
 * @see https://gist.github.com/Elements-/cf063254730cd754599e#gistcomment-3241210
 * @see https://gist.github.com/OllieJones/5ffb011fa3a11964154975582360391c
 */
export declare function getVideoInfoFromBuffer(arrayBuffer: ArrayBuffer): {
    duration: number;
    width: number;
    height: number;
};
