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

import { exportModule } from '../exportModule';

/**
 * A Relay request document, as generated in the `*.graphql` WhatsApp modules.
 *
 * `fetchQuery` only reads `params` from it — the operation is sent to MEX as a
 * persisted query (`params.id` + variables), which is why `params.text` is
 * always `null` in WhatsApp's own documents.
 */
export interface MexRequest {
  kind: 'Request';
  params: {
    id: string;
    metadata: Record<string, unknown>;
    name: string;
    operationKind: 'query' | 'mutation';
    text: null;
  };
}

/**
 * @whatsapp WAWebMexClient
 */
export declare namespace MexClient {
  /**
   * Send a MEX (Meta GraphQL over WhatsApp's socket) operation.
   *
   * @param request The Relay request document
   * @param variables The operation variables
   * @returns The `data` object of the MEX response
   */
  function fetchQuery<T = any>(
    request: MexRequest,
    variables: Record<string, any>
  ): Promise<T>;
}

/**
 * `WAWebRelayClient` also exports both `graphql` and `fetchQuery`, but its
 * `fetchQuery(query, variables, options)` goes through a Relay environment and
 * has nothing to do with this signature. It is told apart by `commitMutation`,
 * which `WAWebMexClient` does not export.
 */
exportModule(
  exports,
  'MexClient',
  (m) => typeof m.fetchQuery === 'function' && !!m.graphql && !m.commitMutation
);
