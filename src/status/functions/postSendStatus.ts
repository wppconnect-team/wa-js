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

import { SendMessageReturn } from '../../chat';
import { MsgStore, StatusV3Store } from '../../whatsapp';

export function postSendStatus(result: SendMessageReturn): void {
  result.sendMsgResult.then(async () => {
    const msg = MsgStore.get(result.id);

    if (!msg) {
      return;
    }
    StatusV3Store.addStatusMessages(msg.author as any, [msg]);

    // Trigger screen update
    StatusV3Store.handleUpdate(msg.attributes, null, false);
    const myStatus = StatusV3Store.getMyStatus();

    if (myStatus) {
      // Fix models index
      myStatus.msgs.add(msg);
    }
  });
}
