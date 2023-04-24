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

import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { WPPError } from '../../util';
import { Limits } from '../../whatsapp';
import { numPinned } from '../../whatsapp/functions';
import * as webpack from '../../webpack';

/**
 * Change limits
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

let unlimitedPin: undefined | boolean = undefined;
let maxFileSize: undefined | number = undefined;

webpack.onInjected(() => {

  wrapModuleFunction(numPinned, (func,...args) => {
    const numPinnedOriginal = func(...args);
    return unlimitedPin ? 1 : numPinnedOriginal
  });

});

export function setLimit(key: string, value: boolean | number): any {
  switch (key) {

    case "maxMediaSize": {
      if (typeof value !== 'number' || value > 73400320) {
        throw new WPPError(
          `maxMediaSize_error`,
          typeof value !== 'number' ? `Value type invalid!` : `Maximum value is 70MB`
        );
      }
      Limits.media = value;
      return Limits.media;
    }

    case "maxFileSize": {
      if (typeof value !== 'number' || (value > 1073741824)) {
        throw new WPPError(
          `maxFileSize_error`,
          typeof value !== 'number' ? `Value type invalid!`: `Maximum value is 1GB`
        );
      }

      Limits.maxFileSize = value
      return value
    }

    case "maxShare": {
      if (typeof value !== 'number') {
        throw new WPPError(
          `maxShare_error`,
          `Value type invalid!`
        );
      }
      Limits.multicastLimitGlobal = value;
      Limits.frequentlyForwardedMax = value;
      Limits.frequentlyForwardedThreshold = value;
      return Limits.multicastLimitGlobal;
    }

    case "statusVideoMaxDuration": {
      if (typeof value !== 'number') {
        throw new WPPError(
          `statusVideoMaxDuration_error`,
          `Value type invalid!`
        );
      }
      Limits.statusVideoMaxDuration = value;
      return Limits.statusVideoMaxDuration;
    }

    case "unlimitedPin": {
      if (typeof value !== 'boolean') {
        throw new WPPError(
          `unlimitedPin_error`,
          `Value type invalid!`
        );
      }

      value ? unlimitedPin = value : unlimitedPin = undefined;
      return value
    }

    default: {
      throw new WPPError(
        `setLimit_error`,
        `Key type invalid!`
      );
    }

  }

}


