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

import { WPPError } from '../../util';
import * as webpack from '../../webpack';
import { ServerProps } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { getNumChatsPinned } from '../../whatsapp/functions';

let unlimitedPin: undefined | boolean = undefined;

webpack.onFullReady(() => {
  wrapModuleFunction(getNumChatsPinned, (func, ...args) => {
    const getNumChatsPinnedOriginal = func(...args);
    return unlimitedPin ? 1 : getNumChatsPinnedOriginal;
  });
});

/**
 * Change the limit of MediaSize
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading media (max 70MB)
 *  WPP.conn.setLimit('maxMediaSize',16777216);
 * ```
 */
export function setLimit(key: 'maxMediaSize', value: number): number;
/**
 * Change the limit of FileSize
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading files (max 1GB)
 *  WPP.conn.setLimit('maxFileSize',104857600);
 * ```
 */
export function setLimit(key: 'maxFileSize', value: number): number;
/**
 * Change the limit of Share
 *
 * @example
 * ```javascript
 *  //Change the maximum number of contacts that can be selected when sharing (Default 5)
 *  WPP.conn.setLimit('maxShare',100);
 * ```
 */
export function setLimit(key: 'maxShare', value: number): number;
/**
 * Change the limit of Status Video Duration
 *
 * @example
 * ```javascript
 *  //Change the maximum time (seconds) of a video status
 *  WPP.conn.setLimit('statusVideoMaxDuration',120);
 * ```
 */
export function setLimit(key: 'statusVideoMaxDuration', value: number): number;
/**
 * Change the limit of Pin
 *
 * @example
 * ```javascript
 *  //Remove pinned conversation limit (only whatsapp web) (Default 3)
 *  WPP.conn.setLimit('unlimitedPin',true);
 * ```
 */
export function setLimit(key: 'unlimitedPin', value: boolean): boolean;
/**
 * Change the limits
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading media (max 70MB)
 *  WPP.conn.setLimit('maxMediaSize',16777216);
 *
 *  //Change the maximum size (bytes) for uploading files (max 1GB)
 *  WPP.conn.setLimit('maxFileSize',104857600);
 *
 *  //Change the maximum number of contacts that can be selected when sharing (Default 5)
 *  WPP.conn.setLimit('maxShare',100);
 *
 *  //Change the maximum time (seconds) of a video status
 *  WPP.conn.setLimit('statusVideoMaxDuration',120);
 *
 *  //Remove pinned conversation limit (only whatsapp web) (Default 3)
 *  WPP.conn.setLimit('unlimitedPin',true);
 * ```
 */
export function setLimit(key: string, value: boolean | number): any {
  switch (key) {
    case 'maxMediaSize': {
      if (typeof value !== 'number' || value > 73400320) {
        throw new WPPError(
          `maxMediaSize_error`,
          typeof value !== 'number'
            ? `Value type invalid!`
            : `Maximum value is 70MB`
        );
      }
      ServerProps.media = value;
      return ServerProps.media;
    }

    case 'maxFileSize': {
      if (typeof value !== 'number' || value > 1073741824) {
        throw new WPPError(
          `maxFileSize_error`,
          typeof value !== 'number'
            ? `Value type invalid!`
            : `Maximum value is 1GB`
        );
      }
      ServerProps.maxFileSize = value;
      return ServerProps.maxFileSize;
    }

    case 'maxShare': {
      if (typeof value !== 'number') {
        throw new WPPError(`maxShare_error`, `Value type invalid!`);
      }
      ServerProps.multicastLimitGlobal = value;
      ServerProps.frequentlyForwardedMax = value;
      ServerProps.frequentlyForwardedThreshold = value;
      return ServerProps.multicastLimitGlobal;
    }

    case 'statusVideoMaxDuration': {
      if (typeof value !== 'number') {
        throw new WPPError(
          `statusVideoMaxDuration_error`,
          `Value type invalid!`
        );
      }
      ServerProps.statusVideoMaxDuration = value;
      return ServerProps.statusVideoMaxDuration;
    }

    case 'unlimitedPin': {
      if (typeof value !== 'boolean') {
        throw new WPPError(`unlimitedPin_error`, `Value type invalid!`);
      }
      value ? (unlimitedPin = value) : (unlimitedPin = undefined);
      return value;
    }

    default: {
      throw new WPPError(`setLimit_error`, `Key type invalid!`);
    }
  }
}
