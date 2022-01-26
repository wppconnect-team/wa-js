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

/** @whatsapp 48192 */
export declare const BlocklistStore: collections.BlocklistCollection;
/** @whatsapp 23420 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/** @whatsapp 45209 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/** @whatsapp 78230 */
export declare const CallStore: collections.CallCollection;
/** @whatsapp 93987 */
export declare const CartStore: collections.CartCollection;
/** @whatsapp 39985 */
export declare const CatalogStore: collections.CatalogCollection;
/** @whatsapp 91129 */
export declare const ChatStore: collections.ChatCollection;
/** @whatsapp 49798 */
export declare const ContactStore: collections.ContactCollection;
/** @whatsapp 96539 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/** @whatsapp 20029 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/** @whatsapp 79491 */
export declare const LabelStore: collections.LabelCollection;
/** @whatsapp 28920 */
export declare const LiveLocationStore: collections.LiveLocationCollection;
/** @whatsapp 51610 */
export declare const MsgStore: collections.MsgCollection;
/** @whatsapp 65018 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/** @whatsapp 23297 */
export declare const MuteStore: collections.MuteCollection;
/** @whatsapp 10492 */
export declare const OrderStore: collections.OrderCollection;
/** @whatsapp 67652 */
export declare const PresenceStore: collections.PresenceCollection;
/** @whatsapp 7798 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/** @whatsapp 18178 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/** @whatsapp 28290 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/** @whatsapp 28057 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/** @whatsapp 45935 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/** @whatsapp 2029 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/** @whatsapp 71273 */
export declare const StarredStickerStore: collections.StarredStickerCollection;
/** @whatsapp 798 */
export declare const StatusStore: collections.StatusCollection;
/** @whatsapp 7687 */
export declare const StatusV3Store: collections.StatusV3Collection;
/** @whatsapp 42179 */
export declare const StickerStore: collections.StickerCollection;
/** @whatsapp 8764 */
export declare const StickerPackStore: collections.StickerPackCollection;
/** @whatsapp 21940 */
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
    StickerPackStore: (m) =>
      m.default || m.StickerPackCollectionMd || m.StickerPackCollection,
  },
  (m) => m.StickerPackCollection
);
