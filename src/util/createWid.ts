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

function getWidFactory(): any {
  // Prefer the imported WidFactory but guard against circular/undefined imports.
  if (typeof WidFactory !== 'undefined' && WidFactory) return WidFactory as any;
  // Fallback to global (if some build attaches the factories there)
  if (typeof globalThis !== 'undefined' && (globalThis as any).WidFactory)
    return (globalThis as any).WidFactory;
  return undefined;
}

const createUserWidCompat: (
  user: string,
  server?: string
) => Wid | undefined = (user: string, server?: string) => {
  const factory = getWidFactory();
  if (!factory) return undefined;
  if (typeof factory.createUserWidOrThrow === 'function')
    return factory.createUserWidOrThrow(user, server);
  if (typeof factory.createUserWid === 'function')
    return factory.createUserWid(user, server);
  if (typeof factory.createWid === 'function')
    return factory.createWid(server ? `${user}@${server}` : user);
  return undefined;
};

export function createWid(
  id: string | { _serialized: string }
): Wid | undefined {
  if (!id) {
    return;
  }

  const factory = getWidFactory();
  if (factory && factory.isWidlike && factory.isWidlike(id)) {
    return factory.createWidFromWidLike(id);
  }

  if (id && typeof id === 'object' && typeof id._serialized === 'object') {
    id = id._serialized;
  }

  // If id is an object with _serialized string, extract it
  if (id && typeof id === 'object' && typeof id._serialized === 'string') {
    id = id._serialized;
  }

  if (typeof id !== 'string') {
    return undefined;
  }

  if (/@\w*lid\b/.test(id)) {
    return createUserWidCompat(id, 'lid');
  }
  if (/^\d+$/.test(id)) {
    return createUserWidCompat(id, 'c.us');
  }
  if (/^\d+-\d+$/.test(id)) {
    return createUserWidCompat(id, 'g.us');
  }
  if (/status$/.test(id)) {
    return createUserWidCompat(id, 'broadcast');
  }

  if (factory && typeof factory.createWid === 'function') {
    return factory.createWid(id);
  }

  return undefined;
}
