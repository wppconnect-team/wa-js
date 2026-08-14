
## 4.6.0 (2026-08-14)

### Features

* Validate usernames locally and expose getUsername (#3574) ([c4dc4f2](https://github.com/wppconnect-team/wa-js/commit/c4dc4f2)), closes [#3574](https://github.com/wppconnect-team/wa-js/issues/3574) [#3550](https://github.com/wppconnect-team/wa-js/issues/3550)

### Bug Fixes

* **chat:** load the forward bundle before forwarding (#3582) ([e84b573](https://github.com/wppconnect-team/wa-js/commit/e84b573)), closes [#3582](https://github.com/wppconnect-team/wa-js/issues/3582) [#1535](https://github.com/wppconnect-team/wa-js/issues/1535)
* **conn:** manage phone link code lifecycle (#3554) ([ec3cb1b](https://github.com/wppconnect-team/wa-js/commit/ec3cb1b)), closes [#3554](https://github.com/wppconnect-team/wa-js/issues/3554)
* Fixed 'call.incoming_call' event on WhatsApp native VoIP stack (#3567) ([5bd54c2](https://github.com/wppconnect-team/wa-js/commit/5bd54c2)), closes [#3567](https://github.com/wppconnect-team/wa-js/issues/3567) [#3557](https://github.com/wppconnect-team/wa-js/issues/3557)
* Fixed reject, accept and end call on WhatsApp native VoIP stack (#3568) ([3431a89](https://github.com/wppconnect-team/wa-js/commit/3431a89)), closes [#3568](https://github.com/wppconnect-team/wa-js/issues/3568)
* resolve createWid reliability finding (#3576) ([606ef84](https://github.com/wppconnect-team/wa-js/commit/606ef84)), closes [#3576](https://github.com/wppconnect-team/wa-js/issues/3576)
* resolve StickerPackModel on WA >= 2.3000.10452 (#3586) ([f3ac635](https://github.com/wppconnect-team/wa-js/commit/f3ac635)), closes [#3586](https://github.com/wppconnect-team/wa-js/issues/3586)
* **security:** restrict workflow token permissions (#3569) ([0afe2c0](https://github.com/wppconnect-team/wa-js/commit/0afe2c0)), closes [#3569](https://github.com/wppconnect-team/wa-js/issues/3569)
* Use a LID-capable chat origin on chat.find (#3573) ([5843249](https://github.com/wppconnect-team/wa-js/commit/5843249)), closes [#3573](https://github.com/wppconnect-team/wa-js/issues/3573)
* WPP.newsletter.getSubscribers and the modules resolution failure on WA >= 2.3000.1044479778 (#3558) ([00ec618](https://github.com/wppconnect-team/wa-js/commit/00ec618)), closes [#3558](https://github.com/wppconnect-team/wa-js/issues/3558)

### Code Refactoring

* **chat:** deprecate WPP.chat.forwardMessage (#3584) ([c79f58b](https://github.com/wppconnect-team/wa-js/commit/c79f58b)), closes [#3584](https://github.com/wppconnect-team/wa-js/issues/3584) [#2960](https://github.com/wppconnect-team/wa-js/issues/2960)

### Documentation

* Update GitHub sponsors list ([b24c075](https://github.com/wppconnect-team/wa-js/commit/b24c075))

### Build System

* **deps-dev:** update commitlint monorepo to ^21.2.2 (#3579) ([b676229](https://github.com/wppconnect-team/wa-js/commit/b676229)), closes [#3579](https://github.com/wppconnect-team/wa-js/issues/3579)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4534 (#3547) ([39dbcdf](https://github.com/wppconnect-team/wa-js/commit/39dbcdf)), closes [#3547](https://github.com/wppconnect-team/wa-js/issues/3547)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4540 (#3560) ([fc67dd9](https://github.com/wppconnect-team/wa-js/commit/fc67dd9)), closes [#3560](https://github.com/wppconnect-team/wa-js/issues/3560)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4545 (#3562) ([34d9b4b](https://github.com/wppconnect-team/wa-js/commit/34d9b4b)), closes [#3562](https://github.com/wppconnect-team/wa-js/issues/3562)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4547 (#3563) ([d679499](https://github.com/wppconnect-team/wa-js/commit/d679499)), closes [#3563](https://github.com/wppconnect-team/wa-js/issues/3563)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4555 (#3565) ([b64b02a](https://github.com/wppconnect-team/wa-js/commit/b64b02a)), closes [#3565](https://github.com/wppconnect-team/wa-js/issues/3565)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4585 (#3570) ([8d5fcde](https://github.com/wppconnect-team/wa-js/commit/8d5fcde)), closes [#3570](https://github.com/wppconnect-team/wa-js/issues/3570)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4598 (#3578) ([259229d](https://github.com/wppconnect-team/wa-js/commit/259229d)), closes [#3578](https://github.com/wppconnect-team/wa-js/issues/3578)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4602 (#3585) ([1dc2b70](https://github.com/wppconnect-team/wa-js/commit/1dc2b70)), closes [#3585](https://github.com/wppconnect-team/wa-js/issues/3585)
* **deps-dev:** update dependency conventional-changelog-angular to ^9.3.0 (#3577) ([c16f91b](https://github.com/wppconnect-team/wa-js/commit/c16f91b)), closes [#3577](https://github.com/wppconnect-team/wa-js/issues/3577)
* **deps-dev:** update dependency eslint to ^10.8.1 (#3561) ([42b2983](https://github.com/wppconnect-team/wa-js/commit/42b2983)), closes [#3561](https://github.com/wppconnect-team/wa-js/issues/3561)
* **deps-dev:** update dependency lint-staged to ^17.3.0 (#3548) ([c4cb033](https://github.com/wppconnect-team/wa-js/commit/c4cb033)), closes [#3548](https://github.com/wppconnect-team/wa-js/issues/3548)
* **deps-dev:** update dependency release-it to ^21.0.1 (#3549) ([bb6e2c7](https://github.com/wppconnect-team/wa-js/commit/bb6e2c7)), closes [#3549](https://github.com/wppconnect-team/wa-js/issues/3549)
* **deps-dev:** update dependency release-it to ^21.0.2 (#3564) ([6eb2527](https://github.com/wppconnect-team/wa-js/commit/6eb2527)), closes [#3564](https://github.com/wppconnect-team/wa-js/issues/3564)
* **deps-dev:** update typescript-eslint monorepo to ^8.66.0 (#3555) ([61ed1a6](https://github.com/wppconnect-team/wa-js/commit/61ed1a6)), closes [#3555](https://github.com/wppconnect-team/wa-js/issues/3555)
* **deps-dev:** update typescript-eslint monorepo to ^8.67.0 (#3571) ([02756eb](https://github.com/wppconnect-team/wa-js/commit/02756eb)), closes [#3571](https://github.com/wppconnect-team/wa-js/issues/3571)
* **deps:** update node.js to v24.19.0 (#3553) ([c7bceaf](https://github.com/wppconnect-team/wa-js/commit/c7bceaf)), closes [#3553](https://github.com/wppconnect-team/wa-js/issues/3553)

### Continuous Integration

* **deps:** update dependency node to v24.19.0 (#3556) ([b7f1a18](https://github.com/wppconnect-team/wa-js/commit/b7f1a18)), closes [#3556](https://github.com/wppconnect-team/wa-js/issues/3556)
* **deps:** update richardsimko/update-tag action to v3 (#3552) ([07444ea](https://github.com/wppconnect-team/wa-js/commit/07444ea)), closes [#3552](https://github.com/wppconnect-team/wa-js/issues/3552)

### Chores

* **deps:** lock file maintenance (#3551) ([f08192a](https://github.com/wppconnect-team/wa-js/commit/f08192a)), closes [#3551](https://github.com/wppconnect-team/wa-js/issues/3551)
* **deps:** lock file maintenance (#3566) ([fd76b94](https://github.com/wppconnect-team/wa-js/commit/fd76b94)), closes [#3566](https://github.com/wppconnect-team/wa-js/issues/3566)

## 4.5.0 (2026-07-31)

### Features

* **chat:** emit native active filter changes (#3492) ([eb1a1ec](https://github.com/wppconnect-team/wa-js/commit/eb1a1ec)), closes [#3492](https://github.com/wppconnect-team/wa-js/issues/3492) [#2511](https://github.com/wppconnect-team/wa-js/issues/2511)
* **dev:** sendTests() console helper for the send paths (#3526) ([66b321d](https://github.com/wppconnect-team/wa-js/commit/66b321d)), closes [#3526](https://github.com/wppconnect-team/wa-js/issues/3526)

### Bug Fixes

* **chat:** restore setChatList for LID chats (#3493) ([a3222aa](https://github.com/wppconnect-team/wa-js/commit/a3222aa)), closes [#3493](https://github.com/wppconnect-team/wa-js/issues/3493) [#3280](https://github.com/wppconnect-team/wa-js/issues/3280)
* **chat:** support @all group mentions (#3490) ([6fa6cb5](https://github.com/wppconnect-team/wa-js/commit/6fa6cb5)), closes [#3490](https://github.com/wppconnect-team/wa-js/issues/3490) [#3280](https://github.com/wppconnect-team/wa-js/issues/3280)
* **group:** resolve participants by lid or phone number (close #3527) (#3546) ([aa68102](https://github.com/wppconnect-team/wa-js/commit/aa68102)), closes [#3527](https://github.com/wppconnect-team/wa-js/issues/3527) [#3546](https://github.com/wppconnect-team/wa-js/issues/3546)
* **loader:** wait for meta modules to settle before loader.injected (#3499) ([af374c7](https://github.com/wppconnect-team/wa-js/commit/af374c7)), closes [#3499](https://github.com/wppconnect-team/wa-js/issues/3499) [#3419](https://github.com/wppconnect-team/wa-js/issues/3419) [#3481](https://github.com/wppconnect-team/wa-js/issues/3481)
* match only the poll-votes table in getTableVotes (#3519) ([9522dad](https://github.com/wppconnect-team/wa-js/commit/9522dad)), closes [#3519](https://github.com/wppconnect-team/wa-js/issues/3519)
* modules resolution test timing out waiting for Debug.VERSION (#3501) ([a3ed679](https://github.com/wppconnect-team/wa-js/commit/a3ed679)), closes [#3501](https://github.com/wppconnect-team/wa-js/issues/3501)
* **status:** text status TypeError and media status never settling (#3515) ([69444f7](https://github.com/wppconnect-team/wa-js/commit/69444f7)), closes [#3515](https://github.com/wppconnect-team/wa-js/issues/3515) [#3466](https://github.com/wppconnect-team/wa-js/issues/3466)

### Build System

* **deps-dev:** update commitlint monorepo to v21 (#3456) ([e3c9fce](https://github.com/wppconnect-team/wa-js/commit/e3c9fce)), closes [#3456](https://github.com/wppconnect-team/wa-js/issues/3456)
* **deps-dev:** update dependency @playwright/test to ^1.62.1 (#3535) ([c72c945](https://github.com/wppconnect-team/wa-js/commit/c72c945)), closes [#3535](https://github.com/wppconnect-team/wa-js/issues/3535)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4466 (#3483) ([9047150](https://github.com/wppconnect-team/wa-js/commit/9047150)), closes [#3483](https://github.com/wppconnect-team/wa-js/issues/3483)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4467 (#3508) ([26b5e08](https://github.com/wppconnect-team/wa-js/commit/26b5e08)), closes [#3508](https://github.com/wppconnect-team/wa-js/issues/3508)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4471 (#3517) ([9f206bd](https://github.com/wppconnect-team/wa-js/commit/9f206bd)), closes [#3517](https://github.com/wppconnect-team/wa-js/issues/3517)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4472 (#3536) ([87d6c30](https://github.com/wppconnect-team/wa-js/commit/87d6c30)), closes [#3536](https://github.com/wppconnect-team/wa-js/issues/3536)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4475 (#3541) ([1395d45](https://github.com/wppconnect-team/wa-js/commit/1395d45)), closes [#3541](https://github.com/wppconnect-team/wa-js/issues/3541)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.4476 (#3545) ([9490f3f](https://github.com/wppconnect-team/wa-js/commit/9490f3f)), closes [#3545](https://github.com/wppconnect-team/wa-js/issues/3545)
* **deps-dev:** update dependency conventional-changelog-angular to v9 (#3523) ([19c1227](https://github.com/wppconnect-team/wa-js/commit/19c1227)), closes [#3523](https://github.com/wppconnect-team/wa-js/issues/3523)
* **deps-dev:** update dependency eslint to ^10.8.0 (#3507) ([8f5806f](https://github.com/wppconnect-team/wa-js/commit/8f5806f)), closes [#3507](https://github.com/wppconnect-team/wa-js/issues/3507)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.5.6 (#3489) ([ce392f7](https://github.com/wppconnect-team/wa-js/commit/ce392f7)), closes [#3489](https://github.com/wppconnect-team/wa-js/issues/3489)
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to v14 (#3524) ([39e99a5](https://github.com/wppconnect-team/wa-js/commit/39e99a5)), closes [#3524](https://github.com/wppconnect-team/wa-js/issues/3524)
* **deps-dev:** update dependency lint-staged to v17 (#3525) ([fe2b2ed](https://github.com/wppconnect-team/wa-js/commit/fe2b2ed)), closes [#3525](https://github.com/wppconnect-team/wa-js/issues/3525)
* **deps-dev:** update dependency playwright-chromium to ^1.62.1 (#3531) ([d1a3b84](https://github.com/wppconnect-team/wa-js/commit/d1a3b84)), closes [#3531](https://github.com/wppconnect-team/wa-js/issues/3531)
* **deps-dev:** update dependency prettier to ^3.9.6 (#3509) ([10ac53d](https://github.com/wppconnect-team/wa-js/commit/10ac53d)), closes [#3509](https://github.com/wppconnect-team/wa-js/issues/3509)
* **deps-dev:** update dependency release-it to v21 (#3528) ([b00267d](https://github.com/wppconnect-team/wa-js/commit/b00267d)), closes [#3528](https://github.com/wppconnect-team/wa-js/issues/3528)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.6.1 (#3504) ([f7a3c14](https://github.com/wppconnect-team/wa-js/commit/f7a3c14)), closes [#3504](https://github.com/wppconnect-team/wa-js/issues/3504)
* **deps-dev:** update dependency ts-loader to ^9.6.2 (#3510) ([bc91923](https://github.com/wppconnect-team/wa-js/commit/bc91923)), closes [#3510](https://github.com/wppconnect-team/wa-js/issues/3510)
* **deps-dev:** update dependency ts-morph to v28 (#3529) ([2b4682c](https://github.com/wppconnect-team/wa-js/commit/2b4682c)), closes [#3529](https://github.com/wppconnect-team/wa-js/issues/3529)
* **deps-dev:** update dependency typedoc to ^0.28.20 (#3505) ([cb15c88](https://github.com/wppconnect-team/wa-js/commit/cb15c88)), closes [#3505](https://github.com/wppconnect-team/wa-js/issues/3505)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^4.1.4 (#3506) ([2ad499d](https://github.com/wppconnect-team/wa-js/commit/2ad499d)), closes [#3506](https://github.com/wppconnect-team/wa-js/issues/3506)
* **deps-dev:** update dependency typescript to v6 (#3544) ([afce77f](https://github.com/wppconnect-team/wa-js/commit/afce77f)), closes [#3544](https://github.com/wppconnect-team/wa-js/issues/3544)
* **deps-dev:** update dependency webpack to ^5.109.2 (#3511) ([cb64003](https://github.com/wppconnect-team/wa-js/commit/cb64003)), closes [#3511](https://github.com/wppconnect-team/wa-js/issues/3511)
* **deps-dev:** update dependency webpack-cli to ^7.2.2 (#3512) ([d0c4448](https://github.com/wppconnect-team/wa-js/commit/d0c4448)), closes [#3512](https://github.com/wppconnect-team/wa-js/issues/3512)
* **deps-dev:** update playwright monorepo to ^1.62.0 (#3513) ([7d104de](https://github.com/wppconnect-team/wa-js/commit/7d104de)), closes [#3513](https://github.com/wppconnect-team/wa-js/issues/3513)
* **deps-dev:** update typescript-eslint monorepo to ^8.65.0 (#3514) ([5fd4d6d](https://github.com/wppconnect-team/wa-js/commit/5fd4d6d)), closes [#3514](https://github.com/wppconnect-team/wa-js/issues/3514)
* **deps:** update node.js to v24.18.1 (#3521) ([752981e](https://github.com/wppconnect-team/wa-js/commit/752981e)), closes [#3521](https://github.com/wppconnect-team/wa-js/issues/3521)

### Continuous Integration

* **deps:** update actions/cache action to v6 (#3532) ([69aa459](https://github.com/wppconnect-team/wa-js/commit/69aa459)), closes [#3532](https://github.com/wppconnect-team/wa-js/issues/3532)
* **deps:** update actions/checkout action to v7 (#3533) ([f9f576d](https://github.com/wppconnect-team/wa-js/commit/f9f576d)), closes [#3533](https://github.com/wppconnect-team/wa-js/issues/3533)
* **deps:** update actions/checkout digest to d23441a (#3503) ([10dc4a4](https://github.com/wppconnect-team/wa-js/commit/10dc4a4)), closes [#3503](https://github.com/wppconnect-team/wa-js/issues/3503)
* **deps:** update actions/github-script action to v9 (#3537) ([91481c8](https://github.com/wppconnect-team/wa-js/commit/91481c8)), closes [#3537](https://github.com/wppconnect-team/wa-js/issues/3537)
* **deps:** update actions/setup-node action to v6.5.0 (#3522) ([2713278](https://github.com/wppconnect-team/wa-js/commit/2713278)), closes [#3522](https://github.com/wppconnect-team/wa-js/issues/3522)
* **deps:** update actions/setup-node action to v7 (#3539) ([5e19fd7](https://github.com/wppconnect-team/wa-js/commit/5e19fd7)), closes [#3539](https://github.com/wppconnect-team/wa-js/issues/3539)
* **deps:** update richardsimko/update-tag action to v2 (#3543) ([8e35d65](https://github.com/wppconnect-team/wa-js/commit/8e35d65)), closes [#3543](https://github.com/wppconnect-team/wa-js/issues/3543)
* use the same Node version on every workflow (#3516) ([b3f68b4](https://github.com/wppconnect-team/wa-js/commit/b3f68b4)), closes [#3516](https://github.com/wppconnect-team/wa-js/issues/3516)

### Chores

* **deps:** hold typescript below v7 (#3538) ([3b97a7a](https://github.com/wppconnect-team/wa-js/commit/3b97a7a)), closes [#3538](https://github.com/wppconnect-team/wa-js/issues/3538) [#3530](https://github.com/wppconnect-team/wa-js/issues/3530)
* drop partially purged WhatsApp versions from supported range (#3502) ([3169194](https://github.com/wppconnect-team/wa-js/commit/3169194)), closes [#3502](https://github.com/wppconnect-team/wa-js/issues/3502)
* **release:** drop unread npm options from release-it config (#3534) ([7437d73](https://github.com/wppconnect-team/wa-js/commit/7437d73)), closes [#3534](https://github.com/wppconnect-team/wa-js/issues/3534)

## <small>4.4.3 (2026-07-30)</small>

### Bug Fixes

* compatibility with WhatsApp Web >= 2.3000.1044096409 (#3500) ([1e05124](https://github.com/wppconnect-team/wa-js/commit/1e05124)), closes [#3500](https://github.com/wppconnect-team/wa-js/issues/3500)
* support new label deletion signature (#3494) ([31512a9](https://github.com/wppconnect-team/wa-js/commit/31512a9)), closes [#3494](https://github.com/wppconnect-team/wa-js/issues/3494)

## <small>4.4.2 (2026-07-24)</small>

### Bug Fixes

* protobuf named params when sending messages (#3498) ([be60fe1](https://github.com/wppconnect-team/wa-js/commit/be60fe1)), closes [#3498](https://github.com/wppconnect-team/wa-js/issues/3498)

## <small>4.4.1 (2026-07-15)</small>

### Bug Fixes

* restore MsgKey._serialized on keys created before injection (#3488) ([a0abd24](https://github.com/wppconnect-team/wa-js/commit/a0abd24)), closes [#3488](https://github.com/wppconnect-team/wa-js/issues/3488) [#3484](https://github.com/wppconnect-team/wa-js/issues/3484)

## 4.4.0 (2026-07-15)

### Features

* Whatsapp voip calls (#3477) ([cb9d321](https://github.com/wppconnect-team/wa-js/commit/cb9d321)), closes [#3477](https://github.com/wppconnect-team/wa-js/issues/3477)

### Bug Fixes

* keep lid chat ids for raw sends ([a4c5717](https://github.com/wppconnect-team/wa-js/commit/a4c5717))
* **loader:** recover from stale negative module lookups (#3419) (#3476) ([8ea1d01](https://github.com/wppconnect-team/wa-js/commit/8ea1d01)), closes [#3419](https://github.com/wppconnect-team/wa-js/issues/3419) [#3476](https://github.com/wppconnect-team/wa-js/issues/3476)
* resolve lid sends through phone chats ([581d5df](https://github.com/wppconnect-team/wa-js/commit/581d5df))
* restore module bindings broken on WhatsApp Web 2.3000.1042652105 (#3480) ([ccac33f](https://github.com/wppconnect-team/wa-js/commit/ccac33f)), closes [#3480](https://github.com/wppconnect-team/wa-js/issues/3480)
* restore MsgKey._serialized on WhatsApp Web >= 2.3000.1042401057 (#3484) ([dd00bf7](https://github.com/wppconnect-team/wa-js/commit/dd00bf7)), closes [#3484](https://github.com/wppconnect-team/wa-js/issues/3484)

### Continuous Integration

* **deps:** update actions/checkout digest to df4cb1c (#3482) ([db32c4d](https://github.com/wppconnect-team/wa-js/commit/db32c4d)), closes [#3482](https://github.com/wppconnect-team/wa-js/issues/3482)

## <small>4.3.1 (2026-06-19)</small>

### Bug Fixes

* **group:** pass membershipApprovalMode to joinGroupViaInvite (#3468) ([3383b03](https://github.com/wppconnect-team/wa-js/commit/3383b03)), closes [#3468](https://github.com/wppconnect-team/wa-js/issues/3468) [#2221](https://github.com/wppconnect-team/wa-js/issues/2221)
* send as lid when destination is lid (#3474) ([9cd87e8](https://github.com/wppconnect-team/wa-js/commit/9cd87e8)), closes [#3474](https://github.com/wppconnect-team/wa-js/issues/3474)

### Documentation

* update FUNDING.yml and enhance README with custom global variable build instructions (#3463) ([a490e22](https://github.com/wppconnect-team/wa-js/commit/a490e22)), closes [#3463](https://github.com/wppconnect-team/wa-js/issues/3463)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3976 (#3462) ([7c1c5a4](https://github.com/wppconnect-team/wa-js/commit/7c1c5a4)), closes [#3462](https://github.com/wppconnect-team/wa-js/issues/3462)
* **deps-dev:** update dependency webpack to ^5.107.0 (#3464) ([1cb6e4d](https://github.com/wppconnect-team/wa-js/commit/1cb6e4d)), closes [#3464](https://github.com/wppconnect-team/wa-js/issues/3464)

## 4.3.0 (2026-05-19)

### Features

* add WPP.lists module for personal account chat grouping (#3430) ([d0ade79](https://github.com/wppconnect-team/wa-js/commit/d0ade79)), closes [#3430](https://github.com/wppconnect-team/wa-js/issues/3430)

### Bug Fixes

* edit message (#3461) ([1561190](https://github.com/wppconnect-team/wa-js/commit/1561190)), closes [#3461](https://github.com/wppconnect-team/wa-js/issues/3461)
* resolve correct createGroup module to fix group creation on WA >= 2.3000.1039 (#3460) ([7c27339](https://github.com/wppconnect-team/wa-js/commit/7c27339)), closes [#3460](https://github.com/wppconnect-team/wa-js/issues/3460)

### Build System

* **deps-dev:** update commitlint monorepo to ^20.5.3 (#3423) ([aa31964](https://github.com/wppconnect-team/wa-js/commit/aa31964)), closes [#3423](https://github.com/wppconnect-team/wa-js/issues/3423)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.4.4 (#3444) ([690d229](https://github.com/wppconnect-team/wa-js/commit/690d229)), closes [#3444](https://github.com/wppconnect-team/wa-js/issues/3444)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3955 (#3432) ([1875ab7](https://github.com/wppconnect-team/wa-js/commit/1875ab7)), closes [#3432](https://github.com/wppconnect-team/wa-js/issues/3432)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3956 (#3436) ([145c712](https://github.com/wppconnect-team/wa-js/commit/145c712)), closes [#3436](https://github.com/wppconnect-team/wa-js/issues/3436)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3957 (#3441) ([39ac461](https://github.com/wppconnect-team/wa-js/commit/39ac461)), closes [#3441](https://github.com/wppconnect-team/wa-js/issues/3441)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3958 (#3443) ([31d853e](https://github.com/wppconnect-team/wa-js/commit/31d853e)), closes [#3443](https://github.com/wppconnect-team/wa-js/issues/3443)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3959 (#3450) ([2e0f2ef](https://github.com/wppconnect-team/wa-js/commit/2e0f2ef)), closes [#3450](https://github.com/wppconnect-team/wa-js/issues/3450)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3960 (#3455) ([377c0b3](https://github.com/wppconnect-team/wa-js/commit/377c0b3)), closes [#3455](https://github.com/wppconnect-team/wa-js/issues/3455)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3961 (#3457) ([4d4c873](https://github.com/wppconnect-team/wa-js/commit/4d4c873)), closes [#3457](https://github.com/wppconnect-team/wa-js/issues/3457)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3967 (#3459) ([399fa14](https://github.com/wppconnect-team/wa-js/commit/399fa14)), closes [#3459](https://github.com/wppconnect-team/wa-js/issues/3459)
* **deps-dev:** update dependency compressorjs to ^1.3.0 (#3446) ([c8622aa](https://github.com/wppconnect-team/wa-js/commit/c8622aa)), closes [#3446](https://github.com/wppconnect-team/wa-js/issues/3446)
* **deps-dev:** update dependency conventional-changelog-angular to ^8.3.1 (#3433) ([6afd44a](https://github.com/wppconnect-team/wa-js/commit/6afd44a)), closes [#3433](https://github.com/wppconnect-team/wa-js/issues/3433)
* **deps-dev:** update dependency eslint to ^10.4.0 (#3447) ([0c8f93f](https://github.com/wppconnect-team/wa-js/commit/0c8f93f)), closes [#3447](https://github.com/wppconnect-team/wa-js/issues/3447)
* **deps-dev:** update dependency prettier to ^3.8.3 (#3434) ([f1b5deb](https://github.com/wppconnect-team/wa-js/commit/f1b5deb)), closes [#3434](https://github.com/wppconnect-team/wa-js/issues/3434)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.6.0 (#3448) ([c80eddb](https://github.com/wppconnect-team/wa-js/commit/c80eddb)), closes [#3448](https://github.com/wppconnect-team/wa-js/issues/3448)
* **deps-dev:** update dependency ts-loader to ^9.5.7 (#3437) ([92f2aa4](https://github.com/wppconnect-team/wa-js/commit/92f2aa4)), closes [#3437](https://github.com/wppconnect-team/wa-js/issues/3437)
* **deps-dev:** update dependency typedoc to ^0.28.19 (#3438) ([600470a](https://github.com/wppconnect-team/wa-js/commit/600470a)), closes [#3438](https://github.com/wppconnect-team/wa-js/issues/3438)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^4.1.3 (#3440) ([2acebd0](https://github.com/wppconnect-team/wa-js/commit/2acebd0)), closes [#3440](https://github.com/wppconnect-team/wa-js/issues/3440)
* **deps-dev:** update dependency webpack to ^5.106.2 (#3449) ([9c3332b](https://github.com/wppconnect-team/wa-js/commit/9c3332b)), closes [#3449](https://github.com/wppconnect-team/wa-js/issues/3449)
* **deps-dev:** update dependency webpack-cli to v7 (#3392) ([701172d](https://github.com/wppconnect-team/wa-js/commit/701172d)), closes [#3392](https://github.com/wppconnect-team/wa-js/issues/3392)
* **deps-dev:** update playwright monorepo to ^1.60.0 (#3451) ([f8da8b4](https://github.com/wppconnect-team/wa-js/commit/f8da8b4)), closes [#3451](https://github.com/wppconnect-team/wa-js/issues/3451)
* **deps-dev:** update typescript-eslint monorepo to ^8.59.3 (#3452) ([559d44a](https://github.com/wppconnect-team/wa-js/commit/559d44a)), closes [#3452](https://github.com/wppconnect-team/wa-js/issues/3452)
* **deps-dev:** update typescript-eslint monorepo to ^8.59.4 (#3458) ([9d7a16f](https://github.com/wppconnect-team/wa-js/commit/9d7a16f)), closes [#3458](https://github.com/wppconnect-team/wa-js/issues/3458)
* **deps:** update node.js to v24.15.0 (#3453) ([36b1628](https://github.com/wppconnect-team/wa-js/commit/36b1628)), closes [#3453](https://github.com/wppconnect-team/wa-js/issues/3453)

### Continuous Integration

* **deps:** update actions/setup-node action to v6.4.0 (#3454) ([a237bf5](https://github.com/wppconnect-team/wa-js/commit/a237bf5)), closes [#3454](https://github.com/wppconnect-team/wa-js/issues/3454)
* **deps:** update meedamian/github-release action to v2.0.3 (#3442) ([0110396](https://github.com/wppconnect-team/wa-js/commit/0110396)), closes [#3442](https://github.com/wppconnect-team/wa-js/issues/3442)

### Chores

* bump wa-version (#3431) ([096d424](https://github.com/wppconnect-team/wa-js/commit/096d424)), closes [#3431](https://github.com/wppconnect-team/wa-js/issues/3431)
* making easier to new contributors adding LLM instructions to help debug and contribute (#3435) ([1753b00](https://github.com/wppconnect-team/wa-js/commit/1753b00)), closes [#3435](https://github.com/wppconnect-team/wa-js/issues/3435)

## 4.2.0 (2026-05-15)

### Features

* add smoke tests for WPP bundle validation and module function exposure (#3427) ([b4604ae](https://github.com/wppconnect-team/wa-js/commit/b4604ae)), closes [#3427](https://github.com/wppconnect-team/wa-js/issues/3427)
* update logout reasons and add logoutReason module (#3424) ([456764b](https://github.com/wppconnect-team/wa-js/commit/456764b)), closes [#3424](https://github.com/wppconnect-team/wa-js/issues/3424)

### Bug Fixes

* add optional chaining to prevent runtime errors in registerUpdateOrderEvent (#3422) ([a5e96ea](https://github.com/wppconnect-team/wa-js/commit/a5e96ea)), closes [#3422](https://github.com/wppconnect-team/wa-js/issues/3422)
* alpha publish tags (#3426) ([83395ed](https://github.com/wppconnect-team/wa-js/commit/83395ed)), closes [#3426](https://github.com/wppconnect-team/wa-js/issues/3426)
* remove outdated pre-lid release patches (#3425) ([aadc862](https://github.com/wppconnect-team/wa-js/commit/aadc862)), closes [#3425](https://github.com/wppconnect-team/wa-js/issues/3425)
* update getSearchContext call signature for WA >= 2.3000 (#3429) ([17102da](https://github.com/wppconnect-team/wa-js/commit/17102da)), closes [#3429](https://github.com/wppconnect-team/wa-js/issues/3429)

### Continuous Integration

* **deps:** update nick-invision/retry action to v4 (#3393) ([ceb388e](https://github.com/wppconnect-team/wa-js/commit/ceb388e)), closes [#3393](https://github.com/wppconnect-team/wa-js/issues/3393)

## 4.1.0 (2026-05-04)

### Bug Fixes

* remove SYNCING mode from isReadyMode check in register function (#3417) ([311b495](https://github.com/wppconnect-team/wa-js/commit/311b495)), closes [#3417](https://github.com/wppconnect-team/wa-js/issues/3417)

## 4.0.0 (2026-04-29)

### Features

* add BackendEventBus and register backend event handling (#3416) ([75ca156](https://github.com/wppconnect-team/wa-js/commit/75ca156)), closes [#3416](https://github.com/wppconnect-team/wa-js/issues/3416)
* add changelog configuration and update scripts for changelog generation (#3415) ([cdd7c0a](https://github.com/wppconnect-team/wa-js/commit/cdd7c0a)), closes [#3415](https://github.com/wppconnect-team/wa-js/issues/3415)
* queryUsernameExists support (#3412) ([3e1c578](https://github.com/wppconnect-team/wa-js/commit/3e1c578)), closes [#3412](https://github.com/wppconnect-team/wa-js/issues/3412)

### Bug Fixes

* update naming convention for queryUsernameExists function and add new module (#3413) ([3965cb4](https://github.com/wppconnect-team/wa-js/commit/3965cb4)), closes [#3413](https://github.com/wppconnect-team/wa-js/issues/3413)

### Code Refactoring

* optimized loader and renamed webpack to loader ([be31b9f](https://github.com/wppconnect-team/wa-js/commit/be31b9f))

## <small>3.23.4 (2026-04-17)</small>

### Bug Fixes

* disconnection after reading qrcode - flushing during sync (#3409) ([428ee01](https://github.com/wppconnect-team/wa-js/commit/428ee01)), closes [#3409](https://github.com/wppconnect-team/wa-js/issues/3409)

## <small>3.23.3 (2026-04-09)</small>

### Bug Fixes

* example in getNotes function documentation (#3404) ([a8d84b0](https://github.com/wppconnect-team/wa-js/commit/a8d84b0)), closes [#3404](https://github.com/wppconnect-team/wa-js/issues/3404)
* refactor incoming call event registration for improved handling (#3406) ([db6a588](https://github.com/wppconnect-team/wa-js/commit/db6a588)), closes [#3406](https://github.com/wppconnect-team/wa-js/issues/3406)

### Build System

* **deps-dev:** update commitlint monorepo to ^20.5.0 (#3379) ([b766950](https://github.com/wppconnect-team/wa-js/commit/b766950)), closes [#3379](https://github.com/wppconnect-team/wa-js/issues/3379)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.3.3 (#3381) ([a071749](https://github.com/wppconnect-team/wa-js/commit/a071749)), closes [#3381](https://github.com/wppconnect-team/wa-js/issues/3381)
* **deps-dev:** update dependency @types/debug to ^4.1.13 (#3388) ([201d455](https://github.com/wppconnect-team/wa-js/commit/201d455)), closes [#3388](https://github.com/wppconnect-team/wa-js/issues/3388)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3486 (#3385) ([4c30335](https://github.com/wppconnect-team/wa-js/commit/4c30335)), closes [#3385](https://github.com/wppconnect-team/wa-js/issues/3385)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3514 (#3387) ([41ccf83](https://github.com/wppconnect-team/wa-js/commit/41ccf83)), closes [#3387](https://github.com/wppconnect-team/wa-js/issues/3387)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3521 (#3395) ([a56b797](https://github.com/wppconnect-team/wa-js/commit/a56b797)), closes [#3395](https://github.com/wppconnect-team/wa-js/issues/3395)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3526 (#3397) ([6eaf936](https://github.com/wppconnect-team/wa-js/commit/6eaf936)), closes [#3397](https://github.com/wppconnect-team/wa-js/issues/3397)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3536 (#3400) ([57bb708](https://github.com/wppconnect-team/wa-js/commit/57bb708)), closes [#3400](https://github.com/wppconnect-team/wa-js/issues/3400)
* **deps-dev:** update dependency conventional-changelog-angular to ^8.3.0 (#3386) ([123dd3b](https://github.com/wppconnect-team/wa-js/commit/123dd3b)), closes [#3386](https://github.com/wppconnect-team/wa-js/issues/3386)
* **deps-dev:** update dependency eslint to ^10.1.0 (#3394) ([7bf0a9c](https://github.com/wppconnect-team/wa-js/commit/7bf0a9c)), closes [#3394](https://github.com/wppconnect-team/wa-js/issues/3394)
* **deps-dev:** update dependency lint-staged to ^16.4.0 (#3389) ([025b380](https://github.com/wppconnect-team/wa-js/commit/025b380)), closes [#3389](https://github.com/wppconnect-team/wa-js/issues/3389)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.4.0 (#3383) ([798302d](https://github.com/wppconnect-team/wa-js/commit/798302d)), closes [#3383](https://github.com/wppconnect-team/wa-js/issues/3383)
* **deps-dev:** update dependency typedoc to ^0.28.18 (#3398) ([902fbe1](https://github.com/wppconnect-team/wa-js/commit/902fbe1)), closes [#3398](https://github.com/wppconnect-team/wa-js/issues/3398)
* **deps-dev:** update typescript-eslint monorepo to ^8.57.1 (#3390) ([9384456](https://github.com/wppconnect-team/wa-js/commit/9384456)), closes [#3390](https://github.com/wppconnect-team/wa-js/issues/3390)
* **deps-dev:** update typescript-eslint monorepo to ^8.57.2 (#3399) ([751534b](https://github.com/wppconnect-team/wa-js/commit/751534b)), closes [#3399](https://github.com/wppconnect-team/wa-js/issues/3399)
* enhance release workflow with pre-release support and branch input (#3402) ([b56e7e0](https://github.com/wppconnect-team/wa-js/commit/b56e7e0)), closes [#3402](https://github.com/wppconnect-team/wa-js/issues/3402)

### Chores

* **deps:** lock file maintenance (#3396) ([42fca99](https://github.com/wppconnect-team/wa-js/commit/42fca99)), closes [#3396](https://github.com/wppconnect-team/wa-js/issues/3396)

## <small>3.23.2 (2026-03-18)</small>

### Bug Fixes

* update exportModule to correctly reference WAWebDBCreateLidPnMap (#3384) ([8c8680a](https://github.com/wppconnect-team/wa-js/commit/8c8680a)), closes [#3384](https://github.com/wppconnect-team/wa-js/issues/3384)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3477 (#3376) ([b2e5ef8](https://github.com/wppconnect-team/wa-js/commit/b2e5ef8)), closes [#3376](https://github.com/wppconnect-team/wa-js/issues/3376)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3479 (#3380) ([a098127](https://github.com/wppconnect-team/wa-js/commit/a098127)), closes [#3380](https://github.com/wppconnect-team/wa-js/issues/3380)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3481 (#3382) ([34fdbf8](https://github.com/wppconnect-team/wa-js/commit/34fdbf8)), closes [#3382](https://github.com/wppconnect-team/wa-js/issues/3382)
* **deps-dev:** update dependency eslint to ^10.0.3 (#3377) ([d1463e2](https://github.com/wppconnect-team/wa-js/commit/d1463e2)), closes [#3377](https://github.com/wppconnect-team/wa-js/issues/3377)
* **deps-dev:** update dependency webpack to ^5.105.4 (#3378) ([a88f8d3](https://github.com/wppconnect-team/wa-js/commit/a88f8d3)), closes [#3378](https://github.com/wppconnect-team/wa-js/issues/3378)

### Continuous Integration

* **deps:** update actions/checkout action to v6 (#3353) ([d37db47](https://github.com/wppconnect-team/wa-js/commit/d37db47)), closes [#3353](https://github.com/wppconnect-team/wa-js/issues/3353)
* **deps:** update actions/setup-node action (#3363) ([a6d1db8](https://github.com/wppconnect-team/wa-js/commit/a6d1db8)), closes [#3363](https://github.com/wppconnect-team/wa-js/issues/3363)
* **deps:** update dependency node to v24.14.0 (#3356) ([eff4c43](https://github.com/wppconnect-team/wa-js/commit/eff4c43)), closes [#3356](https://github.com/wppconnect-team/wa-js/issues/3356)

## <small>3.23.1 (2026-03-04)</small>

### Bug Fixes

* event name to follow project pattern (#3371) ([217158d](https://github.com/wppconnect-team/wa-js/commit/217158d)), closes [#3371](https://github.com/wppconnect-team/wa-js/issues/3371)

### Documentation

* update README to include stream mode and connection events (#3370) ([9032b78](https://github.com/wppconnect-team/wa-js/commit/9032b78)), closes [#3370](https://github.com/wppconnect-team/wa-js/issues/3370)

## 3.23.0 (2026-03-04)

### Features

* add stream mode and info events with corresponding handlers (#3368) ([79e9a9e](https://github.com/wppconnect-team/wa-js/commit/79e9a9e)), closes [#3368](https://github.com/wppconnect-team/wa-js/issues/3368)

### Bug Fixes

* handle case when newAPIAnchor is not provided in getMessages (#3369) ([b4452a2](https://github.com/wppconnect-team/wa-js/commit/b4452a2)), closes [#3369](https://github.com/wppconnect-team/wa-js/issues/3369)

## <small>3.22.1 (2026-02-28)</small>

### Bug Fixes

* getMessages (msgs.push is not a function) (#3364) ([bdd2224](https://github.com/wppconnect-team/wa-js/commit/bdd2224)), closes [#3364](https://github.com/wppconnect-team/wa-js/issues/3364)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3346 (#3348) ([f5ebc16](https://github.com/wppconnect-team/wa-js/commit/f5ebc16)), closes [#3348](https://github.com/wppconnect-team/wa-js/issues/3348)

## 3.22.0 (2026-02-27)

### Features

* add IndexedDB functions for message retrieval by rowId (#3354) ([060119c](https://github.com/wppconnect-team/wa-js/commit/060119c)), closes [#3354](https://github.com/wppconnect-team/wa-js/issues/3354)

### Bug Fixes

* getMessages (msgFindQuery doesn't exist anymore) (#3360) ([568fc3d](https://github.com/wppconnect-team/wa-js/commit/568fc3d)), closes [#3360](https://github.com/wppconnect-team/wa-js/issues/3360)
* invalid wid value for object & openChatBottom (#3357) ([e5b9aa8](https://github.com/wppconnect-team/wa-js/commit/e5b9aa8)), closes [#3357](https://github.com/wppconnect-team/wa-js/issues/3357)
* sendMessage to lids (#3362) ([22aaef3](https://github.com/wppconnect-team/wa-js/commit/22aaef3)), closes [#3362](https://github.com/wppconnect-team/wa-js/issues/3362)

### Build System

* **deps-dev:** update dependency webpack to ^5.105.3 (#3351) ([c347662](https://github.com/wppconnect-team/wa-js/commit/c347662)), closes [#3351](https://github.com/wppconnect-team/wa-js/issues/3351)

## <small>3.20.1 (2026-02-26)</small>

### Bug Fixes

* Simplify npm configuration in publish workflow ([b3b2f05](https://github.com/wppconnect-team/wa-js/commit/b3b2f05))

## <small>3.21.1 (2026-02-26)</small>

### Features

* add new chat event registration and interface definition (#3350) ([665a5bb](https://github.com/wppconnect-team/wa-js/commit/665a5bb)), closes [#3350](https://github.com/wppconnect-team/wa-js/issues/3350)
* Added call.enableCallInterface function (#3340) ([8d3aad2](https://github.com/wppconnect-team/wa-js/commit/8d3aad2)), closes [#3340](https://github.com/wppconnect-team/wa-js/issues/3340)

### Bug Fixes

* Add PERSONAL_TOKEN environment variable to workflow ([34c249e](https://github.com/wppconnect-team/wa-js/commit/34c249e))
* main ready issue for new Stream mode 'QR' (#3339) ([4703a8f](https://github.com/wppconnect-team/wa-js/commit/4703a8f)), closes [#3339](https://github.com/wppconnect-team/wa-js/issues/3339)
* Refactor npm config sanitization in publish workflow ([251f6fd](https://github.com/wppconnect-team/wa-js/commit/251f6fd))
* Sanitize npm auth and add debug step in publish workflow ([e299868](https://github.com/wppconnect-team/wa-js/commit/e299868))
* support named params on sendToChat function (#3322) ([3124528](https://github.com/wppconnect-team/wa-js/commit/3124528)), closes [#3322](https://github.com/wppconnect-team/wa-js/issues/3322)
* Update GitHub Actions workflow to use latest actions ([2a3dd1c](https://github.com/wppconnect-team/wa-js/commit/2a3dd1c))
* Update publish workflow for npm publishing ([12d55f4](https://github.com/wppconnect-team/wa-js/commit/12d55f4))

### Build System

* **deps-dev:** update commitlint monorepo to ^20.4.2 (#3317) ([dd80b74](https://github.com/wppconnect-team/wa-js/commit/dd80b74)), closes [#3317](https://github.com/wppconnect-team/wa-js/issues/3317)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.2.2 (#3316) ([837bc33](https://github.com/wppconnect-team/wa-js/commit/837bc33)), closes [#3316](https://github.com/wppconnect-team/wa-js/issues/3316)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.2.3 (#3325) ([11f3dbf](https://github.com/wppconnect-team/wa-js/commit/11f3dbf)), closes [#3325](https://github.com/wppconnect-team/wa-js/issues/3325)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.2.4 (#3327) ([dc1aaba](https://github.com/wppconnect-team/wa-js/commit/dc1aaba)), closes [#3327](https://github.com/wppconnect-team/wa-js/issues/3327)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3259 (#3306) ([4c81e18](https://github.com/wppconnect-team/wa-js/commit/4c81e18)), closes [#3306](https://github.com/wppconnect-team/wa-js/issues/3306)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3260 (#3308) ([05f2263](https://github.com/wppconnect-team/wa-js/commit/05f2263)), closes [#3308](https://github.com/wppconnect-team/wa-js/issues/3308)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3261 (#3309) ([3cf48af](https://github.com/wppconnect-team/wa-js/commit/3cf48af)), closes [#3309](https://github.com/wppconnect-team/wa-js/issues/3309)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3282 (#3310) ([de5870d](https://github.com/wppconnect-team/wa-js/commit/de5870d)), closes [#3310](https://github.com/wppconnect-team/wa-js/issues/3310)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3294 (#3315) ([eeb1535](https://github.com/wppconnect-team/wa-js/commit/eeb1535)), closes [#3315](https://github.com/wppconnect-team/wa-js/issues/3315)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3295 (#3323) ([cc395b8](https://github.com/wppconnect-team/wa-js/commit/cc395b8)), closes [#3323](https://github.com/wppconnect-team/wa-js/issues/3323)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3299 (#3326) ([204e61f](https://github.com/wppconnect-team/wa-js/commit/204e61f)), closes [#3326](https://github.com/wppconnect-team/wa-js/issues/3326)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3305 (#3329) ([88db3da](https://github.com/wppconnect-team/wa-js/commit/88db3da)), closes [#3329](https://github.com/wppconnect-team/wa-js/issues/3329)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3307 (#3330) ([5119dd9](https://github.com/wppconnect-team/wa-js/commit/5119dd9)), closes [#3330](https://github.com/wppconnect-team/wa-js/issues/3330)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3311 (#3331) ([69c505f](https://github.com/wppconnect-team/wa-js/commit/69c505f)), closes [#3331](https://github.com/wppconnect-team/wa-js/issues/3331)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3314 (#3334) ([86eb717](https://github.com/wppconnect-team/wa-js/commit/86eb717)), closes [#3334](https://github.com/wppconnect-team/wa-js/issues/3334)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3322 (#3335) ([05330c6](https://github.com/wppconnect-team/wa-js/commit/05330c6)), closes [#3335](https://github.com/wppconnect-team/wa-js/issues/3335)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3328 (#3341) ([257cfb2](https://github.com/wppconnect-team/wa-js/commit/257cfb2)), closes [#3341](https://github.com/wppconnect-team/wa-js/issues/3341)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3330 (#3347) ([4c55476](https://github.com/wppconnect-team/wa-js/commit/4c55476)), closes [#3347](https://github.com/wppconnect-team/wa-js/issues/3347)
* **deps-dev:** update dependency eslint to ^10.0.1 (#3328) ([27f98e2](https://github.com/wppconnect-team/wa-js/commit/27f98e2)), closes [#3328](https://github.com/wppconnect-team/wa-js/issues/3328)
* **deps-dev:** update dependency eslint to ^10.0.2 (#3337) ([0a5bb1a](https://github.com/wppconnect-team/wa-js/commit/0a5bb1a)), closes [#3337](https://github.com/wppconnect-team/wa-js/issues/3337)
* **deps-dev:** update dependency typedoc to ^0.28.17 (#3307) ([a065192](https://github.com/wppconnect-team/wa-js/commit/a065192)), closes [#3307](https://github.com/wppconnect-team/wa-js/issues/3307)
* **deps-dev:** update typescript-eslint monorepo to ^8.56.0 (#3312) ([f5077ff](https://github.com/wppconnect-team/wa-js/commit/f5077ff)), closes [#3312](https://github.com/wppconnect-team/wa-js/issues/3312)
* **deps-dev:** update typescript-eslint monorepo to ^8.56.1 (#3336) ([0a37d9e](https://github.com/wppconnect-team/wa-js/commit/0a37d9e)), closes [#3336](https://github.com/wppconnect-team/wa-js/issues/3336)
* **deps:** update node.js to v24.14.0 (#3342) ([75a5029](https://github.com/wppconnect-team/wa-js/commit/75a5029)), closes [#3342](https://github.com/wppconnect-team/wa-js/issues/3342)

### Continuous Integration

* **deps:** update dependency node to v24.14.0 (#3345) ([dfe8b6b](https://github.com/wppconnect-team/wa-js/commit/dfe8b6b)), closes [#3345](https://github.com/wppconnect-team/wa-js/issues/3345)

### Chores

* **deps:** lock file maintenance (#3311) ([c2306c5](https://github.com/wppconnect-team/wa-js/commit/c2306c5)), closes [#3311](https://github.com/wppconnect-team/wa-js/issues/3311)
* **deps:** lock file maintenance (#3332) ([807669e](https://github.com/wppconnect-team/wa-js/commit/807669e)), closes [#3332](https://github.com/wppconnect-team/wa-js/issues/3332)

## 3.21.0 (2026-02-13)

### Features

* **contact:** add reportContact function to report contacts to WhatsApp (#3260) ([1df9891](https://github.com/wppconnect-team/wa-js/commit/1df9891)), closes [#3260](https://github.com/wppconnect-team/wa-js/issues/3260)
* enhance main ready event handling and add debug logging (#3270) ([b1651f7](https://github.com/wppconnect-team/wa-js/commit/b1651f7)), closes [#3270](https://github.com/wppconnect-team/wa-js/issues/3270)
* implement LRU caching for media downloads and add toArrayBuffer utility (#3242) ([433c56c](https://github.com/wppconnect-team/wa-js/commit/433c56c)), closes [#3242](https://github.com/wppconnect-team/wa-js/issues/3242)
* update nightly workflow to use Node 24.13.0 and publish alpha versions to NPM (#3246) ([208bca1](https://github.com/wppconnect-team/wa-js/commit/208bca1)), closes [#3246](https://github.com/wppconnect-team/wa-js/issues/3246)

### Bug Fixes

* alpha-release publishing attempt3 (#3248) ([01b80c8](https://github.com/wppconnect-team/wa-js/commit/01b80c8)), closes [#3248](https://github.com/wppconnect-team/wa-js/issues/3248)
* attempt 4 to release alpha versions (#3249) ([34ebf2d](https://github.com/wppconnect-team/wa-js/commit/34ebf2d)), closes [#3249](https://github.com/wppconnect-team/wa-js/issues/3249)
* group messages not updating ack (#3303) ([d322f1a](https://github.com/wppconnect-team/wa-js/commit/d322f1a)), closes [#3303](https://github.com/wppconnect-team/wa-js/issues/3303)
* move getSearchVerifiedName and getHeader to WAWebFrontendContactGetters (#3243) ([eae6ae1](https://github.com/wppconnect-team/wa-js/commit/eae6ae1)), closes [#3243](https://github.com/wppconnect-team/wa-js/issues/3243)
* move NODE_AUTH_TOKEN environment variable to the correct step in nightly workflow (#3247) ([e631ed7](https://github.com/wppconnect-team/wa-js/commit/e631ed7)), closes [#3247](https://github.com/wppconnect-team/wa-js/issues/3247)
* update group message and chats checks to use id.isGroup() method (#3275) ([53e2cf6](https://github.com/wppconnect-team/wa-js/commit/53e2cf6)), closes [#3275](https://github.com/wppconnect-team/wa-js/issues/3275)
* update stores and module exports for compatibility with version 2.3000.1032534684 (#3272) ([bd9afd0](https://github.com/wppconnect-team/wa-js/commit/bd9afd0)), closes [#3272](https://github.com/wppconnect-team/wa-js/issues/3272)
* wa-version upgrade, WAWebUsernameGatingUtils not available anymore (#3298) ([d686277](https://github.com/wppconnect-team/wa-js/commit/d686277)), closes [#3298](https://github.com/wppconnect-team/wa-js/issues/3298)

### Build System

* **deps-dev:** update commitlint monorepo to ^20.4.0 (#3283) ([b3534af](https://github.com/wppconnect-team/wa-js/commit/b3534af)), closes [#3283](https://github.com/wppconnect-team/wa-js/issues/3283)
* **deps-dev:** update commitlint monorepo to ^20.4.1 (#3287) ([094eee3](https://github.com/wppconnect-team/wa-js/commit/094eee3)), closes [#3287](https://github.com/wppconnect-team/wa-js/issues/3287)
* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.2.1 (#3292) ([54b497b](https://github.com/wppconnect-team/wa-js/commit/54b497b)), closes [#3292](https://github.com/wppconnect-team/wa-js/issues/3292)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3100 (#3234) ([3de2cfa](https://github.com/wppconnect-team/wa-js/commit/3de2cfa)), closes [#3234](https://github.com/wppconnect-team/wa-js/issues/3234)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3105 (#3235) ([0c18754](https://github.com/wppconnect-team/wa-js/commit/0c18754)), closes [#3235](https://github.com/wppconnect-team/wa-js/issues/3235)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3106 (#3237) ([15e0a16](https://github.com/wppconnect-team/wa-js/commit/15e0a16)), closes [#3237](https://github.com/wppconnect-team/wa-js/issues/3237)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3111 (#3239) ([c635157](https://github.com/wppconnect-team/wa-js/commit/c635157)), closes [#3239](https://github.com/wppconnect-team/wa-js/issues/3239)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3114 (#3253) ([58446ec](https://github.com/wppconnect-team/wa-js/commit/58446ec)), closes [#3253](https://github.com/wppconnect-team/wa-js/issues/3253)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3120 (#3254) ([00c19d8](https://github.com/wppconnect-team/wa-js/commit/00c19d8)), closes [#3254](https://github.com/wppconnect-team/wa-js/issues/3254)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3122 (#3256) ([109dc2a](https://github.com/wppconnect-team/wa-js/commit/109dc2a)), closes [#3256](https://github.com/wppconnect-team/wa-js/issues/3256)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3125 (#3261) ([7e2d273](https://github.com/wppconnect-team/wa-js/commit/7e2d273)), closes [#3261](https://github.com/wppconnect-team/wa-js/issues/3261)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3134 (#3264) ([ea1eb40](https://github.com/wppconnect-team/wa-js/commit/ea1eb40)), closes [#3264](https://github.com/wppconnect-team/wa-js/issues/3264)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3141 (#3269) ([09b839f](https://github.com/wppconnect-team/wa-js/commit/09b839f)), closes [#3269](https://github.com/wppconnect-team/wa-js/issues/3269)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3147 (#3276) ([af344e0](https://github.com/wppconnect-team/wa-js/commit/af344e0)), closes [#3276](https://github.com/wppconnect-team/wa-js/issues/3276)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3150 (#3279) ([a7ff2e8](https://github.com/wppconnect-team/wa-js/commit/a7ff2e8)), closes [#3279](https://github.com/wppconnect-team/wa-js/issues/3279)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3235 (#3281) ([bc0627f](https://github.com/wppconnect-team/wa-js/commit/bc0627f)), closes [#3281](https://github.com/wppconnect-team/wa-js/issues/3281)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3245 (#3300) ([1e623ac](https://github.com/wppconnect-team/wa-js/commit/1e623ac)), closes [#3300](https://github.com/wppconnect-team/wa-js/issues/3300)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3249 (#3304) ([5bd0882](https://github.com/wppconnect-team/wa-js/commit/5bd0882)), closes [#3304](https://github.com/wppconnect-team/wa-js/issues/3304)
* **deps-dev:** update dependency eslint to v10 (#3295) ([1c7ea4f](https://github.com/wppconnect-team/wa-js/commit/1c7ea4f)), closes [#3295](https://github.com/wppconnect-team/wa-js/issues/3295)
* **deps-dev:** update dependency prettier to ^3.8.1 (#3232) ([1894fd1](https://github.com/wppconnect-team/wa-js/commit/1894fd1)), closes [#3232](https://github.com/wppconnect-team/wa-js/issues/3232)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^5.1.1 (#3255) ([3c11dcd](https://github.com/wppconnect-team/wa-js/commit/3c11dcd)), closes [#3255](https://github.com/wppconnect-team/wa-js/issues/3255)
* **deps-dev:** update dependency webpack to ^5.105.0 (#3290) ([62dcd85](https://github.com/wppconnect-team/wa-js/commit/62dcd85)), closes [#3290](https://github.com/wppconnect-team/wa-js/issues/3290)
* **deps-dev:** update dependency webpack to ^5.105.1 (#3299) ([17e751b](https://github.com/wppconnect-team/wa-js/commit/17e751b)), closes [#3299](https://github.com/wppconnect-team/wa-js/issues/3299)
* **deps-dev:** update dependency webpack to ^5.105.2 (#3305) ([3d9c39d](https://github.com/wppconnect-team/wa-js/commit/3d9c39d)), closes [#3305](https://github.com/wppconnect-team/wa-js/issues/3305)
* **deps-dev:** update playwright monorepo to ^1.58.0 (#3240) ([9558ba7](https://github.com/wppconnect-team/wa-js/commit/9558ba7)), closes [#3240](https://github.com/wppconnect-team/wa-js/issues/3240)
* **deps-dev:** update playwright monorepo to ^1.58.1 (#3284) ([496c9c3](https://github.com/wppconnect-team/wa-js/commit/496c9c3)), closes [#3284](https://github.com/wppconnect-team/wa-js/issues/3284)
* **deps-dev:** update playwright monorepo to ^1.58.2 (#3294) ([85a9561](https://github.com/wppconnect-team/wa-js/commit/85a9561)), closes [#3294](https://github.com/wppconnect-team/wa-js/issues/3294)
* **deps-dev:** update typescript-eslint monorepo to ^8.54.0 (#3265) ([20e6679](https://github.com/wppconnect-team/wa-js/commit/20e6679)), closes [#3265](https://github.com/wppconnect-team/wa-js/issues/3265)
* **deps-dev:** update typescript-eslint monorepo to ^8.55.0 (#3301) ([089d15a](https://github.com/wppconnect-team/wa-js/commit/089d15a)), closes [#3301](https://github.com/wppconnect-team/wa-js/issues/3301)
* **deps:** update node.js to v24.13.1 (#3302) ([8e9a764](https://github.com/wppconnect-team/wa-js/commit/8e9a764)), closes [#3302](https://github.com/wppconnect-team/wa-js/issues/3302)

### Continuous Integration

* **deps:** update actions/checkout digest to de0fac2 (#3289) ([31679ea](https://github.com/wppconnect-team/wa-js/commit/31679ea)), closes [#3289](https://github.com/wppconnect-team/wa-js/issues/3289)
* remove unused npm registry URL and interactive runner step from nightly workflow (#3252) ([97589b1](https://github.com/wppconnect-team/wa-js/commit/97589b1)), closes [#3252](https://github.com/wppconnect-team/wa-js/issues/3252)

### Chores

* **deps:** lock file maintenance (#3262) ([7b88d0f](https://github.com/wppconnect-team/wa-js/commit/7b88d0f)), closes [#3262](https://github.com/wppconnect-team/wa-js/issues/3262)
* **deps:** lock file maintenance (#3286) ([d25b1a4](https://github.com/wppconnect-team/wa-js/commit/d25b1a4)), closes [#3286](https://github.com/wppconnect-team/wa-js/issues/3286)

### Other Changes

* Fix/newsletter mute toggle (#3257) ([5e9d629](https://github.com/wppconnect-team/wa-js/commit/5e9d629)), closes [#3257](https://github.com/wppconnect-team/wa-js/issues/3257)
* feat/newsletter-search-follow-unfollow (#3259) ([f823908](https://github.com/wppconnect-team/wa-js/commit/f823908)), closes [#3259](https://github.com/wppconnect-team/wa-js/issues/3259)
* Fix wa-source format command (#3268) ([f8ff5f5](https://github.com/wppconnect-team/wa-js/commit/f8ff5f5)), closes [#3268](https://github.com/wppconnect-team/wa-js/issues/3268)
* Manfe/alpha release rollback (#3251) ([c55a453](https://github.com/wppconnect-team/wa-js/commit/c55a453)), closes [#3251](https://github.com/wppconnect-team/wa-js/issues/3251)
* Manfe/alpha release attempt 5 (#3250) ([45caf8d](https://github.com/wppconnect-team/wa-js/commit/45caf8d)), closes [#3250](https://github.com/wppconnect-team/wa-js/issues/3250)
* Newsletter (mute, unmute) removed on version 2.3000.1032373751 (#3244) ([bb535d9](https://github.com/wppconnect-team/wa-js/commit/bb535d9)), closes [#3244](https://github.com/wppconnect-team/wa-js/issues/3244)

## 3.20.0 (2026-01-21)

### Features

* Ability to manage whatsapp theme  (#3233) ([9530a49](https://github.com/wppconnect-team/wa-js/commit/9530a49)), closes [#3233](https://github.com/wppconnect-team/wa-js/issues/3233)
* add auto-download settings functions (#3231) ([5ea83cb](https://github.com/wppconnect-team/wa-js/commit/5ea83cb)), closes [#3231](https://github.com/wppconnect-team/wa-js/issues/3231)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3099 (#3225) ([468d529](https://github.com/wppconnect-team/wa-js/commit/468d529)), closes [#3225](https://github.com/wppconnect-team/wa-js/issues/3225)

## <small>3.19.9 (2026-01-21)</small>

### Bug Fixes

* remove problematic fields from msgData during message rehydration (#3230) ([cab8e41](https://github.com/wppconnect-team/wa-js/commit/cab8e41)), closes [#3230](https://github.com/wppconnect-team/wa-js/issues/3230)

### Build System

* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.2.0 (#3220) ([8901840](https://github.com/wppconnect-team/wa-js/commit/8901840)), closes [#3220](https://github.com/wppconnect-team/wa-js/issues/3220)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3086 (#3221) ([e6248ca](https://github.com/wppconnect-team/wa-js/commit/e6248ca)), closes [#3221](https://github.com/wppconnect-team/wa-js/issues/3221)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3088 (#3223) ([01e571d](https://github.com/wppconnect-team/wa-js/commit/01e571d)), closes [#3223](https://github.com/wppconnect-team/wa-js/issues/3223)
* **deps-dev:** update dependency release-it to ^19.2.4 (#3226) ([4f5a105](https://github.com/wppconnect-team/wa-js/commit/4f5a105)), closes [#3226](https://github.com/wppconnect-team/wa-js/issues/3226)
* **deps-dev:** update typescript-eslint monorepo to ^8.53.1 (#3219) ([fcee5ae](https://github.com/wppconnect-team/wa-js/commit/fcee5ae)), closes [#3219](https://github.com/wppconnect-team/wa-js/issues/3219)

## <small>3.19.8 (2026-01-19)</small>

### Bug Fixes

* queryExists createLidPnMappings (#3216) ([61a338a](https://github.com/wppconnect-team/wa-js/commit/61a338a)), closes [#3216](https://github.com/wppconnect-team/wa-js/issues/3216)

### Build System

* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.1.12 (#3215) ([6ffb97b](https://github.com/wppconnect-team/wa-js/commit/6ffb97b)), closes [#3215](https://github.com/wppconnect-team/wa-js/issues/3215)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3074 (#3210) ([afcfc6f](https://github.com/wppconnect-team/wa-js/commit/afcfc6f)), closes [#3210](https://github.com/wppconnect-team/wa-js/issues/3210)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3079 (#3212) ([29fccab](https://github.com/wppconnect-team/wa-js/commit/29fccab)), closes [#3212](https://github.com/wppconnect-team/wa-js/issues/3212)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3081 (#3218) ([53223c3](https://github.com/wppconnect-team/wa-js/commit/53223c3)), closes [#3218](https://github.com/wppconnect-team/wa-js/issues/3218)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^5.1.0 (#3214) ([dbc349c](https://github.com/wppconnect-team/wa-js/commit/dbc349c)), closes [#3214](https://github.com/wppconnect-team/wa-js/issues/3214)

### Chores

* **deps:** lock file maintenance (#3213) ([54a0b31](https://github.com/wppconnect-team/wa-js/commit/54a0b31)), closes [#3213](https://github.com/wppconnect-team/wa-js/issues/3213)

## <small>3.19.7 (2026-01-18)</small>

### Features

* enhance migration state handling and add lidPnMappings utility (#3207) ([789bac0](https://github.com/wppconnect-team/wa-js/commit/789bac0)), closes [#3207](https://github.com/wppconnect-team/wa-js/issues/3207)
* update chat functions to use findOrCreateLatestChat for improved chat initialization (#3203) ([764ef15](https://github.com/wppconnect-team/wa-js/commit/764ef15)), closes [#3203](https://github.com/wppconnect-team/wa-js/issues/3203)

### Bug Fixes

* update sendSeen call to ensure immediate UI update for markIsRead (#3211) ([503c612](https://github.com/wppconnect-team/wa-js/commit/503c612)), closes [#3211](https://github.com/wppconnect-team/wa-js/issues/3211)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3055 (#3201) ([bbd7bc9](https://github.com/wppconnect-team/wa-js/commit/bbd7bc9)), closes [#3201](https://github.com/wppconnect-team/wa-js/issues/3201)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3062 (#3204) ([4c93a5c](https://github.com/wppconnect-team/wa-js/commit/4c93a5c)), closes [#3204](https://github.com/wppconnect-team/wa-js/issues/3204)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3067 (#3208) ([c3d88ec](https://github.com/wppconnect-team/wa-js/commit/c3d88ec)), closes [#3208](https://github.com/wppconnect-team/wa-js/issues/3208)

## <small>3.19.6 (2026-01-15)</small>

### Features

* ab props exposure to be able to debug between connections (#3193) ([6e4c52c](https://github.com/wppconnect-team/wa-js/commit/6e4c52c)), closes [#3193](https://github.com/wppconnect-team/wa-js/issues/3193)
* add script to compare WhatsApp Web source between two versions (#3200) ([dfd91f8](https://github.com/wppconnect-team/wa-js/commit/dfd91f8)), closes [#3200](https://github.com/wppconnect-team/wa-js/issues/3200)

### Bug Fixes

* alternate null wid (#3190) ([b221736](https://github.com/wppconnect-team/wa-js/commit/b221736)), closes [#3190](https://github.com/wppconnect-team/wa-js/issues/3190)
* sendSeen / markUnread (#3198) ([424ac26](https://github.com/wppconnect-team/wa-js/commit/424ac26)), closes [#3198](https://github.com/wppconnect-team/wa-js/issues/3198)
* update toUserLid export to include toUserLidOrThrow for backward compatibility (#3196) ([67fbbd2](https://github.com/wppconnect-team/wa-js/commit/67fbbd2)), closes [#3196](https://github.com/wppconnect-team/wa-js/issues/3196)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3031 (#3181) ([0bdcc27](https://github.com/wppconnect-team/wa-js/commit/0bdcc27)), closes [#3181](https://github.com/wppconnect-team/wa-js/issues/3181)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3040 (#3182) ([3562180](https://github.com/wppconnect-team/wa-js/commit/3562180)), closes [#3182](https://github.com/wppconnect-team/wa-js/issues/3182)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3044 (#3184) ([57194f9](https://github.com/wppconnect-team/wa-js/commit/57194f9)), closes [#3184](https://github.com/wppconnect-team/wa-js/issues/3184)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3048 (#3185) ([41adec3](https://github.com/wppconnect-team/wa-js/commit/41adec3)), closes [#3185](https://github.com/wppconnect-team/wa-js/issues/3185)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3051 (#3191) ([f689653](https://github.com/wppconnect-team/wa-js/commit/f689653)), closes [#3191](https://github.com/wppconnect-team/wa-js/issues/3191)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3052 (#3199) ([d92945e](https://github.com/wppconnect-team/wa-js/commit/d92945e)), closes [#3199](https://github.com/wppconnect-team/wa-js/issues/3199)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.5.5 (#3187) ([2694f19](https://github.com/wppconnect-team/wa-js/commit/2694f19)), closes [#3187](https://github.com/wppconnect-team/wa-js/issues/3187)
* **deps-dev:** update dependency prettier to ^3.8.0 (#3192) ([d728add](https://github.com/wppconnect-team/wa-js/commit/d728add)), closes [#3192](https://github.com/wppconnect-team/wa-js/issues/3192)
* **deps-dev:** update dependency typedoc to ^0.28.16 (#3179) ([8e2e567](https://github.com/wppconnect-team/wa-js/commit/8e2e567)), closes [#3179](https://github.com/wppconnect-team/wa-js/issues/3179)
* **deps-dev:** update typescript-eslint monorepo to ^8.53.0 (#3180) ([965ccd3](https://github.com/wppconnect-team/wa-js/commit/965ccd3)), closes [#3180](https://github.com/wppconnect-team/wa-js/issues/3180)
* **deps:** update node.js to v24.13.0 (#3183) ([14d9517](https://github.com/wppconnect-team/wa-js/commit/14d9517)), closes [#3183](https://github.com/wppconnect-team/wa-js/issues/3183)

### Continuous Integration

* **deps:** update actions/setup-node action to v6.2.0 (#3197) ([299f361](https://github.com/wppconnect-team/wa-js/commit/299f361)), closes [#3197](https://github.com/wppconnect-team/wa-js/issues/3197)
* **deps:** update dependency node to v24.13.0 (#3186) ([7a3cc18](https://github.com/wppconnect-team/wa-js/commit/7a3cc18)), closes [#3186](https://github.com/wppconnect-team/wa-js/issues/3186)

## <small>3.19.5 (2026-01-12)</small>

### Features

* Add ignore group metadata chat list (#3161) ([4d95a9e](https://github.com/wppconnect-team/wa-js/commit/4d95a9e)), closes [#3161](https://github.com/wppconnect-team/wa-js/issues/3161)

### Bug Fixes

* **contact:** update getMentionName to fallback on getFormattedShortName (#3178) ([4823dc9](https://github.com/wppconnect-team/wa-js/commit/4823dc9)), closes [#3178](https://github.com/wppconnect-team/wa-js/issues/3178)

### Build System

* **deps-dev:** update commitlint monorepo to ^20.3.1 (#3173) ([be0ad91](https://github.com/wppconnect-team/wa-js/commit/be0ad91)), closes [#3173](https://github.com/wppconnect-team/wa-js/issues/3173)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2989 (#3166) ([aa2278a](https://github.com/wppconnect-team/wa-js/commit/aa2278a)), closes [#3166](https://github.com/wppconnect-team/wa-js/issues/3166)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2998 (#3169) ([a457bf8](https://github.com/wppconnect-team/wa-js/commit/a457bf8)), closes [#3169](https://github.com/wppconnect-team/wa-js/issues/3169)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3000 (#3171) ([daa04d6](https://github.com/wppconnect-team/wa-js/commit/daa04d6)), closes [#3171](https://github.com/wppconnect-team/wa-js/issues/3171)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3006 (#3172) ([ea0814c](https://github.com/wppconnect-team/wa-js/commit/ea0814c)), closes [#3172](https://github.com/wppconnect-team/wa-js/issues/3172)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3030 (#3174) ([9fc1f82](https://github.com/wppconnect-team/wa-js/commit/9fc1f82)), closes [#3174](https://github.com/wppconnect-team/wa-js/issues/3174)
* **deps-dev:** update dependency release-it to ^19.2.3 (#3170) ([629ad63](https://github.com/wppconnect-team/wa-js/commit/629ad63)), closes [#3170](https://github.com/wppconnect-team/wa-js/issues/3170)
* **deps-dev:** update typescript-eslint monorepo to ^8.52.0 (#3167) ([03ab555](https://github.com/wppconnect-team/wa-js/commit/03ab555)), closes [#3167](https://github.com/wppconnect-team/wa-js/issues/3167)

### Continuous Integration

* **deps:** update actions/cache action to v5 (#3140) ([9e8f69a](https://github.com/wppconnect-team/wa-js/commit/9e8f69a)), closes [#3140](https://github.com/wppconnect-team/wa-js/issues/3140)
* **deps:** update dependency node to v24.12.0 (#3168) ([f17f15d](https://github.com/wppconnect-team/wa-js/commit/f17f15d)), closes [#3168](https://github.com/wppconnect-team/wa-js/issues/3168)

### Chores

* **deps:** lock file maintenance (#3165) ([adf7b07](https://github.com/wppconnect-team/wa-js/commit/adf7b07)), closes [#3165](https://github.com/wppconnect-team/wa-js/issues/3165)

## <small>3.19.4 (2026-01-05)</small>

### Features

* ability to reply meta template buttons (#3128) ([7dedbcf](https://github.com/wppconnect-team/wa-js/commit/7dedbcf)), closes [#3128](https://github.com/wppconnect-team/wa-js/issues/3128)

### Build System

* **deps-dev:** update commitlint monorepo to ^20.2.0 (#3125) ([6bb5be3](https://github.com/wppconnect-team/wa-js/commit/6bb5be3)), closes [#3125](https://github.com/wppconnect-team/wa-js/issues/3125)
* **deps-dev:** update commitlint monorepo to ^20.3.0 (#3164) ([804ee43](https://github.com/wppconnect-team/wa-js/commit/804ee43)), closes [#3164](https://github.com/wppconnect-team/wa-js/issues/3164)
* **deps-dev:** update dependency @types/shelljs to ^0.10.0 (#3141) ([2dd91e7](https://github.com/wppconnect-team/wa-js/commit/2dd91e7)), closes [#3141](https://github.com/wppconnect-team/wa-js/issues/3141)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2729 (#3100) ([63997af](https://github.com/wppconnect-team/wa-js/commit/63997af)), closes [#3100](https://github.com/wppconnect-team/wa-js/issues/3100)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2731 (#3102) ([cca7e66](https://github.com/wppconnect-team/wa-js/commit/cca7e66)), closes [#3102](https://github.com/wppconnect-team/wa-js/issues/3102)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2733 (#3104) ([1617092](https://github.com/wppconnect-team/wa-js/commit/1617092)), closes [#3104](https://github.com/wppconnect-team/wa-js/issues/3104)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2736 (#3107) ([c0f5347](https://github.com/wppconnect-team/wa-js/commit/c0f5347)), closes [#3107](https://github.com/wppconnect-team/wa-js/issues/3107)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2738 (#3109) ([30fc728](https://github.com/wppconnect-team/wa-js/commit/30fc728)), closes [#3109](https://github.com/wppconnect-team/wa-js/issues/3109)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2745 (#3110) ([1ff342c](https://github.com/wppconnect-team/wa-js/commit/1ff342c)), closes [#3110](https://github.com/wppconnect-team/wa-js/issues/3110)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2752 (#3114) ([efb5532](https://github.com/wppconnect-team/wa-js/commit/efb5532)), closes [#3114](https://github.com/wppconnect-team/wa-js/issues/3114)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2753 (#3118) ([f96e5d8](https://github.com/wppconnect-team/wa-js/commit/f96e5d8)), closes [#3118](https://github.com/wppconnect-team/wa-js/issues/3118)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2765 (#3120) ([05b9409](https://github.com/wppconnect-team/wa-js/commit/05b9409)), closes [#3120](https://github.com/wppconnect-team/wa-js/issues/3120)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2780 (#3124) ([7dcf33e](https://github.com/wppconnect-team/wa-js/commit/7dcf33e)), closes [#3124](https://github.com/wppconnect-team/wa-js/issues/3124)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2781 (#3127) ([e3ff396](https://github.com/wppconnect-team/wa-js/commit/e3ff396)), closes [#3127](https://github.com/wppconnect-team/wa-js/issues/3127)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2783 (#3129) ([d0957ff](https://github.com/wppconnect-team/wa-js/commit/d0957ff)), closes [#3129](https://github.com/wppconnect-team/wa-js/issues/3129)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2785 (#3130) ([fc6ac1a](https://github.com/wppconnect-team/wa-js/commit/fc6ac1a)), closes [#3130](https://github.com/wppconnect-team/wa-js/issues/3130)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2800 (#3131) ([c5a0d33](https://github.com/wppconnect-team/wa-js/commit/c5a0d33)), closes [#3131](https://github.com/wppconnect-team/wa-js/issues/3131)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2811 (#3133) ([db8ca45](https://github.com/wppconnect-team/wa-js/commit/db8ca45)), closes [#3133](https://github.com/wppconnect-team/wa-js/issues/3133)
* **deps-dev:** update dependency eslint to ^9.39.2 (#3142) ([350ff90](https://github.com/wppconnect-team/wa-js/commit/350ff90)), closes [#3142](https://github.com/wppconnect-team/wa-js/issues/3142)
* **deps-dev:** update dependency prettier to ^3.7.1 (#3101) ([681ab12](https://github.com/wppconnect-team/wa-js/commit/681ab12)), closes [#3101](https://github.com/wppconnect-team/wa-js/issues/3101)
* **deps-dev:** update dependency prettier to ^3.7.2 (#3105) ([0d73fea](https://github.com/wppconnect-team/wa-js/commit/0d73fea)), closes [#3105](https://github.com/wppconnect-team/wa-js/issues/3105)
* **deps-dev:** update dependency prettier to ^3.7.3 (#3108) ([1bddea2](https://github.com/wppconnect-team/wa-js/commit/1bddea2)), closes [#3108](https://github.com/wppconnect-team/wa-js/issues/3108)
* **deps-dev:** update dependency prettier to ^3.7.4 (#3121) ([55727b1](https://github.com/wppconnect-team/wa-js/commit/55727b1)), closes [#3121](https://github.com/wppconnect-team/wa-js/issues/3121)
* **deps-dev:** update dependency release-it to ^19.1.0 (#3137) ([0d777a7](https://github.com/wppconnect-team/wa-js/commit/0d777a7)), closes [#3137](https://github.com/wppconnect-team/wa-js/issues/3137)
* **deps-dev:** update dependency release-it to ^19.2.0 (#3155) ([302b434](https://github.com/wppconnect-team/wa-js/commit/302b434)), closes [#3155](https://github.com/wppconnect-team/wa-js/issues/3155)
* **deps-dev:** update dependency release-it to ^19.2.1 (#3156) ([c174f7f](https://github.com/wppconnect-team/wa-js/commit/c174f7f)), closes [#3156](https://github.com/wppconnect-team/wa-js/issues/3156)
* **deps-dev:** update dependency release-it to ^19.2.2 (#3158) ([f1c2615](https://github.com/wppconnect-team/wa-js/commit/f1c2615)), closes [#3158](https://github.com/wppconnect-team/wa-js/issues/3158)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.3.15 (#3126) ([38db343](https://github.com/wppconnect-team/wa-js/commit/38db343)), closes [#3126](https://github.com/wppconnect-team/wa-js/issues/3126)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.3.16 (#3138) ([c144d7e](https://github.com/wppconnect-team/wa-js/commit/c144d7e)), closes [#3138](https://github.com/wppconnect-team/wa-js/issues/3138)
* **deps-dev:** update dependency typedoc to ^0.28.15 (#3106) ([0da8b7c](https://github.com/wppconnect-team/wa-js/commit/0da8b7c)), closes [#3106](https://github.com/wppconnect-team/wa-js/issues/3106)
* **deps-dev:** update dependency webpack to ^5.104.0 (#3147) ([6d7b536](https://github.com/wppconnect-team/wa-js/commit/6d7b536)), closes [#3147](https://github.com/wppconnect-team/wa-js/issues/3147)
* **deps-dev:** update dependency webpack to ^5.104.1 (#3150) ([4575428](https://github.com/wppconnect-team/wa-js/commit/4575428)), closes [#3150](https://github.com/wppconnect-team/wa-js/issues/3150)
* **deps-dev:** update typescript-eslint monorepo to ^8.48.1 (#3116) ([bb92f13](https://github.com/wppconnect-team/wa-js/commit/bb92f13)), closes [#3116](https://github.com/wppconnect-team/wa-js/issues/3116)
* **deps-dev:** update typescript-eslint monorepo to ^8.49.0 (#3134) ([651286f](https://github.com/wppconnect-team/wa-js/commit/651286f)), closes [#3134](https://github.com/wppconnect-team/wa-js/issues/3134)
* **deps-dev:** update typescript-eslint monorepo to ^8.50.0 (#3145) ([263d411](https://github.com/wppconnect-team/wa-js/commit/263d411)), closes [#3145](https://github.com/wppconnect-team/wa-js/issues/3145)
* **deps-dev:** update typescript-eslint monorepo to ^8.50.1 (#3154) ([e94b1a9](https://github.com/wppconnect-team/wa-js/commit/e94b1a9)), closes [#3154](https://github.com/wppconnect-team/wa-js/issues/3154)
* **deps-dev:** update typescript-eslint monorepo to ^8.51.0 (#3162) ([a588105](https://github.com/wppconnect-team/wa-js/commit/a588105)), closes [#3162](https://github.com/wppconnect-team/wa-js/issues/3162)
* **deps:** update node.js to v24.12.0 (#3136) ([4a1dd6a](https://github.com/wppconnect-team/wa-js/commit/4a1dd6a)), closes [#3136](https://github.com/wppconnect-team/wa-js/issues/3136)

### Continuous Integration

* **deps:** update actions/checkout digest to 8e8c483 (#3119) ([16b3948](https://github.com/wppconnect-team/wa-js/commit/16b3948)), closes [#3119](https://github.com/wppconnect-team/wa-js/issues/3119)
* **deps:** update actions/setup-node action to v6.1.0 (#3122) ([15cb1dd](https://github.com/wppconnect-team/wa-js/commit/15cb1dd)), closes [#3122](https://github.com/wppconnect-team/wa-js/issues/3122)
* **deps:** update dependency node to v24.12.0 (#3139) ([5e3be84](https://github.com/wppconnect-team/wa-js/commit/5e3be84)), closes [#3139](https://github.com/wppconnect-team/wa-js/issues/3139)

### Chores

* **deps:** lock file maintenance (#3111) ([0b90146](https://github.com/wppconnect-team/wa-js/commit/0b90146)), closes [#3111](https://github.com/wppconnect-team/wa-js/issues/3111)
* **deps:** lock file maintenance (#3132) ([456189b](https://github.com/wppconnect-team/wa-js/commit/456189b)), closes [#3132](https://github.com/wppconnect-team/wa-js/issues/3132)
* **deps:** lock file maintenance (#3144) ([bbaebca](https://github.com/wppconnect-team/wa-js/commit/bbaebca)), closes [#3144](https://github.com/wppconnect-team/wa-js/issues/3144)
* **deps:** lock file maintenance (#3151) ([123300a](https://github.com/wppconnect-team/wa-js/commit/123300a)), closes [#3151](https://github.com/wppconnect-team/wa-js/issues/3151)
* **deps:** lock file maintenance (#3159) ([a425cf6](https://github.com/wppconnect-team/wa-js/commit/a425cf6)), closes [#3159](https://github.com/wppconnect-team/wa-js/issues/3159)
* fixed npm publish ([164d58c](https://github.com/wppconnect-team/wa-js/commit/164d58c))

## <small>3.19.3 (2025-11-26)</small>

### Bug Fixes

* edit message result (#3099) ([1bb4b9f](https://github.com/wppconnect-team/wa-js/commit/1bb4b9f)), closes [#3099](https://github.com/wppconnect-team/wa-js/issues/3099)
* Fixed delete chat function to no lid migrated sessions (#3061) ([a13a5da](https://github.com/wppconnect-team/wa-js/commit/a13a5da)), closes [#3061](https://github.com/wppconnect-team/wa-js/issues/3061)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2720 (#3094) ([1af8021](https://github.com/wppconnect-team/wa-js/commit/1af8021)), closes [#3094](https://github.com/wppconnect-team/wa-js/issues/3094)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2723 (#3097) ([a26499b](https://github.com/wppconnect-team/wa-js/commit/a26499b)), closes [#3097](https://github.com/wppconnect-team/wa-js/issues/3097)

### Continuous Integration

* **deps:** update actions/checkout action to v6 (#3062) ([fc0ec85](https://github.com/wppconnect-team/wa-js/commit/fc0ec85)), closes [#3062](https://github.com/wppconnect-team/wa-js/issues/3062)

## <small>3.19.2 (2025-11-25)</small>

### Bug Fixes

* contact save and remove functions (#3093) ([285c88b](https://github.com/wppconnect-team/wa-js/commit/285c88b)), closes [#3093](https://github.com/wppconnect-team/wa-js/issues/3093)
* Save Contact (#3090) ([5da7a37](https://github.com/wppconnect-team/wa-js/commit/5da7a37)), closes [#3090](https://github.com/wppconnect-team/wa-js/issues/3090)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2714 (#3091) ([2dd88bb](https://github.com/wppconnect-team/wa-js/commit/2dd88bb)), closes [#3091](https://github.com/wppconnect-team/wa-js/issues/3091)
* **deps-dev:** update playwright monorepo to ^1.57.0 (#3087) ([0a25132](https://github.com/wppconnect-team/wa-js/commit/0a25132)), closes [#3087](https://github.com/wppconnect-team/wa-js/issues/3087)

### Other Changes

* Fix for deleting contact (#3085) ([f7ed96e](https://github.com/wppconnect-team/wa-js/commit/f7ed96e)), closes [#3085](https://github.com/wppconnect-team/wa-js/issues/3085)

## 3.19.0 (2025-11-25)

### Features

* add issue templates for support questions and configuration (#3050) ([10544ba](https://github.com/wppconnect-team/wa-js/commit/10544ba)), closes [#3050](https://github.com/wppconnect-team/wa-js/issues/3050)
* add support for filtering archived chats in list function (#3036) ([5ae2aee](https://github.com/wppconnect-team/wa-js/commit/5ae2aee)), closes [#3036](https://github.com/wppconnect-team/wa-js/issues/3036)
* exposing account lid migration state (#3038) ([6168db0](https://github.com/wppconnect-team/wa-js/commit/6168db0)), closes [#3038](https://github.com/wppconnect-team/wa-js/issues/3038)
* implement order acceptance and decline functionalities with status updates (#3055) ([b3c54c3](https://github.com/wppconnect-team/wa-js/commit/b3c54c3)), closes [#3055](https://github.com/wppconnect-team/wa-js/issues/3055)
* support call messages along with chat messages (#3046) ([a291d72](https://github.com/wppconnect-team/wa-js/commit/a291d72)), closes [#3046](https://github.com/wppconnect-team/wa-js/issues/3046)
* username flag (#3082) ([03c6c5a](https://github.com/wppconnect-team/wa-js/commit/03c6c5a)), closes [#3082](https://github.com/wppconnect-team/wa-js/issues/3082)

### Bug Fixes

* #2761 - removed old files and improved launchLocal and docs (#3021) ([107f9d1](https://github.com/wppconnect-team/wa-js/commit/107f9d1)), closes [#2761](https://github.com/wppconnect-team/wa-js/issues/2761) [#3021](https://github.com/wppconnect-team/wa-js/issues/3021)
* chatEntryPoint to be optional (#3023) ([429333c](https://github.com/wppconnect-team/wa-js/commit/429333c)), closes [#3023](https://github.com/wppconnect-team/wa-js/issues/3023)
* correct optional param (#3025) ([4e663bd](https://github.com/wppconnect-team/wa-js/commit/4e663bd)), closes [#3025](https://github.com/wppconnect-team/wa-js/issues/3025)
* Fixed chat attribute isGroup on ChatModel (#3078) ([0f33f91](https://github.com/wppconnect-team/wa-js/commit/0f33f91)), closes [#3078](https://github.com/wppconnect-team/wa-js/issues/3078)
* mentions for lids (#3040) ([fb9a487](https://github.com/wppconnect-team/wa-js/commit/fb9a487)), closes [#3040](https://github.com/wppconnect-team/wa-js/issues/3040)
* **pinMsg:** add parameter validation and correct documentation (#3012) ([e38f9a3](https://github.com/wppconnect-team/wa-js/commit/e38f9a3)), closes [#3012](https://github.com/wppconnect-team/wa-js/issues/3012)
* reset custom filter on filter type switch and update return type to boolean (#3077) ([4c1b0a1](https://github.com/wppconnect-team/wa-js/commit/4c1b0a1)), closes [#3077](https://github.com/wppconnect-team/wa-js/issues/3077)
* update isLidMigrated function return type to boolean (#3037) ([4be7ca2](https://github.com/wppconnect-team/wa-js/commit/4be7ca2)), closes [#3037](https://github.com/wppconnect-team/wa-js/issues/3037)

### Build System

* **deps-dev:** update dependency @tony.ganchev/eslint-plugin-header to ^3.1.11 (#3029) ([92e8414](https://github.com/wppconnect-team/wa-js/commit/92e8414)), closes [#3029](https://github.com/wppconnect-team/wa-js/issues/3029)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2620 (#3003) ([5220bc1](https://github.com/wppconnect-team/wa-js/commit/5220bc1)), closes [#3003](https://github.com/wppconnect-team/wa-js/issues/3003)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2622 (#3004) ([97a2a01](https://github.com/wppconnect-team/wa-js/commit/97a2a01)), closes [#3004](https://github.com/wppconnect-team/wa-js/issues/3004)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2625 (#3009) ([39f6b2a](https://github.com/wppconnect-team/wa-js/commit/39f6b2a)), closes [#3009](https://github.com/wppconnect-team/wa-js/issues/3009)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2631 (#3015) ([e06cad6](https://github.com/wppconnect-team/wa-js/commit/e06cad6)), closes [#3015](https://github.com/wppconnect-team/wa-js/issues/3015)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2643 (#3028) ([f7d44ce](https://github.com/wppconnect-team/wa-js/commit/f7d44ce)), closes [#3028](https://github.com/wppconnect-team/wa-js/issues/3028)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2645 (#3035) ([68ae537](https://github.com/wppconnect-team/wa-js/commit/68ae537)), closes [#3035](https://github.com/wppconnect-team/wa-js/issues/3035)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2646 (#3039) ([45205ea](https://github.com/wppconnect-team/wa-js/commit/45205ea)), closes [#3039](https://github.com/wppconnect-team/wa-js/issues/3039)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2649 (#3041) ([513ad4e](https://github.com/wppconnect-team/wa-js/commit/513ad4e)), closes [#3041](https://github.com/wppconnect-team/wa-js/issues/3041)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2653 (#3042) ([780d136](https://github.com/wppconnect-team/wa-js/commit/780d136)), closes [#3042](https://github.com/wppconnect-team/wa-js/issues/3042)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2657 (#3043) ([fe3885a](https://github.com/wppconnect-team/wa-js/commit/fe3885a)), closes [#3043](https://github.com/wppconnect-team/wa-js/issues/3043)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2660 (#3045) ([7131949](https://github.com/wppconnect-team/wa-js/commit/7131949)), closes [#3045](https://github.com/wppconnect-team/wa-js/issues/3045)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2669 (#3052) ([20978fb](https://github.com/wppconnect-team/wa-js/commit/20978fb)), closes [#3052](https://github.com/wppconnect-team/wa-js/issues/3052)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2674 (#3057) ([a52fd8e](https://github.com/wppconnect-team/wa-js/commit/a52fd8e)), closes [#3057](https://github.com/wppconnect-team/wa-js/issues/3057)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2683 (#3059) ([dc9191b](https://github.com/wppconnect-team/wa-js/commit/dc9191b)), closes [#3059](https://github.com/wppconnect-team/wa-js/issues/3059)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2690 (#3063) ([0d885ca](https://github.com/wppconnect-team/wa-js/commit/0d885ca)), closes [#3063](https://github.com/wppconnect-team/wa-js/issues/3063)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2692 (#3064) ([85b0730](https://github.com/wppconnect-team/wa-js/commit/85b0730)), closes [#3064](https://github.com/wppconnect-team/wa-js/issues/3064)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2696 (#3065) ([01c0296](https://github.com/wppconnect-team/wa-js/commit/01c0296)), closes [#3065](https://github.com/wppconnect-team/wa-js/issues/3065)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2698 (#3067) ([a4346e9](https://github.com/wppconnect-team/wa-js/commit/a4346e9)), closes [#3067](https://github.com/wppconnect-team/wa-js/issues/3067)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2699 (#3068) ([6e46f4c](https://github.com/wppconnect-team/wa-js/commit/6e46f4c)), closes [#3068](https://github.com/wppconnect-team/wa-js/issues/3068)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2704 (#3069) ([be34bd7](https://github.com/wppconnect-team/wa-js/commit/be34bd7)), closes [#3069](https://github.com/wppconnect-team/wa-js/issues/3069)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2706 (#3072) ([d3a6220](https://github.com/wppconnect-team/wa-js/commit/d3a6220)), closes [#3072](https://github.com/wppconnect-team/wa-js/issues/3072)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2709 (#3075) ([3894b3c](https://github.com/wppconnect-team/wa-js/commit/3894b3c)), closes [#3075](https://github.com/wppconnect-team/wa-js/issues/3075)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2713 (#3081) ([691bea5](https://github.com/wppconnect-team/wa-js/commit/691bea5)), closes [#3081](https://github.com/wppconnect-team/wa-js/issues/3081)
* **deps-dev:** update dependency lint-staged to ^16.2.7 (#3060) ([3ac2e0e](https://github.com/wppconnect-team/wa-js/commit/3ac2e0e)), closes [#3060](https://github.com/wppconnect-team/wa-js/issues/3060)
* **deps-dev:** update dependency webpack to ^5.103.0 (#3054) ([047f31f](https://github.com/wppconnect-team/wa-js/commit/047f31f)), closes [#3054](https://github.com/wppconnect-team/wa-js/issues/3054)
* **deps-dev:** update typescript-eslint monorepo to ^8.47.0 (#3053) ([2d2097d](https://github.com/wppconnect-team/wa-js/commit/2d2097d)), closes [#3053](https://github.com/wppconnect-team/wa-js/issues/3053)
* **deps-dev:** update typescript-eslint monorepo to ^8.48.0 (#3073) ([77a7925](https://github.com/wppconnect-team/wa-js/commit/77a7925)), closes [#3073](https://github.com/wppconnect-team/wa-js/issues/3073)
* **deps-dev:** update typescript-eslint monorepo to v8 (#3006) ([ec54405](https://github.com/wppconnect-team/wa-js/commit/ec54405)), closes [#3006](https://github.com/wppconnect-team/wa-js/issues/3006)
* **deps:** update node.js to v24 (#3024) ([d6b7f98](https://github.com/wppconnect-team/wa-js/commit/d6b7f98)), closes [#3024](https://github.com/wppconnect-team/wa-js/issues/3024)

### Continuous Integration

* **deps:** update actions/checkout digest to 93cb6ef (#3051) ([4177935](https://github.com/wppconnect-team/wa-js/commit/4177935)), closes [#3051](https://github.com/wppconnect-team/wa-js/issues/3051)
* **deps:** update dependency node to v24.11.1 (#3016) ([a8ddbd1](https://github.com/wppconnect-team/wa-js/commit/a8ddbd1)), closes [#3016](https://github.com/wppconnect-team/wa-js/issues/3016)
* **deps:** update wagoid/commitlint-github-action action to v6 (#3007) ([ec89375](https://github.com/wppconnect-team/wa-js/commit/ec89375)), closes [#3007](https://github.com/wppconnect-team/wa-js/issues/3007)

### Chores

* addressing husky warnings (#3022) ([cd4e48b](https://github.com/wppconnect-team/wa-js/commit/cd4e48b)), closes [#3022](https://github.com/wppconnect-team/wa-js/issues/3022)
* **deps:** lock file maintenance (#3044) ([ca222a2](https://github.com/wppconnect-team/wa-js/commit/ca222a2)), closes [#3044](https://github.com/wppconnect-team/wa-js/issues/3044)
* **deps:** lock file maintenance (#3070) ([0f80233](https://github.com/wppconnect-team/wa-js/commit/0f80233)), closes [#3070](https://github.com/wppconnect-team/wa-js/issues/3070)
* exposing function to get phone locale (#3013) ([bd8d73e](https://github.com/wppconnect-team/wa-js/commit/bd8d73e)), closes [#3013](https://github.com/wppconnect-team/wa-js/issues/3013)
* removed deprecated lib (#3010) ([98c254c](https://github.com/wppconnect-team/wa-js/commit/98c254c)), closes [#3010](https://github.com/wppconnect-team/wa-js/issues/3010)
* supporting ads messages context (#3049) ([21d6420](https://github.com/wppconnect-team/wa-js/commit/21d6420)), closes [#3049](https://github.com/wppconnect-team/wa-js/issues/3049)

### Other Changes

* Fix contact loop (#3080) ([b30bf1d](https://github.com/wppconnect-team/wa-js/commit/b30bf1d)), closes [#3080](https://github.com/wppconnect-team/wa-js/issues/3080)
* fix/pin-message-propagation (#3034) ([84f99bc](https://github.com/wppconnect-team/wa-js/commit/84f99bc)), closes [#3034](https://github.com/wppconnect-team/wa-js/issues/3034)
* Deprecation of createChat + Documentation updates (#3026) ([3b04684](https://github.com/wppconnect-team/wa-js/commit/3b04684)), closes [#3026](https://github.com/wppconnect-team/wa-js/issues/3026)
* fix/send-message-result-object-type (#3017) ([5b84605](https://github.com/wppconnect-team/wa-js/commit/5b84605)), closes [#3017](https://github.com/wppconnect-team/wa-js/issues/3017)
* setChatList performance issue (#3011) ([e32b559](https://github.com/wppconnect-team/wa-js/commit/e32b559)), closes [#3011](https://github.com/wppconnect-team/wa-js/issues/3011)
* Migrate to ESLint 9 (#3008) ([571a236](https://github.com/wppconnect-team/wa-js/commit/571a236)), closes [#3008](https://github.com/wppconnect-team/wa-js/issues/3008)

## <small>3.18.8 (2025-11-10)</small>

### Features

* add getBuildConstants function to retrieve WhatsApp Web build constants (#2987) ([327e032](https://github.com/wppconnect-team/wa-js/commit/327e032)), closes [#2987](https://github.com/wppconnect-team/wa-js/issues/2987)
* add quotedMsgPayload option and rehydrateMessage utility for message quoting (#2976) ([ea85df2](https://github.com/wppconnect-team/wa-js/commit/ea85df2)), closes [#2976](https://github.com/wppconnect-team/wa-js/issues/2976)
* Added function forwardMessages for many massages and new WhatsApp version forwarding (#2960) ([2a02f9f](https://github.com/wppconnect-team/wa-js/commit/2a02f9f)), closes [#2960](https://github.com/wppconnect-team/wa-js/issues/2960)
* change device function (#2959) ([8dc6f52](https://github.com/wppconnect-team/wa-js/commit/8dc6f52)), closes [#2959](https://github.com/wppconnect-team/wa-js/issues/2959)
* implements getUploadLimit (#2928) ([5705d4e](https://github.com/wppconnect-team/wa-js/commit/5705d4e)), closes [#2928](https://github.com/wppconnect-team/wa-js/issues/2928)
* simplified rehydrate logic (#2994) ([be3adff](https://github.com/wppconnect-team/wa-js/commit/be3adff)), closes [#2994](https://github.com/wppconnect-team/wa-js/issues/2994)

### Bug Fixes

* Chat not found for LID (#2972) ([27d4a42](https://github.com/wppconnect-team/wa-js/commit/27d4a42)), closes [#2972](https://github.com/wppconnect-team/wa-js/issues/2972)
* fixed endCall function without id (#2964) ([be59840](https://github.com/wppconnect-team/wa-js/commit/be59840)), closes [#2964](https://github.com/wppconnect-team/wa-js/issues/2964)
* Fixed event incoming_call (#2975) ([c775ee0](https://github.com/wppconnect-team/wa-js/commit/c775ee0)), closes [#2975](https://github.com/wppconnect-team/wa-js/issues/2975)
* fixed fetchDataFromPNG function build error (#2984) ([117efc3](https://github.com/wppconnect-team/wa-js/commit/117efc3)), closes [#2984](https://github.com/wppconnect-team/wa-js/issues/2984)
* Fixed saveContact #2974 (#2982) ([65b2608](https://github.com/wppconnect-team/wa-js/commit/65b2608)), closes [#2974](https://github.com/wppconnect-team/wa-js/issues/2974) [#2982](https://github.com/wppconnect-team/wa-js/issues/2982)
* iphone lougouts after qrcode read (#2962) ([f5bb7b4](https://github.com/wppconnect-team/wa-js/commit/f5bb7b4)), closes [#2962](https://github.com/wppconnect-team/wa-js/issues/2962)
* remove quoted message from rehydrated payload to avoid nested quoting issues (#2978) ([94898ba](https://github.com/wppconnect-team/wa-js/commit/94898ba)), closes [#2978](https://github.com/wppconnect-team/wa-js/issues/2978)

### Build System

* **deps-dev:** update commitlint monorepo to v20 (#2944) ([d09124f](https://github.com/wppconnect-team/wa-js/commit/d09124f)), closes [#2944](https://github.com/wppconnect-team/wa-js/issues/2944)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2431 (#2949) ([70832b9](https://github.com/wppconnect-team/wa-js/commit/70832b9)), closes [#2949](https://github.com/wppconnect-team/wa-js/issues/2949)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2437 (#2951) ([cd3d98c](https://github.com/wppconnect-team/wa-js/commit/cd3d98c)), closes [#2951](https://github.com/wppconnect-team/wa-js/issues/2951)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2442 (#2955) ([3c9bca0](https://github.com/wppconnect-team/wa-js/commit/3c9bca0)), closes [#2955](https://github.com/wppconnect-team/wa-js/issues/2955)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2450 (#2956) ([ec3227f](https://github.com/wppconnect-team/wa-js/commit/ec3227f)), closes [#2956](https://github.com/wppconnect-team/wa-js/issues/2956)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2454 (#2957) ([f6788a1](https://github.com/wppconnect-team/wa-js/commit/f6788a1)), closes [#2957](https://github.com/wppconnect-team/wa-js/issues/2957)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2456 (#2961) ([e68dcbc](https://github.com/wppconnect-team/wa-js/commit/e68dcbc)), closes [#2961](https://github.com/wppconnect-team/wa-js/issues/2961)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2457 (#2965) ([4da67e3](https://github.com/wppconnect-team/wa-js/commit/4da67e3)), closes [#2965](https://github.com/wppconnect-team/wa-js/issues/2965)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2464 (#2966) ([a7aceb7](https://github.com/wppconnect-team/wa-js/commit/a7aceb7)), closes [#2966](https://github.com/wppconnect-team/wa-js/issues/2966)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2503 (#2967) ([a00e778](https://github.com/wppconnect-team/wa-js/commit/a00e778)), closes [#2967](https://github.com/wppconnect-team/wa-js/issues/2967)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2599 (#2980) ([8312b41](https://github.com/wppconnect-team/wa-js/commit/8312b41)), closes [#2980](https://github.com/wppconnect-team/wa-js/issues/2980)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2613 (#2998) ([c0cf9d1](https://github.com/wppconnect-team/wa-js/commit/c0cf9d1)), closes [#2998](https://github.com/wppconnect-team/wa-js/issues/2998)
* **deps-dev:** update dependency conventional-changelog-angular to ^8.1.0 (#2981) ([b5d47c9](https://github.com/wppconnect-team/wa-js/commit/b5d47c9)), closes [#2981](https://github.com/wppconnect-team/wa-js/issues/2981)
* **deps-dev:** update dependency lint-staged to ^16.2.5 (#2963) ([7f6b5ce](https://github.com/wppconnect-team/wa-js/commit/7f6b5ce)), closes [#2963](https://github.com/wppconnect-team/wa-js/issues/2963)
* **deps-dev:** update dependency lint-staged to ^16.2.6 (#2971) ([4b3c9e8](https://github.com/wppconnect-team/wa-js/commit/4b3c9e8)), closes [#2971](https://github.com/wppconnect-team/wa-js/issues/2971)
* **deps-dev:** update dependency release-it to ^19.0.6 (#2992) ([07916b3](https://github.com/wppconnect-team/wa-js/commit/07916b3)), closes [#2992](https://github.com/wppconnect-team/wa-js/issues/2992)
* **deps-dev:** update dependency typescript to ^5.9.3 (#2938) ([5c1dcb8](https://github.com/wppconnect-team/wa-js/commit/5c1dcb8)), closes [#2938](https://github.com/wppconnect-team/wa-js/issues/2938)
* **deps-dev:** update playwright monorepo to ^1.56.1 (#2952) ([232c431](https://github.com/wppconnect-team/wa-js/commit/232c431)), closes [#2952](https://github.com/wppconnect-team/wa-js/issues/2952)

### Continuous Integration

* **deps:** update actions/setup-node action to v6 (#2947) ([c23dd96](https://github.com/wppconnect-team/wa-js/commit/c23dd96)), closes [#2947](https://github.com/wppconnect-team/wa-js/issues/2947)
* **deps:** update dependency node to v22.21.1 (#2993) ([df2c586](https://github.com/wppconnect-team/wa-js/commit/df2c586)), closes [#2993](https://github.com/wppconnect-team/wa-js/issues/2993)
* **deps:** update dependency node to v24 (#2999) ([0a90fc5](https://github.com/wppconnect-team/wa-js/commit/0a90fc5)), closes [#2999](https://github.com/wppconnect-team/wa-js/issues/2999)

### Chores

* **deps:** lock file maintenance (#2958) ([9c8323a](https://github.com/wppconnect-team/wa-js/commit/9c8323a)), closes [#2958](https://github.com/wppconnect-team/wa-js/issues/2958)
* **deps:** lock file maintenance (#2995) ([4cbda07](https://github.com/wppconnect-team/wa-js/commit/4cbda07)), closes [#2995](https://github.com/wppconnect-team/wa-js/issues/2995)

### Other Changes

* Fix canSaveAsMyContacts missing (#2988) ([871191a](https://github.com/wppconnect-team/wa-js/commit/871191a)), closes [#2988](https://github.com/wppconnect-team/wa-js/issues/2988)
* [FEAT] LID <=> PN <=> Contact (#2989) ([1ffb710](https://github.com/wppconnect-team/wa-js/commit/1ffb710)), closes [#2989](https://github.com/wppconnect-team/wa-js/issues/2989)
* Fix open chat bottom function (#2985) ([68ff011](https://github.com/wppconnect-team/wa-js/commit/68ff011)), closes [#2985](https://github.com/wppconnect-team/wa-js/issues/2985)

## <small>3.18.7 (2025-10-16)</small>

### Features

* Added support URLs to send media messages (#2927) ([1aaeb44](https://github.com/wppconnect-team/wa-js/commit/1aaeb44)), closes [#2927](https://github.com/wppconnect-team/wa-js/issues/2927)

### Bug Fixes

* Fixed WidFactory.createUserWid (#2948) ([043b38a](https://github.com/wppconnect-team/wa-js/commit/043b38a)), closes [#2948](https://github.com/wppconnect-team/wa-js/issues/2948)
* improve isLidMigrated function to handle errors gracefully (#2926) ([00a60d4](https://github.com/wppconnect-team/wa-js/commit/00a60d4)), closes [#2926](https://github.com/wppconnect-team/wa-js/issues/2926)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2415 (#2929) ([60b6639](https://github.com/wppconnect-team/wa-js/commit/60b6639)), closes [#2929](https://github.com/wppconnect-team/wa-js/issues/2929)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2419 (#2931) ([fe0d7eb](https://github.com/wppconnect-team/wa-js/commit/fe0d7eb)), closes [#2931](https://github.com/wppconnect-team/wa-js/issues/2931)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2424 (#2936) ([0a2fe95](https://github.com/wppconnect-team/wa-js/commit/0a2fe95)), closes [#2936](https://github.com/wppconnect-team/wa-js/issues/2936)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2429 (#2940) ([a01cda2](https://github.com/wppconnect-team/wa-js/commit/a01cda2)), closes [#2940](https://github.com/wppconnect-team/wa-js/issues/2940)
* **deps-dev:** update dependency lint-staged to ^16.2.4 (#2932) ([b3924cc](https://github.com/wppconnect-team/wa-js/commit/b3924cc)), closes [#2932](https://github.com/wppconnect-team/wa-js/issues/2932)
* **deps-dev:** update dependency ts-morph to ^27.0.2 (#2933) ([337d56d](https://github.com/wppconnect-team/wa-js/commit/337d56d)), closes [#2933](https://github.com/wppconnect-team/wa-js/issues/2933)
* **deps-dev:** update dependency typedoc to ^0.28.14 (#2934) ([a778511](https://github.com/wppconnect-team/wa-js/commit/a778511)), closes [#2934](https://github.com/wppconnect-team/wa-js/issues/2934)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^5.0.10 (#2935) ([4076cc7](https://github.com/wppconnect-team/wa-js/commit/4076cc7)), closes [#2935](https://github.com/wppconnect-team/wa-js/issues/2935)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^4.1.2 (#2937) ([7508d53](https://github.com/wppconnect-team/wa-js/commit/7508d53)), closes [#2937](https://github.com/wppconnect-team/wa-js/issues/2937)
* **deps-dev:** update dependency webpack to ^5.102.1 (#2939) ([f1790d7](https://github.com/wppconnect-team/wa-js/commit/f1790d7)), closes [#2939](https://github.com/wppconnect-team/wa-js/issues/2939)
* **deps-dev:** update playwright monorepo to ^1.56.0 (#2941) ([f34cd46](https://github.com/wppconnect-team/wa-js/commit/f34cd46)), closes [#2941](https://github.com/wppconnect-team/wa-js/issues/2941)

### Continuous Integration

* **deps:** update actions/checkout action to v5 (#2919) ([eb42c11](https://github.com/wppconnect-team/wa-js/commit/eb42c11)), closes [#2919](https://github.com/wppconnect-team/wa-js/issues/2919)
* **deps:** update actions/github-script action to v8 (#2920) ([6fd6b45](https://github.com/wppconnect-team/wa-js/commit/6fd6b45)), closes [#2920](https://github.com/wppconnect-team/wa-js/issues/2920)
* **deps:** update dependency node to v22.20.0 (#2942) ([7619724](https://github.com/wppconnect-team/wa-js/commit/7619724)), closes [#2942](https://github.com/wppconnect-team/wa-js/issues/2942)

## <small>3.18.6 (2025-09-26)</small>

### Bug Fixes

* fixed createGroup function (close #2908) ([79f55b6](https://github.com/wppconnect-team/wa-js/commit/79f55b6)), closes [#2908](https://github.com/wppconnect-team/wa-js/issues/2908)

### Styles

* fixed createGroup function (close #2908) ([478a605](https://github.com/wppconnect-team/wa-js/commit/478a605)), closes [#2908](https://github.com/wppconnect-team/wa-js/issues/2908)

### Build System

* **deps-dev:** update dependency @types/node-fetch to ^2.6.13 (#2901) ([4539c0c](https://github.com/wppconnect-team/wa-js/commit/4539c0c)), closes [#2901](https://github.com/wppconnect-team/wa-js/issues/2901)
* **deps-dev:** update dependency @types/shelljs to ^0.8.17 (#2834) ([0818423](https://github.com/wppconnect-team/wa-js/commit/0818423)), closes [#2834](https://github.com/wppconnect-team/wa-js/issues/2834)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2253 (#2900) ([ca80cb6](https://github.com/wppconnect-team/wa-js/commit/ca80cb6)), closes [#2900](https://github.com/wppconnect-team/wa-js/issues/2900)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2259 (#2902) ([996312d](https://github.com/wppconnect-team/wa-js/commit/996312d)), closes [#2902](https://github.com/wppconnect-team/wa-js/issues/2902)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2282 (#2909) ([80164a5](https://github.com/wppconnect-team/wa-js/commit/80164a5)), closes [#2909](https://github.com/wppconnect-team/wa-js/issues/2909)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2300 (#2922) ([896348c](https://github.com/wppconnect-team/wa-js/commit/896348c)), closes [#2922](https://github.com/wppconnect-team/wa-js/issues/2922)
* **deps-dev:** update dependency debug to ^4.4.3 (#2903) ([0340b25](https://github.com/wppconnect-team/wa-js/commit/0340b25)), closes [#2903](https://github.com/wppconnect-team/wa-js/issues/2903)
* **deps-dev:** update dependency eslint-plugin-import to ^2.32.0 (#2913) ([6263ded](https://github.com/wppconnect-team/wa-js/commit/6263ded)), closes [#2913](https://github.com/wppconnect-team/wa-js/issues/2913)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.5.4 (#2915) ([914b86b](https://github.com/wppconnect-team/wa-js/commit/914b86b)), closes [#2915](https://github.com/wppconnect-team/wa-js/issues/2915)
* **deps-dev:** update dependency lint-staged to v16 (#2917) ([35d3f73](https://github.com/wppconnect-team/wa-js/commit/35d3f73)), closes [#2917](https://github.com/wppconnect-team/wa-js/issues/2917)
* **deps-dev:** update dependency prettier to ^3.6.2 (#2865) ([bd6e9c2](https://github.com/wppconnect-team/wa-js/commit/bd6e9c2)), closes [#2865](https://github.com/wppconnect-team/wa-js/issues/2865)
* **deps-dev:** update dependency release-it to ^19.0.5 (#2863) ([ceed95d](https://github.com/wppconnect-team/wa-js/commit/ceed95d)), closes [#2863](https://github.com/wppconnect-team/wa-js/issues/2863)
* **deps-dev:** update dependency ts-loader to ^9.5.4 (#2904) ([40aebb8](https://github.com/wppconnect-team/wa-js/commit/40aebb8)), closes [#2904](https://github.com/wppconnect-team/wa-js/issues/2904)
* **deps-dev:** update dependency ts-morph to v27 (#2918) ([4046320](https://github.com/wppconnect-team/wa-js/commit/4046320)), closes [#2918](https://github.com/wppconnect-team/wa-js/issues/2918)
* **deps-dev:** update dependency typedoc to ^0.28.13 (#2911) ([45ff82d](https://github.com/wppconnect-team/wa-js/commit/45ff82d)), closes [#2911](https://github.com/wppconnect-team/wa-js/issues/2911)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^5.0.9 (#2912) ([737f50d](https://github.com/wppconnect-team/wa-js/commit/737f50d)), closes [#2912](https://github.com/wppconnect-team/wa-js/issues/2912)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^4.1.0 (#2916) ([eba66fd](https://github.com/wppconnect-team/wa-js/commit/eba66fd)), closes [#2916](https://github.com/wppconnect-team/wa-js/issues/2916)
* **deps-dev:** update dependency webpack to ^5.101.3 (#2866) ([634a241](https://github.com/wppconnect-team/wa-js/commit/634a241)), closes [#2866](https://github.com/wppconnect-team/wa-js/issues/2866)
* **deps-dev:** update dependency webpack-cli to v6 (#2599) ([3069970](https://github.com/wppconnect-team/wa-js/commit/3069970)), closes [#2599](https://github.com/wppconnect-team/wa-js/issues/2599)
* **deps-dev:** update playwright monorepo to ^1.55.1 (#2905) ([9ae366f](https://github.com/wppconnect-team/wa-js/commit/9ae366f)), closes [#2905](https://github.com/wppconnect-team/wa-js/issues/2905)

### Continuous Integration

* **deps:** update actions/checkout digest to 08eba0b (#2860) ([346e6a2](https://github.com/wppconnect-team/wa-js/commit/346e6a2)), closes [#2860](https://github.com/wppconnect-team/wa-js/issues/2860)
* **deps:** update actions/setup-node action to v4.4.0 (#2906) ([aa45be9](https://github.com/wppconnect-team/wa-js/commit/aa45be9)), closes [#2906](https://github.com/wppconnect-team/wa-js/issues/2906)
* **deps:** update dependency node to v20.19.5 (#2864) ([ad977fe](https://github.com/wppconnect-team/wa-js/commit/ad977fe)), closes [#2864](https://github.com/wppconnect-team/wa-js/issues/2864)
* **deps:** update dependency node to v22 (#2907) ([85206ff](https://github.com/wppconnect-team/wa-js/commit/85206ff)), closes [#2907](https://github.com/wppconnect-team/wa-js/issues/2907)

### Chores

* fixed build test in some versions ([cc65a79](https://github.com/wppconnect-team/wa-js/commit/cc65a79))

## <small>3.18.5 (2025-09-16)</small>

### Bug Fixes

* Fixed the wa-source extraction (#2895) ([b9d18e7](https://github.com/wppconnect-team/wa-js/commit/b9d18e7)), closes [#2895](https://github.com/wppconnect-team/wa-js/issues/2895)
* Fixed UserPrefs (#2892) ([81b234e](https://github.com/wppconnect-team/wa-js/commit/81b234e)), closes [#2892](https://github.com/wppconnect-team/wa-js/issues/2892)
* Fixed WidFactory.toChatWid event IncomingCall (#2891) ([40f022a](https://github.com/wppconnect-team/wa-js/commit/40f022a)), closes [#2891](https://github.com/wppconnect-team/wa-js/issues/2891)

### Build System

* **deps-dev:** update dependency eslint-config-prettier to ^10.1.8 (#2867) ([0394577](https://github.com/wppconnect-team/wa-js/commit/0394577)), closes [#2867](https://github.com/wppconnect-team/wa-js/issues/2867)

### Other Changes

* Added unread chats features (#2894) ([c9de311](https://github.com/wppconnect-team/wa-js/commit/c9de311)), closes [#2894](https://github.com/wppconnect-team/wa-js/issues/2894)

## <small>3.18.4 (2025-09-09)</small>

### Bug Fixes

* Fixed WidFactory.toUserWid (#2882) ([e1bd67e](https://github.com/wppconnect-team/wa-js/commit/e1bd67e)), closes [#2882](https://github.com/wppconnect-team/wa-js/issues/2882)

## <small>3.18.3 (2025-09-02)</small>

### Bug Fixes

* update UserPrefs method calls for WhatsApp Web compatibility (#2871) ([3ea0e80](https://github.com/wppconnect-team/wa-js/commit/3ea0e80)), closes [#2871](https://github.com/wppconnect-team/wa-js/issues/2871)

## <small>3.18.2 (2025-08-29)</small>

### Bug Fixes

* Fixed getMyDeviceId >= 2.3000.1026498050 (#2869) ([56ee7de](https://github.com/wppconnect-team/wa-js/commit/56ee7de)), closes [#2869](https://github.com/wppconnect-team/wa-js/issues/2869)

## <small>3.18.1 (2025-08-26)</small>

### Bug Fixes

* Added support for getActiveChat return newsletter ([436cc85](https://github.com/wppconnect-team/wa-js/commit/436cc85))
* Fixed function WPP.catalog.setProductVisibility (close #2837) ([3f3ec09](https://github.com/wppconnect-team/wa-js/commit/3f3ec09)), closes [#2837](https://github.com/wppconnect-team/wa-js/issues/2837)
* Fixed functions in update profile bussiness (close 2854, close #2856) ([0773ec5](https://github.com/wppconnect-team/wa-js/commit/0773ec5)), closes [#2856](https://github.com/wppconnect-team/wa-js/issues/2856)
* Fixed send messages to groups >= 2.3000.1026330385 ([c779279](https://github.com/wppconnect-team/wa-js/commit/c779279))
* Fixed WPP.chat.clear function (close #2798) ([061cad9](https://github.com/wppconnect-team/wa-js/commit/061cad9)), closes [#2798](https://github.com/wppconnect-team/wa-js/issues/2798)
* Improovment update profile picture for newsletter (close #2808) ([9013edb](https://github.com/wppconnect-team/wa-js/commit/9013edb)), closes [#2808](https://github.com/wppconnect-team/wa-js/issues/2808)

### Documentation

* update example (close #2793) ([355d9ba](https://github.com/wppconnect-team/wa-js/commit/355d9ba)), closes [#2793](https://github.com/wppconnect-team/wa-js/issues/2793)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2101 (#2845) ([cca4724](https://github.com/wppconnect-team/wa-js/commit/cca4724)), closes [#2845](https://github.com/wppconnect-team/wa-js/issues/2845)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2103 (#2858) ([651f015](https://github.com/wppconnect-team/wa-js/commit/651f015)), closes [#2858](https://github.com/wppconnect-team/wa-js/issues/2858)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2104 (#2862) ([84bd37e](https://github.com/wppconnect-team/wa-js/commit/84bd37e)), closes [#2862](https://github.com/wppconnect-team/wa-js/issues/2862)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to v4 (#2747) ([0b9c633](https://github.com/wppconnect-team/wa-js/commit/0b9c633)), closes [#2747](https://github.com/wppconnect-team/wa-js/issues/2747)

## 3.18.0 (2025-07-23)

### Features

* Added Contact manager functions  (#2610) ([6292b01](https://github.com/wppconnect-team/wa-js/commit/6292b01)), closes [#2610](https://github.com/wppconnect-team/wa-js/issues/2610)
* Enhance queryExists function to include optional lid property in result (#2838) ([3873003](https://github.com/wppconnect-team/wa-js/commit/3873003)), closes [#2838](https://github.com/wppconnect-team/wa-js/issues/2838)

### Bug Fixes

* Fixed getGroupInfoFromInviteCode (close #2825, close #2827, close #2828) (#2829) ([4958926](https://github.com/wppconnect-team/wa-js/commit/4958926)), closes [#2825](https://github.com/wppconnect-team/wa-js/issues/2825) [#2827](https://github.com/wppconnect-team/wa-js/issues/2827) [#2828](https://github.com/wppconnect-team/wa-js/issues/2828) [#2829](https://github.com/wppconnect-team/wa-js/issues/2829)
* fixed modules for >= 2.3000.1023675050 ([51b99b9](https://github.com/wppconnect-team/wa-js/commit/51b99b9))
* Fixed No LID For User error (#2842) ([cdc39ed](https://github.com/wppconnect-team/wa-js/commit/cdc39ed)), closes [#2842](https://github.com/wppconnect-team/wa-js/issues/2842) [#2839](https://github.com/wppconnect-team/wa-js/issues/2839) [#2816](https://github.com/wppconnect-team/wa-js/issues/2816)
* Fixed send PTV video (close #2824, close #2823) ([6ab5890](https://github.com/wppconnect-team/wa-js/commit/6ab5890)), closes [#2824](https://github.com/wppconnect-team/wa-js/issues/2824) [#2823](https://github.com/wppconnect-team/wa-js/issues/2823)
* Fixed some functions (getGroupInfoFromInviteCode, sendEventMessage) (#2836) ([54fe111](https://github.com/wppconnect-team/wa-js/commit/54fe111)), closes [#2836](https://github.com/wppconnect-team/wa-js/issues/2836)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1663 (#2806) ([1e4a2d0](https://github.com/wppconnect-team/wa-js/commit/1e4a2d0)), closes [#2806](https://github.com/wppconnect-team/wa-js/issues/2806)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1826 (#2831) ([5608ec3](https://github.com/wppconnect-team/wa-js/commit/5608ec3)), closes [#2831](https://github.com/wppconnect-team/wa-js/issues/2831)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1901 (#2843) ([eeca32d](https://github.com/wppconnect-team/wa-js/commit/eeca32d)), closes [#2843](https://github.com/wppconnect-team/wa-js/issues/2843)
* **deps-dev:** update dependency release-it to ^19.0.3 (#2832) ([cb007be](https://github.com/wppconnect-team/wa-js/commit/cb007be)), closes [#2832](https://github.com/wppconnect-team/wa-js/issues/2832)
* **deps-dev:** update dependency webpack to ^5.100.1 (#2802) ([9b8cdf5](https://github.com/wppconnect-team/wa-js/commit/9b8cdf5)), closes [#2802](https://github.com/wppconnect-team/wa-js/issues/2802)

### Continuous Integration

* **deps:** update dependency node to v20.19.3 (#2833) ([119fb0a](https://github.com/wppconnect-team/wa-js/commit/119fb0a)), closes [#2833](https://github.com/wppconnect-team/wa-js/issues/2833)

### Chores

* Fixed test build github ([f3d67d4](https://github.com/wppconnect-team/wa-js/commit/f3d67d4))

## <small>3.17.7 (2025-05-27)</small>

### Bug Fixes

* fixed WPP.chat.list function (close #2805, close #2804) ([c671674](https://github.com/wppconnect-team/wa-js/commit/c671674)), closes [#2805](https://github.com/wppconnect-team/wa-js/issues/2805) [#2804](https://github.com/wppconnect-team/wa-js/issues/2804)
* improovments on queryExist ([1429676](https://github.com/wppconnect-team/wa-js/commit/1429676))

## <small>3.17.6 (2025-05-24)</small>

### Bug Fixes

* fixed send message issue ([36993f0](https://github.com/wppconnect-team/wa-js/commit/36993f0))
* Fixed whatsapp functions >= 2.3000.1023092535 ([a7b14bf](https://github.com/wppconnect-team/wa-js/commit/a7b14bf))
* improovment find chat function ([f3a1863](https://github.com/wppconnect-team/wa-js/commit/f3a1863))

### Styles

* fallback module for getformattedusernameorphone ([31d766e](https://github.com/wppconnect-team/wa-js/commit/31d766e))
* fallback module for getformattedusernameorphone ([f86b0a6](https://github.com/wppconnect-team/wa-js/commit/f86b0a6))
* improovment find chat function ([b954815](https://github.com/wppconnect-team/wa-js/commit/b954815))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1562 (#2797) ([eed85a2](https://github.com/wppconnect-team/wa-js/commit/eed85a2)), closes [#2797](https://github.com/wppconnect-team/wa-js/issues/2797)

## <small>3.17.5 (2025-05-22)</small>

### Bug Fixes

* fixed query exist for some ids ([6ef8bd2](https://github.com/wppconnect-team/wa-js/commit/6ef8bd2))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1517 (#2791) ([8a8a71f](https://github.com/wppconnect-team/wa-js/commit/8a8a71f)), closes [#2791](https://github.com/wppconnect-team/wa-js/issues/2791)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1518 (#2794) ([bfee5ff](https://github.com/wppconnect-team/wa-js/commit/bfee5ff)), closes [#2794](https://github.com/wppconnect-team/wa-js/issues/2794)
* **deps-dev:** update dependency debug to ^4.4.1 (#2792) ([b6de08d](https://github.com/wppconnect-team/wa-js/commit/b6de08d)), closes [#2792](https://github.com/wppconnect-team/wa-js/issues/2792)
* **deps-dev:** update dependency eslint-config-prettier to ^10.1.5 (#2795) ([4f3179c](https://github.com/wppconnect-team/wa-js/commit/4f3179c)), closes [#2795](https://github.com/wppconnect-team/wa-js/issues/2795)
* **deps-dev:** update dependency lint-staged to ^15.5.2 (#2796) ([c8337c6](https://github.com/wppconnect-team/wa-js/commit/c8337c6)), closes [#2796](https://github.com/wppconnect-team/wa-js/issues/2796)

## <small>3.17.4 (2025-05-16)</small>

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.1022850882 ([37ce274](https://github.com/wppconnect-team/wa-js/commit/37ce274))
* Fixed open chat data ([ea05ca7](https://github.com/wppconnect-team/wa-js/commit/ea05ca7))

### Build System

* **deps-dev:** update commitlint monorepo to ^19.8.1 (#2787) ([117e37c](https://github.com/wppconnect-team/wa-js/commit/117e37c)), closes [#2787](https://github.com/wppconnect-team/wa-js/issues/2787)
* **deps-dev:** update dependency @types/shelljs to ^0.8.16 (#2789) ([f70045a](https://github.com/wppconnect-team/wa-js/commit/f70045a)), closes [#2789](https://github.com/wppconnect-team/wa-js/issues/2789)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1505 (#2783) ([12323bd](https://github.com/wppconnect-team/wa-js/commit/12323bd)), closes [#2783](https://github.com/wppconnect-team/wa-js/issues/2783)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1513 (#2784) ([9905121](https://github.com/wppconnect-team/wa-js/commit/9905121)), closes [#2784](https://github.com/wppconnect-team/wa-js/issues/2784)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1516 (#2790) ([a8bb67d](https://github.com/wppconnect-team/wa-js/commit/a8bb67d)), closes [#2790](https://github.com/wppconnect-team/wa-js/issues/2790)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to v5 (#2742) ([3e70859](https://github.com/wppconnect-team/wa-js/commit/3e70859)), closes [#2742](https://github.com/wppconnect-team/wa-js/issues/2742)

## <small>3.17.3 (2025-05-11)</small>

### Features

* Exported ApiContact functions ([c998355](https://github.com/wppconnect-team/wa-js/commit/c998355))

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.1022383845 ([542623f](https://github.com/wppconnect-team/wa-js/commit/542623f))
* Fixed issue in getMessages with media ([49f678d](https://github.com/wppconnect-team/wa-js/commit/49f678d))
* Improovments on query exist (close #2762) ([5d92210](https://github.com/wppconnect-team/wa-js/commit/5d92210)), closes [#2762](https://github.com/wppconnect-team/wa-js/issues/2762)
* patch for send message error (close #2773) ([f246844](https://github.com/wppconnect-team/wa-js/commit/f246844)), closes [#2773](https://github.com/wppconnect-team/wa-js/issues/2773)

### Styles

* fixed build error ([3c1fae2](https://github.com/wppconnect-team/wa-js/commit/3c1fae2))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1484 (#2774) ([fb37b74](https://github.com/wppconnect-team/wa-js/commit/fb37b74)), closes [#2774](https://github.com/wppconnect-team/wa-js/issues/2774)
* **deps-dev:** update dependency eslint-config-prettier to ^10.1.3 (#2780) ([2650661](https://github.com/wppconnect-team/wa-js/commit/2650661)), closes [#2780](https://github.com/wppconnect-team/wa-js/issues/2780)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.4.0 (#2777) ([251acdd](https://github.com/wppconnect-team/wa-js/commit/251acdd)), closes [#2777](https://github.com/wppconnect-team/wa-js/issues/2777)
* **deps-dev:** update dependency lint-staged to ^15.5.1 (#2775) ([e6c1902](https://github.com/wppconnect-team/wa-js/commit/e6c1902)), closes [#2775](https://github.com/wppconnect-team/wa-js/issues/2775)
* **deps-dev:** update dependency release-it to v19 (#2771) ([170f3d7](https://github.com/wppconnect-team/wa-js/commit/170f3d7)), closes [#2771](https://github.com/wppconnect-team/wa-js/issues/2771)
* **deps-dev:** update dependency typedoc to ^0.28.4 (#2776) ([e65b2f9](https://github.com/wppconnect-team/wa-js/commit/e65b2f9)), closes [#2776](https://github.com/wppconnect-team/wa-js/issues/2776)
* **deps-dev:** update dependency webpack to ^5.99.8 (#2781) ([0a2ed30](https://github.com/wppconnect-team/wa-js/commit/0a2ed30)), closes [#2781](https://github.com/wppconnect-team/wa-js/issues/2781)
* **deps-dev:** update playwright monorepo to ^1.52.0 (#2778) ([ae220ea](https://github.com/wppconnect-team/wa-js/commit/ae220ea)), closes [#2778](https://github.com/wppconnect-team/wa-js/issues/2778)

## <small>3.17.2 (2025-04-30)</small>

### Bug Fixes

* Fixed  group.getInviteCode function (close #2748) ([c9e79c6](https://github.com/wppconnect-team/wa-js/commit/c9e79c6)), closes [#2748](https://github.com/wppconnect-team/wa-js/issues/2748)

### Documentation

* Update README.MD  ([581a136](https://github.com/wppconnect-team/wa-js/commit/581a136))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1320 (#2752) ([379ea24](https://github.com/wppconnect-team/wa-js/commit/379ea24)), closes [#2752](https://github.com/wppconnect-team/wa-js/issues/2752)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1364 (#2759) ([d59d350](https://github.com/wppconnect-team/wa-js/commit/d59d350)), closes [#2759](https://github.com/wppconnect-team/wa-js/issues/2759)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1396 (#2763) ([166ba6b](https://github.com/wppconnect-team/wa-js/commit/166ba6b)), closes [#2763](https://github.com/wppconnect-team/wa-js/issues/2763)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1429 (#2768) ([e02d80c](https://github.com/wppconnect-team/wa-js/commit/e02d80c)), closes [#2768](https://github.com/wppconnect-team/wa-js/issues/2768)
* **deps-dev:** update dependency eslint-config-prettier to ^10.1.2 (#2764) ([18111e7](https://github.com/wppconnect-team/wa-js/commit/18111e7)), closes [#2764](https://github.com/wppconnect-team/wa-js/issues/2764)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.2.6 (#2753) ([cfa4a3e](https://github.com/wppconnect-team/wa-js/commit/cfa4a3e)), closes [#2753](https://github.com/wppconnect-team/wa-js/issues/2753)
* **deps-dev:** update dependency typescript to ^5.8.3 (#2754) ([fe108ab](https://github.com/wppconnect-team/wa-js/commit/fe108ab)), closes [#2754](https://github.com/wppconnect-team/wa-js/issues/2754)
* **deps-dev:** update dependency webpack to ^5.99.5 (#2755) ([8f9d294](https://github.com/wppconnect-team/wa-js/commit/8f9d294)), closes [#2755](https://github.com/wppconnect-team/wa-js/issues/2755)
* **deps-dev:** update dependency webpack to ^5.99.6 (#2765) ([3e293a6](https://github.com/wppconnect-team/wa-js/commit/3e293a6)), closes [#2765](https://github.com/wppconnect-team/wa-js/issues/2765)
* **deps-dev:** update dependency webpack to ^5.99.7 (#2769) ([46df9fb](https://github.com/wppconnect-team/wa-js/commit/46df9fb)), closes [#2769](https://github.com/wppconnect-team/wa-js/issues/2769)

### Continuous Integration

* **deps:** update dependency node to v20.19.1 (#2770) ([a1f854b](https://github.com/wppconnect-team/wa-js/commit/a1f854b)), closes [#2770](https://github.com/wppconnect-team/wa-js/issues/2770)

## <small>3.17.1 (2025-04-02)</small>

### Bug Fixes

* fixed send message to some numbers ([b3478a5](https://github.com/wppconnect-team/wa-js/commit/b3478a5))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1276 (#2745) ([c69070c](https://github.com/wppconnect-team/wa-js/commit/c69070c)), closes [#2745](https://github.com/wppconnect-team/wa-js/issues/2745)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1280 (#2746) ([614fe78](https://github.com/wppconnect-team/wa-js/commit/614fe78)), closes [#2746](https://github.com/wppconnect-team/wa-js/issues/2746)

### Continuous Integration

* **deps:** update dependency node to v16.20.2 (#2738) ([d14e974](https://github.com/wppconnect-team/wa-js/commit/d14e974)), closes [#2738](https://github.com/wppconnect-team/wa-js/issues/2738)

## 3.17.0 (2025-03-28)

### Features

* Added support for send images with HD ([bf7f635](https://github.com/wppconnect-team/wa-js/commit/bf7f635))

### Bug Fixes

* Fixed find function ([e046af3](https://github.com/wppconnect-team/wa-js/commit/e046af3))
* Fixed functions for whatsapp >= 2.3000.10213.x ([42fb1c8](https://github.com/wppconnect-team/wa-js/commit/42fb1c8))
* Fixed getHistorySyncProgress function (close #2734) ([ca97179](https://github.com/wppconnect-team/wa-js/commit/ca97179)), closes [#2734](https://github.com/wppconnect-team/wa-js/issues/2734)
* Fixed openChatAt error (close #2727) ([d475208](https://github.com/wppconnect-team/wa-js/commit/d475208)), closes [#2727](https://github.com/wppconnect-team/wa-js/issues/2727)

### Styles

* Fixed find function ([5aa31b4](https://github.com/wppconnect-team/wa-js/commit/5aa31b4))
* Fixed openChatAt error (close #2727) (#2730) ([85a07f0](https://github.com/wppconnect-team/wa-js/commit/85a07f0)), closes [#2727](https://github.com/wppconnect-team/wa-js/issues/2727) [#2730](https://github.com/wppconnect-team/wa-js/issues/2730)
* Fixed reject call ([3162b6c](https://github.com/wppconnect-team/wa-js/commit/3162b6c))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1252 (#2725) ([8ae2bd4](https://github.com/wppconnect-team/wa-js/commit/8ae2bd4)), closes [#2725](https://github.com/wppconnect-team/wa-js/issues/2725)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1256 (#2740) ([48b71be](https://github.com/wppconnect-team/wa-js/commit/48b71be)), closes [#2740](https://github.com/wppconnect-team/wa-js/issues/2740)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1257 (#2741) ([5fd5431](https://github.com/wppconnect-team/wa-js/commit/5fd5431)), closes [#2741](https://github.com/wppconnect-team/wa-js/issues/2741)
* **deps-dev:** update dependency lint-staged to ^15.5.0 (#2724) ([4a61f1f](https://github.com/wppconnect-team/wa-js/commit/4a61f1f)), closes [#2724](https://github.com/wppconnect-team/wa-js/issues/2724)
* **deps-dev:** update dependency shx to ^0.4.0 (#2731) ([4f297f0](https://github.com/wppconnect-team/wa-js/commit/4f297f0)), closes [#2731](https://github.com/wppconnect-team/wa-js/issues/2731)
* **deps-dev:** update dependency typedoc to ^0.28.1 (#2735) ([f64dafc](https://github.com/wppconnect-team/wa-js/commit/f64dafc)), closes [#2735](https://github.com/wppconnect-team/wa-js/issues/2735)
* **deps-dev:** update dependency typescript to ^5.8.2 (#2709) ([66c0973](https://github.com/wppconnect-team/wa-js/commit/66c0973)), closes [#2709](https://github.com/wppconnect-team/wa-js/issues/2709)
* **deps-dev:** update playwright monorepo to ^1.51.1 (#2732) ([ec02e36](https://github.com/wppconnect-team/wa-js/commit/ec02e36)), closes [#2732](https://github.com/wppconnect-team/wa-js/issues/2732)

### Continuous Integration

* **deps:** update actions/setup-node action to v4.3.0 (#2737) ([9793e2c](https://github.com/wppconnect-team/wa-js/commit/9793e2c)), closes [#2737](https://github.com/wppconnect-team/wa-js/issues/2737)
* **deps:** update dependency node to v20.19.0 (#2733) ([83150b0](https://github.com/wppconnect-team/wa-js/commit/83150b0)), closes [#2733](https://github.com/wppconnect-team/wa-js/issues/2733)

### Chores

* **types:** add typings and docs in sendQueryGroupInvite ([8995a5f](https://github.com/wppconnect-team/wa-js/commit/8995a5f))

## <small>3.16.9 (2025-03-27)</small>

### Documentation

* fixed build ([e25c794](https://github.com/wppconnect-team/wa-js/commit/e25c794))

### Styles

* fixed send text message ([9ccec2a](https://github.com/wppconnect-team/wa-js/commit/9ccec2a))

### Build System

* **deps-dev:** update dependency eslint-config-prettier to ^10.1.1 (#2722) ([3209bec](https://github.com/wppconnect-team/wa-js/commit/3209bec)), closes [#2722](https://github.com/wppconnect-team/wa-js/issues/2722)

## <small>3.16.8 (2025-03-26)</small>

### Bug Fixes

* Fixed google analytics ([c103eb9](https://github.com/wppconnect-team/wa-js/commit/c103eb9))
* fixed wrapper for findOrCreateLatestChat ([b11aba9](https://github.com/wppconnect-team/wa-js/commit/b11aba9))

### Build System

* **deps-dev:** update commitlint monorepo to ^19.8.0 (#2721) ([01e2cc3](https://github.com/wppconnect-team/wa-js/commit/01e2cc3)), closes [#2721](https://github.com/wppconnect-team/wa-js/issues/2721)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.2.5 (#2720) ([55f69d5](https://github.com/wppconnect-team/wa-js/commit/55f69d5)), closes [#2720](https://github.com/wppconnect-team/wa-js/issues/2720)

## <small>3.16.7 (2025-03-26)</small>

### Bug Fixes

* Fixed functions for  version >= 2.3000.10206.x ([a0b13ff](https://github.com/wppconnect-team/wa-js/commit/a0b13ff))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1243 (#2712) ([126d94e](https://github.com/wppconnect-team/wa-js/commit/126d94e)), closes [#2712](https://github.com/wppconnect-team/wa-js/issues/2712)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.3.14 (#2711) ([f912c9b](https://github.com/wppconnect-team/wa-js/commit/f912c9b)), closes [#2711](https://github.com/wppconnect-team/wa-js/issues/2711)

## <small>3.16.6 (2025-03-08)</small>

### Bug Fixes

* disable Google Analytics tracking by default ([4c63e58](https://github.com/wppconnect-team/wa-js/commit/4c63e58))
* Fixed sendPixKeyMessage function ([1f57e78](https://github.com/wppconnect-team/wa-js/commit/1f57e78))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1116 (#2697) ([d4cc76d](https://github.com/wppconnect-team/wa-js/commit/d4cc76d)), closes [#2697](https://github.com/wppconnect-team/wa-js/issues/2697)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1120 (#2702) ([6b82dfe](https://github.com/wppconnect-team/wa-js/commit/6b82dfe)), closes [#2702](https://github.com/wppconnect-team/wa-js/issues/2702)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1126 (#2703) ([5eb13b3](https://github.com/wppconnect-team/wa-js/commit/5eb13b3)), closes [#2703](https://github.com/wppconnect-team/wa-js/issues/2703)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1138 (#2705) ([c780023](https://github.com/wppconnect-team/wa-js/commit/c780023)), closes [#2705](https://github.com/wppconnect-team/wa-js/issues/2705)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1140 (#2708) ([58822ce](https://github.com/wppconnect-team/wa-js/commit/58822ce)), closes [#2708](https://github.com/wppconnect-team/wa-js/issues/2708)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1142 (#2710) ([a5c1b52](https://github.com/wppconnect-team/wa-js/commit/a5c1b52)), closes [#2710](https://github.com/wppconnect-team/wa-js/issues/2710)
* **deps-dev:** update dependency eslint-config-prettier to ^10.0.2 (#2700) ([4f00073](https://github.com/wppconnect-team/wa-js/commit/4f00073)), closes [#2700](https://github.com/wppconnect-team/wa-js/issues/2700)
* **deps-dev:** update dependency prettier to ^3.5.3 (#2704) ([b3b9af6](https://github.com/wppconnect-team/wa-js/commit/b3b9af6)), closes [#2704](https://github.com/wppconnect-team/wa-js/issues/2704)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.3.13 (#2701) ([768952d](https://github.com/wppconnect-team/wa-js/commit/768952d)), closes [#2701](https://github.com/wppconnect-team/wa-js/issues/2701)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.15 (#2706) ([14178e9](https://github.com/wppconnect-team/wa-js/commit/14178e9)), closes [#2706](https://github.com/wppconnect-team/wa-js/issues/2706)

## <small>3.16.5 (2025-02-26)</small>

### Bug Fixes

* Fixed count when count with archived chats ([cb83006](https://github.com/wppconnect-team/wa-js/commit/cb83006))
* Fixed whatsapp functions >= 2.3000.1019954024 ([0222a8b](https://github.com/wppconnect-team/wa-js/commit/0222a8b))

### Styles

* remove console.log ([66fa8cc](https://github.com/wppconnect-team/wa-js/commit/66fa8cc))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1033 (#2674) ([d68474a](https://github.com/wppconnect-team/wa-js/commit/d68474a)), closes [#2674](https://github.com/wppconnect-team/wa-js/issues/2674)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1045 (#2677) ([a729bb5](https://github.com/wppconnect-team/wa-js/commit/a729bb5)), closes [#2677](https://github.com/wppconnect-team/wa-js/issues/2677)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1046 (#2679) ([33dc816](https://github.com/wppconnect-team/wa-js/commit/33dc816)), closes [#2679](https://github.com/wppconnect-team/wa-js/issues/2679)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1065 (#2680) ([47c8211](https://github.com/wppconnect-team/wa-js/commit/47c8211)), closes [#2680](https://github.com/wppconnect-team/wa-js/issues/2680)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1068 (#2685) ([cb40bb8](https://github.com/wppconnect-team/wa-js/commit/cb40bb8)), closes [#2685](https://github.com/wppconnect-team/wa-js/issues/2685)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1103 (#2689) ([81df7e8](https://github.com/wppconnect-team/wa-js/commit/81df7e8)), closes [#2689](https://github.com/wppconnect-team/wa-js/issues/2689)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1104 (#2693) ([9b25a38](https://github.com/wppconnect-team/wa-js/commit/9b25a38)), closes [#2693](https://github.com/wppconnect-team/wa-js/issues/2693)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1106 (#2694) ([9368ebe](https://github.com/wppconnect-team/wa-js/commit/9368ebe)), closes [#2694](https://github.com/wppconnect-team/wa-js/issues/2694)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1107 (#2696) ([5055024](https://github.com/wppconnect-team/wa-js/commit/5055024)), closes [#2696](https://github.com/wppconnect-team/wa-js/issues/2696)
* **deps-dev:** update dependency prettier to ^3.5.0 (#2676) ([6c03ea8](https://github.com/wppconnect-team/wa-js/commit/6c03ea8)), closes [#2676](https://github.com/wppconnect-team/wa-js/issues/2676)
* **deps-dev:** update dependency prettier to ^3.5.1 (#2684) ([696dacb](https://github.com/wppconnect-team/wa-js/commit/696dacb)), closes [#2684](https://github.com/wppconnect-team/wa-js/issues/2684)
* **deps-dev:** update dependency prettier to ^3.5.2 (#2690) ([e138ff0](https://github.com/wppconnect-team/wa-js/commit/e138ff0)), closes [#2690](https://github.com/wppconnect-team/wa-js/issues/2690)
* **deps-dev:** update dependency typedoc to ^0.27.8 (#2678) ([1c4ae53](https://github.com/wppconnect-team/wa-js/commit/1c4ae53)), closes [#2678](https://github.com/wppconnect-team/wa-js/issues/2678)
* **deps-dev:** update dependency typedoc to ^0.27.9 (#2695) ([4618ccd](https://github.com/wppconnect-team/wa-js/commit/4618ccd)), closes [#2695](https://github.com/wppconnect-team/wa-js/issues/2695)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.12 (#2675) ([fba6bf4](https://github.com/wppconnect-team/wa-js/commit/fba6bf4)), closes [#2675](https://github.com/wppconnect-team/wa-js/issues/2675)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.14 (#2692) ([d392112](https://github.com/wppconnect-team/wa-js/commit/d392112)), closes [#2692](https://github.com/wppconnect-team/wa-js/issues/2692)
* **deps-dev:** update dependency webpack to ^5.98.0 (#2686) ([d0397bf](https://github.com/wppconnect-team/wa-js/commit/d0397bf)), closes [#2686](https://github.com/wppconnect-team/wa-js/issues/2686)

## <small>3.16.4 (2025-02-08)</small>

### Bug Fixes

* Fixed WPP.contact.queryExists - invalid wid close #2672 (#2673) ([6b17fe8](https://github.com/wppconnect-team/wa-js/commit/6b17fe8)), closes [#2672](https://github.com/wppconnect-team/wa-js/issues/2672) [#2673](https://github.com/wppconnect-team/wa-js/issues/2673)

### Build System

* **deps-dev:** update commitlint monorepo to ^19.7.1 (#2664) ([b49870c](https://github.com/wppconnect-team/wa-js/commit/b49870c)), closes [#2664](https://github.com/wppconnect-team/wa-js/issues/2664)
* **deps-dev:** update dependency @types/node to ^16.18.126 (#2667) ([aebe4b4](https://github.com/wppconnect-team/wa-js/commit/aebe4b4)), closes [#2667](https://github.com/wppconnect-team/wa-js/issues/2667)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1021 (#2666) ([3db3a76](https://github.com/wppconnect-team/wa-js/commit/3db3a76)), closes [#2666](https://github.com/wppconnect-team/wa-js/issues/2666)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1028 (#2668) ([8b20423](https://github.com/wppconnect-team/wa-js/commit/8b20423)), closes [#2668](https://github.com/wppconnect-team/wa-js/issues/2668)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1032 (#2671) ([16dcb55](https://github.com/wppconnect-team/wa-js/commit/16dcb55)), closes [#2671](https://github.com/wppconnect-team/wa-js/issues/2671)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.987 (#2651) ([2f20c4f](https://github.com/wppconnect-team/wa-js/commit/2f20c4f)), closes [#2651](https://github.com/wppconnect-team/wa-js/issues/2651)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.991 (#2655) ([1e53f20](https://github.com/wppconnect-team/wa-js/commit/1e53f20)), closes [#2655](https://github.com/wppconnect-team/wa-js/issues/2655)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.992 (#2658) ([bbd25c6](https://github.com/wppconnect-team/wa-js/commit/bbd25c6)), closes [#2658](https://github.com/wppconnect-team/wa-js/issues/2658)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.997 (#2659) ([aa2fee7](https://github.com/wppconnect-team/wa-js/commit/aa2fee7)), closes [#2659](https://github.com/wppconnect-team/wa-js/issues/2659)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.999 (#2663) ([b2a6cc4](https://github.com/wppconnect-team/wa-js/commit/b2a6cc4)), closes [#2663](https://github.com/wppconnect-team/wa-js/issues/2663)
* **deps-dev:** update dependency lint-staged to ^15.4.3 (#2654) ([8b07862](https://github.com/wppconnect-team/wa-js/commit/8b07862)), closes [#2654](https://github.com/wppconnect-team/wa-js/issues/2654)
* **deps-dev:** update dependency ts-morph to ^25.0.1 (#2670) ([1b83cf5](https://github.com/wppconnect-team/wa-js/commit/1b83cf5)), closes [#2670](https://github.com/wppconnect-team/wa-js/issues/2670)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.10 (#2653) ([45fbdd1](https://github.com/wppconnect-team/wa-js/commit/45fbdd1)), closes [#2653](https://github.com/wppconnect-team/wa-js/issues/2653)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.11 (#2662) ([8e0b85d](https://github.com/wppconnect-team/wa-js/commit/8e0b85d)), closes [#2662](https://github.com/wppconnect-team/wa-js/issues/2662)
* **deps-dev:** update playwright monorepo to ^1.50.0 (#2656) ([98a96a7](https://github.com/wppconnect-team/wa-js/commit/98a96a7)), closes [#2656](https://github.com/wppconnect-team/wa-js/issues/2656)
* **deps-dev:** update playwright monorepo to ^1.50.1 (#2661) ([e3dbe0f](https://github.com/wppconnect-team/wa-js/commit/e3dbe0f)), closes [#2661](https://github.com/wppconnect-team/wa-js/issues/2661)

### Continuous Integration

* **deps:** update actions/setup-node action to v4.2.0 (#2657) ([7c74974](https://github.com/wppconnect-team/wa-js/commit/7c74974)), closes [#2657](https://github.com/wppconnect-team/wa-js/issues/2657)

### Chores

* **deps:** lock file maintenance (#2665) ([17cac2d](https://github.com/wppconnect-team/wa-js/commit/17cac2d)), closes [#2665](https://github.com/wppconnect-team/wa-js/issues/2665)

## <small>3.16.3 (2025-01-29)</small>

### Bug Fixes

* Fixed error on send message to  lids (close #2644) (#2650) ([936b8de](https://github.com/wppconnect-team/wa-js/commit/936b8de)), closes [#2644](https://github.com/wppconnect-team/wa-js/issues/2644) [#2650](https://github.com/wppconnect-team/wa-js/issues/2650)
* Fixed WPP.chat.openChatAt function (#2630) ([f3ae21c](https://github.com/wppconnect-team/wa-js/commit/f3ae21c)), closes [#2630](https://github.com/wppconnect-team/wa-js/issues/2630)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.125 (#2648) ([f484647](https://github.com/wppconnect-team/wa-js/commit/f484647)), closes [#2648](https://github.com/wppconnect-team/wa-js/issues/2648)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.984 (#2643) ([2166a30](https://github.com/wppconnect-team/wa-js/commit/2166a30)), closes [#2643](https://github.com/wppconnect-team/wa-js/issues/2643)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.2.3 (#2649) ([e5f9a8e](https://github.com/wppconnect-team/wa-js/commit/e5f9a8e)), closes [#2649](https://github.com/wppconnect-team/wa-js/issues/2649)
* **deps-dev:** update dependency release-it to ^18.1.2 (#2652) ([6ecf8c7](https://github.com/wppconnect-team/wa-js/commit/6ecf8c7)), closes [#2652](https://github.com/wppconnect-team/wa-js/issues/2652)
* **deps-dev:** update dependency ts-morph to v25 (#2625) ([3251fb7](https://github.com/wppconnect-team/wa-js/commit/3251fb7)), closes [#2625](https://github.com/wppconnect-team/wa-js/issues/2625)

## <small>3.16.2 (2025-01-15)</small>

### Build System

* **deps-dev:** update dependency eslint-config-prettier to v10 (#2641) ([dffb36b](https://github.com/wppconnect-team/wa-js/commit/dffb36b)), closes [#2641](https://github.com/wppconnect-team/wa-js/issues/2641)
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.2.2 (#2640) ([c54a6aa](https://github.com/wppconnect-team/wa-js/commit/c54a6aa)), closes [#2640](https://github.com/wppconnect-team/wa-js/issues/2640)

### Chores

* fixed input type for releases and revert lid migration ([f4c9b05](https://github.com/wppconnect-team/wa-js/commit/f4c9b05))

## <small>3.16.1 (2025-01-15)</small>

### Features

* Exported Lid1X1MigrationUtils ([5e55a13](https://github.com/wppconnect-team/wa-js/commit/5e55a13))

### Bug Fixes

* Fixed send message to lids ([a9a81ac](https://github.com/wppconnect-team/wa-js/commit/a9a81ac))

### Build System

* **deps-dev:** update dependency @commitlint/prompt-cli to ^19.7.0 (#2636) ([57ac748](https://github.com/wppconnect-team/wa-js/commit/57ac748)), closes [#2636](https://github.com/wppconnect-team/wa-js/issues/2636)
* **deps-dev:** update dependency @types/node to ^16.18.123 (#2629) ([739e701](https://github.com/wppconnect-team/wa-js/commit/739e701)), closes [#2629](https://github.com/wppconnect-team/wa-js/issues/2629)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.830 (#2602) ([5888911](https://github.com/wppconnect-team/wa-js/commit/5888911)), closes [#2602](https://github.com/wppconnect-team/wa-js/issues/2602)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.831 (#2603) ([3ec88e8](https://github.com/wppconnect-team/wa-js/commit/3ec88e8)), closes [#2603](https://github.com/wppconnect-team/wa-js/issues/2603)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.833 (#2605) ([638f019](https://github.com/wppconnect-team/wa-js/commit/638f019)), closes [#2605](https://github.com/wppconnect-team/wa-js/issues/2605)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.834 (#2606) ([51c06b8](https://github.com/wppconnect-team/wa-js/commit/51c06b8)), closes [#2606](https://github.com/wppconnect-team/wa-js/issues/2606)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.838 (#2608) ([89d1c07](https://github.com/wppconnect-team/wa-js/commit/89d1c07)), closes [#2608](https://github.com/wppconnect-team/wa-js/issues/2608)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.839 (#2611) ([a05c699](https://github.com/wppconnect-team/wa-js/commit/a05c699)), closes [#2611](https://github.com/wppconnect-team/wa-js/issues/2611)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.842 (#2612) ([2aab252](https://github.com/wppconnect-team/wa-js/commit/2aab252)), closes [#2612](https://github.com/wppconnect-team/wa-js/issues/2612)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.843 (#2613) ([659f35b](https://github.com/wppconnect-team/wa-js/commit/659f35b)), closes [#2613](https://github.com/wppconnect-team/wa-js/issues/2613)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.844 (#2614) ([90b35ab](https://github.com/wppconnect-team/wa-js/commit/90b35ab)), closes [#2614](https://github.com/wppconnect-team/wa-js/issues/2614)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.849 (#2615) ([a75d9c2](https://github.com/wppconnect-team/wa-js/commit/a75d9c2)), closes [#2615](https://github.com/wppconnect-team/wa-js/issues/2615)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.850 (#2617) ([dbf846c](https://github.com/wppconnect-team/wa-js/commit/dbf846c)), closes [#2617](https://github.com/wppconnect-team/wa-js/issues/2617)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.851 (#2618) ([87be73c](https://github.com/wppconnect-team/wa-js/commit/87be73c)), closes [#2618](https://github.com/wppconnect-team/wa-js/issues/2618)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.853 (#2619) ([ab26a93](https://github.com/wppconnect-team/wa-js/commit/ab26a93)), closes [#2619](https://github.com/wppconnect-team/wa-js/issues/2619)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.861 (#2621) ([a192b41](https://github.com/wppconnect-team/wa-js/commit/a192b41)), closes [#2621](https://github.com/wppconnect-team/wa-js/issues/2621)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.862 (#2624) ([e7c7e93](https://github.com/wppconnect-team/wa-js/commit/e7c7e93)), closes [#2624](https://github.com/wppconnect-team/wa-js/issues/2624)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.865 (#2626) ([ac3bf76](https://github.com/wppconnect-team/wa-js/commit/ac3bf76)), closes [#2626](https://github.com/wppconnect-team/wa-js/issues/2626)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.866 (#2627) ([b0a5d7b](https://github.com/wppconnect-team/wa-js/commit/b0a5d7b)), closes [#2627](https://github.com/wppconnect-team/wa-js/issues/2627)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.869 (#2628) ([10e17b0](https://github.com/wppconnect-team/wa-js/commit/10e17b0)), closes [#2628](https://github.com/wppconnect-team/wa-js/issues/2628)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.922 (#2632) ([1921170](https://github.com/wppconnect-team/wa-js/commit/1921170)), closes [#2632](https://github.com/wppconnect-team/wa-js/issues/2632)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.926 (#2639) ([afc1d2f](https://github.com/wppconnect-team/wa-js/commit/afc1d2f)), closes [#2639](https://github.com/wppconnect-team/wa-js/issues/2639)
* **deps-dev:** update dependency lint-staged to ^15.3.0 (#2620) ([1bf9a2c](https://github.com/wppconnect-team/wa-js/commit/1bf9a2c)), closes [#2620](https://github.com/wppconnect-team/wa-js/issues/2620)
* **deps-dev:** update dependency release-it to ^17.11.0 (#2609) ([a17b195](https://github.com/wppconnect-team/wa-js/commit/a17b195)), closes [#2609](https://github.com/wppconnect-team/wa-js/issues/2609)
* **deps-dev:** update dependency release-it to v18 (#2637) ([c53f7f2](https://github.com/wppconnect-team/wa-js/commit/c53f7f2)), closes [#2637](https://github.com/wppconnect-team/wa-js/issues/2637)
* **deps-dev:** update dependency ts-loader to ^9.5.2 (#2633) ([5e59872](https://github.com/wppconnect-team/wa-js/commit/5e59872)), closes [#2633](https://github.com/wppconnect-team/wa-js/issues/2633)
* **deps-dev:** update dependency typedoc to ^0.27.6 (#2616) ([49e5e4a](https://github.com/wppconnect-team/wa-js/commit/49e5e4a)), closes [#2616](https://github.com/wppconnect-team/wa-js/issues/2616)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.6 (#2604) ([2a2bac2](https://github.com/wppconnect-team/wa-js/commit/2a2bac2)), closes [#2604](https://github.com/wppconnect-team/wa-js/issues/2604)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.8 (#2634) ([09e59b3](https://github.com/wppconnect-team/wa-js/commit/09e59b3)), closes [#2634](https://github.com/wppconnect-team/wa-js/issues/2634)
* **deps-dev:** update dependency typescript to ^5.7.3 (#2635) ([8c67064](https://github.com/wppconnect-team/wa-js/commit/8c67064)), closes [#2635](https://github.com/wppconnect-team/wa-js/issues/2635)

### Chores

* **deps:** lock file maintenance (#2607) ([5051556](https://github.com/wppconnect-team/wa-js/commit/5051556)), closes [#2607](https://github.com/wppconnect-team/wa-js/issues/2607)
* **deps:** lock file maintenance (#2622) ([e236aa5](https://github.com/wppconnect-team/wa-js/commit/e236aa5)), closes [#2622](https://github.com/wppconnect-team/wa-js/issues/2622)
* **deps:** lock file maintenance (#2623) ([92dc1cb](https://github.com/wppconnect-team/wa-js/commit/92dc1cb)), closes [#2623](https://github.com/wppconnect-team/wa-js/issues/2623)
* update node version from workflows ([2f6c84e](https://github.com/wppconnect-team/wa-js/commit/2f6c84e))
* update node version workflow release to v20 ([6c902d3](https://github.com/wppconnect-team/wa-js/commit/6c902d3))

## 3.16.0 (2024-12-20)

### Features

* Added WPP.chat.sendCatalogMessage (close #2550) ([95e0592](https://github.com/wppconnect-team/wa-js/commit/95e0592)), closes [#2550](https://github.com/wppconnect-team/wa-js/issues/2550)

### Bug Fixes

* Fixed send message to newsletter (close #2528) ([a121ac0](https://github.com/wppconnect-team/wa-js/commit/a121ac0)), closes [#2528](https://github.com/wppconnect-team/wa-js/issues/2528)

### Build System

* **deps-dev:** update commitlint monorepo to ^19.6.1 (#2590) ([8567839](https://github.com/wppconnect-team/wa-js/commit/8567839)), closes [#2590](https://github.com/wppconnect-team/wa-js/issues/2590)
* **deps-dev:** update dependency @types/node to ^16.18.120 (#2543) ([c0c04d0](https://github.com/wppconnect-team/wa-js/commit/c0c04d0)), closes [#2543](https://github.com/wppconnect-team/wa-js/issues/2543)
* **deps-dev:** update dependency @types/node to ^16.18.121 (#2553) ([fbe68c3](https://github.com/wppconnect-team/wa-js/commit/fbe68c3)), closes [#2553](https://github.com/wppconnect-team/wa-js/issues/2553)
* **deps-dev:** update dependency @types/node to ^16.18.122 ([5c38959](https://github.com/wppconnect-team/wa-js/commit/5c38959))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.681 (#2518) ([e8811eb](https://github.com/wppconnect-team/wa-js/commit/e8811eb)), closes [#2518](https://github.com/wppconnect-team/wa-js/issues/2518)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.682 (#2519) ([b5f597f](https://github.com/wppconnect-team/wa-js/commit/b5f597f)), closes [#2519](https://github.com/wppconnect-team/wa-js/issues/2519)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.686 (#2520) ([b5a640c](https://github.com/wppconnect-team/wa-js/commit/b5a640c)), closes [#2520](https://github.com/wppconnect-team/wa-js/issues/2520)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.688 (#2521) ([d122cef](https://github.com/wppconnect-team/wa-js/commit/d122cef)), closes [#2521](https://github.com/wppconnect-team/wa-js/issues/2521)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.692 (#2522) ([e650987](https://github.com/wppconnect-team/wa-js/commit/e650987)), closes [#2522](https://github.com/wppconnect-team/wa-js/issues/2522)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.693 (#2524) ([3a443d6](https://github.com/wppconnect-team/wa-js/commit/3a443d6)), closes [#2524](https://github.com/wppconnect-team/wa-js/issues/2524)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.696 (#2525) ([e0a702b](https://github.com/wppconnect-team/wa-js/commit/e0a702b)), closes [#2525](https://github.com/wppconnect-team/wa-js/issues/2525)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.697 (#2529) ([f4df8a5](https://github.com/wppconnect-team/wa-js/commit/f4df8a5)), closes [#2529](https://github.com/wppconnect-team/wa-js/issues/2529)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.699 (#2532) ([74cbbb4](https://github.com/wppconnect-team/wa-js/commit/74cbbb4)), closes [#2532](https://github.com/wppconnect-team/wa-js/issues/2532)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.700 (#2534) ([263e115](https://github.com/wppconnect-team/wa-js/commit/263e115)), closes [#2534](https://github.com/wppconnect-team/wa-js/issues/2534)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.704 (#2535) ([3f39465](https://github.com/wppconnect-team/wa-js/commit/3f39465)), closes [#2535](https://github.com/wppconnect-team/wa-js/issues/2535)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.705 (#2536) ([ec96f7c](https://github.com/wppconnect-team/wa-js/commit/ec96f7c)), closes [#2536](https://github.com/wppconnect-team/wa-js/issues/2536)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.708 (#2537) ([30e54ba](https://github.com/wppconnect-team/wa-js/commit/30e54ba)), closes [#2537](https://github.com/wppconnect-team/wa-js/issues/2537)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.709 (#2541) ([cab4348](https://github.com/wppconnect-team/wa-js/commit/cab4348)), closes [#2541](https://github.com/wppconnect-team/wa-js/issues/2541)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.710 (#2542) ([e4c0ffb](https://github.com/wppconnect-team/wa-js/commit/e4c0ffb)), closes [#2542](https://github.com/wppconnect-team/wa-js/issues/2542)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.711 (#2544) ([fdf2e29](https://github.com/wppconnect-team/wa-js/commit/fdf2e29)), closes [#2544](https://github.com/wppconnect-team/wa-js/issues/2544)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.716 (#2545) ([9458217](https://github.com/wppconnect-team/wa-js/commit/9458217)), closes [#2545](https://github.com/wppconnect-team/wa-js/issues/2545)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.752 (#2548) ([ed75ada](https://github.com/wppconnect-team/wa-js/commit/ed75ada)), closes [#2548](https://github.com/wppconnect-team/wa-js/issues/2548)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.753 (#2557) ([a275a5b](https://github.com/wppconnect-team/wa-js/commit/a275a5b)), closes [#2557](https://github.com/wppconnect-team/wa-js/issues/2557)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.754 (#2560) ([d38ea1b](https://github.com/wppconnect-team/wa-js/commit/d38ea1b)), closes [#2560](https://github.com/wppconnect-team/wa-js/issues/2560)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.756 (#2561) ([87aaaa1](https://github.com/wppconnect-team/wa-js/commit/87aaaa1)), closes [#2561](https://github.com/wppconnect-team/wa-js/issues/2561)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.758 (#2563) ([d386868](https://github.com/wppconnect-team/wa-js/commit/d386868)), closes [#2563](https://github.com/wppconnect-team/wa-js/issues/2563)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.760 (#2564) ([60f0720](https://github.com/wppconnect-team/wa-js/commit/60f0720)), closes [#2564](https://github.com/wppconnect-team/wa-js/issues/2564)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.765 (#2565) ([4f10082](https://github.com/wppconnect-team/wa-js/commit/4f10082)), closes [#2565](https://github.com/wppconnect-team/wa-js/issues/2565)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.767 (#2567) ([a547cc4](https://github.com/wppconnect-team/wa-js/commit/a547cc4)), closes [#2567](https://github.com/wppconnect-team/wa-js/issues/2567)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.768 (#2569) ([3ff1d85](https://github.com/wppconnect-team/wa-js/commit/3ff1d85)), closes [#2569](https://github.com/wppconnect-team/wa-js/issues/2569)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.770 (#2571) ([36144fb](https://github.com/wppconnect-team/wa-js/commit/36144fb)), closes [#2571](https://github.com/wppconnect-team/wa-js/issues/2571)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.773 (#2573) ([9caf9c9](https://github.com/wppconnect-team/wa-js/commit/9caf9c9)), closes [#2573](https://github.com/wppconnect-team/wa-js/issues/2573)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.776 (#2574) ([32c02ae](https://github.com/wppconnect-team/wa-js/commit/32c02ae)), closes [#2574](https://github.com/wppconnect-team/wa-js/issues/2574)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.778 (#2577) ([f615323](https://github.com/wppconnect-team/wa-js/commit/f615323)), closes [#2577](https://github.com/wppconnect-team/wa-js/issues/2577)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.783 (#2578) ([a0e5350](https://github.com/wppconnect-team/wa-js/commit/a0e5350)), closes [#2578](https://github.com/wppconnect-team/wa-js/issues/2578)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.788 (#2580) ([5b8ded0](https://github.com/wppconnect-team/wa-js/commit/5b8ded0)), closes [#2580](https://github.com/wppconnect-team/wa-js/issues/2580)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.791 (#2581) ([6ee9587](https://github.com/wppconnect-team/wa-js/commit/6ee9587)), closes [#2581](https://github.com/wppconnect-team/wa-js/issues/2581)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.793 (#2582) ([8dac0f8](https://github.com/wppconnect-team/wa-js/commit/8dac0f8)), closes [#2582](https://github.com/wppconnect-team/wa-js/issues/2582)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.794 (#2584) ([d55f90d](https://github.com/wppconnect-team/wa-js/commit/d55f90d)), closes [#2584](https://github.com/wppconnect-team/wa-js/issues/2584)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.797 (#2585) ([c8011d4](https://github.com/wppconnect-team/wa-js/commit/c8011d4)), closes [#2585](https://github.com/wppconnect-team/wa-js/issues/2585)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.798 (#2587) ([ffdcbe9](https://github.com/wppconnect-team/wa-js/commit/ffdcbe9)), closes [#2587](https://github.com/wppconnect-team/wa-js/issues/2587)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.800 (#2588) ([c7d2732](https://github.com/wppconnect-team/wa-js/commit/c7d2732)), closes [#2588](https://github.com/wppconnect-team/wa-js/issues/2588)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.811 (#2591) ([7e04e3d](https://github.com/wppconnect-team/wa-js/commit/7e04e3d)), closes [#2591](https://github.com/wppconnect-team/wa-js/issues/2591)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.815 (#2595) ([0a2c495](https://github.com/wppconnect-team/wa-js/commit/0a2c495)), closes [#2595](https://github.com/wppconnect-team/wa-js/issues/2595)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.818 (#2596) ([915e7c2](https://github.com/wppconnect-team/wa-js/commit/915e7c2)), closes [#2596](https://github.com/wppconnect-team/wa-js/issues/2596)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.822 (#2597) ([1c3583f](https://github.com/wppconnect-team/wa-js/commit/1c3583f)), closes [#2597](https://github.com/wppconnect-team/wa-js/issues/2597)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.823 (#2598) ([c2cd691](https://github.com/wppconnect-team/wa-js/commit/c2cd691)), closes [#2598](https://github.com/wppconnect-team/wa-js/issues/2598)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.825 (#2600) ([d6d6d6e](https://github.com/wppconnect-team/wa-js/commit/d6d6d6e)), closes [#2600](https://github.com/wppconnect-team/wa-js/issues/2600)
* **deps-dev:** update dependency debug to ^4.4.0 (#2562) ([1e44318](https://github.com/wppconnect-team/wa-js/commit/1e44318)), closes [#2562](https://github.com/wppconnect-team/wa-js/issues/2562)
* **deps-dev:** update dependency lint-staged to ^15.2.11 (#2576) ([31dee59](https://github.com/wppconnect-team/wa-js/commit/31dee59)), closes [#2576](https://github.com/wppconnect-team/wa-js/issues/2576)
* **deps-dev:** update dependency prettier to ^3.4.0 (#2546) ([5b25ea6](https://github.com/wppconnect-team/wa-js/commit/5b25ea6)), closes [#2546](https://github.com/wppconnect-team/wa-js/issues/2546)
* **deps-dev:** update dependency prettier to ^3.4.1 (#2547) ([072b4f7](https://github.com/wppconnect-team/wa-js/commit/072b4f7)), closes [#2547](https://github.com/wppconnect-team/wa-js/issues/2547)
* **deps-dev:** update dependency prettier to ^3.4.2 (#2555) ([0a05e48](https://github.com/wppconnect-team/wa-js/commit/0a05e48)), closes [#2555](https://github.com/wppconnect-team/wa-js/issues/2555)
* **deps-dev:** update dependency terser-webpack-plugin to ^5.3.11 (#2583) ([eb593c8](https://github.com/wppconnect-team/wa-js/commit/eb593c8)), closes [#2583](https://github.com/wppconnect-team/wa-js/issues/2583)
* **deps-dev:** update dependency typedoc to ^0.27.2 (#2549) ([d7be8b1](https://github.com/wppconnect-team/wa-js/commit/d7be8b1)), closes [#2549](https://github.com/wppconnect-team/wa-js/issues/2549)
* **deps-dev:** update dependency typedoc to ^0.27.3 (#2558) ([0214fda](https://github.com/wppconnect-team/wa-js/commit/0214fda)), closes [#2558](https://github.com/wppconnect-team/wa-js/issues/2558)
* **deps-dev:** update dependency typedoc to ^0.27.4 (#2570) ([437e0a4](https://github.com/wppconnect-team/wa-js/commit/437e0a4)), closes [#2570](https://github.com/wppconnect-team/wa-js/issues/2570)
* **deps-dev:** update dependency typedoc to ^0.27.5 (#2586) ([f62d4b3](https://github.com/wppconnect-team/wa-js/commit/f62d4b3)), closes [#2586](https://github.com/wppconnect-team/wa-js/issues/2586)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.3 (#2551) ([e30b91a](https://github.com/wppconnect-team/wa-js/commit/e30b91a)), closes [#2551](https://github.com/wppconnect-team/wa-js/issues/2551)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.4 (#2566) ([744027e](https://github.com/wppconnect-team/wa-js/commit/744027e)), closes [#2566](https://github.com/wppconnect-team/wa-js/issues/2566)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^4.0.5 (#2589) ([85eab52](https://github.com/wppconnect-team/wa-js/commit/85eab52)), closes [#2589](https://github.com/wppconnect-team/wa-js/issues/2589)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to v4 (#2531) ([341e158](https://github.com/wppconnect-team/wa-js/commit/341e158)), closes [#2531](https://github.com/wppconnect-team/wa-js/issues/2531)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^3.1.0 (#2539) ([dcc2854](https://github.com/wppconnect-team/wa-js/commit/dcc2854)), closes [#2539](https://github.com/wppconnect-team/wa-js/issues/2539)
* **deps-dev:** update dependency typescript to ^5.7.2 (#2530) ([6de0dc7](https://github.com/wppconnect-team/wa-js/commit/6de0dc7)), closes [#2530](https://github.com/wppconnect-team/wa-js/issues/2530)
* **deps-dev:** update dependency webpack to ^5.97.1 (#2559) ([547f8bf](https://github.com/wppconnect-team/wa-js/commit/547f8bf)), closes [#2559](https://github.com/wppconnect-team/wa-js/issues/2559)
* **deps-dev:** update playwright monorepo to ^1.49.1 (#2575) ([b7bc0ae](https://github.com/wppconnect-team/wa-js/commit/b7bc0ae)), closes [#2575](https://github.com/wppconnect-team/wa-js/issues/2575)

### Chores

* **deps:** lock file maintenance (#2538) ([9c9df96](https://github.com/wppconnect-team/wa-js/commit/9c9df96)), closes [#2538](https://github.com/wppconnect-team/wa-js/issues/2538)
* **deps:** lock file maintenance (#2568) ([b3141af](https://github.com/wppconnect-team/wa-js/commit/b3141af)), closes [#2568](https://github.com/wppconnect-team/wa-js/issues/2568)
* **deps:** lock file maintenance (#2592) ([c603aaf](https://github.com/wppconnect-team/wa-js/commit/c603aaf)), closes [#2592](https://github.com/wppconnect-team/wa-js/issues/2592)
* **deps:** lock file maintenance (#2593) ([0eab796](https://github.com/wppconnect-team/wa-js/commit/0eab796)), closes [#2593](https://github.com/wppconnect-team/wa-js/issues/2593)

### Other Changes

* Merge pull request #2601 from wppconnect-team/renovate/wppconnect-wa-version-1.x ([f1de362](https://github.com/wppconnect-team/wa-js/commit/f1de362)), closes [#2601](https://github.com/wppconnect-team/wa-js/issues/2601)

## <small>3.15.1 (2024-11-19)</small>

### Bug Fixes

* Added isGroup for chat model (#2516) ([4ae02f7](https://github.com/wppconnect-team/wa-js/commit/4ae02f7)), closes [#2516](https://github.com/wppconnect-team/wa-js/issues/2516)

### Build System

* **deps-dev:** update commitlint monorepo to ^19.6.0 (#2515) ([b66a387](https://github.com/wppconnect-team/wa-js/commit/b66a387)), closes [#2515](https://github.com/wppconnect-team/wa-js/issues/2515)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.675 (#2512) ([b143226](https://github.com/wppconnect-team/wa-js/commit/b143226)), closes [#2512](https://github.com/wppconnect-team/wa-js/issues/2512)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.679 (#2514) ([12cfad9](https://github.com/wppconnect-team/wa-js/commit/12cfad9)), closes [#2514](https://github.com/wppconnect-team/wa-js/issues/2514)
* **deps-dev:** update dependency husky to ^9.1.7 (#2510) ([3d34e35](https://github.com/wppconnect-team/wa-js/commit/3d34e35)), closes [#2510](https://github.com/wppconnect-team/wa-js/issues/2510)
* **deps-dev:** update playwright monorepo to ^1.49.0 (#2513) ([dbfe429](https://github.com/wppconnect-team/wa-js/commit/dbfe429)), closes [#2513](https://github.com/wppconnect-team/wa-js/issues/2513)

## 3.15.0 (2024-11-18)

### Features

* Added WPP.chat.setChatList function (#2498) ([4969c66](https://github.com/wppconnect-team/wa-js/commit/4969c66)), closes [#2498](https://github.com/wppconnect-team/wa-js/issues/2498)

### Bug Fixes

* Fixed chat.list with onlyUnreadMessages is true ([3d3aff2](https://github.com/wppconnect-team/wa-js/commit/3d3aff2))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.660 (#2492) ([7efbe50](https://github.com/wppconnect-team/wa-js/commit/7efbe50)), closes [#2492](https://github.com/wppconnect-team/wa-js/issues/2492)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.662 (#2493) ([f63ae54](https://github.com/wppconnect-team/wa-js/commit/f63ae54)), closes [#2493](https://github.com/wppconnect-team/wa-js/issues/2493)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.665 (#2494) ([3d7b803](https://github.com/wppconnect-team/wa-js/commit/3d7b803)), closes [#2494](https://github.com/wppconnect-team/wa-js/issues/2494)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.666 (#2497) ([5dc1ad5](https://github.com/wppconnect-team/wa-js/commit/5dc1ad5)), closes [#2497](https://github.com/wppconnect-team/wa-js/issues/2497)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.667 (#2499) ([c55e17e](https://github.com/wppconnect-team/wa-js/commit/c55e17e)), closes [#2499](https://github.com/wppconnect-team/wa-js/issues/2499)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.669 (#2501) ([06e601f](https://github.com/wppconnect-team/wa-js/commit/06e601f)), closes [#2501](https://github.com/wppconnect-team/wa-js/issues/2501)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.671 (#2503) ([45c5f4e](https://github.com/wppconnect-team/wa-js/commit/45c5f4e)), closes [#2503](https://github.com/wppconnect-team/wa-js/issues/2503)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.672 (#2505) ([f78f4ec](https://github.com/wppconnect-team/wa-js/commit/f78f4ec)), closes [#2505](https://github.com/wppconnect-team/wa-js/issues/2505)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.673 (#2508) ([b277004](https://github.com/wppconnect-team/wa-js/commit/b277004)), closes [#2508](https://github.com/wppconnect-team/wa-js/issues/2508)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.674 (#2509) ([04d79dc](https://github.com/wppconnect-team/wa-js/commit/04d79dc)), closes [#2509](https://github.com/wppconnect-team/wa-js/issues/2509)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.8 (#2502) ([b45af15](https://github.com/wppconnect-team/wa-js/commit/b45af15)), closes [#2502](https://github.com/wppconnect-team/wa-js/issues/2502)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^3.0.2 (#2495) ([1daf9b1](https://github.com/wppconnect-team/wa-js/commit/1daf9b1)), closes [#2495](https://github.com/wppconnect-team/wa-js/issues/2495)

### Chores

* **deps:** lock file maintenance (#2506) ([6d52e86](https://github.com/wppconnect-team/wa-js/commit/6d52e86)), closes [#2506](https://github.com/wppconnect-team/wa-js/issues/2506)

## <small>3.14.2 (2024-11-14)</small>

### Bug Fixes

* Fixed error when send msg to some lids (close #2472, close #2480) ([febaf0c](https://github.com/wppconnect-team/wa-js/commit/febaf0c)), closes [#2472](https://github.com/wppconnect-team/wa-js/issues/2472) [#2480](https://github.com/wppconnect-team/wa-js/issues/2480)
* Fixed some attributes in ChatModel (close #2491) ([d87ea3d](https://github.com/wppconnect-team/wa-js/commit/d87ea3d)), closes [#2491](https://github.com/wppconnect-team/wa-js/issues/2491)

### Styles

* Fixed compatitibily with <= 2.3000.1018090133 ([c8015bd](https://github.com/wppconnect-team/wa-js/commit/c8015bd))
* Removed attribute shouldShowUnreadDivider, use getShouldShowUnreadDivider ([8ae9a4e](https://github.com/wppconnect-team/wa-js/commit/8ae9a4e))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.119 (#2474) ([ef4906c](https://github.com/wppconnect-team/wa-js/commit/ef4906c)), closes [#2474](https://github.com/wppconnect-team/wa-js/issues/2474)
* **deps-dev:** update dependency @types/node-fetch to ^2.6.12 (#2483) ([edae077](https://github.com/wppconnect-team/wa-js/commit/edae077)), closes [#2483](https://github.com/wppconnect-team/wa-js/issues/2483)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.646 (#2485) ([aa2b6af](https://github.com/wppconnect-team/wa-js/commit/aa2b6af)), closes [#2485](https://github.com/wppconnect-team/wa-js/issues/2485)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.651 (#2487) ([f219ed6](https://github.com/wppconnect-team/wa-js/commit/f219ed6)), closes [#2487](https://github.com/wppconnect-team/wa-js/issues/2487)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.653 (#2488) ([bbfb4a9](https://github.com/wppconnect-team/wa-js/commit/bbfb4a9)), closes [#2488](https://github.com/wppconnect-team/wa-js/issues/2488)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.659 (#2489) ([5ec6a8e](https://github.com/wppconnect-team/wa-js/commit/5ec6a8e)), closes [#2489](https://github.com/wppconnect-team/wa-js/issues/2489)
* **deps-dev:** update dependency typedoc to ^0.26.11 (#2481) ([ae4e928](https://github.com/wppconnect-team/wa-js/commit/ae4e928)), closes [#2481](https://github.com/wppconnect-team/wa-js/issues/2481)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.7 (#2482) ([7d5820e](https://github.com/wppconnect-team/wa-js/commit/7d5820e)), closes [#2482](https://github.com/wppconnect-team/wa-js/issues/2482)

## <small>3.14.1 (2024-11-11)</small>

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.10178x ([7e1364a](https://github.com/wppconnect-team/wa-js/commit/7e1364a))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.117 (#2471) ([87953a3](https://github.com/wppconnect-team/wa-js/commit/87953a3)), closes [#2471](https://github.com/wppconnect-team/wa-js/issues/2471)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.590 (#2469) ([c60bc02](https://github.com/wppconnect-team/wa-js/commit/c60bc02)), closes [#2469](https://github.com/wppconnect-team/wa-js/issues/2469)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.639 (#2475) ([4603e4d](https://github.com/wppconnect-team/wa-js/commit/4603e4d)), closes [#2475](https://github.com/wppconnect-team/wa-js/issues/2475)
* **deps-dev:** update dependency webpack to ^5.96.1 (#2476) ([b4a51cf](https://github.com/wppconnect-team/wa-js/commit/b4a51cf)), closes [#2476](https://github.com/wppconnect-team/wa-js/issues/2476)

## 3.14.0 (2024-10-30)

### Features

* Added WPP.chat.getNotes function ([9aaec4b](https://github.com/wppconnect-team/wa-js/commit/9aaec4b))
* Added WPP.chat.setNotes function ([4f64e4e](https://github.com/wppconnect-team/wa-js/commit/4f64e4e))
* Exported Collection and Model for Notes ([009d9a8](https://github.com/wppconnect-team/wa-js/commit/009d9a8))

### Styles

* Importing NoteCollection for build fix ([c2296ea](https://github.com/wppconnect-team/wa-js/commit/c2296ea))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.584 (#2467) ([c0485d8](https://github.com/wppconnect-team/wa-js/commit/c0485d8)), closes [#2467](https://github.com/wppconnect-team/wa-js/issues/2467)

## <small>3.13.1 (2024-10-30)</small>

### Bug Fixes

* Fixed delay for send ptt audios (close #2464) ([051a31b](https://github.com/wppconnect-team/wa-js/commit/051a31b)), closes [#2464](https://github.com/wppconnect-team/wa-js/issues/2464)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.116 ([96d014a](https://github.com/wppconnect-team/wa-js/commit/96d014a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.577 ([15f34e8](https://github.com/wppconnect-team/wa-js/commit/15f34e8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.579 (#2466) ([d7f3318](https://github.com/wppconnect-team/wa-js/commit/d7f3318)), closes [#2466](https://github.com/wppconnect-team/wa-js/issues/2466)

## 3.13.0 (2024-10-29)

### Features

* Added support for send message to Meta AI ([e15802b](https://github.com/wppconnect-team/wa-js/commit/e15802b))
* Added WPP.community.getAnnouncementGroup function ([4645994](https://github.com/wppconnect-team/wa-js/commit/4645994))
* Added WPP.community.getSubgroups function ([7f6bf89](https://github.com/wppconnect-team/wa-js/commit/7f6bf89))
* Added WPP.whatsapp.BotProfileCollection ([6554736](https://github.com/wppconnect-team/wa-js/commit/6554736))

### Bug Fixes

* Fixed send message to community groups when is no announce group ([10f29ee](https://github.com/wppconnect-team/wa-js/commit/10f29ee))

### Documentation

* Fixed errors in readme ([664e982](https://github.com/wppconnect-team/wa-js/commit/664e982))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.557 (#2448) ([7219c20](https://github.com/wppconnect-team/wa-js/commit/7219c20)), closes [#2448](https://github.com/wppconnect-team/wa-js/issues/2448)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.558 ([1c26dff](https://github.com/wppconnect-team/wa-js/commit/1c26dff))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.559 ([1126e47](https://github.com/wppconnect-team/wa-js/commit/1126e47))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.563 ([66e83ac](https://github.com/wppconnect-team/wa-js/commit/66e83ac))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.564 ([9f6eb74](https://github.com/wppconnect-team/wa-js/commit/9f6eb74))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.565 (#2454) ([a46c84b](https://github.com/wppconnect-team/wa-js/commit/a46c84b)), closes [#2454](https://github.com/wppconnect-team/wa-js/issues/2454)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.566 ([8aba301](https://github.com/wppconnect-team/wa-js/commit/8aba301))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.567 ([2ccf181](https://github.com/wppconnect-team/wa-js/commit/2ccf181))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.568 (#2458) ([a8f814e](https://github.com/wppconnect-team/wa-js/commit/a8f814e)), closes [#2458](https://github.com/wppconnect-team/wa-js/issues/2458)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.571 ([670646c](https://github.com/wppconnect-team/wa-js/commit/670646c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.573 (#2462) ([6363476](https://github.com/wppconnect-team/wa-js/commit/6363476)), closes [#2462](https://github.com/wppconnect-team/wa-js/issues/2462)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.5 ([6e98813](https://github.com/wppconnect-team/wa-js/commit/6e98813))
* **deps-dev:** update playwright monorepo to ^1.48.2 ([62e798f](https://github.com/wppconnect-team/wa-js/commit/62e798f))

### Chores

* **deps:** lock file maintenance ([4511dde](https://github.com/wppconnect-team/wa-js/commit/4511dde))

## <small>3.12.1 (2024-10-24)</small>

### Bug Fixes

* Removed quotedMsgObj for mantain  compatibility ([e590cd9](https://github.com/wppconnect-team/wa-js/commit/e590cd9))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.556 (#2446) ([c177224](https://github.com/wppconnect-team/wa-js/commit/c177224)), closes [#2446](https://github.com/wppconnect-team/wa-js/issues/2446)

### Continuous Integration

* **deps:** update actions/setup-node action to v4.1.0 (#2447) ([8ae0bb7](https://github.com/wppconnect-team/wa-js/commit/8ae0bb7)), closes [#2447](https://github.com/wppconnect-team/wa-js/issues/2447)

## 3.12.0 (2024-10-24)

### Features

* Added WPP.contact.subscribePresence (close #2283) ([6a19f1f](https://github.com/wppconnect-team/wa-js/commit/6a19f1f)), closes [#2283](https://github.com/wppconnect-team/wa-js/issues/2283)

### Bug Fixes

* Fixed 'chat.new_message' event on receive replied @lid msgs ([2a40d01](https://github.com/wppconnect-team/wa-js/commit/2a40d01))

### Documentation

* Typos fix ([15e722b](https://github.com/wppconnect-team/wa-js/commit/15e722b))

### Styles

* Fixed temporary error on git actions for revokeStatus ([02de007](https://github.com/wppconnect-team/wa-js/commit/02de007))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.115 ([77adc86](https://github.com/wppconnect-team/wa-js/commit/77adc86))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.537 (#2433) ([26f6639](https://github.com/wppconnect-team/wa-js/commit/26f6639)), closes [#2433](https://github.com/wppconnect-team/wa-js/issues/2433)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.538 ([a2bbae9](https://github.com/wppconnect-team/wa-js/commit/a2bbae9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.541 ([49e57d2](https://github.com/wppconnect-team/wa-js/commit/49e57d2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.543 (#2436) ([e01cf59](https://github.com/wppconnect-team/wa-js/commit/e01cf59)), closes [#2436](https://github.com/wppconnect-team/wa-js/issues/2436)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.544 (#2437) ([ec9ced2](https://github.com/wppconnect-team/wa-js/commit/ec9ced2)), closes [#2437](https://github.com/wppconnect-team/wa-js/issues/2437)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.548 ([efcb18a](https://github.com/wppconnect-team/wa-js/commit/efcb18a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.552 ([cebf087](https://github.com/wppconnect-team/wa-js/commit/cebf087))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.554 ([d036514](https://github.com/wppconnect-team/wa-js/commit/d036514))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.4 ([75b61fe](https://github.com/wppconnect-team/wa-js/commit/75b61fe))

### Continuous Integration

* **deps:** update actions/checkout digest to 11bd719 ([a34963a](https://github.com/wppconnect-team/wa-js/commit/a34963a))
* Fixed temporary error on git actions for revokeStatus ([09b28f3](https://github.com/wppconnect-team/wa-js/commit/09b28f3))

### Chores

* **deps:** lock file maintenance (#2432) ([d42c1ae](https://github.com/wppconnect-team/wa-js/commit/d42c1ae)), closes [#2432](https://github.com/wppconnect-team/wa-js/issues/2432)

## 3.11.0 (2024-10-18)

### Features

* Added WPP.chat.sendEventMessage ([c9e3a00](https://github.com/wppconnect-team/wa-js/commit/c9e3a00))
* Added WPP.profile.getMyProfilePicture (close #2327) ([b863dcf](https://github.com/wppconnect-team/wa-js/commit/b863dcf)), closes [#2327](https://github.com/wppconnect-team/wa-js/issues/2327)
* Exported function createEventCallLink ([1d136c1](https://github.com/wppconnect-team/wa-js/commit/1d136c1))

### Bug Fixes

* Fixed error in revokeStatus function ([137415d](https://github.com/wppconnect-team/wa-js/commit/137415d))
* Fixed sendScheduledCallMessage function (close #2374) ([77853b4](https://github.com/wppconnect-team/wa-js/commit/77853b4)), closes [#2374](https://github.com/wppconnect-team/wa-js/issues/2374)
* Fixed type definition for sendFileMessage (#2391) ([e9c4a64](https://github.com/wppconnect-team/wa-js/commit/e9c4a64)), closes [#2391](https://github.com/wppconnect-team/wa-js/issues/2391)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.114 ([1d490b4](https://github.com/wppconnect-team/wa-js/commit/1d490b4))
* **deps-dev:** update dependency release-it to ^17.10.0 (#2429) ([32e4b77](https://github.com/wppconnect-team/wa-js/commit/32e4b77)), closes [#2429](https://github.com/wppconnect-team/wa-js/issues/2429)
* **deps-dev:** update dependency ts-morph to v24 (#2408) ([16df532](https://github.com/wppconnect-team/wa-js/commit/16df532)), closes [#2408](https://github.com/wppconnect-team/wa-js/issues/2408)
* **deps-dev:** update dependency typedoc to ^0.26.10 (#2426) ([aa2442f](https://github.com/wppconnect-team/wa-js/commit/aa2442f)), closes [#2426](https://github.com/wppconnect-team/wa-js/issues/2426)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.3 (#2427) ([6a1ac39](https://github.com/wppconnect-team/wa-js/commit/6a1ac39)), closes [#2427](https://github.com/wppconnect-team/wa-js/issues/2427)
* **deps-dev:** update playwright monorepo to ^1.48.1 (#2428) ([5477cb9](https://github.com/wppconnect-team/wa-js/commit/5477cb9)), closes [#2428](https://github.com/wppconnect-team/wa-js/issues/2428)

## <small>3.10.2 (2024-10-14)</small>

### Bug Fixes

* Fixed error for delete messages in groups (#2368) (closes #2300 #2319) ([f490574](https://github.com/wppconnect-team/wa-js/commit/f490574)), closes [#2368](https://github.com/wppconnect-team/wa-js/issues/2368) [#2300](https://github.com/wppconnect-team/wa-js/issues/2300) [#2319](https://github.com/wppconnect-team/wa-js/issues/2319)
* Fixed error on inject ([00a7a01](https://github.com/wppconnect-team/wa-js/commit/00a7a01))

### Documentation

* Export default types in package.json (#2333) ([d49923c](https://github.com/wppconnect-team/wa-js/commit/d49923c)), closes [#2333](https://github.com/wppconnect-team/wa-js/issues/2333)

### Build System

* **deps-dev:** update commitlint monorepo to ^19.5.0 ([0e9dfdf](https://github.com/wppconnect-team/wa-js/commit/0e9dfdf))
* **deps-dev:** update dependency @types/node to ^16.18.109 ([2f6c05f](https://github.com/wppconnect-team/wa-js/commit/2f6c05f))
* **deps-dev:** update dependency @types/node to ^16.18.111 ([f95f504](https://github.com/wppconnect-team/wa-js/commit/f95f504))
* **deps-dev:** update dependency @types/node to ^16.18.112 ([e1835a1](https://github.com/wppconnect-team/wa-js/commit/e1835a1))
* **deps-dev:** update dependency @types/node to ^16.18.113 ([b504b62](https://github.com/wppconnect-team/wa-js/commit/b504b62))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.325 ([b01378f](https://github.com/wppconnect-team/wa-js/commit/b01378f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.331 ([d95fa22](https://github.com/wppconnect-team/wa-js/commit/d95fa22))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.334 ([9c31515](https://github.com/wppconnect-team/wa-js/commit/9c31515))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.336 (#2320) ([c03ddf7](https://github.com/wppconnect-team/wa-js/commit/c03ddf7)), closes [#2320](https://github.com/wppconnect-team/wa-js/issues/2320)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.337 ([d4e8ec7](https://github.com/wppconnect-team/wa-js/commit/d4e8ec7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.342 ([e5afe98](https://github.com/wppconnect-team/wa-js/commit/e5afe98))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.344 ([bc657d9](https://github.com/wppconnect-team/wa-js/commit/bc657d9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.349 ([552e564](https://github.com/wppconnect-team/wa-js/commit/552e564))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.350 ([1ea569c](https://github.com/wppconnect-team/wa-js/commit/1ea569c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.353 ([55a70ab](https://github.com/wppconnect-team/wa-js/commit/55a70ab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.354 ([a64bd91](https://github.com/wppconnect-team/wa-js/commit/a64bd91))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.355 ([fc2eb7b](https://github.com/wppconnect-team/wa-js/commit/fc2eb7b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.364 ([db75589](https://github.com/wppconnect-team/wa-js/commit/db75589))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.366 ([3aa78cf](https://github.com/wppconnect-team/wa-js/commit/3aa78cf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.368 ([72700d3](https://github.com/wppconnect-team/wa-js/commit/72700d3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.371 ([32b6d07](https://github.com/wppconnect-team/wa-js/commit/32b6d07))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.373 ([f3cfc88](https://github.com/wppconnect-team/wa-js/commit/f3cfc88))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.378 ([cd8327a](https://github.com/wppconnect-team/wa-js/commit/cd8327a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.381 ([d9e1fbf](https://github.com/wppconnect-team/wa-js/commit/d9e1fbf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.384 ([b60a3ec](https://github.com/wppconnect-team/wa-js/commit/b60a3ec))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.386 ([cc7fe9d](https://github.com/wppconnect-team/wa-js/commit/cc7fe9d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.387 ([6a461c6](https://github.com/wppconnect-team/wa-js/commit/6a461c6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.388 ([4383d64](https://github.com/wppconnect-team/wa-js/commit/4383d64))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.389 ([1c87e42](https://github.com/wppconnect-team/wa-js/commit/1c87e42))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.390 ([b85b169](https://github.com/wppconnect-team/wa-js/commit/b85b169))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.391 ([74701b3](https://github.com/wppconnect-team/wa-js/commit/74701b3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.393 ([e88ebad](https://github.com/wppconnect-team/wa-js/commit/e88ebad))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.395 ([87fcf02](https://github.com/wppconnect-team/wa-js/commit/87fcf02))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.399 ([a26ff47](https://github.com/wppconnect-team/wa-js/commit/a26ff47))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.402 ([6c6a80e](https://github.com/wppconnect-team/wa-js/commit/6c6a80e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.406 ([a3250e9](https://github.com/wppconnect-team/wa-js/commit/a3250e9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.412 ([b89b8df](https://github.com/wppconnect-team/wa-js/commit/b89b8df))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.414 ([78ec9cd](https://github.com/wppconnect-team/wa-js/commit/78ec9cd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.416 ([fa255ff](https://github.com/wppconnect-team/wa-js/commit/fa255ff))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.417 ([74d3e14](https://github.com/wppconnect-team/wa-js/commit/74d3e14))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.418 ([27b2a48](https://github.com/wppconnect-team/wa-js/commit/27b2a48))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.419 ([1f3a0f8](https://github.com/wppconnect-team/wa-js/commit/1f3a0f8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.420 ([4df7fee](https://github.com/wppconnect-team/wa-js/commit/4df7fee))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.421 ([d963c79](https://github.com/wppconnect-team/wa-js/commit/d963c79))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.422 ([3de60b7](https://github.com/wppconnect-team/wa-js/commit/3de60b7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.423 ([b4d58bf](https://github.com/wppconnect-team/wa-js/commit/b4d58bf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.425 ([6bda680](https://github.com/wppconnect-team/wa-js/commit/6bda680))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.431 (#2387) ([f1b59d3](https://github.com/wppconnect-team/wa-js/commit/f1b59d3)), closes [#2387](https://github.com/wppconnect-team/wa-js/issues/2387)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.433 ([af19d52](https://github.com/wppconnect-team/wa-js/commit/af19d52))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.438 ([6680d15](https://github.com/wppconnect-team/wa-js/commit/6680d15))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.441 ([53b85de](https://github.com/wppconnect-team/wa-js/commit/53b85de))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.445 ([e75e60c](https://github.com/wppconnect-team/wa-js/commit/e75e60c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.447 ([cbf6efb](https://github.com/wppconnect-team/wa-js/commit/cbf6efb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.448 ([25fdf80](https://github.com/wppconnect-team/wa-js/commit/25fdf80))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.451 ([aef3979](https://github.com/wppconnect-team/wa-js/commit/aef3979))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.452 ([a8b5fe6](https://github.com/wppconnect-team/wa-js/commit/a8b5fe6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.453 ([1a5d85a](https://github.com/wppconnect-team/wa-js/commit/1a5d85a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.456 ([0c64042](https://github.com/wppconnect-team/wa-js/commit/0c64042))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.458 ([05e3cba](https://github.com/wppconnect-team/wa-js/commit/05e3cba))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.459 ([98dd823](https://github.com/wppconnect-team/wa-js/commit/98dd823))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.462 ([0d57c33](https://github.com/wppconnect-team/wa-js/commit/0d57c33))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.463 ([ab17677](https://github.com/wppconnect-team/wa-js/commit/ab17677))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.464 ([3ca0333](https://github.com/wppconnect-team/wa-js/commit/3ca0333))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.468 ([f7ed473](https://github.com/wppconnect-team/wa-js/commit/f7ed473))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.470 ([3718320](https://github.com/wppconnect-team/wa-js/commit/3718320))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.473 ([8c6ef93](https://github.com/wppconnect-team/wa-js/commit/8c6ef93))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.474 ([b831e39](https://github.com/wppconnect-team/wa-js/commit/b831e39))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.476 ([8972202](https://github.com/wppconnect-team/wa-js/commit/8972202))
* **deps-dev:** update dependency eslint to ^8.57.1 ([4cdbc4a](https://github.com/wppconnect-team/wa-js/commit/4cdbc4a))
* **deps-dev:** update dependency eslint-plugin-import to ^2.31.0 ([2507b62](https://github.com/wppconnect-team/wa-js/commit/2507b62))
* **deps-dev:** update dependency husky to ^9.1.6 ([cb2ad75](https://github.com/wppconnect-team/wa-js/commit/cb2ad75))
* **deps-dev:** update dependency release-it to ^17.7.0 ([59cdb78](https://github.com/wppconnect-team/wa-js/commit/59cdb78))
* **deps-dev:** update dependency typedoc to ^0.26.7 ([b565e92](https://github.com/wppconnect-team/wa-js/commit/b565e92))
* **deps-dev:** update dependency typedoc to ^0.26.8 ([df72c50](https://github.com/wppconnect-team/wa-js/commit/df72c50))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.0 ([b0cce92](https://github.com/wppconnect-team/wa-js/commit/b0cce92))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.1 ([ba7cb50](https://github.com/wppconnect-team/wa-js/commit/ba7cb50))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.3.2 ([d3cfbe9](https://github.com/wppconnect-team/wa-js/commit/d3cfbe9))
* **deps-dev:** update dependency typescript to ^5.6.2 ([83ee179](https://github.com/wppconnect-team/wa-js/commit/83ee179))
* **deps-dev:** update dependency typescript to ^5.6.3 ([d72e2c2](https://github.com/wppconnect-team/wa-js/commit/d72e2c2))
* **deps-dev:** update dependency webpack to ^5.95.0 ([fdbaa69](https://github.com/wppconnect-team/wa-js/commit/fdbaa69))
* **deps-dev:** update playwright monorepo to ^1.47.1 ([6aa2ae2](https://github.com/wppconnect-team/wa-js/commit/6aa2ae2))
* **deps-dev:** update playwright monorepo to ^1.47.2 ([0fd88b2](https://github.com/wppconnect-team/wa-js/commit/0fd88b2))
* **deps-dev:** update playwright monorepo to ^1.48.0 ([8a898f8](https://github.com/wppconnect-team/wa-js/commit/8a898f8))

### Continuous Integration

* **deps:** update actions/checkout digest to eef6144 ([b08205c](https://github.com/wppconnect-team/wa-js/commit/b08205c))
* **deps:** update actions/setup-node action to v4.0.4 ([f507263](https://github.com/wppconnect-team/wa-js/commit/f507263))

### Chores

* **deps:** lock file maintenance ([cb6813a](https://github.com/wppconnect-team/wa-js/commit/cb6813a))
* **deps:** lock file maintenance ([15b7278](https://github.com/wppconnect-team/wa-js/commit/15b7278))
* **deps:** lock file maintenance ([5677249](https://github.com/wppconnect-team/wa-js/commit/5677249))
* **deps:** lock file maintenance ([f653847](https://github.com/wppconnect-team/wa-js/commit/f653847))
* **deps:** lock file maintenance ([c04fb94](https://github.com/wppconnect-team/wa-js/commit/c04fb94))
* **deps:** lock file maintenance ([1267333](https://github.com/wppconnect-team/wa-js/commit/1267333))

## <small>3.10.1 (2024-09-09)</small>

### Bug Fixes

* Fixed buttons for non beta user ([fbbf094](https://github.com/wppconnect-team/wa-js/commit/fbbf094))
* Fixed eval error on whatsapp-web ([04e91fb](https://github.com/wppconnect-team/wa-js/commit/04e91fb))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.322 ([d09e6ac](https://github.com/wppconnect-team/wa-js/commit/d09e6ac))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.323 ([22b2072](https://github.com/wppconnect-team/wa-js/commit/22b2072))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.12 ([72e80be](https://github.com/wppconnect-team/wa-js/commit/72e80be))

## 3.10.0 (2024-09-07)

### Features

* Added support for buttons (v3) (#2309) ([d721775](https://github.com/wppconnect-team/wa-js/commit/d721775)), closes [#2309](https://github.com/wppconnect-team/wa-js/issues/2309)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.314 ([f4294ce](https://github.com/wppconnect-team/wa-js/commit/f4294ce))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.318 ([41f8aab](https://github.com/wppconnect-team/wa-js/commit/41f8aab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.319 ([710847d](https://github.com/wppconnect-team/wa-js/commit/710847d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.320 ([9f7e4f8](https://github.com/wppconnect-team/wa-js/commit/9f7e4f8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.321 ([fd3e090](https://github.com/wppconnect-team/wa-js/commit/fd3e090))
* **deps-dev:** update dependency debug to ^4.3.7 ([a985905](https://github.com/wppconnect-team/wa-js/commit/a985905))
* **deps-dev:** update playwright monorepo to ^1.47.0 (#2302) ([2e3ba0f](https://github.com/wppconnect-team/wa-js/commit/2e3ba0f)), closes [#2302](https://github.com/wppconnect-team/wa-js/issues/2302)

## <small>3.9.1 (2024-09-05)</small>

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.1016233710 ([6a76619](https://github.com/wppconnect-team/wa-js/commit/6a76619))

### Build System

* **deps-dev:** update commitlint monorepo to ^19.4.1 ([89bb5b9](https://github.com/wppconnect-team/wa-js/commit/89bb5b9))
* **deps-dev:** update dependency @types/node to ^16.18.107 ([f2de27c](https://github.com/wppconnect-team/wa-js/commit/f2de27c))
* **deps-dev:** update dependency @types/node to ^16.18.108 ([10f2d4e](https://github.com/wppconnect-team/wa-js/commit/10f2d4e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.276 (#2273) ([81b2451](https://github.com/wppconnect-team/wa-js/commit/81b2451)), closes [#2273](https://github.com/wppconnect-team/wa-js/issues/2273)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.277 ([1c15ee3](https://github.com/wppconnect-team/wa-js/commit/1c15ee3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.279 ([c46e0dc](https://github.com/wppconnect-team/wa-js/commit/c46e0dc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.282 ([19ab4ae](https://github.com/wppconnect-team/wa-js/commit/19ab4ae))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.283 ([2705d02](https://github.com/wppconnect-team/wa-js/commit/2705d02))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.286 ([75ff69c](https://github.com/wppconnect-team/wa-js/commit/75ff69c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.288 (#2280) ([d9b7a86](https://github.com/wppconnect-team/wa-js/commit/d9b7a86)), closes [#2280](https://github.com/wppconnect-team/wa-js/issues/2280)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.290 ([5aefe90](https://github.com/wppconnect-team/wa-js/commit/5aefe90))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.291 ([cd1868d](https://github.com/wppconnect-team/wa-js/commit/cd1868d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.293 ([6d9d460](https://github.com/wppconnect-team/wa-js/commit/6d9d460))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.294 ([793a2b2](https://github.com/wppconnect-team/wa-js/commit/793a2b2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.295 ([7028842](https://github.com/wppconnect-team/wa-js/commit/7028842))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.296 ([bade78b](https://github.com/wppconnect-team/wa-js/commit/bade78b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.297 ([7607daf](https://github.com/wppconnect-team/wa-js/commit/7607daf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.299 ([9291ee0](https://github.com/wppconnect-team/wa-js/commit/9291ee0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.302 ([45f645b](https://github.com/wppconnect-team/wa-js/commit/45f645b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.304 ([5a70c06](https://github.com/wppconnect-team/wa-js/commit/5a70c06))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.307 ([af4b642](https://github.com/wppconnect-team/wa-js/commit/af4b642))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.312 (#2298) ([44070b6](https://github.com/wppconnect-team/wa-js/commit/44070b6)), closes [#2298](https://github.com/wppconnect-team/wa-js/issues/2298)
* **deps-dev:** update dependency eslint-plugin-import to ^2.30.0 ([1be95cf](https://github.com/wppconnect-team/wa-js/commit/1be95cf))
* **deps-dev:** update dependency lint-staged to ^15.2.10 ([005ea42](https://github.com/wppconnect-team/wa-js/commit/005ea42))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.11 ([bb71f3d](https://github.com/wppconnect-team/wa-js/commit/bb71f3d))

### Chores

* **deps:** lock file maintenance ([9e27eb8](https://github.com/wppconnect-team/wa-js/commit/9e27eb8))

## 3.9.0 (2024-08-27)

### Features

* Improovment sendChargeMessage to send pix copy-paste code ([a0dee31](https://github.com/wppconnect-team/wa-js/commit/a0dee31))

### Bug Fixes

* Fixed functions for Whatsapp >= 2.3000.1015974389 ([612d383](https://github.com/wppconnect-team/wa-js/commit/612d383))
* Fixed sendGroupInviteMessage by generated invite code (close #2216) ([3a713f1](https://github.com/wppconnect-team/wa-js/commit/3a713f1)), closes [#2216](https://github.com/wppconnect-team/wa-js/issues/2216)
* Improovment on btns (close #2253) ([f0a23ce](https://github.com/wppconnect-team/wa-js/commit/f0a23ce)), closes [#2253](https://github.com/wppconnect-team/wa-js/issues/2253)

### Styles

* Fixed functions for Whatsapp >= 2.3000.1015974389 ([87dc680](https://github.com/wppconnect-team/wa-js/commit/87dc680))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.106 ([01b01ab](https://github.com/wppconnect-team/wa-js/commit/01b01ab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.270 ([22cef3b](https://github.com/wppconnect-team/wa-js/commit/22cef3b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.271 ([c43c15d](https://github.com/wppconnect-team/wa-js/commit/c43c15d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.272 ([4031a73](https://github.com/wppconnect-team/wa-js/commit/4031a73))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.273 (#2270) ([97f4a83](https://github.com/wppconnect-team/wa-js/commit/97f4a83)), closes [#2270](https://github.com/wppconnect-team/wa-js/issues/2270)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.274 (#2272) ([563cbf4](https://github.com/wppconnect-team/wa-js/commit/563cbf4)), closes [#2272](https://github.com/wppconnect-team/wa-js/issues/2272)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.10 ([8ab1128](https://github.com/wppconnect-team/wa-js/commit/8ab1128))

### Chores

* **deps:** lock file maintenance ([7f50814](https://github.com/wppconnect-team/wa-js/commit/7f50814))

## <small>3.8.4 (2024-08-24)</small>

### Features

* Added event to notify discord in fails functions (#2230) ([adfe289](https://github.com/wppconnect-team/wa-js/commit/adfe289)), closes [#2230](https://github.com/wppconnect-team/wa-js/issues/2230)

### Bug Fixes

* Fixed conn.main_ready event (#2260) ([af5b398](https://github.com/wppconnect-team/wa-js/commit/af5b398)), closes [#2260](https://github.com/wppconnect-team/wa-js/issues/2260)

### Styles

* Fixed conn.main_ready event ([3a25572](https://github.com/wppconnect-team/wa-js/commit/3a25572))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.223 ([530038b](https://github.com/wppconnect-team/wa-js/commit/530038b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.228 (#2231) ([6a7cb19](https://github.com/wppconnect-team/wa-js/commit/6a7cb19)), closes [#2231](https://github.com/wppconnect-team/wa-js/issues/2231)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.229 ([774c896](https://github.com/wppconnect-team/wa-js/commit/774c896))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.230 ([f72e1bf](https://github.com/wppconnect-team/wa-js/commit/f72e1bf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.232 (#2235) ([f049c99](https://github.com/wppconnect-team/wa-js/commit/f049c99)), closes [#2235](https://github.com/wppconnect-team/wa-js/issues/2235)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.234 ([004ed10](https://github.com/wppconnect-team/wa-js/commit/004ed10))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.236 (#2238) ([4540e4c](https://github.com/wppconnect-team/wa-js/commit/4540e4c)), closes [#2238](https://github.com/wppconnect-team/wa-js/issues/2238)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.239 (#2241) ([011dc8c](https://github.com/wppconnect-team/wa-js/commit/011dc8c)), closes [#2241](https://github.com/wppconnect-team/wa-js/issues/2241)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.242 ([e904d30](https://github.com/wppconnect-team/wa-js/commit/e904d30))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.243 ([9019167](https://github.com/wppconnect-team/wa-js/commit/9019167))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.247 ([d6ae20a](https://github.com/wppconnect-team/wa-js/commit/d6ae20a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.249 ([d1c76f1](https://github.com/wppconnect-team/wa-js/commit/d1c76f1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.250 ([96748f9](https://github.com/wppconnect-team/wa-js/commit/96748f9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.251 ([c05a0f2](https://github.com/wppconnect-team/wa-js/commit/c05a0f2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.256 (#2255) ([4f90d7e](https://github.com/wppconnect-team/wa-js/commit/4f90d7e)), closes [#2255](https://github.com/wppconnect-team/wa-js/issues/2255)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.258 ([ef4351a](https://github.com/wppconnect-team/wa-js/commit/ef4351a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.259 ([0e1d21c](https://github.com/wppconnect-team/wa-js/commit/0e1d21c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.260 ([180d2f7](https://github.com/wppconnect-team/wa-js/commit/180d2f7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.263 ([6876196](https://github.com/wppconnect-team/wa-js/commit/6876196))
* **deps-dev:** update dependency husky to ^9.1.5 (#2247) ([a7589af](https://github.com/wppconnect-team/wa-js/commit/a7589af)), closes [#2247](https://github.com/wppconnect-team/wa-js/issues/2247)
* **deps-dev:** update dependency typedoc to ^0.26.6 ([9f83227](https://github.com/wppconnect-team/wa-js/commit/9f83227))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.9 ([2fcacda](https://github.com/wppconnect-team/wa-js/commit/2fcacda))
* **deps-dev:** update dependency webpack to ^5.94.0 ([4f639af](https://github.com/wppconnect-team/wa-js/commit/4f639af))
* **deps-dev:** update playwright monorepo to ^1.46.1 ([e5749a4](https://github.com/wppconnect-team/wa-js/commit/e5749a4))

### Chores

* **deps:** lock file maintenance ([802aeb6](https://github.com/wppconnect-team/wa-js/commit/802aeb6))

## <small>3.8.3 (2024-08-16)</small>

### Bug Fixes

* Mantain compatibility to 2.3000.10155x ([7cc2025](https://github.com/wppconnect-team/wa-js/commit/7cc2025))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.221 ([26d9390](https://github.com/wppconnect-team/wa-js/commit/26d9390))

## <small>3.8.2 (2024-08-15)</small>

### Bug Fixes

* Fixed functions for >= 2.3000.1015671410 ([ca3036b](https://github.com/wppconnect-team/wa-js/commit/ca3036b))
* Improvment on chat.active_chat event ([8c5ae19](https://github.com/wppconnect-team/wa-js/commit/8c5ae19))

### Styles

* Improovment isOfficialClient ([c08201b](https://github.com/wppconnect-team/wa-js/commit/c08201b))

### Build System

* **deps-dev:** update commitlint monorepo to ^19.4.0 (#2206) ([7b1c008](https://github.com/wppconnect-team/wa-js/commit/7b1c008)), closes [#2206](https://github.com/wppconnect-team/wa-js/issues/2206)
* **deps-dev:** update dependency @types/node to ^16.18.105 ([61c6c9c](https://github.com/wppconnect-team/wa-js/commit/61c6c9c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.151 (#2187) ([d4ec2b7](https://github.com/wppconnect-team/wa-js/commit/d4ec2b7)), closes [#2187](https://github.com/wppconnect-team/wa-js/issues/2187)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.154 ([643b206](https://github.com/wppconnect-team/wa-js/commit/643b206))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.156 ([0733d51](https://github.com/wppconnect-team/wa-js/commit/0733d51))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.157 ([6a68211](https://github.com/wppconnect-team/wa-js/commit/6a68211))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.158 (#2191) ([d00ffd1](https://github.com/wppconnect-team/wa-js/commit/d00ffd1)), closes [#2191](https://github.com/wppconnect-team/wa-js/issues/2191)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.161 ([47d5214](https://github.com/wppconnect-team/wa-js/commit/47d5214))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.162 ([3ebb518](https://github.com/wppconnect-team/wa-js/commit/3ebb518))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.165 ([8f9a622](https://github.com/wppconnect-team/wa-js/commit/8f9a622))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.166 ([c090fe9](https://github.com/wppconnect-team/wa-js/commit/c090fe9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.168 ([e9543ab](https://github.com/wppconnect-team/wa-js/commit/e9543ab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.169 ([5502312](https://github.com/wppconnect-team/wa-js/commit/5502312))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.177 (#2204) ([d47300e](https://github.com/wppconnect-team/wa-js/commit/d47300e)), closes [#2204](https://github.com/wppconnect-team/wa-js/issues/2204)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.180 ([bf14dc1](https://github.com/wppconnect-team/wa-js/commit/bf14dc1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.182 ([c8f3ee7](https://github.com/wppconnect-team/wa-js/commit/c8f3ee7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.183 ([f12c18f](https://github.com/wppconnect-team/wa-js/commit/f12c18f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.186 ([3f95d49](https://github.com/wppconnect-team/wa-js/commit/3f95d49))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.189 ([d596d3a](https://github.com/wppconnect-team/wa-js/commit/d596d3a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.190 ([f89e12b](https://github.com/wppconnect-team/wa-js/commit/f89e12b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.191 ([b4d9310](https://github.com/wppconnect-team/wa-js/commit/b4d9310))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.193 ([19dbf83](https://github.com/wppconnect-team/wa-js/commit/19dbf83))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.194 ([f8442fb](https://github.com/wppconnect-team/wa-js/commit/f8442fb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.195 ([5bc559b](https://github.com/wppconnect-team/wa-js/commit/5bc559b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.197 ([ad9f124](https://github.com/wppconnect-team/wa-js/commit/ad9f124))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.198 ([d2f91c4](https://github.com/wppconnect-team/wa-js/commit/d2f91c4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.201 ([8f0179a](https://github.com/wppconnect-team/wa-js/commit/8f0179a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.209 ([e166e77](https://github.com/wppconnect-team/wa-js/commit/e166e77))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.216 (#2225) ([8232422](https://github.com/wppconnect-team/wa-js/commit/8232422)), closes [#2225](https://github.com/wppconnect-team/wa-js/issues/2225)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.219 (#2227) ([f33374e](https://github.com/wppconnect-team/wa-js/commit/f33374e)), closes [#2227](https://github.com/wppconnect-team/wa-js/issues/2227)
* **deps-dev:** update dependency lint-staged to ^15.2.8 ([e1a5946](https://github.com/wppconnect-team/wa-js/commit/e1a5946))
* **deps-dev:** update dependency lint-staged to ^15.2.9 ([e43fa4f](https://github.com/wppconnect-team/wa-js/commit/e43fa4f))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.7 ([c94b13f](https://github.com/wppconnect-team/wa-js/commit/c94b13f))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.8 ([0a74be1](https://github.com/wppconnect-team/wa-js/commit/0a74be1))
* **deps-dev:** update playwright monorepo to ^1.46.0 (#2203) ([bb47f7e](https://github.com/wppconnect-team/wa-js/commit/bb47f7e)), closes [#2203](https://github.com/wppconnect-team/wa-js/issues/2203)

### Chores

* **deps:** lock file maintenance ([222e865](https://github.com/wppconnect-team/wa-js/commit/222e865))
* **deps:** lock file maintenance ([f7fc674](https://github.com/wppconnect-team/wa-js/commit/f7fc674))
* **deps:** lock file maintenance ([ce24b59](https://github.com/wppconnect-team/wa-js/commit/ce24b59))

## <small>3.8.1 (2024-07-31)</small>

### Bug Fixes

* Fixed core functions Whatsapp >= 2.3000.1015281091 ([6319d34](https://github.com/wppconnect-team/wa-js/commit/6319d34))
* Fixed more functions to Whatsapp >= 2.3000.1015281091 ([abff8fe](https://github.com/wppconnect-team/wa-js/commit/abff8fe))

### Styles

* Fixed more functions ([f848716](https://github.com/wppconnect-team/wa-js/commit/f848716))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.132 ([9754afd](https://github.com/wppconnect-team/wa-js/commit/9754afd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.133 ([69ffcc8](https://github.com/wppconnect-team/wa-js/commit/69ffcc8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.134 ([be27dfd](https://github.com/wppconnect-team/wa-js/commit/be27dfd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.136 ([6dfac68](https://github.com/wppconnect-team/wa-js/commit/6dfac68))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.138 ([375fdfb](https://github.com/wppconnect-team/wa-js/commit/375fdfb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.143 ([d7edc1c](https://github.com/wppconnect-team/wa-js/commit/d7edc1c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.149 (#2183) ([3204511](https://github.com/wppconnect-team/wa-js/commit/3204511)), closes [#2183](https://github.com/wppconnect-team/wa-js/issues/2183)
* **deps-dev:** update dependency debug to ^4.3.6 (#2170) ([2faca7f](https://github.com/wppconnect-team/wa-js/commit/2faca7f)), closes [#2170](https://github.com/wppconnect-team/wa-js/issues/2170)
* **deps-dev:** update dependency husky to ^9.1.4 ([2271084](https://github.com/wppconnect-team/wa-js/commit/2271084))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.6 ([8949ab4](https://github.com/wppconnect-team/wa-js/commit/8949ab4))
* **deps-dev:** update typescript-eslint monorepo to ^7.18.0 ([eb44678](https://github.com/wppconnect-team/wa-js/commit/eb44678))

### Chores

* **deps:** lock file maintenance ([0572915](https://github.com/wppconnect-team/wa-js/commit/0572915))
* **deps:** lock file maintenance ([057c5f4](https://github.com/wppconnect-team/wa-js/commit/057c5f4))

## 3.8.0 (2024-07-26)

### Features

* Added WPP.chat.setInputText function ([ebb247e](https://github.com/wppconnect-team/wa-js/commit/ebb247e))
* Added WPP.privacy.get function ([f0f5231](https://github.com/wppconnect-team/wa-js/commit/f0f5231))
* Added WPP.privacy.getDisallowedList function ([90e24ae](https://github.com/wppconnect-team/wa-js/commit/90e24ae))
* Added WPP.privacy.setAbout function ([2bb31c3](https://github.com/wppconnect-team/wa-js/commit/2bb31c3))
* Added WPP.privacy.setAddGroup function ([9ff839e](https://github.com/wppconnect-team/wa-js/commit/9ff839e))
* Added WPP.privacy.setLastSeen function ([2ebdc06](https://github.com/wppconnect-team/wa-js/commit/2ebdc06))
* Added WPP.privacy.setOnline function ([c5a4e3a](https://github.com/wppconnect-team/wa-js/commit/c5a4e3a))
* Added WPP.privacy.setProfilePic function ([76143c8](https://github.com/wppconnect-team/wa-js/commit/76143c8))
* Added WPP.privacy.setReadReceipt function ([30a8aec](https://github.com/wppconnect-team/wa-js/commit/30a8aec))
* Added WPP.privacy.setStatus function ([ce3d795](https://github.com/wppconnect-team/wa-js/commit/ce3d795))
* Exported ComposeBoxActions class ([7b4fa25](https://github.com/wppconnect-team/wa-js/commit/7b4fa25))
* Exported function getPrivacyDisallowedListTable ([c9ac5eb](https://github.com/wppconnect-team/wa-js/commit/c9ac5eb))
* Exported function setPrivacyForOneCategory ([201e811](https://github.com/wppconnect-team/wa-js/commit/201e811))
* Exported getStatusList function ([4e8ba2c](https://github.com/wppconnect-team/wa-js/commit/4e8ba2c))

### Bug Fixes

* Fixed sendListMessage and send product (close #2162 close #2163) ([1136e0a](https://github.com/wppconnect-team/wa-js/commit/1136e0a)), closes [#2162](https://github.com/wppconnect-team/wa-js/issues/2162) [#2163](https://github.com/wppconnect-team/wa-js/issues/2163)
* Improovments on genLinkDeviceCodeForPhoneNumber ([8c1c64b](https://github.com/wppconnect-team/wa-js/commit/8c1c64b))
* Improovs on deleteMessege when received and  revoke param is true ([e842948](https://github.com/wppconnect-team/wa-js/commit/e842948))

### Styles

* PrivacyDisallowedListType error ([8741dc8](https://github.com/wppconnect-team/wa-js/commit/8741dc8))
* Remove logs ([964e39c](https://github.com/wppconnect-team/wa-js/commit/964e39c))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.104 ([4558253](https://github.com/wppconnect-team/wa-js/commit/4558253))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.100 (#2138) ([96b0810](https://github.com/wppconnect-team/wa-js/commit/96b0810)), closes [#2138](https://github.com/wppconnect-team/wa-js/issues/2138)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.103 ([bfc242d](https://github.com/wppconnect-team/wa-js/commit/bfc242d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.104 ([5116d02](https://github.com/wppconnect-team/wa-js/commit/5116d02))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.106 ([39f190d](https://github.com/wppconnect-team/wa-js/commit/39f190d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.107 ([7d6f682](https://github.com/wppconnect-team/wa-js/commit/7d6f682))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.109 ([7f3e054](https://github.com/wppconnect-team/wa-js/commit/7f3e054))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.110 ([f833409](https://github.com/wppconnect-team/wa-js/commit/f833409))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.111 ([8e2027f](https://github.com/wppconnect-team/wa-js/commit/8e2027f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.114 ([fb4fbe6](https://github.com/wppconnect-team/wa-js/commit/fb4fbe6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.115 ([1cfe7d2](https://github.com/wppconnect-team/wa-js/commit/1cfe7d2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.121 ([f1d2c52](https://github.com/wppconnect-team/wa-js/commit/f1d2c52))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.125 ([4e1ebba](https://github.com/wppconnect-team/wa-js/commit/4e1ebba))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.126 (#2160) ([726a3ef](https://github.com/wppconnect-team/wa-js/commit/726a3ef)), closes [#2160](https://github.com/wppconnect-team/wa-js/issues/2160)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.128 (#2164) ([005fe21](https://github.com/wppconnect-team/wa-js/commit/005fe21)), closes [#2164](https://github.com/wppconnect-team/wa-js/issues/2164)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.129 ([3d957ab](https://github.com/wppconnect-team/wa-js/commit/3d957ab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.130 (#2168) ([05cd39b](https://github.com/wppconnect-team/wa-js/commit/05cd39b)), closes [#2168](https://github.com/wppconnect-team/wa-js/issues/2168)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.98 (#2136) ([91fec77](https://github.com/wppconnect-team/wa-js/commit/91fec77)), closes [#2136](https://github.com/wppconnect-team/wa-js/issues/2136)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.99 ([4d58441](https://github.com/wppconnect-team/wa-js/commit/4d58441))
* **deps-dev:** update dependency husky to ^9.1.2 ([d03fca2](https://github.com/wppconnect-team/wa-js/commit/d03fca2))
* **deps-dev:** update dependency husky to ^9.1.3 ([e62493c](https://github.com/wppconnect-team/wa-js/commit/e62493c))
* **deps-dev:** update dependency typedoc to ^0.26.5 ([ae6b86e](https://github.com/wppconnect-team/wa-js/commit/ae6b86e))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.5 ([b9eb22f](https://github.com/wppconnect-team/wa-js/commit/b9eb22f))
* **deps-dev:** update dependency typescript to ^5.5.4 (#2152) ([9cc7040](https://github.com/wppconnect-team/wa-js/commit/9cc7040)), closes [#2152](https://github.com/wppconnect-team/wa-js/issues/2152)
* **deps-dev:** update playwright monorepo to ^1.45.3 ([4791de2](https://github.com/wppconnect-team/wa-js/commit/4791de2))
* **deps-dev:** update typescript-eslint monorepo to ^7.17.0 (#2153) ([60f71ff](https://github.com/wppconnect-team/wa-js/commit/60f71ff)), closes [#2153](https://github.com/wppconnect-team/wa-js/issues/2153)

### Chores

* **deps:** lock file maintenance ([33e3f76](https://github.com/wppconnect-team/wa-js/commit/33e3f76))

## 3.7.0 (2024-07-18)

### Features

* Added WPP.cart.add function ([f2087d7](https://github.com/wppconnect-team/wa-js/commit/f2087d7))
* Added WPP.cart.clear function ([670474d](https://github.com/wppconnect-team/wa-js/commit/670474d))
* Added WPP.cart.get function ([5f205d0](https://github.com/wppconnect-team/wa-js/commit/5f205d0))
* Added WPP.cart.remove function ([ec01aac](https://github.com/wppconnect-team/wa-js/commit/ec01aac))
* Added WPP.cart.submit function ([08ac283](https://github.com/wppconnect-team/wa-js/commit/08ac283))
* Added WPP.cart.update function ([011fcdc](https://github.com/wppconnect-team/wa-js/commit/011fcdc))
* Exported function addProductToCart ([83983af](https://github.com/wppconnect-team/wa-js/commit/83983af))
* Exported function createOrder ([ba553d0](https://github.com/wppconnect-team/wa-js/commit/ba553d0))
* Exported function updateCart ([245e7d9](https://github.com/wppconnect-team/wa-js/commit/245e7d9))

### Bug Fixes

* BREAKING-CHANGE: Change function sendOrderMessage to sendChargeMessage ([cf3dca0](https://github.com/wppconnect-team/wa-js/commit/cf3dca0))
* downgrade husky@^9.0.11 ([e2bedb9](https://github.com/wppconnect-team/wa-js/commit/e2bedb9))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.102 ([58089f9](https://github.com/wppconnect-team/wa-js/commit/58089f9))
* **deps-dev:** update dependency @types/node to ^16.18.103 ([7338437](https://github.com/wppconnect-team/wa-js/commit/7338437))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.87 (#2120) ([7c2da8d](https://github.com/wppconnect-team/wa-js/commit/7c2da8d)), closes [#2120](https://github.com/wppconnect-team/wa-js/issues/2120)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.88 (#2125) ([74e4f47](https://github.com/wppconnect-team/wa-js/commit/74e4f47)), closes [#2125](https://github.com/wppconnect-team/wa-js/issues/2125)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.90 (#2126) ([fa44ce3](https://github.com/wppconnect-team/wa-js/commit/fa44ce3)), closes [#2126](https://github.com/wppconnect-team/wa-js/issues/2126)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.91 ([8c0322a](https://github.com/wppconnect-team/wa-js/commit/8c0322a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.93 (#2129) ([7cbb069](https://github.com/wppconnect-team/wa-js/commit/7cbb069)), closes [#2129](https://github.com/wppconnect-team/wa-js/issues/2129)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.94 (#2132) ([a2c33d2](https://github.com/wppconnect-team/wa-js/commit/a2c33d2)), closes [#2132](https://github.com/wppconnect-team/wa-js/issues/2132)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.97 ([8cb1328](https://github.com/wppconnect-team/wa-js/commit/8cb1328))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.2.1 ([919ba76](https://github.com/wppconnect-team/wa-js/commit/919ba76))
* **deps-dev:** update dependency husky to ^9.1.0 ([5bdfc55](https://github.com/wppconnect-team/wa-js/commit/5bdfc55))
* **deps-dev:** update dependency husky to ^9.1.1 ([0a4032d](https://github.com/wppconnect-team/wa-js/commit/0a4032d))
* **deps-dev:** update playwright monorepo to ^1.45.2 ([4cdc6b4](https://github.com/wppconnect-team/wa-js/commit/4cdc6b4))

## 3.6.0 (2024-07-16)

### Features

* Added WPP.chat.closeChat function ( #2113) ([192e416](https://github.com/wppconnect-team/wa-js/commit/192e416)), closes [#2113](https://github.com/wppconnect-team/wa-js/issues/2113)

### Bug Fixes

* Fixed get text status function (close #2115) ([b165a1c](https://github.com/wppconnect-team/wa-js/commit/b165a1c)), closes [#2115](https://github.com/wppconnect-team/wa-js/issues/2115)
* Improovment check versions for >= 2.3000.x ([4119ef2](https://github.com/wppconnect-team/wa-js/commit/4119ef2))

### Documentation

* Improovment README.MD ([a24acfb](https://github.com/wppconnect-team/wa-js/commit/a24acfb))

### Styles

* Improovment check versions for >= 2.3000.x ([7300a38](https://github.com/wppconnect-team/wa-js/commit/7300a38))
* update funding ([b70dcd8](https://github.com/wppconnect-team/wa-js/commit/b70dcd8))
* Update README.MD ([72f2204](https://github.com/wppconnect-team/wa-js/commit/72f2204))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.71 (#2100) ([09d37dc](https://github.com/wppconnect-team/wa-js/commit/09d37dc)), closes [#2100](https://github.com/wppconnect-team/wa-js/issues/2100)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.72 ([c48bc93](https://github.com/wppconnect-team/wa-js/commit/c48bc93))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.73 (#2103) ([c5ee1e1](https://github.com/wppconnect-team/wa-js/commit/c5ee1e1)), closes [#2103](https://github.com/wppconnect-team/wa-js/issues/2103)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.74 (#2104) ([a29b54f](https://github.com/wppconnect-team/wa-js/commit/a29b54f)), closes [#2104](https://github.com/wppconnect-team/wa-js/issues/2104)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.76 ([f432133](https://github.com/wppconnect-team/wa-js/commit/f432133))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.78 (#2108) ([2dda6cd](https://github.com/wppconnect-team/wa-js/commit/2dda6cd)), closes [#2108](https://github.com/wppconnect-team/wa-js/issues/2108)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.79 ([8f373b5](https://github.com/wppconnect-team/wa-js/commit/8f373b5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.80 ([3f7dec3](https://github.com/wppconnect-team/wa-js/commit/3f7dec3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.83 ([da942e7](https://github.com/wppconnect-team/wa-js/commit/da942e7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.84 ([f2b20f8](https://github.com/wppconnect-team/wa-js/commit/f2b20f8))
* **deps-dev:** update dependency compare-versions to ^6.1.1 ([346de19](https://github.com/wppconnect-team/wa-js/commit/346de19))
* **deps-dev:** update dependency prettier to ^3.3.3 ([73c5094](https://github.com/wppconnect-team/wa-js/commit/73c5094))
* **deps-dev:** update dependency release-it to ^17.6.0 ([b91bba5](https://github.com/wppconnect-team/wa-js/commit/b91bba5))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.4 ([a9a866b](https://github.com/wppconnect-team/wa-js/commit/a9a866b))
* **deps-dev:** update typescript-eslint monorepo to ^7.16.1 ([5c54ab5](https://github.com/wppconnect-team/wa-js/commit/5c54ab5))

### Chores

* **deps:** lock file maintenance ([a0fed09](https://github.com/wppconnect-team/wa-js/commit/a0fed09))

## 3.5.0 (2024-07-12)

### Features

* Added 'conn.logout_reason' event (close #1899) ([2466c30](https://github.com/wppconnect-team/wa-js/commit/2466c30)), closes [#1899](https://github.com/wppconnect-team/wa-js/issues/1899)

### Bug Fixes

* Fixed findChat is not a function (close #2098) ([0944133](https://github.com/wppconnect-team/wa-js/commit/0944133)), closes [#2098](https://github.com/wppconnect-team/wa-js/issues/2098)

### Documentation

* Update README to show top Contribuitors ([68f014f](https://github.com/wppconnect-team/wa-js/commit/68f014f))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.60 (#2083) ([721cad1](https://github.com/wppconnect-team/wa-js/commit/721cad1)), closes [#2083](https://github.com/wppconnect-team/wa-js/issues/2083)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.61 ([82415b3](https://github.com/wppconnect-team/wa-js/commit/82415b3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.64 ([5cc0135](https://github.com/wppconnect-team/wa-js/commit/5cc0135))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.65 (#2091) ([e1284e5](https://github.com/wppconnect-team/wa-js/commit/e1284e5)), closes [#2091](https://github.com/wppconnect-team/wa-js/issues/2091)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.67 ([869a2a0](https://github.com/wppconnect-team/wa-js/commit/869a2a0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.69 ([ae83e0d](https://github.com/wppconnect-team/wa-js/commit/ae83e0d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.70 (#2099) ([0bcc81f](https://github.com/wppconnect-team/wa-js/commit/0bcc81f)), closes [#2099](https://github.com/wppconnect-team/wa-js/issues/2099)
* **deps-dev:** update dependency release-it to ^17.5.0 ([9873160](https://github.com/wppconnect-team/wa-js/commit/9873160))
* **deps-dev:** update dependency ts-morph to v23 (#2046) ([04b854b](https://github.com/wppconnect-team/wa-js/commit/04b854b)), closes [#2046](https://github.com/wppconnect-team/wa-js/issues/2046)
* **deps-dev:** update dependency typedoc to ^0.26.4 ([73f74f4](https://github.com/wppconnect-team/wa-js/commit/73f74f4))
* **deps-dev:** update dependency webpack to ^5.93.0 ([cb06285](https://github.com/wppconnect-team/wa-js/commit/cb06285))
* **deps-dev:** update typescript-eslint monorepo to ^7.16.0 ([91c4908](https://github.com/wppconnect-team/wa-js/commit/91c4908))

### Continuous Integration

* **deps:** update actions/setup-node action to v4.0.3 ([537badd](https://github.com/wppconnect-team/wa-js/commit/537badd))

## <small>3.4.2 (2024-07-08)</small>

### Bug Fixes

* Fixed isStatusV3 error (close #2054) ([dfae74d](https://github.com/wppconnect-team/wa-js/commit/dfae74d)), closes [#2054](https://github.com/wppconnect-team/wa-js/issues/2054)
* Fixed send status functions (#2074) ([740d1b5](https://github.com/wppconnect-team/wa-js/commit/740d1b5)), closes [#2074](https://github.com/wppconnect-team/wa-js/issues/2074)
* Fixed WPP.group.create function (close #2050) (#2056) ([deb8160](https://github.com/wppconnect-team/wa-js/commit/deb8160)), closes [#2050](https://github.com/wppconnect-team/wa-js/issues/2050) [#2056](https://github.com/wppconnect-team/wa-js/issues/2056)

### Documentation

* Removed --gaId ([97c2e3e](https://github.com/wppconnect-team/wa-js/commit/97c2e3e))

### Styles

* Refix isStatus attribute >= 2.3000.x ([4571313](https://github.com/wppconnect-team/wa-js/commit/4571313))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.47 (#2057) ([cd8a632](https://github.com/wppconnect-team/wa-js/commit/cd8a632)), closes [#2057](https://github.com/wppconnect-team/wa-js/issues/2057)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.48 (#2061) ([735601e](https://github.com/wppconnect-team/wa-js/commit/735601e)), closes [#2061](https://github.com/wppconnect-team/wa-js/issues/2061)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.49 ([0ebc6ec](https://github.com/wppconnect-team/wa-js/commit/0ebc6ec))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.50 ([c86be9d](https://github.com/wppconnect-team/wa-js/commit/c86be9d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.51 ([0667665](https://github.com/wppconnect-team/wa-js/commit/0667665))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.52 ([7fdb88d](https://github.com/wppconnect-team/wa-js/commit/7fdb88d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.53 ([c370ac9](https://github.com/wppconnect-team/wa-js/commit/c370ac9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.55 ([a33dc23](https://github.com/wppconnect-team/wa-js/commit/a33dc23))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.56 ([1d60e51](https://github.com/wppconnect-team/wa-js/commit/1d60e51))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.57 ([9314d1b](https://github.com/wppconnect-team/wa-js/commit/9314d1b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.58 ([8345062](https://github.com/wppconnect-team/wa-js/commit/8345062))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.59 ([fd26adf](https://github.com/wppconnect-team/wa-js/commit/fd26adf))
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to ^12.1.1 ([933a380](https://github.com/wppconnect-team/wa-js/commit/933a380))
* **deps-dev:** update dependency release-it to ^17.4.1 (#2058) ([106ba55](https://github.com/wppconnect-team/wa-js/commit/106ba55)), closes [#2058](https://github.com/wppconnect-team/wa-js/issues/2058)
* **deps-dev:** update dependency typedoc to ^0.26.3 ([1dc07a3](https://github.com/wppconnect-team/wa-js/commit/1dc07a3))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.2 (#2060) ([6756809](https://github.com/wppconnect-team/wa-js/commit/6756809)), closes [#2060](https://github.com/wppconnect-team/wa-js/issues/2060)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.3 ([cd9b325](https://github.com/wppconnect-team/wa-js/commit/cd9b325))
* **deps-dev:** update dependency typedoc-plugin-missing-exports to v3 (#2043) ([3d25bd3](https://github.com/wppconnect-team/wa-js/commit/3d25bd3)), closes [#2043](https://github.com/wppconnect-team/wa-js/issues/2043)
* **deps-dev:** update dependency typescript to ^5.5.3 ([9e50dee](https://github.com/wppconnect-team/wa-js/commit/9e50dee))
* **deps-dev:** update playwright monorepo to ^1.45.0 ([9f9e4aa](https://github.com/wppconnect-team/wa-js/commit/9f9e4aa))
* **deps-dev:** update playwright monorepo to ^1.45.1 ([6b1a398](https://github.com/wppconnect-team/wa-js/commit/6b1a398))
* **deps-dev:** update typescript-eslint monorepo to ^7.15.0 ([4c214c6](https://github.com/wppconnect-team/wa-js/commit/4c214c6))

### Chores

* **deps:** lock file maintenance ([fa01117](https://github.com/wppconnect-team/wa-js/commit/fa01117))

## <small>3.4.1 (2024-06-24)</small>

### Features

* Added queryOrder function ([9bae53b](https://github.com/wppconnect-team/wa-js/commit/9bae53b))

### Bug Fixes

* Improovment WPP.order.get function ([9ad2dd2](https://github.com/wppconnect-team/wa-js/commit/9ad2dd2))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.25 ([bc0cd96](https://github.com/wppconnect-team/wa-js/commit/bc0cd96))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.26 (#2040) ([45fd84d](https://github.com/wppconnect-team/wa-js/commit/45fd84d)), closes [#2040](https://github.com/wppconnect-team/wa-js/issues/2040)
* **deps-dev:** update dependency typedoc to ^0.26.0 ([aa9cff3](https://github.com/wppconnect-team/wa-js/commit/aa9cff3))
* **deps-dev:** update dependency typedoc to ^0.26.1 ([939fc12](https://github.com/wppconnect-team/wa-js/commit/939fc12))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.0 ([1bd51f3](https://github.com/wppconnect-team/wa-js/commit/1bd51f3))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.2.1 ([5b45c23](https://github.com/wppconnect-team/wa-js/commit/5b45c23))

## 3.4.0 (2024-06-21)

### Features

* Added WPP.chat.sendPixKeyMessage ([b3526f2](https://github.com/wppconnect-team/wa-js/commit/b3526f2))

### Bug Fixes

* Fixed functions for Whatsaspp >=2.3000.1014314644 ([e22a7f5](https://github.com/wppconnect-team/wa-js/commit/e22a7f5))
* Fixed join group via invite (close #2029) ([610884d](https://github.com/wppconnect-team/wa-js/commit/610884d)), closes [#2029](https://github.com/wppconnect-team/wa-js/issues/2029)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.100 ([cfe9da8](https://github.com/wppconnect-team/wa-js/commit/cfe9da8))
* **deps-dev:** update dependency @types/node to ^16.18.101 ([0d80888](https://github.com/wppconnect-team/wa-js/commit/0d80888))
* **deps-dev:** update dependency @types/node to ^16.18.99 ([56024e8](https://github.com/wppconnect-team/wa-js/commit/56024e8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.15 (#2017) ([c151644](https://github.com/wppconnect-team/wa-js/commit/c151644)), closes [#2017](https://github.com/wppconnect-team/wa-js/issues/2017)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.16 ([510831f](https://github.com/wppconnect-team/wa-js/commit/510831f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.17 ([82ee353](https://github.com/wppconnect-team/wa-js/commit/82ee353))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.18 ([f123fff](https://github.com/wppconnect-team/wa-js/commit/f123fff))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.20 ([7818eb6](https://github.com/wppconnect-team/wa-js/commit/7818eb6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.22 ([ca6d519](https://github.com/wppconnect-team/wa-js/commit/ca6d519))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.23 ([3aeca62](https://github.com/wppconnect-team/wa-js/commit/3aeca62))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.24 (#2037) ([18bea19](https://github.com/wppconnect-team/wa-js/commit/18bea19)), closes [#2037](https://github.com/wppconnect-team/wa-js/issues/2037)
* **deps-dev:** update dependency release-it to ^17.4.0 ([349f8b5](https://github.com/wppconnect-team/wa-js/commit/349f8b5))
* **deps-dev:** update dependency typescript to ^5.5.2 ([9e4674d](https://github.com/wppconnect-team/wa-js/commit/9e4674d))
* **deps-dev:** update dependency webpack to ^5.92.1 ([6ec18d8](https://github.com/wppconnect-team/wa-js/commit/6ec18d8))
* **deps-dev:** update typescript-eslint monorepo to ^7.13.1 ([a1c6fb0](https://github.com/wppconnect-team/wa-js/commit/a1c6fb0))

### Chores

* **deps:** lock file maintenance ([f3ca7e4](https://github.com/wppconnect-team/wa-js/commit/f3ca7e4))

## <small>3.3.2 (2024-06-18)</small>

### Features

* Added call.outgoing_call event (#2018) ([cda7e7a](https://github.com/wppconnect-team/wa-js/commit/cda7e7a)), closes [#2018](https://github.com/wppconnect-team/wa-js/issues/2018)

### Bug Fixes

* Fixed chat.new_reaction event in 2.3000.x (#2021) ([65b35e5](https://github.com/wppconnect-team/wa-js/commit/65b35e5)), closes [#2021](https://github.com/wppconnect-team/wa-js/issues/2021)
* Fixed join group via invite (close #1986) ([e3d26fa](https://github.com/wppconnect-team/wa-js/commit/e3d26fa)), closes [#1986](https://github.com/wppconnect-team/wa-js/issues/1986)

### Reverts

* feat: Added call.outgoing_call event ([c2f470a](https://github.com/wppconnect-team/wa-js/commit/c2f470a))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.214 ([12899c8](https://github.com/wppconnect-team/wa-js/commit/12899c8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.215 (#2001) ([a93bf45](https://github.com/wppconnect-team/wa-js/commit/a93bf45)), closes [#2001](https://github.com/wppconnect-team/wa-js/issues/2001)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.217 ([e182354](https://github.com/wppconnect-team/wa-js/commit/e182354))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.220 ([5436f83](https://github.com/wppconnect-team/wa-js/commit/5436f83))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.221 ([f9cd616](https://github.com/wppconnect-team/wa-js/commit/f9cd616))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.1 ([d5c5922](https://github.com/wppconnect-team/wa-js/commit/d5c5922))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.2 ([0b31810](https://github.com/wppconnect-team/wa-js/commit/0b31810))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.5.3 ([8a90c13](https://github.com/wppconnect-team/wa-js/commit/8a90c13))
* **deps-dev:** update dependency lint-staged to ^15.2.6 ([163d09b](https://github.com/wppconnect-team/wa-js/commit/163d09b))
* **deps-dev:** update dependency lint-staged to ^15.2.7 ([b1fa12a](https://github.com/wppconnect-team/wa-js/commit/b1fa12a))
* **deps-dev:** update dependency prettier to ^3.3.2 ([8b72431](https://github.com/wppconnect-team/wa-js/commit/8b72431))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.30 ([2e41648](https://github.com/wppconnect-team/wa-js/commit/2e41648))
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^2.3.0 ([841a448](https://github.com/wppconnect-team/wa-js/commit/841a448))
* **deps-dev:** update dependency webpack to ^5.92.0 ([c5180af](https://github.com/wppconnect-team/wa-js/commit/c5180af))
* **deps-dev:** update typescript-eslint monorepo to ^7.13.0 ([dbda6a7](https://github.com/wppconnect-team/wa-js/commit/dbda6a7))

### Continuous Integration

* **deps:** update actions/checkout digest to 692973e ([1a9250a](https://github.com/wppconnect-team/wa-js/commit/1a9250a))

### Chores

* **deps:** lock file maintenance ([31900aa](https://github.com/wppconnect-team/wa-js/commit/31900aa))
* **deps:** lock file maintenance ([607de49](https://github.com/wppconnect-team/wa-js/commit/607de49))

## <small>3.3.1 (2024-06-09)</small>

### Bug Fixes

* Fixed delete messages for me ([5cdf157](https://github.com/wppconnect-team/wa-js/commit/5cdf157))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.209 ([066414d](https://github.com/wppconnect-team/wa-js/commit/066414d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.210 ([7204d30](https://github.com/wppconnect-team/wa-js/commit/7204d30))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.211 ([597a0a9](https://github.com/wppconnect-team/wa-js/commit/597a0a9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.212 ([8303134](https://github.com/wppconnect-team/wa-js/commit/8303134))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.213 ([bb369c3](https://github.com/wppconnect-team/wa-js/commit/bb369c3))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.29 ([b2ff998](https://github.com/wppconnect-team/wa-js/commit/b2ff998))

## 3.3.0 (2024-06-06)

### Features

* Added  editMessage id response (#1955) ([b6b96b8](https://github.com/wppconnect-team/wa-js/commit/b6b96b8)), closes [#1955](https://github.com/wppconnect-team/wa-js/issues/1955)
* **group:** add getPastParticipants function (#1936) ([cdd2c6a](https://github.com/wppconnect-team/wa-js/commit/cdd2c6a)), closes [#1936](https://github.com/wppconnect-team/wa-js/issues/1936)
* Improovment on edit message captions (#1946) ([b609a9f](https://github.com/wppconnect-team/wa-js/commit/b609a9f)), closes [#1946](https://github.com/wppconnect-team/wa-js/issues/1946)

### Bug Fixes

* Added version in compiled files (close #1928) ([7c50f80](https://github.com/wppconnect-team/wa-js/commit/7c50f80)), closes [#1928](https://github.com/wppconnect-team/wa-js/issues/1928)
* Fixed deleteMessage function (#1954) (close #1939) ([6e71b0d](https://github.com/wppconnect-team/wa-js/commit/6e71b0d)), closes [#1954](https://github.com/wppconnect-team/wa-js/issues/1954) [#1939](https://github.com/wppconnect-team/wa-js/issues/1939)
* Fixed launch protocol-log function (close #1950) ([7380885](https://github.com/wppconnect-team/wa-js/commit/7380885)), closes [#1950](https://github.com/wppconnect-team/wa-js/issues/1950)
* Fixed send group invite link (#1991) ([1978c5c](https://github.com/wppconnect-team/wa-js/commit/1978c5c)), closes [#1991](https://github.com/wppconnect-team/wa-js/issues/1991)
* **group:** Fixed Add Member if not an administrator (#1964) ([4afb4d4](https://github.com/wppconnect-team/wa-js/commit/4afb4d4)), closes [#1964](https://github.com/wppconnect-team/wa-js/issues/1964)

### Documentation

* Update FUNDING.yml ([7e04e56](https://github.com/wppconnect-team/wa-js/commit/7e04e56))

### Build System

* **deps-dev:** update dependency @commitlint/prompt-cli to ^19.3.1 ([c5fd7f1](https://github.com/wppconnect-team/wa-js/commit/c5fd7f1))
* **deps-dev:** update dependency @types/node to ^16.18.98 (#1984) ([8b13a81](https://github.com/wppconnect-team/wa-js/commit/8b13a81)), closes [#1984](https://github.com/wppconnect-team/wa-js/issues/1984)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.140 ([4f4f81b](https://github.com/wppconnect-team/wa-js/commit/4f4f81b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.141 (#1921) ([08668dc](https://github.com/wppconnect-team/wa-js/commit/08668dc)), closes [#1921](https://github.com/wppconnect-team/wa-js/issues/1921)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.143 ([0b85767](https://github.com/wppconnect-team/wa-js/commit/0b85767))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.144 ([e48f975](https://github.com/wppconnect-team/wa-js/commit/e48f975))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.146 ([756ae1d](https://github.com/wppconnect-team/wa-js/commit/756ae1d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.147 ([aa74007](https://github.com/wppconnect-team/wa-js/commit/aa74007))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.150 ([cf99f84](https://github.com/wppconnect-team/wa-js/commit/cf99f84))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.154 ([a8bbd71](https://github.com/wppconnect-team/wa-js/commit/a8bbd71))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.162 ([a45a588](https://github.com/wppconnect-team/wa-js/commit/a45a588))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.163 ([87bee34](https://github.com/wppconnect-team/wa-js/commit/87bee34))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.171 ([ca0e6f3](https://github.com/wppconnect-team/wa-js/commit/ca0e6f3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.172 ([155ceb0](https://github.com/wppconnect-team/wa-js/commit/155ceb0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.173 ([b66b14b](https://github.com/wppconnect-team/wa-js/commit/b66b14b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.174 ([1e10ad4](https://github.com/wppconnect-team/wa-js/commit/1e10ad4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.175 ([ccd59d8](https://github.com/wppconnect-team/wa-js/commit/ccd59d8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.176 ([34c3259](https://github.com/wppconnect-team/wa-js/commit/34c3259))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.177 ([1ceb65b](https://github.com/wppconnect-team/wa-js/commit/1ceb65b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.178 ([82f3fe5](https://github.com/wppconnect-team/wa-js/commit/82f3fe5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.179 ([54bfeb8](https://github.com/wppconnect-team/wa-js/commit/54bfeb8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.180 ([3f58969](https://github.com/wppconnect-team/wa-js/commit/3f58969))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.181 ([530b99a](https://github.com/wppconnect-team/wa-js/commit/530b99a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.182 ([3618fd2](https://github.com/wppconnect-team/wa-js/commit/3618fd2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.183 ([6094e75](https://github.com/wppconnect-team/wa-js/commit/6094e75))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.185 ([7765524](https://github.com/wppconnect-team/wa-js/commit/7765524))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.186 (#1971) ([81266a9](https://github.com/wppconnect-team/wa-js/commit/81266a9)), closes [#1971](https://github.com/wppconnect-team/wa-js/issues/1971)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.187 ([d316844](https://github.com/wppconnect-team/wa-js/commit/d316844))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.190 ([ea9c65a](https://github.com/wppconnect-team/wa-js/commit/ea9c65a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.192 ([9e38fc6](https://github.com/wppconnect-team/wa-js/commit/9e38fc6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.193 ([e2528b3](https://github.com/wppconnect-team/wa-js/commit/e2528b3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.196 ([8b7f3c5](https://github.com/wppconnect-team/wa-js/commit/8b7f3c5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.197 ([5f7189a](https://github.com/wppconnect-team/wa-js/commit/5f7189a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.198 ([b17fa6f](https://github.com/wppconnect-team/wa-js/commit/b17fa6f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.203 ([89e903b](https://github.com/wppconnect-team/wa-js/commit/89e903b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.204 ([90a7ce2](https://github.com/wppconnect-team/wa-js/commit/90a7ce2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.206 ([2a557c1](https://github.com/wppconnect-team/wa-js/commit/2a557c1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.207 ([ef0875a](https://github.com/wppconnect-team/wa-js/commit/ef0875a))
* **deps-dev:** update dependency debug to ^4.3.5 ([3e796bc](https://github.com/wppconnect-team/wa-js/commit/3e796bc))
* **deps-dev:** update dependency lint-staged to ^15.2.4 ([f9e60e6](https://github.com/wppconnect-team/wa-js/commit/f9e60e6))
* **deps-dev:** update dependency lint-staged to ^15.2.5 ([5e8fd7e](https://github.com/wppconnect-team/wa-js/commit/5e8fd7e))
* **deps-dev:** update dependency prettier to ^3.3.0 ([bfb6854](https://github.com/wppconnect-team/wa-js/commit/bfb6854))
* **deps-dev:** update dependency prettier to ^3.3.1 ([671fe99](https://github.com/wppconnect-team/wa-js/commit/671fe99))
* **deps-dev:** update dependency release-it to ^17.3.0 ([614b314](https://github.com/wppconnect-team/wa-js/commit/614b314))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.25 ([135ff97](https://github.com/wppconnect-team/wa-js/commit/135ff97))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.26 ([6f7d02a](https://github.com/wppconnect-team/wa-js/commit/6f7d02a))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.27 ([5c17c7f](https://github.com/wppconnect-team/wa-js/commit/5c17c7f))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.28 ([2bb4d64](https://github.com/wppconnect-team/wa-js/commit/2bb4d64))
* **deps-dev:** update playwright monorepo to ^1.44.1 ([da279bf](https://github.com/wppconnect-team/wa-js/commit/da279bf))
* **deps-dev:** update typescript-eslint monorepo to ^7.10.0 ([98663d4](https://github.com/wppconnect-team/wa-js/commit/98663d4))
* **deps-dev:** update typescript-eslint monorepo to ^7.11.0 ([0c110e8](https://github.com/wppconnect-team/wa-js/commit/0c110e8))
* **deps-dev:** update typescript-eslint monorepo to ^7.12.0 ([07b81d6](https://github.com/wppconnect-team/wa-js/commit/07b81d6))
* **deps-dev:** update typescript-eslint monorepo to ^7.9.0 ([cbb7411](https://github.com/wppconnect-team/wa-js/commit/cbb7411))

### Continuous Integration

* **deps:** update actions/checkout digest to a5ac7e5 ([54940e0](https://github.com/wppconnect-team/wa-js/commit/54940e0))

### Chores

* **deps:** lock file maintenance ([b86edbc](https://github.com/wppconnect-team/wa-js/commit/b86edbc))
* **deps:** lock file maintenance ([77176ea](https://github.com/wppconnect-team/wa-js/commit/77176ea))
* **deps:** lock file maintenance ([3c56b33](https://github.com/wppconnect-team/wa-js/commit/3c56b33))
* **deps:** lock file maintenance ([2d17bc2](https://github.com/wppconnect-team/wa-js/commit/2d17bc2))

## <small>3.2.6 (2024-05-10)</small>

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.1013409128 ([a2f9053](https://github.com/wppconnect-team/wa-js/commit/a2f9053))

### Styles

* Fix StatusStore.on <= 2.3000.1013384762 ([d439df9](https://github.com/wppconnect-team/wa-js/commit/d439df9))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.139 (#1919) ([984edf8](https://github.com/wppconnect-team/wa-js/commit/984edf8)), closes [#1919](https://github.com/wppconnect-team/wa-js/issues/1919)

## <small>3.2.5 (2024-05-10)</small>

### Bug Fixes

* Fixed functions for whatsapp >= 2.3000.1013251637 (#1894) ([3f7488a](https://github.com/wppconnect-team/wa-js/commit/3f7488a)), closes [#1894](https://github.com/wppconnect-team/wa-js/issues/1894)
* Fixed functions for whatsapp >= 2.3000.1013384762 (#1917) ([46a6c28](https://github.com/wppconnect-team/wa-js/commit/46a6c28)), closes [#1917](https://github.com/wppconnect-team/wa-js/issues/1917)
* Fixed servers for link previews ([5e6d2f8](https://github.com/wppconnect-team/wa-js/commit/5e6d2f8))
* Improovment link preview to prioritize the native function ([ffa4eaa](https://github.com/wppconnect-team/wa-js/commit/ffa4eaa))
* Improovment on Linkpreview cache ([05a78d2](https://github.com/wppconnect-team/wa-js/commit/05a78d2))
* Update GTAG for Analytics ([2586f3c](https://github.com/wppconnect-team/wa-js/commit/2586f3c))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.97 (#1905) ([685039b](https://github.com/wppconnect-team/wa-js/commit/685039b)), closes [#1905](https://github.com/wppconnect-team/wa-js/issues/1905)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.118 ([6f8dcad](https://github.com/wppconnect-team/wa-js/commit/6f8dcad))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.123 (#1893) ([b42dab4](https://github.com/wppconnect-team/wa-js/commit/b42dab4)), closes [#1893](https://github.com/wppconnect-team/wa-js/issues/1893)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.124 ([176830c](https://github.com/wppconnect-team/wa-js/commit/176830c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.125 ([63346c0](https://github.com/wppconnect-team/wa-js/commit/63346c0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.127 ([6276049](https://github.com/wppconnect-team/wa-js/commit/6276049))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.128 (#1906) ([c660d0b](https://github.com/wppconnect-team/wa-js/commit/c660d0b)), closes [#1906](https://github.com/wppconnect-team/wa-js/issues/1906)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.129 (#1908) ([ea73e4d](https://github.com/wppconnect-team/wa-js/commit/ea73e4d)), closes [#1908](https://github.com/wppconnect-team/wa-js/issues/1908)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.132 ([ab34091](https://github.com/wppconnect-team/wa-js/commit/ab34091))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.133 (#1910) ([783ade0](https://github.com/wppconnect-team/wa-js/commit/783ade0)), closes [#1910](https://github.com/wppconnect-team/wa-js/issues/1910)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.134 ([763b424](https://github.com/wppconnect-team/wa-js/commit/763b424))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.136 ([23186b1](https://github.com/wppconnect-team/wa-js/commit/23186b1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.138 (#1914) ([918a283](https://github.com/wppconnect-team/wa-js/commit/918a283)), closes [#1914](https://github.com/wppconnect-team/wa-js/issues/1914)
* **deps-dev:** update dependency conventional-changelog-angular to v8 (#1895) ([63a145b](https://github.com/wppconnect-team/wa-js/commit/63a145b)), closes [#1895](https://github.com/wppconnect-team/wa-js/issues/1895)
* **deps-dev:** update dependency conventional-changelog-cli to v5 (#1896) ([6633418](https://github.com/wppconnect-team/wa-js/commit/6633418)), closes [#1896](https://github.com/wppconnect-team/wa-js/issues/1896)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.24 ([b1c6163](https://github.com/wppconnect-team/wa-js/commit/b1c6163))
* **deps-dev:** update playwright monorepo to ^1.44.0 (#1907) ([115057b](https://github.com/wppconnect-team/wa-js/commit/115057b)), closes [#1907](https://github.com/wppconnect-team/wa-js/issues/1907)

### Continuous Integration

* **deps:** update actions/checkout digest to 0ad4b8f (#1916) ([ceb3a41](https://github.com/wppconnect-team/wa-js/commit/ceb3a41)), closes [#1916](https://github.com/wppconnect-team/wa-js/issues/1916)
* **deps:** update actions/checkout digest to 44c2b7a ([ce5b4fa](https://github.com/wppconnect-team/wa-js/commit/ce5b4fa))

### Chores

* **deps:** lock file maintenance (#1897) ([3eeab72](https://github.com/wppconnect-team/wa-js/commit/3eeab72)), closes [#1897](https://github.com/wppconnect-team/wa-js/issues/1897)
* **deps:** lock file maintenance (#1902) ([691a677](https://github.com/wppconnect-team/wa-js/commit/691a677)), closes [#1902](https://github.com/wppconnect-team/wa-js/issues/1902)

## <small>3.2.3 (2024-05-02)</small>

### Bug Fixes

* Fixed check nine digit in Brazil in queryExists (close #1888) ([8bc5f9e](https://github.com/wppconnect-team/wa-js/commit/8bc5f9e)), closes [#1888](https://github.com/wppconnect-team/wa-js/issues/1888)
* Fixed getNumChatsPinned function ([b91ec15](https://github.com/wppconnect-team/wa-js/commit/b91ec15))
* Fixed queryGroupInviteCode function (close #1890) ([b4ec6a8](https://github.com/wppconnect-team/wa-js/commit/b4ec6a8)), closes [#1890](https://github.com/wppconnect-team/wa-js/issues/1890)
* Fixed sendExitGroup function ([b4b046c](https://github.com/wppconnect-team/wa-js/commit/b4b046c))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.106 ([b1ff920](https://github.com/wppconnect-team/wa-js/commit/b1ff920))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.108 ([89c3f93](https://github.com/wppconnect-team/wa-js/commit/89c3f93))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.113 ([ed15314](https://github.com/wppconnect-team/wa-js/commit/ed15314))
* **deps-dev:** update typescript-eslint monorepo to ^7.8.0 ([8b54a4e](https://github.com/wppconnect-team/wa-js/commit/8b54a4e))

### Chores

* **deps:** lock file maintenance (#1891) ([22a8749](https://github.com/wppconnect-team/wa-js/commit/22a8749)), closes [#1891](https://github.com/wppconnect-team/wa-js/issues/1891)

## <small>3.2.2 (2024-04-29)</small>

### Bug Fixes

* Fixed setPin function (close #1871) ([247fc04](https://github.com/wppconnect-team/wa-js/commit/247fc04)), closes [#1871](https://github.com/wppconnect-team/wa-js/issues/1871)
* Fixed waiting for queryExist synchronization (close #1784) ([e89a374](https://github.com/wppconnect-team/wa-js/commit/e89a374)), closes [#1784](https://github.com/wppconnect-team/wa-js/issues/1784)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.102 (#1878) ([fa75185](https://github.com/wppconnect-team/wa-js/commit/fa75185)), closes [#1878](https://github.com/wppconnect-team/wa-js/issues/1878)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.103 ([91a9d49](https://github.com/wppconnect-team/wa-js/commit/91a9d49))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.104 ([dd1ae9c](https://github.com/wppconnect-team/wa-js/commit/dd1ae9c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.105 (#1884) ([9dc8fd9](https://github.com/wppconnect-team/wa-js/commit/9dc8fd9)), closes [#1884](https://github.com/wppconnect-team/wa-js/issues/1884)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.23 ([a295473](https://github.com/wppconnect-team/wa-js/commit/a295473))

### Chores

* **deps:** lock file maintenance ([cf2a14a](https://github.com/wppconnect-team/wa-js/commit/cf2a14a))

## <small>3.2.1 (2024-04-27)</small>

### Bug Fixes

* Fixed send some messages (#1876) ([f063fa3](https://github.com/wppconnect-team/wa-js/commit/f063fa3)), closes [#1876](https://github.com/wppconnect-team/wa-js/issues/1876)
* Fixed send view once messages types (#1869) (close #1868) ([16a1bd0](https://github.com/wppconnect-team/wa-js/commit/16a1bd0)), closes [#1869](https://github.com/wppconnect-team/wa-js/issues/1869) [#1868](https://github.com/wppconnect-team/wa-js/issues/1868)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.101 ([87a055e](https://github.com/wppconnect-team/wa-js/commit/87a055e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.94 ([36e6e12](https://github.com/wppconnect-team/wa-js/commit/36e6e12))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.95 ([9bc1aca](https://github.com/wppconnect-team/wa-js/commit/9bc1aca))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.97 (#1870) ([b95e466](https://github.com/wppconnect-team/wa-js/commit/b95e466)), closes [#1870](https://github.com/wppconnect-team/wa-js/issues/1870)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.98 (#1872) ([c9f3061](https://github.com/wppconnect-team/wa-js/commit/c9f3061)), closes [#1872](https://github.com/wppconnect-team/wa-js/issues/1872)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.99 (#1874) ([2e2c914](https://github.com/wppconnect-team/wa-js/commit/2e2c914)), closes [#1874](https://github.com/wppconnect-team/wa-js/issues/1874)
* **deps-dev:** update dependency release-it to ^17.2.1 (#1873) ([a240107](https://github.com/wppconnect-team/wa-js/commit/a240107)), closes [#1873](https://github.com/wppconnect-team/wa-js/issues/1873)

### Continuous Integration

* **deps:** update actions/checkout digest to 0ad4b8f ([7258cbb](https://github.com/wppconnect-team/wa-js/commit/7258cbb))

## 3.2.0 (2024-04-25)

### Features

* Added WPP.newsletter.getSubscribers function (#1861) (close #1746) ([31bdbb5](https://github.com/wppconnect-team/wa-js/commit/31bdbb5)), closes [#1746](https://github.com/wppconnect-team/wa-js/issues/1746)

### Bug Fixes

* Fixed functions in whatsapp >=2.3000.1013010908 ([0481ce8](https://github.com/wppconnect-team/wa-js/commit/0481ce8))
* Fixed injecting, error undefined VERSION (close #1851) ([8ccbf06](https://github.com/wppconnect-team/wa-js/commit/8ccbf06)), closes [#1851](https://github.com/wppconnect-team/wa-js/issues/1851)
* Fixed send newsletter text message (close #1808) ([a041474](https://github.com/wppconnect-team/wa-js/commit/a041474)), closes [#1808](https://github.com/wppconnect-team/wa-js/issues/1808)
* Fixed week days in spanish (close #1829)  ([a75cc32](https://github.com/wppconnect-team/wa-js/commit/a75cc32)), closes [#1829](https://github.com/wppconnect-team/wa-js/issues/1829)
* Improovment newsletter to send poll ([ca4382f](https://github.com/wppconnect-team/wa-js/commit/ca4382f))
* Improovment on remove participant group (close #1814) ([7fc192e](https://github.com/wppconnect-team/wa-js/commit/7fc192e)), closes [#1814](https://github.com/wppconnect-team/wa-js/issues/1814)

### Documentation

* fix typo (#1845) ([8bae11a](https://github.com/wppconnect-team/wa-js/commit/8bae11a)), closes [#1845](https://github.com/wppconnect-team/wa-js/issues/1845)

### Build System

* **deps-dev:** update commitlint monorepo to ^19.2.2 ([e9fc4a6](https://github.com/wppconnect-team/wa-js/commit/e9fc4a6))
* **deps-dev:** update commitlint monorepo to ^19.3.0 ([5209387](https://github.com/wppconnect-team/wa-js/commit/5209387))
* **deps-dev:** update dependency @types/prettier to v3 (#1761) ([98d7f18](https://github.com/wppconnect-team/wa-js/commit/98d7f18)), closes [#1761](https://github.com/wppconnect-team/wa-js/issues/1761)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.52 ([56469e5](https://github.com/wppconnect-team/wa-js/commit/56469e5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.63 ([74b106d](https://github.com/wppconnect-team/wa-js/commit/74b106d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.67 ([e50ae78](https://github.com/wppconnect-team/wa-js/commit/e50ae78))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.69 ([64f4a9f](https://github.com/wppconnect-team/wa-js/commit/64f4a9f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.70 ([249c872](https://github.com/wppconnect-team/wa-js/commit/249c872))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.72 ([fd7b112](https://github.com/wppconnect-team/wa-js/commit/fd7b112))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.73 ([e422969](https://github.com/wppconnect-team/wa-js/commit/e422969))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.74 ([b106386](https://github.com/wppconnect-team/wa-js/commit/b106386))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.76 ([d1d5677](https://github.com/wppconnect-team/wa-js/commit/d1d5677))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.77 ([6870b9f](https://github.com/wppconnect-team/wa-js/commit/6870b9f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.79 (#1847) ([a052285](https://github.com/wppconnect-team/wa-js/commit/a052285)), closes [#1847](https://github.com/wppconnect-team/wa-js/issues/1847)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.80 ([b8055e9](https://github.com/wppconnect-team/wa-js/commit/b8055e9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.81 ([717a100](https://github.com/wppconnect-team/wa-js/commit/717a100))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.82 ([f739509](https://github.com/wppconnect-team/wa-js/commit/f739509))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.83 ([e120359](https://github.com/wppconnect-team/wa-js/commit/e120359))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.85 ([896f996](https://github.com/wppconnect-team/wa-js/commit/896f996))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.88 ([d731a0a](https://github.com/wppconnect-team/wa-js/commit/d731a0a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.89 ([49dda96](https://github.com/wppconnect-team/wa-js/commit/49dda96))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.92 (#1864) ([e1cf2a2](https://github.com/wppconnect-team/wa-js/commit/e1cf2a2)), closes [#1864](https://github.com/wppconnect-team/wa-js/issues/1864)
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to ^12.1.0 (#1834) ([b62f1ea](https://github.com/wppconnect-team/wa-js/commit/b62f1ea)), closes [#1834](https://github.com/wppconnect-team/wa-js/issues/1834)
* **deps-dev:** update dependency release-it to ^17.2.0 (#1835) ([575b5ac](https://github.com/wppconnect-team/wa-js/commit/575b5ac)), closes [#1835](https://github.com/wppconnect-team/wa-js/issues/1835)
* **deps-dev:** update dependency typedoc to ^0.25.13 (#1823) ([ac88f6d](https://github.com/wppconnect-team/wa-js/commit/ac88f6d)), closes [#1823](https://github.com/wppconnect-team/wa-js/issues/1823)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.21 ([869ed09](https://github.com/wppconnect-team/wa-js/commit/869ed09))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.22 ([c1bd841](https://github.com/wppconnect-team/wa-js/commit/c1bd841))
* **deps-dev:** update dependency typescript to ^5.4.5 ([efb5bf4](https://github.com/wppconnect-team/wa-js/commit/efb5bf4))
* **deps-dev:** update playwright monorepo to ^1.43.1 (#1833) ([121ab62](https://github.com/wppconnect-team/wa-js/commit/121ab62)), closes [#1833](https://github.com/wppconnect-team/wa-js/issues/1833)
* **deps-dev:** update typescript-eslint monorepo to ^7.6.0 (#1824) ([87621e0](https://github.com/wppconnect-team/wa-js/commit/87621e0)), closes [#1824](https://github.com/wppconnect-team/wa-js/issues/1824)
* **deps-dev:** update typescript-eslint monorepo to ^7.7.0 ([0a882fb](https://github.com/wppconnect-team/wa-js/commit/0a882fb))
* **deps-dev:** update typescript-eslint monorepo to ^7.7.1 ([7744036](https://github.com/wppconnect-team/wa-js/commit/7744036))

### Continuous Integration

* **deps:** update actions/checkout digest to 1d96c77 ([bf76c9f](https://github.com/wppconnect-team/wa-js/commit/bf76c9f))
* **deps:** update peaceiris/actions-gh-pages action to v4 (#1828) ([d36bf07](https://github.com/wppconnect-team/wa-js/commit/d36bf07)), closes [#1828](https://github.com/wppconnect-team/wa-js/issues/1828)

### Chores

* **deps:** lock file maintenance ([9bd873a](https://github.com/wppconnect-team/wa-js/commit/9bd873a))

## <small>3.1.1 (2024-04-10)</small>

### Features

* Improovment WPP.chat.list for list Newsletters ([6d3efed](https://github.com/wppconnect-team/wa-js/commit/6d3efed))

### Bug Fixes

* Fixed fromMe is undefined ([d80bc2e](https://github.com/wppconnect-team/wa-js/commit/d80bc2e))
* Fixed Property is not defined > 2.3000.101264x (#1818) ([76cb90c](https://github.com/wppconnect-team/wa-js/commit/76cb90c)), closes [#1818](https://github.com/wppconnect-team/wa-js/issues/1818)
* Fixed Unknown File path "9550" error ([84e3466](https://github.com/wppconnect-team/wa-js/commit/84e3466))
* Fixed WPP.chat.getVotes function (#1821) ([9f717e9](https://github.com/wppconnect-team/wa-js/commit/9f717e9)), closes [#1821](https://github.com/wppconnect-team/wa-js/issues/1821)
* Update GTAG for analytics (#1800) ([46518b6](https://github.com/wppconnect-team/wa-js/commit/46518b6)), closes [#1800](https://github.com/wppconnect-team/wa-js/issues/1800)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.93 ([0e7e855](https://github.com/wppconnect-team/wa-js/commit/0e7e855))
* **deps-dev:** update dependency @types/node to ^16.18.94 ([789f53c](https://github.com/wppconnect-team/wa-js/commit/789f53c))
* **deps-dev:** update dependency @types/node to ^16.18.95 ([e6031ad](https://github.com/wppconnect-team/wa-js/commit/e6031ad))
* **deps-dev:** update dependency @types/node to ^16.18.96 (#1822) ([0db37c2](https://github.com/wppconnect-team/wa-js/commit/0db37c2)), closes [#1822](https://github.com/wppconnect-team/wa-js/issues/1822)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.17 ([e801727](https://github.com/wppconnect-team/wa-js/commit/e801727))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.18 ([6fbea09](https://github.com/wppconnect-team/wa-js/commit/6fbea09))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.21 ([d74ce12](https://github.com/wppconnect-team/wa-js/commit/d74ce12))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.22 ([f123484](https://github.com/wppconnect-team/wa-js/commit/f123484))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.26 ([f0faf40](https://github.com/wppconnect-team/wa-js/commit/f0faf40))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.27 (#1796) ([9e105e4](https://github.com/wppconnect-team/wa-js/commit/9e105e4)), closes [#1796](https://github.com/wppconnect-team/wa-js/issues/1796)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.28 ([65dd94e](https://github.com/wppconnect-team/wa-js/commit/65dd94e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.32 ([2d0b9af](https://github.com/wppconnect-team/wa-js/commit/2d0b9af))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.36 ([8feed3c](https://github.com/wppconnect-team/wa-js/commit/8feed3c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.37 ([c14e901](https://github.com/wppconnect-team/wa-js/commit/c14e901))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.39 ([e69324a](https://github.com/wppconnect-team/wa-js/commit/e69324a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.43 ([0b16ee8](https://github.com/wppconnect-team/wa-js/commit/0b16ee8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.51 (#1816) ([69169bc](https://github.com/wppconnect-team/wa-js/commit/69169bc)), closes [#1816](https://github.com/wppconnect-team/wa-js/issues/1816)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.19 ([b693d9c](https://github.com/wppconnect-team/wa-js/commit/b693d9c))
* **deps-dev:** update dependency typescript to ^5.4.4 ([91c111d](https://github.com/wppconnect-team/wa-js/commit/91c111d))
* **deps-dev:** update playwright monorepo to ^1.43.0 ([d8a2959](https://github.com/wppconnect-team/wa-js/commit/d8a2959))
* **deps-dev:** update typescript-eslint monorepo to ^7.5.0 (#1803) ([a35b001](https://github.com/wppconnect-team/wa-js/commit/a35b001)), closes [#1803](https://github.com/wppconnect-team/wa-js/issues/1803)

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.4.6 ([c2f5d94](https://github.com/wppconnect-team/wa-js/commit/c2f5d94))
* **deps:** update wagoid/commitlint-github-action action to v5.5.1 ([ec6d01e](https://github.com/wppconnect-team/wa-js/commit/ec6d01e))

### Chores

* **deps:** lock file maintenance ([c5d8e14](https://github.com/wppconnect-team/wa-js/commit/c5d8e14))

## 3.1.0 (2024-03-28)

### Features

* Added WPP.chat.pinMsg function ([a7078f8](https://github.com/wppconnect-team/wa-js/commit/a7078f8))
* Added WPP.whatsapp.PinInChatStore ([e81a362](https://github.com/wppconnect-team/wa-js/commit/e81a362))
* Exported WPP.whatsapp.sendPinInChatMsg function ([c7a5606](https://github.com/wppconnect-team/wa-js/commit/c7a5606))

### Bug Fixes

* Fixed func is not a exported function ([59db1a5](https://github.com/wppconnect-team/wa-js/commit/59db1a5))
* Fixed injecting webpack (#1783) (close #1778) ([79f1f2e](https://github.com/wppconnect-team/wa-js/commit/79f1f2e)), closes [#1783](https://github.com/wppconnect-team/wa-js/issues/1783) [#1778](https://github.com/wppconnect-team/wa-js/issues/1778)
* Fixed WPP.chat.mute function (close #1772) (#1780) ([e5e293d](https://github.com/wppconnect-team/wa-js/commit/e5e293d)), closes [#1772](https://github.com/wppconnect-team/wa-js/issues/1772) [#1780](https://github.com/wppconnect-team/wa-js/issues/1780)

### Reverts

* Added template to changelog ([9ebf70b](https://github.com/wppconnect-team/wa-js/commit/9ebf70b))

### Styles

* Added template to changelog ([480d734](https://github.com/wppconnect-team/wa-js/commit/480d734))
* Update FUNDING.yml ([91ad4d1](https://github.com/wppconnect-team/wa-js/commit/91ad4d1))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.10 ([721bb4e](https://github.com/wppconnect-team/wa-js/commit/721bb4e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.11 (#1779) ([77ee255](https://github.com/wppconnect-team/wa-js/commit/77ee255)), closes [#1779](https://github.com/wppconnect-team/wa-js/issues/1779)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.12 ([956c3d4](https://github.com/wppconnect-team/wa-js/commit/956c3d4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.13 ([a00bd75](https://github.com/wppconnect-team/wa-js/commit/a00bd75))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.15 (#1785) ([94fbd00](https://github.com/wppconnect-team/wa-js/commit/94fbd00)), closes [#1785](https://github.com/wppconnect-team/wa-js/issues/1785)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.8 (#1774) ([a457b54](https://github.com/wppconnect-team/wa-js/commit/a457b54)), closes [#1774](https://github.com/wppconnect-team/wa-js/issues/1774)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.9 ([ae81d6d](https://github.com/wppconnect-team/wa-js/commit/ae81d6d))
* **deps-dev:** update typescript-eslint monorepo to ^7.4.0 ([14060f4](https://github.com/wppconnect-team/wa-js/commit/14060f4))

### Chores

* **deps:** lock file maintenance ([0c768cc](https://github.com/wppconnect-team/wa-js/commit/0c768cc))
* Update FUNDING.yml ([f71dba5](https://github.com/wppconnect-team/wa-js/commit/f71dba5))

## <small>3.0.1 (2024-03-25)</small>

### Bug Fixes

* Fixed 'call.incoming_call' event (close #1766) ([486df99](https://github.com/wppconnect-team/wa-js/commit/486df99)), closes [#1766](https://github.com/wppconnect-team/wa-js/issues/1766)
* Fixed all labels functions (close #1607, close #1351) (#1625) ([c626e65](https://github.com/wppconnect-team/wa-js/commit/c626e65)), closes [#1607](https://github.com/wppconnect-team/wa-js/issues/1607) [#1351](https://github.com/wppconnect-team/wa-js/issues/1351) [#1625](https://github.com/wppconnect-team/wa-js/issues/1625)
* Fixed caption in send file message (close #1736) (#1738) ([42f4689](https://github.com/wppconnect-team/wa-js/commit/42f4689)), closes [#1736](https://github.com/wppconnect-team/wa-js/issues/1736) [#1738](https://github.com/wppconnect-team/wa-js/issues/1738)
* Fixed isOfficialClient check (#1769) ([88f1f0e](https://github.com/wppconnect-team/wa-js/commit/88f1f0e)), closes [#1769](https://github.com/wppconnect-team/wa-js/issues/1769)
* Fixed send list message (close #1728) ([5b4827f](https://github.com/wppconnect-team/wa-js/commit/5b4827f)), closes [#1728](https://github.com/wppconnect-team/wa-js/issues/1728)
* Fixed WPP.chat.archive function (close #1743) (#1760) ([d58e6d7](https://github.com/wppconnect-team/wa-js/commit/d58e6d7)), closes [#1743](https://github.com/wppconnect-team/wa-js/issues/1743) [#1760](https://github.com/wppconnect-team/wa-js/issues/1760)

### Documentation

* Fixed docs to run by playwright ([380e0b2](https://github.com/wppconnect-team/wa-js/commit/380e0b2))

### Build System

* **deps-dev:** update commitlint monorepo to ^19.1.0 ([569348c](https://github.com/wppconnect-team/wa-js/commit/569348c))
* **deps-dev:** update commitlint monorepo to ^19.2.0 ([2cb0cd2](https://github.com/wppconnect-team/wa-js/commit/2cb0cd2))
* **deps-dev:** update dependency @commitlint/cli to ^19.2.1 ([1c28551](https://github.com/wppconnect-team/wa-js/commit/1c28551))
* **deps-dev:** update dependency @types/node to ^16.18.88 ([5c17d99](https://github.com/wppconnect-team/wa-js/commit/5c17d99))
* **deps-dev:** update dependency @types/node to ^16.18.89 ([d14da4b](https://github.com/wppconnect-team/wa-js/commit/d14da4b))
* **deps-dev:** update dependency @types/node to ^16.18.90 ([7f2858a](https://github.com/wppconnect-team/wa-js/commit/7f2858a))
* **deps-dev:** update dependency @types/node to ^16.18.91 ([efcd527](https://github.com/wppconnect-team/wa-js/commit/efcd527))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.268 ([45de16b](https://github.com/wppconnect-team/wa-js/commit/45de16b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.270 ([b9add28](https://github.com/wppconnect-team/wa-js/commit/b9add28))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.271 ([2e310ba](https://github.com/wppconnect-team/wa-js/commit/2e310ba))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.3.11 ([cb4d79f](https://github.com/wppconnect-team/wa-js/commit/cb4d79f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.3.25 ([01ae1a4](https://github.com/wppconnect-team/wa-js/commit/01ae1a4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.3.28 ([0e33238](https://github.com/wppconnect-team/wa-js/commit/0e33238))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.0 ([ffabb42](https://github.com/wppconnect-team/wa-js/commit/ffabb42))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.1 ([dd24a4e](https://github.com/wppconnect-team/wa-js/commit/dd24a4e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.2 ([6ef8e33](https://github.com/wppconnect-team/wa-js/commit/6ef8e33))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.3 ([a3b8ddd](https://github.com/wppconnect-team/wa-js/commit/a3b8ddd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.4.6 (#1765) ([9836a5b](https://github.com/wppconnect-team/wa-js/commit/9836a5b)), closes [#1765](https://github.com/wppconnect-team/wa-js/issues/1765)
* **deps-dev:** update dependency ts-morph to v22 (#1729) ([82d9a13](https://github.com/wppconnect-team/wa-js/commit/82d9a13)), closes [#1729](https://github.com/wppconnect-team/wa-js/issues/1729)
* **deps-dev:** update dependency typedoc to ^0.25.12 ([d13bd91](https://github.com/wppconnect-team/wa-js/commit/d13bd91))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.18 ([59a6365](https://github.com/wppconnect-team/wa-js/commit/59a6365))
* **deps-dev:** update dependency typescript to ^5.4.3 ([34f63bb](https://github.com/wppconnect-team/wa-js/commit/34f63bb))
* **deps-dev:** update dependency webpack to ^5.91.0 (#1762) ([757bf04](https://github.com/wppconnect-team/wa-js/commit/757bf04)), closes [#1762](https://github.com/wppconnect-team/wa-js/issues/1762)
* **deps-dev:** update typescript-eslint monorepo to ^7.2.0 ([e49337b](https://github.com/wppconnect-team/wa-js/commit/e49337b))
* **deps-dev:** update typescript-eslint monorepo to ^7.3.1 ([81f8898](https://github.com/wppconnect-team/wa-js/commit/81f8898))

### Chores

* **deps:** lock file maintenance ([b079d15](https://github.com/wppconnect-team/wa-js/commit/b079d15))
* **deps:** lock file maintenance ([e1395c6](https://github.com/wppconnect-team/wa-js/commit/e1395c6))
* **deps:** lock file maintenance ([41305b0](https://github.com/wppconnect-team/wa-js/commit/41305b0))
* Update FUNDING.yml ([ce21995](https://github.com/wppconnect-team/wa-js/commit/ce21995))
* Update issue template ([7a59337](https://github.com/wppconnect-team/wa-js/commit/7a59337))

## 3.0.0 (2024-03-09)

### Features

* Added chat.msg_edited event (close #1620) (#1624) ([06def0a](https://github.com/wppconnect-team/wa-js/commit/06def0a)), closes [#1620](https://github.com/wppconnect-team/wa-js/issues/1620) [#1624](https://github.com/wppconnect-team/wa-js/issues/1624)
* Added support to WhasApp WEB 2.3000.x ([dca69de](https://github.com/wppconnect-team/wa-js/commit/dca69de))
* Added WPP.chat.sendGroupInviteMessage function (close #1530) (#1559) ([caf2595](https://github.com/wppconnect-team/wa-js/commit/caf2595)), closes [#1530](https://github.com/wppconnect-team/wa-js/issues/1530) [#1559](https://github.com/wppconnect-team/wa-js/issues/1559)
* Added WPP.profile.getMyProfileName function (#1656) ([7726540](https://github.com/wppconnect-team/wa-js/commit/7726540)), closes [#1656](https://github.com/wppconnect-team/wa-js/issues/1656)

### Bug Fixes

* Fixed getHistorySyncProgress function compatibility with WhatsApp >= 2.2402.2 ([8ad2cec](https://github.com/wppconnect-team/wa-js/commit/8ad2cec))
* Fixed send message for groups ([e0d5932](https://github.com/wppconnect-team/wa-js/commit/e0d5932))

### Build System

* **deps-dev:** update commitlint monorepo to ^18.4.4 ([217b391](https://github.com/wppconnect-team/wa-js/commit/217b391))
* **deps-dev:** update commitlint monorepo to ^18.5.0 (#1628) ([ac4c580](https://github.com/wppconnect-team/wa-js/commit/ac4c580)), closes [#1628](https://github.com/wppconnect-team/wa-js/issues/1628)
* **deps-dev:** update commitlint monorepo to ^18.6.0 (#1639) ([44a90c7](https://github.com/wppconnect-team/wa-js/commit/44a90c7)), closes [#1639](https://github.com/wppconnect-team/wa-js/issues/1639)
* **deps-dev:** update commitlint monorepo to ^18.6.1 ([ee49514](https://github.com/wppconnect-team/wa-js/commit/ee49514))
* **deps-dev:** update commitlint monorepo to v19 (#1698) ([9ee86c6](https://github.com/wppconnect-team/wa-js/commit/9ee86c6)), closes [#1698](https://github.com/wppconnect-team/wa-js/issues/1698)
* **deps-dev:** update dependency @commitlint/config-conventional to ^18.6.2 ([c2f9523](https://github.com/wppconnect-team/wa-js/commit/c2f9523))
* **deps-dev:** update dependency @types/node to ^16.18.69 ([88ba412](https://github.com/wppconnect-team/wa-js/commit/88ba412))
* **deps-dev:** update dependency @types/node to ^16.18.70 ([a950a0d](https://github.com/wppconnect-team/wa-js/commit/a950a0d))
* **deps-dev:** update dependency @types/node to ^16.18.71 ([50618aa](https://github.com/wppconnect-team/wa-js/commit/50618aa))
* **deps-dev:** update dependency @types/node to ^16.18.74 (#1622) ([833308a](https://github.com/wppconnect-team/wa-js/commit/833308a)), closes [#1622](https://github.com/wppconnect-team/wa-js/issues/1622)
* **deps-dev:** update dependency @types/node to ^16.18.76 (#1633) ([d9a35e5](https://github.com/wppconnect-team/wa-js/commit/d9a35e5)), closes [#1633](https://github.com/wppconnect-team/wa-js/issues/1633)
* **deps-dev:** update dependency @types/node to ^16.18.77 ([2e0a9bb](https://github.com/wppconnect-team/wa-js/commit/2e0a9bb))
* **deps-dev:** update dependency @types/node to ^16.18.78 ([45b32dc](https://github.com/wppconnect-team/wa-js/commit/45b32dc))
* **deps-dev:** update dependency @types/node to ^16.18.79 (#1650) ([0a67404](https://github.com/wppconnect-team/wa-js/commit/0a67404)), closes [#1650](https://github.com/wppconnect-team/wa-js/issues/1650)
* **deps-dev:** update dependency @types/node to ^16.18.80 ([483c0f4](https://github.com/wppconnect-team/wa-js/commit/483c0f4))
* **deps-dev:** update dependency @types/node to ^16.18.83 ([d993aac](https://github.com/wppconnect-team/wa-js/commit/d993aac))
* **deps-dev:** update dependency @types/node to ^16.18.84 ([65390ad](https://github.com/wppconnect-team/wa-js/commit/65390ad))
* **deps-dev:** update dependency @types/node to ^16.18.85 ([e9151c3](https://github.com/wppconnect-team/wa-js/commit/e9151c3))
* **deps-dev:** update dependency @types/node to ^16.18.86 ([769ffed](https://github.com/wppconnect-team/wa-js/commit/769ffed))
* **deps-dev:** update dependency @types/node to ^16.18.87 ([86431f4](https://github.com/wppconnect-team/wa-js/commit/86431f4))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.10 ([364fad6](https://github.com/wppconnect-team/wa-js/commit/364fad6))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.11 ([57ca0bc](https://github.com/wppconnect-team/wa-js/commit/57ca0bc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.174 (#1565) ([c84363a](https://github.com/wppconnect-team/wa-js/commit/c84363a)), closes [#1565](https://github.com/wppconnect-team/wa-js/issues/1565)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.175 ([f76d8e6](https://github.com/wppconnect-team/wa-js/commit/f76d8e6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.176 ([10ca969](https://github.com/wppconnect-team/wa-js/commit/10ca969))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.177 ([b79b095](https://github.com/wppconnect-team/wa-js/commit/b79b095))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.178 ([de8919b](https://github.com/wppconnect-team/wa-js/commit/de8919b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.179 ([0a5804c](https://github.com/wppconnect-team/wa-js/commit/0a5804c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.180 ([55b9144](https://github.com/wppconnect-team/wa-js/commit/55b9144))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.181 ([28f8b14](https://github.com/wppconnect-team/wa-js/commit/28f8b14))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.182 ([1d96bc3](https://github.com/wppconnect-team/wa-js/commit/1d96bc3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.183 ([03d4260](https://github.com/wppconnect-team/wa-js/commit/03d4260))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.184 ([a806c94](https://github.com/wppconnect-team/wa-js/commit/a806c94))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.185 ([7d569a8](https://github.com/wppconnect-team/wa-js/commit/7d569a8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.186 ([1ac840c](https://github.com/wppconnect-team/wa-js/commit/1ac840c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.187 ([c7cd091](https://github.com/wppconnect-team/wa-js/commit/c7cd091))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.189 ([d60cf75](https://github.com/wppconnect-team/wa-js/commit/d60cf75))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.190 ([691b05c](https://github.com/wppconnect-team/wa-js/commit/691b05c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.195 ([ba4a3b9](https://github.com/wppconnect-team/wa-js/commit/ba4a3b9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.196 ([f32ce1f](https://github.com/wppconnect-team/wa-js/commit/f32ce1f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.197 ([3305e74](https://github.com/wppconnect-team/wa-js/commit/3305e74))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.198 ([b69cd62](https://github.com/wppconnect-team/wa-js/commit/b69cd62))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.199 (#1619) ([4001900](https://github.com/wppconnect-team/wa-js/commit/4001900)), closes [#1619](https://github.com/wppconnect-team/wa-js/issues/1619)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.204 (#1621) ([b379c4b](https://github.com/wppconnect-team/wa-js/commit/b379c4b)), closes [#1621](https://github.com/wppconnect-team/wa-js/issues/1621)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.210 (#1632) ([ca55584](https://github.com/wppconnect-team/wa-js/commit/ca55584)), closes [#1632](https://github.com/wppconnect-team/wa-js/issues/1632)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.211 (#1635) ([1fcdcdd](https://github.com/wppconnect-team/wa-js/commit/1fcdcdd)), closes [#1635](https://github.com/wppconnect-team/wa-js/issues/1635)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.216 (#1637) ([2f96cb4](https://github.com/wppconnect-team/wa-js/commit/2f96cb4)), closes [#1637](https://github.com/wppconnect-team/wa-js/issues/1637)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.217 ([5cc936f](https://github.com/wppconnect-team/wa-js/commit/5cc936f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.218 ([578f697](https://github.com/wppconnect-team/wa-js/commit/578f697))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.221 ([4312aef](https://github.com/wppconnect-team/wa-js/commit/4312aef))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.222 ([cdc8bfc](https://github.com/wppconnect-team/wa-js/commit/cdc8bfc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.223 (#1651) ([d0ebcd1](https://github.com/wppconnect-team/wa-js/commit/d0ebcd1)), closes [#1651](https://github.com/wppconnect-team/wa-js/issues/1651)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.224 ([45d79f4](https://github.com/wppconnect-team/wa-js/commit/45d79f4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.227 ([89c1c50](https://github.com/wppconnect-team/wa-js/commit/89c1c50))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.229 ([8deefbb](https://github.com/wppconnect-team/wa-js/commit/8deefbb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.230 (#1661) ([02291ea](https://github.com/wppconnect-team/wa-js/commit/02291ea)), closes [#1661](https://github.com/wppconnect-team/wa-js/issues/1661)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.231 ([47de159](https://github.com/wppconnect-team/wa-js/commit/47de159))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.232 ([1335e64](https://github.com/wppconnect-team/wa-js/commit/1335e64))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.233 ([d09c09c](https://github.com/wppconnect-team/wa-js/commit/d09c09c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.235 ([e217e61](https://github.com/wppconnect-team/wa-js/commit/e217e61))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.236 ([f08d8c3](https://github.com/wppconnect-team/wa-js/commit/f08d8c3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.237 ([e1ad449](https://github.com/wppconnect-team/wa-js/commit/e1ad449))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.238 ([343d029](https://github.com/wppconnect-team/wa-js/commit/343d029))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.239 ([dd13cb7](https://github.com/wppconnect-team/wa-js/commit/dd13cb7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.240 ([af54e23](https://github.com/wppconnect-team/wa-js/commit/af54e23))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.241 ([e304a28](https://github.com/wppconnect-team/wa-js/commit/e304a28))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.250 ([8b6f9c7](https://github.com/wppconnect-team/wa-js/commit/8b6f9c7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.254 ([7619eed](https://github.com/wppconnect-team/wa-js/commit/7619eed))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.255 ([4e649ca](https://github.com/wppconnect-team/wa-js/commit/4e649ca))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.256 ([6c9b596](https://github.com/wppconnect-team/wa-js/commit/6c9b596))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.257 ([d0af215](https://github.com/wppconnect-team/wa-js/commit/d0af215))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.258 ([23a0786](https://github.com/wppconnect-team/wa-js/commit/23a0786))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.259 ([aea4691](https://github.com/wppconnect-team/wa-js/commit/aea4691))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.260 ([d8ff9bd](https://github.com/wppconnect-team/wa-js/commit/d8ff9bd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.261 ([6c08e22](https://github.com/wppconnect-team/wa-js/commit/6c08e22))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.262 ([ba5d4f2](https://github.com/wppconnect-team/wa-js/commit/ba5d4f2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.263 ([e6488a4](https://github.com/wppconnect-team/wa-js/commit/e6488a4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.264 ([928456e](https://github.com/wppconnect-team/wa-js/commit/928456e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.265 ([4e17e0c](https://github.com/wppconnect-team/wa-js/commit/4e17e0c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.266 ([b535c05](https://github.com/wppconnect-team/wa-js/commit/b535c05))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.267 ([ddc3892](https://github.com/wppconnect-team/wa-js/commit/ddc3892))
* **deps-dev:** update dependency eslint to ^8.57.0 ([7f68264](https://github.com/wppconnect-team/wa-js/commit/7f68264))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.1.0 ([820434e](https://github.com/wppconnect-team/wa-js/commit/820434e))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.1.1 ([de3c33a](https://github.com/wppconnect-team/wa-js/commit/de3c33a))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.1.2 ([28599b9](https://github.com/wppconnect-team/wa-js/commit/28599b9))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.1.3 ([42abacb](https://github.com/wppconnect-team/wa-js/commit/42abacb))
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to v12 (#1674) ([11e76f2](https://github.com/wppconnect-team/wa-js/commit/11e76f2)), closes [#1674](https://github.com/wppconnect-team/wa-js/issues/1674)
* **deps-dev:** update dependency husky to ^9.0.11 ([b4d6955](https://github.com/wppconnect-team/wa-js/commit/b4d6955))
* **deps-dev:** update dependency husky to v9 (#1636) ([488c2f4](https://github.com/wppconnect-team/wa-js/commit/488c2f4)), closes [#1636](https://github.com/wppconnect-team/wa-js/issues/1636)
* **deps-dev:** update dependency lint-staged to ^15.2.1 ([1ebf620](https://github.com/wppconnect-team/wa-js/commit/1ebf620))
* **deps-dev:** update dependency lint-staged to ^15.2.2 ([ce4fb50](https://github.com/wppconnect-team/wa-js/commit/ce4fb50))
* **deps-dev:** update dependency prettier to ^3.2.4 (#1608) ([fe444c6](https://github.com/wppconnect-team/wa-js/commit/fe444c6)), closes [#1608](https://github.com/wppconnect-team/wa-js/issues/1608)
* **deps-dev:** update dependency prettier to ^3.2.5 ([2a0a572](https://github.com/wppconnect-team/wa-js/commit/2a0a572))
* **deps-dev:** update dependency release-it to ^17.0.3 (#1631) ([fb1799c](https://github.com/wppconnect-team/wa-js/commit/fb1799c)), closes [#1631](https://github.com/wppconnect-team/wa-js/issues/1631)
* **deps-dev:** update dependency release-it to ^17.1.1 ([be3a257](https://github.com/wppconnect-team/wa-js/commit/be3a257))
* **deps-dev:** update dependency typedoc to ^0.25.10 ([4539901](https://github.com/wppconnect-team/wa-js/commit/4539901))
* **deps-dev:** update dependency typedoc to ^0.25.11 ([cf55b85](https://github.com/wppconnect-team/wa-js/commit/cf55b85))
* **deps-dev:** update dependency typedoc to ^0.25.5 ([06282f8](https://github.com/wppconnect-team/wa-js/commit/06282f8))
* **deps-dev:** update dependency typedoc to ^0.25.6 ([1ea8504](https://github.com/wppconnect-team/wa-js/commit/1ea8504))
* **deps-dev:** update dependency typedoc to ^0.25.7 ([27cb5bd](https://github.com/wppconnect-team/wa-js/commit/27cb5bd))
* **deps-dev:** update dependency typedoc to ^0.25.8 ([81936fa](https://github.com/wppconnect-team/wa-js/commit/81936fa))
* **deps-dev:** update dependency typedoc to ^0.25.9 ([df889fd](https://github.com/wppconnect-team/wa-js/commit/df889fd))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.10 ([41d7acc](https://github.com/wppconnect-team/wa-js/commit/41d7acc))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.11 ([90f1f37](https://github.com/wppconnect-team/wa-js/commit/90f1f37))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.12 ([bed8492](https://github.com/wppconnect-team/wa-js/commit/bed8492))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.13 (#1626) ([0b8eaf2](https://github.com/wppconnect-team/wa-js/commit/0b8eaf2)), closes [#1626](https://github.com/wppconnect-team/wa-js/issues/1626)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.14 (#1638) ([8b06c2f](https://github.com/wppconnect-team/wa-js/commit/8b06c2f)), closes [#1638](https://github.com/wppconnect-team/wa-js/issues/1638)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.15 ([9d766d0](https://github.com/wppconnect-team/wa-js/commit/9d766d0))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.16 ([4371d65](https://github.com/wppconnect-team/wa-js/commit/4371d65))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.17 ([40a36f5](https://github.com/wppconnect-team/wa-js/commit/40a36f5))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.9 ([d9a35df](https://github.com/wppconnect-team/wa-js/commit/d9a35df))
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^2.2.0 ([197a8ee](https://github.com/wppconnect-team/wa-js/commit/197a8ee))
* **deps-dev:** update dependency typescript to ^5.4.2 ([43330cc](https://github.com/wppconnect-team/wa-js/commit/43330cc))
* **deps-dev:** update dependency webpack to ^5.90.0 (#1634) ([dd8e93b](https://github.com/wppconnect-team/wa-js/commit/dd8e93b)), closes [#1634](https://github.com/wppconnect-team/wa-js/issues/1634)
* **deps-dev:** update dependency webpack to ^5.90.1 (#1652) ([91eaced](https://github.com/wppconnect-team/wa-js/commit/91eaced)), closes [#1652](https://github.com/wppconnect-team/wa-js/issues/1652)
* **deps-dev:** update dependency webpack to ^5.90.3 ([3b79d7e](https://github.com/wppconnect-team/wa-js/commit/3b79d7e))
* **deps-dev:** update playwright monorepo to ^1.41.0 ([388d515](https://github.com/wppconnect-team/wa-js/commit/388d515))
* **deps-dev:** update playwright monorepo to ^1.41.1 (#1623) ([389c3ef](https://github.com/wppconnect-team/wa-js/commit/389c3ef)), closes [#1623](https://github.com/wppconnect-team/wa-js/issues/1623)
* **deps-dev:** update playwright monorepo to ^1.41.2 ([f13b454](https://github.com/wppconnect-team/wa-js/commit/f13b454))
* **deps-dev:** update playwright monorepo to ^1.42.0 ([54ad6cc](https://github.com/wppconnect-team/wa-js/commit/54ad6cc))
* **deps-dev:** update playwright monorepo to ^1.42.1 ([d239c6a](https://github.com/wppconnect-team/wa-js/commit/d239c6a))
* **deps-dev:** update typescript-eslint monorepo to ^6.16.0 ([c837dcf](https://github.com/wppconnect-team/wa-js/commit/c837dcf))
* **deps-dev:** update typescript-eslint monorepo to ^6.17.0 ([bd09030](https://github.com/wppconnect-team/wa-js/commit/bd09030))
* **deps-dev:** update typescript-eslint monorepo to ^6.18.0 ([85965b5](https://github.com/wppconnect-team/wa-js/commit/85965b5))
* **deps-dev:** update typescript-eslint monorepo to ^6.18.1 ([4b6efd3](https://github.com/wppconnect-team/wa-js/commit/4b6efd3))
* **deps-dev:** update typescript-eslint monorepo to ^6.19.0 ([ae01ce2](https://github.com/wppconnect-team/wa-js/commit/ae01ce2))
* **deps-dev:** update typescript-eslint monorepo to ^6.19.1 (#1627) ([ca986e4](https://github.com/wppconnect-team/wa-js/commit/ca986e4)), closes [#1627](https://github.com/wppconnect-team/wa-js/issues/1627)
* **deps-dev:** update typescript-eslint monorepo to ^6.20.0 (#1640) ([0fff0c6](https://github.com/wppconnect-team/wa-js/commit/0fff0c6)), closes [#1640](https://github.com/wppconnect-team/wa-js/issues/1640)
* **deps-dev:** update typescript-eslint monorepo to ^6.21.0 ([502daca](https://github.com/wppconnect-team/wa-js/commit/502daca))
* **deps-dev:** update typescript-eslint monorepo to ^7.1.1 ([4b974b3](https://github.com/wppconnect-team/wa-js/commit/4b974b3))
* **deps-dev:** update typescript-eslint monorepo to v7 (#1680) ([3789ae2](https://github.com/wppconnect-team/wa-js/commit/3789ae2)), closes [#1680](https://github.com/wppconnect-team/wa-js/issues/1680)

### Continuous Integration

* **deps:** update actions/cache action to v4 (#1617) ([2865ce4](https://github.com/wppconnect-team/wa-js/commit/2865ce4)), closes [#1617](https://github.com/wppconnect-team/wa-js/issues/1617)
* **deps:** update actions/setup-node action to v4.0.2 ([9213bf0](https://github.com/wppconnect-team/wa-js/commit/9213bf0))
* **deps:** update nick-invision/retry action to v3 (#1648) ([f3879ff](https://github.com/wppconnect-team/wa-js/commit/f3879ff)), closes [#1648](https://github.com/wppconnect-team/wa-js/issues/1648)
* **deps:** update wagoid/commitlint-github-action action to v5.4.5 ([cd02dc7](https://github.com/wppconnect-team/wa-js/commit/cd02dc7))

### Chores

* **deps:** lock file maintenance ([b7cb15a](https://github.com/wppconnect-team/wa-js/commit/b7cb15a))
* **deps:** lock file maintenance ([a7b8e48](https://github.com/wppconnect-team/wa-js/commit/a7b8e48))
* **deps:** lock file maintenance ([2807e25](https://github.com/wppconnect-team/wa-js/commit/2807e25))
* **deps:** lock file maintenance ([aead851](https://github.com/wppconnect-team/wa-js/commit/aead851))
* **deps:** lock file maintenance ([71af106](https://github.com/wppconnect-team/wa-js/commit/71af106))
* **deps:** lock file maintenance ([c8c52e0](https://github.com/wppconnect-team/wa-js/commit/c8c52e0))
* Improve browser tool to download the missing files ([7317c9c](https://github.com/wppconnect-team/wa-js/commit/7317c9c))

## <small>2.28.1 (2023-12-20)</small>

### Features

* Added WPP.chat.keepMessage function (close #1142) (#1517) ([77298e1](https://github.com/wppconnect-team/wa-js/commit/77298e1)), closes [#1142](https://github.com/wppconnect-team/wa-js/issues/1142) [#1517](https://github.com/wppconnect-team/wa-js/issues/1517)
* Added WPP.contact.get function (close #1012) (#1516) ([0c31d37](https://github.com/wppconnect-team/wa-js/commit/0c31d37)), closes [#1012](https://github.com/wppconnect-team/wa-js/issues/1012) [#1516](https://github.com/wppconnect-team/wa-js/issues/1516)

### Bug Fixes

* Exported the missing options ([2133e7e](https://github.com/wppconnect-team/wa-js/commit/2133e7e))
* Fixed catalog.editProduct function(close #1553) ([01c4a18](https://github.com/wppconnect-team/wa-js/commit/01c4a18)), closes [#1553](https://github.com/wppconnect-team/wa-js/issues/1553)
* Fixed send status error (#1540) ([fe69680](https://github.com/wppconnect-team/wa-js/commit/fe69680)), closes [#1540](https://github.com/wppconnect-team/wa-js/issues/1540)
* forwardMessagesToChats is missing from ChatStore (#1535) ([788a37f](https://github.com/wppconnect-team/wa-js/commit/788a37f)), closes [#1535](https://github.com/wppconnect-team/wa-js/issues/1535)

### Build System

* **deps-dev:** update commitlint monorepo to ^18.4.0 ([93a86b8](https://github.com/wppconnect-team/wa-js/commit/93a86b8))
* **deps-dev:** update commitlint monorepo to ^18.4.1 ([055baae](https://github.com/wppconnect-team/wa-js/commit/055baae))
* **deps-dev:** update commitlint monorepo to ^18.4.2 (#1488) ([a248e3d](https://github.com/wppconnect-team/wa-js/commit/a248e3d)), closes [#1488](https://github.com/wppconnect-team/wa-js/issues/1488)
* **deps-dev:** update commitlint monorepo to ^18.4.3 ([786489a](https://github.com/wppconnect-team/wa-js/commit/786489a))
* **deps-dev:** update dependency @types/debug to ^4.1.11 ([382f0f6](https://github.com/wppconnect-team/wa-js/commit/382f0f6))
* **deps-dev:** update dependency @types/debug to ^4.1.12 ([f8fbe19](https://github.com/wppconnect-team/wa-js/commit/f8fbe19))
* **deps-dev:** update dependency @types/node to ^16.18.60 ([01597fe](https://github.com/wppconnect-team/wa-js/commit/01597fe))
* **deps-dev:** update dependency @types/node to ^16.18.61 ([752d349](https://github.com/wppconnect-team/wa-js/commit/752d349))
* **deps-dev:** update dependency @types/node to ^16.18.62 (#1492) ([c96b1d2](https://github.com/wppconnect-team/wa-js/commit/c96b1d2)), closes [#1492](https://github.com/wppconnect-team/wa-js/issues/1492)
* **deps-dev:** update dependency @types/node to ^16.18.63 ([b25c6f4](https://github.com/wppconnect-team/wa-js/commit/b25c6f4))
* **deps-dev:** update dependency @types/node to ^16.18.64 ([15f4bd4](https://github.com/wppconnect-team/wa-js/commit/15f4bd4))
* **deps-dev:** update dependency @types/node to ^16.18.65 ([2d0697f](https://github.com/wppconnect-team/wa-js/commit/2d0697f))
* **deps-dev:** update dependency @types/node to ^16.18.66 ([9d842a4](https://github.com/wppconnect-team/wa-js/commit/9d842a4))
* **deps-dev:** update dependency @types/node to ^16.18.67 ([665740d](https://github.com/wppconnect-team/wa-js/commit/665740d))
* **deps-dev:** update dependency @types/node to ^16.18.68 ([f46afa3](https://github.com/wppconnect-team/wa-js/commit/f46afa3))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.8 ([cc9880c](https://github.com/wppconnect-team/wa-js/commit/cc9880c))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.9 ([6aaa03b](https://github.com/wppconnect-team/wa-js/commit/6aaa03b))
* **deps-dev:** update dependency @types/parse-data-url to ^3.0.2 ([df0cfa9](https://github.com/wppconnect-team/wa-js/commit/df0cfa9))
* **deps-dev:** update dependency @types/shelljs to ^0.8.15 ([a79a9e9](https://github.com/wppconnect-team/wa-js/commit/a79a9e9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.133 ([d9056ba](https://github.com/wppconnect-team/wa-js/commit/d9056ba))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.134 (#1456) ([18979a2](https://github.com/wppconnect-team/wa-js/commit/18979a2)), closes [#1456](https://github.com/wppconnect-team/wa-js/issues/1456)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.135 ([b6f7312](https://github.com/wppconnect-team/wa-js/commit/b6f7312))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.136 ([2962f52](https://github.com/wppconnect-team/wa-js/commit/2962f52))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.138 ([13ed806](https://github.com/wppconnect-team/wa-js/commit/13ed806))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.139 ([d834e98](https://github.com/wppconnect-team/wa-js/commit/d834e98))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.140 ([ed7c313](https://github.com/wppconnect-team/wa-js/commit/ed7c313))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.141 ([9025ae8](https://github.com/wppconnect-team/wa-js/commit/9025ae8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.142 ([13b5916](https://github.com/wppconnect-team/wa-js/commit/13b5916))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.143 ([f30ac8d](https://github.com/wppconnect-team/wa-js/commit/f30ac8d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.144 ([916ad7d](https://github.com/wppconnect-team/wa-js/commit/916ad7d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.145 ([d00931f](https://github.com/wppconnect-team/wa-js/commit/d00931f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.146 ([580b7d3](https://github.com/wppconnect-team/wa-js/commit/580b7d3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.147 ([ac67aa3](https://github.com/wppconnect-team/wa-js/commit/ac67aa3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.151 (#1489) ([00d9339](https://github.com/wppconnect-team/wa-js/commit/00d9339)), closes [#1489](https://github.com/wppconnect-team/wa-js/issues/1489)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.152 ([17b4f87](https://github.com/wppconnect-team/wa-js/commit/17b4f87))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.153 ([86e862a](https://github.com/wppconnect-team/wa-js/commit/86e862a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.154 ([1b829d6](https://github.com/wppconnect-team/wa-js/commit/1b829d6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.155 ([6a4f1ac](https://github.com/wppconnect-team/wa-js/commit/6a4f1ac))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.156 (#1515) ([5feec04](https://github.com/wppconnect-team/wa-js/commit/5feec04)), closes [#1515](https://github.com/wppconnect-team/wa-js/issues/1515)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.157 ([576750a](https://github.com/wppconnect-team/wa-js/commit/576750a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.158 ([6cc7d22](https://github.com/wppconnect-team/wa-js/commit/6cc7d22))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.159 ([757ed0a](https://github.com/wppconnect-team/wa-js/commit/757ed0a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.160 ([7bc9dfa](https://github.com/wppconnect-team/wa-js/commit/7bc9dfa))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.161 ([eb05cf2](https://github.com/wppconnect-team/wa-js/commit/eb05cf2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.162 (#1534) ([28e479b](https://github.com/wppconnect-team/wa-js/commit/28e479b)), closes [#1534](https://github.com/wppconnect-team/wa-js/issues/1534)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.163 ([1d28df7](https://github.com/wppconnect-team/wa-js/commit/1d28df7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.164 ([acc02af](https://github.com/wppconnect-team/wa-js/commit/acc02af))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.165 ([9d1f44d](https://github.com/wppconnect-team/wa-js/commit/9d1f44d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.166 ([f07f9a1](https://github.com/wppconnect-team/wa-js/commit/f07f9a1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.167 ([ce3f4d5](https://github.com/wppconnect-team/wa-js/commit/ce3f4d5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.168 ([c6e97e9](https://github.com/wppconnect-team/wa-js/commit/c6e97e9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.169 ([b2d7151](https://github.com/wppconnect-team/wa-js/commit/b2d7151))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.170 ([e7596bc](https://github.com/wppconnect-team/wa-js/commit/e7596bc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.171 ([30b3c3f](https://github.com/wppconnect-team/wa-js/commit/30b3c3f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.172 ([601d2ac](https://github.com/wppconnect-team/wa-js/commit/601d2ac))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.173 (#1564) ([16addb6](https://github.com/wppconnect-team/wa-js/commit/16addb6)), closes [#1564](https://github.com/wppconnect-team/wa-js/issues/1564)
* **deps-dev:** update dependency eslint to ^8.53.0 ([3427f78](https://github.com/wppconnect-team/wa-js/commit/3427f78))
* **deps-dev:** update dependency eslint to ^8.55.0 ([50d2197](https://github.com/wppconnect-team/wa-js/commit/50d2197))
* **deps-dev:** update dependency eslint to ^8.56.0 ([4ef322f](https://github.com/wppconnect-team/wa-js/commit/4ef322f))
* **deps-dev:** update dependency eslint-config-prettier to ^9.1.0 ([5cde2be](https://github.com/wppconnect-team/wa-js/commit/5cde2be))
* **deps-dev:** update dependency eslint-plugin-import to ^2.29.1 (#1554) ([2a08124](https://github.com/wppconnect-team/wa-js/commit/2a08124)), closes [#1554](https://github.com/wppconnect-team/wa-js/issues/1554)
* **deps-dev:** update dependency lint-staged to ^15.1.0 (#1476) ([6c61141](https://github.com/wppconnect-team/wa-js/commit/6c61141)), closes [#1476](https://github.com/wppconnect-team/wa-js/issues/1476)
* **deps-dev:** update dependency lint-staged to ^15.2.0 ([14fc459](https://github.com/wppconnect-team/wa-js/commit/14fc459))
* **deps-dev:** update dependency prettier to ^3.1.1 ([2550b97](https://github.com/wppconnect-team/wa-js/commit/2550b97))
* **deps-dev:** update dependency release-it to ^17.0.1 (#1541) ([df9c5c6](https://github.com/wppconnect-team/wa-js/commit/df9c5c6)), closes [#1541](https://github.com/wppconnect-team/wa-js/issues/1541)
* **deps-dev:** update dependency release-it to v17 (#1475) ([6872f83](https://github.com/wppconnect-team/wa-js/commit/6872f83)), closes [#1475](https://github.com/wppconnect-team/wa-js/issues/1475)
* **deps-dev:** update dependency ts-loader to ^9.5.1 (#1490) ([33bed5a](https://github.com/wppconnect-team/wa-js/commit/33bed5a)), closes [#1490](https://github.com/wppconnect-team/wa-js/issues/1490)
* **deps-dev:** update dependency ts-morph to v21 (#1525) ([5242e9c](https://github.com/wppconnect-team/wa-js/commit/5242e9c)), closes [#1525](https://github.com/wppconnect-team/wa-js/issues/1525)
* **deps-dev:** update dependency ts-node to ^10.9.2 ([de325bd](https://github.com/wppconnect-team/wa-js/commit/de325bd))
* **deps-dev:** update dependency typedoc to ^0.25.3 ([b334cf6](https://github.com/wppconnect-team/wa-js/commit/b334cf6))
* **deps-dev:** update dependency typedoc to ^0.25.4 ([5318692](https://github.com/wppconnect-team/wa-js/commit/5318692))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.3 (#1491) ([da2ce01](https://github.com/wppconnect-team/wa-js/commit/da2ce01)), closes [#1491](https://github.com/wppconnect-team/wa-js/issues/1491)
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.4 ([2cd2d9c](https://github.com/wppconnect-team/wa-js/commit/2cd2d9c))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.5 ([d7b67e4](https://github.com/wppconnect-team/wa-js/commit/d7b67e4))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.6 ([edeb68c](https://github.com/wppconnect-team/wa-js/commit/edeb68c))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.7 ([c0ca919](https://github.com/wppconnect-team/wa-js/commit/c0ca919))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.8 ([01cf92a](https://github.com/wppconnect-team/wa-js/commit/01cf92a))
* **deps-dev:** update dependency typescript to ^5.3.2 ([f9b780a](https://github.com/wppconnect-team/wa-js/commit/f9b780a))
* **deps-dev:** update dependency typescript to ^5.3.3 ([dfc7b3e](https://github.com/wppconnect-team/wa-js/commit/dfc7b3e))
* **deps-dev:** update playwright monorepo to ^1.40.0 (#1493) ([2a23d7e](https://github.com/wppconnect-team/wa-js/commit/2a23d7e)), closes [#1493](https://github.com/wppconnect-team/wa-js/issues/1493)
* **deps-dev:** update playwright monorepo to ^1.40.1 ([9e01ae3](https://github.com/wppconnect-team/wa-js/commit/9e01ae3))
* **deps-dev:** update typescript-eslint monorepo to ^6.12.0 ([d694a5f](https://github.com/wppconnect-team/wa-js/commit/d694a5f))
* **deps-dev:** update typescript-eslint monorepo to ^6.13.0 ([71a999b](https://github.com/wppconnect-team/wa-js/commit/71a999b))
* **deps-dev:** update typescript-eslint monorepo to ^6.13.1 ([f93d687](https://github.com/wppconnect-team/wa-js/commit/f93d687))
* **deps-dev:** update typescript-eslint monorepo to ^6.13.2 ([a762285](https://github.com/wppconnect-team/wa-js/commit/a762285))
* **deps-dev:** update typescript-eslint monorepo to ^6.14.0 ([fa39ebe](https://github.com/wppconnect-team/wa-js/commit/fa39ebe))
* **deps-dev:** update typescript-eslint monorepo to ^6.15.0 ([802f3a0](https://github.com/wppconnect-team/wa-js/commit/802f3a0))

### Continuous Integration

* **deps:** update actions/github-script action to v7 (#1484) ([1bb074a](https://github.com/wppconnect-team/wa-js/commit/1bb074a)), closes [#1484](https://github.com/wppconnect-team/wa-js/issues/1484)
* **deps:** update actions/setup-node action to v4.0.1 ([b72d7b1](https://github.com/wppconnect-team/wa-js/commit/b72d7b1))
* **deps:** update wagoid/commitlint-github-action action to v5.4.4 ([b7ae0d3](https://github.com/wppconnect-team/wa-js/commit/b7ae0d3))

### Chores

* **deps:** lock file maintenance ([fd3c056](https://github.com/wppconnect-team/wa-js/commit/fd3c056))
* **deps:** lock file maintenance ([eb5e9e6](https://github.com/wppconnect-team/wa-js/commit/eb5e9e6))
* **deps:** lock file maintenance ([4029cf3](https://github.com/wppconnect-team/wa-js/commit/4029cf3))
* **deps:** lock file maintenance ([5ee35d3](https://github.com/wppconnect-team/wa-js/commit/5ee35d3))
* **deps:** lock file maintenance ([2b07b61](https://github.com/wppconnect-team/wa-js/commit/2b07b61))
* **deps:** lock file maintenance ([290173a](https://github.com/wppconnect-team/wa-js/commit/290173a))
* **deps:** lock file maintenance ([d82edfe](https://github.com/wppconnect-team/wa-js/commit/d82edfe))
* **deps:** lock file maintenance (#1480) ([4453aee](https://github.com/wppconnect-team/wa-js/commit/4453aee)), closes [#1480](https://github.com/wppconnect-team/wa-js/issues/1480)
* fixed lint ([82050ea](https://github.com/wppconnect-team/wa-js/commit/82050ea))
* Fixed typo ([020af68](https://github.com/wppconnect-team/wa-js/commit/020af68))

## 2.28.0 (2023-10-29)

### Features

* Added WPP.conn.genLinkDeviceCodeForPhoneNumber function (close #1400) ([7e5d363](https://github.com/wppconnect-team/wa-js/commit/7e5d363)), closes [#1400](https://github.com/wppconnect-team/wa-js/issues/1400)
* Added WPP.contact.getCommonGroups function (close #1273) ([a7766fb](https://github.com/wppconnect-team/wa-js/commit/a7766fb)), closes [#1273](https://github.com/wppconnect-team/wa-js/issues/1273)

### Bug Fixes

* Added trick to send list message (WPP.chat.sendListMessage) ([752329b](https://github.com/wppconnect-team/wa-js/commit/752329b))
* Avoid emit events for 'chat.new_reaction' while is syncing ([61bdffc](https://github.com/wppconnect-team/wa-js/commit/61bdffc))
* Avoid emit events for 'chat.poll_response' while is syncing ([f5b4cb9](https://github.com/wppconnect-team/wa-js/commit/f5b4cb9))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.8.0 ([5bf2a7a](https://github.com/wppconnect-team/wa-js/commit/5bf2a7a))
* **deps-dev:** update commitlint monorepo to ^17.8.1 ([74543c0](https://github.com/wppconnect-team/wa-js/commit/74543c0))
* **deps-dev:** update commitlint monorepo to ^18.1.0 ([2c42c3f](https://github.com/wppconnect-team/wa-js/commit/2c42c3f))
* **deps-dev:** update commitlint monorepo to ^18.2.0 ([e0f5611](https://github.com/wppconnect-team/wa-js/commit/e0f5611))
* **deps-dev:** update commitlint monorepo to v18 (#1431) ([b158d03](https://github.com/wppconnect-team/wa-js/commit/b158d03)), closes [#1431](https://github.com/wppconnect-team/wa-js/issues/1431)
* **deps-dev:** update dependency @types/debug to ^4.1.10 ([f2324bf](https://github.com/wppconnect-team/wa-js/commit/f2324bf))
* **deps-dev:** update dependency @types/node to ^16.18.59 ([d721584](https://github.com/wppconnect-team/wa-js/commit/d721584))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.7 ([e917d21](https://github.com/wppconnect-team/wa-js/commit/e917d21))
* **deps-dev:** update dependency @types/parse-data-url to ^3.0.1 ([5d96044](https://github.com/wppconnect-team/wa-js/commit/5d96044))
* **deps-dev:** update dependency @types/shelljs to ^0.8.14 ([682db01](https://github.com/wppconnect-team/wa-js/commit/682db01))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.117 ([15d7ff4](https://github.com/wppconnect-team/wa-js/commit/15d7ff4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.118 ([c02b9a1](https://github.com/wppconnect-team/wa-js/commit/c02b9a1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.119 ([1cbbff3](https://github.com/wppconnect-team/wa-js/commit/1cbbff3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.121 ([a55c9b0](https://github.com/wppconnect-team/wa-js/commit/a55c9b0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.122 ([5bca1ef](https://github.com/wppconnect-team/wa-js/commit/5bca1ef))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.123 ([05ae4ae](https://github.com/wppconnect-team/wa-js/commit/05ae4ae))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.125 ([1146536](https://github.com/wppconnect-team/wa-js/commit/1146536))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.126 ([e377cde](https://github.com/wppconnect-team/wa-js/commit/e377cde))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.127 ([1a75cc1](https://github.com/wppconnect-team/wa-js/commit/1a75cc1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.128 ([1941143](https://github.com/wppconnect-team/wa-js/commit/1941143))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.129 ([28e83a1](https://github.com/wppconnect-team/wa-js/commit/28e83a1))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.130 ([a6721b5](https://github.com/wppconnect-team/wa-js/commit/a6721b5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.131 ([44b6200](https://github.com/wppconnect-team/wa-js/commit/44b6200))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.132 ([59ebd0b](https://github.com/wppconnect-team/wa-js/commit/59ebd0b))
* **deps-dev:** update dependency eslint to ^8.52.0 ([f5c9a12](https://github.com/wppconnect-team/wa-js/commit/f5c9a12))
* **deps-dev:** update dependency eslint-plugin-import to ^2.29.0 ([f3dfc50](https://github.com/wppconnect-team/wa-js/commit/f3dfc50))
* **deps-dev:** update dependency eslint-plugin-prettier to ^5.0.1 ([78162e8](https://github.com/wppconnect-team/wa-js/commit/78162e8))
* **deps-dev:** update dependency lint-staged to v15 ([6faf927](https://github.com/wppconnect-team/wa-js/commit/6faf927))
* **deps-dev:** update dependency webpack to ^5.89.0 ([701a618](https://github.com/wppconnect-team/wa-js/commit/701a618))
* **deps-dev:** update playwright monorepo to ^1.39.0 ([d1c7aa0](https://github.com/wppconnect-team/wa-js/commit/d1c7aa0))

### Continuous Integration

* **deps:** update actions/checkout digest to b4ffde6 ([cefc030](https://github.com/wppconnect-team/wa-js/commit/cefc030))
* **deps:** update actions/setup-node action to v3.8.2 ([62fef69](https://github.com/wppconnect-team/wa-js/commit/62fef69))
* **deps:** update actions/setup-node action to v4 (#1439) ([faff588](https://github.com/wppconnect-team/wa-js/commit/faff588)), closes [#1439](https://github.com/wppconnect-team/wa-js/issues/1439)

### Chores

* **deps:** lock file maintenance ([06ba7a4](https://github.com/wppconnect-team/wa-js/commit/06ba7a4))
* **deps:** lock file maintenance ([be8247a](https://github.com/wppconnect-team/wa-js/commit/be8247a))
* Fixed browser launch sequence ([1bd6ead](https://github.com/wppconnect-team/wa-js/commit/1bd6ead))
* Try to send list message as product list ([9de7219](https://github.com/wppconnect-team/wa-js/commit/9de7219))

## 2.27.0 (2023-10-08)

### Features

* Added delay option for text messages (#1354) ([d0dc4a0](https://github.com/wppconnect-team/wa-js/commit/d0dc4a0)), closes [#1354](https://github.com/wppconnect-team/wa-js/issues/1354)
* Added newsletter functions (close #1365) (#1386) ([b0bab71](https://github.com/wppconnect-team/wa-js/commit/b0bab71)), closes [#1365](https://github.com/wppconnect-team/wa-js/issues/1365) [#1386](https://github.com/wppconnect-team/wa-js/issues/1386)
* Added WPP.chat.sendScheduledCallMessage (close #1381) (#1389) ([d706459](https://github.com/wppconnect-team/wa-js/commit/d706459)), closes [#1381](https://github.com/wppconnect-team/wa-js/issues/1381) [#1389](https://github.com/wppconnect-team/wa-js/issues/1389)

### Bug Fixes

* Alternative fix for is not loading #1322 ([a60bbd3](https://github.com/wppconnect-team/wa-js/commit/a60bbd3)), closes [#1322](https://github.com/wppconnect-team/wa-js/issues/1322)
* Alternative fix for is not loading #1322 ([d4d0d95](https://github.com/wppconnect-team/wa-js/commit/d4d0d95)), closes [#1322](https://github.com/wppconnect-team/wa-js/issues/1322)
* Fixed send status (text/image/video) (fix #1270,fix #1284, fix #1327) ([e7e028e](https://github.com/wppconnect-team/wa-js/commit/e7e028e)), closes [#1270](https://github.com/wppconnect-team/wa-js/issues/1270) [#1284](https://github.com/wppconnect-team/wa-js/issues/1284) [#1327](https://github.com/wppconnect-team/wa-js/issues/1327)

### Build System

* **deps-dev:** update commitlint monorepo to ^17.7.2 ([1926b00](https://github.com/wppconnect-team/wa-js/commit/1926b00))
* **deps-dev:** update dependency @types/debug to ^4.1.9 ([7d61718](https://github.com/wppconnect-team/wa-js/commit/7d61718))
* **deps-dev:** update dependency @types/node to ^16.18.51 ([965c6c0](https://github.com/wppconnect-team/wa-js/commit/965c6c0))
* **deps-dev:** update dependency @types/node to ^16.18.52 ([55587c6](https://github.com/wppconnect-team/wa-js/commit/55587c6))
* **deps-dev:** update dependency @types/node to ^16.18.53 ([d8e1ba6](https://github.com/wppconnect-team/wa-js/commit/d8e1ba6))
* **deps-dev:** update dependency @types/node to ^16.18.54 ([d7adaf3](https://github.com/wppconnect-team/wa-js/commit/d7adaf3))
* **deps-dev:** update dependency @types/node to ^16.18.55 ([153bd02](https://github.com/wppconnect-team/wa-js/commit/153bd02))
* **deps-dev:** update dependency @types/node to ^16.18.57 ([b4de88e](https://github.com/wppconnect-team/wa-js/commit/b4de88e))
* **deps-dev:** update dependency @types/node to ^16.18.58 ([25bb86b](https://github.com/wppconnect-team/wa-js/commit/25bb86b))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.5 ([c59d362](https://github.com/wppconnect-team/wa-js/commit/c59d362))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.6 ([ac93d04](https://github.com/wppconnect-team/wa-js/commit/ac93d04))
* **deps-dev:** update dependency @types/shelljs to ^0.8.13 ([f7c0cb4](https://github.com/wppconnect-team/wa-js/commit/f7c0cb4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.101 ([050fc52](https://github.com/wppconnect-team/wa-js/commit/050fc52))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.102 ([31925b3](https://github.com/wppconnect-team/wa-js/commit/31925b3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.103 ([9aa0429](https://github.com/wppconnect-team/wa-js/commit/9aa0429))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.106 ([1b2a8a3](https://github.com/wppconnect-team/wa-js/commit/1b2a8a3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.107 ([1bbf23a](https://github.com/wppconnect-team/wa-js/commit/1bbf23a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.108 ([68f9b78](https://github.com/wppconnect-team/wa-js/commit/68f9b78))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.109 ([fa96220](https://github.com/wppconnect-team/wa-js/commit/fa96220))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.110 ([fe84dea](https://github.com/wppconnect-team/wa-js/commit/fe84dea))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.111 ([7af5265](https://github.com/wppconnect-team/wa-js/commit/7af5265))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.113 ([43059ac](https://github.com/wppconnect-team/wa-js/commit/43059ac))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.115 ([16f7cc7](https://github.com/wppconnect-team/wa-js/commit/16f7cc7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.91 ([8fe357b](https://github.com/wppconnect-team/wa-js/commit/8fe357b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.92 ([a947880](https://github.com/wppconnect-team/wa-js/commit/a947880))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.93 ([0ca2d9b](https://github.com/wppconnect-team/wa-js/commit/0ca2d9b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.94 ([2ba9456](https://github.com/wppconnect-team/wa-js/commit/2ba9456))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.95 ([72e2976](https://github.com/wppconnect-team/wa-js/commit/72e2976))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.96 ([82b4711](https://github.com/wppconnect-team/wa-js/commit/82b4711))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.97 ([f6ac727](https://github.com/wppconnect-team/wa-js/commit/f6ac727))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.98 ([f1f7e0d](https://github.com/wppconnect-team/wa-js/commit/f1f7e0d))
* **deps-dev:** update dependency eslint to ^8.50.0 ([caf9173](https://github.com/wppconnect-team/wa-js/commit/caf9173))
* **deps-dev:** update dependency eslint to ^8.51.0 ([db27c1d](https://github.com/wppconnect-team/wa-js/commit/db27c1d))
* **deps-dev:** update dependency release-it to ^16.2.0 ([17d0be2](https://github.com/wppconnect-team/wa-js/commit/17d0be2))
* **deps-dev:** update dependency release-it to ^16.2.1 ([51f2578](https://github.com/wppconnect-team/wa-js/commit/51f2578))
* **deps-dev:** update dependency ts-loader to ^9.5.0 ([558a304](https://github.com/wppconnect-team/wa-js/commit/558a304))
* **deps-dev:** update dependency ts-morph to v20 ([acfd6bb](https://github.com/wppconnect-team/wa-js/commit/acfd6bb))
* **deps-dev:** update dependency typedoc to ^0.25.2 ([54b7770](https://github.com/wppconnect-team/wa-js/commit/54b7770))
* **deps-dev:** update playwright monorepo to ^1.38.0 ([b946ef2](https://github.com/wppconnect-team/wa-js/commit/b946ef2))
* **deps-dev:** update playwright monorepo to ^1.38.1 ([e707cf0](https://github.com/wppconnect-team/wa-js/commit/e707cf0))

### Continuous Integration

* **deps:** update actions/checkout digest to 8ade135 ([29ebf14](https://github.com/wppconnect-team/wa-js/commit/29ebf14))

### Chores

* **deps:** lock file maintenance ([84101c1](https://github.com/wppconnect-team/wa-js/commit/84101c1))
* **deps:** lock file maintenance ([1595542](https://github.com/wppconnect-team/wa-js/commit/1595542))
* Fixed events after injection ([bbd2043](https://github.com/wppconnect-team/wa-js/commit/bbd2043))

## <small>2.26.1 (2023-09-13)</small>

### Bug Fixes

* Fixed exported getDisplayNameOrPnForLid function for WhatsApp >= 2.2337.7 ([f6b463d](https://github.com/wppconnect-team/wa-js/commit/f6b463d))
* Fixed return value for the isNewMsg attribute (close #1333) ([37b8354](https://github.com/wppconnect-team/wa-js/commit/37b8354)), closes [#1333](https://github.com/wppconnect-team/wa-js/issues/1333)
* Fixed script injection (close #1322) ([c412158](https://github.com/wppconnect-team/wa-js/commit/c412158)), closes [#1322](https://github.com/wppconnect-team/wa-js/issues/1322)

### Documentation

* Fixed CHANGELOG generator ([7645b46](https://github.com/wppconnect-team/wa-js/commit/7645b46))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.47 ([094baaf](https://github.com/wppconnect-team/wa-js/commit/094baaf))
* **deps-dev:** update dependency @types/node to ^16.18.48 ([a98df00](https://github.com/wppconnect-team/wa-js/commit/a98df00))
* **deps-dev:** update dependency @types/node to ^16.18.50 ([2637393](https://github.com/wppconnect-team/wa-js/commit/2637393))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.89 (#1344) ([6c0af2d](https://github.com/wppconnect-team/wa-js/commit/6c0af2d)), closes [#1344](https://github.com/wppconnect-team/wa-js/issues/1344)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.90 ([1983ae8](https://github.com/wppconnect-team/wa-js/commit/1983ae8))
* **deps-dev:** update dependency conventional-changelog-cli to v4 ([0a2317f](https://github.com/wppconnect-team/wa-js/commit/0a2317f))
* **deps-dev:** update dependency eslint to ^8.49.0 ([e6fcf64](https://github.com/wppconnect-team/wa-js/commit/e6fcf64))
* **deps-dev:** update dependency typedoc to ^0.25.1 ([a5e1e09](https://github.com/wppconnect-team/wa-js/commit/a5e1e09))

### Continuous Integration

* **deps:** update actions/checkout action to v4 ([4123003](https://github.com/wppconnect-team/wa-js/commit/4123003))

### Chores

* **deps:** lock file maintenance ([9c8a91c](https://github.com/wppconnect-team/wa-js/commit/9c8a91c))
* **deps:** lock file maintenance ([8ddc0f3](https://github.com/wppconnect-team/wa-js/commit/8ddc0f3))

## 2.26.0 (2023-09-01)

### Features

* Added order.payment_status event ([8165a2a](https://github.com/wppconnect-team/wa-js/commit/8165a2a))
* Added support for send PTV message ([f973d9d](https://github.com/wppconnect-team/wa-js/commit/f973d9d))
* Added util.generateOrderUniqueId function ([53aa925](https://github.com/wppconnect-team/wa-js/commit/53aa925))
* Added WPP.chat.sendOrderMessage function (close #1328) ([75047b1](https://github.com/wppconnect-team/wa-js/commit/75047b1)), closes [#1328](https://github.com/wppconnect-team/wa-js/issues/1328)
* Added WPP.order.get function ([7a0dce9](https://github.com/wppconnect-team/wa-js/commit/7a0dce9))
* Exported function currencyForCountryShortcode ([d3caf97](https://github.com/wppconnect-team/wa-js/commit/d3caf97))
* Exported function getCountryShortcodeByPhone ([17671d7](https://github.com/wppconnect-team/wa-js/commit/17671d7))
* Exported function getOrderInfo ([20e88c4](https://github.com/wppconnect-team/wa-js/commit/20e88c4))
* Exported processRawAudioVideo function ([e1b1db6](https://github.com/wppconnect-team/wa-js/commit/e1b1db6))
* Exported processRawMedia function ([45a353e](https://github.com/wppconnect-team/wa-js/commit/45a353e))

### Bug Fixes

* Fixed edit message function (close #1321) (#1335) ([209c994](https://github.com/wppconnect-team/wa-js/commit/209c994)), closes [#1321](https://github.com/wppconnect-team/wa-js/issues/1321) [#1335](https://github.com/wppconnect-team/wa-js/issues/1335)
* Fixed group.participant_changed event for join action ([d23c557](https://github.com/wppconnect-team/wa-js/commit/d23c557))
* Typos fix ([3114b31](https://github.com/wppconnect-team/wa-js/commit/3114b31))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.83 ([237db44](https://github.com/wppconnect-team/wa-js/commit/237db44))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.84 ([fa8e775](https://github.com/wppconnect-team/wa-js/commit/fa8e775))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.86 ([da62618](https://github.com/wppconnect-team/wa-js/commit/da62618))
* **deps-dev:** update dependency prettier to ^3.0.3 ([edd1bd9](https://github.com/wppconnect-team/wa-js/commit/edd1bd9))

### Chores

* Added compatibility for WhatsApp < 2.2329.x ([6908a23](https://github.com/wppconnect-team/wa-js/commit/6908a23))
* **deps:** lock file maintenance ([4c75f23](https://github.com/wppconnect-team/wa-js/commit/4c75f23))

## 2.25.0 (2023-08-28)

### Features

* Added cache for link preview result (close #1316) ([e19d4a6](https://github.com/wppconnect-team/wa-js/commit/e19d4a6)), closes [#1316](https://github.com/wppconnect-team/wa-js/issues/1316)

### Bug Fixes

* Fixed error on get poll votes (close #1293) (#1319) ([ac172a2](https://github.com/wppconnect-team/wa-js/commit/ac172a2)), closes [#1293](https://github.com/wppconnect-team/wa-js/issues/1293) [#1319](https://github.com/wppconnect-team/wa-js/issues/1319)
* Fixed WhatsApp WEB loading error (fix #1249) ([331de74](https://github.com/wppconnect-team/wa-js/commit/331de74)), closes [#1249](https://github.com/wppconnect-team/wa-js/issues/1249)
* Fixed WPP.chat.forwardMessage (#1301) (fix #1300) ([67089d7](https://github.com/wppconnect-team/wa-js/commit/67089d7)), closes [#1301](https://github.com/wppconnect-team/wa-js/issues/1301) [#1300](https://github.com/wppconnect-team/wa-js/issues/1300)

### Build System

* **deps-dev:** update commitlint monorepo ([595b653](https://github.com/wppconnect-team/wa-js/commit/595b653))
* **deps-dev:** update dependency @types/node to ^16.18.40 ([07d367d](https://github.com/wppconnect-team/wa-js/commit/07d367d))
* **deps-dev:** update dependency @types/node to ^16.18.41 ([51fe7fa](https://github.com/wppconnect-team/wa-js/commit/51fe7fa))
* **deps-dev:** update dependency @types/node to ^16.18.43 ([1a6e516](https://github.com/wppconnect-team/wa-js/commit/1a6e516))
* **deps-dev:** update dependency @types/node to ^16.18.44 ([6ab7b47](https://github.com/wppconnect-team/wa-js/commit/6ab7b47))
* **deps-dev:** update dependency @types/node to ^16.18.46 ([9345e45](https://github.com/wppconnect-team/wa-js/commit/9345e45))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.72 ([e803205](https://github.com/wppconnect-team/wa-js/commit/e803205))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.74 ([3bb0c46](https://github.com/wppconnect-team/wa-js/commit/3bb0c46))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.75 ([544efeb](https://github.com/wppconnect-team/wa-js/commit/544efeb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.76 ([7184cd6](https://github.com/wppconnect-team/wa-js/commit/7184cd6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.77 ([660b3ab](https://github.com/wppconnect-team/wa-js/commit/660b3ab))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.78 ([c931999](https://github.com/wppconnect-team/wa-js/commit/c931999))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.79 ([9c18281](https://github.com/wppconnect-team/wa-js/commit/9c18281))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.80 ([5225db3](https://github.com/wppconnect-team/wa-js/commit/5225db3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.81 ([544f1e7](https://github.com/wppconnect-team/wa-js/commit/544f1e7))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.82 (#1318) ([fa674e7](https://github.com/wppconnect-team/wa-js/commit/fa674e7)), closes [#1318](https://github.com/wppconnect-team/wa-js/issues/1318)
* **deps-dev:** update dependency eslint to ^8.47.0 ([155c65f](https://github.com/wppconnect-team/wa-js/commit/155c65f))
* **deps-dev:** update dependency eslint to ^8.48.0 ([1b5677c](https://github.com/wppconnect-team/wa-js/commit/1b5677c))
* **deps-dev:** update dependency eslint-config-prettier to v9 ([0b1da5c](https://github.com/wppconnect-team/wa-js/commit/0b1da5c))
* **deps-dev:** update dependency eslint-plugin-import to ^2.28.1 ([c441b69](https://github.com/wppconnect-team/wa-js/commit/c441b69))
* **deps-dev:** update dependency lint-staged to ^13.3.0 ([5dc1664](https://github.com/wppconnect-team/wa-js/commit/5dc1664))
* **deps-dev:** update dependency lint-staged to ^14.0.1 ([2aa205c](https://github.com/wppconnect-team/wa-js/commit/2aa205c))
* **deps-dev:** update dependency lint-staged to v14 ([f6dd40e](https://github.com/wppconnect-team/wa-js/commit/f6dd40e))
* **deps-dev:** update dependency node-fetch to ^2.6.13 ([3bbc04a](https://github.com/wppconnect-team/wa-js/commit/3bbc04a))
* **deps-dev:** update dependency node-fetch to ^2.7.0 ([54b5262](https://github.com/wppconnect-team/wa-js/commit/54b5262))
* **deps-dev:** update dependency parse-data-url to v6 ([ee55932](https://github.com/wppconnect-team/wa-js/commit/ee55932))
* **deps-dev:** update dependency prettier to ^3.0.2 ([670d4a7](https://github.com/wppconnect-team/wa-js/commit/670d4a7))
* **deps-dev:** update dependency release-it to ^16.1.5 ([06bbbc6](https://github.com/wppconnect-team/wa-js/commit/06bbbc6))
* **deps-dev:** update dependency typedoc to ^0.25.0 ([dfe625b](https://github.com/wppconnect-team/wa-js/commit/dfe625b))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^3.1.0 ([9f143f8](https://github.com/wppconnect-team/wa-js/commit/9f143f8))
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^2.1.0 ([f17444c](https://github.com/wppconnect-team/wa-js/commit/f17444c))
* **deps-dev:** update dependency typescript to ^5.2.2 ([b807a66](https://github.com/wppconnect-team/wa-js/commit/b807a66))
* **deps-dev:** update playwright monorepo to ^1.37.0 ([f5e5fe5](https://github.com/wppconnect-team/wa-js/commit/f5e5fe5))
* **deps-dev:** update playwright monorepo to ^1.37.1 ([c21bb80](https://github.com/wppconnect-team/wa-js/commit/c21bb80))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.8.0 ([3c7a1c2](https://github.com/wppconnect-team/wa-js/commit/3c7a1c2))
* **deps:** update actions/setup-node action to v3.8.1 ([6ecffa9](https://github.com/wppconnect-team/wa-js/commit/6ecffa9))

### Chores

* **deps:** lock file maintenance ([543e631](https://github.com/wppconnect-team/wa-js/commit/543e631))
* **deps:** lock file maintenance ([7295820](https://github.com/wppconnect-team/wa-js/commit/7295820))
* Fixed tests ([57cdb4f](https://github.com/wppconnect-team/wa-js/commit/57cdb4f))

## <small>2.24.8 (2023-08-16)</small>

### Bug Fixes

* Fixed call compatibility with WhatsApp >= 2.2333.11 (fix #1269) ([57b1a1e](https://github.com/wppconnect-team/wa-js/commit/57b1a1e)), closes [#1269](https://github.com/wppconnect-team/wa-js/issues/1269)
* Fixed WhatsApp WEB loading error (fix #1249) ([433f939](https://github.com/wppconnect-team/wa-js/commit/433f939)), closes [#1249](https://github.com/wppconnect-team/wa-js/issues/1249)
* Fixed WPP.blocklist.isBlocked (fix #1231) ([353a3c2](https://github.com/wppconnect-team/wa-js/commit/353a3c2)), closes [#1231](https://github.com/wppconnect-team/wa-js/issues/1231)
* Fixed WPP.chat.list for communities ([74ea985](https://github.com/wppconnect-team/wa-js/commit/74ea985))
* server link-preview ([2763a4f](https://github.com/wppconnect-team/wa-js/commit/2763a4f))
* webpack loading improvement attempt ([ac4a818](https://github.com/wppconnect-team/wa-js/commit/ac4a818))

### Build System

* **deps-dev:** removed pretty-quick ([6f435b6](https://github.com/wppconnect-team/wa-js/commit/6f435b6))
* **deps-dev:** update commitlint monorepo to ^17.6.7 ([64e6bfa](https://github.com/wppconnect-team/wa-js/commit/64e6bfa))
* **deps-dev:** update dependency @types/node to ^16.18.39 ([b4ecf6a](https://github.com/wppconnect-team/wa-js/commit/b4ecf6a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.62 (#1234) ([c2e3cba](https://github.com/wppconnect-team/wa-js/commit/c2e3cba)), closes [#1234](https://github.com/wppconnect-team/wa-js/issues/1234)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.63 ([df98a2d](https://github.com/wppconnect-team/wa-js/commit/df98a2d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.64 ([89eb3c8](https://github.com/wppconnect-team/wa-js/commit/89eb3c8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.65 ([b9b8598](https://github.com/wppconnect-team/wa-js/commit/b9b8598))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.66 ([7f548b6](https://github.com/wppconnect-team/wa-js/commit/7f548b6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.67 ([0a141cc](https://github.com/wppconnect-team/wa-js/commit/0a141cc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.68 ([3310fda](https://github.com/wppconnect-team/wa-js/commit/3310fda))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.69 ([cd2927d](https://github.com/wppconnect-team/wa-js/commit/cd2927d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.71 ([ab7de77](https://github.com/wppconnect-team/wa-js/commit/ab7de77))
* **deps-dev:** update dependency compare-versions to ^6.1.0 ([28fae25](https://github.com/wppconnect-team/wa-js/commit/28fae25))
* **deps-dev:** update dependency eslint to ^8.45.0 ([d15198a](https://github.com/wppconnect-team/wa-js/commit/d15198a))
* **deps-dev:** update dependency eslint to ^8.46.0 ([812197a](https://github.com/wppconnect-team/wa-js/commit/812197a))
* **deps-dev:** update dependency eslint-config-prettier to ^8.10.0 ([fcf6e5d](https://github.com/wppconnect-team/wa-js/commit/fcf6e5d))
* **deps-dev:** update dependency eslint-config-prettier to ^8.9.0 ([5481e01](https://github.com/wppconnect-team/wa-js/commit/5481e01))
* **deps-dev:** update dependency eslint-plugin-import to ^2.28.0 ([4f1c169](https://github.com/wppconnect-team/wa-js/commit/4f1c169))
* **deps-dev:** update dependency prettier to ^3.0.1 ([b2c2022](https://github.com/wppconnect-team/wa-js/commit/b2c2022))
* **deps-dev:** update dependency prettier to v3 ([f00441c](https://github.com/wppconnect-team/wa-js/commit/f00441c))
* **deps-dev:** update dependency release-it to v16 (#1220) ([1a22605](https://github.com/wppconnect-team/wa-js/commit/1a22605)), closes [#1220](https://github.com/wppconnect-team/wa-js/issues/1220)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^2.0.1 ([1168c31](https://github.com/wppconnect-team/wa-js/commit/1168c31))
* **deps-dev:** update dependency webpack to ^5.88.2 ([e9e0b57](https://github.com/wppconnect-team/wa-js/commit/e9e0b57))
* **deps-dev:** update playwright monorepo to ^1.36.1 ([e659f30](https://github.com/wppconnect-team/wa-js/commit/e659f30))
* **deps-dev:** update playwright monorepo to ^1.36.2 ([6b769e5](https://github.com/wppconnect-team/wa-js/commit/6b769e5))
* **deps-dev:** update typescript-eslint monorepo to ^5.62.0 ([a88c99a](https://github.com/wppconnect-team/wa-js/commit/a88c99a))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.4.2 ([11af5b0](https://github.com/wppconnect-team/wa-js/commit/11af5b0))
* **deps:** update wagoid/commitlint-github-action action to v5.4.3 ([046b500](https://github.com/wppconnect-team/wa-js/commit/046b500))

### Chores

* **deps:** lock file maintenance ([c0cc0e9](https://github.com/wppconnect-team/wa-js/commit/c0cc0e9))
* **deps:** lock file maintenance ([1e8d33e](https://github.com/wppconnect-team/wa-js/commit/1e8d33e))
* **deps:** lock file maintenance ([eafa27c](https://github.com/wppconnect-team/wa-js/commit/eafa27c))
* Fixed npm run wa-source command ([b7c4c98](https://github.com/wppconnect-team/wa-js/commit/b7c4c98))

## <small>2.24.7 (2023-07-11)</small>

### Features

* Added option onlyCommunities for WPP.chat.list function ([590c9ce](https://github.com/wppconnect-team/wa-js/commit/590c9ce))
* Added option to create a subgroup for community ([445bc79](https://github.com/wppconnect-team/wa-js/commit/445bc79))

### Bug Fixes

* Fixed compatibility for WhatsApp >= 2.2329.7 ([bf34304](https://github.com/wppconnect-team/wa-js/commit/bf34304))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.58 ([96ed49b](https://github.com/wppconnect-team/wa-js/commit/96ed49b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.60 (#1228) ([4bb6ce7](https://github.com/wppconnect-team/wa-js/commit/4bb6ce7)), closes [#1228](https://github.com/wppconnect-team/wa-js/issues/1228)
* **deps-dev:** update dependency compare-versions to ^6.0.0 ([2babee5](https://github.com/wppconnect-team/wa-js/commit/2babee5))
* **deps-dev:** update dependency compare-versions to ^6.0.0-rc.3 ([e19164e](https://github.com/wppconnect-team/wa-js/commit/e19164e))

### Chores

* **deps:** lock file maintenance ([0431c55](https://github.com/wppconnect-team/wa-js/commit/0431c55))

## <small>2.24.6 (2023-07-07)</small>

### Bug Fixes

* Fixed chat.new_message event for status reply (fix #1211) ([a898151](https://github.com/wppconnect-team/wa-js/commit/a898151)), closes [#1211](https://github.com/wppconnect-team/wa-js/issues/1211)
* Fixed WPP.blocklist.blockContact function for WhatsApp >= 2.2323.4 (fix #1210) ([5e8c31e](https://github.com/wppconnect-team/wa-js/commit/5e8c31e)), closes [#1210](https://github.com/wppconnect-team/wa-js/issues/1210)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.57 ([2239e33](https://github.com/wppconnect-team/wa-js/commit/2239e33))
* **deps-dev:** update dependency conventional-changelog-cli to v3 ([75148c1](https://github.com/wppconnect-team/wa-js/commit/75148c1))
* **deps-dev:** update dependency ts-morph to v19 ([88713bc](https://github.com/wppconnect-team/wa-js/commit/88713bc))
* **deps-dev:** update typescript-eslint monorepo to ^5.61.0 ([620d6da](https://github.com/wppconnect-team/wa-js/commit/620d6da))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.7.0 ([82a0c30](https://github.com/wppconnect-team/wa-js/commit/82a0c30))

### Chores

* **deps:** lock file maintenance ([a297f36](https://github.com/wppconnect-team/wa-js/commit/a297f36))
* Fixed module search id ([8194417](https://github.com/wppconnect-team/wa-js/commit/8194417))
* Fixed typo ([6ba7540](https://github.com/wppconnect-team/wa-js/commit/6ba7540))

## <small>2.24.5 (2023-07-02)</small>

### Bug Fixes

* Fixed compatibility of ContactModel for WhatsApp >= 2.2327.4 (fix #1208) ([b960710](https://github.com/wppconnect-team/wa-js/commit/b960710)), closes [#1208](https://github.com/wppconnect-team/wa-js/issues/1208)

### Build System

* **deps-dev:** update commitlint monorepo to ^17.6.6 ([cc68f4c](https://github.com/wppconnect-team/wa-js/commit/cc68f4c))
* **deps-dev:** update dependency @types/node to ^16.18.37 ([0437c4a](https://github.com/wppconnect-team/wa-js/commit/0437c4a))
* **deps-dev:** update dependency @types/node to ^16.18.38 ([e025579](https://github.com/wppconnect-team/wa-js/commit/e025579))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.50 ([337d92f](https://github.com/wppconnect-team/wa-js/commit/337d92f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.51 ([caa6225](https://github.com/wppconnect-team/wa-js/commit/caa6225))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.53 ([5ee52b2](https://github.com/wppconnect-team/wa-js/commit/5ee52b2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.54 (#1201) ([d36bbfb](https://github.com/wppconnect-team/wa-js/commit/d36bbfb)), closes [#1201](https://github.com/wppconnect-team/wa-js/issues/1201)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.55 ([f92445d](https://github.com/wppconnect-team/wa-js/commit/f92445d))
* **deps-dev:** update dependency compare-versions to ^6.0.0-rc.2 ([4f77d65](https://github.com/wppconnect-team/wa-js/commit/4f77d65))
* **deps-dev:** update dependency eslint to ^8.44.0 ([659e72e](https://github.com/wppconnect-team/wa-js/commit/659e72e))
* **deps-dev:** update dependency node-fetch to ^2.6.12 (#1209) ([854cf08](https://github.com/wppconnect-team/wa-js/commit/854cf08)), closes [#1209](https://github.com/wppconnect-team/wa-js/issues/1209)
* **deps-dev:** update dependency ts-loader to ^9.4.4 ([339983c](https://github.com/wppconnect-team/wa-js/commit/339983c))
* **deps-dev:** update dependency typescript to ^5.1.5 ([197b790](https://github.com/wppconnect-team/wa-js/commit/197b790))
* **deps-dev:** update dependency typescript to ^5.1.6 ([a4c8cef](https://github.com/wppconnect-team/wa-js/commit/a4c8cef))
* **deps-dev:** update dependency webpack to ^5.88.0 ([1e6680b](https://github.com/wppconnect-team/wa-js/commit/1e6680b))
* **deps-dev:** update dependency webpack to ^5.88.1 ([b28d6fc](https://github.com/wppconnect-team/wa-js/commit/b28d6fc))
* **deps-dev:** update typescript-eslint monorepo to ^5.60.0 ([c39b447](https://github.com/wppconnect-team/wa-js/commit/c39b447))
* **deps-dev:** update typescript-eslint monorepo to ^5.60.1 ([2c719b7](https://github.com/wppconnect-team/wa-js/commit/2c719b7))

### Chores

* **deps:** lock file maintenance ([006890f](https://github.com/wppconnect-team/wa-js/commit/006890f))
* **deps:** lock file maintenance ([c2d56a2](https://github.com/wppconnect-team/wa-js/commit/c2d56a2))

## <small>2.24.4 (2023-06-17)</small>

### Bug Fixes

* Fixed set ephemeral value for group (#1185) ([84c627d](https://github.com/wppconnect-team/wa-js/commit/84c627d)), closes [#1185](https://github.com/wppconnect-team/wa-js/issues/1185)
* Fixed WPP.chat.sendLocationMessage function (fix #1187) ([4b07663](https://github.com/wppconnect-team/wa-js/commit/4b07663)), closes [#1187](https://github.com/wppconnect-team/wa-js/issues/1187)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.36 ([fde9ff4](https://github.com/wppconnect-team/wa-js/commit/fde9ff4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.48 ([e8e931f](https://github.com/wppconnect-team/wa-js/commit/e8e931f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.49 ([0b38a55](https://github.com/wppconnect-team/wa-js/commit/0b38a55))
* **deps-dev:** update dependency eslint to ^8.43.0 ([0115766](https://github.com/wppconnect-team/wa-js/commit/0115766))
* **deps-dev:** update dependency webpack to ^5.87.0 ([a435dd7](https://github.com/wppconnect-team/wa-js/commit/a435dd7))
* **deps-dev:** update playwright monorepo to ^1.35.1 ([9e8c829](https://github.com/wppconnect-team/wa-js/commit/9e8c829))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.11 ([360d7f4](https://github.com/wppconnect-team/wa-js/commit/360d7f4))

## <small>2.24.3 (2023-06-13)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp >= 2.2325.3 ([5339618](https://github.com/wppconnect-team/wa-js/commit/5339618))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.6.5 ([31e5d43](https://github.com/wppconnect-team/wa-js/commit/31e5d43))
* **deps-dev:** update dependency @types/node to ^16.18.33 ([8e2b0a0](https://github.com/wppconnect-team/wa-js/commit/8e2b0a0))
* **deps-dev:** update dependency @types/node to ^16.18.34 ([f41b499](https://github.com/wppconnect-team/wa-js/commit/f41b499))
* **deps-dev:** update dependency @types/prettier to ^2.7.3 ([c919fef](https://github.com/wppconnect-team/wa-js/commit/c919fef))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.42 ([d11b407](https://github.com/wppconnect-team/wa-js/commit/d11b407))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.43 ([0a43cb5](https://github.com/wppconnect-team/wa-js/commit/0a43cb5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.44 ([7360936](https://github.com/wppconnect-team/wa-js/commit/7360936))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.45 ([3b3612a](https://github.com/wppconnect-team/wa-js/commit/3b3612a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.46 ([d3f1cdb](https://github.com/wppconnect-team/wa-js/commit/d3f1cdb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.47 ([43f2088](https://github.com/wppconnect-team/wa-js/commit/43f2088))
* **deps-dev:** update dependency eslint to ^8.42.0 ([519ebb8](https://github.com/wppconnect-team/wa-js/commit/519ebb8))
* **deps-dev:** update dependency release-it to ^15.10.5 ([6e4d8f6](https://github.com/wppconnect-team/wa-js/commit/6e4d8f6))
* **deps-dev:** update dependency release-it to ^15.11.0 (#1166) ([525a6b3](https://github.com/wppconnect-team/wa-js/commit/525a6b3)), closes [#1166](https://github.com/wppconnect-team/wa-js/issues/1166)
* **deps-dev:** update dependency ts-loader to ^9.4.3 ([8c236a2](https://github.com/wppconnect-team/wa-js/commit/8c236a2))
* **deps-dev:** update dependency typedoc to ^0.24.8 ([6acdc7e](https://github.com/wppconnect-team/wa-js/commit/6acdc7e))
* **deps-dev:** update dependency typescript to ^5.1.3 ([6abfb4f](https://github.com/wppconnect-team/wa-js/commit/6abfb4f))
* **deps-dev:** update dependency webpack to ^5.84.0 ([39a01c7](https://github.com/wppconnect-team/wa-js/commit/39a01c7))
* **deps-dev:** update dependency webpack to ^5.84.1 ([61d45f4](https://github.com/wppconnect-team/wa-js/commit/61d45f4))
* **deps-dev:** update dependency webpack to ^5.85.0 ([3ae4597](https://github.com/wppconnect-team/wa-js/commit/3ae4597))
* **deps-dev:** update dependency webpack to ^5.85.1 (#1165) ([2a9026b](https://github.com/wppconnect-team/wa-js/commit/2a9026b)), closes [#1165](https://github.com/wppconnect-team/wa-js/issues/1165)
* **deps-dev:** update dependency webpack to ^5.86.0 ([afb27df](https://github.com/wppconnect-team/wa-js/commit/afb27df))
* **deps-dev:** update dependency webpack-cli to ^5.1.2 ([d161b5a](https://github.com/wppconnect-team/wa-js/commit/d161b5a))
* **deps-dev:** update dependency webpack-cli to ^5.1.3 ([27d11a4](https://github.com/wppconnect-team/wa-js/commit/27d11a4))
* **deps-dev:** update dependency webpack-cli to ^5.1.4 ([4b2e921](https://github.com/wppconnect-team/wa-js/commit/4b2e921))
* **deps-dev:** update playwright monorepo to ^1.34.2 ([0e72c0b](https://github.com/wppconnect-team/wa-js/commit/0e72c0b))
* **deps-dev:** update playwright monorepo to ^1.34.3 ([83b8bfd](https://github.com/wppconnect-team/wa-js/commit/83b8bfd))
* **deps-dev:** update playwright monorepo to ^1.35.0 ([be12ac6](https://github.com/wppconnect-team/wa-js/commit/be12ac6))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.8 ([18b34f1](https://github.com/wppconnect-team/wa-js/commit/18b34f1))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.9 ([cf723e2](https://github.com/wppconnect-team/wa-js/commit/cf723e2))

### Chores

* **deps:** lock file maintenance ([e99e21a](https://github.com/wppconnect-team/wa-js/commit/e99e21a))
* **deps:** lock file maintenance ([ca2bec7](https://github.com/wppconnect-team/wa-js/commit/ca2bec7))

## <small>2.24.2 (2023-05-23)</small>

### Features

* Exported getCurrentLid function ([92176a0](https://github.com/wppconnect-team/wa-js/commit/92176a0))

### Bug Fixes

* Fixed WPP.group.addParticipants function for WhatsApp >= 2.2320.4 (fix #1114) ([fb7f4c6](https://github.com/wppconnect-team/wa-js/commit/fb7f4c6)), closes [#1114](https://github.com/wppconnect-team/wa-js/issues/1114)
* Small improvement for webpack inject (#1061) ([84e7309](https://github.com/wppconnect-team/wa-js/commit/84e7309)), closes [#1061](https://github.com/wppconnect-team/wa-js/issues/1061)

### Build System

* **deps-dev:** update dependency @types/debug to ^4.1.8 ([2c707a0](https://github.com/wppconnect-team/wa-js/commit/2c707a0))
* **deps-dev:** update dependency @types/node to ^16.18.32 ([3436e7c](https://github.com/wppconnect-team/wa-js/commit/3436e7c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.39 ([7f14ff4](https://github.com/wppconnect-team/wa-js/commit/7f14ff4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.41 ([2af7ff1](https://github.com/wppconnect-team/wa-js/commit/2af7ff1))
* **deps-dev:** update dependency eslint to ^8.41.0 ([05ac62f](https://github.com/wppconnect-team/wa-js/commit/05ac62f))
* **deps-dev:** update playwright monorepo to ^1.34.0 ([f6f11eb](https://github.com/wppconnect-team/wa-js/commit/f6f11eb))
* **deps-dev:** update playwright monorepo to ^1.34.1 ([8877521](https://github.com/wppconnect-team/wa-js/commit/8877521))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.7 ([6ad5652](https://github.com/wppconnect-team/wa-js/commit/6ad5652))

### Chores

* **deps:** lock file maintenance ([4b06e90](https://github.com/wppconnect-team/wa-js/commit/4b06e90))

## <small>2.24.1 (2023-05-19)</small>

### Bug Fixes

* Fixed javascript load order (fix #1061) ([284391e](https://github.com/wppconnect-team/wa-js/commit/284391e)), closes [#1061](https://github.com/wppconnect-team/wa-js/issues/1061)
* Fixed send message (DuplicateMessageError) (fix #1126) ([d95b140](https://github.com/wppconnect-team/wa-js/commit/d95b140)), closes [#1126](https://github.com/wppconnect-team/wa-js/issues/1126)

### Build System

* **deps-dev:** update commitlint monorepo to ^17.6.3 ([d005999](https://github.com/wppconnect-team/wa-js/commit/d005999))
* **deps-dev:** update dependency @types/node to ^16.18.26 ([97f4547](https://github.com/wppconnect-team/wa-js/commit/97f4547))
* **deps-dev:** update dependency @types/node to ^16.18.27 ([1c8b531](https://github.com/wppconnect-team/wa-js/commit/1c8b531))
* **deps-dev:** update dependency @types/node to ^16.18.28 ([05d197d](https://github.com/wppconnect-team/wa-js/commit/05d197d))
* **deps-dev:** update dependency @types/node to ^16.18.29 ([e5969ad](https://github.com/wppconnect-team/wa-js/commit/e5969ad))
* **deps-dev:** update dependency @types/node to ^16.18.30 ([a7217ab](https://github.com/wppconnect-team/wa-js/commit/a7217ab))
* **deps-dev:** update dependency @types/node to ^16.18.31 ([ad07917](https://github.com/wppconnect-team/wa-js/commit/ad07917))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.4 ([00abf6b](https://github.com/wppconnect-team/wa-js/commit/00abf6b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.29 ([4337748](https://github.com/wppconnect-team/wa-js/commit/4337748))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.30 ([7c09279](https://github.com/wppconnect-team/wa-js/commit/7c09279))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.31 ([9af28be](https://github.com/wppconnect-team/wa-js/commit/9af28be))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.33 ([fe72d9c](https://github.com/wppconnect-team/wa-js/commit/fe72d9c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.34 ([7e72f8f](https://github.com/wppconnect-team/wa-js/commit/7e72f8f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.35 ([c2c427f](https://github.com/wppconnect-team/wa-js/commit/c2c427f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.36 ([8b4b67d](https://github.com/wppconnect-team/wa-js/commit/8b4b67d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.37 ([4605449](https://github.com/wppconnect-team/wa-js/commit/4605449))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.38 ([2bc811f](https://github.com/wppconnect-team/wa-js/commit/2bc811f))
* **deps-dev:** update dependency eslint to ^8.40.0 ([d45e65a](https://github.com/wppconnect-team/wa-js/commit/d45e65a))
* **deps-dev:** update dependency node-fetch to ^2.6.10 ([cd3356c](https://github.com/wppconnect-team/wa-js/commit/cd3356c))
* **deps-dev:** update dependency node-fetch to ^2.6.11 ([5cf9de1](https://github.com/wppconnect-team/wa-js/commit/5cf9de1))
* **deps-dev:** update dependency typedoc to ^0.24.7 ([416e5c0](https://github.com/wppconnect-team/wa-js/commit/416e5c0))
* **deps-dev:** update dependency webpack to ^5.82.0 ([57ff7bc](https://github.com/wppconnect-team/wa-js/commit/57ff7bc))
* **deps-dev:** update dependency webpack to ^5.82.1 ([bc0d102](https://github.com/wppconnect-team/wa-js/commit/bc0d102))
* **deps-dev:** update dependency webpack to ^5.83.1 ([4e62905](https://github.com/wppconnect-team/wa-js/commit/4e62905))
* **deps-dev:** update dependency webpack-cli to ^5.1.0 ([50fd547](https://github.com/wppconnect-team/wa-js/commit/50fd547))
* **deps-dev:** update dependency webpack-cli to ^5.1.1 ([c4d0af3](https://github.com/wppconnect-team/wa-js/commit/c4d0af3))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.5 ([f3c6bec](https://github.com/wppconnect-team/wa-js/commit/f3c6bec))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.6 ([6020ce7](https://github.com/wppconnect-team/wa-js/commit/6020ce7))

### Chores

* **deps:** lock file maintenance ([3db203c](https://github.com/wppconnect-team/wa-js/commit/3db203c))
* **deps:** lock file maintenance ([fe95392](https://github.com/wppconnect-team/wa-js/commit/fe95392))

## 2.24.0 (2023-05-03)

### Features

* Added chat.update_label event (#1015) ([b65a518](https://github.com/wppconnect-team/wa-js/commit/b65a518)), closes [#1015](https://github.com/wppconnect-team/wa-js/issues/1015)
* Added conn.online event (#1085) ([36415a0](https://github.com/wppconnect-team/wa-js/commit/36415a0)), closes [#1085](https://github.com/wppconnect-team/wa-js/issues/1085)
* Added WPP.conn.isOnline function (close #1085) ([b2d48c1](https://github.com/wppconnect-team/wa-js/commit/b2d48c1)), closes [#1085](https://github.com/wppconnect-team/wa-js/issues/1085)
* Added WPP.conn.joinWebBeta ([e9c0483](https://github.com/wppconnect-team/wa-js/commit/e9c0483))
* Added WPP.group.approve function ([0661f02](https://github.com/wppconnect-team/wa-js/commit/0661f02))
* Added WPP.group.getMembershipRequests ([5ef0836](https://github.com/wppconnect-team/wa-js/commit/5ef0836))
* Added WPP.group.reject function (close #1058) ([687627d](https://github.com/wppconnect-team/wa-js/commit/687627d)), closes [#1058](https://github.com/wppconnect-team/wa-js/issues/1058)
* Exported NetworkStatus ([5ce90e8](https://github.com/wppconnect-team/wa-js/commit/5ce90e8))

### Bug Fixes

* Fixed ephemeral setting for sending messages (fix #1014); ([a7d840d](https://github.com/wppconnect-team/wa-js/commit/a7d840d)), closes [#1014](https://github.com/wppconnect-team/wa-js/issues/1014)
* Fixed sending status with image/video (fix #1035); ([cb7a32d](https://github.com/wppconnect-team/wa-js/commit/cb7a32d)), closes [#1035](https://github.com/wppconnect-team/wa-js/issues/1035)
* Fixed sent status that was not show up after refresh (fix #1017) ([dadb00d](https://github.com/wppconnect-team/wa-js/commit/dadb00d)), closes [#1017](https://github.com/wppconnect-team/wa-js/issues/1017)
* Improved chat.new_message event ([5355a0e](https://github.com/wppconnect-team/wa-js/commit/5355a0e))
* Improved files loading from WA-JS (fix #1061) ([f94f695](https://github.com/wppconnect-team/wa-js/commit/f94f695)), closes [#1061](https://github.com/wppconnect-team/wa-js/issues/1061)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.28 ([e3a1d95](https://github.com/wppconnect-team/wa-js/commit/e3a1d95))
* **deps-dev:** update dependency release-it to ^15.10.2 ([d8e9595](https://github.com/wppconnect-team/wa-js/commit/d8e9595))
* **deps-dev:** update dependency release-it to ^15.10.3 ([e3c2f76](https://github.com/wppconnect-team/wa-js/commit/e3c2f76))
* **deps-dev:** update dependency ts-morph to v18 (#1022) ([68eeffe](https://github.com/wppconnect-team/wa-js/commit/68eeffe)), closes [#1022](https://github.com/wppconnect-team/wa-js/issues/1022)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to v2 (#1055) ([b298d46](https://github.com/wppconnect-team/wa-js/commit/b298d46)), closes [#1055](https://github.com/wppconnect-team/wa-js/issues/1055)
* **deps-dev:** update typescript-eslint monorepo to ^5.59.2 ([fe08c06](https://github.com/wppconnect-team/wa-js/commit/fe08c06))

### Chores

* **deps:** lock file maintenance ([05a57f0](https://github.com/wppconnect-team/wa-js/commit/05a57f0))

## <small>2.23.5 (2023-04-29)</small>

### Features

* Added WPP.conn.setLimit function (#1069) ([9988fc7](https://github.com/wppconnect-team/wa-js/commit/9988fc7)), closes [#1069](https://github.com/wppconnect-team/wa-js/issues/1069)

### Bug Fixes

* Fixed attribute chat on MessageModel (#1077) ([38ba3af](https://github.com/wppconnect-team/wa-js/commit/38ba3af)), closes [#1077](https://github.com/wppconnect-team/wa-js/issues/1077)
* Fixed generated quoted id on msg group (#1079) ([48c6780](https://github.com/wppconnect-team/wa-js/commit/48c6780)), closes [#1079](https://github.com/wppconnect-team/wa-js/issues/1079)

### Documentation

* Improved the docs of WPP.conn.setLimit ([9ab8b3b](https://github.com/wppconnect-team/wa-js/commit/9ab8b3b))

### Styles

* Fixed style lint ([165aa88](https://github.com/wppconnect-team/wa-js/commit/165aa88))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.25 ([f9f8fa9](https://github.com/wppconnect-team/wa-js/commit/f9f8fa9))
* **deps-dev:** update dependency webpack to ^5.81.0 ([aa10b2f](https://github.com/wppconnect-team/wa-js/commit/aa10b2f))
* **deps-dev:** update playwright monorepo to ^1.33.0 ([83d1ef9](https://github.com/wppconnect-team/wa-js/commit/83d1ef9))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.1 ([7056dcf](https://github.com/wppconnect-team/wa-js/commit/7056dcf))

## <small>2.23.4 (2023-04-28)</small>

### Bug Fixes

* Fixed exported getHistorySyncProgress function ([8ba04e8](https://github.com/wppconnect-team/wa-js/commit/8ba04e8))
* Fixed WPP.chat.editMessage function for WhatsApp >= 2.2318.7 ([7a46aa0](https://github.com/wppconnect-team/wa-js/commit/7a46aa0))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.6.1 ([aee4637](https://github.com/wppconnect-team/wa-js/commit/aee4637))
* **deps-dev:** update dependency @types/node to ^16.18.24 ([a838ab6](https://github.com/wppconnect-team/wa-js/commit/a838ab6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.20 ([251b180](https://github.com/wppconnect-team/wa-js/commit/251b180))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.21 ([5eba1a0](https://github.com/wppconnect-team/wa-js/commit/5eba1a0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.22 ([140ebe4](https://github.com/wppconnect-team/wa-js/commit/140ebe4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.23 ([136b7ec](https://github.com/wppconnect-team/wa-js/commit/136b7ec))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.26 (#1072) ([6b90017](https://github.com/wppconnect-team/wa-js/commit/6b90017)), closes [#1072](https://github.com/wppconnect-team/wa-js/issues/1072)
* **deps-dev:** update dependency eslint to ^8.39.0 ([6c7ae3a](https://github.com/wppconnect-team/wa-js/commit/6c7ae3a))
* **deps-dev:** update dependency prettier to ^2.8.8 ([fad42cd](https://github.com/wppconnect-team/wa-js/commit/fad42cd))
* **deps-dev:** update dependency typedoc to ^0.24.2 ([df76bb5](https://github.com/wppconnect-team/wa-js/commit/df76bb5))
* **deps-dev:** update dependency typedoc to ^0.24.4 ([5484065](https://github.com/wppconnect-team/wa-js/commit/5484065))
* **deps-dev:** update dependency typedoc to ^0.24.6 ([9622653](https://github.com/wppconnect-team/wa-js/commit/9622653))
* **deps-dev:** update dependency webpack to ^5.80.0 ([e941169](https://github.com/wppconnect-team/wa-js/commit/e941169))
* **deps-dev:** update dependency webpack-cli to ^5.0.2 ([d4c07e8](https://github.com/wppconnect-team/wa-js/commit/d4c07e8))
* **deps-dev:** update typescript-eslint monorepo to ^5.59.0 ([311da17](https://github.com/wppconnect-team/wa-js/commit/311da17))

### Chores

* **deps:** lock file maintenance ([758eec3](https://github.com/wppconnect-team/wa-js/commit/758eec3))

## <small>2.23.3 (2023-04-15)</small>

### Bug Fixes

* Fixed deprecated attributes for MsgModel ([ff65494](https://github.com/wppconnect-team/wa-js/commit/ff65494))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.6.0 ([e5ea8bd](https://github.com/wppconnect-team/wa-js/commit/e5ea8bd))
* **deps-dev:** update dependency @types/shelljs to ^0.8.12 ([c14424c](https://github.com/wppconnect-team/wa-js/commit/c14424c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.17 (#1049) ([362d4b6](https://github.com/wppconnect-team/wa-js/commit/362d4b6)), closes [#1049](https://github.com/wppconnect-team/wa-js/issues/1049)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.18 ([36e3622](https://github.com/wppconnect-team/wa-js/commit/36e3622))

## <small>2.23.2 (2023-04-13)</small>

### Features

* more options to chat listing (#1037) ([48663da](https://github.com/wppconnect-team/wa-js/commit/48663da)), closes [#1037](https://github.com/wppconnect-team/wa-js/issues/1037)

### Bug Fixes

* Fixed attributes MsgModel ([4ac516f](https://github.com/wppconnect-team/wa-js/commit/4ac516f))

### Documentation

* Fixed docs build ([074dc48](https://github.com/wppconnect-team/wa-js/commit/074dc48))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.14 ([686790e](https://github.com/wppconnect-team/wa-js/commit/686790e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.15 ([f91b5ad](https://github.com/wppconnect-team/wa-js/commit/f91b5ad))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.16 ([54f68fc](https://github.com/wppconnect-team/wa-js/commit/54f68fc))
* **deps-dev:** update dependency eslint to ^8.38.0 ([9966e8f](https://github.com/wppconnect-team/wa-js/commit/9966e8f))
* **deps-dev:** update dependency release-it to ^15.10.1 ([88f026e](https://github.com/wppconnect-team/wa-js/commit/88f026e))
* **deps-dev:** update dependency typedoc to ^0.24.1 ([c0d1f51](https://github.com/wppconnect-team/wa-js/commit/c0d1f51))
* **deps-dev:** update dependency typescript to ^5.0.4 ([e3baae4](https://github.com/wppconnect-team/wa-js/commit/e3baae4))
* **deps-dev:** update dependency webpack to ^5.78.0 (#1030) ([b31aede](https://github.com/wppconnect-team/wa-js/commit/b31aede)), closes [#1030](https://github.com/wppconnect-team/wa-js/issues/1030)
* **deps-dev:** update dependency webpack to ^5.79.0 ([54b0b1b](https://github.com/wppconnect-team/wa-js/commit/54b0b1b))
* **deps-dev:** update playwright monorepo to ^1.32.2 (#1028) ([bf448ee](https://github.com/wppconnect-team/wa-js/commit/bf448ee)), closes [#1028](https://github.com/wppconnect-team/wa-js/issues/1028)
* **deps-dev:** update playwright monorepo to ^1.32.3 ([6189dbc](https://github.com/wppconnect-team/wa-js/commit/6189dbc))
* **deps-dev:** update typescript-eslint monorepo to ^5.57.1 ([dd8c8e8](https://github.com/wppconnect-team/wa-js/commit/dd8c8e8))
* **deps-dev:** update typescript-eslint monorepo to ^5.58.0 ([b8d478d](https://github.com/wppconnect-team/wa-js/commit/b8d478d))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.4.0 ([08a478b](https://github.com/wppconnect-team/wa-js/commit/08a478b))
* **deps:** update wagoid/commitlint-github-action action to v5.4.1 ([3604c06](https://github.com/wppconnect-team/wa-js/commit/3604c06))

### Chores

* **deps:** lock file maintenance ([b5ff15a](https://github.com/wppconnect-team/wa-js/commit/b5ff15a))

## <small>2.23.1 (2023-04-03)</small>

### Bug Fixes

* Fixed buttons/list messages (fix #1024, fix #977) ([8c91d3f](https://github.com/wppconnect-team/wa-js/commit/8c91d3f)), closes [#1024](https://github.com/wppconnect-team/wa-js/issues/1024) [#977](https://github.com/wppconnect-team/wa-js/issues/977)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.23 ([efdda36](https://github.com/wppconnect-team/wa-js/commit/efdda36))
* **deps-dev:** update dependency @types/node-fetch to ^2.6.3 ([044c5e8](https://github.com/wppconnect-team/wa-js/commit/044c5e8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.13 ([6f17a23](https://github.com/wppconnect-team/wa-js/commit/6f17a23))
* **deps-dev:** update dependency eslint to ^8.37.0 ([bbcd842](https://github.com/wppconnect-team/wa-js/commit/bbcd842))
* **deps-dev:** update dependency release-it to ^15.10.0 (#1020) ([1767ee9](https://github.com/wppconnect-team/wa-js/commit/1767ee9)), closes [#1020](https://github.com/wppconnect-team/wa-js/issues/1020)
* **deps-dev:** update dependency typescript to ^5.0.3 ([0566812](https://github.com/wppconnect-team/wa-js/commit/0566812))
* **deps-dev:** update dependency webpack to ^5.77.0 (#1021) ([8832641](https://github.com/wppconnect-team/wa-js/commit/8832641)), closes [#1021](https://github.com/wppconnect-team/wa-js/issues/1021)

### Chores

* **deps:** lock file maintenance ([7b10c2c](https://github.com/wppconnect-team/wa-js/commit/7b10c2c))

## 2.23.0 (2023-04-01)

### Features

* Added option to disable all status sync (config.syncAllStatus) ([845bcf6](https://github.com/wppconnect-team/wa-js/commit/845bcf6))
* Added WPP.call.accept function ([d379e50](https://github.com/wppconnect-team/wa-js/commit/d379e50))
* Added WPP.call.end function ([ec7364d](https://github.com/wppconnect-team/wa-js/commit/ec7364d))
* Added WPP.call.offer function ([aa53282](https://github.com/wppconnect-team/wa-js/commit/aa53282))

### Bug Fixes

* Avoid permanent cache for WPP.contact.queryExists (wppconnect-team/wppconnect#1604) ([556a97f](https://github.com/wppconnect-team/wa-js/commit/556a97f)), closes [wppconnect-team/wppconnect#1604](https://github.com/wppconnect-team/wppconnect/issues/1604)
* Fixed buttons/list from normal accounts (based on adiwajshing/Baileys#2674) ([6ec2d93](https://github.com/wppconnect-team/wa-js/commit/6ec2d93)), closes [adiwajshing/Baileys#2674](https://github.com/adiwajshing/Baileys/issues/2674)
* Fixed getMessage return for serialization (fix #957) ([f5a3bb9](https://github.com/wppconnect-team/wa-js/commit/f5a3bb9)), closes [#957](https://github.com/wppconnect-team/wa-js/issues/957)
* Renamed all call functions ([f54cc87](https://github.com/wppconnect-team/wa-js/commit/f54cc87))

### Documentation

* Added examples for WPP.chat.downloadMedia (#956) ([764a45d](https://github.com/wppconnect-team/wa-js/commit/764a45d)), closes [#956](https://github.com/wppconnect-team/wa-js/issues/956)
* Updated the example of WPP.call.accept ([0b4337a](https://github.com/wppconnect-team/wa-js/commit/0b4337a))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.5.0 ([672ceab](https://github.com/wppconnect-team/wa-js/commit/672ceab))
* **deps-dev:** update dependency @commitlint/cli to ^17.5.1 ([e3681c1](https://github.com/wppconnect-team/wa-js/commit/e3681c1))
* **deps-dev:** update dependency @types/node to ^16.18.18 ([93c91bc](https://github.com/wppconnect-team/wa-js/commit/93c91bc))
* **deps-dev:** update dependency @types/node to ^16.18.19 (#998) ([ce422f3](https://github.com/wppconnect-team/wa-js/commit/ce422f3)), closes [#998](https://github.com/wppconnect-team/wa-js/issues/998)
* **deps-dev:** update dependency @types/node to ^16.18.20 ([917f9a9](https://github.com/wppconnect-team/wa-js/commit/917f9a9))
* **deps-dev:** update dependency @types/node to ^16.18.21 ([0e611c1](https://github.com/wppconnect-team/wa-js/commit/0e611c1))
* **deps-dev:** update dependency @types/node to ^16.18.22 ([656fb5a](https://github.com/wppconnect-team/wa-js/commit/656fb5a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.10 ([b2fbadf](https://github.com/wppconnect-team/wa-js/commit/b2fbadf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.11 ([e83bac0](https://github.com/wppconnect-team/wa-js/commit/e83bac0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.12 ([05d1930](https://github.com/wppconnect-team/wa-js/commit/05d1930))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.7 ([adaae5e](https://github.com/wppconnect-team/wa-js/commit/adaae5e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.8 ([240d07b](https://github.com/wppconnect-team/wa-js/commit/240d07b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.9 ([79f67ef](https://github.com/wppconnect-team/wa-js/commit/79f67ef))
* **deps-dev:** update dependency eslint-config-prettier to ^8.8.0 ([953dcdc](https://github.com/wppconnect-team/wa-js/commit/953dcdc))
* **deps-dev:** update dependency prettier to ^2.8.5 ([e96cc32](https://github.com/wppconnect-team/wa-js/commit/e96cc32))
* **deps-dev:** update dependency prettier to ^2.8.6 ([57445aa](https://github.com/wppconnect-team/wa-js/commit/57445aa))
* **deps-dev:** update dependency prettier to ^2.8.7 ([1033ec0](https://github.com/wppconnect-team/wa-js/commit/1033ec0))
* **deps-dev:** update dependency release-it to ^15.9.0 ([1002dd6](https://github.com/wppconnect-team/wa-js/commit/1002dd6))
* **deps-dev:** update dependency release-it to ^15.9.1 ([f1db271](https://github.com/wppconnect-team/wa-js/commit/f1db271))
* **deps-dev:** update dependency release-it to ^15.9.3 ([8bb3312](https://github.com/wppconnect-team/wa-js/commit/8bb3312))
* **deps-dev:** update dependency typedoc to ^0.23.27 ([d4dd9d2](https://github.com/wppconnect-team/wa-js/commit/d4dd9d2))
* **deps-dev:** update dependency typedoc to ^0.23.28 ([03d3280](https://github.com/wppconnect-team/wa-js/commit/03d3280))
* **deps-dev:** update dependency typescript to v5 (#982) ([4ac0aa5](https://github.com/wppconnect-team/wa-js/commit/4ac0aa5)), closes [#982](https://github.com/wppconnect-team/wa-js/issues/982)
* **deps-dev:** update dependency webpack to ^5.76.2 ([39271f1](https://github.com/wppconnect-team/wa-js/commit/39271f1))
* **deps-dev:** update dependency webpack to ^5.76.3 ([732f766](https://github.com/wppconnect-team/wa-js/commit/732f766))
* **deps-dev:** update playwright monorepo to ^1.32.0 ([b92b9d1](https://github.com/wppconnect-team/wa-js/commit/b92b9d1))
* **deps-dev:** update playwright monorepo to ^1.32.1 ([9029803](https://github.com/wppconnect-team/wa-js/commit/9029803))
* **deps-dev:** update typescript-eslint monorepo to ^5.56.0 ([79024af](https://github.com/wppconnect-team/wa-js/commit/79024af))
* **deps-dev:** update typescript-eslint monorepo to ^5.57.0 ([27968aa](https://github.com/wppconnect-team/wa-js/commit/27968aa))

### Chores

* Added parseRelayResponse for sendCallOffer ([9be3a49](https://github.com/wppconnect-team/wa-js/commit/9be3a49))
* **deps:** lock file maintenance ([6cb2966](https://github.com/wppconnect-team/wa-js/commit/6cb2966))
* **deps:** lock file maintenance ([d35489f](https://github.com/wppconnect-team/wa-js/commit/d35489f))
* Fixed build for parseRelayResponse.ts ([6536716](https://github.com/wppconnect-team/wa-js/commit/6536716))
* Fixed disable all status sync for WhatsApp <= 2.2310.x ([6bf2e68](https://github.com/wppconnect-team/wa-js/commit/6bf2e68))
* Fixed encKey for call offer destination ([415e49c](https://github.com/wppconnect-team/wa-js/commit/415e49c))

## <small>2.22.2 (2023-03-15)</small>

### Bug Fixes

* Fixed WPP.chat.getVotes function (#969) ([f303f33](https://github.com/wppconnect-team/wa-js/commit/f303f33)), closes [#969](https://github.com/wppconnect-team/wa-js/issues/969)
* Fixed WPP.chat.sendFileMessage function for WhatsApp >= 2.2312.5 (fix #976) ([261be97](https://github.com/wppconnect-team/wa-js/commit/261be97)), closes [#976](https://github.com/wppconnect-team/wa-js/issues/976)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.15 ([4bc1c4f](https://github.com/wppconnect-team/wa-js/commit/4bc1c4f))
* **deps-dev:** update dependency @types/node to ^16.18.16 ([2d532fa](https://github.com/wppconnect-team/wa-js/commit/2d532fa))
* **deps-dev:** update typescript-eslint monorepo to ^5.55.0 ([40a425a](https://github.com/wppconnect-team/wa-js/commit/40a425a))

## <small>2.22.1 (2023-03-13)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp >= 2.2312.5 ([7571f2f](https://github.com/wppconnect-team/wa-js/commit/7571f2f))
* Fixed webpack events error ([2b1da73](https://github.com/wppconnect-team/wa-js/commit/2b1da73))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.5 ([1cb99be](https://github.com/wppconnect-team/wa-js/commit/1cb99be))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.6 (#972) ([9a2162a](https://github.com/wppconnect-team/wa-js/commit/9a2162a)), closes [#972](https://github.com/wppconnect-team/wa-js/issues/972)
* **deps-dev:** update dependency eslint to ^8.36.0 ([e9b16d6](https://github.com/wppconnect-team/wa-js/commit/e9b16d6))
* **deps-dev:** update dependency release-it to ^15.8.0 ([fcc6dd6](https://github.com/wppconnect-team/wa-js/commit/fcc6dd6))
* **deps-dev:** update dependency webpack to ^5.76.1 ([2687204](https://github.com/wppconnect-team/wa-js/commit/2687204))

### Chores

* **deps:** lock file maintenance ([af1f7c2](https://github.com/wppconnect-team/wa-js/commit/af1f7c2))

## 2.22.0 (2023-03-09)

### Features

* Added support to string, blob and file formats to WPP.chat.sendFileMessage ([8a6626a](https://github.com/wppconnect-team/wa-js/commit/8a6626a))
* Added support to waveform for ptt audio messages ([290ebfe](https://github.com/wppconnect-team/wa-js/commit/290ebfe))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.4 ([50fe57e](https://github.com/wppconnect-team/wa-js/commit/50fe57e))
* **deps-dev:** update dependency eslint-config-prettier to ^8.7.0 ([d8c6c39](https://github.com/wppconnect-team/wa-js/commit/d8c6c39))
* **deps-dev:** update dependency webpack to ^5.76.0 ([229fb6f](https://github.com/wppconnect-team/wa-js/commit/229fb6f))
* **deps-dev:** update typescript-eslint monorepo to ^5.54.1 ([58be152](https://github.com/wppconnect-team/wa-js/commit/58be152))

### Chores

* **deps:** lock file maintenance ([0cbf42e](https://github.com/wppconnect-team/wa-js/commit/0cbf42e))

## 2.21.0 (2023-03-04)

### Features

* Added WPP.group.removeIcon function (close #923) ([1abd12e](https://github.com/wppconnect-team/wa-js/commit/1abd12e)), closes [#923](https://github.com/wppconnect-team/wa-js/issues/923)
* Added WPP.profile.removeMyProfilePicture function (#923) ([307e567](https://github.com/wppconnect-team/wa-js/commit/307e567)), closes [#923](https://github.com/wppconnect-team/wa-js/issues/923)
* Added WPP.profile.setMyProfileName function (close #941) ([e8916e3](https://github.com/wppconnect-team/wa-js/commit/e8916e3)), closes [#941](https://github.com/wppconnect-team/wa-js/issues/941)
* Exported requestDeletePicture function ([1f26500](https://github.com/wppconnect-team/wa-js/commit/1f26500))
* Exported setPushname function ([40eb9bf](https://github.com/wppconnect-team/wa-js/commit/40eb9bf))

### Bug Fixes

* Update UserPrefs namespace ([68db5fa](https://github.com/wppconnect-team/wa-js/commit/68db5fa))

### Documentation

* Fixed profile categories ([310bdd5](https://github.com/wppconnect-team/wa-js/commit/310bdd5))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.14 ([9940454](https://github.com/wppconnect-team/wa-js/commit/9940454))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.2 ([4bcf179](https://github.com/wppconnect-team/wa-js/commit/4bcf179))
* **deps-dev:** update dependency compressorjs to ^1.2.1 ([2abfb25](https://github.com/wppconnect-team/wa-js/commit/2abfb25))
* **deps-dev:** update dependency release-it to ^15.6.1 ([499fcf5](https://github.com/wppconnect-team/wa-js/commit/499fcf5))
* **deps-dev:** update dependency release-it to ^15.7.0 ([9397651](https://github.com/wppconnect-team/wa-js/commit/9397651))
* **deps-dev:** update playwright monorepo to ^1.31.2 ([a936f6c](https://github.com/wppconnect-team/wa-js/commit/a936f6c))
* **deps-dev:** update typescript-eslint monorepo to ^5.54.0 ([fe01a76](https://github.com/wppconnect-team/wa-js/commit/fe01a76))

### Continuous Integration

* Update site on release ([0aacedc](https://github.com/wppconnect-team/wa-js/commit/0aacedc))

### Chores

* Improved VSCode debug ([9f4b1d1](https://github.com/wppconnect-team/wa-js/commit/9f4b1d1))
* Removed old code ([1ac06c3](https://github.com/wppconnect-team/wa-js/commit/1ac06c3))

## <small>2.20.2 (2023-02-28)</small>

### Bug Fixes

* Fixed link-preview function ([2fc38b1](https://github.com/wppconnect-team/wa-js/commit/2fc38b1))

## <small>2.20.1 (2023-02-28)</small>

### Bug Fixes

* Fixed isUnreadTypeMsg function for WhatsApp >= 2.2310.4 ([0d1340d](https://github.com/wppconnect-team/wa-js/commit/0d1340d))
* Removed offline link-preview server ([475bc4b](https://github.com/wppconnect-team/wa-js/commit/475bc4b))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.13 ([29ac891](https://github.com/wppconnect-team/wa-js/commit/29ac891))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.258 ([0f293aa](https://github.com/wppconnect-team/wa-js/commit/0f293aa))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.259 ([9580475](https://github.com/wppconnect-team/wa-js/commit/9580475))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.260 ([80ae6fc](https://github.com/wppconnect-team/wa-js/commit/80ae6fc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.0 ([5cda518](https://github.com/wppconnect-team/wa-js/commit/5cda518))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.2.1 (#942) ([76b7b3a](https://github.com/wppconnect-team/wa-js/commit/76b7b3a)), closes [#942](https://github.com/wppconnect-team/wa-js/issues/942)
* **deps-dev:** update dependency compressorjs to ^1.2.0 ([7e0bffa](https://github.com/wppconnect-team/wa-js/commit/7e0bffa))
* **deps-dev:** update dependency eslint to ^8.35.0 ([f427688](https://github.com/wppconnect-team/wa-js/commit/f427688))
* **deps-dev:** update dependency typedoc to ^0.23.26 ([6366bcc](https://github.com/wppconnect-team/wa-js/commit/6366bcc))
* **deps-dev:** update playwright monorepo to ^1.31.0 ([1d426c0](https://github.com/wppconnect-team/wa-js/commit/1d426c0))
* **deps-dev:** update playwright monorepo to ^1.31.1 ([a3cc00f](https://github.com/wppconnect-team/wa-js/commit/a3cc00f))

### Chores

* **deps:** lock file maintenance ([4c2a20b](https://github.com/wppconnect-team/wa-js/commit/4c2a20b))

## 2.20.0 (2023-02-21)

### Features

* Added sendStatusToDevice option to avoid app crashing ([d762d3a](https://github.com/wppconnect-team/wa-js/commit/d762d3a))
* Added WPP.status.updateParticipants function ([1cc99a3](https://github.com/wppconnect-team/wa-js/commit/1cc99a3))

### Bug Fixes

* Fixed isUnreadTypeMsg function for WhatsApp >= 2.2308.6 ([759bd64](https://github.com/wppconnect-team/wa-js/commit/759bd64))
* Removed fallback for WhatsApp WEB < 2.2307.10 ([57f901a](https://github.com/wppconnect-team/wa-js/commit/57f901a))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.4.3 ([05659de](https://github.com/wppconnect-team/wa-js/commit/05659de))
* **deps-dev:** update commitlint monorepo to ^17.4.4 ([11326d6](https://github.com/wppconnect-team/wa-js/commit/11326d6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.249 ([ef6b699](https://github.com/wppconnect-team/wa-js/commit/ef6b699))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.250 ([46aed78](https://github.com/wppconnect-team/wa-js/commit/46aed78))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.251 ([41be679](https://github.com/wppconnect-team/wa-js/commit/41be679))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.252 ([4e13547](https://github.com/wppconnect-team/wa-js/commit/4e13547))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.257 (#924) ([b63b301](https://github.com/wppconnect-team/wa-js/commit/b63b301)), closes [#924](https://github.com/wppconnect-team/wa-js/issues/924)
* **deps-dev:** update dependency eslint to ^8.34.0 ([f194d39](https://github.com/wppconnect-team/wa-js/commit/f194d39))
* **deps-dev:** update dependency node-fetch to ^2.6.9 ([c273e3e](https://github.com/wppconnect-team/wa-js/commit/c273e3e))
* **deps-dev:** update dependency prettier to ^2.8.4 ([8c510bf](https://github.com/wppconnect-team/wa-js/commit/8c510bf))
* **deps-dev:** update dependency typedoc to ^0.23.25 ([8ab2495](https://github.com/wppconnect-team/wa-js/commit/8ab2495))
* **deps-dev:** update typescript-eslint monorepo to ^5.52.0 ([10568c2](https://github.com/wppconnect-team/wa-js/commit/10568c2))
* **deps-dev:** update typescript-eslint monorepo to ^5.53.0 ([cb924a3](https://github.com/wppconnect-team/wa-js/commit/cb924a3))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.3.1 ([9b2dbbe](https://github.com/wppconnect-team/wa-js/commit/9b2dbbe))
* Ignore major version of node-fetch ([eb2e36b](https://github.com/wppconnect-team/wa-js/commit/eb2e36b))

### Chores

* **deps:** lock file maintenance ([00778e8](https://github.com/wppconnect-team/wa-js/commit/00778e8))
* **deps:** lock file maintenance ([9d8d930](https://github.com/wppconnect-team/wa-js/commit/9d8d930))
* Improved wa-source command ([872b6f5](https://github.com/wppconnect-team/wa-js/commit/872b6f5))
* Improved WPP.status.updateParticipants function ([66da31a](https://github.com/wppconnect-team/wa-js/commit/66da31a))

## <small>2.19.1 (2023-02-07)</small>

### Bug Fixes

* add image to product edit (#902) ([426c5e9](https://github.com/wppconnect-team/wa-js/commit/426c5e9)), closes [#902](https://github.com/wppconnect-team/wa-js/issues/902)
* Fixed WPP.contact.queryExists function for WhatsApp >= 2.2306.7 ([3b76afc](https://github.com/wppconnect-team/wa-js/commit/3b76afc))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.12 ([24068a3](https://github.com/wppconnect-team/wa-js/commit/24068a3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.242 ([5edad29](https://github.com/wppconnect-team/wa-js/commit/5edad29))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.243 ([3c4b339](https://github.com/wppconnect-team/wa-js/commit/3c4b339))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.244 ([0c5f081](https://github.com/wppconnect-team/wa-js/commit/0c5f081))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.246 ([d1ec31c](https://github.com/wppconnect-team/wa-js/commit/d1ec31c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.247 ([dd67ee3](https://github.com/wppconnect-team/wa-js/commit/dd67ee3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.248 (#911) ([74331ae](https://github.com/wppconnect-team/wa-js/commit/74331ae)), closes [#911](https://github.com/wppconnect-team/wa-js/issues/911)
* **deps-dev:** update typescript-eslint monorepo to ^5.50.0 ([7b6d061](https://github.com/wppconnect-team/wa-js/commit/7b6d061))
* **deps-dev:** update typescript-eslint monorepo to ^5.51.0 ([17d340e](https://github.com/wppconnect-team/wa-js/commit/17d340e))

### Chores

* **deps:** lock file maintenance ([c4f8ca4](https://github.com/wppconnect-team/wa-js/commit/c4f8ca4))
* **deps:** lock file maintenance ([7dd62fa](https://github.com/wppconnect-team/wa-js/commit/7dd62fa))
* Improve wa-source download ([a911cab](https://github.com/wppconnect-team/wa-js/commit/a911cab))

## 2.19.0 (2023-01-31)

### Features

* Added chat.active_chat event (close #868) ([4ca7a39](https://github.com/wppconnect-team/wa-js/commit/4ca7a39)), closes [#868](https://github.com/wppconnect-team/wa-js/issues/868)
* Added WPP.chat.getActiveChat function (close #868) ([bc0b7be](https://github.com/wppconnect-team/wa-js/commit/bc0b7be)), closes [#868](https://github.com/wppconnect-team/wa-js/issues/868)
* Added WPP.community.demoteParticipants ([d9a84ac](https://github.com/wppconnect-team/wa-js/commit/d9a84ac))
* Added WPP.community.promoteParticipants ([943a67c](https://github.com/wppconnect-team/wa-js/commit/943a67c))
* Added WPP.group.getGroupSizeLimit function (close #691) ([77a91fe](https://github.com/wppconnect-team/wa-js/commit/77a91fe)), closes [#691](https://github.com/wppconnect-team/wa-js/issues/691)
* Created community functions ([d52137b](https://github.com/wppconnect-team/wa-js/commit/d52137b))

### Bug Fixes

* Bugs fix ([855926d](https://github.com/wppconnect-team/wa-js/commit/855926d))
* Typos fix for community ([1486b10](https://github.com/wppconnect-team/wa-js/commit/1486b10))
* Updated the minimal version of WhatsApp WEB to >=2.2245.8-beta ([2ea71a2](https://github.com/wppconnect-team/wa-js/commit/2ea71a2))

### Documentation

* Fixed docs ([5f80572](https://github.com/wppconnect-team/wa-js/commit/5f80572))
* Fixed group docs ([9416612](https://github.com/wppconnect-team/wa-js/commit/9416612))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.233 ([305768a](https://github.com/wppconnect-team/wa-js/commit/305768a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.234 ([e56fc09](https://github.com/wppconnect-team/wa-js/commit/e56fc09))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.235 ([7185bee](https://github.com/wppconnect-team/wa-js/commit/7185bee))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.236 ([ef4db44](https://github.com/wppconnect-team/wa-js/commit/ef4db44))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.237 ([469767c](https://github.com/wppconnect-team/wa-js/commit/469767c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.238 ([8485254](https://github.com/wppconnect-team/wa-js/commit/8485254))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.239 ([7d260c6](https://github.com/wppconnect-team/wa-js/commit/7d260c6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.240 ([2847531](https://github.com/wppconnect-team/wa-js/commit/2847531))
* **deps-dev:** update dependency eslint to ^8.33.0 ([374d44f](https://github.com/wppconnect-team/wa-js/commit/374d44f))
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to v10 ([ae5779d](https://github.com/wppconnect-team/wa-js/commit/ae5779d))
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to v9 ([f0bf962](https://github.com/wppconnect-team/wa-js/commit/f0bf962))
* **deps-dev:** update dependency parse-data-url to v5 ([f41ed15](https://github.com/wppconnect-team/wa-js/commit/f41ed15))
* **deps-dev:** update dependency typescript to ^4.9.5 ([05ea345](https://github.com/wppconnect-team/wa-js/commit/05ea345))
* **deps-dev:** update playwright monorepo to ^1.30.0 ([58b530b](https://github.com/wppconnect-team/wa-js/commit/58b530b))
* **deps-dev:** update typescript-eslint monorepo to ^5.49.0 ([3d15478](https://github.com/wppconnect-team/wa-js/commit/3d15478))

### Chores

* **deps:** lock file maintenance ([ae61449](https://github.com/wppconnect-team/wa-js/commit/ae61449))
* Fixed 'npm run launch:protocol-log' command (fix #807) ([616728a](https://github.com/wppconnect-team/wa-js/commit/616728a)), closes [#807](https://github.com/wppconnect-team/wa-js/issues/807)
* Fixed GitHub workflow badge ([b47d5b8](https://github.com/wppconnect-team/wa-js/commit/b47d5b8))
* Update page title for Google Analytics ([2352a54](https://github.com/wppconnect-team/wa-js/commit/2352a54))
* Updated WhasApp group link ([70807ba](https://github.com/wppconnect-team/wa-js/commit/70807ba))

## <small>2.18.4 (2023-01-23)</small>

### Bug Fixes

* Fixed WPP.conn.getAuthCode function for WhatsApp >= 2.2301.5 ([357b62b](https://github.com/wppconnect-team/wa-js/commit/357b62b))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.230 ([bca7e75](https://github.com/wppconnect-team/wa-js/commit/bca7e75))

### Chores

* **deps:** lock file maintenance ([8bb8bde](https://github.com/wppconnect-team/wa-js/commit/8bb8bde))

## <small>2.18.3 (2023-01-20)</small>

### Features

* Added support to reject call for WhatsApp >= 2.2301.5 ([2aaf02c](https://github.com/wppconnect-team/wa-js/commit/2aaf02c))
* Extracted WapNode and wap functions ([3b5a323](https://github.com/wppconnect-team/wa-js/commit/3b5a323))

### Documentation

* Fixed type (close #873) ([6a0075a](https://github.com/wppconnect-team/wa-js/commit/6a0075a)), closes [#873](https://github.com/wppconnect-team/wa-js/issues/873)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.224 ([7e63e75](https://github.com/wppconnect-team/wa-js/commit/7e63e75))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.225 ([24562b5](https://github.com/wppconnect-team/wa-js/commit/24562b5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.227 ([f5f1290](https://github.com/wppconnect-team/wa-js/commit/f5f1290))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.228 ([f24ff8b](https://github.com/wppconnect-team/wa-js/commit/f24ff8b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.229 ([1df6899](https://github.com/wppconnect-team/wa-js/commit/1df6899))
* **deps-dev:** update dependency eslint to ^8.32.0 ([47a670a](https://github.com/wppconnect-team/wa-js/commit/47a670a))
* **deps-dev:** update dependency eslint-plugin-import to ^2.27.5 ([c96da20](https://github.com/wppconnect-team/wa-js/commit/c96da20))
* **deps-dev:** update dependency prettier to ^2.8.3 ([95f8d08](https://github.com/wppconnect-team/wa-js/commit/95f8d08))
* **deps-dev:** update typescript-eslint monorepo to ^5.48.2 ([6dfce08](https://github.com/wppconnect-team/wa-js/commit/6dfce08))

### Chores

* **deps:** lock file maintenance ([6d7089f](https://github.com/wppconnect-team/wa-js/commit/6d7089f))

## <small>2.18.2 (2023-01-13)</small>

### Features

* Added WPP.group.getAllGroups function (#859) ([75fb318](https://github.com/wppconnect-team/wa-js/commit/75fb318)), closes [#859](https://github.com/wppconnect-team/wa-js/issues/859)

### Bug Fixes

* Fixed hsm/template message is not flagging chat as unread ([3b9a84b](https://github.com/wppconnect-team/wa-js/commit/3b9a84b))
* Fixed server for link-preview (#861) ([7294dcb](https://github.com/wppconnect-team/wa-js/commit/7294dcb)), closes [#861](https://github.com/wppconnect-team/wa-js/issues/861)
* Fixed WPP.chat.mute function (close #849) (#860) ([55db3c3](https://github.com/wppconnect-team/wa-js/commit/55db3c3)), closes [#849](https://github.com/wppconnect-team/wa-js/issues/849) [#860](https://github.com/wppconnect-team/wa-js/issues/860)

### Build System

* **deps-dev:** update commitlint monorepo to ^17.4.2 ([175741d](https://github.com/wppconnect-team/wa-js/commit/175741d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.223 (#858) ([ce86b66](https://github.com/wppconnect-team/wa-js/commit/ce86b66)), closes [#858](https://github.com/wppconnect-team/wa-js/issues/858)
* **deps-dev:** update dependency eslint-plugin-import to ^2.27.4 (#856) ([d12d8ae](https://github.com/wppconnect-team/wa-js/commit/d12d8ae)), closes [#856](https://github.com/wppconnect-team/wa-js/issues/856)

### Chores

* Updated FUNDING.yml ([021a107](https://github.com/wppconnect-team/wa-js/commit/021a107))
* Updated FUNDING.yml ([216f263](https://github.com/wppconnect-team/wa-js/commit/216f263))

## <small>2.18.1 (2023-01-12)</small>

### Bug Fixes

* Disabled WPP.call.rejectCall function for WhatsApp >= 2.2301.5 ([3398baa](https://github.com/wppconnect-team/wa-js/commit/3398baa))
* Dropped support for live location events for WhatsApp >= 2.2301.5 ([d87367b](https://github.com/wppconnect-team/wa-js/commit/d87367b))
* Fixed group functions for WhatsApp >= 2.2301.5 ([69e5db5](https://github.com/wppconnect-team/wa-js/commit/69e5db5))
* Fixed WPP.chat.getMessages function for WhatsApp >= 2.2301.5 ([dee775a](https://github.com/wppconnect-team/wa-js/commit/dee775a))
* Fixed WPP.group.create function for WhatsApp >= 2.2301.5 ([aad5d3b](https://github.com/wppconnect-team/wa-js/commit/aad5d3b))

### Documentation

* Updated WhatsApp version reference ([2363c09](https://github.com/wppconnect-team/wa-js/commit/2363c09))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.4.0 ([8e24ad7](https://github.com/wppconnect-team/wa-js/commit/8e24ad7))
* **deps-dev:** update commitlint monorepo to ^17.4.1 ([84ca600](https://github.com/wppconnect-team/wa-js/commit/84ca600))
* **deps-dev:** update dependency @types/node to ^16.18.10 ([d784f72](https://github.com/wppconnect-team/wa-js/commit/d784f72))
* **deps-dev:** update dependency @types/node to ^16.18.11 ([ac1fe56](https://github.com/wppconnect-team/wa-js/commit/ac1fe56))
* **deps-dev:** update dependency @types/prettier to ^2.7.2 ([cd6a2d0](https://github.com/wppconnect-team/wa-js/commit/cd6a2d0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.214 ([8bd0cd8](https://github.com/wppconnect-team/wa-js/commit/8bd0cd8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.216 ([2e15797](https://github.com/wppconnect-team/wa-js/commit/2e15797))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.217 ([3e4371b](https://github.com/wppconnect-team/wa-js/commit/3e4371b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.218 ([120a4de](https://github.com/wppconnect-team/wa-js/commit/120a4de))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.219 ([08eb973](https://github.com/wppconnect-team/wa-js/commit/08eb973))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.221 ([989af9e](https://github.com/wppconnect-team/wa-js/commit/989af9e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.222 (#853) ([de6fcd2](https://github.com/wppconnect-team/wa-js/commit/de6fcd2)), closes [#853](https://github.com/wppconnect-team/wa-js/issues/853)
* **deps-dev:** update dependency eslint to ^8.30.0 ([c1996ec](https://github.com/wppconnect-team/wa-js/commit/c1996ec))
* **deps-dev:** update dependency eslint to ^8.31.0 ([fffda8f](https://github.com/wppconnect-team/wa-js/commit/fffda8f))
* **deps-dev:** update dependency eslint-config-prettier to ^8.6.0 ([43cfed7](https://github.com/wppconnect-team/wa-js/commit/43cfed7))
* **deps-dev:** update dependency husky to ^8.0.3 ([876867c](https://github.com/wppconnect-team/wa-js/commit/876867c))
* **deps-dev:** update dependency prettier to ^2.8.2 ([b771a31](https://github.com/wppconnect-team/wa-js/commit/b771a31))
* **deps-dev:** update dependency release-it to ^15.6.0 ([727c18a](https://github.com/wppconnect-team/wa-js/commit/727c18a))
* **deps-dev:** update dependency typedoc to ^0.23.23 ([cfee145](https://github.com/wppconnect-team/wa-js/commit/cfee145))
* **deps-dev:** update dependency typedoc to ^0.23.24 ([8b8bdbf](https://github.com/wppconnect-team/wa-js/commit/8b8bdbf))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^2.0.1 ([7adddd9](https://github.com/wppconnect-team/wa-js/commit/7adddd9))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to ^2.0.2 ([4459dc6](https://github.com/wppconnect-team/wa-js/commit/4459dc6))
* **deps-dev:** update playwright monorepo to ^1.29.0 ([b0cb51d](https://github.com/wppconnect-team/wa-js/commit/b0cb51d))
* **deps-dev:** update playwright monorepo to ^1.29.1 ([12937e1](https://github.com/wppconnect-team/wa-js/commit/12937e1))
* **deps-dev:** update playwright monorepo to ^1.29.2 ([4acb327](https://github.com/wppconnect-team/wa-js/commit/4acb327))
* **deps-dev:** update typescript-eslint monorepo to ^5.47.0 ([0ce7622](https://github.com/wppconnect-team/wa-js/commit/0ce7622))
* **deps-dev:** update typescript-eslint monorepo to ^5.47.1 ([a1d94ea](https://github.com/wppconnect-team/wa-js/commit/a1d94ea))
* **deps-dev:** update typescript-eslint monorepo to ^5.48.0 ([ac06b94](https://github.com/wppconnect-team/wa-js/commit/ac06b94))
* **deps-dev:** update typescript-eslint monorepo to ^5.48.1 ([c01d81f](https://github.com/wppconnect-team/wa-js/commit/c01d81f))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.6.0 ([8a9fbea](https://github.com/wppconnect-team/wa-js/commit/8a9fbea))

### Chores

* **deps:** lock file maintenance ([b9b3046](https://github.com/wppconnect-team/wa-js/commit/b9b3046))
* **deps:** lock file maintenance ([a557fac](https://github.com/wppconnect-team/wa-js/commit/a557fac))
* **deps:** lock file maintenance ([0050590](https://github.com/wppconnect-team/wa-js/commit/0050590))
* **deps:** lock file maintenance ([f642ef3](https://github.com/wppconnect-team/wa-js/commit/f642ef3))
* Fixed some exports ([d5a3fed](https://github.com/wppconnect-team/wa-js/commit/d5a3fed))

## 2.18.0 (2022-12-15)

### Features

* Added chat.poll_response event (#809) ([428dfa8](https://github.com/wppconnect-team/wa-js/commit/428dfa8)), closes [#809](https://github.com/wppconnect-team/wa-js/issues/809)
* Added WPP.chat.getReactions function (#811) ([422da5f](https://github.com/wppconnect-team/wa-js/commit/422da5f)), closes [#811](https://github.com/wppconnect-team/wa-js/issues/811)
* Added WPP.chat.getVotes function (#810) ([5b05beb](https://github.com/wppconnect-team/wa-js/commit/5b05beb)), closes [#810](https://github.com/wppconnect-team/wa-js/issues/810)

### Bug Fixes

* Fixed WPP.group.addParticipants return value ([3ed5e06](https://github.com/wppconnect-team/wa-js/commit/3ed5e06))
* Fixed WPP.group.create return value ([ae21561](https://github.com/wppconnect-team/wa-js/commit/ae21561))

### Documentation

* Added some docs for group functions ([c125b20](https://github.com/wppconnect-team/wa-js/commit/c125b20))

### Styles

* Fixed return for WPP.chat.getVotes and chat:poll_response event (#815) ([ecf9946](https://github.com/wppconnect-team/wa-js/commit/ecf9946)), closes [#815](https://github.com/wppconnect-team/wa-js/issues/815)

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.7 ([df28a68](https://github.com/wppconnect-team/wa-js/commit/df28a68))
* **deps-dev:** update dependency @types/node to ^16.18.8 ([3fa4007](https://github.com/wppconnect-team/wa-js/commit/3fa4007))
* **deps-dev:** update dependency @types/node to ^16.18.9 ([a90cf7e](https://github.com/wppconnect-team/wa-js/commit/a90cf7e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.206 ([615a8d2](https://github.com/wppconnect-team/wa-js/commit/615a8d2))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.207 ([88c8437](https://github.com/wppconnect-team/wa-js/commit/88c8437))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.208 ([2694bde](https://github.com/wppconnect-team/wa-js/commit/2694bde))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.209 ([82cb532](https://github.com/wppconnect-team/wa-js/commit/82cb532))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.211 ([9d4f407](https://github.com/wppconnect-team/wa-js/commit/9d4f407))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.212 ([7787279](https://github.com/wppconnect-team/wa-js/commit/7787279))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.213 (#814) ([cbc7208](https://github.com/wppconnect-team/wa-js/commit/cbc7208)), closes [#814](https://github.com/wppconnect-team/wa-js/issues/814)
* **deps-dev:** update dependency prettier to ^2.8.1 ([8906bd4](https://github.com/wppconnect-team/wa-js/commit/8906bd4))
* **deps-dev:** update dependency ts-morph to v17 (#766) ([7fd2397](https://github.com/wppconnect-team/wa-js/commit/7fd2397)), closes [#766](https://github.com/wppconnect-team/wa-js/issues/766)
* **deps-dev:** update dependency typedoc to ^0.23.22 ([50186fa](https://github.com/wppconnect-team/wa-js/commit/50186fa))
* **deps-dev:** update dependency typescript to ^4.9.4 ([f2c1af7](https://github.com/wppconnect-team/wa-js/commit/f2c1af7))
* **deps-dev:** update dependency webpack-cli to v5 (#761) ([ab6a523](https://github.com/wppconnect-team/wa-js/commit/ab6a523)), closes [#761](https://github.com/wppconnect-team/wa-js/issues/761)
* **deps-dev:** update typescript-eslint monorepo to ^5.46.0 ([1c59795](https://github.com/wppconnect-team/wa-js/commit/1c59795))
* **deps-dev:** update typescript-eslint monorepo to ^5.46.1 ([4c3b3c4](https://github.com/wppconnect-team/wa-js/commit/4c3b3c4))

### Chores

* **deps:** lock file maintenance ([3d6b533](https://github.com/wppconnect-team/wa-js/commit/3d6b533))

## 2.17.0 (2022-12-06)

### Features

* Added conn.main_init event ([1b1adf5](https://github.com/wppconnect-team/wa-js/commit/1b1adf5))
* Added WPP.conn.getHistorySyncProgress function ([9a47ef6](https://github.com/wppconnect-team/wa-js/commit/9a47ef6))
* Added WPP.conn.isMainInit function ([6840878](https://github.com/wppconnect-team/wa-js/commit/6840878))

### Bug Fixes

* Fixed compatibility with WhatsApp >= 2.2246.8 ([b69c09e](https://github.com/wppconnect-team/wa-js/commit/b69c09e))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.4 ([8a7499e](https://github.com/wppconnect-team/wa-js/commit/8a7499e))
* **deps-dev:** update dependency @types/node to ^16.18.6 ([972289a](https://github.com/wppconnect-team/wa-js/commit/972289a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.205 (#790) ([43d8538](https://github.com/wppconnect-team/wa-js/commit/43d8538)), closes [#790](https://github.com/wppconnect-team/wa-js/issues/790)
* **deps-dev:** update dependency eslint to ^8.29.0 ([0e4dfb2](https://github.com/wppconnect-team/wa-js/commit/0e4dfb2))
* **deps-dev:** update dependency release-it to ^15.5.1 ([fe3d0b1](https://github.com/wppconnect-team/wa-js/commit/fe3d0b1))
* **deps-dev:** update dependency ts-loader to ^9.4.2 ([37f5dbc](https://github.com/wppconnect-team/wa-js/commit/37f5dbc))
* **deps-dev:** update typescript-eslint monorepo to ^5.45.1 (#791) ([bfaa95c](https://github.com/wppconnect-team/wa-js/commit/bfaa95c)), closes [#791](https://github.com/wppconnect-team/wa-js/issues/791)

### Chores

* **deps:** lock file maintenance ([0a1fd42](https://github.com/wppconnect-team/wa-js/commit/0a1fd42))

## <small>2.16.3 (2022-12-01)</small>

### Features

* Exported isUnreadTypeMsg function ([864d060](https://github.com/wppconnect-team/wa-js/commit/864d060))

### Bug Fixes

* Fixed buttons/list reply is not flagging chat as unread (fix #768) ([3c3cd94](https://github.com/wppconnect-team/wa-js/commit/3c3cd94)), closes [#768](https://github.com/wppconnect-team/wa-js/issues/768)
* Fixed error in WPP.labels.getAllLabels (fix #780) ([63ec7bc](https://github.com/wppconnect-team/wa-js/commit/63ec7bc)), closes [#780](https://github.com/wppconnect-team/wa-js/issues/780)
* Fixed exported function getQuotedMsgObj ([db71920](https://github.com/wppconnect-team/wa-js/commit/db71920))
* Re-added server for link-preview ([645efc7](https://github.com/wppconnect-team/wa-js/commit/645efc7))
* Removed offline server for link-preview ([ba9560f](https://github.com/wppconnect-team/wa-js/commit/ba9560f))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.203 ([10bc6ed](https://github.com/wppconnect-team/wa-js/commit/10bc6ed))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.204 ([4894313](https://github.com/wppconnect-team/wa-js/commit/4894313))
* **deps-dev:** update dependency prettier to ^2.8.0 ([437399e](https://github.com/wppconnect-team/wa-js/commit/437399e))
* **deps-dev:** update playwright monorepo to ^1.28.1 ([528fa1a](https://github.com/wppconnect-team/wa-js/commit/528fa1a))
* **deps-dev:** update typescript-eslint monorepo to ^5.45.0 ([1b89457](https://github.com/wppconnect-team/wa-js/commit/1b89457))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.3.0 ([3b66fc9](https://github.com/wppconnect-team/wa-js/commit/3b66fc9))

### Chores

* **deps:** lock file maintenance ([9f62d2d](https://github.com/wppconnect-team/wa-js/commit/9f62d2d))

## <small>2.16.2 (2022-11-23)</small>

### Features

* Exported getQuotedMsgObj function ([9ea80a2](https://github.com/wppconnect-team/wa-js/commit/9ea80a2))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.3.0 ([b846a91](https://github.com/wppconnect-team/wa-js/commit/b846a91))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.201 (#770) ([966c594](https://github.com/wppconnect-team/wa-js/commit/966c594)), closes [#770](https://github.com/wppconnect-team/wa-js/issues/770)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.202 ([1372745](https://github.com/wppconnect-team/wa-js/commit/1372745))
* **deps-dev:** update typescript-eslint monorepo to ^5.44.0 ([f52a308](https://github.com/wppconnect-team/wa-js/commit/f52a308))

### Chores

* **deps:** lock file maintenance ([95af27a](https://github.com/wppconnect-team/wa-js/commit/95af27a))
* **deps:** lock file maintenance ([b389dd5](https://github.com/wppconnect-team/wa-js/commit/b389dd5))

## <small>2.16.1 (2022-11-21)</small>

### Bug Fixes

* Fixed DataCloneError error after WPP.contact.queryExists call ([fabe916](https://github.com/wppconnect-team/wa-js/commit/fabe916))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.200 ([fea5b67](https://github.com/wppconnect-team/wa-js/commit/fea5b67))

## 2.16.0 (2022-11-19)

### Features

* Added needsUpdate function/event (#763) ([f4e8ee0](https://github.com/wppconnect-team/wa-js/commit/f4e8ee0)), closes [#763](https://github.com/wppconnect-team/wa-js/issues/763)
* Added WPP.chat.editMessage ([c63dcd4](https://github.com/wppconnect-team/wa-js/commit/c63dcd4))
* Added WPP.chat.requestPhoneNumber function ([4723eac](https://github.com/wppconnect-team/wa-js/commit/4723eac))
* Exported getHistorySyncProgress function ([02ee36d](https://github.com/wppconnect-team/wa-js/commit/02ee36d))
* Exported WPP.whatsapp.canEditMessage ([746d349](https://github.com/wppconnect-team/wa-js/commit/746d349))

### Bug Fixes

* Fixed WPP.contact.queryExists for WhatsApp >= 2.2244.5 (fix #758) ([b5e8b3c](https://github.com/wppconnect-team/wa-js/commit/b5e8b3c)), closes [#758](https://github.com/wppconnect-team/wa-js/issues/758)
* Update the minimal version of WhatsApp WEB to 2.2230.9-beta ([968fca2](https://github.com/wppconnect-team/wa-js/commit/968fca2))

### Documentation

* Updated Wid methods ([85cac99](https://github.com/wppconnect-team/wa-js/commit/85cac99))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.192 ([a374eeb](https://github.com/wppconnect-team/wa-js/commit/a374eeb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.193 ([f74dc3e](https://github.com/wppconnect-team/wa-js/commit/f74dc3e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.195 ([9aa07cf](https://github.com/wppconnect-team/wa-js/commit/9aa07cf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.196 (#755) ([3fe11ff](https://github.com/wppconnect-team/wa-js/commit/3fe11ff)), closes [#755](https://github.com/wppconnect-team/wa-js/issues/755)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.197 ([de1b7de](https://github.com/wppconnect-team/wa-js/commit/de1b7de))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.198 ([8cea71e](https://github.com/wppconnect-team/wa-js/commit/8cea71e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.199 ([03cbcea](https://github.com/wppconnect-team/wa-js/commit/03cbcea))
* **deps-dev:** update dependency eslint to ^8.28.0 ([f8080c3](https://github.com/wppconnect-team/wa-js/commit/f8080c3))
* **deps-dev:** update dependency typedoc to ^0.23.21 ([922f6b6](https://github.com/wppconnect-team/wa-js/commit/922f6b6))
* **deps-dev:** update dependency typescript to ^4.9.3 ([346fe80](https://github.com/wppconnect-team/wa-js/commit/346fe80))
* **deps-dev:** update playwright monorepo to ^1.28.0 ([376f99f](https://github.com/wppconnect-team/wa-js/commit/376f99f))
* **deps-dev:** update typescript-eslint monorepo to ^5.43.0 ([e017054](https://github.com/wppconnect-team/wa-js/commit/e017054))

### Continuous Integration

* Fixed deprecated set-output command ([58a4fbb](https://github.com/wppconnect-team/wa-js/commit/58a4fbb))

### Chores

* Added fallback for exported function canEditMessage ([0a0b80a](https://github.com/wppconnect-team/wa-js/commit/0a0b80a))
* **deps:** lock file maintenance ([d57d784](https://github.com/wppconnect-team/wa-js/commit/d57d784))
* Ensure console.error for WhatsApp errors ([525045a](https://github.com/wppconnect-team/wa-js/commit/525045a))
* Fix typescript compatibility ([137a851](https://github.com/wppconnect-team/wa-js/commit/137a851))
* Fixed editMessage function ([6b700b7](https://github.com/wppconnect-team/wa-js/commit/6b700b7))

## <small>2.15.2 (2022-11-12)</small>

### Bug Fixes

* Fixed quoted message response (fix #737) ([c7ddbfd](https://github.com/wppconnect-team/wa-js/commit/c7ddbfd)), closes [#737](https://github.com/wppconnect-team/wa-js/issues/737)

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.190 ([14ebb5d](https://github.com/wppconnect-team/wa-js/commit/14ebb5d))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.191 ([befa1e1](https://github.com/wppconnect-team/wa-js/commit/befa1e1))
* **deps-dev:** update dependency husky to ^8.0.2 ([9b351d5](https://github.com/wppconnect-team/wa-js/commit/9b351d5))
* **deps-dev:** update dependency webpack to ^5.75.0 ([c2a71c5](https://github.com/wppconnect-team/wa-js/commit/c2a71c5))

## <small>2.15.1 (2022-11-08)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp >= 2.2243.5 ([018ab61](https://github.com/wppconnect-team/wa-js/commit/018ab61))
* Fixed exportModule loop ([e617fe5](https://github.com/wppconnect-team/wa-js/commit/e617fe5))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.189 (#743) ([686be73](https://github.com/wppconnect-team/wa-js/commit/686be73)), closes [#743](https://github.com/wppconnect-team/wa-js/issues/743)
* **deps-dev:** update typescript-eslint monorepo to ^5.42.1 ([6a0ab71](https://github.com/wppconnect-team/wa-js/commit/6a0ab71))

### Continuous Integration

* Use only minor release to test ([c32b011](https://github.com/wppconnect-team/wa-js/commit/c32b011))

### Chores

* **deps:** lock file maintenance ([04fbc7b](https://github.com/wppconnect-team/wa-js/commit/04fbc7b))

## 2.15.0 (2022-11-07)

### Features

* Added WPP.chat.forwardMessage function (#603) ([afe5ac3](https://github.com/wppconnect-team/wa-js/commit/afe5ac3)), closes [#603](https://github.com/wppconnect-team/wa-js/issues/603)
* Added WPP.chat.getMessageACK function (close #697) ([ffc378f](https://github.com/wppconnect-team/wa-js/commit/ffc378f)), closes [#697](https://github.com/wppconnect-team/wa-js/issues/697)
* Exported MsgInfoParticipantCollection and MsgInfoParticipantModel ([35011b4](https://github.com/wppconnect-team/wa-js/commit/35011b4))

### Bug Fixes

* Fixed export of ParticipantCollection ([95787bc](https://github.com/wppconnect-team/wa-js/commit/95787bc))
* Fixed msg id on change:ack event for groups ([1170848](https://github.com/wppconnect-team/wa-js/commit/1170848))
* Fixed WPP.chat.sendFileMessage for animated stickers (fix #432) ([6c69da7](https://github.com/wppconnect-team/wa-js/commit/6c69da7)), closes [#432](https://github.com/wppconnect-team/wa-js/issues/432)

### Documentation

* Fixed WPP.contact.getProfilePictureUrl example ([9b50365](https://github.com/wppconnect-team/wa-js/commit/9b50365))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.185 ([f57de51](https://github.com/wppconnect-team/wa-js/commit/f57de51))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.186 ([ee779e3](https://github.com/wppconnect-team/wa-js/commit/ee779e3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.187 ([413fb3b](https://github.com/wppconnect-team/wa-js/commit/413fb3b))
* **deps-dev:** update dependency eslint to ^8.27.0 ([a8ffa50](https://github.com/wppconnect-team/wa-js/commit/a8ffa50))
* **deps-dev:** update dependency typedoc to ^0.23.20 ([9adb25c](https://github.com/wppconnect-team/wa-js/commit/9adb25c))

## <small>2.14.1 (2022-11-01)</small>

### Bug Fixes

* Fixed WPP.chat.getMessageById (fix #728) ([1a806b9](https://github.com/wppconnect-team/wa-js/commit/1a806b9)), closes [#728](https://github.com/wppconnect-team/wa-js/issues/728)
* Fixed WPP.chat.starMessage function (fix #729) ([bfa6969](https://github.com/wppconnect-team/wa-js/commit/bfa6969)), closes [#729](https://github.com/wppconnect-team/wa-js/issues/729)

### Build System

* **deps-dev:** update commitlint monorepo to ^17.2.0 ([48fac89](https://github.com/wppconnect-team/wa-js/commit/48fac89))
* **deps-dev:** update dependency @types/node to ^16.18.3 ([7432f0a](https://github.com/wppconnect-team/wa-js/commit/7432f0a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.183 ([dc14a5e](https://github.com/wppconnect-team/wa-js/commit/dc14a5e))
* **deps-dev:** update typescript-eslint monorepo to ^5.42.0 ([68d55ef](https://github.com/wppconnect-team/wa-js/commit/68d55ef))

### Chores

* **deps:** lock file maintenance ([c51edc8](https://github.com/wppconnect-team/wa-js/commit/c51edc8))

## 2.14.0 (2022-10-30)

### Features

* Added fallback for webpack modules ([b54a03b](https://github.com/wppconnect-team/wa-js/commit/b54a03b))
* Added WPP.chat.canReply function ([b10c648](https://github.com/wppconnect-team/wa-js/commit/b10c648))
* Added WPP.conn.isRegistered function ([44c4664](https://github.com/wppconnect-team/wa-js/commit/44c4664))

### Bug Fixes

* Fixed send message with quotedMsg (fix #721) ([0931800](https://github.com/wppconnect-team/wa-js/commit/0931800)), closes [#721](https://github.com/wppconnect-team/wa-js/issues/721)
* Removed offline server for link preview ([c8e8f2e](https://github.com/wppconnect-team/wa-js/commit/c8e8f2e))

### Build System

* **deps-dev:** update dependency @types/node to ^16.18.1 ([a3ad190](https://github.com/wppconnect-team/wa-js/commit/a3ad190))
* **deps-dev:** update dependency @types/node to ^16.18.2 ([fc786cc](https://github.com/wppconnect-team/wa-js/commit/fc786cc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.181 ([f85d22c](https://github.com/wppconnect-team/wa-js/commit/f85d22c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.182 ([f3e63a0](https://github.com/wppconnect-team/wa-js/commit/f3e63a0))
* **deps-dev:** update dependency typedoc to ^0.23.19 ([87870b2](https://github.com/wppconnect-team/wa-js/commit/87870b2))

## <small>2.13.4 (2022-10-25)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp >= 2.2241.6 ([2d26a83](https://github.com/wppconnect-team/wa-js/commit/2d26a83))
* Fixed WPP.contact.queryExists function for WhatsApp WEB >= 2.2241.6 ([4005f36](https://github.com/wppconnect-team/wa-js/commit/4005f36))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.68 ([057a50e](https://github.com/wppconnect-team/wa-js/commit/057a50e))
* **deps-dev:** update dependency @types/node to ^16.18.0 ([59389d6](https://github.com/wppconnect-team/wa-js/commit/59389d6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.175 ([af21d9b](https://github.com/wppconnect-team/wa-js/commit/af21d9b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.176 ([a3a69e3](https://github.com/wppconnect-team/wa-js/commit/a3a69e3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.177 (#706) ([c75540d](https://github.com/wppconnect-team/wa-js/commit/c75540d)), closes [#706](https://github.com/wppconnect-team/wa-js/issues/706)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.178 ([475add5](https://github.com/wppconnect-team/wa-js/commit/475add5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.179 (#714) ([dd87d64](https://github.com/wppconnect-team/wa-js/commit/dd87d64)), closes [#714](https://github.com/wppconnect-team/wa-js/issues/714)
* **deps-dev:** update dependency eslint to ^8.26.0 ([a2af24b](https://github.com/wppconnect-team/wa-js/commit/a2af24b))
* **deps-dev:** update dependency typedoc to ^0.23.17 ([33acf28](https://github.com/wppconnect-team/wa-js/commit/33acf28))
* **deps-dev:** update dependency typedoc to ^0.23.18 ([ec98a25](https://github.com/wppconnect-team/wa-js/commit/ec98a25))
* **deps-dev:** update typescript-eslint monorepo to ^5.41.0 ([ebea641](https://github.com/wppconnect-team/wa-js/commit/ebea641))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.2.2 ([8efc0ff](https://github.com/wppconnect-team/wa-js/commit/8efc0ff))

### Chores

* **deps:** lock file maintenance ([3fbd1e4](https://github.com/wppconnect-team/wa-js/commit/3fbd1e4))
* **deps:** lock file maintenance ([df25204](https://github.com/wppconnect-team/wa-js/commit/df25204))
* Use reverse order for version test ([9676e60](https://github.com/wppconnect-team/wa-js/commit/9676e60))

## <small>2.13.3 (2022-10-17)</small>

### Bug Fixes

* Fixed fetchLinkPreview function for WhatsApp >= 2.2240.5 ([9681357](https://github.com/wppconnect-team/wa-js/commit/9681357))
* Fixed generated message ID for groups ([aceeb89](https://github.com/wppconnect-team/wa-js/commit/aceeb89))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.66 ([afbeb6c](https://github.com/wppconnect-team/wa-js/commit/afbeb6c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.172 ([6d62e22](https://github.com/wppconnect-team/wa-js/commit/6d62e22))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.174 (#699) ([3061174](https://github.com/wppconnect-team/wa-js/commit/3061174)), closes [#699](https://github.com/wppconnect-team/wa-js/issues/699)
* **deps-dev:** update typescript-eslint monorepo to ^5.40.1 ([fa1da1d](https://github.com/wppconnect-team/wa-js/commit/fa1da1d))

## <small>2.13.2 (2022-10-13)</small>

### Features

* Added selectableCount option to WPP.chat.sendCreatePollMessage ([f6f3c9f](https://github.com/wppconnect-team/wa-js/commit/f6f3c9f))

### Bug Fixes

* Fixed WPP.chat.sendCreatePollMessage function ([b688d95](https://github.com/wppconnect-team/wa-js/commit/b688d95))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.65 ([248bbeb](https://github.com/wppconnect-team/wa-js/commit/248bbeb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.169 ([3f8e30e](https://github.com/wppconnect-team/wa-js/commit/3f8e30e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.170 ([bd56502](https://github.com/wppconnect-team/wa-js/commit/bd56502))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.171 ([84f4633](https://github.com/wppconnect-team/wa-js/commit/84f4633))
* **deps-dev:** update dependency typedoc to ^0.23.16 ([79adbc1](https://github.com/wppconnect-team/wa-js/commit/79adbc1))
* **deps-dev:** update playwright monorepo to ^1.27.1 ([8c56184](https://github.com/wppconnect-team/wa-js/commit/8c56184))
* **deps-dev:** update typescript-eslint monorepo to ^5.40.0 ([b14ab1a](https://github.com/wppconnect-team/wa-js/commit/b14ab1a))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.5.1 ([ea29fa8](https://github.com/wppconnect-team/wa-js/commit/ea29fa8))

### Chores

* Fixed wa-source with user-data-dir argument ([e9cf486](https://github.com/wppconnect-team/wa-js/commit/e9cf486))

## <small>2.13.1 (2022-10-10)</small>

### Bug Fixes

* Fixed unixTime function for WhatsApp < 2.2238.5 ([bf42f51](https://github.com/wppconnect-team/wa-js/commit/bf42f51))

### Build System

* **deps-dev:** update playwright monorepo to ^1.27.0 ([64b8109](https://github.com/wppconnect-team/wa-js/commit/64b8109))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.1.2 ([c9cf985](https://github.com/wppconnect-team/wa-js/commit/c9cf985))
* **deps:** update wagoid/commitlint-github-action action to v5.2.0 ([7c3a220](https://github.com/wppconnect-team/wa-js/commit/7c3a220))

### Chores

* **deps:** lock file maintenance ([44262ed](https://github.com/wppconnect-team/wa-js/commit/44262ed))

## 2.13.0 (2022-10-08)

### Features

* Exported unixTime and unixTimeMs functions ([5872e53](https://github.com/wppconnect-team/wa-js/commit/5872e53))

### Bug Fixes

* Fixed ACK enum for WhatsApp >= 2.2238.5 ([460f791](https://github.com/wppconnect-team/wa-js/commit/460f791))
* Fixed compatibility with WhatsApp >= 2.2238.5 ([28fd5f6](https://github.com/wppconnect-team/wa-js/commit/28fd5f6))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.60 ([cae3ac1](https://github.com/wppconnect-team/wa-js/commit/cae3ac1))
* **deps-dev:** update dependency @types/node to ^16.11.62 ([4e6d233](https://github.com/wppconnect-team/wa-js/commit/4e6d233))
* **deps-dev:** update dependency @types/node to ^16.11.63 ([68efbe5](https://github.com/wppconnect-team/wa-js/commit/68efbe5))
* **deps-dev:** update dependency @types/node to ^16.11.64 ([4cebb4d](https://github.com/wppconnect-team/wa-js/commit/4cebb4d))
* **deps-dev:** update dependency @types/prettier to ^2.7.1 ([2fd18c8](https://github.com/wppconnect-team/wa-js/commit/2fd18c8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.156 ([e10958b](https://github.com/wppconnect-team/wa-js/commit/e10958b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.157 ([4d3c44e](https://github.com/wppconnect-team/wa-js/commit/4d3c44e))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.158 ([2a3ce2a](https://github.com/wppconnect-team/wa-js/commit/2a3ce2a))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.159 ([2dd2dbc](https://github.com/wppconnect-team/wa-js/commit/2dd2dbc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.160 ([1aa4638](https://github.com/wppconnect-team/wa-js/commit/1aa4638))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.161 ([7adaedd](https://github.com/wppconnect-team/wa-js/commit/7adaedd))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.163 ([3119a4c](https://github.com/wppconnect-team/wa-js/commit/3119a4c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.164 ([bc03aed](https://github.com/wppconnect-team/wa-js/commit/bc03aed))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.165 ([ccc1e1b](https://github.com/wppconnect-team/wa-js/commit/ccc1e1b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.168 (#679) ([5005d17](https://github.com/wppconnect-team/wa-js/commit/5005d17)), closes [#679](https://github.com/wppconnect-team/wa-js/issues/679)
* **deps-dev:** update dependency eslint to ^8.24.0 ([64a5f56](https://github.com/wppconnect-team/wa-js/commit/64a5f56))
* **deps-dev:** update dependency eslint to ^8.25.0 (#682) ([86344cb](https://github.com/wppconnect-team/wa-js/commit/86344cb)), closes [#682](https://github.com/wppconnect-team/wa-js/issues/682)
* **deps-dev:** update dependency release-it to ^15.4.3 ([b02be1b](https://github.com/wppconnect-team/wa-js/commit/b02be1b))
* **deps-dev:** update dependency release-it to ^15.5.0 ([fbcd986](https://github.com/wppconnect-team/wa-js/commit/fbcd986))
* **deps-dev:** update dependency ts-loader to ^9.4.0 ([25c7b16](https://github.com/wppconnect-team/wa-js/commit/25c7b16))
* **deps-dev:** update dependency ts-loader to ^9.4.1 ([5d596a6](https://github.com/wppconnect-team/wa-js/commit/5d596a6))
* **deps-dev:** update dependency typedoc to ^0.23.15 ([aa6a83b](https://github.com/wppconnect-team/wa-js/commit/aa6a83b))
* **deps-dev:** update dependency typescript to ^4.8.4 ([1f2c2ef](https://github.com/wppconnect-team/wa-js/commit/1f2c2ef))
* **deps-dev:** update playwright monorepo to ^1.26.0 ([bb17c52](https://github.com/wppconnect-team/wa-js/commit/bb17c52))
* **deps-dev:** update playwright monorepo to ^1.26.1 ([d97d9d7](https://github.com/wppconnect-team/wa-js/commit/d97d9d7))
* **deps-dev:** update typescript-eslint monorepo to ^5.38.0 ([dd5232a](https://github.com/wppconnect-team/wa-js/commit/dd5232a))
* **deps-dev:** update typescript-eslint monorepo to ^5.38.1 ([b70f275](https://github.com/wppconnect-team/wa-js/commit/b70f275))
* **deps-dev:** update typescript-eslint monorepo to ^5.39.0 ([58f5ba5](https://github.com/wppconnect-team/wa-js/commit/58f5ba5))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.5.0 ([6fd8117](https://github.com/wppconnect-team/wa-js/commit/6fd8117))

### Chores

* **deps:** lock file maintenance ([011abdd](https://github.com/wppconnect-team/wa-js/commit/011abdd))
* **deps:** lock file maintenance ([2b560bb](https://github.com/wppconnect-team/wa-js/commit/2b560bb))
* **deps:** lock file maintenance (#649) ([4cabc0d](https://github.com/wppconnect-team/wa-js/commit/4cabc0d)), closes [#649](https://github.com/wppconnect-team/wa-js/issues/649)

## 2.12.0 (2022-09-17)

### Features

* Added WPP.conn.markAvailable and WPP.conn.markUnavailable functions ([019bd36](https://github.com/wppconnect-team/wa-js/commit/019bd36))

### Bug Fixes

* Fixed buttons rendering on WhatsApp WEB >= 2.2234.6 ([49e8311](https://github.com/wppconnect-team/wa-js/commit/49e8311))
* Fixed group metadata from chat list ([8b1dea1](https://github.com/wppconnect-team/wa-js/commit/8b1dea1))
* Fixed group.participant_changed event for WhatsApp >= 2.2234.6 (wppconnect-team/wppconnect#1330) ([b60a9b6](https://github.com/wppconnect-team/wa-js/commit/b60a9b6)), closes [wppconnect-team/wppconnect#1330](https://github.com/wppconnect-team/wppconnect/issues/1330)

### Build System

* **deps-dev:** update commitlint monorepo ([8c7241f](https://github.com/wppconnect-team/wa-js/commit/8c7241f))
* **deps-dev:** update commitlint monorepo to ^17.1.2 ([42db967](https://github.com/wppconnect-team/wa-js/commit/42db967))
* **deps-dev:** update dependency @types/node to ^16.11.59 (#640) ([be85486](https://github.com/wppconnect-team/wa-js/commit/be85486)), closes [#640](https://github.com/wppconnect-team/wa-js/issues/640)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.136 ([db12aea](https://github.com/wppconnect-team/wa-js/commit/db12aea))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.139 ([779ea92](https://github.com/wppconnect-team/wa-js/commit/779ea92))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.140 ([11d74f4](https://github.com/wppconnect-team/wa-js/commit/11d74f4))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.141 ([02235b6](https://github.com/wppconnect-team/wa-js/commit/02235b6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.142 ([f9db5bf](https://github.com/wppconnect-team/wa-js/commit/f9db5bf))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.143 ([96065d6](https://github.com/wppconnect-team/wa-js/commit/96065d6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.154 (#641) ([06d3c8c](https://github.com/wppconnect-team/wa-js/commit/06d3c8c)), closes [#641](https://github.com/wppconnect-team/wa-js/issues/641)
* **deps-dev:** update dependency eslint to ^8.23.0 ([fa20262](https://github.com/wppconnect-team/wa-js/commit/fa20262))
* **deps-dev:** update dependency eslint to ^8.23.1 (#642) ([132709b](https://github.com/wppconnect-team/wa-js/commit/132709b)), closes [#642](https://github.com/wppconnect-team/wa-js/issues/642)
* **deps-dev:** update dependency eslint-plugin-simple-import-sort to v8 (#639) ([695a311](https://github.com/wppconnect-team/wa-js/commit/695a311)), closes [#639](https://github.com/wppconnect-team/wa-js/issues/639)
* **deps-dev:** update dependency eventemitter2 to ^6.4.9 (#643) ([2eaa34c](https://github.com/wppconnect-team/wa-js/commit/2eaa34c)), closes [#643](https://github.com/wppconnect-team/wa-js/issues/643)
* **deps-dev:** update dependency release-it to ^15.4.1 ([180a1bf](https://github.com/wppconnect-team/wa-js/commit/180a1bf))
* **deps-dev:** update dependency release-it to ^15.4.2 (#644) ([85db7ef](https://github.com/wppconnect-team/wa-js/commit/85db7ef)), closes [#644](https://github.com/wppconnect-team/wa-js/issues/644)
* **deps-dev:** update dependency ts-morph to v16 (#638) ([a5c247a](https://github.com/wppconnect-team/wa-js/commit/a5c247a)), closes [#638](https://github.com/wppconnect-team/wa-js/issues/638)
* **deps-dev:** update dependency typedoc to ^0.23.12 ([8726aff](https://github.com/wppconnect-team/wa-js/commit/8726aff))
* **deps-dev:** update dependency typedoc to ^0.23.13 ([2aea511](https://github.com/wppconnect-team/wa-js/commit/2aea511))
* **deps-dev:** update dependency typedoc to ^0.23.14 (#645) ([e29996d](https://github.com/wppconnect-team/wa-js/commit/e29996d)), closes [#645](https://github.com/wppconnect-team/wa-js/issues/645)
* **deps-dev:** update dependency typedoc-plugin-missing-exports to v1 (#592) ([5ead5c8](https://github.com/wppconnect-team/wa-js/commit/5ead5c8)), closes [#592](https://github.com/wppconnect-team/wa-js/issues/592)
* **deps-dev:** update dependency typescript to ^4.8.3 (#646) ([6d841ae](https://github.com/wppconnect-team/wa-js/commit/6d841ae)), closes [#646](https://github.com/wppconnect-team/wa-js/issues/646)
* **deps-dev:** update playwright monorepo to ^1.25.2 (#647) ([7782b17](https://github.com/wppconnect-team/wa-js/commit/7782b17)), closes [#647](https://github.com/wppconnect-team/wa-js/issues/647)
* **deps-dev:** update typescript-eslint monorepo to ^5.36.0 ([8a57d1a](https://github.com/wppconnect-team/wa-js/commit/8a57d1a))
* **deps-dev:** update typescript-eslint monorepo to ^5.36.1 ([d55f89a](https://github.com/wppconnect-team/wa-js/commit/d55f89a))
* **deps-dev:** update typescript-eslint monorepo to ^5.37.0 (#648) ([bcc135f](https://github.com/wppconnect-team/wa-js/commit/bcc135f)), closes [#648](https://github.com/wppconnect-team/wa-js/issues/648)

### Chores

* **deps:** lock file maintenance ([8815b8c](https://github.com/wppconnect-team/wa-js/commit/8815b8c))

## <small>2.11.1 (2022-08-26)</small>

### Features

* Improved config ([51548d9](https://github.com/wppconnect-team/wa-js/commit/51548d9))

### Bug Fixes

* Fixed Google Analytics user properties ([73ab7cd](https://github.com/wppconnect-team/wa-js/commit/73ab7cd))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.49 ([2283f40](https://github.com/wppconnect-team/wa-js/commit/2283f40))
* **deps-dev:** update dependency @types/node to ^16.11.50 ([2a2738d](https://github.com/wppconnect-team/wa-js/commit/2a2738d))
* **deps-dev:** update dependency @types/node to ^16.11.51 (#607) ([92001e6](https://github.com/wppconnect-team/wa-js/commit/92001e6)), closes [#607](https://github.com/wppconnect-team/wa-js/issues/607)
* **deps-dev:** update dependency @types/node to ^16.11.52 ([12074d3](https://github.com/wppconnect-team/wa-js/commit/12074d3))
* **deps-dev:** update dependency @types/node to ^16.11.53 ([91ada17](https://github.com/wppconnect-team/wa-js/commit/91ada17))
* **deps-dev:** update dependency @types/node to ^16.11.54 ([41dbcb0](https://github.com/wppconnect-team/wa-js/commit/41dbcb0))
* **deps-dev:** update dependency @types/node to ^16.11.55 ([1a1ea6b](https://github.com/wppconnect-team/wa-js/commit/1a1ea6b))
* **deps-dev:** update dependency @types/node to ^16.11.56 ([c535152](https://github.com/wppconnect-team/wa-js/commit/c535152))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.129 (#600) ([1200067](https://github.com/wppconnect-team/wa-js/commit/1200067)), closes [#600](https://github.com/wppconnect-team/wa-js/issues/600)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.130 ([1f88389](https://github.com/wppconnect-team/wa-js/commit/1f88389))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.131 ([8fea18f](https://github.com/wppconnect-team/wa-js/commit/8fea18f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.133 ([208932b](https://github.com/wppconnect-team/wa-js/commit/208932b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.134 ([2570407](https://github.com/wppconnect-team/wa-js/commit/2570407))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.135 ([aa4c901](https://github.com/wppconnect-team/wa-js/commit/aa4c901))
* **deps-dev:** update dependency eslint to ^8.22.0 ([d89553f](https://github.com/wppconnect-team/wa-js/commit/d89553f))
* **deps-dev:** update dependency release-it to ^15.4.0 ([be6f4f7](https://github.com/wppconnect-team/wa-js/commit/be6f4f7))
* **deps-dev:** update dependency typedoc to ^0.23.11 ([87db4d3](https://github.com/wppconnect-team/wa-js/commit/87db4d3))
* **deps-dev:** update dependency typescript to ^4.8.2 ([818acda](https://github.com/wppconnect-team/wa-js/commit/818acda))
* **deps-dev:** update playwright monorepo to ^1.25.1 ([8f94825](https://github.com/wppconnect-team/wa-js/commit/8f94825))
* **deps-dev:** update typescript-eslint monorepo to ^5.33.1 ([29699ae](https://github.com/wppconnect-team/wa-js/commit/29699ae))
* **deps-dev:** update typescript-eslint monorepo to ^5.34.0 ([d2a7ddf](https://github.com/wppconnect-team/wa-js/commit/d2a7ddf))
* **deps-dev:** update typescript-eslint monorepo to ^5.35.1 ([819057a](https://github.com/wppconnect-team/wa-js/commit/819057a))

### Chores

* **deps:** lock file maintenance ([22e0ef7](https://github.com/wppconnect-team/wa-js/commit/22e0ef7))
* **deps:** lock file maintenance ([ed3297f](https://github.com/wppconnect-team/wa-js/commit/ed3297f))
* Improved config.update event ([1a47158](https://github.com/wppconnect-team/wa-js/commit/1a47158))
* Updated CHANGELOG.md ([c75e8ef](https://github.com/wppconnect-team/wa-js/commit/c75e8ef))

## 2.11.0 (2022-08-13)

### Features

* Added create, edit, and delete products functions (fix #442) ([8e8bb22](https://github.com/wppconnect-team/wa-js/commit/8e8bb22)), closes [#442](https://github.com/wppconnect-team/wa-js/issues/442)
* Added get, create, edit, and delete collections functions (fix #442) ([ef6192b](https://github.com/wppconnect-team/wa-js/commit/ef6192b)), closes [#442](https://github.com/wppconnect-team/wa-js/issues/442)
* Added option to get only media, url and docs for WPP.chat.getMessages ([a74ac3c](https://github.com/wppconnect-team/wa-js/commit/a74ac3c))
* Added WPP.catalog.getProductById function ([0b883a3](https://github.com/wppconnect-team/wa-js/commit/0b883a3))
* Added WPP.catalog.getProducts function ([f4d1716](https://github.com/wppconnect-team/wa-js/commit/f4d1716))
* Added WPP.catalog.setProductVisibility function ([d3a60e3](https://github.com/wppconnect-team/wa-js/commit/d3a60e3))
* Added WPP.catalog.updateCartEnabled function ([b70af87](https://github.com/wppconnect-team/wa-js/commit/b70af87))
* Added WPP.chat.canMarkPlayed function ([4149eec](https://github.com/wppconnect-team/wa-js/commit/4149eec))
* Added WPP.chat.getPlatformFromMessage function ([d0f41ee](https://github.com/wppconnect-team/wa-js/commit/d0f41ee))
* Added WPP.chat.markPlayed function ([c21941f](https://github.com/wppconnect-team/wa-js/commit/c21941f))
* Added WPP.contact.getBusinessProfile function ([5c8e57a](https://github.com/wppconnect-team/wa-js/commit/5c8e57a))
* Added WPP.labels.getLabelById function ([56767b4](https://github.com/wppconnect-team/wa-js/commit/56767b4))
* Added WPP.profile.editBusinessProfile function ([30f18b2](https://github.com/wppconnect-team/wa-js/commit/30f18b2))
* Added WPP.status.sendReadStatus ([a4587dc](https://github.com/wppconnect-team/wa-js/commit/a4587dc))
* Exported calculateFilehashFromBlob from WhatsApp ([c0c0772](https://github.com/wppconnect-team/wa-js/commit/c0c0772))
* Exported ProductCatalogSession from WhatsApp ([0aefe4c](https://github.com/wppconnect-team/wa-js/commit/0aefe4c))

### Bug Fixes

* Added support for reply status stories (#594) ([19b2729](https://github.com/wppconnect-team/wa-js/commit/19b2729)), closes [#594](https://github.com/wppconnect-team/wa-js/issues/594)
* Update minimum require Whatsapp version to >= 2.2212.4-beta ([bcb5f36](https://github.com/wppconnect-team/wa-js/commit/bcb5f36))

### Documentation

* Versions for whatsapp ([8f876c4](https://github.com/wppconnect-team/wa-js/commit/8f876c4))

### Styles

* Lint errors ([804c69c](https://github.com/wppconnect-team/wa-js/commit/804c69c))
* Lint errors ([1cc6acd](https://github.com/wppconnect-team/wa-js/commit/1cc6acd))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.48 ([5153e81](https://github.com/wppconnect-team/wa-js/commit/5153e81))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.125 ([f4746df](https://github.com/wppconnect-team/wa-js/commit/f4746df))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.126 ([517ca43](https://github.com/wppconnect-team/wa-js/commit/517ca43))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.127 ([503a437](https://github.com/wppconnect-team/wa-js/commit/503a437))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.128 ([7b1dd0d](https://github.com/wppconnect-team/wa-js/commit/7b1dd0d))
* **deps-dev:** update dependency release-it to ^15.3.0 ([58f7e1c](https://github.com/wppconnect-team/wa-js/commit/58f7e1c))
* **deps-dev:** update playwright monorepo to ^1.25.0 ([7a4ef2b](https://github.com/wppconnect-team/wa-js/commit/7a4ef2b))
* **deps-dev:** update typescript-eslint monorepo to ^5.33.0 ([3905657](https://github.com/wppconnect-team/wa-js/commit/3905657))

### Chores

* Fixed lint warning ([4c26c26](https://github.com/wppconnect-team/wa-js/commit/4c26c26))
* Fixed productVisibilitySet export ([e39317b](https://github.com/wppconnect-team/wa-js/commit/e39317b))

## <small>2.10.1 (2022-08-09)</small>

### Bug Fixes

* Fixed reply buttons send (useTemplateButtons: false) (fix #577) ([28f3682](https://github.com/wppconnect-team/wa-js/commit/28f3682)), closes [#577](https://github.com/wppconnect-team/wa-js/issues/577)

### Documentation

* Update whatsapp modules ID (2.2228.4) ([9bc3077](https://github.com/wppconnect-team/wa-js/commit/9bc3077))
* Update whatsapp modules ID (2.2230.8) ([b09589e](https://github.com/wppconnect-team/wa-js/commit/b09589e))

### Build System

* **deps-dev:** update dependency @types/prettier to ^2.7.0 ([db12914](https://github.com/wppconnect-team/wa-js/commit/db12914))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.123 ([2556485](https://github.com/wppconnect-team/wa-js/commit/2556485))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.124 (#579) ([e31dcec](https://github.com/wppconnect-team/wa-js/commit/e31dcec)), closes [#579](https://github.com/wppconnect-team/wa-js/issues/579)

### Continuous Integration

* Updated to node 16 ([f95d9f3](https://github.com/wppconnect-team/wa-js/commit/f95d9f3))

### Chores

* **deps:** lock file maintenance ([ee7cfd0](https://github.com/wppconnect-team/wa-js/commit/ee7cfd0))

## 2.10.0 (2022-08-04)

### Features

* Added isMainReady ([cd411bd](https://github.com/wppconnect-team/wa-js/commit/cd411bd))
* Added WPP.conn.getPlatform() ([03416b6](https://github.com/wppconnect-team/wa-js/commit/03416b6))
* Added WPP.profile.isBusiness() ([9433b9c](https://github.com/wppconnect-team/wa-js/commit/9433b9c))

### Bug Fixes

* Fixed buttons for latest WhatsApp (2.22.16.75) (fix #571) ([abfc9ad](https://github.com/wppconnect-team/wa-js/commit/abfc9ad)), closes [#571](https://github.com/wppconnect-team/wa-js/issues/571)
* Fixed list for latest WhatsApp (2.22.16.75) (fix #571) ([4cae69e](https://github.com/wppconnect-team/wa-js/commit/4cae69e)), closes [#571](https://github.com/wppconnect-team/wa-js/issues/571)
* onParticipantsChange operation/action ([ee28ace](https://github.com/wppconnect-team/wa-js/commit/ee28ace))

### Documentation

* Fix docs getPlatform ([e700dea](https://github.com/wppconnect-team/wa-js/commit/e700dea))
* Updated some docs ([60d013c](https://github.com/wppconnect-team/wa-js/commit/60d013c))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.117 ([5c734cc](https://github.com/wppconnect-team/wa-js/commit/5c734cc))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.119 ([a2bf4f5](https://github.com/wppconnect-team/wa-js/commit/a2bf4f5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.120 ([4546e43](https://github.com/wppconnect-team/wa-js/commit/4546e43))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.121 ([0c09002](https://github.com/wppconnect-team/wa-js/commit/0c09002))
* **deps-dev:** update dependency eslint to ^8.21.0 ([02153f1](https://github.com/wppconnect-team/wa-js/commit/02153f1))
* **deps-dev:** update dependency eventemitter2 to ^6.4.7 ([1ab61c3](https://github.com/wppconnect-team/wa-js/commit/1ab61c3))
* **deps-dev:** update dependency typedoc to ^0.23.10 ([6d83745](https://github.com/wppconnect-team/wa-js/commit/6d83745))
* **deps-dev:** update typescript-eslint monorepo to ^5.32.0 ([bfa0f8d](https://github.com/wppconnect-team/wa-js/commit/bfa0f8d))

### Chores

* **deps:** lock file maintenance ([a14f21e](https://github.com/wppconnect-team/wa-js/commit/a14f21e))

## 2.9.0 (2022-07-31)

### Features

* Added group.participant_changed event ([e24dcc2](https://github.com/wppconnect-team/wa-js/commit/e24dcc2))
* Added WPP.chat.getLastSeen function (#546) ([925920d](https://github.com/wppconnect-team/wa-js/commit/925920d)), closes [#546](https://github.com/wppconnect-team/wa-js/issues/546)
* Improved link-preview to try all available servers ([f728bcb](https://github.com/wppconnect-team/wa-js/commit/f728bcb))

### Bug Fixes

* Avoid duplicate self account for send status ([a7eef5b](https://github.com/wppconnect-team/wa-js/commit/a7eef5b))
* Fixed status/stores screen after send ([3fb61bd](https://github.com/wppconnect-team/wa-js/commit/3fb61bd))
* Fixed WPP.chat.sendLocationMessage function (wppconnect-team/wppconnect#1237) ([23b8cf3](https://github.com/wppconnect-team/wa-js/commit/23b8cf3)), closes [wppconnect-team/wppconnect#1237](https://github.com/wppconnect-team/wppconnect/issues/1237)
* Improved message key for status/stories ([87d28bf](https://github.com/wppconnect-team/wa-js/commit/87d28bf))
* Removed offline link-preview server ([1d10bab](https://github.com/wppconnect-team/wa-js/commit/1d10bab))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.44 ([7ff0a41](https://github.com/wppconnect-team/wa-js/commit/7ff0a41))
* **deps-dev:** update dependency @types/node to ^16.11.45 ([c36ef54](https://github.com/wppconnect-team/wa-js/commit/c36ef54))
* **deps-dev:** update dependency @types/node to ^16.11.46 ([b0470c5](https://github.com/wppconnect-team/wa-js/commit/b0470c5))
* **deps-dev:** update dependency @types/node to ^16.11.47 (#559) ([9a9828c](https://github.com/wppconnect-team/wa-js/commit/9a9828c)), closes [#559](https://github.com/wppconnect-team/wa-js/issues/559)
* **deps-dev:** update dependency @types/prettier to ^2.6.4 ([b5a38d6](https://github.com/wppconnect-team/wa-js/commit/b5a38d6))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.106 ([66869e5](https://github.com/wppconnect-team/wa-js/commit/66869e5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.107 ([ef68e54](https://github.com/wppconnect-team/wa-js/commit/ef68e54))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.108 ([aefe8f0](https://github.com/wppconnect-team/wa-js/commit/aefe8f0))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.109 ([fffeeb9](https://github.com/wppconnect-team/wa-js/commit/fffeeb9))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.110 ([20aafe5](https://github.com/wppconnect-team/wa-js/commit/20aafe5))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.111 ([f896b93](https://github.com/wppconnect-team/wa-js/commit/f896b93))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.112 ([8a63219](https://github.com/wppconnect-team/wa-js/commit/8a63219))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.113 ([c4d4acb](https://github.com/wppconnect-team/wa-js/commit/c4d4acb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.114 ([9b581c3](https://github.com/wppconnect-team/wa-js/commit/9b581c3))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.115 ([2ae3724](https://github.com/wppconnect-team/wa-js/commit/2ae3724))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.116 (#558) ([89debde](https://github.com/wppconnect-team/wa-js/commit/89debde)), closes [#558](https://github.com/wppconnect-team/wa-js/issues/558)
* **deps-dev:** update dependency eslint to ^8.20.0 ([a7b189f](https://github.com/wppconnect-team/wa-js/commit/a7b189f))
* **deps-dev:** update dependency file-type to ~16.5.4 ([1421528](https://github.com/wppconnect-team/wa-js/commit/1421528))
* **deps-dev:** update dependency release-it to ^15.1.2 ([75875dc](https://github.com/wppconnect-team/wa-js/commit/75875dc))
* **deps-dev:** update dependency release-it to ^15.1.3 ([8158801](https://github.com/wppconnect-team/wa-js/commit/8158801))
* **deps-dev:** update dependency release-it to ^15.1.4 ([804812e](https://github.com/wppconnect-team/wa-js/commit/804812e))
* **deps-dev:** update dependency release-it to ^15.2.0 ([d204676](https://github.com/wppconnect-team/wa-js/commit/d204676))
* **deps-dev:** update dependency ts-node to ^10.9.1 ([b6cbaa2](https://github.com/wppconnect-team/wa-js/commit/b6cbaa2))
* **deps-dev:** update dependency typedoc to ^0.23.8 ([6a60d49](https://github.com/wppconnect-team/wa-js/commit/6a60d49))
* **deps-dev:** update dependency typedoc to ^0.23.9 ([3180f41](https://github.com/wppconnect-team/wa-js/commit/3180f41))
* **deps-dev:** update dependency typedoc-plugin-mdn-links to v2 (#489) ([07506ce](https://github.com/wppconnect-team/wa-js/commit/07506ce)), closes [#489](https://github.com/wppconnect-team/wa-js/issues/489)
* **deps-dev:** update dependency webpack to ^5.74.0 ([d231c92](https://github.com/wppconnect-team/wa-js/commit/d231c92))
* **deps-dev:** update playwright monorepo to ^1.23.3 ([43742b1](https://github.com/wppconnect-team/wa-js/commit/43742b1))
* **deps-dev:** update playwright monorepo to ^1.23.4 ([61ee9b9](https://github.com/wppconnect-team/wa-js/commit/61ee9b9))
* **deps-dev:** update playwright monorepo to ^1.24.0 ([6e89299](https://github.com/wppconnect-team/wa-js/commit/6e89299))
* **deps-dev:** update playwright monorepo to ^1.24.1 ([671256f](https://github.com/wppconnect-team/wa-js/commit/671256f))
* **deps-dev:** update playwright monorepo to ^1.24.2 ([1749df0](https://github.com/wppconnect-team/wa-js/commit/1749df0))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.7 ([afd3dd6](https://github.com/wppconnect-team/wa-js/commit/afd3dd6))
* **deps-dev:** update typescript-eslint monorepo to ^5.31.0 ([1c1ebb9](https://github.com/wppconnect-team/wa-js/commit/1c1ebb9))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.4.1 ([f2f243f](https://github.com/wppconnect-team/wa-js/commit/f2f243f))

### Chores

* Added track exception for google analytics ([4f184ae](https://github.com/wppconnect-team/wa-js/commit/4f184ae))
* **deps:** lock file maintenance ([84586bb](https://github.com/wppconnect-team/wa-js/commit/84586bb))
* **deps:** lock file maintenance ([8e30333](https://github.com/wppconnect-team/wa-js/commit/8e30333))
* Exported randomHex function ([b2783d1](https://github.com/wppconnect-team/wa-js/commit/b2783d1))
* Fixed compability for whatsapp < 2.2224.6 ([62f90ef](https://github.com/wppconnect-team/wa-js/commit/62f90ef))

## <small>2.8.2 (2022-07-12)</small>

### Bug Fixes

* Fixed eventEmitter export ([2532a20](https://github.com/wppconnect-team/wa-js/commit/2532a20))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.104 ([c49c3fb](https://github.com/wppconnect-team/wa-js/commit/c49c3fb))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.105 ([1be5630](https://github.com/wppconnect-team/wa-js/commit/1be5630))
* **deps-dev:** update dependency typedoc to ^0.23.7 ([9f96957](https://github.com/wppconnect-team/wa-js/commit/9f96957))
* **deps-dev:** update playwright monorepo to ^1.23.2 ([d2fd9ed](https://github.com/wppconnect-team/wa-js/commit/d2fd9ed))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.5 ([79805aa](https://github.com/wppconnect-team/wa-js/commit/79805aa))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.6 ([b445c34](https://github.com/wppconnect-team/wa-js/commit/b445c34))

### Continuous Integration

* **deps:** update actions/setup-node action to v3.4.0 ([40f6650](https://github.com/wppconnect-team/wa-js/commit/40f6650))

### Chores

* **deps:** lock file maintenance ([7bd51c7](https://github.com/wppconnect-team/wa-js/commit/7bd51c7))

## <small>2.8.1 (2022-07-11)</small>

### Features

* Trigger chat.new_message event for ciphertext msg after sync ([3338cce](https://github.com/wppconnect-team/wa-js/commit/3338cce))

### Bug Fixes

* Fixed chat.live_location_update event when there are a current shared location ([085a719](https://github.com/wppconnect-team/wa-js/commit/085a719))
* Fixed chat.msg_ack_change event to ignore non my messages ([78e5d49](https://github.com/wppconnect-team/wa-js/commit/78e5d49))
* Fixed WPP.chat.markIsUnread function (wppconnect-team/wppconnect#1196) ([db7195e](https://github.com/wppconnect-team/wa-js/commit/db7195e)), closes [wppconnect-team/wppconnect#1196](https://github.com/wppconnect-team/wppconnect/issues/1196)
* Improved chat.presence_change event to use queueMicrotask ([34dd0d6](https://github.com/wppconnect-team/wa-js/commit/34dd0d6))
* Update status v3 contacts before send ([96fa79b](https://github.com/wppconnect-team/wa-js/commit/96fa79b))
* Use non obstructive trigger for chat.new_message event ([07316fb](https://github.com/wppconnect-team/wa-js/commit/07316fb))

### Documentation

* Update whatsapp modules ID ([dfb56b6](https://github.com/wppconnect-team/wa-js/commit/dfb56b6))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.42 ([eb859ac](https://github.com/wppconnect-team/wa-js/commit/eb859ac))
* **deps-dev:** update dependency @types/node to ^16.11.43 ([7be642f](https://github.com/wppconnect-team/wa-js/commit/7be642f))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.100 ([ec7a755](https://github.com/wppconnect-team/wa-js/commit/ec7a755))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.99 ([8682bcf](https://github.com/wppconnect-team/wa-js/commit/8682bcf))
* **deps-dev:** update dependency eslint to ^8.19.0 ([438eeb4](https://github.com/wppconnect-team/wa-js/commit/438eeb4))
* **deps-dev:** update dependency eslint-plugin-prettier to ^4.2.1 ([4af8801](https://github.com/wppconnect-team/wa-js/commit/4af8801))
* **deps-dev:** update dependency eventemitter2 to ^6.4.6 ([b5f88e9](https://github.com/wppconnect-team/wa-js/commit/b5f88e9))
* **deps-dev:** update dependency release-it to ^15.1.1 ([091d0c4](https://github.com/wppconnect-team/wa-js/commit/091d0c4))
* **deps-dev:** update dependency ts-node to ^10.8.2 ([3e31551](https://github.com/wppconnect-team/wa-js/commit/3e31551))
* **deps-dev:** update dependency typedoc to ^0.23.2 ([115e2ad](https://github.com/wppconnect-team/wa-js/commit/115e2ad))
* **deps-dev:** update dependency typedoc to ^0.23.3 ([8be3b13](https://github.com/wppconnect-team/wa-js/commit/8be3b13))
* **deps-dev:** update dependency typedoc to ^0.23.4 ([1fd7433](https://github.com/wppconnect-team/wa-js/commit/1fd7433))
* **deps-dev:** update dependency typedoc to ^0.23.5 ([ef4850a](https://github.com/wppconnect-team/wa-js/commit/ef4850a))
* **deps-dev:** update playwright monorepo to ^1.23.1 ([8f42827](https://github.com/wppconnect-team/wa-js/commit/8f42827))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.3 ([ed1819b](https://github.com/wppconnect-team/wa-js/commit/ed1819b))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.4 ([a1eeff9](https://github.com/wppconnect-team/wa-js/commit/a1eeff9))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5.0.2 ([2c46c9f](https://github.com/wppconnect-team/wa-js/commit/2c46c9f))

## 2.8.0 (2022-06-28)

### Features

* Added googleAnalyticsUserProperty options ([f425767](https://github.com/wppconnect-team/wa-js/commit/f425767))
* Added WPP.group.setIcon function ([79b0c76](https://github.com/wppconnect-team/wa-js/commit/79b0c76))
* Added WPP.profile.setMyProfilePicture ([3d773b7](https://github.com/wppconnect-team/wa-js/commit/3d773b7))
* Added WPP.status.sendImageStatus function ([2814ef3](https://github.com/wppconnect-team/wa-js/commit/2814ef3))
* Added WPP.status.sendVideoStatus function ([46bb3dc](https://github.com/wppconnect-team/wa-js/commit/46bb3dc))

### Bug Fixes

* Added missing data WPP.status.sendTextStatus ([521c6f2](https://github.com/wppconnect-team/wa-js/commit/521c6f2))
* Improved participant list for send status ([55cd0a4](https://github.com/wppconnect-team/wa-js/commit/55cd0a4))

### Build System

* **deps-dev:** update commitlint monorepo to ^17.0.3 ([c69389c](https://github.com/wppconnect-team/wa-js/commit/c69389c))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.98 ([3aa412b](https://github.com/wppconnect-team/wa-js/commit/3aa412b))
* **deps-dev:** update dependency eslint-plugin-prettier to ^4.1.0 ([f90aa74](https://github.com/wppconnect-team/wa-js/commit/f90aa74))
* **deps-dev:** update dependency release-it to ^15.1.0 ([d2becd4](https://github.com/wppconnect-team/wa-js/commit/d2becd4))
* **deps-dev:** update dependency ts-loader to ^9.3.1 ([ab073e3](https://github.com/wppconnect-team/wa-js/commit/ab073e3))
* **deps-dev:** update dependency typedoc to ^0.22.18 ([3e069bf](https://github.com/wppconnect-team/wa-js/commit/3e069bf))
* **deps-dev:** update dependency typedoc to ^0.23.1 ([5a9f547](https://github.com/wppconnect-team/wa-js/commit/5a9f547))
* **deps-dev:** update dependency typedoc-plugin-missing-exports to ^0.23.0 ([58ff9af](https://github.com/wppconnect-team/wa-js/commit/58ff9af))
* **deps-dev:** update playwright monorepo to ^1.23.0 ([2b40931](https://github.com/wppconnect-team/wa-js/commit/2b40931))
* **deps-dev:** update typescript-eslint monorepo to ^5.29.0 ([99be633](https://github.com/wppconnect-team/wa-js/commit/99be633))
* **deps-dev:** update typescript-eslint monorepo to ^5.30.0 ([69faa2b](https://github.com/wppconnect-team/wa-js/commit/69faa2b))

### Chores

* **deps:** lock file maintenance ([56c4d13](https://github.com/wppconnect-team/wa-js/commit/56c4d13))
* Fixed send status ([a30f3dc](https://github.com/wppconnect-team/wa-js/commit/a30f3dc))

## <small>2.7.3 (2022-06-18)</small>

### Bug Fixes

* Fixed mentionedList detection (fix #473) ([5479679](https://github.com/wppconnect-team/wa-js/commit/5479679)), closes [#473](https://github.com/wppconnect-team/wa-js/issues/473)
* Fixed the return for WPP.contact.getStatus function ([ac02d5a](https://github.com/wppconnect-team/wa-js/commit/ac02d5a))
* Fixed the return for WPP.group.addParticipants function ([7f01c85](https://github.com/wppconnect-team/wa-js/commit/7f01c85))
* Throw error for invalid media type (wppconnect-team/wppconnect#1164) ([0481c8b](https://github.com/wppconnect-team/wa-js/commit/0481c8b)), closes [wppconnect-team/wppconnect#1164](https://github.com/wppconnect-team/wppconnect/issues/1164)

### Documentation

* Update whatsapp modules ID ([26840ab](https://github.com/wppconnect-team/wa-js/commit/26840ab))

### Build System

* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.97 ([14063b3](https://github.com/wppconnect-team/wa-js/commit/14063b3))
* **deps-dev:** update dependency eslint to ^8.18.0 ([4219487](https://github.com/wppconnect-team/wa-js/commit/4219487))
* **deps-dev:** update dependency typescript to ^4.7.4 ([7e4a267](https://github.com/wppconnect-team/wa-js/commit/7e4a267))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v5 (#467) ([6f6d969](https://github.com/wppconnect-team/wa-js/commit/6f6d969)), closes [#467](https://github.com/wppconnect-team/wa-js/issues/467)

### Chores

* Set base64 in the browser from media directory ([bf8e20a](https://github.com/wppconnect-team/wa-js/commit/bf8e20a))

## <small>2.7.2 (2022-06-17)</small>

### Features

* add optional link preview servers via config ([4f7ac41](https://github.com/wppconnect-team/wa-js/commit/4f7ac41))
* Usage Google Analytics optional, can set own GA track id ([19079d7](https://github.com/wppconnect-team/wa-js/commit/19079d7))

### Bug Fixes

* Fixed group creation when you have your own number in the list ([4b76f5a](https://github.com/wppconnect-team/wa-js/commit/4b76f5a))
* Improved Google Analytics tracker ([e51a542](https://github.com/wppconnect-team/wa-js/commit/e51a542))
* lint: sort imports ([23fde0d](https://github.com/wppconnect-team/wa-js/commit/23fde0d))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.40 ([d43833f](https://github.com/wppconnect-team/wa-js/commit/d43833f))
* **deps-dev:** update dependency @types/node to ^16.11.41 ([289f009](https://github.com/wppconnect-team/wa-js/commit/289f009))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.95 ([8fd148b](https://github.com/wppconnect-team/wa-js/commit/8fd148b))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.96 ([a7e83af](https://github.com/wppconnect-team/wa-js/commit/a7e83af))
* **deps-dev:** update dependency prettier to ^2.7.0 ([9ae03b2](https://github.com/wppconnect-team/wa-js/commit/9ae03b2))
* **deps-dev:** update dependency prettier to ^2.7.1 ([8f8be92](https://github.com/wppconnect-team/wa-js/commit/8f8be92))

### Continuous Integration

* **deps:** update wagoid/commitlint-github-action action to v4.1.15 ([728ee7d](https://github.com/wppconnect-team/wa-js/commit/728ee7d))

## <small>2.7.1 (2022-06-15)</small>

### Chores

* Fix var name ([c301779](https://github.com/wppconnect-team/wa-js/commit/c301779))

## 2.7.0 (2022-06-15)

### Features

* Added Google Analytics ([946cc80](https://github.com/wppconnect-team/wa-js/commit/946cc80))
* Added WPP.call.rejectCall function ([4461cb0](https://github.com/wppconnect-team/wa-js/commit/4461cb0))
* Added WPP.catalog.getMyCatalog function ([7922931](https://github.com/wppconnect-team/wa-js/commit/7922931))
* Aded call.incoming_call event ([e318902](https://github.com/wppconnect-team/wa-js/commit/e318902))

### Bug Fixes

* Fixed compatibility with WhatsApp Web >= 2.2222.8 ([a1d994c](https://github.com/wppconnect-team/wa-js/commit/a1d994c))
* Return undefined instead of throw an exception ([817592b](https://github.com/wppconnect-team/wa-js/commit/817592b))

### Documentation

* Improved docs of 'call.incoming_call' event ([77f625c](https://github.com/wppconnect-team/wa-js/commit/77f625c))
* **whatsapp:** Exported CALL_STATES enum ([27c8a76](https://github.com/wppconnect-team/wa-js/commit/27c8a76))

### Build System

* **deps-dev:** update dependency @types/node to ^16.11.39 (#454) ([c3b7cbf](https://github.com/wppconnect-team/wa-js/commit/c3b7cbf)), closes [#454](https://github.com/wppconnect-team/wa-js/issues/454)
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.92 ([da72548](https://github.com/wppconnect-team/wa-js/commit/da72548))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.93 ([1114bc8](https://github.com/wppconnect-team/wa-js/commit/1114bc8))
* **deps-dev:** update dependency @wppconnect/wa-version to ^1.1.94 ([4cda56e](https://github.com/wppconnect-team/wa-js/commit/4cda56e))
* **deps-dev:** update dependency typedoc to ^0.22.17 (#452) ([4e841db](https://github.com/wppconnect-team/wa-js/commit/4e841db)), closes [#452](https://github.com/wppconnect-team/wa-js/issues/452)
* **deps-dev:** update dependency webpack-cli to ^4.10.0 ([688564e](https://github.com/wppconnect-team/wa-js/commit/688564e))
* **deps-dev:** update typescript-eslint monorepo to ^5.27.1 ([2e39327](https://github.com/wppconnect-team/wa-js/commit/2e39327))
* **deps-dev:** update typescript-eslint monorepo to ^5.28.0 ([8163c5b](https://github.com/wppconnect-team/wa-js/commit/8163c5b))

### Continuous Integration

* Updated renovatebot config ([10691f5](https://github.com/wppconnect-team/wa-js/commit/10691f5))

### Chores

* **deps:** lock file maintenance ([624a758](https://github.com/wppconnect-team/wa-js/commit/624a758))
* Updated license year ([652c46f](https://github.com/wppconnect-team/wa-js/commit/652c46f))


### BREAKING CHANGE

* Now "not found module" will return undefined value instead of throw an exception

## 2.6.0 (2022-06-08)

### Features

* Added option onlyUnread for WPP.chat.getMessages function ([550a66f](https://github.com/wppconnect-team/wa-js/commit/550a66f))
* Added WPP.conn.isMainReady function ([66734d2](https://github.com/wppconnect-team/wa-js/commit/66734d2))

### Bug Fixes

* Fixed doc type for WPP.chat.sendFileMessage ([7701d88](https://github.com/wppconnect-team/wa-js/commit/7701d88))

### Build System

* **deps-dev:** update dependency @types/node to v16 (#449) ([ea6617e](https://github.com/wppconnect-team/wa-js/commit/ea6617e)), closes [#449](https://github.com/wppconnect-team/wa-js/issues/449)

### Continuous Integration

* Migrated to renovatebot ([e92e2bc](https://github.com/wppconnect-team/wa-js/commit/e92e2bc))

### Chores

* Added .npmrc ([2f57a47](https://github.com/wppconnect-team/wa-js/commit/2f57a47))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.89 to 1.1.90 (#447) ([7eb2ebe](https://github.com/wppconnect-team/wa-js/commit/7eb2ebe)), closes [#447](https://github.com/wppconnect-team/wa-js/issues/447)
* **deps-dev:** Bump eslint from 8.16.0 to 8.17.0 (#448) ([0aca759](https://github.com/wppconnect-team/wa-js/commit/0aca759)), closes [#448](https://github.com/wppconnect-team/wa-js/issues/448)
* **deps-dev:** Bump ts-morph from 15.0.0 to 15.1.0 (#443) ([d5d08e6](https://github.com/wppconnect-team/wa-js/commit/d5d08e6)), closes [#443](https://github.com/wppconnect-team/wa-js/issues/443)
* **deps-dev:** Bump ts-node from 10.8.0 to 10.8.1 (#446) ([98d978f](https://github.com/wppconnect-team/wa-js/commit/98d978f)), closes [#446](https://github.com/wppconnect-team/wa-js/issues/446)
* **deps-dev:** Bump typescript from 4.7.2 to 4.7.3 (#445) ([9cb7609](https://github.com/wppconnect-team/wa-js/commit/9cb7609)), closes [#445](https://github.com/wppconnect-team/wa-js/issues/445)
* **deps:** Bump actions/setup-node from 3.2.0 to 3.3.0 (#444) ([f522b88](https://github.com/wppconnect-team/wa-js/commit/f522b88)), closes [#444](https://github.com/wppconnect-team/wa-js/issues/444)

## <small>2.5.1 (2022-06-06)</small>

### Bug Fixes

* Fixed revoke messages for list type ([7938ae7](https://github.com/wppconnect-team/wa-js/commit/7938ae7))

## 2.5.0 (2022-06-04)

### Features

* Added 'chat.new_reaction' event (fix #417) ([ce2ded5](https://github.com/wppconnect-team/wa-js/commit/ce2ded5)), closes [#417](https://github.com/wppconnect-team/wa-js/issues/417)
* Added option to filter chat and contacts with label (close #436) ([bff74df](https://github.com/wppconnect-team/wa-js/commit/bff74df)), closes [#436](https://github.com/wppconnect-team/wa-js/issues/436)
* Added WPP.conn.getMyDeviceId function (fix #433) ([a4f06f9](https://github.com/wppconnect-team/wa-js/commit/a4f06f9)), closes [#433](https://github.com/wppconnect-team/wa-js/issues/433)
* Added WPP.conn.getMyUserId function (fix #433) ([aaa391b](https://github.com/wppconnect-team/wa-js/commit/aaa391b)), closes [#433](https://github.com/wppconnect-team/wa-js/issues/433)
* Added WPP.contact.list function (close #434) ([b7ed183](https://github.com/wppconnect-team/wa-js/commit/b7ed183)), closes [#434](https://github.com/wppconnect-team/wa-js/issues/434)

### Bug Fixes

* Fixed compatibility with WhatsApp Web >= 2.2220.8 ([29a00fb](https://github.com/wppconnect-team/wa-js/commit/29a00fb))

### Chores

* Added issue template ([87022e4](https://github.com/wppconnect-team/wa-js/commit/87022e4))
* **deps-dev:** Bump @commitlint/cli from 17.0.1 to 17.0.2 (#437) ([24f4a96](https://github.com/wppconnect-team/wa-js/commit/24f4a96)), closes [#437](https://github.com/wppconnect-team/wa-js/issues/437)
* **deps-dev:** Bump @commitlint/config-conventional (#439) ([f292ac7](https://github.com/wppconnect-team/wa-js/commit/f292ac7)), closes [#439](https://github.com/wppconnect-team/wa-js/issues/439)
* **deps-dev:** Bump @types/node from 14.18.18 to 14.18.20 (#438) ([2eaffaa](https://github.com/wppconnect-team/wa-js/commit/2eaffaa)), closes [#438](https://github.com/wppconnect-team/wa-js/issues/438)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.88 to 1.1.89 (#441) ([17af535](https://github.com/wppconnect-team/wa-js/commit/17af535)), closes [#441](https://github.com/wppconnect-team/wa-js/issues/441)
* **deps-dev:** Bump webpack from 5.72.1 to 5.73.0 (#440) ([0bd80eb](https://github.com/wppconnect-team/wa-js/commit/0bd80eb)), closes [#440](https://github.com/wppconnect-team/wa-js/issues/440)

## <small>2.4.1 (2022-05-31)</small>

### Bug Fixes

* Fixed detect mentionedList for invalid wids (#427) ([c701dc3](https://github.com/wppconnect-team/wa-js/commit/c701dc3)), closes [#427](https://github.com/wppconnect-team/wa-js/issues/427)
* WPP.chat.deleteMessage function ([88ac040](https://github.com/wppconnect-team/wa-js/commit/88ac040))

### Chores

* **deps-dev:** Bump @types/prettier from 2.6.1 to 2.6.3 (#428) ([eff2879](https://github.com/wppconnect-team/wa-js/commit/eff2879)), closes [#428](https://github.com/wppconnect-team/wa-js/issues/428)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#430) ([c94e3c4](https://github.com/wppconnect-team/wa-js/commit/c94e3c4)), closes [#430](https://github.com/wppconnect-team/wa-js/issues/430)
* **deps-dev:** Bump @typescript-eslint/parser from 5.26.0 to 5.27.0 (#429) ([2517f56](https://github.com/wppconnect-team/wa-js/commit/2517f56)), closes [#429](https://github.com/wppconnect-team/wa-js/issues/429)

## 2.4.0 (2022-05-28)

### Features

* Added WPP.chat.list function ([8657dd1](https://github.com/wppconnect-team/wa-js/commit/8657dd1))
* Added WPP.chat.sendCreatePollMessage ([625b3b5](https://github.com/wppconnect-team/wa-js/commit/625b3b5))

### Bug Fixes

* Allow string values for lat and lng for WPP.chat.sendLocationMessage function ([02b174f](https://github.com/wppconnect-team/wa-js/commit/02b174f))
* Exported related reactions classes ([466ebad](https://github.com/wppconnect-team/wa-js/commit/466ebad))

## 2.3.0 (2022-05-27)

### Features

* Added WPP.chat.archive function ([8e7b0c7](https://github.com/wppconnect-team/wa-js/commit/8e7b0c7))
* Added WPP.chat.pin function (close #425) ([0fdd8fe](https://github.com/wppconnect-team/wa-js/commit/0fdd8fe)), closes [#425](https://github.com/wppconnect-team/wa-js/issues/425)
* Send status (stories) from Multi Device ([4fd782a](https://github.com/wppconnect-team/wa-js/commit/4fd782a))

### Bug Fixes

* Fixed exported config ([651019c](https://github.com/wppconnect-team/wa-js/commit/651019c))
* Fixed promise time for WPP.chat.markIsComposing with duration ([e94718b](https://github.com/wppconnect-team/wa-js/commit/e94718b))

### Documentation

* Fixed mimetype example for WPP.chat.sendFileMessage ([9ed3103](https://github.com/wppconnect-team/wa-js/commit/9ed3103))
* Update whatsapp modules ID ([25d6779](https://github.com/wppconnect-team/wa-js/commit/25d6779))

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.2.4 to 17.0.0 (#393) ([a2d166e](https://github.com/wppconnect-team/wa-js/commit/a2d166e)), closes [#393](https://github.com/wppconnect-team/wa-js/issues/393)
* **deps-dev:** Bump @commitlint/cli from 17.0.0 to 17.0.1 (#419) ([6ef5bd6](https://github.com/wppconnect-team/wa-js/commit/6ef5bd6)), closes [#419](https://github.com/wppconnect-team/wa-js/issues/419)
* **deps-dev:** Bump @commitlint/config-conventional (#395) ([6d6a8e6](https://github.com/wppconnect-team/wa-js/commit/6d6a8e6)), closes [#395](https://github.com/wppconnect-team/wa-js/issues/395)
* **deps-dev:** Bump @commitlint/prompt-cli from 16.2.4 to 17.0.0 (#394) ([9413bb7](https://github.com/wppconnect-team/wa-js/commit/9413bb7)), closes [#394](https://github.com/wppconnect-team/wa-js/issues/394)
* **deps-dev:** Bump @playwright/test from 1.22.0 to 1.22.1 (#402) ([3a476ea](https://github.com/wppconnect-team/wa-js/commit/3a476ea)), closes [#402](https://github.com/wppconnect-team/wa-js/issues/402)
* **deps-dev:** Bump @playwright/test from 1.22.1 to 1.22.2 (#408) ([dfe760d](https://github.com/wppconnect-team/wa-js/commit/dfe760d)), closes [#408](https://github.com/wppconnect-team/wa-js/issues/408)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#400) ([8fb9e69](https://github.com/wppconnect-team/wa-js/commit/8fb9e69)), closes [#400](https://github.com/wppconnect-team/wa-js/issues/400)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#405) ([839c9c4](https://github.com/wppconnect-team/wa-js/commit/839c9c4)), closes [#405](https://github.com/wppconnect-team/wa-js/issues/405)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#413) ([66d2a9d](https://github.com/wppconnect-team/wa-js/commit/66d2a9d)), closes [#413](https://github.com/wppconnect-team/wa-js/issues/413)
* **deps-dev:** Bump @typescript-eslint/parser from 5.23.0 to 5.24.0 (#401) ([014e9b2](https://github.com/wppconnect-team/wa-js/commit/014e9b2)), closes [#401](https://github.com/wppconnect-team/wa-js/issues/401)
* **deps-dev:** Bump @typescript-eslint/parser from 5.24.0 to 5.25.0 (#403) ([7c5b4af](https://github.com/wppconnect-team/wa-js/commit/7c5b4af)), closes [#403](https://github.com/wppconnect-team/wa-js/issues/403)
* **deps-dev:** Bump @typescript-eslint/parser from 5.25.0 to 5.26.0 (#414) ([5e4c435](https://github.com/wppconnect-team/wa-js/commit/5e4c435)), closes [#414](https://github.com/wppconnect-team/wa-js/issues/414)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.79 to 1.1.80 (#396) ([6b4df45](https://github.com/wppconnect-team/wa-js/commit/6b4df45)), closes [#396](https://github.com/wppconnect-team/wa-js/issues/396)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.80 to 1.1.81 (#399) ([377179d](https://github.com/wppconnect-team/wa-js/commit/377179d)), closes [#399](https://github.com/wppconnect-team/wa-js/issues/399)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.81 to 1.1.82 (#404) ([e9c6407](https://github.com/wppconnect-team/wa-js/commit/e9c6407)), closes [#404](https://github.com/wppconnect-team/wa-js/issues/404)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.82 to 1.1.83 (#406) ([ee82e73](https://github.com/wppconnect-team/wa-js/commit/ee82e73)), closes [#406](https://github.com/wppconnect-team/wa-js/issues/406)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.83 to 1.1.84 (#407) ([1fc89e2](https://github.com/wppconnect-team/wa-js/commit/1fc89e2)), closes [#407](https://github.com/wppconnect-team/wa-js/issues/407)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.84 to 1.1.85 (#411) ([9506d92](https://github.com/wppconnect-team/wa-js/commit/9506d92)), closes [#411](https://github.com/wppconnect-team/wa-js/issues/411)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.85 to 1.1.87 (#415) ([a270421](https://github.com/wppconnect-team/wa-js/commit/a270421)), closes [#415](https://github.com/wppconnect-team/wa-js/issues/415)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.87 to 1.1.88 (#421) ([fb8c27c](https://github.com/wppconnect-team/wa-js/commit/fb8c27c)), closes [#421](https://github.com/wppconnect-team/wa-js/issues/421)
* **deps-dev:** Bump eslint from 8.15.0 to 8.16.0 (#410) ([d11d091](https://github.com/wppconnect-team/wa-js/commit/d11d091)), closes [#410](https://github.com/wppconnect-team/wa-js/issues/410)
* **deps-dev:** Bump playwright-chromium from 1.22.0 to 1.22.1 (#398) ([7e4d3bc](https://github.com/wppconnect-team/wa-js/commit/7e4d3bc)), closes [#398](https://github.com/wppconnect-team/wa-js/issues/398)
* **deps-dev:** Bump playwright-chromium from 1.22.1 to 1.22.2 (#409) ([f8eeda2](https://github.com/wppconnect-team/wa-js/commit/f8eeda2)), closes [#409](https://github.com/wppconnect-team/wa-js/issues/409)
* **deps-dev:** Bump ts-morph from 14.0.0 to 15.0.0 (#422) ([f4bb9bf](https://github.com/wppconnect-team/wa-js/commit/f4bb9bf)), closes [#422](https://github.com/wppconnect-team/wa-js/issues/422)
* **deps-dev:** Bump ts-node from 10.7.0 to 10.8.0 (#412) ([a25311b](https://github.com/wppconnect-team/wa-js/commit/a25311b)), closes [#412](https://github.com/wppconnect-team/wa-js/issues/412)
* **deps-dev:** Bump typescript from 4.6.4 to 4.7.2 (#420) ([f4d664c](https://github.com/wppconnect-team/wa-js/commit/f4d664c)), closes [#420](https://github.com/wppconnect-team/wa-js/issues/420)
* **deps:** Bump actions/setup-node from 3.1.1 to 3.2.0 (#392) ([d363d17](https://github.com/wppconnect-team/wa-js/commit/d363d17)), closes [#392](https://github.com/wppconnect-team/wa-js/issues/392)

## <small>2.2.2 (2022-05-15)</small>

### Features

* Added new server for link-preview (https://linkpreview.hps.net.br:2053) ([638a0a8](https://github.com/wppconnect-team/wa-js/commit/638a0a8))

### Bug Fixes

* Fixed sendFileMessage for MP4 files on Chromium (fix #384) ([b7e6431](https://github.com/wppconnect-team/wa-js/commit/b7e6431)), closes [#384](https://github.com/wppconnect-team/wa-js/issues/384)

### Documentation

* Added server link ([dfb06fb](https://github.com/wppconnect-team/wa-js/commit/dfb06fb))

### Chores

* **deps-dev:** Bump @playwright/test from 1.21.1 to 1.22.0 (#386) ([42ac3a0](https://github.com/wppconnect-team/wa-js/commit/42ac3a0)), closes [#386](https://github.com/wppconnect-team/wa-js/issues/386)
* **deps-dev:** Bump @types/node from 14.18.16 to 14.18.17 (#383) ([6119b3c](https://github.com/wppconnect-team/wa-js/commit/6119b3c)), closes [#383](https://github.com/wppconnect-team/wa-js/issues/383)
* **deps-dev:** Bump @types/node from 14.18.17 to 14.18.18 (#388) ([19129f1](https://github.com/wppconnect-team/wa-js/commit/19129f1)), closes [#388](https://github.com/wppconnect-team/wa-js/issues/388)
* **deps-dev:** Bump @types/prettier from 2.6.0 to 2.6.1 (#389) ([2265558](https://github.com/wppconnect-team/wa-js/commit/2265558)), closes [#389](https://github.com/wppconnect-team/wa-js/issues/389)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#378) ([4ed70c1](https://github.com/wppconnect-team/wa-js/commit/4ed70c1)), closes [#378](https://github.com/wppconnect-team/wa-js/issues/378)
* **deps-dev:** Bump @typescript-eslint/parser from 5.22.0 to 5.23.0 (#379) ([8e77654](https://github.com/wppconnect-team/wa-js/commit/8e77654)), closes [#379](https://github.com/wppconnect-team/wa-js/issues/379)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.72 to 1.1.74 (#380) ([77589a4](https://github.com/wppconnect-team/wa-js/commit/77589a4)), closes [#380](https://github.com/wppconnect-team/wa-js/issues/380)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.74 to 1.1.76 (#382) ([a1c11b0](https://github.com/wppconnect-team/wa-js/commit/a1c11b0)), closes [#382](https://github.com/wppconnect-team/wa-js/issues/382)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.76 to 1.1.78 (#385) ([c0b3e70](https://github.com/wppconnect-team/wa-js/commit/c0b3e70)), closes [#385](https://github.com/wppconnect-team/wa-js/issues/385)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.78 to 1.1.79 (#387) ([6af91e9](https://github.com/wppconnect-team/wa-js/commit/6af91e9)), closes [#387](https://github.com/wppconnect-team/wa-js/issues/387)
* **deps-dev:** Bump playwright-chromium from 1.21.1 to 1.22.0 (#390) ([aae8049](https://github.com/wppconnect-team/wa-js/commit/aae8049)), closes [#390](https://github.com/wppconnect-team/wa-js/issues/390)
* **deps-dev:** Bump webpack from 5.72.0 to 5.72.1 (#381) ([ea90367](https://github.com/wppconnect-team/wa-js/commit/ea90367)), closes [#381](https://github.com/wppconnect-team/wa-js/issues/381)
* Updated server port ([b625f3c](https://github.com/wppconnect-team/wa-js/commit/b625f3c))

## <small>2.2.1 (2022-05-10)</small>

### Features

* Added new server for link-preview (https://wajsapi.titanwhats.com.br) ([f5b0027](https://github.com/wppconnect-team/wa-js/commit/f5b0027))
* Added new server for link-preview (https://wppserver.comunicabh.com.br) ([0db3c9c](https://github.com/wppconnect-team/wa-js/commit/0db3c9c))

### Chores

* **deps-dev:** Bump @wppconnect/wa-version from 1.1.71 to 1.1.72 (#374) ([6286452](https://github.com/wppconnect-team/wa-js/commit/6286452)), closes [#374](https://github.com/wppconnect-team/wa-js/issues/374)
* **deps-dev:** Bump eslint from 8.14.0 to 8.15.0 (#377) ([1a263be](https://github.com/wppconnect-team/wa-js/commit/1a263be)), closes [#377](https://github.com/wppconnect-team/wa-js/issues/377)
* **deps-dev:** Bump husky from 7.0.4 to 8.0.1 (#376) ([43096bf](https://github.com/wppconnect-team/wa-js/commit/43096bf)), closes [#376](https://github.com/wppconnect-team/wa-js/issues/376)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.11 to 4.1.12 (#375) ([d42322a](https://github.com/wppconnect-team/wa-js/commit/d42322a)), closes [#375](https://github.com/wppconnect-team/wa-js/issues/375)
* Updated FUNDING ([d159200](https://github.com/wppconnect-team/wa-js/commit/d159200))

## 2.2.0 (2022-05-09)

### Features

* Added function WPP.util.downloadImage ([bd6c0b8](https://github.com/wppconnect-team/wa-js/commit/bd6c0b8))
* Added support to link preview for Multi Devices ([2ef2249](https://github.com/wppconnect-team/wa-js/commit/2ef2249))
* Added WPP.chat.sendReactionMessage function ([376b0be](https://github.com/wppconnect-team/wa-js/commit/376b0be))
* Extracted genMinimalLinkPreview function from WhatsApp Web ([bc81d8c](https://github.com/wppconnect-team/wa-js/commit/bc81d8c))

### Documentation

* **whatsapp:** Exported MediaEntry class ([93d4b64](https://github.com/wppconnect-team/wa-js/commit/93d4b64))
* **whatsapp:** Exported uploadThumbnail function ([08ea5fa](https://github.com/wppconnect-team/wa-js/commit/08ea5fa))

### Chores

* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#372) ([26f8dad](https://github.com/wppconnect-team/wa-js/commit/26f8dad)), closes [#372](https://github.com/wppconnect-team/wa-js/issues/372)
* **deps-dev:** Bump @typescript-eslint/parser from 5.21.0 to 5.22.0 (#373) ([8769ed6](https://github.com/wppconnect-team/wa-js/commit/8769ed6)), closes [#373](https://github.com/wppconnect-team/wa-js/issues/373)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.70 to 1.1.71 (#371) ([d278aaf](https://github.com/wppconnect-team/wa-js/commit/d278aaf)), closes [#371](https://github.com/wppconnect-team/wa-js/issues/371)
* **deps-dev:** Bump release-it from 14.14.2 to 15.0.0 (#367) ([257bcfc](https://github.com/wppconnect-team/wa-js/commit/257bcfc)), closes [#367](https://github.com/wppconnect-team/wa-js/issues/367)
* **deps-dev:** Bump ts-loader from 9.2.9 to 9.3.0 (#368) ([d39d69a](https://github.com/wppconnect-team/wa-js/commit/d39d69a)), closes [#368](https://github.com/wppconnect-team/wa-js/issues/368)

## <small>2.1.3 (2022-04-30)</small>

### Bug Fixes

* Fixed WPP.labels.getAllLabels function (fix #366) ([d97f6bc](https://github.com/wppconnect-team/wa-js/commit/d97f6bc)), closes [#366](https://github.com/wppconnect-team/wa-js/issues/366)

### Code Refactoring

* Removed non used overload method for WPP.chat.getMessageById ([58d3210](https://github.com/wppconnect-team/wa-js/commit/58d3210))

### Chores

* **deps-dev:** Bump typescript from 4.6.3 to 4.6.4 (#364) ([2d35f4f](https://github.com/wppconnect-team/wa-js/commit/2d35f4f)), closes [#364](https://github.com/wppconnect-team/wa-js/issues/364)

## <small>2.1.2 (2022-04-29)</small>

### Bug Fixes

* Added missing footer and title option for WPP.chat.sendListMessage ([19401b3](https://github.com/wppconnect-team/wa-js/commit/19401b3))
* Fixed WPP.chat.sendListMessage for MultiDevices ([e4d4403](https://github.com/wppconnect-team/wa-js/commit/e4d4403))

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.2.3 to 16.2.4 (#363) ([358cb3e](https://github.com/wppconnect-team/wa-js/commit/358cb3e)), closes [#363](https://github.com/wppconnect-team/wa-js/issues/363)
* **deps-dev:** Bump @commitlint/config-conventional (#362) ([4ac8b81](https://github.com/wppconnect-team/wa-js/commit/4ac8b81)), closes [#362](https://github.com/wppconnect-team/wa-js/issues/362)
* **deps-dev:** Bump @commitlint/prompt-cli from 16.2.3 to 16.2.4 (#361) ([cc279e9](https://github.com/wppconnect-team/wa-js/commit/cc279e9)), closes [#361](https://github.com/wppconnect-team/wa-js/issues/361)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.69 to 1.1.70 (#360) ([2ea3e14](https://github.com/wppconnect-team/wa-js/commit/2ea3e14)), closes [#360](https://github.com/wppconnect-team/wa-js/issues/360)

## <small>2.1.1 (2022-04-27)</small>

### Bug Fixes

* Added missing footer option for WPP.chat.sendFileMessage ([623c57f](https://github.com/wppconnect-team/wa-js/commit/623c57f))
* Fixed WPP.chat.sendFileMessage when filename is different of caption ([5525bca](https://github.com/wppconnect-team/wa-js/commit/5525bca))

### Chores

* **deps-dev:** Bump @types/node from 14.18.15 to 14.18.16 (#356) ([e1f1a74](https://github.com/wppconnect-team/wa-js/commit/e1f1a74)), closes [#356](https://github.com/wppconnect-team/wa-js/issues/356)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.67 to 1.1.69 (#357) ([5724103](https://github.com/wppconnect-team/wa-js/commit/5724103)), closes [#357](https://github.com/wppconnect-team/wa-js/issues/357)
* **deps-dev:** Bump ts-loader from 9.2.8 to 9.2.9 (#358) ([b521463](https://github.com/wppconnect-team/wa-js/commit/b521463)), closes [#358](https://github.com/wppconnect-team/wa-js/issues/358)

## 2.1.0 (2022-04-27)

### Features

* Added WPP.chat.sendLocationMessage function ([9503dcc](https://github.com/wppconnect-team/wa-js/commit/9503dcc))

### Chores

* **deps-dev:** Bump @types/node from 14.18.14 to 14.18.15 (#352) ([3f732db](https://github.com/wppconnect-team/wa-js/commit/3f732db)), closes [#352](https://github.com/wppconnect-team/wa-js/issues/352)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#354) ([fa0e4b4](https://github.com/wppconnect-team/wa-js/commit/fa0e4b4)), closes [#354](https://github.com/wppconnect-team/wa-js/issues/354)
* **deps-dev:** Bump @typescript-eslint/parser from 5.20.0 to 5.21.0 (#355) ([af578a0](https://github.com/wppconnect-team/wa-js/commit/af578a0)), closes [#355](https://github.com/wppconnect-team/wa-js/issues/355)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.66 to 1.1.67 (#353) ([ee45cb5](https://github.com/wppconnect-team/wa-js/commit/ee45cb5)), closes [#353](https://github.com/wppconnect-team/wa-js/issues/353)

## <small>2.0.2 (2022-04-26)</small>

### Bug Fixes

* Fixed buttons without message title ([ed611cf](https://github.com/wppconnect-team/wa-js/commit/ed611cf))
* Fixed caption for WPP.chat.sendFileMessage ([d2f370b](https://github.com/wppconnect-team/wa-js/commit/d2f370b))

## <small>2.0.1 (2022-04-25)</small>

### Bug Fixes

* Fixed buttons title ([ae0a6e9](https://github.com/wppconnect-team/wa-js/commit/ae0a6e9))

### Chores

* **deps-dev:** Bump @types/node from 14.18.13 to 14.18.14 (#350) ([0d333a2](https://github.com/wppconnect-team/wa-js/commit/0d333a2)), closes [#350](https://github.com/wppconnect-team/wa-js/issues/350)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.64 to 1.1.66 (#351) ([8713b5c](https://github.com/wppconnect-team/wa-js/commit/8713b5c)), closes [#351](https://github.com/wppconnect-team/wa-js/issues/351)
* **deps-dev:** Bump eslint from 8.13.0 to 8.14.0 (#349) ([6fec203](https://github.com/wppconnect-team/wa-js/commit/6fec203)), closes [#349](https://github.com/wppconnect-team/wa-js/issues/349)

## 2.0.0 (2022-04-25)

### Features

* Added chat.new_message event ([e16eaa1](https://github.com/wppconnect-team/wa-js/commit/e16eaa1))
* Added chat.presence_change event ([70836d1](https://github.com/wppconnect-team/wa-js/commit/70836d1))
* Added WPP.conn.setKeepAlive function ([d211485](https://github.com/wppconnect-team/wa-js/commit/d211485))
* Added WPP.contact.getProfilePictureUrl function ([ac1a147](https://github.com/wppconnect-team/wa-js/commit/ac1a147))
* Switched emittery to eventemitter2 ([0844cd2](https://github.com/wppconnect-team/wa-js/commit/0844cd2))

### Bug Fixes

* Fixed chat.msg_ack_change event for multi-device ([e400ae8](https://github.com/wppconnect-team/wa-js/commit/e400ae8))
* Fixed compatibility with WhatsApp WEB 2.2214.8 ([0b464e8](https://github.com/wppconnect-team/wa-js/commit/0b464e8))
* Fixed export of events ([c28f8d8](https://github.com/wppconnect-team/wa-js/commit/c28f8d8))
* Fixed send message for template buttons ([2988bd3](https://github.com/wppconnect-team/wa-js/commit/2988bd3))
* Fixed template buttons for message file ([0927157](https://github.com/wppconnect-team/wa-js/commit/0927157))

### Code Refactoring

* Reorganized export modules ([4e71634](https://github.com/wppconnect-team/wa-js/commit/4e71634))
* Update the minimal version of WhatsApp WEB to 2.2210.6-beta ([36180e8](https://github.com/wppconnect-team/wa-js/commit/36180e8))

### Documentation

* Fixed doc type of PresenceCollection ([1d7b7f7](https://github.com/wppconnect-team/wa-js/commit/1d7b7f7))
* Fixed event examples ([9a9eea3](https://github.com/wppconnect-team/wa-js/commit/9a9eea3))
* Update whatsapp modules ID ([85dc4a7](https://github.com/wppconnect-team/wa-js/commit/85dc4a7))

### Continuous Integration

* Added prerelease versions of WhatsApp for test ([3ec599d](https://github.com/wppconnect-team/wa-js/commit/3ec599d))
* Ignore the 3 oldest versions of whatsapp ([99984d4](https://github.com/wppconnect-team/wa-js/commit/99984d4))

### Chores

* Added function to wrap exported functions from modules ([c3030aa](https://github.com/wppconnect-team/wa-js/commit/c3030aa))
* Added supported WhatsApp WEB info ([2789f62](https://github.com/wppconnect-team/wa-js/commit/2789f62))
* **deps-dev:** Bump @playwright/test from 1.20.1 to 1.20.2 (#314) ([357eb19](https://github.com/wppconnect-team/wa-js/commit/357eb19)), closes [#314](https://github.com/wppconnect-team/wa-js/issues/314)
* **deps-dev:** Bump @playwright/test from 1.20.2 to 1.21.0 (#330) ([72ccab5](https://github.com/wppconnect-team/wa-js/commit/72ccab5)), closes [#330](https://github.com/wppconnect-team/wa-js/issues/330)
* **deps-dev:** Bump @playwright/test from 1.21.0 to 1.21.1 (#340) ([e75e523](https://github.com/wppconnect-team/wa-js/commit/e75e523)), closes [#340](https://github.com/wppconnect-team/wa-js/issues/340)
* **deps-dev:** Bump @types/node from 14.18.12 to 14.18.13 (#336) ([baa39ff](https://github.com/wppconnect-team/wa-js/commit/baa39ff)), closes [#336](https://github.com/wppconnect-team/wa-js/issues/336)
* **deps-dev:** Bump @types/prettier from 2.4.4 to 2.6.0 (#328) ([00fd657](https://github.com/wppconnect-team/wa-js/commit/00fd657)), closes [#328](https://github.com/wppconnect-team/wa-js/issues/328)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#304) ([4e7eec6](https://github.com/wppconnect-team/wa-js/commit/4e7eec6)), closes [#304](https://github.com/wppconnect-team/wa-js/issues/304)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#316) ([9350a49](https://github.com/wppconnect-team/wa-js/commit/9350a49)), closes [#316](https://github.com/wppconnect-team/wa-js/issues/316)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#334) ([f92ee52](https://github.com/wppconnect-team/wa-js/commit/f92ee52)), closes [#334](https://github.com/wppconnect-team/wa-js/issues/334)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#341) ([db06ad4](https://github.com/wppconnect-team/wa-js/commit/db06ad4)), closes [#341](https://github.com/wppconnect-team/wa-js/issues/341)
* **deps-dev:** Bump @typescript-eslint/parser from 5.16.0 to 5.17.0 (#305) ([6b1e20d](https://github.com/wppconnect-team/wa-js/commit/6b1e20d)), closes [#305](https://github.com/wppconnect-team/wa-js/issues/305)
* **deps-dev:** Bump @typescript-eslint/parser from 5.17.0 to 5.18.0 (#317) ([31ad307](https://github.com/wppconnect-team/wa-js/commit/31ad307)), closes [#317](https://github.com/wppconnect-team/wa-js/issues/317)
* **deps-dev:** Bump @typescript-eslint/parser from 5.18.0 to 5.19.0 (#333) ([8c72ed8](https://github.com/wppconnect-team/wa-js/commit/8c72ed8)), closes [#333](https://github.com/wppconnect-team/wa-js/issues/333)
* **deps-dev:** Bump @typescript-eslint/parser from 5.19.0 to 5.20.0 (#342) ([9335b5e](https://github.com/wppconnect-team/wa-js/commit/9335b5e)), closes [#342](https://github.com/wppconnect-team/wa-js/issues/342)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.49 to 1.1.51 (#303) ([dc7481a](https://github.com/wppconnect-team/wa-js/commit/dc7481a)), closes [#303](https://github.com/wppconnect-team/wa-js/issues/303)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.51 to 1.1.52 (#306) ([dc5633a](https://github.com/wppconnect-team/wa-js/commit/dc5633a)), closes [#306](https://github.com/wppconnect-team/wa-js/issues/306)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.52 to 1.1.53 (#307) ([8f61de5](https://github.com/wppconnect-team/wa-js/commit/8f61de5)), closes [#307](https://github.com/wppconnect-team/wa-js/issues/307)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.53 to 1.1.54 (#319) ([9d4fa72](https://github.com/wppconnect-team/wa-js/commit/9d4fa72)), closes [#319](https://github.com/wppconnect-team/wa-js/issues/319)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.54 to 1.1.55 (#323) ([c9da6be](https://github.com/wppconnect-team/wa-js/commit/c9da6be)), closes [#323](https://github.com/wppconnect-team/wa-js/issues/323)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.55 to 1.1.57 (#332) ([3e82573](https://github.com/wppconnect-team/wa-js/commit/3e82573)), closes [#332](https://github.com/wppconnect-team/wa-js/issues/332)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.57 to 1.1.59 (#335) ([372a221](https://github.com/wppconnect-team/wa-js/commit/372a221)), closes [#335](https://github.com/wppconnect-team/wa-js/issues/335)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.59 to 1.1.60 (#337) ([977fe67](https://github.com/wppconnect-team/wa-js/commit/977fe67)), closes [#337](https://github.com/wppconnect-team/wa-js/issues/337)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.60 to 1.1.61 (#338) ([08fab5a](https://github.com/wppconnect-team/wa-js/commit/08fab5a)), closes [#338](https://github.com/wppconnect-team/wa-js/issues/338)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.61 to 1.1.64 (#345) ([4ab3b62](https://github.com/wppconnect-team/wa-js/commit/4ab3b62)), closes [#345](https://github.com/wppconnect-team/wa-js/issues/345)
* **deps-dev:** Bump emittery from 0.10.1 to 0.10.2 (#315) ([68a027d](https://github.com/wppconnect-team/wa-js/commit/68a027d)), closes [#315](https://github.com/wppconnect-team/wa-js/issues/315)
* **deps-dev:** Bump eslint from 8.11.0 to 8.12.0 (#302) ([fbef354](https://github.com/wppconnect-team/wa-js/commit/fbef354)), closes [#302](https://github.com/wppconnect-team/wa-js/issues/302)
* **deps-dev:** Bump eslint from 8.12.0 to 8.13.0 (#326) ([59978c5](https://github.com/wppconnect-team/wa-js/commit/59978c5)), closes [#326](https://github.com/wppconnect-team/wa-js/issues/326)
* **deps-dev:** Bump eslint-plugin-import from 2.25.4 to 2.26.0 (#320) ([16e6ce3](https://github.com/wppconnect-team/wa-js/commit/16e6ce3)), closes [#320](https://github.com/wppconnect-team/wa-js/issues/320)
* **deps-dev:** Bump playwright-chromium from 1.20.1 to 1.20.2 (#312) ([793b0a5](https://github.com/wppconnect-team/wa-js/commit/793b0a5)), closes [#312](https://github.com/wppconnect-team/wa-js/issues/312)
* **deps-dev:** Bump playwright-chromium from 1.20.2 to 1.21.0 (#331) ([a414d8f](https://github.com/wppconnect-team/wa-js/commit/a414d8f)), closes [#331](https://github.com/wppconnect-team/wa-js/issues/331)
* **deps-dev:** Bump playwright-chromium from 1.21.0 to 1.21.1 (#339) ([688c4f2](https://github.com/wppconnect-team/wa-js/commit/688c4f2)), closes [#339](https://github.com/wppconnect-team/wa-js/issues/339)
* **deps-dev:** Bump prettier from 2.6.0 to 2.6.1 (#301) ([a658e14](https://github.com/wppconnect-team/wa-js/commit/a658e14)), closes [#301](https://github.com/wppconnect-team/wa-js/issues/301)
* **deps-dev:** Bump prettier from 2.6.1 to 2.6.2 (#313) ([6646fa1](https://github.com/wppconnect-team/wa-js/commit/6646fa1)), closes [#313](https://github.com/wppconnect-team/wa-js/issues/313)
* **deps-dev:** Bump release-it from 14.13.1 to 14.14.0 (#309) ([d33e837](https://github.com/wppconnect-team/wa-js/commit/d33e837)), closes [#309](https://github.com/wppconnect-team/wa-js/issues/309)
* **deps-dev:** Bump release-it from 14.14.0 to 14.14.1 (#327) ([2786ed4](https://github.com/wppconnect-team/wa-js/commit/2786ed4)), closes [#327](https://github.com/wppconnect-team/wa-js/issues/327)
* **deps-dev:** Bump release-it from 14.14.1 to 14.14.2 (#329) ([efc4846](https://github.com/wppconnect-team/wa-js/commit/efc4846)), closes [#329](https://github.com/wppconnect-team/wa-js/issues/329)
* **deps-dev:** Bump typedoc-plugin-mdn-links from 1.0.5 to 1.0.6 (#324) ([b7ebf36](https://github.com/wppconnect-team/wa-js/commit/b7ebf36)), closes [#324](https://github.com/wppconnect-team/wa-js/issues/324)
* **deps-dev:** Bump typescript from 4.6.2 to 4.6.3 (#299) ([8743c4b](https://github.com/wppconnect-team/wa-js/commit/8743c4b)), closes [#299](https://github.com/wppconnect-team/wa-js/issues/299)
* **deps-dev:** Bump webpack from 5.70.0 to 5.71.0 (#311) ([6e91d35](https://github.com/wppconnect-team/wa-js/commit/6e91d35)), closes [#311](https://github.com/wppconnect-team/wa-js/issues/311)
* **deps-dev:** Bump webpack from 5.71.0 to 5.72.0 (#322) ([c6ae351](https://github.com/wppconnect-team/wa-js/commit/c6ae351)), closes [#322](https://github.com/wppconnect-team/wa-js/issues/322)
* **deps:** Bump actions/setup-node from 3.0.0 to 3.1.0 (#308) ([35e51ee](https://github.com/wppconnect-team/wa-js/commit/35e51ee)), closes [#308](https://github.com/wppconnect-team/wa-js/issues/308)
* **deps:** Bump actions/setup-node from 3.1.0 to 3.1.1 (#325) ([3ccfcc9](https://github.com/wppconnect-team/wa-js/commit/3ccfcc9)), closes [#325](https://github.com/wppconnect-team/wa-js/issues/325)
* **deps:** Bump dependabot/fetch-metadata from 1.3.0 to 1.3.1 (#344) ([f510aac](https://github.com/wppconnect-team/wa-js/commit/f510aac)), closes [#344](https://github.com/wppconnect-team/wa-js/issues/344)
* **deps:** Bump minimist from 1.2.5 to 1.2.6 (#318) ([3bf87e0](https://github.com/wppconnect-team/wa-js/commit/3bf87e0)), closes [#318](https://github.com/wppconnect-team/wa-js/issues/318)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.10 to 4.1.11 (#321) ([ff4197c](https://github.com/wppconnect-team/wa-js/commit/ff4197c)), closes [#321](https://github.com/wppconnect-team/wa-js/issues/321)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.9 to 4.1.10 (#310) ([f8d188e](https://github.com/wppconnect-team/wa-js/commit/f8d188e)), closes [#310](https://github.com/wppconnect-team/wa-js/issues/310)
* Fixed event emitter export ([3edfe3f](https://github.com/wppconnect-team/wa-js/commit/3edfe3f))
* Fixed max number of buttons ([26f8b0b](https://github.com/wppconnect-team/wa-js/commit/26f8b0b))
* Fixed module map, fix check module id ([bae1330](https://github.com/wppconnect-team/wa-js/commit/bae1330))
* npm audit fix ([c031f98](https://github.com/wppconnect-team/wa-js/commit/c031f98))
* Reorganized status message patch ([b74ed62](https://github.com/wppconnect-team/wa-js/commit/b74ed62))
* Updated eventEmitter types ([23f4f9e](https://github.com/wppconnect-team/wa-js/commit/23f4f9e))


### BREAKING CHANGE

* Changed all interface events to WPP.ev and WPP.on
* Min version of WhatsApp WEB: 2.2204.13

## <small>1.2.5 (2022-03-25)</small>

### Bug Fixes

* Fixed WPP.group.getGroupInfoFromInviteCode function (fix wppconnect-team/wppconnect#972) ([a8bb5cf](https://github.com/wppconnect-team/wa-js/commit/a8bb5cf)), closes [wppconnect-team/wppconnect#972](https://github.com/wppconnect-team/wppconnect/issues/972)

### Chores

* **deps-dev:** Bump @playwright/test from 1.20.0 to 1.20.1 (#296) ([5f05aa2](https://github.com/wppconnect-team/wa-js/commit/5f05aa2)), closes [#296](https://github.com/wppconnect-team/wa-js/issues/296)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.48 to 1.1.49 (#295) ([4154f98](https://github.com/wppconnect-team/wa-js/commit/4154f98)), closes [#295](https://github.com/wppconnect-team/wa-js/issues/295)
* **deps-dev:** Bump playwright-chromium from 1.20.0 to 1.20.1 (#297) ([f7fc8d3](https://github.com/wppconnect-team/wa-js/commit/f7fc8d3)), closes [#297](https://github.com/wppconnect-team/wa-js/issues/297)

## <small>1.2.4 (2022-03-23)</small>

### Features

* Working on template buttons support ([ecf0a81](https://github.com/wppconnect-team/wa-js/commit/ecf0a81))

### Bug Fixes

* Fixed compatibility with WhatsApp 2.2211.2 ([d0c92b6](https://github.com/wppconnect-team/wa-js/commit/d0c92b6))

### Documentation

* Updated attributes of MsgModel ([1ceaf5d](https://github.com/wppconnect-team/wa-js/commit/1ceaf5d))

### Chores

* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#294) ([3d3f8a4](https://github.com/wppconnect-team/wa-js/commit/3d3f8a4)), closes [#294](https://github.com/wppconnect-team/wa-js/issues/294)
* **deps-dev:** Bump @typescript-eslint/parser from 5.15.0 to 5.16.0 (#293) ([37ba718](https://github.com/wppconnect-team/wa-js/commit/37ba718)), closes [#293](https://github.com/wppconnect-team/wa-js/issues/293)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.46 to 1.1.47 (#289) ([4d6e42c](https://github.com/wppconnect-team/wa-js/commit/4d6e42c)), closes [#289](https://github.com/wppconnect-team/wa-js/issues/289)
* **deps-dev:** Bump debug from 4.3.3 to 4.3.4 (#288) ([768e516](https://github.com/wppconnect-team/wa-js/commit/768e516)), closes [#288](https://github.com/wppconnect-team/wa-js/issues/288)
* **deps-dev:** Bump release-it from 14.12.5 to 14.13.1 (#291) ([761493c](https://github.com/wppconnect-team/wa-js/commit/761493c)), closes [#291](https://github.com/wppconnect-team/wa-js/issues/291)
* **deps:** Bump actions/cache from 2 to 3 (#290) ([21b4f28](https://github.com/wppconnect-team/wa-js/commit/21b4f28)), closes [#290](https://github.com/wppconnect-team/wa-js/issues/290)

## <small>1.2.3 (2022-03-16)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp 2.2208.11 ([8894d1a](https://github.com/wppconnect-team/wa-js/commit/8894d1a))

### Continuous Integration

* Fix auto-merge ([8a0c6e0](https://github.com/wppconnect-team/wa-js/commit/8a0c6e0))
* Wait for test in dependabot workflow ([3faa152](https://github.com/wppconnect-team/wa-js/commit/3faa152))

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.2.1 to 16.2.3 (#286) ([d2a2467](https://github.com/wppconnect-team/wa-js/commit/d2a2467)), closes [#286](https://github.com/wppconnect-team/wa-js/issues/286)
* **deps-dev:** Bump @commitlint/prompt-cli from 16.2.1 to 16.2.3 (#284) ([1fec78c](https://github.com/wppconnect-team/wa-js/commit/1fec78c)), closes [#284](https://github.com/wppconnect-team/wa-js/issues/284)
* **deps-dev:** Bump @playwright/test from 1.19.2 to 1.20.0 (#281) ([f85f41d](https://github.com/wppconnect-team/wa-js/commit/f85f41d)), closes [#281](https://github.com/wppconnect-team/wa-js/issues/281)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#279) ([2bd12a6](https://github.com/wppconnect-team/wa-js/commit/2bd12a6)), closes [#279](https://github.com/wppconnect-team/wa-js/issues/279)
* **deps-dev:** Bump @typescript-eslint/parser from 5.14.0 to 5.15.0 (#282) ([2bb6004](https://github.com/wppconnect-team/wa-js/commit/2bb6004)), closes [#282](https://github.com/wppconnect-team/wa-js/issues/282)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.40 to 1.1.42 (#277) ([93f02fe](https://github.com/wppconnect-team/wa-js/commit/93f02fe)), closes [#277](https://github.com/wppconnect-team/wa-js/issues/277)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.42 to 1.1.43 (#283) ([1aedcdb](https://github.com/wppconnect-team/wa-js/commit/1aedcdb)), closes [#283](https://github.com/wppconnect-team/wa-js/issues/283)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.43 to 1.1.46 (#285) ([1af9e4f](https://github.com/wppconnect-team/wa-js/commit/1af9e4f)), closes [#285](https://github.com/wppconnect-team/wa-js/issues/285)
* **deps-dev:** Bump eslint from 8.10.0 to 8.11.0 (#278) ([bd46f61](https://github.com/wppconnect-team/wa-js/commit/bd46f61)), closes [#278](https://github.com/wppconnect-team/wa-js/issues/278)
* **deps-dev:** Bump playwright-chromium from 1.19.2 to 1.20.0 (#280) ([41f2b70](https://github.com/wppconnect-team/wa-js/commit/41f2b70)), closes [#280](https://github.com/wppconnect-team/wa-js/issues/280)
* **deps-dev:** Bump prettier from 2.5.1 to 2.6.0 (#287) ([6aa64bd](https://github.com/wppconnect-team/wa-js/commit/6aa64bd)), closes [#287](https://github.com/wppconnect-team/wa-js/issues/287)
* Fix dependabot ref ([ab1ab05](https://github.com/wppconnect-team/wa-js/commit/ab1ab05))

## <small>1.2.2 (2022-03-12)</small>

### Bug Fixes

* Fixed WPP.chat.deleteMessage for old versions (fix wppconnect-team/wppconnect#937) ([a53ec55](https://github.com/wppconnect-team/wa-js/commit/a53ec55)), closes [wppconnect-team/wppconnect#937](https://github.com/wppconnect-team/wppconnect/issues/937)
* Fixed WPP.chat.on('msg_revoke') event (fix wppconnect-team/wppconnect#932) ([aee0e99](https://github.com/wppconnect-team/wa-js/commit/aee0e99)), closes [wppconnect-team/wppconnect#932](https://github.com/wppconnect-team/wppconnect/issues/932)

### Chores

* **deps-dev:** Bump ts-loader from 9.2.7 to 9.2.8 (#276) ([0bfc1fd](https://github.com/wppconnect-team/wa-js/commit/0bfc1fd)), closes [#276](https://github.com/wppconnect-team/wa-js/issues/276)
* Fix dependabot auto merge ([a7d45df](https://github.com/wppconnect-team/wa-js/commit/a7d45df))

## <small>1.2.1 (2022-03-09)</small>

### Bug Fixes

* Fixed compatibility with WhatsApp 2.2208.7 ([3bcac63](https://github.com/wppconnect-team/wa-js/commit/3bcac63))

### Documentation

* Fixed some docs ([3327dd1](https://github.com/wppconnect-team/wa-js/commit/3327dd1))

### Continuous Integration

* Added delay for dependabot ([c6e77f8](https://github.com/wppconnect-team/wa-js/commit/c6e77f8))

### Chores

* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#275) ([a085554](https://github.com/wppconnect-team/wa-js/commit/a085554)), closes [#275](https://github.com/wppconnect-team/wa-js/issues/275)
* **deps-dev:** Bump @typescript-eslint/parser from 5.13.0 to 5.14.0 (#273) ([70133a8](https://github.com/wppconnect-team/wa-js/commit/70133a8)), closes [#273](https://github.com/wppconnect-team/wa-js/issues/273)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.39 to 1.1.40 (#274) ([638837e](https://github.com/wppconnect-team/wa-js/commit/638837e)), closes [#274](https://github.com/wppconnect-team/wa-js/issues/274)
* **deps-dev:** Bump eslint-config-prettier from 8.4.0 to 8.5.0 (#268) ([b392482](https://github.com/wppconnect-team/wa-js/commit/b392482)), closes [#268](https://github.com/wppconnect-team/wa-js/issues/268)
* **deps-dev:** Bump ts-morph from 13.0.3 to 14.0.0 (#269) ([d48ee95](https://github.com/wppconnect-team/wa-js/commit/d48ee95)), closes [#269](https://github.com/wppconnect-team/wa-js/issues/269)
* **deps-dev:** Bump ts-node from 10.6.0 to 10.7.0 (#272) ([2422155](https://github.com/wppconnect-team/wa-js/commit/2422155)), closes [#272](https://github.com/wppconnect-team/wa-js/issues/272)
* **deps-dev:** Bump webpack from 5.69.1 to 5.70.0 (#270) ([3560530](https://github.com/wppconnect-team/wa-js/commit/3560530)), closes [#270](https://github.com/wppconnect-team/wa-js/issues/270)
* **deps:** Bump actions/checkout from 2 to 3 (#265) ([8956e6d](https://github.com/wppconnect-team/wa-js/commit/8956e6d)), closes [#265](https://github.com/wppconnect-team/wa-js/issues/265)

## 1.2.0 (2022-03-03)

### Features

* Add WPP.conn.refreshQR function ([edae1c0](https://github.com/wppconnect-team/wa-js/commit/edae1c0))
* Added WPP.conn.isMainLoaded function ([46d7b47](https://github.com/wppconnect-team/wa-js/commit/46d7b47))
* Added WPP.conn.on('authenticated') event ([21d24dc](https://github.com/wppconnect-team/wa-js/commit/21d24dc))
* Added WPP.conn.on('main_loaded') event ([ea696f9](https://github.com/wppconnect-team/wa-js/commit/ea696f9))
* Added WPP.conn.on('main_ready') event ([9709b0d](https://github.com/wppconnect-team/wa-js/commit/9709b0d))
* Added WPP.conn.on('require_auth') event ([f75b372](https://github.com/wppconnect-team/wa-js/commit/f75b372))
* Extracted Stream module ([0d8f076](https://github.com/wppconnect-team/wa-js/commit/0d8f076))

### Bug Fixes

* Fixed webpack injection cache ([15f6b3f](https://github.com/wppconnect-team/wa-js/commit/15f6b3f))

### Code Refactoring

* Reduced duplicated code ([090f26d](https://github.com/wppconnect-team/wa-js/commit/090f26d))
* Renamed State to Socket ([c2da66d](https://github.com/wppconnect-team/wa-js/commit/c2da66d))
* Reorganized conn events ([b3f331b](https://github.com/wppconnect-team/wa-js/commit/b3f331b))

### Continuous Integration

* Added release workflow options ([d1ff89e](https://github.com/wppconnect-team/wa-js/commit/d1ff89e))
* Updated workflow ([d4e48a9](https://github.com/wppconnect-team/wa-js/commit/d4e48a9))

### Chores

* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([1826b5c](https://github.com/wppconnect-team/wa-js/commit/1826b5c))
* **deps-dev:** Bump @typescript-eslint/parser from 5.12.1 to 5.13.0 ([0e21ad6](https://github.com/wppconnect-team/wa-js/commit/0e21ad6))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.33 to 1.1.34 ([22398ef](https://github.com/wppconnect-team/wa-js/commit/22398ef))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.35 to 1.1.38 ([ddc4d59](https://github.com/wppconnect-team/wa-js/commit/ddc4d59))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.38 to 1.1.39 (#264) ([22ab4bf](https://github.com/wppconnect-team/wa-js/commit/22ab4bf)), closes [#264](https://github.com/wppconnect-team/wa-js/issues/264)
* **deps-dev:** Bump eslint from 8.9.0 to 8.10.0 ([54b2659](https://github.com/wppconnect-team/wa-js/commit/54b2659))
* **deps-dev:** Bump ts-loader from 9.2.6 to 9.2.7 (#266) ([f59b72d](https://github.com/wppconnect-team/wa-js/commit/f59b72d)), closes [#266](https://github.com/wppconnect-team/wa-js/issues/266)
* **deps-dev:** Bump ts-node from 10.5.0 to 10.6.0 (#267) ([2c17fbe](https://github.com/wppconnect-team/wa-js/commit/2c17fbe)), closes [#267](https://github.com/wppconnect-team/wa-js/issues/267)
* **deps-dev:** Bump typescript from 4.5.5 to 4.6.2 ([d15e168](https://github.com/wppconnect-team/wa-js/commit/d15e168))
* **deps:** Bump dependabot/fetch-metadata from 1.2.1 to 1.3.0 ([e173b58](https://github.com/wppconnect-team/wa-js/commit/e173b58))
* Fixed launch:local cache ([7ba2079](https://github.com/wppconnect-team/wa-js/commit/7ba2079))
* Improved wa-source command ([385bd0c](https://github.com/wppconnect-team/wa-js/commit/385bd0c))
* Removed commitizen package ([1f6aba6](https://github.com/wppconnect-team/wa-js/commit/1f6aba6))
* Reorganized wa-source ([e038244](https://github.com/wppconnect-team/wa-js/commit/e038244))
* Updated @wppconnect/wa-version ([5d6e082](https://github.com/wppconnect-team/wa-js/commit/5d6e082))
* Updated @wppconnect/wa-version ([a29ba8d](https://github.com/wppconnect-team/wa-js/commit/a29ba8d))
* Updated package-lock.json ([869bbf5](https://github.com/wppconnect-team/wa-js/commit/869bbf5))
* Updated typedoc ([1dd64a2](https://github.com/wppconnect-team/wa-js/commit/1dd64a2))

### Other Changes

* refactor!: Renamed auth to conn ([bc72d11](https://github.com/wppconnect-team/wa-js/commit/bc72d11))


### BREAKING CHANGE

* Renamed auth to conn

## <small>1.1.19 (2022-02-25)</small>

### Bug Fixes

* Fixed constants definitions ([4d7a546](https://github.com/wppconnect-team/wa-js/commit/4d7a546))

### Documentation

* Update whatsapp modules ID ([59549c2](https://github.com/wppconnect-team/wa-js/commit/59549c2))

### Chores

* **deps-dev:** Bump @playwright/test from 1.19.1 to 1.19.2 ([ee895d7](https://github.com/wppconnect-team/wa-js/commit/ee895d7))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([0a9b767](https://github.com/wppconnect-team/wa-js/commit/0a9b767))
* **deps-dev:** Bump @typescript-eslint/parser from 5.12.0 to 5.12.1 ([5caef3f](https://github.com/wppconnect-team/wa-js/commit/5caef3f))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.30 to 1.1.31 ([dfc847b](https://github.com/wppconnect-team/wa-js/commit/dfc847b))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.31 to 1.1.32 ([60acd4d](https://github.com/wppconnect-team/wa-js/commit/60acd4d))
* **deps-dev:** Bump eslint-config-prettier from 8.3.0 to 8.4.0 ([5cbf441](https://github.com/wppconnect-team/wa-js/commit/5cbf441))
* **deps-dev:** Bump playwright-chromium from 1.19.1 to 1.19.2 ([aeb444b](https://github.com/wppconnect-team/wa-js/commit/aeb444b))
* **deps-dev:** Bump release-it from 14.12.4 to 14.12.5 ([e83e3c1](https://github.com/wppconnect-team/wa-js/commit/e83e3c1))
* **deps-dev:** Bump webpack from 5.69.0 to 5.69.1 ([01be033](https://github.com/wppconnect-team/wa-js/commit/01be033))
* **deps:** Bump actions/setup-node from 2.5.1 to 3.0.0 ([467e8d8](https://github.com/wppconnect-team/wa-js/commit/467e8d8))
* **deps:** Bump dependabot/fetch-metadata from 1.2.0 to 1.2.1 ([f2e873e](https://github.com/wppconnect-team/wa-js/commit/f2e873e))

## <small>1.1.18 (2022-02-17)</small>

### Bug Fixes

* Fixed group functions when there are a lot of chats (fix wppconnect-team/wppconnect#871) ([1ff6a50](https://github.com/wppconnect-team/wa-js/commit/1ff6a50)), closes [wppconnect-team/wppconnect#871](https://github.com/wppconnect-team/wppconnect/issues/871)

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.1.0 to 16.2.1 ([30cd0e1](https://github.com/wppconnect-team/wa-js/commit/30cd0e1))
* **deps-dev:** Bump @commitlint/config-conventional ([215441e](https://github.com/wppconnect-team/wa-js/commit/215441e))
* **deps-dev:** Bump @commitlint/cz-commitlint from 16.1.0 to 16.2.1 ([986ba4b](https://github.com/wppconnect-team/wa-js/commit/986ba4b))
* **deps-dev:** Bump @playwright/test from 1.18.1 to 1.19.0 ([5256d91](https://github.com/wppconnect-team/wa-js/commit/5256d91))
* **deps-dev:** Bump @playwright/test from 1.19.0 to 1.19.1 ([1f75b1a](https://github.com/wppconnect-team/wa-js/commit/1f75b1a))
* **deps-dev:** Bump @types/node from 14.18.11 to 14.18.12 ([5bee0f4](https://github.com/wppconnect-team/wa-js/commit/5bee0f4))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([05a50c0](https://github.com/wppconnect-team/wa-js/commit/05a50c0))
* **deps-dev:** Bump @typescript-eslint/parser from 5.11.0 to 5.12.0 ([6952223](https://github.com/wppconnect-team/wa-js/commit/6952223))
* **deps-dev:** Bump eslint from 8.8.0 to 8.9.0 ([b7b1909](https://github.com/wppconnect-team/wa-js/commit/b7b1909))
* **deps-dev:** Bump playwright-chromium from 1.18.1 to 1.19.0 ([1b4fa74](https://github.com/wppconnect-team/wa-js/commit/1b4fa74))
* **deps-dev:** Bump playwright-chromium from 1.19.0 to 1.19.1 ([1fa37c8](https://github.com/wppconnect-team/wa-js/commit/1fa37c8))
* **deps-dev:** Bump webpack from 5.68.0 to 5.69.0 ([de759e3](https://github.com/wppconnect-team/wa-js/commit/de759e3))
* **deps:** Bump actions/github-script from 5 to 6 ([f108211](https://github.com/wppconnect-team/wa-js/commit/f108211))
* **deps:** Bump dependabot/fetch-metadata from 1.1.1 to 1.2.0 ([5afc06f](https://github.com/wppconnect-team/wa-js/commit/5afc06f))

## <small>1.1.17 (2022-02-12)</small>

### Bug Fixes

* Fixed exportation enum for WPP.group.setProperty ([76009f5](https://github.com/wppconnect-team/wa-js/commit/76009f5))

### Documentation

* Update whatsapp modules ID ([00f50b2](https://github.com/wppconnect-team/wa-js/commit/00f50b2))

### Chores

* **deps-dev:** Bump @types/node from 14.18.10 to 14.18.11 ([f844055](https://github.com/wppconnect-team/wa-js/commit/f844055))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([ce0d67d](https://github.com/wppconnect-team/wa-js/commit/ce0d67d))
* **deps-dev:** Bump @typescript-eslint/parser from 5.10.2 to 5.11.0 ([9e03797](https://github.com/wppconnect-team/wa-js/commit/9e03797))
* **deps-dev:** Bump emittery from 0.10.0 to 0.10.1 ([f6c4de4](https://github.com/wppconnect-team/wa-js/commit/f6c4de4))
* **deps-dev:** Bump ts-node from 10.4.0 to 10.5.0 ([8f141f0](https://github.com/wppconnect-team/wa-js/commit/8f141f0))

## <small>1.1.16 (2022-02-06)</small>

### Bug Fixes

* exported WPP.group.getGroupInfoFromInviteCode function ([0616778](https://github.com/wppconnect-team/wa-js/commit/0616778))

## <small>1.1.15 (2022-02-06)</small>

### Features

* Added WPP.chat.openChatAt, openChatBottom and openChatFromUnread functions ([5e33e2d](https://github.com/wppconnect-team/wa-js/commit/5e33e2d))
* Added WPP.group.getGroupInfoFromInviteCode function ([15462d8](https://github.com/wppconnect-team/wa-js/commit/15462d8))
* Added WPP.group.getInviteCode function ([675845c](https://github.com/wppconnect-team/wa-js/commit/675845c))
* Added WPP.group.join function ([2f92669](https://github.com/wppconnect-team/wa-js/commit/2f92669))
* Added WPP.group.leave function ([0981635](https://github.com/wppconnect-team/wa-js/commit/0981635))
* Added WPP.group.revokeInviteCode function ([501c378](https://github.com/wppconnect-team/wa-js/commit/501c378))
* Added WPP.group.setDescription function ([547999f](https://github.com/wppconnect-team/wa-js/commit/547999f))
* Added WPP.group.setProperty function ([0fdfb37](https://github.com/wppconnect-team/wa-js/commit/0fdfb37))
* Added WPP.group.setSubject function ([d0dcc5e](https://github.com/wppconnect-team/wa-js/commit/d0dcc5e))
* Extracted createMsgProtobuf function ([514065a](https://github.com/wppconnect-team/wa-js/commit/514065a))
* Extracted sendCallSignalingMsg function ([05b5779](https://github.com/wppconnect-team/wa-js/commit/05b5779))
* Extracted set group properties functions ([548e880](https://github.com/wppconnect-team/wa-js/commit/548e880))

### Bug Fixes

* Fixed permission check for set group subject/description ([0ff6d58](https://github.com/wppconnect-team/wa-js/commit/0ff6d58))
* Fixed WPP.chat.getMessageById for old messages in MD ([5023dd9](https://github.com/wppconnect-team/wa-js/commit/5023dd9))

### Code Refactoring

* Improved usage of iAmAdmin in group functions ([99d2369](https://github.com/wppconnect-team/wa-js/commit/99d2369))

### Continuous Integration

* Fixed published release name ([242a954](https://github.com/wppconnect-team/wa-js/commit/242a954))

### Chores

* Added protocol log tool for MD version ([b02d3af](https://github.com/wppconnect-team/wa-js/commit/b02d3af))
* **deps-dev:** Bump @playwright/test from 1.18.0 to 1.18.1 ([f710bde](https://github.com/wppconnect-team/wa-js/commit/f710bde))
* **deps-dev:** Bump @types/node from 14.18.9 to 14.18.10 ([86ce08e](https://github.com/wppconnect-team/wa-js/commit/86ce08e))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([793d2dd](https://github.com/wppconnect-team/wa-js/commit/793d2dd))
* **deps-dev:** Bump @typescript-eslint/parser from 5.10.1 to 5.10.2 ([e8e6ba8](https://github.com/wppconnect-team/wa-js/commit/e8e6ba8))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.29 to 1.1.30 ([796faea](https://github.com/wppconnect-team/wa-js/commit/796faea))
* **deps-dev:** Bump eslint from 8.7.0 to 8.8.0 ([887f4e4](https://github.com/wppconnect-team/wa-js/commit/887f4e4))
* **deps-dev:** Bump playwright-chromium from 1.18.0 to 1.18.1 ([ec506da](https://github.com/wppconnect-team/wa-js/commit/ec506da))
* **deps-dev:** Bump webpack from 5.67.0 to 5.68.0 ([f7b7e95](https://github.com/wppconnect-team/wa-js/commit/f7b7e95))
* Updated @wppconnect/wa-version ([90e2a04](https://github.com/wppconnect-team/wa-js/commit/90e2a04))

## <small>1.1.14 (2022-01-28)</small>

### Bug Fixes

* Fixed WPP.contact.queryExists to avoid stuck in MD ([53ef3b4](https://github.com/wppconnect-team/wa-js/commit/53ef3b4))

## <small>1.1.13 (2022-01-28)</small>

### Bug Fixes

* Fixed WPP.contact.queryExists to avoid stuck in MD ([a7761e5](https://github.com/wppconnect-team/wa-js/commit/a7761e5))

### Continuous Integration

* Publish wppconnect-wa.js in GitHub Release ([a820cca](https://github.com/wppconnect-team/wa-js/commit/a820cca))

### Chores

* **deps-dev:** Bump typedoc-plugin-mdn-links from 1.0.4 to 1.0.5 ([3f075e2](https://github.com/wppconnect-team/wa-js/commit/3f075e2))

## <small>1.1.12 (2022-01-26)</small>

### Features

* Added WPP.util.isBase64 function ([5817ab5](https://github.com/wppconnect-team/wa-js/commit/5817ab5))

### Bug Fixes

* Fixed WPP.contact.queryExists function for false positive ([bf29270](https://github.com/wppconnect-team/wa-js/commit/bf29270))
* Improved file mimetype detection ([df98559](https://github.com/wppconnect-team/wa-js/commit/df98559))
* Update compatibility to WhatsApp 2.2202.8 ([b1e56ee](https://github.com/wppconnect-team/wa-js/commit/b1e56ee))

### Documentation

* Added function to update model attributes ([7e05b78](https://github.com/wppconnect-team/wa-js/commit/7e05b78))
* Update whatsapp modules ID ([c95a931](https://github.com/wppconnect-team/wa-js/commit/c95a931))

### Chores

* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([d1f3668](https://github.com/wppconnect-team/wa-js/commit/d1f3668))
* **deps-dev:** Bump @typescript-eslint/parser from 5.10.0 to 5.10.1 ([796d295](https://github.com/wppconnect-team/wa-js/commit/796d295))
* **deps-dev:** Bump release-it from 14.12.3 to 14.12.4 ([8cbef4d](https://github.com/wppconnect-team/wa-js/commit/8cbef4d))
* **deps-dev:** Bump ts-morph from 13.0.2 to 13.0.3 ([ce35a76](https://github.com/wppconnect-team/wa-js/commit/ce35a76))
* **deps-dev:** Bump webpack from 5.66.0 to 5.67.0 ([4a0d3ae](https://github.com/wppconnect-team/wa-js/commit/4a0d3ae))
* **deps-dev:** Bump webpack-cli from 4.9.1 to 4.9.2 ([97faeee](https://github.com/wppconnect-team/wa-js/commit/97faeee))

## <small>1.1.11 (2022-01-22)</small>

### Features

* Added WPP.chat.starMessage function ([99757dc](https://github.com/wppconnect-team/wa-js/commit/99757dc))
* Added WPP.profile.getMyStatus function ([7c5975d](https://github.com/wppconnect-team/wa-js/commit/7c5975d))

### Bug Fixes

* Reduced script file size ([2276373](https://github.com/wppconnect-team/wa-js/commit/2276373))

## <small>1.1.10 (2022-01-22)</small>

### Bug Fixes

* Fixed getMessageById when the message is from status (wppconnect-team/wppconnect#823) ([f075cd2](https://github.com/wppconnect-team/wa-js/commit/f075cd2)), closes [wppconnect-team/wppconnect#823](https://github.com/wppconnect-team/wppconnect/issues/823)

### Chores

* **deps-dev:** Bump typescript from 4.5.4 to 4.5.5 ([27b64b8](https://github.com/wppconnect-team/wa-js/commit/27b64b8))

## <small>1.1.9 (2022-01-21)</small>

### Bug Fixes

* Fixed exported class Wap for old WhatsApp version ([b71b222](https://github.com/wppconnect-team/wa-js/commit/b71b222))
* Fixed live location event register and added a option ([08949a9](https://github.com/wppconnect-team/wa-js/commit/08949a9))

## <small>1.1.8 (2022-01-21)</small>

### Bug Fixes

* Fixed WPP.contact.queryExists function (fix wppconnect-team/wppconnect#803) ([63a021d](https://github.com/wppconnect-team/wa-js/commit/63a021d)), closes [wppconnect-team/wppconnect#803](https://github.com/wppconnect-team/wppconnect/issues/803)

### Code Refactoring

* Fixed type ([639a1ab](https://github.com/wppconnect-team/wa-js/commit/639a1ab))

## <small>1.1.7 (2022-01-20)</small>

### Bug Fixes

* Ignore errors in prepareLinkPreview ([5ae0ef3](https://github.com/wppconnect-team/wa-js/commit/5ae0ef3))

## <small>1.1.6 (2022-01-20)</small>

### Features

* Added WPP.contact.getStatus function ([3d7fb55](https://github.com/wppconnect-team/wa-js/commit/3d7fb55))
* Added WPP.profile.setMyStatus function ([caaa3ce](https://github.com/wppconnect-team/wa-js/commit/caaa3ce))
* Extracted getStatus and setMyStatus functions ([3777cf4](https://github.com/wppconnect-team/wa-js/commit/3777cf4))

### Bug Fixes

* Added catch block for prepareLinkPreview ([b44d764](https://github.com/wppconnect-team/wa-js/commit/b44d764))
* Ignore markIsRead error while is sending message ([17d4ca5](https://github.com/wppconnect-team/wa-js/commit/17d4ca5))

### Documentation

* Removed WhatsApp version from comments to avoid lot of unecessary changes ([a05c786](https://github.com/wppconnect-team/wa-js/commit/a05c786))

### Tests

* Started the development of tests ([ee856be](https://github.com/wppconnect-team/wa-js/commit/ee856be))

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.0.2 to 16.0.3 ([d36d5ba](https://github.com/wppconnect-team/wa-js/commit/d36d5ba))
* **deps-dev:** Bump @commitlint/cli from 16.0.3 to 16.1.0 ([3916759](https://github.com/wppconnect-team/wa-js/commit/3916759))
* **deps-dev:** Bump @commitlint/cz-commitlint from 16.0.0 to 16.0.3 ([d256cf3](https://github.com/wppconnect-team/wa-js/commit/d256cf3))
* **deps-dev:** Bump @commitlint/cz-commitlint from 16.0.3 to 16.1.0 ([187f403](https://github.com/wppconnect-team/wa-js/commit/187f403))
* **deps-dev:** Bump @playwright/test from 1.17.2 to 1.18.0 ([ae874d8](https://github.com/wppconnect-team/wa-js/commit/ae874d8))
* **deps-dev:** Bump @types/node from 14.18.5 to 14.18.7 ([c2c59ea](https://github.com/wppconnect-team/wa-js/commit/c2c59ea))
* **deps-dev:** Bump @types/node from 14.18.7 to 14.18.9 ([cbcf6e5](https://github.com/wppconnect-team/wa-js/commit/cbcf6e5))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([97f3af5](https://github.com/wppconnect-team/wa-js/commit/97f3af5))
* **deps-dev:** Bump @typescript-eslint/parser from 5.9.1 to 5.10.0 ([b5476b7](https://github.com/wppconnect-team/wa-js/commit/b5476b7))
* **deps-dev:** Bump eslint from 8.6.0 to 8.7.0 ([8d4ce84](https://github.com/wppconnect-team/wa-js/commit/8d4ce84))
* **deps-dev:** Bump playwright-chromium from 1.17.2 to 1.18.0 ([43c0307](https://github.com/wppconnect-team/wa-js/commit/43c0307))
* **deps-dev:** Bump release-it from 14.12.1 to 14.12.3 ([9c4c55f](https://github.com/wppconnect-team/wa-js/commit/9c4c55f))

## <small>1.1.5 (2022-01-15)</small>

### Features

* Added WPP.chat.mute and unmute functions ([d2c5c7c](https://github.com/wppconnect-team/wa-js/commit/d2c5c7c))
* Extracted sendSetPicture function ([127f32c](https://github.com/wppconnect-team/wa-js/commit/127f32c))

### Bug Fixes

* Allow WPP.contact.queryExists to throw exception (wppconnect-team/wppconnect#793) ([7331aad](https://github.com/wppconnect-team/wa-js/commit/7331aad)), closes [wppconnect-team/wppconnect#793](https://github.com/wppconnect-team/wppconnect/issues/793)

### Chores

* Removed unwanted console.log ([92150c0](https://github.com/wppconnect-team/wa-js/commit/92150c0))

## <small>1.1.4 (2022-01-14)</small>

### Bug Fixes

* Fixed WPP.chat.markIsRead and markIsUnread functions (fix wppconnect-team/wppconnect#786) ([a1158f6](https://github.com/wppconnect-team/wa-js/commit/a1158f6)), closes [wppconnect-team/wppconnect#786](https://github.com/wppconnect-team/wppconnect/issues/786)

### Documentation

* Update whatsapp modules ID ([d580740](https://github.com/wppconnect-team/wa-js/commit/d580740))

### Chores

* **deps-dev:** Bump @commitlint/cli from 16.0.1 to 16.0.2 ([2bfbc35](https://github.com/wppconnect-team/wa-js/commit/2bfbc35))
* **deps-dev:** Bump @types/shelljs from 0.8.10 to 0.8.11 ([c8876b7](https://github.com/wppconnect-team/wa-js/commit/c8876b7))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([add921d](https://github.com/wppconnect-team/wa-js/commit/add921d))
* **deps-dev:** Bump @typescript-eslint/parser from 5.9.0 to 5.9.1 ([cacb458](https://github.com/wppconnect-team/wa-js/commit/cacb458))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.26 to 1.1.27 ([ced5360](https://github.com/wppconnect-team/wa-js/commit/ced5360))
* **deps-dev:** Bump playwright-chromium from 1.17.1 to 1.17.2 ([2523e28](https://github.com/wppconnect-team/wa-js/commit/2523e28))
* **deps-dev:** Bump release-it from 14.11.8 to 14.12.1 ([3bd4da7](https://github.com/wppconnect-team/wa-js/commit/3bd4da7))
* **deps-dev:** Bump shx from 0.3.3 to 0.3.4 ([8c28a90](https://github.com/wppconnect-team/wa-js/commit/8c28a90))
* **deps-dev:** Bump webpack from 5.65.0 to 5.66.0 ([7135e26](https://github.com/wppconnect-team/wa-js/commit/7135e26))

## <small>1.1.3 (2022-01-08)</small>

### Features

* Added function WPP.util.blobToBase64 ([fc06eef](https://github.com/wppconnect-team/wa-js/commit/fc06eef))
* Added WPP.util ([1bbe448](https://github.com/wppconnect-team/wa-js/commit/1bbe448))

### Bug Fixes

* Fixed WPP.chat.downloadMedia for Videos in Chromium ([ba07dfc](https://github.com/wppconnect-team/wa-js/commit/ba07dfc))

## <small>1.1.2 (2022-01-08)</small>

### Bug Fixes

* Fixed missing exported interfaces ([8b71f14](https://github.com/wppconnect-team/wa-js/commit/8b71f14))

## <small>1.1.1 (2022-01-08)</small>

## 1.1.0 (2022-01-08)

### Features

* Added linkPreview for WPP.chat.sendTextMessage ([d39f325](https://github.com/wppconnect-team/wa-js/commit/d39f325))
* Added live location events in WPP.chat (#184) ([d4c6f27](https://github.com/wppconnect-team/wa-js/commit/d4c6f27)), closes [#184](https://github.com/wppconnect-team/wa-js/issues/184)
* Added WPP.chat.downloadMedia function ([712095a](https://github.com/wppconnect-team/wa-js/commit/712095a))
* Added WPP.group.getParticipants function ([70d5c39](https://github.com/wppconnect-team/wa-js/commit/70d5c39))
* Extracted fetchLinkPreview function ([0049dca](https://github.com/wppconnect-team/wa-js/commit/0049dca))
* Extracted findFirstWebLink function ([c4e04e0](https://github.com/wppconnect-team/wa-js/commit/c4e04e0))
* Extracted MediaBlobCache class ([da30052](https://github.com/wppconnect-team/wa-js/commit/da30052))
* More label functions (#154) ([c92efec](https://github.com/wppconnect-team/wa-js/commit/c92efec)), closes [#154](https://github.com/wppconnect-team/wa-js/issues/154)
* New function WPP.auth.setMultiDevice (#183) ([e81307e](https://github.com/wppconnect-team/wa-js/commit/e81307e)), closes [#183](https://github.com/wppconnect-team/wa-js/issues/183)
* Send file as sticker (#155) ([8395965](https://github.com/wppconnect-team/wa-js/commit/8395965)), closes [#155](https://github.com/wppconnect-team/wa-js/issues/155)

### Bug Fixes

* Fixed WPP.contact.queryExists (fix wppconnect-team/wppconnect#725) ([0c2b50c](https://github.com/wppconnect-team/wa-js/commit/0c2b50c)), closes [wppconnect-team/wppconnect#725](https://github.com/wppconnect-team/wppconnect/issues/725)

### Code Refactoring

* Improved WPP.chat.getMessageById ([d9eb965](https://github.com/wppconnect-team/wa-js/commit/d9eb965))
* Splitted auth and blocklist functions into files ([c3f1b48](https://github.com/wppconnect-team/wa-js/commit/c3f1b48))
* Splitted chat functions into files ([b403477](https://github.com/wppconnect-team/wa-js/commit/b403477))
* Splitted contact, group and labels functions into files ([8c3fe7d](https://github.com/wppconnect-team/wa-js/commit/8c3fe7d))
* Splitted status functions into files ([6476f2e](https://github.com/wppconnect-team/wa-js/commit/6476f2e))

### Documentation

* Added how to use in the README.md ([a96a5bd](https://github.com/wppconnect-team/wa-js/commit/a96a5bd))
* Added whatsapp modules ID ([d42d3e0](https://github.com/wppconnect-team/wa-js/commit/d42d3e0))
* Update whatsapp modules ID ([3e34eb7](https://github.com/wppconnect-team/wa-js/commit/3e34eb7))

### Chores

* Added WPP.webpack.moduleSource function ([01b1c20](https://github.com/wppconnect-team/wa-js/commit/01b1c20))
* Allow to pass user-data-dir to launch:local ([b2eff49](https://github.com/wppconnect-team/wa-js/commit/b2eff49))
* **deps-dev:** Bump @commitlint/cli from 15.0.0 to 16.0.1 ([de6fe63](https://github.com/wppconnect-team/wa-js/commit/de6fe63))
* **deps-dev:** Bump @commitlint/config-conventional ([ee3a5a9](https://github.com/wppconnect-team/wa-js/commit/ee3a5a9))
* **deps-dev:** Bump @commitlint/cz-commitlint from 15.0.0 to 16.0.0 ([a829b98](https://github.com/wppconnect-team/wa-js/commit/a829b98))
* **deps-dev:** Bump @types/node from 14.18.0 to 14.18.1 ([fa0f306](https://github.com/wppconnect-team/wa-js/commit/fa0f306))
* **deps-dev:** Bump @types/node from 14.18.1 to 14.18.2 ([98774e7](https://github.com/wppconnect-team/wa-js/commit/98774e7))
* **deps-dev:** Bump @types/node from 14.18.2 to 14.18.3 ([e51a5b9](https://github.com/wppconnect-team/wa-js/commit/e51a5b9))
* **deps-dev:** Bump @types/node from 14.18.3 to 14.18.4 ([38dd93a](https://github.com/wppconnect-team/wa-js/commit/38dd93a))
* **deps-dev:** Bump @types/node from 14.18.4 to 14.18.5 ([5917261](https://github.com/wppconnect-team/wa-js/commit/5917261))
* **deps-dev:** Bump @types/shelljs from 0.8.9 to 0.8.10 ([76ae97f](https://github.com/wppconnect-team/wa-js/commit/76ae97f))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([5f8b075](https://github.com/wppconnect-team/wa-js/commit/5f8b075))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([27bd0dd](https://github.com/wppconnect-team/wa-js/commit/27bd0dd))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([c6ec292](https://github.com/wppconnect-team/wa-js/commit/c6ec292))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([7cd1ee3](https://github.com/wppconnect-team/wa-js/commit/7cd1ee3))
* **deps-dev:** Bump @typescript-eslint/parser from 5.6.0 to 5.7.0 ([6d039b8](https://github.com/wppconnect-team/wa-js/commit/6d039b8))
* **deps-dev:** Bump @typescript-eslint/parser from 5.7.0 to 5.8.0 ([37b7880](https://github.com/wppconnect-team/wa-js/commit/37b7880))
* **deps-dev:** Bump @typescript-eslint/parser from 5.8.0 to 5.8.1 ([7936914](https://github.com/wppconnect-team/wa-js/commit/7936914))
* **deps-dev:** Bump @typescript-eslint/parser from 5.8.1 to 5.9.0 ([839b94e](https://github.com/wppconnect-team/wa-js/commit/839b94e))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.24 to 1.1.25 ([ae6e045](https://github.com/wppconnect-team/wa-js/commit/ae6e045))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.25 to 1.1.26 ([4819a50](https://github.com/wppconnect-team/wa-js/commit/4819a50))
* **deps-dev:** Bump conventional-changelog-cli from 2.1.1 to 2.2.2 ([4fc64a5](https://github.com/wppconnect-team/wa-js/commit/4fc64a5))
* **deps-dev:** Bump eslint from 8.4.1 to 8.5.0 ([29874df](https://github.com/wppconnect-team/wa-js/commit/29874df))
* **deps-dev:** Bump eslint from 8.5.0 to 8.6.0 ([56e55c7](https://github.com/wppconnect-team/wa-js/commit/56e55c7))
* **deps-dev:** Bump eslint-plugin-import from 2.25.3 to 2.25.4 ([f20b1af](https://github.com/wppconnect-team/wa-js/commit/f20b1af))
* **deps-dev:** Bump pretty-quick from 3.1.2 to 3.1.3 ([784ac54](https://github.com/wppconnect-team/wa-js/commit/784ac54))
* **deps-dev:** Bump typescript from 4.5.2 to 4.5.3 ([ddeaa7d](https://github.com/wppconnect-team/wa-js/commit/ddeaa7d))
* **deps-dev:** Bump typescript from 4.5.3 to 4.5.4 ([11b7ffd](https://github.com/wppconnect-team/wa-js/commit/11b7ffd))
* **deps:** Bump actions/setup-node from 2.5.0 to 2.5.1 (#173) ([1e6cdf9](https://github.com/wppconnect-team/wa-js/commit/1e6cdf9)), closes [#173](https://github.com/wppconnect-team/wa-js/issues/173)
* Extracted functions related about handle ACK ([2d3fdb3](https://github.com/wppconnect-team/wa-js/commit/2d3fdb3))
* Improved launch with VSCode ([22b53e2](https://github.com/wppconnect-team/wa-js/commit/22b53e2))

## <small>1.0.16 (2021-12-08)</small>

### Features

* Added markIsComposing, markIsRecording and markIsPaused chat functions ([2ec6bfc](https://github.com/wppconnect-team/wa-js/commit/2ec6bfc))
* Added markIsRead option for sending message ([0a92e98](https://github.com/wppconnect-team/wa-js/commit/0a92e98))
* Added WPP.chat.markAsRead and WPP.chat.markAsUnread functions ([1db6903](https://github.com/wppconnect-team/wa-js/commit/1db6903))

### Bug Fixes

* Added support to 2.2147.14 WhatsApp version ([1343e04](https://github.com/wppconnect-team/wa-js/commit/1343e04))

### Documentation

* Update whatsapp modules ID ([e97ae5d](https://github.com/wppconnect-team/wa-js/commit/e97ae5d))

### Continuous Integration

* Added retry in test workflow ([c310c0b](https://github.com/wppconnect-team/wa-js/commit/c310c0b))

### Chores

* Added assertIsBusiness to validate account is a business version ([9d0c5d3](https://github.com/wppconnect-team/wa-js/commit/9d0c5d3))
* **deps-dev:** Bump @types/node from 14.17.34 to 14.18.0 ([16cee92](https://github.com/wppconnect-team/wa-js/commit/16cee92))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([a446741](https://github.com/wppconnect-team/wa-js/commit/a446741))
* **deps-dev:** Bump @typescript-eslint/eslint-plugin ([f7d6a32](https://github.com/wppconnect-team/wa-js/commit/f7d6a32))
* **deps-dev:** Bump @typescript-eslint/parser from 5.4.0 to 5.5.0 ([36d3629](https://github.com/wppconnect-team/wa-js/commit/36d3629))
* **deps-dev:** Bump @typescript-eslint/parser from 5.5.0 to 5.6.0 ([450a4fb](https://github.com/wppconnect-team/wa-js/commit/450a4fb))
* **deps-dev:** Bump debug from 4.3.2 to 4.3.3 ([3a3b6c2](https://github.com/wppconnect-team/wa-js/commit/3a3b6c2))
* **deps-dev:** Bump eslint from 8.3.0 to 8.4.0 ([3c7365b](https://github.com/wppconnect-team/wa-js/commit/3c7365b))
* **deps-dev:** Bump eslint from 8.4.0 to 8.4.1 ([b9abeee](https://github.com/wppconnect-team/wa-js/commit/b9abeee))
* **deps-dev:** Bump playwright-chromium from 1.16.3 to 1.17.0 ([d5c1893](https://github.com/wppconnect-team/wa-js/commit/d5c1893))
* **deps-dev:** Bump playwright-chromium from 1.17.0 to 1.17.1 ([79ba374](https://github.com/wppconnect-team/wa-js/commit/79ba374))
* **deps-dev:** Bump prettier from 2.5.0 to 2.5.1 ([7ff8152](https://github.com/wppconnect-team/wa-js/commit/7ff8152))
* **deps-dev:** Bump webpack from 5.64.4 to 5.65.0 ([e3cf247](https://github.com/wppconnect-team/wa-js/commit/e3cf247))
* **deps:** Bump actions/setup-node from 2.4.1 to 2.5.0 ([9983685](https://github.com/wppconnect-team/wa-js/commit/9983685))
* Extracted ChatPresence functions ([11013ab](https://github.com/wppconnect-team/wa-js/commit/11013ab))
* Extracted markSeen functions ([ebb44a0](https://github.com/wppconnect-team/wa-js/commit/ebb44a0))
* Fixed typo ([ab25c99](https://github.com/wppconnect-team/wa-js/commit/ab25c99))

## <small>1.0.15 (2021-11-27)</small>

### Features

* First functions for labels (#126) ([56ed31e](https://github.com/wppconnect-team/wa-js/commit/56ed31e)), closes [#126](https://github.com/wppconnect-team/wa-js/issues/126)

### Bug Fixes

* changed fromBuffer property to fileTypeFromBuffer (#135) ([c5c6667](https://github.com/wppconnect-team/wa-js/commit/c5c6667)), closes [#135](https://github.com/wppconnect-team/wa-js/issues/135)
* Fixed compability with WhatsApp version 2.2134.10 ([7208966](https://github.com/wppconnect-team/wa-js/commit/7208966))
* Fixed compability with WhatsApp version 2.2144.11 ([25e8fd1](https://github.com/wppconnect-team/wa-js/commit/25e8fd1))
* Fixed compability with WhatsApp version 2.2146.9 ([4a3a0b9](https://github.com/wppconnect-team/wa-js/commit/4a3a0b9))
* Fixed compability with WhatsApp version 2.2146.9 ([2310df4](https://github.com/wppconnect-team/wa-js/commit/2310df4))
* Fixed registerRevokeMessageEvent register ([ec26274](https://github.com/wppconnect-team/wa-js/commit/ec26274))
* Reverted file-type update ([d665164](https://github.com/wppconnect-team/wa-js/commit/d665164))

### Performance Improvements

* Improved module resolution time ([f63778b](https://github.com/wppconnect-team/wa-js/commit/f63778b))

### Documentation

* Improved update-module-id script ([1a3b3de](https://github.com/wppconnect-team/wa-js/commit/1a3b3de))
* Update whatsapp modules ID ([ac518d6](https://github.com/wppconnect-team/wa-js/commit/ac518d6))

### Continuous Integration

* Added workflow to test all versions of WhatsApp ([2828b7a](https://github.com/wppconnect-team/wa-js/commit/2828b7a))
* Increased timeout ([c4d1b11](https://github.com/wppconnect-team/wa-js/commit/c4d1b11))
* Update dependabot-auto-merge.yml ([de829ba](https://github.com/wppconnect-team/wa-js/commit/de829ba))

### Chores

* **deps-dev:** Bump @types/node from 14.17.33 to 14.17.34 (#122) ([5597af8](https://github.com/wppconnect-team/wa-js/commit/5597af8)), closes [#122](https://github.com/wppconnect-team/wa-js/issues/122)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#136) ([814b86d](https://github.com/wppconnect-team/wa-js/commit/814b86d)), closes [#136](https://github.com/wppconnect-team/wa-js/issues/136)
* **deps-dev:** Bump @typescript-eslint/parser from 4.33.0 to 5.4.0 ([4c7011f](https://github.com/wppconnect-team/wa-js/commit/4c7011f))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.22 to 1.1.23 (#128) ([1ba9d0a](https://github.com/wppconnect-team/wa-js/commit/1ba9d0a)), closes [#128](https://github.com/wppconnect-team/wa-js/issues/128)
* **deps-dev:** Bump eslint from 7.32.0 to 8.3.0 (#131) ([70c41ae](https://github.com/wppconnect-team/wa-js/commit/70c41ae)), closes [#131](https://github.com/wppconnect-team/wa-js/issues/131)
* **deps-dev:** Bump file-type from 16.5.3 to 17.0.0 (#130) ([3cec4b8](https://github.com/wppconnect-team/wa-js/commit/3cec4b8)), closes [#130](https://github.com/wppconnect-team/wa-js/issues/130)
* **deps-dev:** Bump prettier from 2.4.1 to 2.5.0 (#133) ([ace7a58](https://github.com/wppconnect-team/wa-js/commit/ace7a58)), closes [#133](https://github.com/wppconnect-team/wa-js/issues/133)
* **deps-dev:** Bump release-it from 14.11.7 to 14.11.8 (#124) ([17b6574](https://github.com/wppconnect-team/wa-js/commit/17b6574)), closes [#124](https://github.com/wppconnect-team/wa-js/issues/124)
* **deps-dev:** Bump ts-morph from 12.2.0 to 13.0.0 (#123) ([64c8e3d](https://github.com/wppconnect-team/wa-js/commit/64c8e3d)), closes [#123](https://github.com/wppconnect-team/wa-js/issues/123)
* **deps-dev:** Bump ts-morph from 13.0.0 to 13.0.2 (#127) ([4a290de](https://github.com/wppconnect-team/wa-js/commit/4a290de)), closes [#127](https://github.com/wppconnect-team/wa-js/issues/127)
* **deps-dev:** Bump typedoc-plugin-missing-exports (#134) ([8173614](https://github.com/wppconnect-team/wa-js/commit/8173614)), closes [#134](https://github.com/wppconnect-team/wa-js/issues/134)
* **deps-dev:** Bump typescript from 4.4.4 to 4.5.2 (#132) ([657950c](https://github.com/wppconnect-team/wa-js/commit/657950c)), closes [#132](https://github.com/wppconnect-team/wa-js/issues/132)
* **deps-dev:** Bump webpack from 5.64.1 to 5.64.2 (#125) ([ab222cb](https://github.com/wppconnect-team/wa-js/commit/ab222cb)), closes [#125](https://github.com/wppconnect-team/wa-js/issues/125)
* **deps-dev:** Bump webpack from 5.64.2 to 5.64.3 (#129) ([dc97e6c](https://github.com/wppconnect-team/wa-js/commit/dc97e6c)), closes [#129](https://github.com/wppconnect-team/wa-js/issues/129)
* **deps-dev:** Bump webpack from 5.64.3 to 5.64.4 (#137) ([eafcfec](https://github.com/wppconnect-team/wa-js/commit/eafcfec)), closes [#137](https://github.com/wppconnect-team/wa-js/issues/137)
* Reversed the order of load of runtimes ([aa2171a](https://github.com/wppconnect-team/wa-js/commit/aa2171a))
* Updated badges ([6691c85](https://github.com/wppconnect-team/wa-js/commit/6691c85))

## <small>1.0.14 (2021-11-18)</small>

### Bug Fixes

* Fixed self contact name in WPP.chat.sendVCardContact ([ba40ed1](https://github.com/wppconnect-team/wa-js/commit/ba40ed1))
* Fixed typescript definitions ([77aac88](https://github.com/wppconnect-team/wa-js/commit/77aac88))

### Code Refactoring

* Renamed sendVCardContact to sendVCardContactMessage ([13fb994](https://github.com/wppconnect-team/wa-js/commit/13fb994))


### BREAKING CHANGE

* Renamed sendVCardContact to sendVCardContactMessage

## <small>1.0.13 (2021-11-18)</small>

### Features

* Added WPP.version and WPP.license ([31eaddd](https://github.com/wppconnect-team/wa-js/commit/31eaddd))

### Bug Fixes

* Disabled deviceName by default ([c2f6287](https://github.com/wppconnect-team/wa-js/commit/c2f6287))
* Improved speed of WPP.contact.queryExists to use local contact list first ([fb0bd95](https://github.com/wppconnect-team/wa-js/commit/fb0bd95))

### Documentation

* Update whatsapp modules ID ([61e8d45](https://github.com/wppconnect-team/wa-js/commit/61e8d45))

### Chores

* **deps-dev:** Bump @commitlint/cli from 14.1.0 to 15.0.0 (#119) ([1076e73](https://github.com/wppconnect-team/wa-js/commit/1076e73)), closes [#119](https://github.com/wppconnect-team/wa-js/issues/119)
* **deps-dev:** Bump @commitlint/config-conventional (#120) ([34cf860](https://github.com/wppconnect-team/wa-js/commit/34cf860)), closes [#120](https://github.com/wppconnect-team/wa-js/issues/120)
* **deps-dev:** Bump @commitlint/cz-commitlint from 14.1.0 to 15.0.0 (#121) ([39cbe16](https://github.com/wppconnect-team/wa-js/commit/39cbe16)), closes [#121](https://github.com/wppconnect-team/wa-js/issues/121)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.21 to 1.1.22 (#118) ([8d409da](https://github.com/wppconnect-team/wa-js/commit/8d409da)), closes [#118](https://github.com/wppconnect-team/wa-js/issues/118)
* **deps-dev:** Bump pretty-quick from 3.1.1 to 3.1.2 (#116) ([f04231e](https://github.com/wppconnect-team/wa-js/commit/f04231e)), closes [#116](https://github.com/wppconnect-team/wa-js/issues/116)
* **deps-dev:** Bump webpack from 5.64.0 to 5.64.1 (#117) ([add8005](https://github.com/wppconnect-team/wa-js/commit/add8005)), closes [#117](https://github.com/wppconnect-team/wa-js/issues/117)

## <small>1.0.12 (2021-11-15)</small>

### Features

* Added msg_ack_change event for WPP.chat ([827952b](https://github.com/wppconnect-team/wa-js/commit/827952b))
* Added WPP.chat.sendVCardContact function ([01c9fbe](https://github.com/wppconnect-team/wa-js/commit/01c9fbe))
* Now WPP.chat.sendFileMessage auto detect the content ([09ce7e3](https://github.com/wppconnect-team/wa-js/commit/09ce7e3))

### Documentation

* Update whatsapp modules ID ([4978dc8](https://github.com/wppconnect-team/wa-js/commit/4978dc8))

### Chores

* Added some catalog products functions ([b810b2a](https://github.com/wppconnect-team/wa-js/commit/b810b2a))
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.20 to 1.1.21 (#114) ([b50e6b4](https://github.com/wppconnect-team/wa-js/commit/b50e6b4)), closes [#114](https://github.com/wppconnect-team/wa-js/issues/114)
* **deps-dev:** Bump release-it from 14.11.6 to 14.11.7 (#115) ([3c8efb5](https://github.com/wppconnect-team/wa-js/commit/3c8efb5)), closes [#115](https://github.com/wppconnect-team/wa-js/issues/115)
* Updated output result of update-module-id script ([675d199](https://github.com/wppconnect-team/wa-js/commit/675d199))

## <small>1.0.11 (2021-11-11)</small>

### Features

* Added WPP.contact.queryExists function ([04262f5](https://github.com/wppconnect-team/wa-js/commit/04262f5))
* Added WPP.group.create function ([6bc2260](https://github.com/wppconnect-team/wa-js/commit/6bc2260))

### Documentation

* Update whatsapp modules ID ([34c5d19](https://github.com/wppconnect-team/wa-js/commit/34c5d19))

### Chores

* **deps-dev:** Bump @types/node from 14.17.32 to 14.17.33 (#109) ([75cfee1](https://github.com/wppconnect-team/wa-js/commit/75cfee1)), closes [#109](https://github.com/wppconnect-team/wa-js/issues/109)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.19 to 1.1.20 (#112) ([fd05c56](https://github.com/wppconnect-team/wa-js/commit/fd05c56)), closes [#112](https://github.com/wppconnect-team/wa-js/issues/112)
* **deps-dev:** Bump eslint-plugin-import from 2.25.2 to 2.25.3 (#110) ([fe02203](https://github.com/wppconnect-team/wa-js/commit/fe02203)), closes [#110](https://github.com/wppconnect-team/wa-js/issues/110)
* **deps-dev:** Bump typedoc-plugin-missing-exports (#106) ([86a6e6c](https://github.com/wppconnect-team/wa-js/commit/86a6e6c)), closes [#106](https://github.com/wppconnect-team/wa-js/issues/106)
* **deps-dev:** Bump webpack from 5.61.0 to 5.62.1 (#107) ([bda960b](https://github.com/wppconnect-team/wa-js/commit/bda960b)), closes [#107](https://github.com/wppconnect-team/wa-js/issues/107)
* **deps-dev:** Bump webpack from 5.62.1 to 5.62.2 (#108) ([126e83c](https://github.com/wppconnect-team/wa-js/commit/126e83c)), closes [#108](https://github.com/wppconnect-team/wa-js/issues/108)
* **deps-dev:** Bump webpack from 5.62.2 to 5.63.0 (#111) ([b69b8fd](https://github.com/wppconnect-team/wa-js/commit/b69b8fd)), closes [#111](https://github.com/wppconnect-team/wa-js/issues/111)
* **deps-dev:** Bump webpack from 5.63.0 to 5.64.0 (#113) ([b33dab8](https://github.com/wppconnect-team/wa-js/commit/b33dab8)), closes [#113](https://github.com/wppconnect-team/wa-js/issues/113)

## <small>1.0.10 (2021-11-06)</small>

### Bug Fixes

* Fixed getMessages for non multidevices (fix wppconnect-team/wppconnect#629) ([c43b2cb](https://github.com/wppconnect-team/wa-js/commit/c43b2cb)), closes [wppconnect-team/wppconnect#629](https://github.com/wppconnect-team/wppconnect/issues/629)

### Chores

* **deps-dev:** Bump ts-morph from 12.1.0 to 12.2.0 (#105) ([bac1944](https://github.com/wppconnect-team/wa-js/commit/bac1944)), closes [#105](https://github.com/wppconnect-team/wa-js/issues/105)

## <small>1.0.9 (2021-11-02)</small>

### Features

* Added mentionedList and detectMentioned options for send message ([f4c01fa](https://github.com/wppconnect-team/wa-js/commit/f4c01fa))
* Added option to send buttons for files ([1db78a2](https://github.com/wppconnect-team/wa-js/commit/1db78a2))
* Added quotedMsg option for send message ([1a6aacd](https://github.com/wppconnect-team/wa-js/commit/1a6aacd))

### Code Refactoring

* Moved some declarations ([1b9607f](https://github.com/wppconnect-team/wa-js/commit/1b9607f))

### Documentation

* Added doc for WPP.chat.sendFileMessage ([e8391c5](https://github.com/wppconnect-team/wa-js/commit/e8391c5))
* Update whatsapp modules ID ([5a2ee86](https://github.com/wppconnect-team/wa-js/commit/5a2ee86))

### Chores

* **deps-dev:** Bump @commitlint/cli from 13.2.1 to 14.1.0 (#100) ([45bf429](https://github.com/wppconnect-team/wa-js/commit/45bf429)), closes [#100](https://github.com/wppconnect-team/wa-js/issues/100)
* **deps-dev:** Bump @commitlint/config-conventional (#99) ([7b643ed](https://github.com/wppconnect-team/wa-js/commit/7b643ed)), closes [#99](https://github.com/wppconnect-team/wa-js/issues/99)
* **deps-dev:** Bump @commitlint/cz-commitlint from 13.2.1 to 14.1.0 (#98) ([bd1e89b](https://github.com/wppconnect-team/wa-js/commit/bd1e89b)), closes [#98](https://github.com/wppconnect-team/wa-js/issues/98)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.17 to 1.1.18 (#101) ([c5be4e3](https://github.com/wppconnect-team/wa-js/commit/c5be4e3)), closes [#101](https://github.com/wppconnect-team/wa-js/issues/101)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.18 to 1.1.19 (#104) ([4976597](https://github.com/wppconnect-team/wa-js/commit/4976597)), closes [#104](https://github.com/wppconnect-team/wa-js/issues/104)
* **deps-dev:** Bump playwright from 1.16.2 to 1.16.3 (#103) ([0cc2520](https://github.com/wppconnect-team/wa-js/commit/0cc2520)), closes [#103](https://github.com/wppconnect-team/wa-js/issues/103)
* **deps-dev:** Bump ts-morph from 12.0.0 to 12.1.0 (#102) ([79a3f03](https://github.com/wppconnect-team/wa-js/commit/79a3f03)), closes [#102](https://github.com/wppconnect-team/wa-js/issues/102)

## <small>1.0.8 (2021-10-30)</small>

### Features

* Added WPP.chat.deleteMessage function ([d9b1c4f](https://github.com/wppconnect-team/wa-js/commit/d9b1c4f))
* Added WPP.chat.getMessageById function ([e44420c](https://github.com/wppconnect-team/wa-js/commit/e44420c))
* Added WPP.chat.sendFileMessage function ([efac868](https://github.com/wppconnect-team/wa-js/commit/efac868))

### Code Refactoring

* Improved WPP.chat.deleteMessage return ([c24174e](https://github.com/wppconnect-team/wa-js/commit/c24174e))

### Documentation

* Update whatsapp modules ID ([97b9a15](https://github.com/wppconnect-team/wa-js/commit/97b9a15))
* Update whatsapp modules ID ([4033c64](https://github.com/wppconnect-team/wa-js/commit/4033c64))

### Chores

* **deps-dev:** Bump @types/node from 14.17.27 to 14.17.28 (#87) ([5e33eec](https://github.com/wppconnect-team/wa-js/commit/5e33eec)), closes [#87](https://github.com/wppconnect-team/wa-js/issues/87)
* **deps-dev:** Bump @types/node from 14.17.28 to 14.17.29 (#91) ([a914b30](https://github.com/wppconnect-team/wa-js/commit/a914b30)), closes [#91](https://github.com/wppconnect-team/wa-js/issues/91)
* **deps-dev:** Bump @types/node from 14.17.29 to 14.17.32 (#93) ([c0134e6](https://github.com/wppconnect-team/wa-js/commit/c0134e6)), closes [#93](https://github.com/wppconnect-team/wa-js/issues/93)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.15 to 1.1.16 (#89) ([0c7c623](https://github.com/wppconnect-team/wa-js/commit/0c7c623)), closes [#89](https://github.com/wppconnect-team/wa-js/issues/89)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.16 to 1.1.17 (#96) ([79a4a25](https://github.com/wppconnect-team/wa-js/commit/79a4a25)), closes [#96](https://github.com/wppconnect-team/wa-js/issues/96)
* **deps-dev:** Bump husky from 7.0.2 to 7.0.4 (#84) ([003adcf](https://github.com/wppconnect-team/wa-js/commit/003adcf)), closes [#84](https://github.com/wppconnect-team/wa-js/issues/84)
* **deps-dev:** Bump playwright from 1.15.2 to 1.16.0 (#86) ([81c41b2](https://github.com/wppconnect-team/wa-js/commit/81c41b2)), closes [#86](https://github.com/wppconnect-team/wa-js/issues/86)
* **deps-dev:** Bump playwright from 1.16.0 to 1.16.1 (#90) ([230473b](https://github.com/wppconnect-team/wa-js/commit/230473b)), closes [#90](https://github.com/wppconnect-team/wa-js/issues/90)
* **deps-dev:** Bump playwright from 1.16.1 to 1.16.2 (#95) ([290c739](https://github.com/wppconnect-team/wa-js/commit/290c739)), closes [#95](https://github.com/wppconnect-team/wa-js/issues/95)
* **deps-dev:** Bump ts-node from 10.3.0 to 10.3.1 (#88) ([2f3cb95](https://github.com/wppconnect-team/wa-js/commit/2f3cb95)), closes [#88](https://github.com/wppconnect-team/wa-js/issues/88)
* **deps-dev:** Bump ts-node from 10.3.1 to 10.4.0 (#92) ([5046c76](https://github.com/wppconnect-team/wa-js/commit/5046c76)), closes [#92](https://github.com/wppconnect-team/wa-js/issues/92)
* **deps-dev:** Bump webpack from 5.59.0 to 5.59.1 (#85) ([68e428d](https://github.com/wppconnect-team/wa-js/commit/68e428d)), closes [#85](https://github.com/wppconnect-team/wa-js/issues/85)
* **deps-dev:** Bump webpack from 5.59.1 to 5.60.0 (#94) ([2bd88e3](https://github.com/wppconnect-team/wa-js/commit/2bd88e3)), closes [#94](https://github.com/wppconnect-team/wa-js/issues/94)
* **deps-dev:** Bump webpack from 5.60.0 to 5.61.0 (#97) ([49bfeaa](https://github.com/wppconnect-team/wa-js/commit/49bfeaa)), closes [#97](https://github.com/wppconnect-team/wa-js/issues/97)

## <small>1.0.7 (2021-10-20)</small>

### Features

* Added WPP.auth.logout function (wppconnect-team/wppconnect#579) ([75914f2](https://github.com/wppconnect-team/wa-js/commit/75914f2)), closes [wppconnect-team/wppconnect#579](https://github.com/wppconnect-team/wppconnect/issues/579)
* Added WPP.chat.clear function ([805ce7f](https://github.com/wppconnect-team/wa-js/commit/805ce7f))
* Added WPP.chat.delete function (wppconnect-team/wppconnect#586) ([4639722](https://github.com/wppconnect-team/wa-js/commit/4639722)), closes [wppconnect-team/wppconnect#586](https://github.com/wppconnect-team/wppconnect/issues/586)

### Code Refactoring

* Improved WPP.chat.delete method ([ea5b0d5](https://github.com/wppconnect-team/wa-js/commit/ea5b0d5))

### Documentation

* Update whatsapp modules ID ([765e2dd](https://github.com/wppconnect-team/wa-js/commit/765e2dd))

### Chores

* **deps-dev:** Bump @types/node from 14.17.21 to 14.17.22 (#76) ([1124213](https://github.com/wppconnect-team/wa-js/commit/1124213)), closes [#76](https://github.com/wppconnect-team/wa-js/issues/76)
* **deps-dev:** Bump @types/node from 14.17.22 to 14.17.26 (#80) ([b3ecfa8](https://github.com/wppconnect-team/wa-js/commit/b3ecfa8)), closes [#80](https://github.com/wppconnect-team/wa-js/issues/80)
* **deps-dev:** Bump @types/node from 14.17.26 to 14.17.27 (#81) ([7ecaf15](https://github.com/wppconnect-team/wa-js/commit/7ecaf15)), closes [#81](https://github.com/wppconnect-team/wa-js/issues/81)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.14 to 1.1.15 (#79) ([7bfb823](https://github.com/wppconnect-team/wa-js/commit/7bfb823)), closes [#79](https://github.com/wppconnect-team/wa-js/issues/79)
* **deps-dev:** Bump eslint-plugin-import from 2.25.1 to 2.25.2 (#78) ([39a77fb](https://github.com/wppconnect-team/wa-js/commit/39a77fb)), closes [#78](https://github.com/wppconnect-team/wa-js/issues/78)
* **deps-dev:** Bump typescript from 4.4.3 to 4.4.4 (#77) ([6f372dd](https://github.com/wppconnect-team/wa-js/commit/6f372dd)), closes [#77](https://github.com/wppconnect-team/wa-js/issues/77)
* **deps-dev:** Bump webpack from 5.58.1 to 5.58.2 (#75) ([edfdecd](https://github.com/wppconnect-team/wa-js/commit/edfdecd)), closes [#75](https://github.com/wppconnect-team/wa-js/issues/75)
* **deps-dev:** Bump webpack from 5.58.2 to 5.59.0 (#83) ([83470b0](https://github.com/wppconnect-team/wa-js/commit/83470b0)), closes [#83](https://github.com/wppconnect-team/wa-js/issues/83)
* **deps-dev:** Bump webpack-cli from 4.9.0 to 4.9.1 (#82) ([fbb4697](https://github.com/wppconnect-team/wa-js/commit/fbb4697)), closes [#82](https://github.com/wppconnect-team/wa-js/issues/82)
* Fixes of previous commits ([d985903](https://github.com/wppconnect-team/wa-js/commit/d985903))
* Improved whatsapp source ([ed03d32](https://github.com/wppconnect-team/wa-js/commit/ed03d32))

## <small>1.0.6 (2021-10-12)</small>

### Bug Fixes

* Fixed declaration files export ([2d53d4c](https://github.com/wppconnect-team/wa-js/commit/2d53d4c))

## <small>1.0.5 (2021-10-12)</small>

### Features

* Added msg_revoke (WPP.chat.on) event ([d6303bf](https://github.com/wppconnect-team/wa-js/commit/d6303bf))
* Added WPP.auth.isMultiDevice function ([1186db7](https://github.com/wppconnect-team/wa-js/commit/1186db7))

### Bug Fixes

* Added option to disable device name override ([961e6e2](https://github.com/wppconnect-team/wa-js/commit/961e6e2))
* Fixed WPP.chat.getMessages to include last message (fix #64) ([24eef80](https://github.com/wppconnect-team/wa-js/commit/24eef80)), closes [#64](https://github.com/wppconnect-team/wa-js/issues/64)

### Code Refactoring

* Reorganized internal code ([d04e5ac](https://github.com/wppconnect-team/wa-js/commit/d04e5ac))
* Updated debug namespace ([b5b5b3d](https://github.com/wppconnect-team/wa-js/commit/b5b5b3d))

### Documentation

* Update whatsapp modules ID ([0f9d166](https://github.com/wppconnect-team/wa-js/commit/0f9d166))

### Continuous Integration

* Added nightly workflows ([c914a32](https://github.com/wppconnect-team/wa-js/commit/c914a32))
* Fixed branch name for nightly workflows ([e2f09ab](https://github.com/wppconnect-team/wa-js/commit/e2f09ab))
* Some CI fixes ([25f1735](https://github.com/wppconnect-team/wa-js/commit/25f1735))

### Chores

* **deps-dev:** Bump @commitlint/cli from 13.2.0 to 13.2.1 (#70) ([24c2a6d](https://github.com/wppconnect-team/wa-js/commit/24c2a6d)), closes [#70](https://github.com/wppconnect-team/wa-js/issues/70)
* **deps-dev:** Bump @commitlint/cz-commitlint from 13.2.0 to 13.2.1 (#71) ([968b776](https://github.com/wppconnect-team/wa-js/commit/968b776)), closes [#71](https://github.com/wppconnect-team/wa-js/issues/71)
* **deps-dev:** Bump @types/node from 14.17.20 to 14.17.21 (#67) ([1464546](https://github.com/wppconnect-team/wa-js/commit/1464546)), closes [#67](https://github.com/wppconnect-team/wa-js/issues/67)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#62) ([47eeb9e](https://github.com/wppconnect-team/wa-js/commit/47eeb9e)), closes [#62](https://github.com/wppconnect-team/wa-js/issues/62)
* **deps-dev:** Bump @typescript-eslint/parser from 4.32.0 to 4.33.0 (#63) ([5f6818a](https://github.com/wppconnect-team/wa-js/commit/5f6818a)), closes [#63](https://github.com/wppconnect-team/wa-js/issues/63)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.13 to 1.1.14 (#60) ([523cd8b](https://github.com/wppconnect-team/wa-js/commit/523cd8b)), closes [#60](https://github.com/wppconnect-team/wa-js/issues/60)
* **deps-dev:** Bump eslint-plugin-import from 2.24.2 to 2.25.1 (#73) ([d35ff28](https://github.com/wppconnect-team/wa-js/commit/d35ff28)), closes [#73](https://github.com/wppconnect-team/wa-js/issues/73)
* **deps-dev:** Bump playwright from 1.15.1 to 1.15.2 (#66) ([297c31a](https://github.com/wppconnect-team/wa-js/commit/297c31a)), closes [#66](https://github.com/wppconnect-team/wa-js/issues/66)
* **deps-dev:** Bump ts-node from 10.2.1 to 10.3.0 (#74) ([799eee9](https://github.com/wppconnect-team/wa-js/commit/799eee9)), closes [#74](https://github.com/wppconnect-team/wa-js/issues/74)
* **deps-dev:** Bump webpack from 5.56.0 to 5.56.1 (#61) ([505d7f2](https://github.com/wppconnect-team/wa-js/commit/505d7f2)), closes [#61](https://github.com/wppconnect-team/wa-js/issues/61)
* **deps-dev:** Bump webpack from 5.56.1 to 5.57.1 (#65) ([0b534dd](https://github.com/wppconnect-team/wa-js/commit/0b534dd)), closes [#65](https://github.com/wppconnect-team/wa-js/issues/65)
* **deps-dev:** Bump webpack from 5.57.1 to 5.58.1 (#69) ([567aacd](https://github.com/wppconnect-team/wa-js/commit/567aacd)), closes [#69](https://github.com/wppconnect-team/wa-js/issues/69)
* **deps-dev:** Bump webpack-cli from 4.8.0 to 4.9.0 (#68) ([5400958](https://github.com/wppconnect-team/wa-js/commit/5400958)), closes [#68](https://github.com/wppconnect-team/wa-js/issues/68)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.5 to 4.1.9 (#72) ([e0fe72f](https://github.com/wppconnect-team/wa-js/commit/e0fe72f)), closes [#72](https://github.com/wppconnect-team/wa-js/issues/72)
* Updated README.md ([1538500](https://github.com/wppconnect-team/wa-js/commit/1538500))

## <small>1.0.4 (2021-10-02)</small>

### Features

* Added option to change the deviceName ([841bea8](https://github.com/wppconnect-team/wa-js/commit/841bea8))

## <small>1.0.3 (2021-10-02)</small>

### Features

* Added blocklist functions ([14579c6](https://github.com/wppconnect-team/wa-js/commit/14579c6))
* Added group management functions ([decae64](https://github.com/wppconnect-team/wa-js/commit/decae64))
* Added option to define device name ([df6f1e2](https://github.com/wppconnect-team/wa-js/commit/df6f1e2))

### Continuous Integration

* Updated dependabot auto-merge ([eb9bf4f](https://github.com/wppconnect-team/wa-js/commit/eb9bf4f))

### Chores

* **deps-dev:** Bump @types/node from 14.17.19 to 14.17.20 (#56) ([4e17c58](https://github.com/wppconnect-team/wa-js/commit/4e17c58)), closes [#56](https://github.com/wppconnect-team/wa-js/issues/56)
* **deps-dev:** Bump playwright from 1.15.0 to 1.15.1 (#59) ([bac71d0](https://github.com/wppconnect-team/wa-js/commit/bac71d0)), closes [#59](https://github.com/wppconnect-team/wa-js/issues/59)
* **deps-dev:** Bump webpack from 5.54.0 to 5.55.1 (#55) ([f391330](https://github.com/wppconnect-team/wa-js/commit/f391330)), closes [#55](https://github.com/wppconnect-team/wa-js/issues/55)
* **deps-dev:** Bump webpack from 5.55.1 to 5.56.0 (#58) ([0d02649](https://github.com/wppconnect-team/wa-js/commit/0d02649)), closes [#58](https://github.com/wppconnect-team/wa-js/issues/58)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.4 to 4.1.5 (#57) ([e7e9686](https://github.com/wppconnect-team/wa-js/commit/e7e9686)), closes [#57](https://github.com/wppconnect-team/wa-js/issues/57)
* Updated packages ([805d7db](https://github.com/wppconnect-team/wa-js/commit/805d7db))
* Updated WhatsApp version ([dc38435](https://github.com/wppconnect-team/wa-js/commit/dc38435))

## <small>1.0.2 (2021-09-29)</small>

### Features

* Added getMessages for Chat ([4e0f1d3](https://github.com/wppconnect-team/wa-js/commit/4e0f1d3))

### Continuous Integration

* Added dependabot auto-merge ([a856b7d](https://github.com/wppconnect-team/wa-js/commit/a856b7d))

### Chores

* **deps-dev:** Bump @commitlint/cli from 13.1.0 to 13.2.0 ([a95385c](https://github.com/wppconnect-team/wa-js/commit/a95385c))
* **deps-dev:** Bump @commitlint/config-conventional (#52) ([039f29b](https://github.com/wppconnect-team/wa-js/commit/039f29b)), closes [#52](https://github.com/wppconnect-team/wa-js/issues/52)
* **deps-dev:** Bump @commitlint/cz-commitlint from 13.1.0 to 13.2.0 ([2c57ed7](https://github.com/wppconnect-team/wa-js/commit/2c57ed7))
* **deps-dev:** Bump @types/node from 14.17.17 to 14.17.18 (#46) ([72478bb](https://github.com/wppconnect-team/wa-js/commit/72478bb)), closes [#46](https://github.com/wppconnect-team/wa-js/issues/46)
* **deps-dev:** Bump @types/node from 14.17.18 to 14.17.19 (#48) ([bbeff79](https://github.com/wppconnect-team/wa-js/commit/bbeff79)), closes [#48](https://github.com/wppconnect-team/wa-js/issues/48)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#44) ([3345bcd](https://github.com/wppconnect-team/wa-js/commit/3345bcd)), closes [#44](https://github.com/wppconnect-team/wa-js/issues/44)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#53) ([d3bec6f](https://github.com/wppconnect-team/wa-js/commit/d3bec6f)), closes [#53](https://github.com/wppconnect-team/wa-js/issues/53)
* **deps-dev:** Bump @typescript-eslint/parser from 4.31.1 to 4.31.2 (#42) ([ea1b81d](https://github.com/wppconnect-team/wa-js/commit/ea1b81d)), closes [#42](https://github.com/wppconnect-team/wa-js/issues/42)
* **deps-dev:** Bump @typescript-eslint/parser from 4.31.2 to 4.32.0 ([588dcb2](https://github.com/wppconnect-team/wa-js/commit/588dcb2))
* **deps-dev:** Bump playwright from 1.14.1 to 1.15.0 (#41) ([fe7514e](https://github.com/wppconnect-team/wa-js/commit/fe7514e)), closes [#41](https://github.com/wppconnect-team/wa-js/issues/41)
* **deps-dev:** Bump release-it from 14.11.5 to 14.11.6 (#45) ([6907ec5](https://github.com/wppconnect-team/wa-js/commit/6907ec5)), closes [#45](https://github.com/wppconnect-team/wa-js/issues/45)
* **deps-dev:** Bump ts-loader from 9.2.5 to 9.2.6 (#43) ([a436a05](https://github.com/wppconnect-team/wa-js/commit/a436a05)), closes [#43](https://github.com/wppconnect-team/wa-js/issues/43)
* **deps-dev:** Bump webpack from 5.53.0 to 5.54.0 (#49) ([3d77d6d](https://github.com/wppconnect-team/wa-js/commit/3d77d6d)), closes [#49](https://github.com/wppconnect-team/wa-js/issues/49)
* **deps:** Bump actions/setup-node from 2.4.0 to 2.4.1 (#47) ([d34ef39](https://github.com/wppconnect-team/wa-js/commit/d34ef39)), closes [#47](https://github.com/wppconnect-team/wa-js/issues/47)
* Updated modules id ([851e0e7](https://github.com/wppconnect-team/wa-js/commit/851e0e7))

## <small>1.0.1 (2021-09-19)</small>

### Bug Fixes

* Added declaration files ([0bac4ed](https://github.com/wppconnect-team/wa-js/commit/0bac4ed))

### Continuous Integration

* Fixed workflows ([ea717e9](https://github.com/wppconnect-team/wa-js/commit/ea717e9))

## 1.0.0 (2021-09-19)

### Features

* Added base of QRCode ([ae37878](https://github.com/wppconnect-team/wa-js/commit/ae37878))
* Added base64 function ([40e7b25](https://github.com/wppconnect-team/wa-js/commit/40e7b25))
* Added ConnModel and default Conn ([27de477](https://github.com/wppconnect-team/wa-js/commit/27de477))
* Added constants ([91e3f3f](https://github.com/wppconnect-team/wa-js/commit/91e3f3f))
* Added enum SendMsgResult ([411c4ef](https://github.com/wppconnect-team/wa-js/commit/411c4ef))
* Added Features ([51c0c86](https://github.com/wppconnect-team/wa-js/commit/51c0c86))
* Added GroupMetadataCollection ([641a2c3](https://github.com/wppconnect-team/wa-js/commit/641a2c3))
* Added isAuthenticated function ([73800d7](https://github.com/wppconnect-team/wa-js/commit/73800d7))
* Added send buttons for text message ([332a8fe](https://github.com/wppconnect-team/wa-js/commit/332a8fe))
* Added send list message ([80dad4d](https://github.com/wppconnect-team/wa-js/commit/80dad4d))
* Added send text to status stories ([2752353](https://github.com/wppconnect-team/wa-js/commit/2752353))
* Added typedoc ([c862697](https://github.com/wppconnect-team/wa-js/commit/c862697))
* Added WhatsApp function to download and format source ([1b3919f](https://github.com/wppconnect-team/wa-js/commit/1b3919f))
* Created option to sendTextMessage ([a979a82](https://github.com/wppconnect-team/wa-js/commit/a979a82))

### Bug Fixes

* Added all methods of UserPrefs ([5e1a24c](https://github.com/wppconnect-team/wa-js/commit/5e1a24c))
* Fixed exported methods for auth ([454253e](https://github.com/wppconnect-team/wa-js/commit/454253e))
* Fixed QRCode for multidevice ([574e968](https://github.com/wppconnect-team/wa-js/commit/574e968))
* Fixed some search modules ([d739fba](https://github.com/wppconnect-team/wa-js/commit/d739fba))

### Code Refactoring

* Removed Proxy call for whatsapp modules ([73b8828](https://github.com/wppconnect-team/wa-js/commit/73b8828))
* Renamed qrcode to auth ([e8c15e5](https://github.com/wppconnect-team/wa-js/commit/e8c15e5))
* Reorganized auth files ([03a9069](https://github.com/wppconnect-team/wa-js/commit/03a9069))

### Documentation

* Added some documentation ([b904d3f](https://github.com/wppconnect-team/wa-js/commit/b904d3f))
* Added type for Features ([5474341](https://github.com/wppconnect-team/wa-js/commit/5474341))
* Changed exports ([db71cae](https://github.com/wppconnect-team/wa-js/commit/db71cae))
* Converted some constants to namespace ([50147db](https://github.com/wppconnect-team/wa-js/commit/50147db))
* Created function to update docs of modules ID ([4b0ed62](https://github.com/wppconnect-team/wa-js/commit/4b0ed62))
* Fixed docs link to use branch instead of commit ([f707f11](https://github.com/wppconnect-team/wa-js/commit/f707f11))
* Fixed generated documentation ([d346848](https://github.com/wppconnect-team/wa-js/commit/d346848))
* Fixed typedoc to include external methods ([7e07c95](https://github.com/wppconnect-team/wa-js/commit/7e07c95))
* Improved @whatsapp module reference ([01b9eeb](https://github.com/wppconnect-team/wa-js/commit/01b9eeb))
* Improved @whatsapp module reference ([aaf203f](https://github.com/wppconnect-team/wa-js/commit/aaf203f))
* Removed unecessary documentation ([f1d53a9](https://github.com/wppconnect-team/wa-js/commit/f1d53a9))
* Updated modules IDs ([cabe7b3](https://github.com/wppconnect-team/wa-js/commit/cabe7b3))
* Updated modules IDs ([eadff0d](https://github.com/wppconnect-team/wa-js/commit/eadff0d))
* Updated typedoc to 0.22 ([13e3891](https://github.com/wppconnect-team/wa-js/commit/13e3891))

### Continuous Integration

* Added docs workflow ([967b0b6](https://github.com/wppconnect-team/wa-js/commit/967b0b6))
* Added release workflow ([c598e41](https://github.com/wppconnect-team/wa-js/commit/c598e41))

### Chores

* Added Browser and State ([5b0d6d4](https://github.com/wppconnect-team/wa-js/commit/5b0d6d4))
* Added debug output ([6510a69](https://github.com/wppconnect-team/wa-js/commit/6510a69))
* Added getOrGenerate function ([e14e576](https://github.com/wppconnect-team/wa-js/commit/e14e576))
* Added hidden property for WA module ID ([7946eab](https://github.com/wppconnect-team/wa-js/commit/7946eab))
* Added local launch using playwright ([9d9a755](https://github.com/wppconnect-team/wa-js/commit/9d9a755))
* Added VSCode debug support ([6879074](https://github.com/wppconnect-team/wa-js/commit/6879074))
* Auto open devtool on launch local ([1403c67](https://github.com/wppconnect-team/wa-js/commit/1403c67))
* Blocked crash log for local launch ([1e5525b](https://github.com/wppconnect-team/wa-js/commit/1e5525b))
* **deps-dev:** Bump @types/node from 14.17.10 to 14.17.11 ([8e08a68](https://github.com/wppconnect-team/wa-js/commit/8e08a68))
* **deps-dev:** Bump @types/node from 14.17.11 to 14.17.12 (#13) ([fc0cc7a](https://github.com/wppconnect-team/wa-js/commit/fc0cc7a)), closes [#13](https://github.com/wppconnect-team/wa-js/issues/13)
* **deps-dev:** Bump @types/node from 14.17.12 to 14.17.14 (#19) ([d107652](https://github.com/wppconnect-team/wa-js/commit/d107652)), closes [#19](https://github.com/wppconnect-team/wa-js/issues/19)
* **deps-dev:** Bump @types/node from 14.17.14 to 14.17.15 (#26) ([1b0149d](https://github.com/wppconnect-team/wa-js/commit/1b0149d)), closes [#26](https://github.com/wppconnect-team/wa-js/issues/26)
* **deps-dev:** Bump @types/node from 14.17.15 to 14.17.16 (#35) ([0856cc8](https://github.com/wppconnect-team/wa-js/commit/0856cc8)), closes [#35](https://github.com/wppconnect-team/wa-js/issues/35)
* **deps-dev:** Bump @types/node from 14.17.16 to 14.17.17 (#39) ([33d802e](https://github.com/wppconnect-team/wa-js/commit/33d802e)), closes [#39](https://github.com/wppconnect-team/wa-js/issues/39)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#15) ([4ad415a](https://github.com/wppconnect-team/wa-js/commit/4ad415a)), closes [#15](https://github.com/wppconnect-team/wa-js/issues/15)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#24) ([79df069](https://github.com/wppconnect-team/wa-js/commit/79df069)), closes [#24](https://github.com/wppconnect-team/wa-js/issues/24)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#34) ([9762f89](https://github.com/wppconnect-team/wa-js/commit/9762f89)), closes [#34](https://github.com/wppconnect-team/wa-js/issues/34)
* **deps-dev:** Bump @typescript-eslint/eslint-plugin (#8) ([f6992e5](https://github.com/wppconnect-team/wa-js/commit/f6992e5)), closes [#8](https://github.com/wppconnect-team/wa-js/issues/8)
* **deps-dev:** Bump @typescript-eslint/parser from 4.29.2 to 4.29.3 (#9) ([eecf3e8](https://github.com/wppconnect-team/wa-js/commit/eecf3e8)), closes [#9](https://github.com/wppconnect-team/wa-js/issues/9)
* **deps-dev:** Bump @typescript-eslint/parser from 4.29.3 to 4.30.0 (#18) ([4f13b4b](https://github.com/wppconnect-team/wa-js/commit/4f13b4b)), closes [#18](https://github.com/wppconnect-team/wa-js/issues/18)
* **deps-dev:** Bump @typescript-eslint/parser from 4.30.0 to 4.31.0 (#25) ([7605aea](https://github.com/wppconnect-team/wa-js/commit/7605aea)), closes [#25](https://github.com/wppconnect-team/wa-js/issues/25)
* **deps-dev:** Bump @typescript-eslint/parser from 4.31.0 to 4.31.1 (#33) ([b2e480e](https://github.com/wppconnect-team/wa-js/commit/b2e480e)), closes [#33](https://github.com/wppconnect-team/wa-js/issues/33)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.11 to 1.1.12 (#40) ([9eb9bfe](https://github.com/wppconnect-team/wa-js/commit/9eb9bfe)), closes [#40](https://github.com/wppconnect-team/wa-js/issues/40)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.7 to 1.1.9 (#22) ([d89eb8b](https://github.com/wppconnect-team/wa-js/commit/d89eb8b)), closes [#22](https://github.com/wppconnect-team/wa-js/issues/22)
* **deps-dev:** Bump @wppconnect/wa-version from 1.1.9 to 1.1.11 (#36) ([0642910](https://github.com/wppconnect-team/wa-js/commit/0642910)), closes [#36](https://github.com/wppconnect-team/wa-js/issues/36)
* **deps-dev:** Bump emittery from 0.9.2 to 0.10.0 (#32) ([16a46f5](https://github.com/wppconnect-team/wa-js/commit/16a46f5)), closes [#32](https://github.com/wppconnect-team/wa-js/issues/32)
* **deps-dev:** Bump eslint-plugin-import from 2.24.1 to 2.24.2 (#12) ([d5b748f](https://github.com/wppconnect-team/wa-js/commit/d5b748f)), closes [#12](https://github.com/wppconnect-team/wa-js/issues/12)
* **deps-dev:** Bump eslint-plugin-prettier from 3.4.0 to 3.4.1 ([4e7cc09](https://github.com/wppconnect-team/wa-js/commit/4e7cc09))
* **deps-dev:** Bump eslint-plugin-prettier from 3.4.1 to 4.0.0 (#17) ([112aafa](https://github.com/wppconnect-team/wa-js/commit/112aafa)), closes [#17](https://github.com/wppconnect-team/wa-js/issues/17)
* **deps-dev:** Bump husky from 7.0.1 to 7.0.2 (#11) ([afd5e10](https://github.com/wppconnect-team/wa-js/commit/afd5e10)), closes [#11](https://github.com/wppconnect-team/wa-js/issues/11)
* **deps-dev:** Bump playwright from 1.14.0 to 1.14.1 (#10) ([8d94a94](https://github.com/wppconnect-team/wa-js/commit/8d94a94)), closes [#10](https://github.com/wppconnect-team/wa-js/issues/10)
* **deps-dev:** Bump prettier from 2.3.2 to 2.4.0 (#27) ([275ab13](https://github.com/wppconnect-team/wa-js/commit/275ab13)), closes [#27](https://github.com/wppconnect-team/wa-js/issues/27)
* **deps-dev:** Bump prettier from 2.4.0 to 2.4.1 (#37) ([64f5127](https://github.com/wppconnect-team/wa-js/commit/64f5127)), closes [#37](https://github.com/wppconnect-team/wa-js/issues/37)
* **deps-dev:** Bump typedoc from 0.21.6 to 0.21.9 (#14) ([909abbf](https://github.com/wppconnect-team/wa-js/commit/909abbf)), closes [#14](https://github.com/wppconnect-team/wa-js/issues/14)
* **deps-dev:** Bump typescript from 4.3.5 to 4.4.2 (#16) ([7c42104](https://github.com/wppconnect-team/wa-js/commit/7c42104)), closes [#16](https://github.com/wppconnect-team/wa-js/issues/16)
* **deps-dev:** Bump typescript from 4.4.2 to 4.4.3 (#31) ([9c0cf85](https://github.com/wppconnect-team/wa-js/commit/9c0cf85)), closes [#31](https://github.com/wppconnect-team/wa-js/issues/31)
* **deps-dev:** Bump webpack from 5.51.1 to 5.51.2 (#21) ([0bb3b75](https://github.com/wppconnect-team/wa-js/commit/0bb3b75)), closes [#21](https://github.com/wppconnect-team/wa-js/issues/21)
* **deps-dev:** Bump webpack from 5.51.2 to 5.52.0 (#23) ([f0762f1](https://github.com/wppconnect-team/wa-js/commit/f0762f1)), closes [#23](https://github.com/wppconnect-team/wa-js/issues/23)
* **deps-dev:** Bump webpack from 5.52.0 to 5.52.1 (#28) ([ca316cc](https://github.com/wppconnect-team/wa-js/commit/ca316cc)), closes [#28](https://github.com/wppconnect-team/wa-js/issues/28)
* **deps-dev:** Bump webpack from 5.52.1 to 5.53.0 (#38) ([0e4b76c](https://github.com/wppconnect-team/wa-js/commit/0e4b76c)), closes [#38](https://github.com/wppconnect-team/wa-js/issues/38)
* **deps:** Bump actions/setup-node from 1 to 2.4.0 (#7) ([a4e3bf5](https://github.com/wppconnect-team/wa-js/commit/a4e3bf5)), closes [#7](https://github.com/wppconnect-team/wa-js/issues/7)
* **deps:** Bump wagoid/commitlint-github-action from 2 to 4.1.1 (#6) ([576fc09](https://github.com/wppconnect-team/wa-js/commit/576fc09)), closes [#6](https://github.com/wppconnect-team/wa-js/issues/6)
* **deps:** Bump wagoid/commitlint-github-action from 4.1.1 to 4.1.4 (#29) ([423d11e](https://github.com/wppconnect-team/wa-js/commit/423d11e)), closes [#29](https://github.com/wppconnect-team/wa-js/issues/29)
* Fixed qrcode call for logged session ([7e496c1](https://github.com/wppconnect-team/wa-js/commit/7e496c1))
* Fixed task error message for VSCode ([0b43687](https://github.com/wppconnect-team/wa-js/commit/0b43687))
* Fixed task error message for VSCode ([20f69e1](https://github.com/wppconnect-team/wa-js/commit/20f69e1))
* Ignore PureComponent in webpack search ([257773d](https://github.com/wppconnect-team/wa-js/commit/257773d))
* Improved event emitter in webpack ([6f73226](https://github.com/wppconnect-team/wa-js/commit/6f73226))
* Improved run locally ([d3d6939](https://github.com/wppconnect-team/wa-js/commit/d3d6939))
* Improved sendMessage ([0168315](https://github.com/wppconnect-team/wa-js/commit/0168315))
* Project init ([b3fbb1e](https://github.com/wppconnect-team/wa-js/commit/b3fbb1e))
* Removed wrong import ([e5e2440](https://github.com/wppconnect-team/wa-js/commit/e5e2440))
* Updated dependabot config ([5f411b1](https://github.com/wppconnect-team/wa-js/commit/5f411b1))
* Updated package.json ([91a4e94](https://github.com/wppconnect-team/wa-js/commit/91a4e94))
* Updated packages ([4a28cae](https://github.com/wppconnect-team/wa-js/commit/4a28cae))
