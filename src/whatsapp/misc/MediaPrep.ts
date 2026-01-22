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
  ChatModel,
  MediaDataModel,
  ModelPropertiesContructor,
  MsgModel,
} from '..';
import { OUTWARD_TYPES } from '../enums';
import { exportModule } from '../exportModule';
import { SendMsgResultObject } from '../types';
import { OpaqueData } from '.';

/**
 * @whatsapp >= 2.3000.1032022795
 */
export declare namespace MediaPrep {
  function prepRawMedia(
    data: OpaqueData,
    options: {
      isPtt?: boolean;
      asDocument?: boolean;
      asGif?: boolean;
      isAudio?: boolean;
      asSticker?: boolean;
      asStickerPack?: boolean;
      maxDimension?: number;
      minDimension?: number;
      transparency?: any;
      isVcardOverMmsDocument?: boolean;
      filename?: string;
      documentPageCount?: number;
    }
  ): MediaPrep;

  class MediaPrep {
    constructor(type: OUTWARD_TYPES, p: any);

    sendToChat(
      e: ChatModel,
      options: {
        caption?: string;
        footer?: string;
        quotedMsg?: MsgModel;
        productMsgOptions?: ModelPropertiesContructor<MsgModel>;
        type?: null | string;
        mentionedJidList?: any;
        groupMentions?: any;
        isForwarded?: boolean;
        forwardingScore?: any;
        multicast?: any;
        forwardedFromWeb?: boolean;
        forwardedNewsletterMessageInfo?: any;
        ctwaContext?: any;
        isViewOnce?: boolean;
        isAvatar?: boolean;
        viewMode?: any;
        parentMsgKey?: any;
        associationType?: any;
        isQuestion?: boolean;
        questionReplyQuotedMessage?: any;
        addEvenWhilePreparing?: boolean;
        placeholderProps?: any;
        useBasePropsType?: boolean;
        isWamoSub?: boolean;
      },
      earlyUpload?: any // This is effectively Promise<UploadResult> (used mainly for ptt audios)
    ): Promise<SendMsgResultObject>;
    waitForPrep(): Promise<MediaDataModel>;
  }
}

exportModule(exports, 'MediaPrep', (m) => m.uploadProductImage && m.MediaPrep);
