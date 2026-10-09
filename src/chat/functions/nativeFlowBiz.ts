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

/**
 * Pure helpers (no WhatsApp module dependency) used to detect an initial
 * Native Flow message inside a Protobuf and to complete the stanza with
 * `<biz><interactive type="native_flow" v="1"><native_flow .../></interactive></biz>`.
 *
 * Layout adapted from the Zapo project (`resolveButtonAddonKind` /
 * `buildButtonAddonNode`). Not validated against WhatsApp Business accounts.
 *
 * @internal
 */

export type NativeFlowAddonKind =
  'interactive' | 'payment_info' | 'order_details';

export interface NativeFlowDetection {
  kind: NativeFlowAddonKind;
  /** Wrapper keys traversed to reach the inner message */
  path: string[];
}

export type NodeFactory<N> = (
  tag: string,
  attrs?: { [key: string]: any },
  content?: any
) => N;

const MAX_UNWRAP_DEPTH = 8;

// Known wrappers whose `.message` carries the real content
const WRAPPERS = [
  'ephemeralMessage',
  'viewOnceMessage',
  'viewOnceMessageV2',
  'viewOnceMessageV2Extension',
  'deviceSentMessage',
  'documentWithCaptionMessage',
  'groupMentionedMessage',
  'botInvokeMessage',
] as const;

/**
 * Iteratively unwraps known wrappers, with a depth limit and cycle guard.
 */
export function unwrapKnownMessage(proto: any): {
  message: any;
  path: string[];
} {
  const seen = new Set<any>();
  const path: string[] = [];
  let current = proto;

  while (
    current &&
    typeof current === 'object' &&
    !seen.has(current) &&
    path.length < MAX_UNWRAP_DEPTH
  ) {
    seen.add(current);
    const key = WRAPPERS.find((k) => current[k]?.message);
    if (!key) break;
    path.push(key);
    current = current[key].message;
  }

  return { message: current, path };
}

/**
 * Detects an initial Native Flow message (`interactiveMessage.nativeFlowMessage`).
 * Legacy `buttonsMessage`/`listMessage` and responses are not matched.
 */
export function detectNativeFlow(proto: any): NativeFlowDetection | null {
  const { message, path } = unwrapKnownMessage(proto);
  const nativeFlow = message?.interactiveMessage?.nativeFlowMessage;

  if (!nativeFlow || !Array.isArray(nativeFlow.buttons)) {
    return null;
  }

  const first = nativeFlow.buttons[0]?.name;
  let kind: NativeFlowAddonKind = 'interactive';
  if (first === 'payment_info') kind = 'payment_info';
  else if (first === 'review_and_pay') kind = 'order_details';

  return { kind, path };
}

function nativeFlowAttrs(kind: NativeFlowAddonKind) {
  // Zapo: only the generic flow carries v="9"; payment ones carry just the name
  return kind === 'interactive' ? { v: '9', name: 'mixed' } : { name: kind };
}

export type EnsureResult = 'added' | 'unchanged' | 'skipped';

/**
 * Ensures `<biz><interactive type="native_flow"><native_flow/></interactive></biz>`
 * exists in the stanza children. Never duplicates nodes, preserves existing
 * attributes and unknown children. Returns `skipped` if `content` is not an array.
 */
export function ensureNativeFlowBiz<
  N extends { tag: any; attrs?: any; content?: any },
>(
  content: unknown,
  kind: NativeFlowAddonKind,
  create: NodeFactory<N>
): EnsureResult {
  if (!Array.isArray(content)) {
    return 'skipped';
  }

  let biz = content.find((c: any) => c?.tag === 'biz') as N | undefined;

  if (!biz) {
    biz = create('biz', {}, null);
    content.push(biz);
  }

  if (!Array.isArray(biz.content)) {
    // Do not discard unexpected serialized content
    if (biz.content !== undefined && biz.content !== null) {
      return 'skipped';
    }
    biz.content = [];
  }

  const children = biz.content as any[];
  const interactive = children.find((c) => c?.tag === 'interactive');

  if (!interactive) {
    children.push(
      create('interactive', { type: 'native_flow', v: '1' }, [
        create('native_flow', nativeFlowAttrs(kind)),
      ])
    );
    return 'added';
  }

  // Existing <interactive>: complete only the missing <native_flow> child
  if (!Array.isArray(interactive.content)) {
    if (interactive.content !== undefined && interactive.content !== null) {
      return 'skipped';
    }
    interactive.content = [];
  }

  if (interactive.content.some((c: any) => c?.tag === 'native_flow')) {
    return 'unchanged';
  }

  interactive.content.push(create('native_flow', nativeFlowAttrs(kind)));
  return 'added';
}

/**
 * Experimental, opt-in variations of the Native Flow `<biz>` node, meant to
 * find which envelope WhatsApp accepts. Every field is **not validated**
 * against the server and nothing is applied unless the caller sets it.
 */
