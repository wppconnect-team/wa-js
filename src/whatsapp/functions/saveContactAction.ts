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

import { exportModule } from '../exportModule';

/**
 * Save contact action (legacy positional parameters API)
 * @whatsapp WAWebSaveContactAction >= 2.3000.0
 * @deprecated Use saveContactActionV2 instead for versions >= 2.3000.1030209354
 * @whatsapp WAWebSaveContactAction >= 2.3000.0, < 2.3000.1030209354
 * @param user 5521980809090
 * @param userToDelete 5521980809090
 * @param e_fullName Contact Full Name
 * @param f_firstName Contact First Name
 * @param name Contact Name
 * @param surname Contact Surname
 * @param syncToAddressbook Sync to Addressbook boolean
 */
export declare function saveContactAction(
  userToCreate: string,
  userToDelete: string | null,
  e_fullName?: any,
  f_firstName?: any,
  name?: any,
  surname?: any,
  syncToAddressbook?: boolean
): Promise<undefined>;

/**
 * Object parameter interface for saveContactActionV2 (>= 2.3000.1030209354)
 */
export interface SaveContactActionParamsV2 {
  phoneNumber?: string | null;
  prevPhoneNumber?: string | null;
  lid?: string | null;
  username?: string | null;
  firstName: string;
  lastName: string;
  syncToAddressbook?: boolean;
}

/**
 * Save contact action (new object parameter API)
 * @whatsapp WAWebSaveContactAction >= 2.3000.1030209354
 * @param params Contact parameters object
 */
export declare function saveContactActionV2(
  params: SaveContactActionParamsV2
): Promise<undefined>;

exportModule(
  exports,
  {
    saveContactAction: 'saveContactAction',
    saveContactActionV2: 'saveContactAction',
  },
  (m) => m.saveContactAction
);
