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

import { z } from 'zod';

import { assertWid } from '../../assert';
import { config } from '../../config';
import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import {
  ContactStore,
  functions,
  ParticipantModel,
  WidFactory,
} from '../../whatsapp';

const statusUpdateParticipantsSchema = z.object({
  ids: z.array(z.any()).nullish(),
});

export type StatusUpdateParticipantsInput = z.infer<
  typeof statusUpdateParticipantsSchema
>;

export type StatusUpdateParticipantsOutput = void;

/**
 * Define a custom list of participants to send the status message
 *
 * @example
 * ```javascript
 * // Use a custom list
 * await WPP.status.updateParticipants({ ids: ['[chatId]', '[chatId]'] });
 * // Use the contacts by default
 * await WPP.status.updateParticipants({ ids: null });
 * ```
 */
export async function updateParticipants(
  params: StatusUpdateParticipantsInput
): Promise<StatusUpdateParticipantsOutput> {
  let { ids } = statusUpdateParticipantsSchema.parse(params);
  let type = 'custom';

  const me = getMyUserWid();

  if (!ids || ids.length === 0) {
    ids = ContactStore.getModelsArray()
      .filter((c) => c.isMyContact && !c.isContactBlocked)
      .filter((c) => c.notifyName && !c.isMe)
      .filter((c) => !c.id.equals(me))
      .map((c) => c.id);

    type = 'contacts';
  }

  const wids = ids.map(assertWid).filter((c) => !c.equals(me));

  if (config.sendStatusToDevice) {
    wids.push(me);
  }

  const participants = wids.map(
    (id) =>
      new ParticipantModel({
        id,
        isAdmin: false,
        isSuperAdmin: false,
      })
  );

  const group = WidFactory.createWid('status@broadcast');

  await functions.updateParticipants({
    group,
    participants,
    version: Date.now(),
    isOffline: false,
  });

  localStorage.setItem('wpp-status-participants', type);
}
