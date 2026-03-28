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

import { WPPError } from '../../util';
import { GROUP_SETTING_TYPE } from '../../whatsapp/enums';
import { sendSetGroupProperty } from '../../whatsapp/functions';
import { ensureGroup } from './';

export enum GroupProperty {
  ANNOUNCEMENT = 'announcement',
  EPHEMERAL = 'ephemeral',
  RESTRICT = 'restrict',
}

const groupSetPropertySchema = z.object({
  groupId: z.string(),
  property: z.enum(GroupProperty),
  value: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(86400),
    z.literal(604800),
    z.literal(7776000),
    z.boolean(),
  ]),
});

export type GroupSetPropertyInput = z.infer<typeof groupSetPropertySchema>;
export type GroupSetPropertyOutput = true;

/**
 * Set the group property
 *
 * @example
 * ```javascript
 * // Only admins can send message
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'announcement', value: true });
 *
 * // All can send message
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'announcement', value: false });
 *
 * // Disatble temporary messages
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'ephemeral', value: 0 });
 *
 * // Enable temporary messages for 24 hours
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'ephemeral', value: 86400 });
 *
 * // Enable temporary messages for 7 days
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'ephemeral', value: 604800 });
 *
 * // Enable temporary messages for 90 days
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'ephemeral', value: 7776000 });
 *
 * // Only admins can edit group properties
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'restrict', value: true });
 *
 * // All can edit group properties
 * await WPP.group.setProperty({ groupId: '[group-id]@g.us', property: 'restrict', value: false });
 * ```
 *
 * @category Group
 */
export async function setProperty(
  params: GroupSetPropertyInput
): Promise<GroupSetPropertyOutput> {
  const { groupId, property, value } = groupSetPropertySchema.parse(params);
  const groupChat = await ensureGroup({ groupId });

  let propertyValue = value;

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
      propertyValue = 604800;
    }

    // If the value is different from those allowed
    if (![0, 86400, 604800, 7776000].includes(propertyValue as number)) {
      throw new WPPError(
        'invalid_ephemeral_duration',
        'Invalid ephemeral duration',
        {
          value: propertyValue,
        }
      );
    }
  } else {
    // MD uses number
    propertyValue = propertyValue ? 1 : 0;
  }

  await sendSetGroupProperty(
    groupChat.id,
    property as unknown as GROUP_SETTING_TYPE,
    propertyValue as number
  );

  return true;
}
