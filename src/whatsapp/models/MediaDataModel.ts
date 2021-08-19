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

import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 23223
 * @whatsapp 2.2126.14
 */
interface Props {
  type?: any;
  directPath?: any;
  mediaKey?: any;
  mediaKeyTimestamp?: any;
  encFilehash?: any;
  mediaStage?: any;
  size?: any;
  filehash?: any;
  mimetype?: any;
  mediaBlob?: any;
  renderableUrl?: any;
  fullHeight?: any;
  fullWidth?: any;
  aspectRatio?: any;
  rgbaBuffer?: any;
  rgbaHeight?: any;
  rgbaWidth?: any;
  animationDuration?: any;
  animatedAsNewMsg?: any;
  isAnimated: boolean;
  singleLoopDuration?: any;
  firstFrameLength?: any;
  firstFrameSidecar?: any;
  emojis?: any;
  progressiveStage?: any;
  isViewOnce: boolean;
  preview?: any;
  sidecar?: any;
  duration?: any;
  durationFloat?: any;
  isGif: boolean;
  gifAttribution?: any;
  filename?: any;
  pageCount?: any;
  documentPreview?: any;
  isVcardOverMmsDocument: boolean;
  parsedVcards?: any;
  fullPreviewSize?: any;
  fullPreviewData?: any;
  subtype?: any;
}

/** @moduleID 23223
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
}

/** @moduleID 23223
 * @whatsapp 2.2126.14
 */
interface Derived {
  streamable?: any;
}

/** @moduleID 23223
 * @whatsapp 2.2126.14
 */
export declare interface MediaDataModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 23223
 * @whatsapp 2.2126.14
 */
export declare class MediaDataModel extends Model {
  static TYPE?: any;
  constructor(
    proterties?: ModelPropertiesContructor<MediaDataModel>,
    options?: ModelOptions
  );
  isStreamable(): boolean;
  listenToServiceWorkerSupport(): any;
  isStreamableType(): boolean;
  isDownloadable(): boolean;
}
