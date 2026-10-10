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

import { expect, test } from '@playwright/test';

import {
  applyNativeFlowBiz,
  detectCarousel,
  detectNativeFlow,
  ensureNativeFlowBiz,
  summarizeBiz,
  unwrapKnownMessage,
} from '../src/chat/functions/nativeFlowBiz';

interface N {
  tag: string;
  attrs: Record<string, any>;
  content: any;
}
const create = (tag: string, attrs: any = {}, content?: any): N => ({
  tag,
  attrs,
  content,
});

const flow = (name: string) => ({
  interactiveMessage: { nativeFlowMessage: { buttons: [{ name }] } },
});

test.describe('detectNativeFlow', () => {
  for (const name of ['quick_reply', 'cta_url', 'cta_call', 'cta_copy']) {
    test(`${name} direct and under viewOnceMessage`, () => {
      expect(detectNativeFlow(flow(name))).toEqual({
        kind: 'interactive',
        path: [],
      });
      expect(
        detectNativeFlow({ viewOnceMessage: { message: flow(name) } })
      ).toEqual({ kind: 'interactive', path: ['viewOnceMessage'] });
    });
  }

  test('payment names', () => {
    expect(detectNativeFlow(flow('payment_info'))?.kind).toBe('payment_info');
    expect(detectNativeFlow(flow('review_and_pay'))?.kind).toBe(
      'order_details'
    );
  });

  test('other wrappers and nesting', () => {
    const p = {
      ephemeralMessage: {
        message: { viewOnceMessageV2: { message: flow('cta_url') } },
      },
    };
    expect(detectNativeFlow(p)?.path).toEqual([
      'ephemeralMessage',
      'viewOnceMessageV2',
    ]);
    expect(
      detectNativeFlow({
        viewOnceMessageV2Extension: { message: flow('cta_url') },
      })
    ).not.toBeNull();
    expect(
      detectNativeFlow({ deviceSentMessage: { message: flow('cta_url') } })
    ).not.toBeNull();
  });

  test('depth limit and cycles', () => {
    let deep: any = flow('quick_reply');
    for (let i = 0; i < 20; i++) deep = { ephemeralMessage: { message: deep } };
    expect(detectNativeFlow(deep)).toBeNull();
    expect(unwrapKnownMessage(deep).path.length).toBe(8);

    const cyc: any = {};
    cyc.viewOnceMessage = { message: cyc };
    expect(() => detectNativeFlow(cyc)).not.toThrow();
    expect(detectNativeFlow(cyc)).toBeNull();
  });

  test('legacy, list, responses, plain messages are not matched', () => {
    for (const p of [
      { buttonsMessage: { buttons: [{ buttonId: '1' }] } },
      { listMessage: {} },
      { buttonsResponseMessage: {} },
      { listResponseMessage: {} },
      {
        interactiveResponseMessage: {
          nativeFlowResponseMessage: { name: 'quick_reply' },
        },
      },
      { conversation: 'oi' },
      { imageMessage: {} },
      { extendedTextMessage: { text: 'x' } },
      null,
      undefined,
    ]) {
      expect(detectNativeFlow(p)).toBeNull();
    }
  });
});

