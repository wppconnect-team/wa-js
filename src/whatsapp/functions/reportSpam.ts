/*!
 * Copyright 2026 WPPConnect Team
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
import { ChatModel, MsgModel } from '../models';

export interface ReportSpamResponse {
  reportIdMixin?: {
    reportId: string;
  };
  errorCode?: number;
  errorText?: string;
}

/**
 * Report spam to WhatsApp
 *
 * @param chat - Chat or contact to report
 * @param spamFlow - Optional spam flow type (default: 'ChatInfoReport')
 * @param msg - Optional specific message to report
 * @returns Promise with report response
 *
 * @whatsapp WAWebReportSpamJob
 */
export declare function reportSpam(
  chat: ChatModel,
  spamFlow?: string,
  msg?: MsgModel
): Promise<ReportSpamResponse>;

exportModule(
  exports,
  {
    reportSpam: 'reportSpam',
  },
  (m) => m.reportSpam
);
