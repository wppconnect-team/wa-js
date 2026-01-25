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

import { assertWid } from '../../assert';
import { ChatModel, ChatStore, MsgModel, Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';

export interface ReportContactResult {
  wid: Wid;
  reportId?: string;
  errorCode?: number;
  errorText?: string;
}

/**
 * Report a contact or chat to WhatsApp
 *
 * This function allows you to report contacts for spam, inappropriate behavior, or other violations.
 *
 * Available spam flow types:
 * - 'ChatInfoReport' (default) - Report from chat info screen
 * - 'MessageMenu' - Report from message menu
 * - 'GroupInfoReport' - Report from group info screen
 * - 'ChatFmxCardSafetyToolsReport' - Report from safety tools (trusted)
 * - 'ChatFmxCardSafetyToolsReportSuspicious' - Report suspicious contact
 * - 'GroupInfoLeaveReportUpsell' - Report when leaving group
 *
 * @example
 * ```javascript
 * // Basic contact report
 * const result = await WPP.contact.reportContact('5511999999999@c.us');
 * console.log('Report ID:', result.reportId);
 * ```
 *
 * @example
 * ```javascript
 * // Report with specific type
 * await WPP.contact.reportContact('5511999999999@c.us', 'ChatFmxCardSafetyToolsReportSuspicious');
 * ```
 *
 * @example
 * ```javascript
 * // Report specific message
 * const msg = await WPP.chat.getMessageById('msgId');
 * await WPP.contact.reportContact('5511999999999@c.us', 'MessageMenu', msg);
 * ```
 *
 * @category Contact
 * @param contactId - Contact ID or Wid to report
 * @param spamFlow - Optional spam flow type (default: 'ChatInfoReport')
 * @param msg - Optional specific message to report
 * @returns Promise with report result containing reportId or error details
 */
export async function reportContact(
  contactId: string | Wid,
  spamFlow: string = 'ChatInfoReport',
  msg?: MsgModel
): Promise<ReportContactResult> {
  const wid = assertWid(contactId);

  const chat = ChatStore.get(wid) || new ChatModel({ id: wid });

  const response = await wa_functions.reportSpam(chat, spamFlow, msg);

  return {
    wid,
    reportId: response.reportIdMixin?.reportId,
    errorCode: response.errorCode,
    errorText: response.errorText,
  };
}
