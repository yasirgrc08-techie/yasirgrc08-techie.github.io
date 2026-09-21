# Engineering Content Templates

[Browse the collection](https://yasirgrc08-techie.github.io/blueprints/) | [Download all 500 templates](https://yasirgrc08-techie.github.io/blueprints/engineering-content-templates.zip)

100 engineering topics, each developed into five distinct formats: **500 templates**, not 500 unrelated topics or rendered videos. The collection is public and separate from the site's paid CV tools, interview sheets, courses, and mentoring.

## Contents

- 500 social-post PNGs at 1080 x 1350 pixels.
- 500 editable SVGs with the required OFL-licensed Lato fonts.
- 500 Markdown documents containing a caption, an eight-beat reel storyboard, public references, and technical caveats.
- Captions below 2,200 characters; estimated scripts of 30-63 seconds at about 150 spoken words per minute.
- A CSV index, a searchable JSON catalogue, and a complete ZIP of about 54 MB.

The five production formats are Bottleneck Roadmap, Decision Guide, Failure and Recovery, Metrics That Matter, and Build and Validate. Learning topics use Learning Roadmap, Practice Decisions, Pitfalls and Checks, Readiness Signals, and Build and Validate.

The website supports combined search/category/format filters, sorting, pagination, local bookmarks, shareable template links, and individual downloads. A single-template source ZIP also includes plain-text caption/script files and its JSON record. Bookmarks remain in the current browser; there is no account or cloud bookmark service.

## Editorial Scope

50 new production topics cover backend APIs, data/storage, caches/events, reliability/cloud, security, web performance, and AI engineering. Another 50 topics adapt this site's existing original public engineering field guides. Those adaptations are labelled in every template's source metadata. Each format has different content, not merely a changed title or color.

The [reference Instagram reel](https://www.instagram.com/reel/DdLzHfDodhq/) inspired the concise staged-explainer format. Its public caption was accessible, but the video was not playable during preparation. No footage, graphics, audio, or creator wording was copied. All examples use public technical references and original prose or the site's own guide content, not private workplace notes.

These are educational examples, not universal production recipes. Workload, latency/error objectives, correctness, cost, and failure behavior determine an appropriate design. Registered-user counts alone do not determine capacity. Check current provider and library documentation before applying an example. The sources tab and Markdown documents link to the supporting public references.

No rendered video, music, animation, or third-party stock footage is included. Storyboard timings are estimates, not measured recordings.

## Editing a Template

Open a template in the library to download its image or complete source ZIP. The SVG contains editable text and vector shapes. Retain its relative `fonts/` directory or install the included Lato fonts in your design application; SVG font support varies between editors. A PNG provides the verified fixed rendering.

The Markdown document contains the six content beats, full caption, estimated narration sequence, references, and caveats. Review technical wording after adapting it to a different audience or workload.

## Build and Verify

Run from the repository root with Node.js and Python 3 with PyMuPDF installed. On Windows, the build uses `wsl.exe --exec python3`; `PYTHON_BIN` can override the Python executable.

```sh
node blueprints/tools/build.cjs --check-only --expect-500
node blueprints/tools/build.cjs --expect-500
node --test tests/blueprints.test.cjs tests/site-assistant.test.cjs
```

Authored production topics live in `content/01-backend.json` through `content/05-security-ai-web.json`. The adapter reads `guides/content/` and rebuilds `content/generated-guides.json`. Edit the authored source or adapter, not the generated catalogue, poster files, or guide adaptations.

The build checks the topic schema, duplicate IDs/captions, text fit and extracted poster content, image dimensions, ZIP integrity, and a 90 MiB archive ceiling. Tests verify the exact 100-topic/500-template count, caption limits, generated image hashes, source files, archive hash, filters, pagination, and safe rendering. The catalogue records each image's SHA-256 and the complete archive's SHA-256.

The static library shares the existing site's Lucide and fflate vendor bundles; their notices remain in `cv-studio/vendor/`. Lato's font notice is included in `fonts/` and every source bundle.