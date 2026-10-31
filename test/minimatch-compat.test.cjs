/*!
 * Copyright 2026 WPPConnect Team
 * Licensed under the Apache License, Version 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const { createRequire } = require('node:module');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const isWaJs = require('../package.json').name === '@wppconnect/wa-js';
const owner = createRequire(
  require.resolve(isWaJs ? 'eslint-plugin-import' : 'glob')
);
const legacy = owner('minimatch');
const legacyRequire = createRequire(owner.resolve('minimatch'));

test('legacy callers retain the callable API and attached matching helpers', () => {
  assert.equal(typeof legacy, 'function');
  assert.equal(legacy('lib/a.js', '**/*.js'), true);
  assert.equal(legacy('lib/.hidden.js', '**/*.js'), false);
  assert.equal(legacy('lib/.hidden.js', '**/*.js', { dot: true }), true);
  assert.equal(legacy('ABC.js', '*.js', { nocase: true }), true);
  assert.deepEqual(legacy.match(['a.js', 'b.ts'], '*.js'), ['a.js']);
  assert.equal(legacy.filter('*.js')('a.js'), true);
  assert.equal(legacy.makeRe('*.js').test('a.js'), true);
  assert.deepEqual(legacy.braceExpand('*.{js,ts}'), ['*.js', '*.ts']);
  assert.equal(new legacy.Minimatch('**/*.js').match('lib/a.js'), true);
  assert.equal(legacy.defaults({ dot: true })('.hidden', '*'), true);
  assert.equal(
    new (legacy.defaults({ dot: true }).Minimatch)('*').match('.hidden'),
    true
  );
  assert.ok(legacy.GLOBSTAR);
  const model = new legacy.Minimatch('**/*.{js,ts}');
  assert.equal(model.set.length, model.globSet.length);
  const segment = model.set[0][1];
  assert.equal(segment._glob, '*.js');
  assert.ok('a.js'.match(segment));
  assert.equal('a.ts'.match(segment), null);
});

test('the installed facade is the reviewed source and delegates to a patched registry engine', () => {
  assert.equal(
    legacyRequire('minimatch-engine/package.json').version,
    '11.0.1'
  );
  assert.equal(require('minimatch/package.json').version, '11.0.1');
  assert.equal(
    fs.readFileSync(owner.resolve('minimatch'), 'utf8').replace(/\r\n/g, '\n'),
    fs
      .readFileSync(
        path.join(root, 'vendor/minimatch-legacy-compat/index.cjs'),
        'utf8'
      )
      .replace(/\r\n/g, '\n')
  );
});

test('both registry engines bound first-phase glob amplification', () => {
  for (const modulePath of [
    require.resolve('minimatch'),
    legacyRequire.resolve('minimatch-engine'),
  ]) {
    const code = `
      const assert = require('node:assert/strict');
      const { Minimatch } = require(${JSON.stringify(modulePath)});
      let peak = 0;
      class Probe extends Minimatch {
        firstPhasePreProcess(parts) {
          const result = super.firstPhasePreProcess(parts);
          peak = result.length;
          return result;
        }
      }
      new Probe(Array.from({length:12}, (_, i) => 'p'+i+'/**/../q'+i).join('/'),
        { optimizationLevel: 2, braceExpandMax: 64 });
      assert(peak > 1 && peak <= 64, 'first-phase pattern budget exceeded: '+peak);
    `;
    const result = spawnSync(
      process.execPath,
      ['--max-old-space-size=192', '-e', code],
      {
        encoding: 'utf8',
        timeout: 3000,
      }
    );
    assert.equal(
      result.status,
      0,
      result.stderr + (result.error?.message || '')
    );
  }
});

test('the actual legacy development consumer still works', async () => {
  if (isWaJs) {
    const { Linter } = require('eslint');
    const plugin = require('eslint-plugin-import');
    const linter = new Linter();
    const messages = linter.verify(
      "import allowed from 'eslint-plugin-import'; import denied from 'eslint-plugin-import/lib/rules/no-internal-modules';",
      [
        {
          plugins: { import: plugin },
          rules: {
            'import/no-internal-modules': [
              'error',
              { forbid: ['eslint-plugin-import/lib/**'] },
            ],
          },
        },
      ],
      { filename: path.join(root, 'compat-check.js') }
    );
    assert.equal(messages.length, 1, JSON.stringify(messages));
    assert.equal(messages[0].ruleId, 'import/no-internal-modules');
  } else {
    const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'wpp-minimatch-'));
    try {
      fs.mkdirSync(path.join(scratch, 'nested'));
      fs.writeFileSync(path.join(scratch, '.czrc'), '{}');
      fs.writeFileSync(path.join(scratch, 'nested', 'a.js'), '');
      fs.writeFileSync(path.join(scratch, 'nested', 'b.ts'), '');
      fs.writeFileSync(path.join(scratch, 'nested', '.hidden.js'), '');
      const cz = createRequire(require.resolve('commitizen'));
      const glob = cz('glob');
      assert.deepEqual(
        glob.sync('**/*.{js,ts}', { cwd: scratch, ignore: '**/*.ts' }),
        ['nested/a.js']
      );
      assert.deepEqual(glob.sync('**/*.js', { cwd: scratch, dot: true }), [
        'nested/.hidden.js',
        'nested/a.js',
      ]);
      assert.deepEqual(
        glob.sync('missing/*.{js,ts}', { cwd: scratch, nonull: true }),
        ['missing/*.js', 'missing/*.ts']
      );
      assert.deepEqual(
        await new Promise((resolve, reject) =>
          glob('**/*.js', { cwd: scratch }, (error, files) =>
            error ? reject(error) : resolve(files)
          )
        ),
        ['nested/a.js']
      );
      const findup = cz('./configLoader/findup.js').default;
      assert.equal(
        findup(['.czrc'], { cwd: path.join(scratch, 'nested') }, fs.existsSync),
        path.join(scratch, '.czrc')
      );
    } finally {
      assert.equal(path.dirname(scratch), path.resolve(os.tmpdir()));
      assert.ok(path.basename(scratch).startsWith('wpp-minimatch-'));
      fs.rmSync(scratch, { recursive: true, force: true });
    }
  }
});
