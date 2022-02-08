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

import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { GROUP_SETTING_TYPE } from '../../whatsapp/enums';
import { sendSetGroupProperty } from '../../whatsapp/functions';
import { ensureGroup } from './';

export enum GroupProperty {
  ANNOUNCEMENT = 'announcement',
  EPHEMERAL = 'ephemeral',
  RESTRICT = 'restrict',
}

/**
 * Set the group property
 *
 * @example
 * ```javascript
 * // Only admins can send message
 * await WPP.group.setProperty('<group-id>@g.us', 'announcement', true);
 *
 * // All can send message
 * await WPP.group.setProperty('<group-id>@g.us', 'announcement', false);
 *
 * // Disatble temporary messages
 * await WPP.group.setProperty('<group-id>@g.us', 'ephemeral', 0);
 *
 * // Enable temporary messages for 24 hours
 * await WPP.group.setProperty('<group-id>@g.us', 'ephemeral', 86400);
 *
 * // Enable temporary messages for 7 days
 * await WPP.group.setProperty('<group-id>@g.us', 'ephemeral', 604800);
 *
 * // Enable temporary messages for 90 days
 * await WPP.group.setProperty('<group-id>@g.us', 'ephemeral', 7776000);
 *
 * // Only admins can edit group properties
 * await WPP.group.setProperty('<group-id>@g.us', 'restrict', true);
 *
 * // All can edit group properties
 * await WPP.group.setProperty('<group-id>@g.us', 'restrict', false);
 * ```
 *
 * @category Group
 */
export async function setProperty(
  groupId: string | Wid,
  property: GroupProperty,
  value: 0 | 1 | 86400 | 604800 | 7776000 | boolean
) {
  const groupChat = ensureGroup(groupId);

  if (
    property !== GroupProperty.ANNOUNCEMENT &&
    !groupChat.groupMetadata?.canSetGroupProperty()
  ) {
    throw new WPPError(
      'you_are_not_allowed_set_group_property',
      `You are not allowed to set property in ${groupChat.id._serialized}`,
      {
        groupId: groupChat.id.toString(),
      }
    );
  }

  if (
    property == GroupProperty.ANNOUNCEMENT &&
    !groupChat.groupMetadata?.canSetEphemeralSetting()
  ) {
    throw new WPPError(
      'you_are_not_allowed_set_ephemeral_setting',
      `You are not allowed to set ephemeral setting in ${groupChat.id._serialized}`,
      {
        groupId: groupChat.id.toString(),
      }
    );
  }

  if (property === GroupProperty.EPHEMERAL) {
    if (typeof value === 'boolean' || value === 1) {
      value = 604800;
    }

    if ([0, 86400, 604800, 7776000].includes(value)) {
      throw new WPPError(
        'invalid_ephemeral_duration',
        'Invalid ephemeral duration',
        {
          value,
        }
      );
    }
  } else {
    // MD uses number
    value = value ? 1 : 0;
  }

  await sendSetGroupProperty(
    groupChat.id,
    property as unknown as GROUP_SETTING_TYPE,
    value
  );

  return true;
}
