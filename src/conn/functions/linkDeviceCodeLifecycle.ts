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

import { internalEv } from '../../eventEmitter';
import { LinkDeviceEvents } from '../../whatsapp';
import { genLinkDeviceCodeForPhoneNumber } from './genLinkDeviceCodeForPhoneNumber';

const LINK_CODE_TTL_MS = 3.25 * 60 * 1000;
const PRIMARY_HELLO_TTL_MS = 60 * 1000;
const MAX_AUTO_REFRESHES = 5;

interface LinkDeviceCodeState {
  code: string | null;
  epoch: number;
  inFlight: Promise<string> | null;
  phone: string | null;
  refreshCount: number;
  sendPushNotification: boolean;
  timer: ReturnType<typeof setTimeout> | null;
}

const state: LinkDeviceCodeState = {
  code: null,
  epoch: 0,
  inFlight: null,
  phone: null,
  refreshCount: 0,
  sendPushNotification: true,
  timer: null,
};

let listening = false;

function clearTimer() {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
}

function emitError(error: unknown) {
  internalEv.emit(
    'conn.link_code_error',
    error instanceof Error ? error : new Error(String(error))
  );
}

function scheduleRefresh(timeout = LINK_CODE_TTL_MS) {
  clearTimer();
  const epoch = state.epoch;

  state.timer = setTimeout(() => {
    if (epoch !== state.epoch || !state.phone) {
      return;
    }

    if (state.refreshCount >= MAX_AUTO_REFRESHES) {
      state.code = null;
      state.timer = null;
      internalEv.emit('conn.link_code_expired');
      return;
    }

    requestAutomaticRefresh();
  }, timeout);
}

function requestAutomaticRefresh() {
  if (!state.phone) {
    return;
  }

  if (state.refreshCount >= MAX_AUTO_REFRESHES) {
    onManualRefreshRequired();
    return;
  }

  state.refreshCount++;
  refreshLinkDeviceCode().catch(() => undefined);
}

function onRefreshRequested() {
  requestAutomaticRefresh();
}

function onManualRefreshRequired() {
  clearTimer();
  state.code = null;
  internalEv.emit('conn.link_code_expired');
}

function onPrimaryHelloReceived() {
  if (state.phone) {
    scheduleRefresh(PRIMARY_HELLO_TTL_MS);
  }
}

function onLinkingError() {
  clearTimer();
  state.code = null;
  emitError(new Error('WhatsApp Web reported an alternative linking error'));
}

function addInternalListeners() {
  if (listening) {
    return;
  }

  LinkDeviceEvents.on(
    'link_device_events:refresh_alt_linking_code',
    onRefreshRequested
  );
  LinkDeviceEvents.on(
    'link_device_events:force_manual_refresh',
    onManualRefreshRequired
  );
  LinkDeviceEvents.on(
    'link_device_events:primary_hello_received',
    onPrimaryHelloReceived
  );
  LinkDeviceEvents.on('link_device_events:error_alt_linking', onLinkingError);
  listening = true;
}

function removeInternalListeners() {
  if (!listening) {
    return;
  }

  LinkDeviceEvents.off(
    'link_device_events:refresh_alt_linking_code',
    onRefreshRequested
  );
  LinkDeviceEvents.off(
    'link_device_events:force_manual_refresh',
    onManualRefreshRequired
  );
  LinkDeviceEvents.off(
    'link_device_events:primary_hello_received',
    onPrimaryHelloReceived
  );
  LinkDeviceEvents.off('link_device_events:error_alt_linking', onLinkingError);
  listening = false;
}

async function generateLinkDeviceCode(): Promise<string> {
  if (!state.phone) {
    throw new Error('No phone linking flow is active');
  }

  if (state.inFlight) {
    return state.inFlight;
  }

  const epoch = state.epoch;
  const phone = state.phone;
  const sendPushNotification = state.sendPushNotification;

  const operation = genLinkDeviceCodeForPhoneNumber(
    phone,
    sendPushNotification
  ).then((code) => {
    if (epoch !== state.epoch) {
      return code;
    }

    state.code = code;
    scheduleRefresh();
    internalEv.emit('conn.link_code_change', code);
    return code;
  });

  state.inFlight = operation;

  try {
    return await operation;
  } finally {
    if (state.inFlight === operation) {
      state.inFlight = null;
    }
  }
}

/**
 * Start a managed phone-number linking flow.
 *
 * Unlike {@link genLinkDeviceCodeForPhoneNumber}, repeated calls for the same
 * phone number reuse the active code. New codes are emitted through
 * `conn.link_code_change` only when WhatsApp requests a refresh or the current
 * code expires.
 *
 * @category Conn
 */
export async function startLinkDeviceCodeForPhoneNumber(
  phone: string,
  sendPushNotification = true
): Promise<string> {
  if (state.phone === phone) {
    if (state.code) {
      return state.code;
    }
    if (state.inFlight) {
      return state.inFlight;
    }
  } else {
    cancelLinkDeviceCode();
  }

  state.phone = phone;
  state.sendPushNotification = sendPushNotification;
  state.refreshCount = 0;
  addInternalListeners();

  try {
    return await generateLinkDeviceCode();
  } catch (error) {
    state.code = null;
    emitError(error);
    throw error;
  }
}

/**
 * Explicitly refresh the code for the active phone-number linking flow.
 *
 * @category Conn
 */
export async function refreshLinkDeviceCode(): Promise<string> {
  if (!state.phone) {
    throw new Error('No phone linking flow is active');
  }

  if (state.inFlight) {
    await state.inFlight;
  }

  clearTimer();
  state.code = null;

  try {
    return await generateLinkDeviceCode();
  } catch (error) {
    emitError(error);
    throw error;
  }
}

/**
 * Cancel the active phone-number linking flow and release its listeners.
 *
 * @category Conn
 */
export function cancelLinkDeviceCode(): void {
  state.epoch++;
  clearTimer();
  removeInternalListeners();
  state.code = null;
  state.inFlight = null;
  state.phone = null;
  state.refreshCount = 0;
  state.sendPushNotification = true;
}

internalEv.on('conn.authenticated', cancelLinkDeviceCode);
internalEv.on('conn.logout', cancelLinkDeviceCode);
internalEv.on('conn.main_ready', cancelLinkDeviceCode);
