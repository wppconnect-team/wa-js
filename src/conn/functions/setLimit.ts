/*!
 * Copyright 2026 WPPConnect Team
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

import { z } from 'zod';

import { WPPError } from '../../util';
import * as webpack from '../../webpack';
import { ServerPropsConstants } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { getNumChatsPinned } from '../../whatsapp/functions';

let unlimitedPin: undefined | boolean = undefined;

webpack.onFullReady(() => {
  wrapModuleFunction(getNumChatsPinned, (func, ...args) => {
    const getNumChatsPinnedOriginal = func(...args);
    return unlimitedPin ? 1 : getNumChatsPinnedOriginal;
  });
});

const connSetLimitSchema = z.discriminatedUnion('key', [
  z.object({ key: z.literal('maxMediaSize'), value: z.number() }),
  z.object({ key: z.literal('maxFileSize'), value: z.number() }),
  z.object({ key: z.literal('maxShare'), value: z.number() }),
  z.object({ key: z.literal('statusVideoMaxDuration'), value: z.number() }),
  z.object({ key: z.literal('unlimitedPin'), value: z.boolean() }),
]);

export type ConnSetLimitInput = z.infer<typeof connSetLimitSchema>;

export type ConnSetLimitOutput = number | boolean | null;

/**
 * Change a limit
 *
 * @example
 * ```javascript
 *  //Change the maximum size (bytes) for uploading media (max 70MB)
 *  WPP.conn.setLimit({ key: 'maxMediaSize', value: 16777216 });
 *
 *  //Change the maximum size (bytes) for uploading files (max 1GB)
 *  WPP.conn.setLimit({ key: 'maxFileSize', value: 104857600 });
 *
 *  //Change the maximum number of contacts that can be selected when sharing (Default 5)
 *  WPP.conn.setLimit({ key: 'maxShare', value: 100 });
 *
 *  //Change the maximum time (seconds) of a video status
 *  WPP.conn.setLimit({ key: 'statusVideoMaxDuration', value: 120 });
 *
 *  //Remove pinned conversation limit (only whatsapp web) (Default 3)
 *  WPP.conn.setLimit({ key: 'unlimitedPin', value: true });
 * ```
 */
export function setLimit(params: ConnSetLimitInput): ConnSetLimitOutput {
  connSetLimitSchema.parse(params);
  switch (params.key) {
    case 'maxMediaSize': {
      if (params.value > 73400320) {
        throw new WPPError(`maxMediaSize_error`, `Maximum value is 70MB`);
      }
      //ServerProps.media = params.value;
      return null;
    }

    case 'maxFileSize': {
      if (params.value > 1073741824) {
        throw new WPPError(`maxFileSize_error`, `Maximum value is 1GB`);
      }
      ServerPropsConstants.MAX_FILE_SIZE_BYTES = params.value;
      return ServerPropsConstants.MAX_FILE_SIZE_BYTES;
    }

    case 'maxShare': {
      ServerPropsConstants.MULTICAST_LIMIT_GLOBAL = params.value;
      return ServerPropsConstants.MULTICAST_LIMIT_GLOBAL;
    }

    case 'statusVideoMaxDuration': {
      //ServerProps.statusVideoMaxDuration = params.value;
      return null;
    }

    case 'unlimitedPin': {
      unlimitedPin = params.value ? true : undefined;
      return params.value;
    }
  }
}
