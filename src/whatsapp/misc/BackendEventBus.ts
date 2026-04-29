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
import { EventEmitter } from './EventEmitter';

/** @whatsapp WAWebBackendEventBusTypes.flow */
export declare const BackendEvent: {
  readonly APP_STATE_SYNC_COMPLETED: 'app_state_sync_completed';
  readonly LOGOUT: 'logout';
  readonly REFRESH_QR: 'refresh_qr';
  readonly STARTING_LOGOUT: 'starting_logout';
  readonly ON_INITIAL_CHAT_SYNCED: 'on_initial_chat_synced';
  readonly ON_RECENT_CHAT_HISTORY_SYNCED: 'on_recent_chat_history_synced';
  readonly ON_FULL_CHAT_HISTORY_SYNCED: 'on_full_chat_history_synced';
  readonly ON_CRITICAL_SYNC_DONE: 'on_critical_sync_done';
  readonly NEW_HISTORY_SYNC_CHUNK_PROCESSED: 'new_history_sync_chunk_processed';
  readonly STORAGE_INITIALIZATION_ERROR: 'storage_initialization_error';
  readonly SOCKET_STREAM_DISCONNECTED: 'socket_stream_disconnected';
  readonly OPEN_SOCKET_STREAM: 'open_socket_stream';
  readonly RECONNECT_SOCKET: 'reconnect_socket';
  readonly SET_SOCKET_STATE: 'set_socket_state';
  readonly UPDATE_STATUS_PRIVACY_SETTINGS: 'update_status_privacy_settings';
  readonly ACCOUNT_TEMPORARILY_BANNED: 'account_temporarily_banned';
  readonly ACCOUNT_SYNC_FOR_PRIVACY: 'account_sync_for_privacy';
  readonly UNEXPECTED_LOGOUT_MODAL: 'unexpected_logout_modal';
  readonly INITIAL_LOAD_READY: 'initial_load_ready';
  readonly MAIN_STREAM_MODE_READY: 'main_stream_mode_ready';
  readonly SERVICE_UNAVAILABLE_503: 'service_unavailable_503';
  readonly OFFLINE_PROCESS_READY: 'offline_process_ready';
  readonly OFFLINE_DELIVERY_END: 'offline_delivery_end';
  readonly OFFLINE_DELIVERY_STATE_RESET: 'offline_delivery_state_reset';
  readonly ON_AB_PROPS_UPDATE: 'on_ab_props_update';
  readonly AB_PROPS_LOADED: 'ab_props_loaded';
};

export type BackendEventName = (typeof BackendEvent)[keyof typeof BackendEvent];

/** @whatsapp WAWebBackendEventBus */
export declare class BackendEventBusClass extends EventEmitter {
  isMainStreamReadyMd: boolean;
  isOfflineDeliveryEnd: boolean;

  onStorageInitializationError(handler: () => void): this;
  triggerStorageInitializationError(error?: any): void;
}

/** @whatsapp WAWebBackendEventBus */
export declare const BackendEventBus: BackendEventBusClass;

exportModule(
  exports,
  {
    BackendEvent: 'BackendEvent',
    BackendEventBus: 'BackendEventBus',
  },
  (m) => m.BackendEventBus && m.BackendEvent
);
