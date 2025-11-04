/*!
 * Copyright 2024 WPPConnect Team
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

import { queryExists } from '../../contact/functions';
import type { ChatModel, Wid } from '../../whatsapp';
import { ContactStore, functions } from '../../whatsapp';
import type { ContactModel } from '../../whatsapp/models';

type ResolvedLid = Wid | undefined;

const resolvedCache = new Map<string, ResolvedLid>();
const pendingResolutions = new Map<string, Promise<ResolvedLid>>();

function setContactLid(
  contact: ContactModel | undefined,
  lid: Wid | undefined
) {
  if (contact && lid && !contact.lid) {
    contact.lid = lid;
  }
}

async function resolveInternal(chatId: ChatModel['id']): Promise<ResolvedLid> {
  if (!chatId || chatId.isLid?.() || !chatId.isUser?.()) {
    return chatId?.isLid?.() ? (chatId as Wid) : undefined;
  }

  const cacheKey = chatId.toString();

  if (resolvedCache.has(cacheKey)) {
    return resolvedCache.get(cacheKey)!;
  }

  if (pendingResolutions.has(cacheKey)) {
    return pendingResolutions.get(cacheKey)!;
  }

  const promise = (async () => {
    const contact = ContactStore.get(chatId);
    if (contact?.lid?.isLid?.()) {
      resolvedCache.set(cacheKey, contact.lid);
      return contact.lid;
    }

    try {
      const current = functions.getCurrentLid?.(chatId);
      if (current?.isLid?.()) {
        setContactLid(contact, current);
        resolvedCache.set(cacheKey, current);
        return current;
      }
    } catch {
      // Ignore errors from patched getCurrentLid implementations
    }

    try {
      const exists = await queryExists(chatId);
      if (exists?.lid?.isLid?.()) {
        setContactLid(contact, exists.lid);
        resolvedCache.set(cacheKey, exists.lid);
        return exists.lid;
      }
    } catch {
      // Ignore network errors and fall through
    }

    resolvedCache.set(cacheKey, undefined);
    return undefined;
  })().finally(() => {
    pendingResolutions.delete(cacheKey);
  });

  pendingResolutions.set(cacheKey, promise);

  return promise;
}

/**
 * Resolve and cache the LID associated with a chat identifier.
 *
 * When available, the resolved LID is stored on the contact record to avoid
 * repeated lookups and to keep subsequent chat creations consistent.
 */
export async function resolveChatLid(
  chatId: ChatModel['id']
): Promise<ResolvedLid> {
  return await resolveInternal(chatId);
}

export function clearResolvedChatLid(chatId: ChatModel['id']) {
  const cacheKey = chatId?.toString();
  if (!cacheKey) {
    return;
  }

  resolvedCache.delete(cacheKey);
  pendingResolutions.delete(cacheKey);
}
