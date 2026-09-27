/**
 * MIT License
 *
 * Copyright (c) 2026 Yannick Baettig
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// dsh-model-picker node half.
//
// The browser half (the "./client" export, lib/client.js) provides the
// searchable composer model picker and the "Model Picker" settings
// page. This node half exists so the bundle patch row (cordis.patch.yml) can
// mount the package in the web profile — the client-modules scan reads the
// `dsh.client` declaration from packages mounted in the host Loader — and it
// registers the plugin's durable settings namespace: the browser half persists
// the curated list (hidden models, pinned order + per-model effort defaults)
// through the `dsh-model-picker` settings namespace so it survives browser and
// machine restarts. Keep this file: removing it breaks the mount and persistence.

import z from "@deepseek-ai/schemastery";

export const name = "dsh-model-picker";

// DSH 0.1.7 projects plugin settings from the bundle entry's Config schema.
// The old ctx.settings.register() API was removed, so expose the namespace's
// durable fields as live settings instead. The profile entry id supplied by
// cordis.patch.yml is `dsh-model-picker`, which is also the namespace
// addressed by the browser half through remote.settings.
export const Config = z.object({
  hidden: z.dict(z.boolean()).default({}).volatile(),
  pinned: z.array(z.string()).default([]).volatile(),
  effortDefaults: z.dict(z.string()).default({}).volatile(),
});

export function apply() {
  // Settings are provided by the loader from Config; no host-side setup is
  // required here. Keeping an apply function makes the package compatible with
  // the Cordis plugin loader's function-plugin shape.
}
