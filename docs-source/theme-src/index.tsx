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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Application, DefaultTheme, DefaultThemeRenderContext, JSX } from "typedoc";

class MyThemeContext extends DefaultThemeRenderContext {
    // Important: If you use `this`, this function MUST be bound! Template functions are free
    // to destructure the context object to only grab what they care about.
    override analytics = () => {
        // Reusing existing option rather than declaring our own for brevity
        if (!this.options.isSet("gaID")) return;

        const gaID = this.options.getValue("gaID");
        if (!gaID) return;

        return (
            <>
                <script async src={"https://www.googletagmanager.com/gtag/js?id=" + gaID}></script>
                <script>
                    <JSX.Raw html={`
                        window.dataLayer = window.dataLayer || []; function 
                        gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaID}');
                    `} />
                </script>
            </>
        );
    }
}

class MyTheme extends DefaultTheme {
    private _contextCache?: MyThemeContext;

    override getRenderContext() {
        if (!this._contextCache) {
            this._contextCache = new MyThemeContext(this as any, this.application.options);
        }
        return this._contextCache;
    }}

export function load(app: Application) {
    app.renderer.defineTheme("google-tag-manager", MyTheme);
}
