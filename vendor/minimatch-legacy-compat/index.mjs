// Copyright 2026 WPPConnect Team. Licensed under Apache-2.0.
import { Minimatch as NativeMinimatch } from 'minimatch-engine';

export * from 'minimatch-engine';

// TypeDoc still walks individual compiled rows through the removed matchOne
// method. Preserve that contract without restoring the old matching engine.
export class Minimatch extends NativeMinimatch {
  #rowMatchers = new WeakMap();

  matchOne(file, pattern, partial = false) {
    let matcher = this.#rowMatchers.get(pattern);
    if (!matcher) {
      const index = this.set.indexOf(pattern);
      if (index === -1) {
        throw new TypeError('matchOne requires a row from this matcher');
      }
      matcher = new NativeMinimatch(this.globParts[index].join('/'), {
        ...this.options,
        nobrace: true,
        nocomment: true,
        nonegate: true,
      });
      this.#rowMatchers.set(pattern, matcher);
    }
    return matcher.match(file.join('/'), partial);
  }
}
