/**
 * Changelog configuration for `conventional-changelog-cli`.
 *
 * This config is deliberately self-contained rather than built on top of
 * `conventional-changelog-angular`. Two things make the preset unusable here:
 *
 * 1. `-n <config>` never resolves a preset — the CLI only reads `--preset` from
 *    the command line and passes this module straight through as `parserOpts` /
 *    `writerOpts`, so a `preset: 'angular'` key here is silently ignored.
 * 2. The preset now ships function-based templates for
 *    `conventional-changelog-writer` >= 9, while the installed writer (8.x,
 *    pulled in by `conventional-changelog-cli@5`) compiles Handlebars strings.
 *    Wiring them together throws `You must pass a string or Handlebars AST`.
 *
 * So everything below extends the writer's own defaults. Without it the writer
 * falls back to its built-in template, which is what shipped in the v4.6.0
 * notes: a flat list of every commit with no section headings, full 40-char
 * hashes, and the release commit listing itself.
 */

/**
 * The angular preset only surfaces feat/fix/perf/revert. This project lists
 * every type, so each one gets a section title and the order below — impact
 * first, tooling last — instead of the alphabetical default.
 */
const TYPE_TITLES = {
  feat: 'Features',
  fix: 'Bug Fixes',
  perf: 'Performance Improvements',
  revert: 'Reverts',
  refactor: 'Code Refactoring',
  docs: 'Documentation',
  test: 'Tests',
  style: 'Styles',
  build: 'Build System',
  ci: 'Continuous Integration',
  chore: 'Chores',
};

const SECTION_ORDER = Object.values(TYPE_TITLES);

function toSection(type) {
  if (!type) {
    return 'Other Changes';
  }

  const normalized = String(type).toLowerCase();
  if (TYPE_TITLES[normalized]) {
    return TYPE_TITLES[normalized];
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

/**
 * The writer's default partial prints the raw `{{header}}`, which repeats the
 * type in every bullet once the sections above exist. Print the scope and
 * subject instead; the link markup is the default one, unchanged.
 */
const commitPartial = `*{{#if scope}} **{{scope}}:**{{/if}} {{#if subject}}{{subject}}{{else}}{{header}}{{/if}}

{{~!-- commit link --}}
{{~#if @root.linkReferences}} ([{{hash}}](
  {{~#if @root.repository}}
    {{~#if @root.host}}
      {{~@root.host}}/
    {{~/if}}
    {{~#if @root.owner}}
      {{~@root.owner}}/
    {{~/if}}
    {{~@root.repository}}
  {{~else}}
    {{~@root.repoUrl}}
  {{~/if}}/
  {{~@root.commit}}/{{hash}}))
{{~else if hash}} {{hash}}{{~/if}}

{{~!-- commit references --}}
{{~#if references~}}
  , closes
  {{~#each references}} {{#if @root.linkReferences~}}
    [
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}#{{this.issue}}](
    {{~#if @root.repository}}
      {{~#if @root.host}}
        {{~@root.host}}/
      {{~/if}}
      {{~#if this.repository}}
        {{~#if this.owner}}
          {{~this.owner}}/
        {{~/if}}
        {{~this.repository}}
      {{~else}}
        {{~#if @root.owner}}
          {{~@root.owner}}/
        {{~/if}}
          {{~@root.repository}}
        {{~/if}}
    {{~else}}
      {{~@root.repoUrl}}
    {{~/if}}/
    {{~@root.issue}}/{{this.issue}})
  {{~else}}
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}#{{this.issue}}
  {{~/if}}{{/each}}
{{~/if}}

`;

/** Same as the writer default, plus the `### {{title}}` heading per group. */
const mainTemplate = `{{> header}}

{{#each commitGroups}}
{{#if title}}
### {{title}}

{{/if}}
{{#each commits}}
{{> commit root=@root}}
{{/each}}

{{/each}}
{{> footer}}
`;

module.exports = {
  parserOpts: {
    /**
     * The default prefixes include `gh-`, which matches inside ordinary words:
     * "high-volume" in a commit body became a link to `hi#volume` in the v4.6.0
     * notes. This project only ever references issues as `#1234`.
     */
    issuePrefixes: ['#'],
  },

  writerOpts: {
    mainTemplate,
    commitPartial,

    groupBy: 'type',
    commitsSort: ['scope', 'subject'],

    commitGroupsSort: (a, b) => {
      const aIndex = SECTION_ORDER.indexOf(a.title);
      const bIndex = SECTION_ORDER.indexOf(b.title);

      // Unknown sections sort last, alphabetically among themselves.
      if (aIndex === -1 && bIndex === -1) {
        return a.title.localeCompare(b.title);
      }
      if (aIndex === -1) {
        return 1;
      }
      if (bIndex === -1) {
        return -1;
      }

      return aIndex - bIndex;
    },

    transform: (commit) => {
      // `chore(release): vX.Y.Z` is created by the very run that renders this.
      if (commit.type === 'chore' && /^v?\d+\.\d+\.\d+/.test(commit.subject)) {
        return false;
      }

      const nextCommit = { ...commit };

      // Supplying a transform replaces the writer's default one, which is what
      // shortened hashes; the template uses `hash` for both label and URL.
      if (typeof nextCommit.hash === 'string') {
        nextCommit.hash = nextCommit.hash.substring(0, 7);
      }

      nextCommit.type = toSection(nextCommit.type);

      // Keep wildcard scopes from polluting section output.
      if (nextCommit.scope === '*') {
        nextCommit.scope = '';
      }

      return nextCommit;
    },
  },
};
