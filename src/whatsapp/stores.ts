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

import * as collections from './collections';
import { exportModule } from './exportModule';

/**
 * @whatsapp WAWebBlocklistCollection >= 2.3000.1032534684
 */
export declare const BlocklistStore: collections.BlocklistCollection;
/**
 * @whatsapp WAWebBusinessCategoriesResultCollection >= 2.3000.1032534684
 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/**
 * @whatsapp WAWebBusinessProfileCollection >= 2.3000.1032534684
 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/** @whatsapp WAWebBotProfileCollection
 */
export declare const BotProfileStore: collections.BotProfileCollection;
/**
 * @whatsapp WAWebCallCollection >= 2.3000.1032534684
 */
export declare const CallStore: collections.CallCollection;
/**
 * @whatsapp WAWebCartCollection >= 2.3000.1032534684
 */
export declare const CartStore: collections.CartCollection;
/**
 * @whatsapp WAWebCatalogCollection >= 2.3000.1032534684
 */
export declare const CatalogStore: collections.CatalogCollection;
/**
 * @whatsapp WAWebChatCollection >= 2.3000.1032534684
 */
export declare const ChatStore: collections.ChatCollection;
/**
 * @whatsapp WAWebNewsletterCollection >= 2.3000.1032534684
 */
export declare const NewsletterStore: collections.ChatCollection;
/**
 * @whatsapp WAWebContactCollection >= 2.3000.1032534684
 */
export declare const ContactStore: collections.ContactCollection;
/**
 * @whatsapp WAWebEmojiVariantCollection >= 2.3000.1032534684
 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/**
 * @whatsapp WAWebGroupMetadataCollection >= 2.3000.1032534684
 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/**
 * @whatsapp WAWebLabelCollection >= 2.3000.1032534684
 */
export declare const LabelStore: collections.LabelCollection;
/**
 * @whatsapp WAWebMsgCollection >= 2.3000.1032534684
 */
export declare const MsgStore: collections.MsgCollection;
/**
 * @whatsapp WAWebMsgInfoCollection >= 2.3000.1032534684
 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/**
 * @whatsapp WAWebMuteCollection >= 2.3000.1032534684
 */
export declare const MuteStore: collections.MuteCollection;
/**
 * @whatsapp WAWebOrderCollection >= 2.3000.1032534684
 */
export declare const OrderStore: collections.OrderCollection;
/**
 * @whatsapp WAWebPresenceCollection >= 2.3000.1032534684
 */
export declare const PresenceStore: collections.PresenceCollection;
/**
 * @whatsapp WAWebProductMessageListCollection >= 2.3000.1032534684
 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/**
 * @whatsapp WAWebProfilePicThumbCollection >= 2.3000.1032534684
 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/**
 * @whatsapp WAWebQuickReplyCollection >= 2.3000.1032534684
 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/**
 * @whatsapp WAWebReactionsCollection >= 2.3000.1032534684
 */
export declare const ReactionsStore: collections.ReactionsCollection;
/**
 * @whatsapp WAWebRecentEmojiCollection >= 2.3000.1032534684
 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/**
 * @whatsapp WAWebRecentStickerCollection >= 2.3000.1032534684
 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/**
 * @whatsapp WAWebStarredMsgCollection >= 2.3000.1032534684
 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/**
 * @whatsapp WAWebTextStatusCollection >= 2.3000.1032534684
 */
export declare const StatusStore: collections.StatusCollection;
/**
 * @whatsapp WAWebStatusCollection >= 2.3000.1032534684
 */
export declare const StatusV3Store: collections.StatusV3Collection;
/**
 * @whatsapp WAWebStickerCollection >= 2.3000.1032534684
 */
export declare const StickerStore: collections.StickerCollection;
/**
 * @whatsapp WAWebStickerPackCollectionMd >= 2.3000.1032534684
 */
export declare const StickerPackStore: collections.StickerPackCollection;
/**
 * @whatsapp WAWebStickerSearchCollection >= 2.3000.1032534684
 */
export declare const StickerSearchStore: collections.StickerSearchCollection;
/**
 * @whatsapp WAWebPinInChatCollection >= 2.3000.1032534684
 */
export declare const PinInChatStore: collections.PinInChatCollection;
/**
 * @whatsapp WAWebNoteCollection >= 2.3000.1032534684
 */
export declare const NoteStore: collections.NoteCollection;

const storeNames = [
  'BlocklistStore',
  'BusinessCategoriesResultStore',
  'BusinessProfileStore',
  'CallStore',
  'CartStore',
  'CatalogStore',
  'ChatStore',
  // 'NewsletterStore', // on version 2.3000.1032534684 it was required to find by id
  'ContactStore',
  'EmojiVariantStore',
  'GroupMetadataStore',
  'LabelStore',
  'MsgStore',
  'MsgInfoStore',
  'MuteStore',
  'OrderStore',
  'PinInChatStore',
  'PresenceStore',
  'ProductMessageListStore',
  'ProfilePicThumbStore',
  'QuickReplyStore',
  'ReactionsStore',
  'RecentEmojiStore',
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
      [name]: ['default', collectionName],
    },
    (m) =>
      (m.default || m[collectionName]) instanceof
      (collections as any)[collectionName]
  );
}

