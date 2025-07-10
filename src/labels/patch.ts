/*!
 * Copyright 2025 WPPConnect Team
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

import { ChatStore, LabelModel } from '../whatsapp';

// Fix for an error that included archived chats in the total count
// Archived chats should not be counted since they do not appear in WhatsApp
export function patchLabelCount(label: LabelModel): number {
  let count = 0;
  for (const item of (label as any).labelItemCollection._models) {
    if (item.parentType !== 'Chat') continue;

    const chat = ChatStore.get(item.parentId);
    if (!chat?.archive) count += 1;
  }
  return count;
}
