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

import { ModelPropertiesContructor, MsgModel } from '../whatsapp';

export interface ChatEventTypes {
  change: string;
  idle: undefined;
}

export interface SendMessageOptions {
  waitForAck?: boolean;
  createChat?: boolean;
}

export interface MessageButtonsOptions {
  buttons?: Array<{
    id: string;
    text: string;
  }>;
  title?: string;
  footer?: string;
}

export interface ListMessageOptions extends SendMessageOptions {
  buttonText: string;
  description: string;
  sections: Array<{
    title: string;
    rows: Array<{
      rowId: string;
      title: string;
      description: string;
    }>;
  }>;
}

export type TextMessageOptions = SendMessageOptions & MessageButtonsOptions;

export type AllMessageOptions = SendMessageOptions &
  MessageButtonsOptions &
  Partial<ListMessageOptions>;

export type RawMessage = ModelPropertiesContructor<MsgModel>;
