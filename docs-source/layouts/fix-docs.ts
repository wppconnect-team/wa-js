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

import * as path from 'path';
import * as shell from 'shelljs';

const nodeModulesDir = path.resolve(__dirname, '../../node_modules/');

// Pages Theme Plugin
const pagesThemeDir = path.resolve(
  nodeModulesDir,
  'typedoc-plugin-pages/dist/theme/v2'
);
// Default Theme
const defaultTheme = path.resolve(
  nodeModulesDir,
  'typedoc-default-themes/bin/default'
);

// Fix Theme
// shell.cp(path.resolve(defaultTheme, './partials/type.hbs'), path.resolve(pagesThemeDir, './partials/'));
shell.cp(
  path.resolve(defaultTheme, './partials/*'),
  path.resolve(pagesThemeDir, './partials/')
);
shell.cp(
  '-R',
  path.resolve(defaultTheme, './assets/*'),
  path.resolve(pagesThemeDir, './assets/')
);

// Google Analytics
shell.cp(
  path.resolve(__dirname, './analytics.hbs'),
  path.resolve(pagesThemeDir, './partials/')
);
shell.cp(
  path.resolve(__dirname, './default.hbs'),
  path.resolve(pagesThemeDir, './layouts/')
);
