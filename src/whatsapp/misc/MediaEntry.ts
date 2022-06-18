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

/**
 * @whatsapp 80923
 * @whatsapp 480923 >= 2.2222.8
 */
export declare class MediaEntry {
  useBackupUrl: boolean;
  deprecatedMms3Url?: string;
  mediaKey: any;
  mediaKeyTimestamp: any;
  encFilehash: any;
  serverStatus: any;
  sidecar: any;
  directPath: any;
  firstFrameSidecar: any;
  type: any;
  scansSidecar: any;
  scanLengths: any;
  staticUrl: any;

  url(e: any): any;
  canReuseMediaKey(): void;
  markWhetherOnServer(e: any): any;
}

exportModule(
  exports,
  {
    MediaEntry: 'MediaEntry',
  },
  (m) => m.MediaEntry
);
