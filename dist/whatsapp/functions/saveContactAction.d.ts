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
/**
 * @whatsapp WAWebSaveContactAction >= 2.3000.0
 */
/**
 * @param user 5521980809090
 * @param userToDelete 5521980809090
 * @param name Contact Name
 * @param surname Contact Surname
 * @param syncToAddressbook Sync to Addressbook boolean
 */
export declare function saveContactAction(userToCreate: string, userToDelete: string | null, name?: any, surname?: any, syncToAddressbook?: boolean): Promise<undefined>;
