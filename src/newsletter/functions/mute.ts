/*!
 * Copyright 2023 WPPConnect Team
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

import { WPPError } from '../../util';
import { ChatModel, NewsletterStore } from '../../whatsapp';
import { CHANNEL_EVENT_SURFACE } from '../../whatsapp/enums';
import {
  muteNewsletter,
  toggleNewsletterAdminActivityMuteStateAction,
  unmuteNewsletter,
} from '../../whatsapp/functions';
import { ensureNewsletter } from './ensureNewsletter';

const NEWSLETTER_MUTED_STATE = -1;
const NEWSLETTER_UNMUTED_STATE = 0;

/**
 * Mute and unmute a newsletter
 *
 * @example
 * // Mute
 * ```javascript
 * WPP.newsletter.mute('[newsletter-id]@newsletter', true);
 * ```
 *
 * // Unmute
 * ```javascript
 * WPP.newsletter.mute('[newsletter-id]@newsletter', false);
 * ```
 *
 * @category Newsletter
 */
export async function mute(
  newsletterId: string,
  value?: boolean
): Promise<ChatModel> {
  const chat = await ensureNewsletter(newsletterId);

  if (value != null && typeof value !== 'boolean') {
    throw new WPPError('invalid_mute_value', 'Mute value must be boolean');
  }

  const eventSurface = CHANNEL_EVENT_SURFACE?.CHANNEL_UPDATES_HOME ?? 1;
  const muteExpirationValue =
    value === false ? NEWSLETTER_UNMUTED_STATE : NEWSLETTER_MUTED_STATE;

  if (toggleNewsletterAdminActivityMuteStateAction) {
    await toggleNewsletterAdminActivityMuteStateAction(
      chat.id,
      muteExpirationValue,
      { eventSurface }
    );
  } else if (value === false) {
    await unmuteNewsletter([newsletterId]);
  } else {
    await muteNewsletter([newsletterId]);
  }

  return NewsletterStore.get(newsletterId) as ChatModel;
}
