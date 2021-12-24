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

import Debug from 'debug';
import Emittery from 'emittery';

import { assertGetChat, assertWid } from '../assert';
import * as Chat from '../chat';
import Contact from '../contact';
import { WPPError } from '../util';
import * as webpack from '../webpack';
import { ChatStore, ContactStore, ParticipantModel, Wid } from '../whatsapp';
import {
  addParticipants,
  demoteParticipants,
  promoteParticipants,
  removeParticipants,
  sendCreateGroup,
} from '../whatsapp/functions';
import { ChatEventTypes as GroupEventTypes } from './types';

const debug = Debug('WA-JS:group');

export class Group extends Emittery<GroupEventTypes> {
  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    debug('initialized');
  }

  private ensureGroup(groupId: string | Wid) {
    const groupChat = assertGetChat(groupId);

    if (!groupChat.isGroup) {
      throw new WPPError(
        'not_a_group',
        `Chat ${groupChat.id._serialized} is not a group`
      );
    }

    return groupChat;
  }

  iAmAdmin(groupId: string | Wid) {
    const groupChat = this.ensureGroup(groupId);
    return groupChat.groupMetadata!.participants.iAmAdmin();
  }

  iAmMember(groupId: string | Wid) {
    const groupChat = this.ensureGroup(groupId);
    return groupChat.groupMetadata!.participants.iAmMember();
  }

  iAmRestrictedMember(groupId: string | Wid) {
    const groupChat = this.ensureGroup(groupId);
    return groupChat.groupMetadata!.participants.iAmRestrictedMember();
  }

  iAmSuperAdmin(groupId: string | Wid) {
    const groupChat = this.ensureGroup(groupId);
    return groupChat.groupMetadata!.participants.iAmMember();
  }

  private ensureGroupAndParticipants(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[],
    createIfNotExists = false
  ) {
    const groupChat = this.ensureGroup(groupId);

    if (!groupChat.groupMetadata!.participants.iAmAdmin()) {
      throw new WPPError(
        'group_you_are_not_admin',
        `You are not admin in ${groupChat.id._serialized}`
      );
    }

    if (!Array.isArray(participantsIds)) {
      participantsIds = [participantsIds];
    }

    const wids = participantsIds.map(assertWid);

    const participants = wids.map<ParticipantModel>((wid) => {
      let participant = groupChat.groupMetadata?.participants.get(wid);

      if (!participant && createIfNotExists) {
        participant = new ParticipantModel({
          id: wid,
        });
      }

      if (!participant) {
        throw new WPPError(
          'group_participant_not_found',
          `Chat ${groupChat.id._serialized} is not a group`
        );
      }

      return participant;
    });

    return {
      groupChat,
      participants,
    };
  }

  canAdd(groupId: string | Wid) {
    const groupChat = this.ensureGroup(groupId);
    return groupChat.groupMetadata!.participants.canAdd();
  }

  canDemote(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ) {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    return participants.every((p) =>
      groupChat.groupMetadata!.participants.canDemote(p)
    );
  }

  canPromote(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ) {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    return participants.every((p) =>
      groupChat.groupMetadata!.participants.canPromote(p)
    );
  }

  canRemove(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ) {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    return participants.every((p) =>
      groupChat.groupMetadata!.participants.canRemove(p)
    );
  }

  async addParticipants(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ): Promise<void> {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds,
      true
    );

    if (
      participants.some((p) => groupChat.groupMetadata?.participants.get(p.id))
    ) {
      throw new WPPError(
        'group_participant_already_a_group_member',
        `Group ${groupChat.id._serialized}: Group participant already a group member`
      );
    }

    return addParticipants(groupChat, participants);
  }

  async removeParticipants(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ): Promise<void> {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    if (
      participants.some(
        (p) => !groupChat.groupMetadata?.participants.canRemove(p)
      )
    ) {
      throw new WPPError(
        'group_participant_is_not_a_group_member',
        `Group ${groupChat.id._serialized}: Group participant is not a group member`
      );
    }

    return removeParticipants(groupChat, participants);
  }

  async promoteParticipants(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ): Promise<void> {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    if (
      participants.some(
        (p) => !groupChat.groupMetadata?.participants.canPromote(p)
      )
    ) {
      throw new WPPError(
        'group_participant_is_already_a_group_admin',
        `Group ${groupChat.id._serialized}: Group participant is already a group admin`
      );
    }

    return promoteParticipants(groupChat, participants);
  }

  async demoteParticipants(
    groupId: string | Wid,
    participantsIds: (string | Wid) | (string | Wid)[]
  ): Promise<void> {
    const { groupChat, participants } = this.ensureGroupAndParticipants(
      groupId,
      participantsIds
    );

    if (
      participants.some(
        (p) => !groupChat.groupMetadata?.participants.canDemote(p)
      )
    ) {
      throw new WPPError(
        'group_participant_is_already_not_a_group_admin',
        `Group ${groupChat.id._serialized}: Group participant is already not a group admin`
      );
    }

    return demoteParticipants(groupChat, participants);
  }

  async create(
    groupName: string,
    participantsIds: (string | Wid) | (string | Wid)[]
  ) {
    if (!Array.isArray(participantsIds)) {
      participantsIds = [participantsIds];
    }

    const participantsWids = participantsIds.map(assertWid);

    const wids: Wid[] = [];

    for (const wid of participantsWids) {
      console.log('wid', wid);
      const contact = ContactStore.get(wid);
      if (contact) {
        wids.push(contact.id);
        continue;
      }

      const info = await Contact.queryExists(wid);

      if (!info) {
        throw new WPPError('participant_not_exists', 'Participant not exists', {
          id: wid,
        });
      }

      wids.push(info.wid);
    }

    ChatStore.on('all', console.log);

    const result = await sendCreateGroup(groupName, wids);

    if (result.gid) {
      const chatGroup = await Chat.find(result.gid);

      // Wait group meta to be not stale
      if (chatGroup.groupMetadata?.stale !== false) {
        await new Promise<void>((resolve) => {
          chatGroup.on('change:groupMetadata.stale', function fn() {
            if (chatGroup.groupMetadata?.stale === false) {
              resolve();
              chatGroup.off('change:groupMetadata.stale', fn);
            }
          });
        });
      }
    }

    return result;
  }
}
