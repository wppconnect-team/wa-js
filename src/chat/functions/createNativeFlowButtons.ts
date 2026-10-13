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

import { WPPError } from '../../util';

export interface NativeFlowButton {
  name: string;
  buttonParamsJson?: string;
}

export type MessageButtonsTypes =
  | {
      id: string;
      text: string;
    }
  | {
      phoneNumber: string;
      text: string;
    }
  | {
      url: string;
      text: string;
    }
  | {
      code: string;
      text: string;
    }
  | {
      raw: NativeFlowButton;
    };

export interface NativeFlowButtons {
  buttons: NativeFlowButton[];
  name: string;
}

export function createNativeFlowButtons(
  input: MessageButtonsTypes[]
): NativeFlowButtons {
  if (!Array.isArray(input)) {
    throw new WPPError('buttons_not_a_array', 'Buttons options is not a array');
  }

  if (input.length === 0 || input.length > 3) {
    throw new WPPError(
      'buttons_must_between_1_and_3_options',
      'Buttons options must have between 1 and 3 options'
    );
  }

  const hasActionButton = input.some(
    (button) => 'phoneNumber' in button || 'url' in button
  );
  const hasReplyButton = input.some(
    (button) => 'id' in button && Boolean(button.id && button.text)
  );

  if (hasActionButton && hasReplyButton) {
    throw new WPPError(
      'reply_and_cta_btn_not_allowed',
      'It is not possible to send reply buttons and action buttons together'
    );
  }

  const buttons = input.map<NativeFlowButton>((button, index) => {
    if ('phoneNumber' in button) {
      return {
        name: 'cta_call',
        buttonParamsJson: JSON.stringify({
          display_text: button.text,
          phone_number: button.phoneNumber,
        }),
      };
    }

    if ('url' in button) {
      return {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: button.text,
          url: button.url,
          merchant_url: button.url,
        }),
      };
    }

    if ('code' in button) {
      return {
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: button.text,
          copy_code: button.code,
        }),
      };
    }

    if ('raw' in button) return button.raw;

    return {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({
        display_text: button.text,
        id: button.id || `${index}`,
      }),
    };
  });

  const names = new Set(buttons.map((button) => button.name));

  return {
    buttons,
    name: names.size === 1 ? buttons[0].name : 'mixed',
  };
}
