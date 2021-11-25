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
import { OpaqueData } from '.';

/** @whatsapp 2.2146.9:78690 */
export declare class MediaObject {
  entries: any;
  downloadStage: any;
  uploadStage: any;
  userUploadAttemptCount: number;
  userDownloadAttemptCount: number;
  downloadPromise: null | Promise<null>;
  uploadPromise: null | Promise<null>;
  mediaBlob?: OpaqueData;
  size: any;
  filehash: any;
  contentInfo: any;
  progressiveStage: any;
  parsedVcards: any;

  consolidate(e: any): any;
  clearBlob(): void;
  contentFields(): any;
  resolveWhenConsolidated(): Promise<any>;
  notifyMsgsAsync(): void;
  addMsg(e: any): void;
  removeMsg(e: any): void;
  hasAssociatedMsgsOrStickers(): boolean;
  associatedMsgs(): any[];
  rmr(e: any): any;
  msgProps(e: any): any;
  delete(): void;
  runProcessIfNotRunBefore(e: any, t: any, r: any): void;
  getPendingProcess(e: any): Promise<any>;
  videoStreamingInfo(e: any): any;
  addStickerPack(e: any): void;
  addSticker(e: any): void;
  removeSticker(e: any): void;
  removeStickerPack(e: any): void;
  hasAssociatedStickers(): boolean;
  hasAssociatedStickerPacks(): boolean;
  associatedStickers(): any[];
  associatedStickerPacks(): any[];
  toJSON(): {
    mediaBlob: any;
    size: number;
    filehash: string;
    type: string;
    contentInfo: any;
    downloadStage: string;
    uploadStage: string;
  };
}

exportModule(
  exports,
  {
    MediaObject: (m) => m.default || m.MediaObject,
  },
  (m) => m.webMediaTypeToWamMediaType
);
