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

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { Cmd } from '../../whatsapp';
import { isAuthenticated } from '..';

loader.onInjected(register);

function register() {
  let isAuth: boolean;
  try {
    isAuth = isAuthenticated();
  } catch (error) {
    // Unknown state: load everything rather than lose the logged-in events
    loader.setLoggedIn();
    throw error;
  }

  // On the QR screen only the basic modules load; the logged-in ones wait
  // until the QR code is scanned
  if (isAuth) {
    loader.setLoggedIn();
  }

  let authFallback: ReturnType<typeof setInterval> | undefined;

  const trigger = () => {
    if (isAuth) return;

    isAuth = true;
    if (authFallback !== undefined) {
      clearInterval(authFallback);
      authFallback = undefined;
    }
    internalEv.emit('conn.authenticated');
    loader.setLoggedIn();
  };

  const startFallback = () => {
    if (isAuth || authFallback !== undefined) return;

    authFallback = setInterval(() => {
      let authenticated: boolean;
      try {
        authenticated = isAuthenticated();
      } catch {
        // The native auth binding can be unavailable during the transition.
        return;
      }
      if (authenticated) trigger();
    }, 1_000);
  };

  Cmd.on('main_loaded', trigger);
  Cmd.on('logout', () => {
    isAuth = false;
    startFallback();
  });

  if (Cmd.isMainLoaded) {
    trigger();
  } else {
    startFallback();
  }
}
