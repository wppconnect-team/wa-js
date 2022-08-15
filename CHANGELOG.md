# [2.11.0](https://github.com/wppconnect-team/wa-js/compare/v2.10.1...v2.11.0) (2022-08-13)

### Bug Fixes

- Added support for reply status stories ([#594](https://github.com/wppconnect-team/wa-js/issues/594)) ([19b2729](https://github.com/wppconnect-team/wa-js/commit/19b2729a500165c63352e5ac2e6432390858f18c))
- Update minimum require Whatsapp version to >= 2.2212.4-beta ([bcb5f36](https://github.com/wppconnect-team/wa-js/commit/bcb5f3696f9d5912db963ccf0fc98fb2ba53c999))

### Features

- Added create, edit, and delete products functions (fix [#442](https://github.com/wppconnect-team/wa-js/issues/442)) ([8e8bb22](https://github.com/wppconnect-team/wa-js/commit/8e8bb221a611152df782f52d088aa84f92da0868))
- Added get, create, edit, and delete collections functions (fix [#442](https://github.com/wppconnect-team/wa-js/issues/442)) ([ef6192b](https://github.com/wppconnect-team/wa-js/commit/ef6192b49cc411b826d69b369c9b179994fc5a23))
- Added option to get only media, url and docs for WPP.chat.getMessages ([a74ac3c](https://github.com/wppconnect-team/wa-js/commit/a74ac3c4fe676821264af3308f41bab1441f7aba))
- Added WPP.catalog.getProductById function ([0b883a3](https://github.com/wppconnect-team/wa-js/commit/0b883a3dd921c0a3aee3570d000236f6591e8ab7))
- Added WPP.catalog.getProducts function ([f4d1716](https://github.com/wppconnect-team/wa-js/commit/f4d171604d2ecc7312ccf2299665077e05009634))
- Added WPP.catalog.setProductVisibility function ([d3a60e3](https://github.com/wppconnect-team/wa-js/commit/d3a60e337d897e700dee6540a548d020320a5efa))
- Added WPP.catalog.updateCartEnabled function ([b70af87](https://github.com/wppconnect-team/wa-js/commit/b70af87b0ac300fccf26e895b78e98c24ceef46b))
- Added WPP.chat.canMarkPlayed function ([4149eec](https://github.com/wppconnect-team/wa-js/commit/4149eec998a58f75043778349d20bc28175d3f60))
- Added WPP.chat.getPlatformFromMessage function ([d0f41ee](https://github.com/wppconnect-team/wa-js/commit/d0f41ee75b6ab87ca665bc9b05726a7aac31d2f6))
- Added WPP.chat.markPlayed function ([c21941f](https://github.com/wppconnect-team/wa-js/commit/c21941f28a9cd7721d9a60f6dad781201e60b35d))
- Added WPP.contact.getBusinessProfile function ([5c8e57a](https://github.com/wppconnect-team/wa-js/commit/5c8e57a0f1b00ace491e75c9eedab60e4ea35600))
- Added WPP.labels.getLabelById function ([56767b4](https://github.com/wppconnect-team/wa-js/commit/56767b4c07b0810941b8bc91047f9d5f926b461b))
- Added WPP.profile.editBusinessProfile function ([30f18b2](https://github.com/wppconnect-team/wa-js/commit/30f18b2a2aba1f5ff5c7d74dd079d94bdd833c15))
- Added WPP.status.sendReadStatus ([a4587dc](https://github.com/wppconnect-team/wa-js/commit/a4587dc73ca7ca52ea7c3e0f7874ae39c226551b))
- Exported calculateFilehashFromBlob from WhatsApp ([c0c0772](https://github.com/wppconnect-team/wa-js/commit/c0c0772e8b19cdb9b1a145580da32de1f147f865))
- Exported ProductCatalogSession from WhatsApp ([0aefe4c](https://github.com/wppconnect-team/wa-js/commit/0aefe4cd18d39d2db00d6e14f9dc0ab7c774c824))

## [2.10.1](https://github.com/wppconnect-team/wa-js/compare/v2.10.0...v2.10.1) (2022-08-09)

### Bug Fixes

- Fixed reply buttons send (useTemplateButtons: false) (fix [#577](https://github.com/wppconnect-team/wa-js/issues/577)) ([28f3682](https://github.com/wppconnect-team/wa-js/commit/28f36820884ebd8b270b4c974f7d5c48275287f8))

# [2.10.0](https://github.com/wppconnect-team/wa-js/compare/v2.9.0...v2.10.0) (2022-08-04)

### Bug Fixes

- Fixed buttons for latest WhatsApp (2.22.16.75) (fix [#571](https://github.com/wppconnect-team/wa-js/issues/571)) ([abfc9ad](https://github.com/wppconnect-team/wa-js/commit/abfc9ad984ed77986330bd507c092856fdbba7dc))
- Fixed list for latest WhatsApp (2.22.16.75) (fix [#571](https://github.com/wppconnect-team/wa-js/issues/571)) ([4cae69e](https://github.com/wppconnect-team/wa-js/commit/4cae69ed6006e765f7732ecc542273b9d9fa9dd8))
- onParticipantsChange operation/action ([ee28ace](https://github.com/wppconnect-team/wa-js/commit/ee28ace0226c285d72d8e3b907f3bb47339adde1))

### Features

- Added isMainReady ([cd411bd](https://github.com/wppconnect-team/wa-js/commit/cd411bdf1303f24bb160a875980e56d0a6c4f8a3))
- Added WPP.conn.getPlatform() ([03416b6](https://github.com/wppconnect-team/wa-js/commit/03416b622d877d28cf2d25d2dd42a534321c5239))
- Added WPP.profile.isBusiness() ([9433b9c](https://github.com/wppconnect-team/wa-js/commit/9433b9c54c5bbb2a8d89f82362a258667db13706))

# [2.9.0](https://github.com/wppconnect-team/wa-js/compare/v2.8.2...v2.9.0) (2022-07-31)

### Bug Fixes

- Avoid duplicate self account for send status ([a7eef5b](https://github.com/wppconnect-team/wa-js/commit/a7eef5b390473d12eece0d5a096fe44a4bb42b18))
- Fixed status/stores screen after send ([3fb61bd](https://github.com/wppconnect-team/wa-js/commit/3fb61bd9fdd00f437f64de2ed687ad872cbcb95d))
- Fixed WPP.chat.sendLocationMessage function (wppconnect-team/wppconnect[#1237](https://github.com/wppconnect-team/wa-js/issues/1237)) ([23b8cf3](https://github.com/wppconnect-team/wa-js/commit/23b8cf3ad0470ef8159e427bf1dcc305537be146))
- Improved message key for status/stories ([87d28bf](https://github.com/wppconnect-team/wa-js/commit/87d28bf609a0c0bacacacd8cdedad5c52690417b))
- Removed offline link-preview server ([1d10bab](https://github.com/wppconnect-team/wa-js/commit/1d10bab27f6d1e0913ae7ba36d6b0d5015a1066d))

### Features

- Added group.participant_changed event ([e24dcc2](https://github.com/wppconnect-team/wa-js/commit/e24dcc21307ef173156da7bace07a49afb8922b7))
- Added WPP.chat.getLastSeen function ([#546](https://github.com/wppconnect-team/wa-js/issues/546)) ([925920d](https://github.com/wppconnect-team/wa-js/commit/925920deb2e9951e24c1263afcd0383d80ff830e))
- Improved link-preview to try all available servers ([f728bcb](https://github.com/wppconnect-team/wa-js/commit/f728bcbc445a68f2511d847797f1d65982b7f318))

## [2.8.2](https://github.com/wppconnect-team/wa-js/compare/v2.8.1...v2.8.2) (2022-07-12)

### Bug Fixes

- Fixed eventEmitter export ([2532a20](https://github.com/wppconnect-team/wa-js/commit/2532a200933d13f61e37fa3557bbb790798330bc))

## [2.8.1](https://github.com/wppconnect-team/wa-js/compare/v2.8.0...v2.8.1) (2022-07-11)

### Bug Fixes

- Fixed chat.live_location_update event when there are a current shared location ([085a719](https://github.com/wppconnect-team/wa-js/commit/085a7197a9e60d1660ff49b9a96f0e9f6c4e285c))
- Fixed chat.msg_ack_change event to ignore non my messages ([78e5d49](https://github.com/wppconnect-team/wa-js/commit/78e5d49751bb3c279d5d7682c11cc064d8ec4671))
- Fixed WPP.chat.markIsUnread function (wppconnect-team/wppconnect[#1196](https://github.com/wppconnect-team/wa-js/issues/1196)) ([db7195e](https://github.com/wppconnect-team/wa-js/commit/db7195ee15a4e12c7a6b6a06bcb6bb711f59659b))
- Improved chat.presence_change event to use queueMicrotask ([34dd0d6](https://github.com/wppconnect-team/wa-js/commit/34dd0d63704dc0c35d0c8e77157a7ba920be7d2d))
- Update status v3 contacts before send ([96fa79b](https://github.com/wppconnect-team/wa-js/commit/96fa79b413e1dac9dfc52f617c57a0a52152ce07))
- Use non obstructive trigger for chat.new_message event ([07316fb](https://github.com/wppconnect-team/wa-js/commit/07316fbef0b23af4d5968fa781c338ea9dc6954d))

### Features

- Trigger chat.new_message event for ciphertext msg after sync ([3338cce](https://github.com/wppconnect-team/wa-js/commit/3338ccef2a24654da76fdb9852f7c875c0e33968))

# [2.8.0](https://github.com/wppconnect-team/wa-js/compare/v2.7.3...v2.8.0) (2022-06-28)

### Bug Fixes

- Added missing data WPP.status.sendTextStatus ([521c6f2](https://github.com/wppconnect-team/wa-js/commit/521c6f221c4c86e325506a1e5e82d3e9864a70e4))
- Improved participant list for send status ([55cd0a4](https://github.com/wppconnect-team/wa-js/commit/55cd0a460af4c0fa329501bc934a03075d9f0d2b))

### Features

- Added googleAnalyticsUserProperty options ([f425767](https://github.com/wppconnect-team/wa-js/commit/f425767f0b30d95b24a15fca8ab7c269d4e3240d))
- Added WPP.group.setIcon function ([79b0c76](https://github.com/wppconnect-team/wa-js/commit/79b0c767866420fe87ea5be7eb5a4fea5c48c6d6))
- Added WPP.profile.setMyProfilePicture ([3d773b7](https://github.com/wppconnect-team/wa-js/commit/3d773b799c507c4865781201a3c48dbf1e7fc3d6))
- Added WPP.status.sendImageStatus function ([2814ef3](https://github.com/wppconnect-team/wa-js/commit/2814ef35b43b74cdbcc47e5b0ad1f76ff7d8a649))
- Added WPP.status.sendVideoStatus function ([46bb3dc](https://github.com/wppconnect-team/wa-js/commit/46bb3dc8c532d5bb816e47f5ca6dc11de55b6008))

## [2.7.3](https://github.com/wppconnect-team/wa-js/compare/v2.7.2...v2.7.3) (2022-06-18)

### Bug Fixes

- Fixed mentionedList detection (fix [#473](https://github.com/wppconnect-team/wa-js/issues/473)) ([5479679](https://github.com/wppconnect-team/wa-js/commit/547967963bd4d0947695c0d03f3c26d4faa57170))
- Fixed the return for WPP.contact.getStatus function ([ac02d5a](https://github.com/wppconnect-team/wa-js/commit/ac02d5ac73169800e4ad169efbdfc9bc95ffa67e))
- Fixed the return for WPP.group.addParticipants function ([7f01c85](https://github.com/wppconnect-team/wa-js/commit/7f01c856c33515072703f57293f2a1046a971f59))
- Throw error for invalid media type (wppconnect-team/wppconnect[#1164](https://github.com/wppconnect-team/wa-js/issues/1164)) ([0481c8b](https://github.com/wppconnect-team/wa-js/commit/0481c8b849632cb43e0a7b7f626a404d3ce351b7))

## [2.7.2](https://github.com/wppconnect-team/wa-js/compare/v2.7.1...v2.7.2) (2022-06-17)

### Bug Fixes

- Fixed group creation when you have your own number in the list ([4b76f5a](https://github.com/wppconnect-team/wa-js/commit/4b76f5af4e0312b819652a246b907fdfd50aac00))
- Improved Google Analytics tracker ([e51a542](https://github.com/wppconnect-team/wa-js/commit/e51a542d57f4314ec4c192b32da47d487adebb4e))
- lint: sort imports ([23fde0d](https://github.com/wppconnect-team/wa-js/commit/23fde0dc20a50079de11acc37c07f7bcdc14a6d2))

### Features

- add optional link preview servers via config ([4f7ac41](https://github.com/wppconnect-team/wa-js/commit/4f7ac41b9c90a985843452c3d9db6695657a6926))
- Usage Google Analytics optional, can set own GA track id ([19079d7](https://github.com/wppconnect-team/wa-js/commit/19079d7c0e7e7c3440e94275d4536226c8f324ea))

## [2.7.1](https://github.com/wppconnect-team/wa-js/compare/v2.7.0...v2.7.1) (2022-06-15)

# [2.7.0](https://github.com/wppconnect-team/wa-js/compare/v2.6.0...v2.7.0) (2022-06-15)

### Bug Fixes

- Fixed compatibility with WhatsApp Web >= 2.2222.8 ([a1d994c](https://github.com/wppconnect-team/wa-js/commit/a1d994cbf243e9fe9eb7eee0802266bb6b81f410))
- Return undefined instead of throw an exception ([817592b](https://github.com/wppconnect-team/wa-js/commit/817592b4fec8c18ce3304de1bcab407e22d8809d))

### Features

- Added Google Analytics ([946cc80](https://github.com/wppconnect-team/wa-js/commit/946cc80b691adcc2818a0702b821898f73311df7))
- Added WPP.call.rejectCall function ([4461cb0](https://github.com/wppconnect-team/wa-js/commit/4461cb0becebbb942e20bc41577dc8be1333cffc))
- Added WPP.catalog.getMyCatalog function ([7922931](https://github.com/wppconnect-team/wa-js/commit/7922931a44b691c3f7878b21d1d01a07da0da983))
- Aded call.incoming_call event ([e318902](https://github.com/wppconnect-team/wa-js/commit/e3189021673f866d3c6ebc82af12794d07241614))

### BREAKING CHANGES

- Now "not found module" will return undefined value instead of throw an exception

# [2.6.0](https://github.com/wppconnect-team/wa-js/compare/v2.5.1...v2.6.0) (2022-06-08)

### Bug Fixes

- Fixed doc type for WPP.chat.sendFileMessage ([7701d88](https://github.com/wppconnect-team/wa-js/commit/7701d882df10e87e2ac477805f97a5984dd14870))

### Features

- Added option onlyUnread for WPP.chat.getMessages function ([550a66f](https://github.com/wppconnect-team/wa-js/commit/550a66f40c776451ff0aa68dfe7878b999161f54))
- Added WPP.conn.isMainReady function ([66734d2](https://github.com/wppconnect-team/wa-js/commit/66734d295593a64f0f44467e63ea75cc1d73314d))

## [2.5.1](https://github.com/wppconnect-team/wa-js/compare/v2.5.0...v2.5.1) (2022-06-06)

### Bug Fixes

- Fixed revoke messages for list type ([7938ae7](https://github.com/wppconnect-team/wa-js/commit/7938ae7dab6bfa9e44f68f78dab01bbeeeeca0b6))

# [2.5.0](https://github.com/wppconnect-team/wa-js/compare/v2.4.1...v2.5.0) (2022-06-04)

### Bug Fixes

- Fixed compatibility with WhatsApp Web >= 2.2220.8 ([29a00fb](https://github.com/wppconnect-team/wa-js/commit/29a00fbfd97cf6480613b4b1d77a6cba2b2099aa))

### Features

- Added 'chat.new_reaction' event (fix [#417](https://github.com/wppconnect-team/wa-js/issues/417)) ([ce2ded5](https://github.com/wppconnect-team/wa-js/commit/ce2ded536597ce16b3df2cf9a44135efabe3ef5d))
- Added option to filter chat and contacts with label (close [#436](https://github.com/wppconnect-team/wa-js/issues/436)) ([bff74df](https://github.com/wppconnect-team/wa-js/commit/bff74df6bc55ce657b97957752e06e0aa5c09d14))
- Added WPP.conn.getMyDeviceId function (fix [#433](https://github.com/wppconnect-team/wa-js/issues/433)) ([a4f06f9](https://github.com/wppconnect-team/wa-js/commit/a4f06f9bd95f2a79375350ed847a075e2df00550))
- Added WPP.conn.getMyUserId function (fix [#433](https://github.com/wppconnect-team/wa-js/issues/433)) ([aaa391b](https://github.com/wppconnect-team/wa-js/commit/aaa391b65475a716537f7506592084fef1e50106))
- Added WPP.contact.list function (close [#434](https://github.com/wppconnect-team/wa-js/issues/434)) ([b7ed183](https://github.com/wppconnect-team/wa-js/commit/b7ed1832b2df241a58078d6c87dee0df5dcbf3b4))

## [2.4.1](https://github.com/wppconnect-team/wa-js/compare/v2.4.0...v2.4.1) (2022-05-31)

### Bug Fixes

- Fixed detect mentionedList for invalid wids ([#427](https://github.com/wppconnect-team/wa-js/issues/427)) ([c701dc3](https://github.com/wppconnect-team/wa-js/commit/c701dc3b8b04cce1e51dd5dda12bf5e80e11de2e))
- WPP.chat.deleteMessage function ([88ac040](https://github.com/wppconnect-team/wa-js/commit/88ac04066fd9ed93388992786a9f8ee2fd9b7ccf))

# [2.4.0](https://github.com/wppconnect-team/wa-js/compare/v2.3.0...v2.4.0) (2022-05-28)

### Bug Fixes

- Allow string values for lat and lng for WPP.chat.sendLocationMessage function ([02b174f](https://github.com/wppconnect-team/wa-js/commit/02b174f4f65ceccd751cef6f3cee79706b20cbe7))
- Exported related reactions classes ([466ebad](https://github.com/wppconnect-team/wa-js/commit/466ebad34c1545121c681df0196539792b09f7eb))

### Features

- Added WPP.chat.list function ([8657dd1](https://github.com/wppconnect-team/wa-js/commit/8657dd1d896f7856d28aeac47c076b4f2dfc4b9b))
- Added WPP.chat.sendCreatePollMessage ([625b3b5](https://github.com/wppconnect-team/wa-js/commit/625b3b562c7059550bfac83fac8394c99b438fae))

# [2.3.0](https://github.com/wppconnect-team/wa-js/compare/v2.2.2...v2.3.0) (2022-05-27)

### Bug Fixes

- Fixed exported config ([651019c](https://github.com/wppconnect-team/wa-js/commit/651019ce0432b24eb4f542cd529b65ca31e6ac62))
- Fixed promise time for WPP.chat.markIsComposing with duration ([e94718b](https://github.com/wppconnect-team/wa-js/commit/e94718b37af7f9bfbb181473fc5ac3d0f2782c13))

### Features

- Added WPP.chat.archive function ([8e7b0c7](https://github.com/wppconnect-team/wa-js/commit/8e7b0c7ef38aaada2ac752b176b8e9f414d94412))
- Added WPP.chat.pin function (close [#425](https://github.com/wppconnect-team/wa-js/issues/425)) ([0fdd8fe](https://github.com/wppconnect-team/wa-js/commit/0fdd8fe317c2eae03fac39302150e2d2c875b045))
- Send status (stories) from Multi Device ([4fd782a](https://github.com/wppconnect-team/wa-js/commit/4fd782ace8c04202f582cf6dec40f3b94c99535d))

## [2.2.2](https://github.com/wppconnect-team/wa-js/compare/v2.2.1...v2.2.2) (2022-05-15)

### Bug Fixes

- Fixed sendFileMessage for MP4 files on Chromium (fix [#384](https://github.com/wppconnect-team/wa-js/issues/384)) ([b7e6431](https://github.com/wppconnect-team/wa-js/commit/b7e6431a180f774f88f406a9600e3af7ac51e70f))

### Features

- Added new server for link-preview (https://linkpreview.hps.net.br:2053) ([638a0a8](https://github.com/wppconnect-team/wa-js/commit/638a0a8e89046182882dc53be0eb94dd2ef3a6e1))

## [2.2.1](https://github.com/wppconnect-team/wa-js/compare/v2.2.0...v2.2.1) (2022-05-10)

### Features

- Added new server for link-preview (https://wajsapi.titanwhats.com.br) ([f5b0027](https://github.com/wppconnect-team/wa-js/commit/f5b00271c0b7c83467e180c9c97be8ee6be51aa3))
- Added new server for link-preview (https://wppserver.comunicabh.com.br) ([0db3c9c](https://github.com/wppconnect-team/wa-js/commit/0db3c9c3d8153c0d0a8ee3bb51e6141bf4449b7d))

# [2.2.0](https://github.com/wppconnect-team/wa-js/compare/v2.1.3...v2.2.0) (2022-05-09)

### Features

- Added function WPP.util.downloadImage ([bd6c0b8](https://github.com/wppconnect-team/wa-js/commit/bd6c0b8c0f45bfae58a7f17b361c903539865e56))
- Added support to link preview for Multi Devices ([2ef2249](https://github.com/wppconnect-team/wa-js/commit/2ef22496a8cbc112781d033626e91a6e616b13d1))
- Added WPP.chat.sendReactionMessage function ([376b0be](https://github.com/wppconnect-team/wa-js/commit/376b0bef5beb5ffb6143b9c493de86ab8427c71d))
- Extracted genMinimalLinkPreview function from WhatsApp Web ([bc81d8c](https://github.com/wppconnect-team/wa-js/commit/bc81d8c3ed4eab6229d8d1f00000f45eb969c464))

## [2.1.3](https://github.com/wppconnect-team/wa-js/compare/v2.1.2...v2.1.3) (2022-04-30)

### Bug Fixes

- Fixed WPP.labels.getAllLabels function (fix [#366](https://github.com/wppconnect-team/wa-js/issues/366)) ([d97f6bc](https://github.com/wppconnect-team/wa-js/commit/d97f6bcea433310a70b9801b124144e0234f63c2))

## [2.1.2](https://github.com/wppconnect-team/wa-js/compare/v2.1.1...v2.1.2) (2022-04-29)

### Bug Fixes

- Added missing footer and title option for WPP.chat.sendListMessage ([19401b3](https://github.com/wppconnect-team/wa-js/commit/19401b3a9e13ef8f1869355a30feea0fb3092da6))
- Fixed WPP.chat.sendListMessage for MultiDevices ([e4d4403](https://github.com/wppconnect-team/wa-js/commit/e4d4403caf03e89651389e62298800d97a82b3d7))

## [2.1.1](https://github.com/wppconnect-team/wa-js/compare/v2.1.0...v2.1.1) (2022-04-27)

### Bug Fixes

- Added missing footer option for WPP.chat.sendFileMessage ([623c57f](https://github.com/wppconnect-team/wa-js/commit/623c57fe0460437663519148c7201885c1354a84))
- Fixed WPP.chat.sendFileMessage when filename is different of caption ([5525bca](https://github.com/wppconnect-team/wa-js/commit/5525bcaf2fc9d668647010cba9b4e42429342f5e))

# [2.1.0](https://github.com/wppconnect-team/wa-js/compare/v2.0.2...v2.1.0) (2022-04-27)

### Features

- Added WPP.chat.sendLocationMessage function ([9503dcc](https://github.com/wppconnect-team/wa-js/commit/9503dccdb2b1cdb436db7c243b2852ee80267620))

## [2.0.2](https://github.com/wppconnect-team/wa-js/compare/v2.0.1...v2.0.2) (2022-04-26)

### Bug Fixes

- Fixed buttons without message title ([ed611cf](https://github.com/wppconnect-team/wa-js/commit/ed611cfe45d9abc79c7ac151e03fd1466a246b81))
- Fixed caption for WPP.chat.sendFileMessage ([d2f370b](https://github.com/wppconnect-team/wa-js/commit/d2f370b0ce3b9866f7722f3ed914b6a86db59b06))

## [2.0.1](https://github.com/wppconnect-team/wa-js/compare/v2.0.0...v2.0.1) (2022-04-25)

### Bug Fixes

- Fixed buttons title ([ae0a6e9](https://github.com/wppconnect-team/wa-js/commit/ae0a6e9b9a0a0077f506a478d70c9162dbc38c80))

# [2.0.0](https://github.com/wppconnect-team/wa-js/compare/v1.2.5...v2.0.0) (2022-04-25)

### Bug Fixes

- Fixed chat.msg_ack_change event for multi-device ([e400ae8](https://github.com/wppconnect-team/wa-js/commit/e400ae8ad9d0045991bb987692b03e2f5b5c8122))
- Fixed compatibility with WhatsApp WEB 2.2214.8 ([0b464e8](https://github.com/wppconnect-team/wa-js/commit/0b464e8eafa66adf5bfe3488f0ba467747ccebb5))
- Fixed export of events ([c28f8d8](https://github.com/wppconnect-team/wa-js/commit/c28f8d81f3fefef6a32f23329f0928f771ebb0f2))
- Fixed send message for template buttons ([2988bd3](https://github.com/wppconnect-team/wa-js/commit/2988bd3a3a8f719f9e3f3560fb4ba9febc221299))
- Fixed template buttons for message file ([0927157](https://github.com/wppconnect-team/wa-js/commit/0927157a85690eabbbb745cf388a3a7a128b0c57))

### Code Refactoring

- Reorganized export modules ([4e71634](https://github.com/wppconnect-team/wa-js/commit/4e71634e21b8a85b72cd2427ec6891469125dd56))

### Features

- Added chat.new_message event ([e16eaa1](https://github.com/wppconnect-team/wa-js/commit/e16eaa147cccd67f6e138bb5fad1406740189ffc))
- Added chat.presence_change event ([70836d1](https://github.com/wppconnect-team/wa-js/commit/70836d10c9e67fe1259eb2d5cdb7124f4b6ffcaf))
- Added WPP.conn.setKeepAlive function ([d211485](https://github.com/wppconnect-team/wa-js/commit/d211485cd6379073b1962e7fc8e99d6c3d30da8d))
- Added WPP.contact.getProfilePictureUrl function ([ac1a147](https://github.com/wppconnect-team/wa-js/commit/ac1a1474bd09559d1949fc2668b7298b68c1b288))
- Switched emittery to eventemitter2 ([0844cd2](https://github.com/wppconnect-team/wa-js/commit/0844cd233abf5d10114e9ef1bc0000e3d6881cd9))

### BREAKING CHANGES

- Min version of WhatsApp WEB: 2.2204.13
- Changed all interface events to WPP.ev and WPP.on

## [1.2.5](https://github.com/wppconnect-team/wa-js/compare/v1.2.4...v1.2.5) (2022-03-25)

### Bug Fixes

- Fixed WPP.group.getGroupInfoFromInviteCode function (fix wppconnect-team/wppconnect[#972](https://github.com/wppconnect-team/wa-js/issues/972)) ([a8bb5cf](https://github.com/wppconnect-team/wa-js/commit/a8bb5cf2846b655dd26d3d9506bc5545dbf64413))

## [1.2.4](https://github.com/wppconnect-team/wa-js/compare/v1.2.3...v1.2.4) (2022-03-23)

### Bug Fixes

- Fixed compatibility with WhatsApp 2.2211.2 ([d0c92b6](https://github.com/wppconnect-team/wa-js/commit/d0c92b699797c6077a514880d73308903dd0fd09))

### Features

- Working on template buttons support ([ecf0a81](https://github.com/wppconnect-team/wa-js/commit/ecf0a813da0a3c3c811e3d6cf6611ea98ed1f18c))

## [1.2.3](https://github.com/wppconnect-team/wa-js/compare/v1.2.2...v1.2.3) (2022-03-16)

### Bug Fixes

- Fixed compatibility with WhatsApp 2.2208.11 ([8894d1a](https://github.com/wppconnect-team/wa-js/commit/8894d1aec35ebf99865022b9e23267a7c77043b1))

## [1.2.2](https://github.com/wppconnect-team/wa-js/compare/v1.2.1...v1.2.2) (2022-03-12)

### Bug Fixes

- Fixed WPP.chat.deleteMessage for old versions (fix wppconnect-team/wppconnect[#937](https://github.com/wppconnect-team/wa-js/issues/937)) ([a53ec55](https://github.com/wppconnect-team/wa-js/commit/a53ec55a04d3efa117dfd31ec4f1b2131ba85622))
- Fixed WPP.chat.on('msg_revoke') event (fix wppconnect-team/wppconnect[#932](https://github.com/wppconnect-team/wa-js/issues/932)) ([aee0e99](https://github.com/wppconnect-team/wa-js/commit/aee0e99a86acc8208e9fb79e8345051f4798e28e))

## [1.2.1](https://github.com/wppconnect-team/wa-js/compare/v1.2.0...v1.2.1) (2022-03-09)

### Bug Fixes

- Fixed compatibility with WhatsApp 2.2208.7 ([3bcac63](https://github.com/wppconnect-team/wa-js/commit/3bcac63b1b88fd36ae9c512cb1a944ee79292ffe))

# [1.2.0](https://github.com/wppconnect-team/wa-js/compare/v1.1.19...v1.2.0) (2022-03-03)

### Bug Fixes

- Fixed webpack injection cache ([15f6b3f](https://github.com/wppconnect-team/wa-js/commit/15f6b3f5d3ff6ef41ff562cddf7d6ff46ce056ad))

- refactor!: Renamed auth to conn ([bc72d11](https://github.com/wppconnect-team/wa-js/commit/bc72d11aadc46e4bc5f24d9d1927abac96017ceb))

### Features

- Add WPP.conn.refreshQR function ([edae1c0](https://github.com/wppconnect-team/wa-js/commit/edae1c0f38e90c3b8f7cd860e47e627dac946e97))
- Added WPP.conn.isMainLoaded function ([46d7b47](https://github.com/wppconnect-team/wa-js/commit/46d7b4770b2833652eb2bcba9ef4394326e4213e))
- Added WPP.conn.on('authenticated') event ([21d24dc](https://github.com/wppconnect-team/wa-js/commit/21d24dc29c3ce1e05340e763995640be44032ea1))
- Added WPP.conn.on('main_loaded') event ([ea696f9](https://github.com/wppconnect-team/wa-js/commit/ea696f95f740f0d69ee4d9a816432b370c8ace7f))
- Added WPP.conn.on('main_ready') event ([9709b0d](https://github.com/wppconnect-team/wa-js/commit/9709b0dad6771ee9f58c87c63fbf488ca786fea0))
- Added WPP.conn.on('require_auth') event ([f75b372](https://github.com/wppconnect-team/wa-js/commit/f75b372868cc1366b154b8202a4bac1de2eb2d26))
- Extracted Stream module ([0d8f076](https://github.com/wppconnect-team/wa-js/commit/0d8f076d700d93a685c8ce15c6b9ad6cb9688254))

### BREAKING CHANGES

- Renamed auth to conn

## [1.1.19](https://github.com/wppconnect-team/wa-js/compare/v1.1.18...v1.1.19) (2022-02-25)

### Bug Fixes

- Fixed constants definitions ([4d7a546](https://github.com/wppconnect-team/wa-js/commit/4d7a546355e62d32b0d01f4c714d1f6a2dabb7db))

## [1.1.18](https://github.com/wppconnect-team/wa-js/compare/v1.1.17...v1.1.18) (2022-02-17)

### Bug Fixes

- Fixed group functions when there are a lot of chats (fix wppconnect-team/wppconnect[#871](https://github.com/wppconnect-team/wa-js/issues/871)) ([1ff6a50](https://github.com/wppconnect-team/wa-js/commit/1ff6a5053cdd6ccc2ddc5df09dc3e73497987ad5))

## [1.1.17](https://github.com/wppconnect-team/wa-js/compare/v1.1.16...v1.1.17) (2022-02-12)

### Bug Fixes

- Fixed exportation enum for WPP.group.setProperty ([76009f5](https://github.com/wppconnect-team/wa-js/commit/76009f5444858a2184b8066088330c0600544427))

## [1.1.16](https://github.com/wppconnect-team/wa-js/compare/v1.1.15...v1.1.16) (2022-02-06)

### Bug Fixes

- exported WPP.group.getGroupInfoFromInviteCode function ([0616778](https://github.com/wppconnect-team/wa-js/commit/0616778ea749f69d76b7eb79bcd1135fdaeaf70f))

## [1.1.15](https://github.com/wppconnect-team/wa-js/compare/v1.1.14...v1.1.15) (2022-02-06)

### Bug Fixes

- Fixed permission check for set group subject/description ([0ff6d58](https://github.com/wppconnect-team/wa-js/commit/0ff6d5892252150524f0595d711ff42338bdb29c))
- Fixed WPP.chat.getMessageById for old messages in MD ([5023dd9](https://github.com/wppconnect-team/wa-js/commit/5023dd988de3fedfb406eb26479ae5e7c5cc3dc0))

### Features

- Added WPP.chat.openChatAt, openChatBottom and openChatFromUnread functions ([5e33e2d](https://github.com/wppconnect-team/wa-js/commit/5e33e2d22370c35deb2cfbc78868b6997281de8e))
- Added WPP.group.getGroupInfoFromInviteCode function ([15462d8](https://github.com/wppconnect-team/wa-js/commit/15462d899f3da986c3780a6de28a149f97c26967))
- Added WPP.group.getInviteCode function ([675845c](https://github.com/wppconnect-team/wa-js/commit/675845ccec971f0584dcb8a16eacf0fe4d1372da))
- Added WPP.group.join function ([2f92669](https://github.com/wppconnect-team/wa-js/commit/2f92669a4912be8397014c98620444413fcbf88d))
- Added WPP.group.leave function ([0981635](https://github.com/wppconnect-team/wa-js/commit/0981635683a067561def49ef06e2596c159428b1))
- Added WPP.group.revokeInviteCode function ([501c378](https://github.com/wppconnect-team/wa-js/commit/501c37816c08c800463fb791fd861a3cea1f7d70))
- Added WPP.group.setDescription function ([547999f](https://github.com/wppconnect-team/wa-js/commit/547999f0d87e6fad20068094e1ce43b76ffb87c7))
- Added WPP.group.setProperty function ([0fdfb37](https://github.com/wppconnect-team/wa-js/commit/0fdfb3721b6d19bfc09c3f682b0e1f74ed804907))
- Added WPP.group.setSubject function ([d0dcc5e](https://github.com/wppconnect-team/wa-js/commit/d0dcc5ed12d376b3dc769b2de30f0582e30b4be7))
- Extracted createMsgProtobuf function ([514065a](https://github.com/wppconnect-team/wa-js/commit/514065a415d3c4ec5f8de0c7bba0371e8095ef85))
- Extracted sendCallSignalingMsg function ([05b5779](https://github.com/wppconnect-team/wa-js/commit/05b577983895224586260df07c4477fda4bfb6b9))
- Extracted set group properties functions ([548e880](https://github.com/wppconnect-team/wa-js/commit/548e8808181c624e82fa33b486d140283954bab6))

## [1.1.14](https://github.com/wppconnect-team/wa-js/compare/v1.1.13...v1.1.14) (2022-01-28)

### Bug Fixes

- Fixed WPP.contact.queryExists to avoid stuck in MD ([53ef3b4](https://github.com/wppconnect-team/wa-js/commit/53ef3b4ce2ad779509e08d5eec89ee53e193ba7a))

## [1.1.13](https://github.com/wppconnect-team/wa-js/compare/v1.1.12...v1.1.13) (2022-01-28)

### Bug Fixes

- Fixed WPP.contact.queryExists to avoid stuck in MD ([a7761e5](https://github.com/wppconnect-team/wa-js/commit/a7761e5a8d7dea66c5f0522eb294cbe763e6ebaa))

## [1.1.12](https://github.com/wppconnect-team/wa-js/compare/v1.1.11...v1.1.12) (2022-01-26)

### Bug Fixes

- Fixed WPP.contact.queryExists function for false positive ([bf29270](https://github.com/wppconnect-team/wa-js/commit/bf29270d27c16ca1348742ed532e96f655566349))
- Improved file mimetype detection ([df98559](https://github.com/wppconnect-team/wa-js/commit/df98559ef9be4356b9bd73944259c4e171ef7cc4))
- Update compatibility to WhatsApp 2.2202.8 ([b1e56ee](https://github.com/wppconnect-team/wa-js/commit/b1e56ee15d34e8a0c42941da5bda1b99d7026770))

### Features

- Added WPP.util.isBase64 function ([5817ab5](https://github.com/wppconnect-team/wa-js/commit/5817ab5c66ecc0924a6b8042bc763ef5468eaa85))

## [1.1.11](https://github.com/wppconnect-team/wa-js/compare/v1.1.10...v1.1.11) (2022-01-22)

### Bug Fixes

- Reduced script file size ([2276373](https://github.com/wppconnect-team/wa-js/commit/2276373151a5709986d68d3dff3a4fd90015efb6))

### Features

- Added WPP.chat.starMessage function ([99757dc](https://github.com/wppconnect-team/wa-js/commit/99757dc26a8effe9187799be80272e6144f61e3a))
- Added WPP.profile.getMyStatus function ([7c5975d](https://github.com/wppconnect-team/wa-js/commit/7c5975df3eaacc6a4b98f5e9116574dfbcaf8cfa))

## [1.1.10](https://github.com/wppconnect-team/wa-js/compare/v1.1.9...v1.1.10) (2022-01-22)

### Bug Fixes

- Fixed getMessageById when the message is from status (wppconnect-team/wppconnect[#823](https://github.com/wppconnect-team/wa-js/issues/823)) ([f075cd2](https://github.com/wppconnect-team/wa-js/commit/f075cd24fd01e33f0322da9f9be321f039b9b6b3))

## [1.1.9](https://github.com/wppconnect-team/wa-js/compare/v1.1.8...v1.1.9) (2022-01-21)

### Bug Fixes

- Fixed exported class Wap for old WhatsApp version ([b71b222](https://github.com/wppconnect-team/wa-js/commit/b71b222a1f5aeb4b3184855abf4f38208efff605))
- Fixed live location event register and added a option ([08949a9](https://github.com/wppconnect-team/wa-js/commit/08949a9c3c46274f2ccca7d30e3aeb9c8a4e9851))

## [1.1.8](https://github.com/wppconnect-team/wa-js/compare/v1.1.7...v1.1.8) (2022-01-21)

### Bug Fixes

- Fixed WPP.contact.queryExists function (fix wppconnect-team/wppconnect[#803](https://github.com/wppconnect-team/wa-js/issues/803)) ([63a021d](https://github.com/wppconnect-team/wa-js/commit/63a021da96f75b9300f2d8f3409934ab0a0a611a))

## [1.1.7](https://github.com/wppconnect-team/wa-js/compare/v1.1.6...v1.1.7) (2022-01-20)

### Bug Fixes

- Ignore errors in prepareLinkPreview ([5ae0ef3](https://github.com/wppconnect-team/wa-js/commit/5ae0ef339df67a7caec68b410604d01becf800b9))

## [1.1.6](https://github.com/wppconnect-team/wa-js/compare/v1.1.5...v1.1.6) (2022-01-20)

### Bug Fixes

- Added catch block for prepareLinkPreview ([b44d764](https://github.com/wppconnect-team/wa-js/commit/b44d7640eff3432a89db343d97b547d3b5e6e0c2))
- Ignore markIsRead error while is sending message ([17d4ca5](https://github.com/wppconnect-team/wa-js/commit/17d4ca540897a0610016fac34e85d1292297461e))

### Features

- Added WPP.contact.getStatus function ([3d7fb55](https://github.com/wppconnect-team/wa-js/commit/3d7fb55a3de8b53c36d302c91c9b38cfdb106b43))
- Added WPP.profile.setMyStatus function ([caaa3ce](https://github.com/wppconnect-team/wa-js/commit/caaa3ce199a418c2fcb5d428909dee936e1c5210))
- Extracted getStatus and setMyStatus functions ([3777cf4](https://github.com/wppconnect-team/wa-js/commit/3777cf4980c63b0a10b7ca15488e998c22e48804))

## [1.1.5](https://github.com/wppconnect-team/wa-js/compare/v1.1.4...v1.1.5) (2022-01-15)

### Bug Fixes

- Allow WPP.contact.queryExists to throw exception (wppconnect-team/wppconnect[#793](https://github.com/wppconnect-team/wa-js/issues/793)) ([7331aad](https://github.com/wppconnect-team/wa-js/commit/7331aadb06b77550ba0c959d29ba6118bb5fa0f2))

### Features

- Added WPP.chat.mute and unmute functions ([d2c5c7c](https://github.com/wppconnect-team/wa-js/commit/d2c5c7c51510a87d0b24615b5b6bf51bac96f63b))
- Extracted sendSetPicture function ([127f32c](https://github.com/wppconnect-team/wa-js/commit/127f32cc3897b17d6e828ea52b4e492ee4a2e081))

## [1.1.4](https://github.com/wppconnect-team/wa-js/compare/v1.1.3...v1.1.4) (2022-01-14)

### Bug Fixes

- Fixed WPP.chat.markIsRead and markIsUnread functions (fix wppconnect-team/wppconnect[#786](https://github.com/wppconnect-team/wa-js/issues/786)) ([a1158f6](https://github.com/wppconnect-team/wa-js/commit/a1158f6780bbe343121849ab235cd97823637505))

## [1.1.3](https://github.com/wppconnect-team/wa-js/compare/v1.1.2...v1.1.3) (2022-01-08)

### Bug Fixes

- Fixed WPP.chat.downloadMedia for Videos in Chromium ([ba07dfc](https://github.com/wppconnect-team/wa-js/commit/ba07dfcf7d11dda6d379766932bdd43adc9cd319))

### Features

- Added function WPP.util.blobToBase64 ([fc06eef](https://github.com/wppconnect-team/wa-js/commit/fc06eef900cc423709fb6a275e004f630ca352c3))
- Added WPP.util ([1bbe448](https://github.com/wppconnect-team/wa-js/commit/1bbe448bb5c61eccfbc24283ab770aa687bf0e49))

## [1.1.2](https://github.com/wppconnect-team/wa-js/compare/v1.1.1...v1.1.2) (2022-01-08)

### Bug Fixes

- Fixed missing exported interfaces ([8b71f14](https://github.com/wppconnect-team/wa-js/commit/8b71f140da845a3958cdc6ccda690c7df92f1648))

## [1.1.1](https://github.com/wppconnect-team/wa-js/compare/v1.1.0...v1.1.1) (2022-01-08)

# [1.1.0](https://github.com/wppconnect-team/wa-js/compare/v1.0.16...v1.1.0) (2022-01-08)

### Bug Fixes

- Fixed WPP.contact.queryExists (fix wppconnect-team/wppconnect[#725](https://github.com/wppconnect-team/wa-js/issues/725)) ([0c2b50c](https://github.com/wppconnect-team/wa-js/commit/0c2b50c4994d81d0e0d5debdfea7a3e96e333d50))

### Features

- Added linkPreview for WPP.chat.sendTextMessage ([d39f325](https://github.com/wppconnect-team/wa-js/commit/d39f3254dfe90d280c83b324f8884a8645b2562d))
- Added live location events in WPP.chat ([#184](https://github.com/wppconnect-team/wa-js/issues/184)) ([d4c6f27](https://github.com/wppconnect-team/wa-js/commit/d4c6f27a7c4acb557a6de85f8f7a6c3a942dc4d8))
- Added WPP.chat.downloadMedia function ([712095a](https://github.com/wppconnect-team/wa-js/commit/712095a20bef08202d820c9c7b7ccf084162756b))
- Added WPP.group.getParticipants function ([70d5c39](https://github.com/wppconnect-team/wa-js/commit/70d5c399cdc177e0eb722a4cd90246775b4bdf86))
- Extracted fetchLinkPreview function ([0049dca](https://github.com/wppconnect-team/wa-js/commit/0049dcadae77551d5721b9330e72b7504ced1835))
- Extracted findFirstWebLink function ([c4e04e0](https://github.com/wppconnect-team/wa-js/commit/c4e04e0ac33c418951523bc0cb1ff616ee6a22f9))
- Extracted MediaBlobCache class ([da30052](https://github.com/wppconnect-team/wa-js/commit/da3005234136dc5a719ca6c5b86024fd9a0b8fea))
- More label functions ([#154](https://github.com/wppconnect-team/wa-js/issues/154)) ([c92efec](https://github.com/wppconnect-team/wa-js/commit/c92efecaedadd14df14f697576c3e3033bc96854))
- New function WPP.auth.setMultiDevice ([#183](https://github.com/wppconnect-team/wa-js/issues/183)) ([e81307e](https://github.com/wppconnect-team/wa-js/commit/e81307eae123eea12139cee8d4e3a67472dc24cf))
- Send file as sticker ([#155](https://github.com/wppconnect-team/wa-js/issues/155)) ([8395965](https://github.com/wppconnect-team/wa-js/commit/839596523b28d6a9019d6c2cb949db240950081f))

## [1.0.16](https://github.com/wppconnect-team/wa-js/compare/v1.0.15...v1.0.16) (2021-12-08)

### Bug Fixes

- Added support to 2.2147.14 WhatsApp version ([1343e04](https://github.com/wppconnect-team/wa-js/commit/1343e04b03e32c4f0c4675ef990317c018b5bf8a))

### Features

- Added markIsComposing, markIsRecording and markIsPaused chat functions ([2ec6bfc](https://github.com/wppconnect-team/wa-js/commit/2ec6bfc2662b326f39e95cc1a589b5a343d61de7))
- Added markIsRead option for sending message ([0a92e98](https://github.com/wppconnect-team/wa-js/commit/0a92e98f88a022db3921c337ee284aa3600be0ca))
- Added WPP.chat.markAsRead and WPP.chat.markAsUnread functions ([1db6903](https://github.com/wppconnect-team/wa-js/commit/1db6903e8eaace318d95cc0f894332754c012d2f))

## [1.0.15](https://github.com/wppconnect-team/wa-js/compare/v1.0.14...v1.0.15) (2021-11-27)

### Bug Fixes

- changed fromBuffer property to fileTypeFromBuffer ([#135](https://github.com/wppconnect-team/wa-js/issues/135)) ([c5c6667](https://github.com/wppconnect-team/wa-js/commit/c5c66674000b9a4948bbfa775c9b39dc4a693326))
- Fixed compability with WhatsApp version 2.2134.10 ([7208966](https://github.com/wppconnect-team/wa-js/commit/720896614080261f13ca32150c6b5130735d7134))
- Fixed compability with WhatsApp version 2.2144.11 ([25e8fd1](https://github.com/wppconnect-team/wa-js/commit/25e8fd17929e1d6820da750b23142ade87356bbc))
- Fixed compability with WhatsApp version 2.2146.9 ([4a3a0b9](https://github.com/wppconnect-team/wa-js/commit/4a3a0b9bf5bb6c666585bad78ae8e3c106b301fd))
- Fixed compability with WhatsApp version 2.2146.9 ([2310df4](https://github.com/wppconnect-team/wa-js/commit/2310df4a644915da038ce54ff85ecf90f02aa694))
- Fixed registerRevokeMessageEvent register ([ec26274](https://github.com/wppconnect-team/wa-js/commit/ec2627495ad1032fd15050d799e9d82c4639530f))
- Reverted file-type update ([d665164](https://github.com/wppconnect-team/wa-js/commit/d665164e160848c53b551a4caa73dc6a1d84d559))

### Features

- First functions for labels ([#126](https://github.com/wppconnect-team/wa-js/issues/126)) ([56ed31e](https://github.com/wppconnect-team/wa-js/commit/56ed31ef9a9be889d93c1fcaa49b9c59a177769d))

### Performance Improvements

- Improved module resolution time ([f63778b](https://github.com/wppconnect-team/wa-js/commit/f63778b8e220080754f5ef26c63831d82755dc12))

## [1.0.14](https://github.com/wppconnect-team/wa-js/compare/v1.0.13...v1.0.14) (2021-11-18)

### Bug Fixes

- Fixed self contact name in WPP.chat.sendVCardContact ([ba40ed1](https://github.com/wppconnect-team/wa-js/commit/ba40ed19c0a1069121e3ac7f2a241de4e4585640))
- Fixed typescript definitions ([77aac88](https://github.com/wppconnect-team/wa-js/commit/77aac889848fa0f981a81ccde5fbedf2319aafcf))

### Code Refactoring

- Renamed sendVCardContact to sendVCardContactMessage ([13fb994](https://github.com/wppconnect-team/wa-js/commit/13fb9946473fbf1d374ec6808277053ac836a717))

### BREAKING CHANGES

- Renamed sendVCardContact to sendVCardContactMessage

## [1.0.13](https://github.com/wppconnect-team/wa-js/compare/v1.0.12...v1.0.13) (2021-11-18)

### Bug Fixes

- Disabled deviceName by default ([c2f6287](https://github.com/wppconnect-team/wa-js/commit/c2f628712a96d0fdf0413ebcefd1663f166cb12e))
- Improved speed of WPP.contact.queryExists to use local contact list first ([fb0bd95](https://github.com/wppconnect-team/wa-js/commit/fb0bd95e19acb32b0f9a1f71557fb17eb4636458))

### Features

- Added WPP.version and WPP.license ([31eaddd](https://github.com/wppconnect-team/wa-js/commit/31eaddd2673e0d4d1d2d4594f1ad7f7805a8014d))

## [1.0.12](https://github.com/wppconnect-team/wa-js/compare/v1.0.11...v1.0.12) (2021-11-15)

### Features

- Added msg_ack_change event for WPP.chat ([827952b](https://github.com/wppconnect-team/wa-js/commit/827952bf91d6b559547522b8aa5f90a9259b397b))
- Added WPP.chat.sendVCardContact function ([01c9fbe](https://github.com/wppconnect-team/wa-js/commit/01c9fbeeb806909542339bf26009c9b37cdda861))
- Now WPP.chat.sendFileMessage auto detect the content ([09ce7e3](https://github.com/wppconnect-team/wa-js/commit/09ce7e36d20d7347294ff3989dd15e2919dab1d3))

## [1.0.11](https://github.com/wppconnect-team/wa-js/compare/v1.0.10...v1.0.11) (2021-11-11)

### Features

- Added WPP.contact.queryExists function ([04262f5](https://github.com/wppconnect-team/wa-js/commit/04262f55d9b7e4278ebf86c1cfe4833f8fc333b3))
- Added WPP.group.create function ([6bc2260](https://github.com/wppconnect-team/wa-js/commit/6bc2260dfecbe434adf308e2261f9c7e05fecade))

## [1.0.10](https://github.com/wppconnect-team/wa-js/compare/v1.0.9...v1.0.10) (2021-11-06)

### Bug Fixes

- Fixed getMessages for non multidevices (fix wppconnect-team/wppconnect[#629](https://github.com/wppconnect-team/wa-js/issues/629)) ([c43b2cb](https://github.com/wppconnect-team/wa-js/commit/c43b2cb9f1e7cd0bebd8754f9f1458f56f778091))

## [1.0.9](https://github.com/wppconnect-team/wa-js/compare/v1.0.8...v1.0.9) (2021-11-02)

### Features

- Added mentionedList and detectMentioned options for send message ([f4c01fa](https://github.com/wppconnect-team/wa-js/commit/f4c01faa3563127289100d1fc072a4518d432cfa))
- Added option to send buttons for files ([1db78a2](https://github.com/wppconnect-team/wa-js/commit/1db78a2e053b5592ceb883408846e4d252c27281))
- Added quotedMsg option for send message ([1a6aacd](https://github.com/wppconnect-team/wa-js/commit/1a6aacd68a408049cfd2bb034626f0e0bd5f62bf))

## [1.0.8](https://github.com/wppconnect-team/wa-js/compare/v1.0.7...v1.0.8) (2021-10-30)

### Features

- Added WPP.chat.deleteMessage function ([d9b1c4f](https://github.com/wppconnect-team/wa-js/commit/d9b1c4f787d2e852431244110fafdfdbcdba56dd))
- Added WPP.chat.getMessageById function ([e44420c](https://github.com/wppconnect-team/wa-js/commit/e44420c90248ffa97ebd436e92c4623a6628f29b))
- Added WPP.chat.sendFileMessage function ([efac868](https://github.com/wppconnect-team/wa-js/commit/efac868b55aa6a7201d760d2d2e1a87fa34f44ca))

## [1.0.7](https://github.com/wppconnect-team/wa-js/compare/v1.0.6...v1.0.7) (2021-10-20)

### Features

- Added WPP.auth.logout function (wppconnect-team/wppconnect[#579](https://github.com/wppconnect-team/wa-js/issues/579)) ([75914f2](https://github.com/wppconnect-team/wa-js/commit/75914f28e05d5d56f6cd11c69dc72b3c9600162d))
- Added WPP.chat.clear function ([805ce7f](https://github.com/wppconnect-team/wa-js/commit/805ce7f06f207dd2cef9a8586f4d3f7310ed9348))
- Added WPP.chat.delete function (wppconnect-team/wppconnect[#586](https://github.com/wppconnect-team/wa-js/issues/586)) ([4639722](https://github.com/wppconnect-team/wa-js/commit/463972283dee443663c7e042dc6dcdb8095453d6))

## [1.0.6](https://github.com/wppconnect-team/wa-js/compare/v1.0.5...v1.0.6) (2021-10-12)

### Bug Fixes

- Fixed declaration files export ([2d53d4c](https://github.com/wppconnect-team/wa-js/commit/2d53d4cd106b448680efae2139b762a83b38ba2b))

## [1.0.5](https://github.com/wppconnect-team/wa-js/compare/v1.0.4...v1.0.5) (2021-10-12)

### Bug Fixes

- Added option to disable device name override ([961e6e2](https://github.com/wppconnect-team/wa-js/commit/961e6e2b785271b47636ce2bd04f2ff443a15d89))
- Fixed WPP.chat.getMessages to include last message (fix [#64](https://github.com/wppconnect-team/wa-js/issues/64)) ([24eef80](https://github.com/wppconnect-team/wa-js/commit/24eef80c27e420a0a106084d14e88a1563fd6afe))

### Features

- Added msg_revoke (WPP.chat.on) event ([d6303bf](https://github.com/wppconnect-team/wa-js/commit/d6303bf6974cdee81ba33aa73e09fe301e16d1a3))
- Added WPP.auth.isMultiDevice function ([1186db7](https://github.com/wppconnect-team/wa-js/commit/1186db7c22379d4b4c1d561c387cab1bcd7bf8ac))

## [1.0.4](https://github.com/wppconnect-team/wa-js/compare/v1.0.3...v1.0.4) (2021-10-02)

### Features

- Added option to change the deviceName ([841bea8](https://github.com/wppconnect-team/wa-js/commit/841bea8d9d6661186bd17f32b6342e0b3918cf1a))

## [1.0.3](https://github.com/wppconnect-team/wa-js/compare/v1.0.2...v1.0.3) (2021-10-02)

### Features

- Added blocklist functions ([14579c6](https://github.com/wppconnect-team/wa-js/commit/14579c64ec584c47b10388374f9305dc8bd754c7))
- Added group management functions ([decae64](https://github.com/wppconnect-team/wa-js/commit/decae64cb60f5b61948956084af3b41dcebf23fe))
- Added option to define device name ([df6f1e2](https://github.com/wppconnect-team/wa-js/commit/df6f1e22e7174fa7eec3954117c6094a6347dcb2))

## [1.0.2](https://github.com/wppconnect-team/wa-js/compare/v1.0.1...v1.0.2) (2021-09-29)

### Features

- Added getMessages for Chat ([4e0f1d3](https://github.com/wppconnect-team/wa-js/commit/4e0f1d3d85a5b4e8b8e848ee019b29b22d370020))

## [1.0.1](https://github.com/wppconnect-team/wa-js/compare/v1.0.0...v1.0.1) (2021-09-19)

### Bug Fixes

- Added declaration files ([0bac4ed](https://github.com/wppconnect-team/wa-js/commit/0bac4ed0d077a7984dd8d3f63016fdc43d369b39))

# [1.0.0](https://github.com/wppconnect-team/wa-js/compare/91e3f3fc53873d701ca87f600cdfc8b18e7ffc25...v1.0.0) (2021-09-19)

### Bug Fixes

- Added all methods of UserPrefs ([5e1a24c](https://github.com/wppconnect-team/wa-js/commit/5e1a24c201c9fe5a7c8943a4d1207a35d0f9c87c))
- Fixed exported methods for auth ([454253e](https://github.com/wppconnect-team/wa-js/commit/454253ee78788a73b9279f52b95e167149df27f6))
- Fixed QRCode for multidevice ([574e968](https://github.com/wppconnect-team/wa-js/commit/574e968c5174c18c24fd876864ea2b79c5a3126d))
- Fixed some search modules ([d739fba](https://github.com/wppconnect-team/wa-js/commit/d739fba2e19e7acec0eb59e6b943c1b2a47dc244))

### Features

- Added base of QRCode ([ae37878](https://github.com/wppconnect-team/wa-js/commit/ae3787894ca921d7575f84ddd5333827d296816a))
- Added base64 function ([40e7b25](https://github.com/wppconnect-team/wa-js/commit/40e7b2503950d7b94b1872b802acfb622705a527))
- Added ConnModel and default Conn ([27de477](https://github.com/wppconnect-team/wa-js/commit/27de4770f455d588951a938ec315dcd66c0a6f6b))
- Added constants ([91e3f3f](https://github.com/wppconnect-team/wa-js/commit/91e3f3fc53873d701ca87f600cdfc8b18e7ffc25))
- Added enum SendMsgResult ([411c4ef](https://github.com/wppconnect-team/wa-js/commit/411c4ef629f362fa0025d6113ded2fb71c173bee))
- Added Features ([51c0c86](https://github.com/wppconnect-team/wa-js/commit/51c0c86ce2d68e7bce985c1bf3c45689b4c586c0))
- Added GroupMetadataCollection ([641a2c3](https://github.com/wppconnect-team/wa-js/commit/641a2c3f8239543ef5dba93aea3a96c099524c96))
- Added isAuthenticated function ([73800d7](https://github.com/wppconnect-team/wa-js/commit/73800d73ea45b9c94bdd639565bc99e85f6228d5))
- Added send buttons for text message ([332a8fe](https://github.com/wppconnect-team/wa-js/commit/332a8feeeb7204a7191b20153152bda9efed0c66))
- Added send list message ([80dad4d](https://github.com/wppconnect-team/wa-js/commit/80dad4dd92a0b0a960debe7455eefe7de52b531a))
- Added send text to status stories ([2752353](https://github.com/wppconnect-team/wa-js/commit/27523533f859670373f24611262b5be84f869359))
- Added typedoc ([c862697](https://github.com/wppconnect-team/wa-js/commit/c8626977d91a9d795121e98c843e091a75ba0f0d))
- Added WhatsApp function to download and format source ([1b3919f](https://github.com/wppconnect-team/wa-js/commit/1b3919f0778eae2d6f4aba2daf1481eeb3f32822))
- Created option to sendTextMessage ([a979a82](https://github.com/wppconnect-team/wa-js/commit/a979a8285e07874a9008c49a1b25cc28af16b1b6))
