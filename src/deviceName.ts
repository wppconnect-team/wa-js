/*!
 * Copyright 2021 WPPConnect Team
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

import * as packageJSON from '../package.json';
import * as webpack from './webpack';

// Update deviceName connected
webpack.onInjected(() => {
  const m = webpack.search((m) => m.default.info && m.default.hardRefresh);
  if (m) {
    const info = m.default.info();

    info.os = `WPPConnect/WA-JS ${packageJSON.version}`;
    info.version = `${packageJSON.version}`;
    info.name = undefined;
    info.ua = undefined;

    m.default.info = () => info;
  }
});
