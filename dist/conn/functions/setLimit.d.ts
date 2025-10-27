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
 * Change the limit of MediaSize
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading media (max 70MB)
 *  WPP.conn.setLimit('maxMediaSize',16777216);
 * ```
 * @deprecated
 */
export declare function setLimit(key: 'maxMediaSize', value: number): number;
/**
 * Change the limit of FileSize
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading files (max 1GB)
 *  WPP.conn.setLimit('maxFileSize',104857600);
 * ```
 */
export declare function setLimit(key: 'maxFileSize', value: number): number;
/**
 * Change the limit of Share
 *
 * @example
 * ```javascript
 *  //Change the maximum number of contacts that can be selected when sharing (Default 5)
 *  WPP.conn.setLimit('maxShare',100);
 * ```
 */
export declare function setLimit(key: 'maxShare', value: number): number;
/**
 * Change the limit of Status Video Duration
 *
 * @example
 * ```javascript
 *  //Change the maximum time (seconds) of a video status
 *  WPP.conn.setLimit('statusVideoMaxDuration',120);
 * ```
 * @deprecated
 */
export declare function setLimit(key: 'statusVideoMaxDuration', value: number): number;
/**
 * Change the limit of Pin
 *
 * @example
 * ```javascript
 *  //Remove pinned conversation limit (only whatsapp web) (Default 3)
 *  WPP.conn.setLimit('unlimitedPin',true);
 * ```
 */
export declare function setLimit(key: 'unlimitedPin', value: boolean): boolean;
