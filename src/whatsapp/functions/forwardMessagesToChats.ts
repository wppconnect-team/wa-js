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

import { exportModule } from '../exportModule';
import { ChatModel, MsgModel } from '../models';

/** @whatsapp 69951
 * @whatsapp 450192 >= 2.2353.0
 */
export declare function forwardMessagesToChats(
  msgs: MsgModel[],
  chats: ChatModel[],
  displayCaptionText?: boolean
): Promise<boolean>;

/**
 * `WAWebForwardMessagesToChat` ships in a bundle WhatsApp only fetches on
 * demand, so this misses until `ensureLazyModule()` loads it (see
 * `src/loader/lazyModules.ts`). There used to be a fallback here delegating to
 * `ChatStore.forwardMessagesToChats` (#1535, WA ~2.2350); the Chat collection
 * dropped that method on WA >= 2.3000, so the fallback only served to claim the
 * name while the bundle was still absent — and `exportModule` then pinned the
 * binding to it for the rest of the page.
 */
exportModule(
  exports,
  { forwardMessagesToChats: 'forwardMessagesToChats' },
  (m) => m.forwardMessagesToChats
);
