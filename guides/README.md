# Engineering Field Guides

Public library: https://yasirgrc08-techie.github.io/guides/

50 original guides, four A4 pages each. This free collection is separate from the existing paid sheets, courses, and mentoring offers.

## Content

Each guide contains a roadmap and foundations, a study schedule, a worked application with verification checks, and answered interview questions with readiness criteria and reference links. Company preparation is editorial guidance, not verified past-question attribution or a hiring guarantee.

Source material is authored under `content/`. PDF files, previews, the catalogue, and ZIP are generated together. The PDFs contain searchable text, section bookmarks, and clickable references; they do not depend on a print dialog or login.

## Build

Use Python 3.10+ and PyMuPDF:

```sh
python3 -m pip install -r guides/requirements.txt
python3 guides/tools/build_guides.py --expect-count 50
```

The build fails if a guide overflows, shrinks to fit, contains too little text, has invalid reference metadata, or fails the exact four-page check. It verifies text bounds and the ZIP, then records sizes and SHA-256 hashes in `catalog.json`.

For an individual layout experiment:

```sh
python3 guides/tools/build_guides.py --id microsoft-90-day-plan
```

Run the complete build afterward to refresh the catalogue, checksums, previews, and ZIP consistently. Do not publish a partial build with a stale catalogue.

## Verify

```sh
node --test tests/guides.test.cjs
```

The library is static GitHub Pages content. No checkout, account, analytics collection, or secret configuration is needed. Search and filters use the generated public catalogue. Without JavaScript, the page still provides the full ZIP and an example PDF link.