export interface NativeFlowBizExperiment {
  /**
   * - `auto` (default): complete the missing nodes only.
   * - `off`: do not touch the `<biz>` node at all.
   * - `remove`: remove the `<interactive>` node (and `<biz>` if left empty).
   */
  mode?: 'auto' | 'off' | 'remove';
  /** Override `v` of `<interactive>` (e.g. `'1'`) */
  interactiveVersion?: string;
  /** Override `v` of `<native_flow>` (e.g. `'9'`); `null` removes the attribute */
  nativeFlowVersion?: string | null;
  /** Override `name` of `<native_flow>` (e.g. `'mixed'`) */
  nativeFlowName?: string;
  /** Extra/overriding attributes on `<biz>` (e.g. `{ native_flow_name: 'mixed' }`) */
  bizAttrs?: { [key: string]: string };
}

export type ApplyResult = EnsureResult | 'off' | 'removed' | 'modified';

/**
 * Applies the default completion plus the optional experiment overrides.
 */
export function applyNativeFlowBiz<
  N extends { tag: any; attrs?: any; content?: any },
>(
  content: unknown,
  kind: NativeFlowAddonKind,
  create: NodeFactory<N>,
  experiment?: NativeFlowBizExperiment | null
): ApplyResult {
  const mode = experiment?.mode || 'auto';

  if (mode === 'off') return 'off';

  if (mode === 'remove') {
    if (!Array.isArray(content)) return 'skipped';
    const bizIndex = content.findIndex((c: any) => c?.tag === 'biz');
    const biz: any = content[bizIndex];
    if (!biz || !Array.isArray(biz.content)) return 'unchanged';
    const before = biz.content.length;
    biz.content = biz.content.filter((c: any) => c?.tag !== 'interactive');
    if (biz.content.length === 0 && Object.keys(biz.attrs || {}).length === 0) {
      content.splice(bizIndex, 1);
    }
    return biz.content.length !== before ? 'removed' : 'unchanged';
  }

  let result: ApplyResult = ensureNativeFlowBiz(content, kind, create);
  if (result === 'skipped') return result;

  // Default for generic Native Flow: v="9" name="mixed" (validated manually on
  // one @lid destination: the server returned ack 2 instead of error 405).
  // An explicit experiment value always wins.
  const exp: NativeFlowBizExperiment = { ...experiment };
  if (kind === 'interactive') {
    if (exp.nativeFlowVersion === undefined) exp.nativeFlowVersion = '9';
    if (exp.nativeFlowName === undefined) exp.nativeFlowName = 'mixed';
  }
  experiment = exp;

  const biz: any = (content as any[]).find((c: any) => c?.tag === 'biz');
  const interactive = biz?.content?.find?.(
    (c: any) => c?.tag === 'interactive'
  );
  const flow = interactive?.content?.find?.(
    (c: any) => c?.tag === 'native_flow'
  );

  const before = JSON.stringify([biz?.attrs, interactive?.attrs, flow?.attrs]);

  if (biz && experiment.bizAttrs) {
    biz.attrs = { ...biz.attrs, ...experiment.bizAttrs };
  }
  if (interactive && experiment.interactiveVersion !== undefined) {
    interactive.attrs = {
      ...interactive.attrs,
      v: experiment.interactiveVersion,
    };
  }
  if (flow) {
    const attrs = { ...flow.attrs };
    if (experiment.nativeFlowVersion === null) delete attrs.v;
    else if (experiment.nativeFlowVersion !== undefined) {
      attrs.v = experiment.nativeFlowVersion;
    }
    if (experiment.nativeFlowName !== undefined) {
      attrs.name = experiment.nativeFlowName;
    }
    flow.attrs = attrs;
  }

  const after = JSON.stringify([biz?.attrs, interactive?.attrs, flow?.attrs]);
  if (result === 'unchanged' && before !== after) result = 'modified';
  return result;
}

const SAFE_ATTRS = new Set(['type', 'v', 'name', 'native_flow_name']);

/**
 * Sanitized summary of the biz node for diagnostics: tags and a whitelist of
 * non-sensitive attributes only.
 */
export function summarizeBiz(content: unknown): string {
  if (!Array.isArray(content)) return 'content:not-array';
  const biz = content.find((c: any) => c?.tag === 'biz');
  if (!biz) return 'biz:absent';

  const render = (n: any): string => {
    const attrs = Object.entries(n?.attrs || {})
      .filter(([k]) => SAFE_ATTRS.has(k))
      .map(([k, v]) => `${k}=${String(v)}`)
      .join(' ');
    const kids = Array.isArray(n?.content)
      ? n.content.map(render).join('')
      : '';
    return `<${n?.tag}${attrs ? ' ' + attrs : ''}>${kids}`;
  };

  return render(biz);
}
