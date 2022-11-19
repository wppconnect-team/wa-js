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

import { Wid, WidFactory } from '../whatsapp';

export function createWid(
  id: string | { _serialized: string }
): Wid | undefined {
  if (!id) {
    return;
  }

  if (WidFactory.isWidlike(id)) {
    return WidFactory.createWidFromWidLike(id);
  }

  if (id && typeof id === 'object' && typeof id._serialized === 'object') {
    id = id._serialized;
  }

  if (typeof id !== 'string') {
    return undefined;
  }

  if (/^\d+$/.test(id)) {
    return WidFactory.createUserWid(id, 'c.us');
  }
  if (/^\d+-\d+$/.test(id)) {
    return WidFactory.createUserWid(id, 'g.us');
  }
  if (/status$/.test(id)) {
    return WidFactory.createUserWid(id, 'broadcast');
  }

  return WidFactory.createWid(id);
}
