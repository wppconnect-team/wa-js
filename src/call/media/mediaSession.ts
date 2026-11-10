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

import Debug from 'debug';

import { CallStore } from '../../whatsapp';

interface MediaSession {
  id?: string;
  provisionalId?: string;
  observedActive: boolean;
  cleanups: Set<() => void>;
}

let session: MediaSession | undefined;

/** Audio is armed for the active call, or exactly one future call. */
export function armMediaSession(): MediaSession {
  if (session) isMediaSessionCurrent(session);
  return (session ||= {
    id: (CallStore as any)?.activeCall?.id,
    observedActive: !!(CallStore as any)?.activeCall?.id,
    cleanups: new Set(),
  });
}

export function finishMediaSession(target = session): void {
  if (!target || target !== session) return;
  session = undefined;
  for (const cleanup of [...target.cleanups]) {
    try {
      cleanup();
    } catch (error) {
      Debug('WA-JS:call:mediaSession')('audio cleanup failed', error);
    }
  }
  target.cleanups.clear();
}

export function onMediaSessionEnd(
  target: MediaSession,
  cleanup: () => void
): () => void {
  if (target !== session) {
    cleanup();
    return () => undefined;
  }
  target.cleanups.add(cleanup);
  return () => target.cleanups.delete(cleanup);
}

export function isMediaSessionCurrent(target: MediaSession): boolean {
  if (target !== session) return false;
  const id = (CallStore as any)?.activeCall?.id;
  if (target.provisionalId && id === target.provisionalId) return true;
  if (id && id === target.id) target.observedActive = true;
  if (!id && target.observedActive) {
    finishMediaSession(target);
    return false;
  }
  if (!target.id) target.id = id;
  else if (id && target.id !== id) finishMediaSession(target);
  return target === session;
}

export function currentMediaSession(): MediaSession | undefined {
  return session && isMediaSessionCurrent(session) ? session : undefined;
}

/** Run synchronously at the native state boundary, before deferred events. */
export function updateMediaSession(id: string, ended = false): void {
  if (!session) return;
  if (id === session.provisionalId) {
    if (ended) finishMediaSession();
    return;
  }
  if (ended) {
    if (session.id === id) finishMediaSession();
  } else if (!session.id) session.id = id;
  else if (session.id !== id) finishMediaSession();
}

/** Call links temporarily use their token as the active model id. */
export function setMediaSessionProvisionalId(id: string): void {
  if (session && !session.id) session.provisionalId = id;
}

/** Dispose every owned resource even if another has already become invalid. */
export function disposeMediaResource(dispose: () => unknown): void {
  try {
    dispose();
  } catch (error) {
    Debug('WA-JS:call:mediaSession')('audio resource cleanup failed', error);
  }
}
