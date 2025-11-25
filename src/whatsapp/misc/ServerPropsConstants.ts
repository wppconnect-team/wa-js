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

import { injectFallbackModule } from '../../webpack';
import { exportModule } from '../exportModule';
import { ServerProps } from './ServerProps';

/**
 * @whatsapp WAWebServerPropConstants
 */

interface ServerPropsModel {
  MMS_VCARD_AUTODOWNLOAD_SIZE_KB: number;
  VCARD_AS_DOCUMENT_SIZE_KB: number;
  VCARD_MAX_SIZE_KB: number;
  MULTICAST_LIMIT_GLOBAL: number;
  PTT_PLAYBACK_SPEED_HIDE_DELAY: number;
  DEFAULT_MAX_FILE_SIZE_BYTES: number;
  MAX_FILE_SIZE_BYTES: number;
  UNINITIALIZED_VALUE_WEB_BIZ_PROFILE_OPTIONS: number;
}

export declare const ServerPropsConstants: ServerPropsModel;

exportModule(exports, 'ServerPropsConstants', (m) => m.MAX_FILE_SIZE_BYTES);

injectFallbackModule('ServerPropsConstants', {
  MMS_VCARD_AUTODOWNLOAD_SIZE_KB: 64,
  VCARD_AS_DOCUMENT_SIZE_KB: 64,
  VCARD_MAX_SIZE_KB: 5000,
  MULTICAST_LIMIT_GLOBAL: ServerProps?.frequentlyForwardedMax || 5,
  PTT_PLAYBACK_SPEED_HIDE_DELAY: 1500,
  DEFAULT_MAX_FILE_SIZE_BYTES: 100 * 1024 * 1024,
  MAX_FILE_SIZE_BYTES: ServerProps?.maxFileSize || 100 * 1024 * 1024,
  UNINITIALIZED_VALUE_WEB_BIZ_PROFILE_OPTIONS: 3,
});
