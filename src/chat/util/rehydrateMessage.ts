/*!
 * Copyright 2025 WPPConnect Team
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
import { WPPError } from '../../util';
import {
  ModelPropertiesContructor,
  MsgKey,
  MsgModel,
  Wid,
} from '../../whatsapp';

export type MsgModelPayload = ModelPropertiesContructor<MsgModel, 'id'>;

type PlainPayload = Record<string, any>;

const WID_FIELDS = [
  'from',
  'to',
  'author',
  'quotedRemoteJid',
  'quotedParticipant',
  'quotedParentGroupJid',
  'invokedBotWid',
  'botTargetSenderJid',
  'botResponseTargetId',
  'chatId',
];

const MSG_KEY_FIELDS = [
  'quotedMsgId',
  'quotedMsgKey',
  'latestEditMsgKey',
  'parentMsgId',
  'protocolMessageKey',
];

function parsePayload(payload: string): PlainPayload {
  try {
    return JSON.parse(payload);
  } catch (error) {
    throw new WPPError(
      'invalid_quoted_payload',
      'Invalid quoted payload JSON',
      {
        cause: error as Error,
      }
    );
  }
}

function parseWid(value: any): Wid | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Wid) {
    return value;
  }

  const serialized =
    typeof value === 'string'
      ? value
      : typeof value._serialized === 'string'
        ? value._serialized
        : typeof value.id === 'string'
          ? value.id
          : typeof value.user === 'string' && typeof value.server === 'string'
            ? `${value.user}@${value.server}`
            : undefined;

  if (!serialized) {
    return undefined;
  }

  try {
    return assertWid(serialized);
  } catch (error) {
    try {
      return new Wid(serialized, {
        intentionallyUsePrivateConstructor: true,
      });
    } catch (err) {
      return undefined;
    }
  }
}

function parseMsgKey(value: any): MsgKey | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof MsgKey) {
    return value;
  }

  if (typeof value === 'string') {
    try {
      return MsgKey.fromString(value);
    } catch (error) {
      const parts = value.split('_');
      if (parts.length >= 3) {
        const fromMe = parts.shift() === 'true';
        const id = parts.pop()!;
        const remote = parts.join('_');
        const remoteWid = parseWid(remote);
        if (remoteWid) {
          try {
            return new MsgKey({ fromMe, remote: remoteWid, id });
          } catch (err) {
            return undefined;
          }
        }
      }
      return undefined;
    }
  }

  const serialized =
    typeof value._serialized === 'string'
      ? value._serialized
      : typeof value.id === 'string'
        ? value.id
        : undefined;

  if (serialized) {
    const parsed = parseMsgKey(serialized);
    if (parsed) {
      return parsed;
    }
  }

  if (typeof value.fromMe === 'boolean' && value.id) {
    const remoteWid = parseWid(value.remote ?? value.to ?? value.chatId);
    if (remoteWid) {
      try {
        return new MsgKey({
          fromMe: value.fromMe,
          remote: remoteWid,
          id: value.id,
          participant: parseWid(value.participant) ?? value.participant,
        });
      } catch (error) {
        return undefined;
      }
    }
  }

  return undefined;
}

function parseMessageSecret(value: any): Uint8Array | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Uint8Array) {
    return value;
  }

  if (Array.isArray(value)) {
    return new Uint8Array(value);
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return new Uint8Array();
    }

    if (keys.every((key) => /^\d+$/.test(key))) {
      const max = keys.reduce((acc, key) => Math.max(acc, Number(key)), 0);
      const arr = new Uint8Array(max + 1);
      for (const key of keys) {
        arr[Number(key)] = Number(value[key]) & 0xff;
      }
      return arr;
    }
  }

  return undefined;
}

function rehydrateNestedMessage(value: any): MsgModel | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof MsgModel) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.startsWith('{') ? rehydrateMessage(trimmed) : undefined;
  }

  if (typeof value === 'object') {
    return rehydrateMessage(JSON.stringify(value));
  }

  return undefined;
}

/**
 * Rehydrate a serialized message payload (JSON string) into a MsgModel so it
 * can be used as a quoted message even when it is no longer present in the
 * local WhatsApp store.
 */
export function rehydrateMessage(payload: string): MsgModel {
  const cloned = parsePayload(payload);

  // Parse the primary message key
  const primaryKey =
    parseMsgKey(cloned.id) ??
    parseMsgKey(cloned.key) ??
    parseMsgKey(cloned.msgKey) ??
    parseMsgKey(cloned.messageId);

  if (!primaryKey) {
    throw new WPPError(
      'invalid_quoted_payload',
      'Quoted payload must contain a valid message id'
    );
  }

  // Use the primary key, but ensure remote is set to the chat, not the sender
  // For 1-on-1 chats, the remote should be the chat participant
  const chatId =
    parseWid(cloned.chatId) ?? parseWid(cloned.to) ?? parseWid(cloned.from);
  if (chatId && !primaryKey.remote.equals(chatId)) {
    // Reconstruct the key with correct remote for quote context
    cloned.id = new MsgKey({
      fromMe: primaryKey.fromMe,
      remote: chatId,
      id: primaryKey.id,
      participant: primaryKey.participant,
    });
  } else {
    cloned.id = primaryKey;
  }

  delete cloned.key;
  delete cloned.msgKey;
  delete cloned.messageId;

  for (const field of WID_FIELDS) {
    const revived = parseWid(cloned[field]);
    if (revived) {
      cloned[field] = revived;
    }
  }

  if (Array.isArray(cloned.mentionedJidList)) {
    cloned.mentionedJidList = cloned.mentionedJidList
      .map((entry: any) => parseWid(entry))
      .filter((wid: Wid | undefined): wid is Wid => Boolean(wid));
  }

  const secret = parseMessageSecret(cloned.messageSecret);
  if (secret) {
    cloned.messageSecret = secret;
  }

  for (const field of MSG_KEY_FIELDS) {
    if (!(field in cloned)) {
      continue;
    }
    const revived = parseMsgKey(cloned[field]);
    if (revived) {
      cloned[field] = revived;
    }
  }

  if (cloned.quotedMsg) {
    const revived = rehydrateNestedMessage(cloned.quotedMsg);
    if (revived) {
      cloned.quotedMsg = revived;
    } else {
      delete cloned.quotedMsg;
    }
  }

  if (cloned.content && typeof cloned.body !== 'string') {
    cloned.body = cloned.content;
  }

  if (typeof cloned.t !== 'number' && cloned.timestamp) {
    cloned.t = cloned.timestamp;
  }

  delete cloned.timestamp;

  return new MsgModel(cloned as MsgModelPayload);
}
