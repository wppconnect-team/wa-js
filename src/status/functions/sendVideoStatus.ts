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

import { sendFileMessage } from '../../chat';
import { defaultSendStatusOptions } from '..';
import { SendStatusOptions } from './sendRawStatus';

export type VideoStatusOptions = SendStatusOptions;

/**
 * Send a video message to status stories
 *
 * @example
 * ```javascript
 * WPP.status.sendVideoStatus('data:video/mp4;base64,<a long base64 file...>');
 * ```
 */
export async function sendVideoStatus(
  content: any,
  options: VideoStatusOptions = {}
): Promise<any> {
  options = {
    ...defaultSendStatusOptions,
    ...options,
  };

  return sendFileMessage('status@broadcast', content, {
    ...options,
    createChat: true,
    type: 'video',
  });
}
