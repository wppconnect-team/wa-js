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

import { MsgKey } from '../misc';
import { ChatModel, MsgModel } from '../models';
import { getSearchContext } from './getSearchContext';

// WA >= 2.3000 changed getSearchContext to accept a single object instead of
// positional args. Detect the form by checking the function's parameter count.
export function callGetSearchContext(
  chat: ChatModel | string,
  msgKey: MsgModel | MsgKey | string
): ReturnType<typeof getSearchContext> {
  if (getSearchContext.length === 1) {
    return getSearchContext({ chat, msgKey });
  }
  return getSearchContext(chat, msgKey);
}