test.describe('ensureNativeFlowBiz', () => {
  test('adds biz > interactive > native_flow v=9 mixed', () => {
    const content: any[] = [create('participants')];
    expect(ensureNativeFlowBiz(content, 'interactive', create)).toBe('added');
    const biz = content[1];
    expect(biz.tag).toBe('biz');
    expect(biz.content[0].attrs).toEqual({ type: 'native_flow', v: '1' });
    expect(biz.content[0].content[0]).toMatchObject({
      tag: 'native_flow',
      attrs: { v: '9', name: 'mixed' },
    });
  });

  test('payment kinds use name only, without v', () => {
    for (const kind of ['payment_info', 'order_details'] as const) {
      const content: any[] = [];
      ensureNativeFlowBiz(content, kind, create);
      expect(content[0].content[0].content[0].attrs).toEqual({ name: kind });
    }
  });

  test('idempotent', () => {
    const content: any[] = [];
    ensureNativeFlowBiz(content, 'interactive', create);
    const snapshot = JSON.stringify(content);
    expect(ensureNativeFlowBiz(content, 'interactive', create)).toBe(
      'unchanged'
    );
    expect(JSON.stringify(content)).toBe(snapshot);
    expect(content.length).toBe(1);
  });

  test('preserves biz attributes and unknown children', () => {
    const quality = create('quality_control', { x: '1' });
    const biz = create('biz', { host_storage: 2, native_flow_name: 'a' }, [
      quality,
    ]);
    const content: any[] = [biz];
    ensureNativeFlowBiz(content, 'interactive', create);
    expect(content.length).toBe(1);
    expect(biz.attrs).toEqual({ host_storage: 2, native_flow_name: 'a' });
    expect(biz.content[0]).toBe(quality);
    expect(biz.content.map((c: any) => c.tag)).toEqual([
      'quality_control',
      'interactive',
    ]);
  });

  test('completes an existing interactive without native_flow, keeps attrs', () => {
    const interactive = create('interactive', { type: 'native_flow', v: '1' });
    const content: any[] = [create('biz', {}, [interactive])];
    expect(ensureNativeFlowBiz(content, 'interactive', create)).toBe('added');
    expect(interactive.attrs).toEqual({ type: 'native_flow', v: '1' });
    expect(interactive.content.length).toBe(1);
  });

  test('safe failure when content is not an array', () => {
    for (const c of [undefined, null, 'x', new Uint8Array(2)]) {
      expect(ensureNativeFlowBiz(c, 'interactive', create)).toBe('skipped');
    }
    const biz = create('biz', {}, 'raw');
    const content: any[] = [biz];
    expect(ensureNativeFlowBiz(content, 'interactive', create)).toBe('skipped');
    expect(biz.content).toBe('raw');
  });
});

test('summarizeBiz exposes only whitelisted attributes', () => {
  const content = [
    create('biz', { host_storage: 2, privacy_mode_ts: 123 }, [
      create('interactive', { type: 'native_flow', v: '1', jid: '5511@c.us' }, [
        create('native_flow', { v: '9', name: 'mixed' }),
      ]),
    ]),
  ];
  const s = summarizeBiz(content);
  expect(s).toBe(
    '<biz host_storage=2 privacy_mode_ts=123><interactive type=native_flow v=1><native_flow v=9 name=mixed>'
  );
  expect(s).not.toContain('5511');
  expect(summarizeBiz([])).toBe('biz:absent');
  expect(summarizeBiz(undefined)).toBe('content:not-array');
});

