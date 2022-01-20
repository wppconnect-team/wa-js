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

import * as collections from './collections';
import { exportModule } from './exportModule';

/** @whatsapp 15701 */
export declare const BlocklistStore: collections.BlocklistCollection;
/** @whatsapp 54100 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/** @whatsapp 8581 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/** @whatsapp 15971 */
export declare const CallStore: collections.CallCollection;
/** @whatsapp 25523 */
export declare const CartStore: collections.CartCollection;
/** @whatsapp 60028 */
export declare const CatalogStore: collections.CatalogCollection;
/** @whatsapp 84758 */
export declare const ChatStore: collections.ChatCollection;
/** @whatsapp 17025 */
export declare const ContactStore: collections.ContactCollection;
/** @whatsapp 41098 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/** @whatsapp 75798 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/** @whatsapp 59606 */
export declare const LabelStore: collections.LabelCollection;
/** @whatsapp 31104 */
export declare const LiveLocationStore: collections.LiveLocationCollection;
/** @whatsapp 45472 */
export declare const MsgStore: collections.MsgCollection;
/** @whatsapp 57636 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/** @whatsapp 80959 */
export declare const MuteStore: collections.MuteCollection;
/** @whatsapp 98052 */
export declare const OrderStore: collections.OrderCollection;
/** @whatsapp 48327 */
export declare const PresenceStore: collections.PresenceCollection;
/** @whatsapp 97038 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/** @whatsapp 3165 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/** @whatsapp 60123 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/** @whatsapp 30462 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/** @whatsapp 27686 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/** @whatsapp 30118 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/** @whatsapp 68477 */
export declare const StarredStickerStore: collections.StarredStickerCollection;
/** @whatsapp 22360 */
export declare const StatusStore: collections.StatusCollection;
/** @whatsapp 70173 */
export declare const StatusV3Store: collections.StatusV3Collection;
/** @whatsapp 16482 */
export declare const StickerStore: collections.StickerCollection;
/** @whatsapp 45822 */
export declare const StickerPackStore: collections.StickerPackCollection;
/** @whatsapp 6009 */
export declare const StickerSearchStore: collections.StickerSearchCollection;

const storeNames = [
  'BlocklistStore',
  'BusinessCategoriesResultStore',
  'BusinessProfileStore',
  'CallStore',
  'CartStore',
  'CatalogStore',
  'ChatStore',
  'ContactStore',
  'EmojiVariantStore',
  'GroupMetadataStore',
  'LabelStore',
  'LiveLocationStore',
  'MsgStore',
  'MsgInfoStore',
  'MuteStore',
  'OrderStore',
  'PresenceStore',
  'ProductMessageListStore',
  'ProfilePicThumbStore',
  'QuickReplyStore',
  'RecentEmojiStore',
  'StarredStickerStore',
  'StatusStore',
  'StatusV3Store',
  'StickerStore',
  'StickerSearchStore',
];

for (const name of storeNames) {
  const collectionName = name.replace('Store', 'Collection');
  exportModule(
    exports,
    {
      [name]: (m) => m.default || m[collectionName],
    },
    (m) =>
      (m.default || m[collectionName]) instanceof
      (collections as any)[collectionName]
  );
}

exportModule(
  exports,
  {
    RecentStickerStore: (m) => m.default || m.RecentStickerCollectionMd,
  },
  (m) => m.RecentStickerCollection
);

exportModule(
  exports,
  {
    StarredMsgStore: (m) => m.default || m.AllStarredMsgsCollection,
  },
  (m) => m.StarredMsgCollection
);

exportModule(
  exports,
  {
    StickerPackStore: (m) => m.default || m.StickerPackCollectionMd,
  },
  (m) => m.StickerPackCollection
);
