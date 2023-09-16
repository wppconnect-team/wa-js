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
  LinkPreviewOptions,
  MessageButtonsOptions,
  SendMessageOptions,
} from '.';
import { ListMessageOptions } from './functions/sendListMessage';

export type AllMessageOptions = SendMessageOptions &
  LinkPreviewOptions &
  MessageButtonsOptions &
  Partial<ListMessageOptions>;

export const defaultSendMessageOptions: AllMessageOptions = {
  createChat: false,
  detectMentioned: true,
  linkPreview: true,
  markIsRead: true,
  waitForAck: true,
  delay: 0,
};