test.describe('applyNativeFlowBiz experiments', () => {
  const run = (exp: any, content: any[] = []) => {
    const r = applyNativeFlowBiz(content, 'interactive', create, exp);
    return { r, content };
  };

  test('no experiment equals default behavior', () => {
    const { r, content } = run(undefined);
    expect(r).toBe('added');
    expect(content[0].content[0].content[0].attrs).toEqual({
      v: '9',
      name: 'mixed',
    });
  });

  test('off does not touch the stanza', () => {
    const { r, content } = run({ mode: 'off' });
    expect(r).toBe('off');
    expect(content).toEqual([]);
  });

  test('remove drops interactive and an empty biz, keeps other children', () => {
    const full: any[] = [];
    ensureNativeFlowBiz(full, 'interactive', create);
    expect(run({ mode: 'remove' }, full)).toMatchObject({ r: 'removed' });
    expect(full).toEqual([]);

    const quality = create('quality_control');
    const kept: any[] = [
      create('biz', { host_storage: 2 }, [
        create('interactive', { type: 'native_flow' }),
        quality,
      ]),
    ];
    run({ mode: 'remove' }, kept);
    expect(kept[0].content).toEqual([quality]);
    expect(kept[0].attrs).toEqual({ host_storage: 2 });
  });

  test('overrides modify an existing envelope in place', () => {
    const content: any[] = [
      create('biz', {}, [
        create('interactive', { type: 'native_flow', v: '1' }, [
          create('native_flow', { name: 'quick_reply' }),
        ]),
      ]),
    ];
    const { r } = run(
      {
        nativeFlowVersion: '9',
        nativeFlowName: 'mixed',
        interactiveVersion: '2',
        bizAttrs: { native_flow_name: 'mixed' },
      },
      content
    );
    expect(r).toBe('modified');
    const biz = content[0];
    expect(biz.attrs).toEqual({ native_flow_name: 'mixed' });
    expect(biz.content[0].attrs).toEqual({ type: 'native_flow', v: '2' });
    expect(biz.content[0].content[0].attrs).toEqual({
      name: 'mixed',
      v: '9',
    });
  });

  test('nativeFlowVersion null removes v', () => {
    const { content } = run({ nativeFlowVersion: null });
    expect(content[0].content[0].content[0].attrs).toEqual({ name: 'mixed' });
  });

  test('non-array content is skipped even with experiments', () => {
    expect(
      applyNativeFlowBiz(undefined, 'interactive', create, {
        nativeFlowName: 'x',
      })
    ).toBe('skipped');
  });

  test('normalizes an existing generic native_flow to v=9 mixed by default', () => {
    const content: any[] = [
      create('biz', {}, [
        create('interactive', { type: 'native_flow', v: '1' }, [
          create('native_flow', { name: 'quick_reply', extra: 'keep' }),
        ]),
      ]),
    ];
    expect(applyNativeFlowBiz(content, 'interactive', create)).toBe('modified');
    expect(content[0].content[0].content[0].attrs).toEqual({
      name: 'mixed',
      extra: 'keep',
      v: '9',
    });
  });

  test('payment kinds are not normalized by default', () => {
    const content: any[] = [
      create('biz', {}, [
        create('interactive', { type: 'native_flow', v: '1' }, [
          create('native_flow', { name: 'payment_info' }),
        ]),
      ]),
    ];
    expect(applyNativeFlowBiz(content, 'payment_info', create)).toBe(
      'unchanged'
    );
    expect(content[0].content[0].content[0].attrs).toEqual({
      name: 'payment_info',
    });
  });

  test('explicit experiment value wins over the default', () => {
    const { content } = run({ nativeFlowName: 'quick_reply' });
    expect(content[0].content[0].content[0].attrs).toEqual({
      v: '9',
      name: 'quick_reply',
    });
  });
});

test.describe('detectCarousel', () => {
  test('matches carousels but not native flow, legacy or null', () => {
    const carousel = { interactiveMessage: { carouselMessage: { cards: [] } } };
    expect(detectCarousel(carousel)).toEqual({ path: [] });
    expect(detectCarousel({ viewOnceMessage: { message: carousel } })).toEqual({
      path: ['viewOnceMessage'],
    });
    expect(detectCarousel(flow('quick_reply'))).toBeNull();
    expect(detectNativeFlow(carousel)).toBeNull();
    expect(detectCarousel({ buttonsMessage: {} })).toBeNull();
    expect(detectCarousel(null)).toBeNull();
  });

  test('qualityControl adds the node once, without touching other children', () => {
    const content: any[] = [];
    const first = applyNativeFlowBiz(content, 'interactive', create, {
      qualityControl: true,
    });
    expect(first).toBe('added');
    const biz = content[0];
    const qc = biz.content.find((c: any) => c.tag === 'quality_control');
    expect(qc.attrs.source_type).toBe('third_party');
    expect(qc.attrs.decision_id).toMatch(/^[0-9a-f]{40}$/);
    expect(qc.content[0]).toMatchObject({
      tag: 'decision_source',
      attrs: { value: 'df' },
    });
    applyNativeFlowBiz(content, 'interactive', create, {
      qualityControl: true,
    });
    expect(
      biz.content.filter((c: any) => c.tag === 'quality_control').length
    ).toBe(1);
    expect(biz.content[0].tag).toBe('interactive');
  });

  test('summarizeBiz exposes the group biz attributes but not decision_id', () => {
    const content: any[] = [];
    applyNativeFlowBiz(content, 'interactive', create, {
      qualityControl: true,
      bizAttrs: {
        host_storage: '2',
        actual_actors: '2',
        privacy_mode_ts: '1',
      },
    });
    const s = summarizeBiz(content);
    expect(s).toContain('host_storage=2');
    expect(s).toContain('<quality_control source_type=third_party>');
    expect(s).not.toMatch(/decision_id|[0-9a-f]{40}/);
  });
});
