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

import { assertWid } from '../../assert';
import {
  ApiContact,
  ChatStore,
  ProfilePicThumbModel,
  ProfilePicThumbStore,
  Wid,
} from '../../whatsapp';
import { findOrCreateLatestChat } from '../../whatsapp/functions';

function extractPictureUrl(
  profilePic: ProfilePicThumbModel | null | undefined,
  full: boolean
): string | null {
  if (!profilePic) {
    return null;
  }

  if (full) {
    return (
      profilePic.eurl ||
      profilePic.imgFull ||
      profilePic.previewEurl ||
      profilePic.img ||
      null
    );
  }

  return (
    profilePic.previewEurl ||
    profilePic.img ||
    profilePic.eurl ||
    profilePic.imgFull ||
    null
  );
}

/**
 * Get profile picture url
 *
 * @example
 * ```javascript
 * const url = await WPP.contact.getProfilePictureUrl('[number]@c.us');
 * ```
 *
 * @category Contact
 */
export async function getProfilePictureUrl(
  contactId: string | Wid,
  full = true
): Promise<string | null> {
  const wid = assertWid(contactId);

  let targetWid = wid;
  let alternateWid: Wid | undefined;
  let isNotRegistered = false;

  if (wid.isUser()) {
    alternateWid =
      ApiContact?.getAlternateUserWid?.(wid) ||
      (wid.isLid()
        ? ApiContact?.getPhoneNumber?.(wid)
        : ApiContact?.getCurrentLid?.(wid));

    if (alternateWid && ChatStore.get(alternateWid)) {
      targetWid = alternateWid;
    } else if (!ChatStore.get(wid)) {
      try {
        const createdChat = await findOrCreateLatestChat(wid, 'createChat');
        if (createdChat?.chat?.id) {
          targetWid = createdChat.chat.id;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('No LID for user')) {
          isNotRegistered = true;
        } else if (alternateWid) {
          try {
            const createdAlternateChat = await findOrCreateLatestChat(
              alternateWid,
              'createChat'
            );
            if (createdAlternateChat?.chat?.id) {
              targetWid = createdAlternateChat.chat.id;
            }
          } catch (altError) {
            const altErrorMessage =
              altError instanceof Error ? altError.message : String(altError);
            if (altErrorMessage.includes('No LID for user')) {
              isNotRegistered = true;
            }
          }
        }
      }
    }
  }

  if (isNotRegistered) {
    console.warn(
      `[WPP.contact.getProfilePictureUrl] Contact ${wid.toString()} is not registered on WhatsApp.`
    );
    return null;
  }

  const candidateWids: Wid[] = [targetWid];

  if (
    alternateWid &&
    !candidateWids.some(
      (candidate) => candidate.toString() === alternateWid.toString()
    )
  ) {
    candidateWids.push(alternateWid);
  }

  if (
    !candidateWids.some((candidate) => candidate.toString() === wid.toString())
  ) {
    candidateWids.push(wid);
  }

  for (const currentWid of candidateWids) {
    const profilePic = await ProfilePicThumbStore.find(currentWid);
    let url = extractPictureUrl(profilePic, full);

    if (!url && profilePic && profilePic.tag && ProfilePicThumbStore.update) {
      try {
        const updatedProfilePic = await ProfilePicThumbStore.update(currentWid);
        url = extractPictureUrl(updatedProfilePic, full);
      } catch {}
    }

    if (url) {
      return url;
    }
  }

  if (
    wid.isUser() &&
    !ChatStore.get(targetWid) &&
    !ChatStore.get(wid) &&
    (!alternateWid || !ChatStore.get(alternateWid))
  ) {
    console.warn(
      `[WPP.contact.getProfilePictureUrl] Active chat not found for ${wid.toString()}; WhatsApp requires an active chat session or trusted contact token (tcToken) to fetch profile pictures.`
    );
  } else {
    console.warn(
      `[WPP.contact.getProfilePictureUrl] Profile picture not found for ${wid.toString()}; the contact may not have a profile picture set or privacy settings restrict access.`
    );
  }

  return null;
}
