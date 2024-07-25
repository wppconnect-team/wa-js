/*!
 * Copyright 2024 WPPConnect Team
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

import { PrivacyDisallowedListType } from '../../enums';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { getPrivacyDisallowedListTable } from '../../whatsapp/functions';

export async function prepareDisallowedList(
  type: PrivacyDisallowedListType,
  value: any,
  list?: { id: string; action: 'add' | 'remove' }[]
): Promise<{
  ids: Wid[];
  dhash: number | null;
  idsFormatted: { wid: Wid; action: 'add' | 'remove' }[];
  allUsers: Wid[];
}> {
  if (value !== 'contact_blacklist') {
    return {
      ids: [],
      dhash: null,
      idsFormatted: [],
      allUsers: [],
    };
  }
  if (
    typeof type !== 'string' ||
    !Object.values(PrivacyDisallowedListType).includes(type)
  ) {
    throw new WPPError(
      'incorrect_type',
      `Incorrect type ${type || '<empty>'} for get disalowed list`,
      {
        type,
      }
    );
  }
  const actual = await getPrivacyDisallowedListTable().get(type);
  if (!list || list?.length === 0) {
    if (!actual) {
      throw new WPPError(
        'disallowed_list_is_mandatory',
        `Disallowed list is empty, please send disallowed list param`
      );
    }
    return {
      ids: actual!.disallowedList.map(
        (i) => new Wid(i, { intentionallyUsePrivateConstructor: true })
      ),
      dhash: actual.dhash,
      idsFormatted: [],
      allUsers: actual!.disallowedList.map(
        (i) => new Wid(i, { intentionallyUsePrivateConstructor: true })
      ),
    };
  } else if (actual == null) {
    list = list?.filter((i) => i.action !== 'remove');
    return {
      ids: list!.map(
        (i) => new Wid(i.id, { intentionallyUsePrivateConstructor: true })
      ),
      dhash: null,
      idsFormatted: list!.map((i) => {
        return {
          wid: new Wid(i.id, { intentionallyUsePrivateConstructor: true }),
          action: 'add',
        };
      }),
      allUsers: list!.map(
        (i) => new Wid(i.id, { intentionallyUsePrivateConstructor: true })
      ),
    };
  }
  const filtered = actual.disallowedList.filter(
    (i) => !list.some((item) => item.action === 'remove' && item.id === i)
  );
  const filteredList = list.filter((i) => i.action !== 'remove');

  const allUsers = ([] as Wid[]).concat(
    filteredList!.map(
      (i) => new Wid(i.id, { intentionallyUsePrivateConstructor: true })
    ),
    filtered.map(
      (i) => new Wid(i, { intentionallyUsePrivateConstructor: true })
    )
  );

  return {
    ids: list!.map(
      (i) => new Wid(i.id, { intentionallyUsePrivateConstructor: true })
    ),
    dhash: actual.dhash,
    idsFormatted: list!.map((i) => {
      return {
        wid: new Wid(i.id, { intentionallyUsePrivateConstructor: true }),
        action: i.action,
      };
    }),
    allUsers: allUsers,
  };
}
