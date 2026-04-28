const TYPE_TITLES = {
  feat: 'Features',
  fix: 'Bug Fixes',
  perf: 'Performance Improvements',
  revert: 'Reverts',
  docs: 'Documentation',
  style: 'Styles',
  refactor: 'Code Refactoring',
  test: 'Tests',
  build: 'Build System',
  ci: 'Continuous Integration',
  chore: 'Chores',
};

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

module.exports = {
  preset: 'angular',
  writerOpts: {
    transform: (commit) => {
      const nextCommit = { ...commit };
      nextCommit.type = toSection(nextCommit.type);

      // Keep wildcard scopes from polluting section output.
      if (nextCommit.scope === '*') {
        nextCommit.scope = '';
      }

      return nextCommit;
    },
  },
};
