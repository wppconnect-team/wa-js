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
import { OUTWARD_TYPES, SendMsgResult } from '../enums';
import { exportModule } from '../exportModule';
import { OpaqueData } from '.';

/** @whatsapp 78986
 * @whatsapp 778986 >= 2.2222.8
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
        isForwarded?: boolean;
        forwardingScore?: any;
        multicast?: any;
        forwardedFromWeb?: boolean;
        ctwaContext?: any;
        isViewOnce?: boolean;
      }
    ): Promise<SendMsgResult>;
    waitForPrep(): Promise<MediaDataModel>;
  }
}

exportModule(exports, 'MediaPrep', (m) => m.uploadProductImage && m.MediaPrep);
