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

export type SendToChatProps = {
  chat: ChatModel;
  earlyUpload?: Promise<any>;
  options?: {
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
    addEvenWhilePreparing?: boolean;
  };
};

/** @whatsapp WAWebMediaPrep
 * @whatsapp 78986
 * @whatsapp 778986 >= 2.2222.8
 */
export declare class MediaPrep {
  constructor(type: OUTWARD_TYPES, p: any);

  sendToChat(params: SendToChatProps): Promise<SendMsgResultObject>;
  /**
   * @deprecated Use sendToChat(params: SendToChatProps) instead
   *
   * @param chat
   * @param params
   */
  sendToChat(
    chat: ChatModel,
    params: Omit<SendToChatProps, 'chat'>
  ): Promise<SendMsgResultObject>;

  waitForPrep(): Promise<MediaDataModel>;
}

// The class became the module's only (default) export in 2.3000.1050509545
// TODO: remove the old name when versions before 2.3000.1050509545 are no longer available in wa-version/html
exportModule(
  exports,
  { MediaPrep: ['MediaPrep', 'default'] },
  (m, id) =>
    id === 'WAWebMediaPrep' ||
    (m.MediaPrep && (m.getMediaPropsNew || m.sendMediaMsgToChat))
);
