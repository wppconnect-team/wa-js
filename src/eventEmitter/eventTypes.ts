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

import { BlocklistEventTypes } from '../blocklist/events/eventTypes';
import { ChatEventTypes } from '../chat/events/eventTypes';
import { ConnEventTypes } from '../conn/events/eventTypes';
import { StatusEventTypes } from '../status/events/eventTypes';
import { WebpackEvents } from '../webpack/eventTypes';

export { BlocklistEventTypes } from '../blocklist/events/eventTypes';
export { ChatEventTypes } from '../chat/events/eventTypes';
export { ConnEventTypes } from '../conn/events/eventTypes';
export { StatusEventTypes } from '../status/events/eventTypes';
export { WebpackEvents } from '../webpack/eventTypes';

export type EventTypes = BlocklistEventTypes &
  ChatEventTypes &
  ConnEventTypes &
  StatusEventTypes &
  WebpackEvents;
