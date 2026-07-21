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

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { ChatFilter } from './eventTypes';

interface ChatSearchQuery {
  filter: ChatFilter;
  updateLabelQuery(filter?: ChatFilter): void;
}

interface ChatSearchQueryModule {
  SearchQuery: {
    prototype: ChatSearchQuery;
  };
}

loader.onFullReady(registerActiveFilterEvent);

function registerActiveFilterEvent() {
  const module = loader.search<ChatSearchQueryModule>(
    (module, id) =>
      id === 'WAWebChatSearchQuery' ||
      typeof module.SearchQuery?.prototype?.updateLabelQuery === 'function',
    false,
    'ChatSearchQuery'
  );

  if (!module) {
    console.error('WAWebChatSearchQuery module was not found');
    return;
  }

  const prototype = module.SearchQuery.prototype;
  const updateLabelQuery = prototype.updateLabelQuery;

  prototype.updateLabelQuery = function (filter?: ChatFilter) {
    const previousKind = this.filter?.kind;
    const previousLabel = this.filter?.label;
    const result = updateLabelQuery.call(this, filter);

    if (
      previousKind !== this.filter?.kind ||
      previousLabel !== this.filter?.label
    ) {
      internalEv.emit('chat.active_filter', this.filter);
    }

    return result;
  };
}
