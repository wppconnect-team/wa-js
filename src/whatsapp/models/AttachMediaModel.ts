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

import { exportProxyModel } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id?: any;
  file?: any;
  uiProcessed?: any;
  fileOrigin?: any;
  isVcardOverMmsDocument: boolean;
}

interface Session {
  stale?: any;
  state?: any;
  mediaPrep?: any;
  mimetype?: any;
  originalMimetype?: any;
  processPromise?: any;
  exception?: any;
  caption?: any;
  type?: any;
  mediaEditorData?: any;
  editedFile?: any;
  preview?: any;
  fullPreview?: any;
  fullPreviewSize?: any;
  filename?: any;
  documentPageCount?: any;
  isGif: boolean;
  gifAttribution?: any;
}

interface Derived {
  previewable?: any;
  filesize?: any;
  fileExt?: any;
}

/** @whatsapp undefined:73754 */
export declare interface AttachMediaModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp undefined:73754 */
export declare class AttachMediaModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<AttachMediaModel>,
    options?: ModelOptions
  );
  processAttachment(e?: any): any;
  sendToChat(e?: any, t?: any): any;
  getFileType(): any;
  isViewableOnce(): boolean;
  updateMediaEditorData(e?: any, t?: any): any;
  undoMediaEditorData(): any;
  redoMediaEditorData(): any;
  canUndoMediaEditorData(): boolean;
  canRedoMediaEditorData(): boolean;
  updateEditedFile(e?: any): any;
  updatePreview(e?: any): any;
  updateFullPreview(e?: any): any;
  updateCaption(e?: any): any;
}

exportProxyModel(exports, 'AttachMediaModel');