exportModule(
  exports,
  {
    RecentStickerStore: [
      'default',
      'RecentStickerCollectionMd',
      'RecentStickerCollection', // @whatsapp >= 2.2222.8
    ],
  },
  (m) => m.RecentStickerCollection
);

exportModule(
  exports,
  {
    StarredMsgStore: ['default', 'AllStarredMsgsCollection'],
  },
  (m) => m.StarredMsgCollection
);

exportModule(
  exports,
  {
    StickerPackStore: [
      'default',
      'StickerPackCollectionMd',
      'StickerPackCollection',
    ],
  },
  (m) => m.StickerPackCollection
);

exportModule(
  exports,
  {
    NewsletterStore: 'default',
  },
  (m, id) => id === 'WAWebNewsletterCollection' && m.default
);

exportModule(
  exports,
  {
    StatusStore: 'TextStatusCollection',
  },
  (m) => m.TextStatusCollection
);

exportModule(
  exports,
  {
    StatusV3Store: ['StatusV3Collection', 'StatusCollection'],
  },
  (m) => m.StatusV3CollectionImpl || m.StatusCollection
);

exportModule(
  exports,
  {
    BlocklistStore: ['default', 'BlocklistCollection'],
  },
  (m) => m.BlocklistCollection
);

exportModule(
  exports,
  {
    PresenceStore: ['PresenceCollectionImpl', 'PresenceCollection'],
  },
  (m) => m.PresenceCollectionImpl || m.PresenceCollection
);

exportModule(
  exports,
  {
    CartStore: ['CartCollectionImpl', 'CartCollection'],
  },
  (m) => m.CartCollectionImpl || m.CartCollection
);

exportModule(
  exports,
  {
    CatalogStore: ['CatalogCollectionImpl', 'CatalogCollection'],
  },
  (m) => m.CatalogCollectionImpl || m.CatalogCollection
);

exportModule(
  exports,
  {
    EmojiVariantStore: ['EmojiVariantCollectionImpl', 'EmojiVariantCollection'],
  },
  (m) => m.EmojiVariantCollectionImpl || m.EmojiVariantCollection
);

exportModule(
  exports,
  {
    LabelStore: ['LabelCollectionImpl', 'LabelCollection'],
  },
  (m) => m.LabelCollectionImpl || m.LabelCollection
);

exportModule(
  exports,
  {
    MsgInfoStore: ['MsgInfoCollectionImpl', 'MsgInfoCollection'],
  },
  (m) => m.MsgInfoCollectionImpl || m.MsgInfoCollection
);

exportModule(
  exports,
  {
    MuteStore: ['MuteCollectionImpl', 'MuteCollection'],
  },
  (m) => m.MuteCollectionImpl || m.MuteCollection
);

exportModule(
  exports,
  {
    OrderStore: ['OrderCollectionImpl', 'OrderCollection'],
  },
  (m) => m.OrderCollectionImpl || m.OrderCollection
);

exportModule(
  exports,
  {
    PinInChatStore: ['PinInChatCollectionImpl', 'PinInChatCollection'],
  },
  (m) => m.PinInChatCollectionImpl || m.PinInChatCollection
);

exportModule(
  exports,
  {
    ProductMessageListStore: [
      'ProductMessageListCollectionImpl',
      'ProductMessageListCollection',
    ],
  },
  (m) => m.ProductMessageListCollectionImpl || m.ProductMessageListCollection
);

exportModule(
  exports,
  {
    RecentEmojiStore: ['RecentEmojiCollectionImpl', 'RecentEmojiCollection'],
  },
  (m) => m.RecentEmojiCollectionImpl || m.RecentEmojiCollection
);

exportModule(
  exports,
  {
    StickerSearchStore: [
      'StickerSearchCollectionImpl',
      'StickerSearchCollection',
    ],
  },
  (m) => m.StickerSearchCollectionImpl || m.StickerSearchCollection
);

exportModule(
  exports,
  {
    BusinessProfileStore: [
      'BusinessProfileCollectionImpl',
      'BusinessProfileCollection',
    ],
  },
  (m) => m.BusinessProfileCollectionImpl || m.BusinessProfileCollection
);

exportModule(
  exports,
  {
    BotProfileStore: ['BotProfileCollection'],
  },
  (m) => m.BotProfileCollection
);
exportModule(
  exports,
  {
    ProfilePicThumbStore: [
      'ProfilePicThumbCollection',
      'ProfilePicThumbCollectionImpl',
    ],
  },
  (m) => m.ProfilePicThumbCollection || m.ProfilePicThumbCollectionImpl
);

exportModule(
  exports,
  {
    QuickReplyStore: ['QuickReplyCollectionImpl', 'QuickReplyCollection'],
  },
  (m) => m.QuickReplyCollectionImpl || m.QuickReplyCollection
);

exportModule(
  exports,
  {
    NoteStore: ['NoteCollection'],
  },
  (m) => m.NoteCollection
);

exportModule(
  exports,
  {
    ReactionsStore: ['ReactionsCollectionImpl', 'ReactionsCollection'],
  },
  (m) => m.ReactionsCollectionImpl || m.ReactionsCollection
);

exportModule(
  exports,
  {
    ChatStore: ['ChatCollection'],
  },
  (m) => m.ChatCollection
);
