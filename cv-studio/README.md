# CV Studio

An independent browser-based CV editor and readiness reviewer at `/cv-studio/`. It includes original layouts and attributed adaptations of an MIT-licensed format available on Overleaf. It is not an Overleaf clone, an employer product, or a reproduction of private ATS scoring.

## Products and Checkout

The selected `checkoutMode` in `config.js` is **`razorpay`**, matching the existing website's browser checkout pattern and public merchant key. This does not require the optional server API. Payment starts only when a visitor chooses to purchase and supplies a receipt email. No calendar, appointment, or recurring subscription is created.

- **INR 49 once / 4900 paise:** all 32 layouts, PDF and LaTeX exports, and complete template ZIPs. Template switching does not require another purchase. Editing, local drafts, watermarked preview, and JSON backups are available before purchase.
- **INR 9 / 900 paise per readiness report:** one CV and target snapshot. A SHA-256 fingerprint binds the local receipt to text, target role/company, requirements, and document properties. Reopening or downloading that report is free. A changed CV or target is a new review.
- Existing paid sheets, courses, mentoring sessions, and free guides remain separate and unchanged.

**Billing limitation:** selected browser mode trusts the Razorpay callback and a local receipt, like the site's existing digital products. It does not independently verify capture, signatures, amount, refunds, or disputes with Razorpay's API. Browser checks isolate products but are not a secure authorization boundary. A determined visitor can forge local access. Merchant support must reconcile references and handle refunds in Razorpay. No real money was charged during testing; mocked callbacks do not prove live merchant settlement.

**Hosting constraint:** [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) restrict sites primarily offering commercial SaaS or facilitating transactions. Reusing existing checkout does not remove that restriction. The owner must arrange suitable commercial hosting before treating this as a compliant production business deployment. Source may stay on GitHub. No external hosting account, paid plan, or private payment service was provisioned.

## Included

- 32 searchable layouts: simple, project-first, academic, leadership, four optional-photo layouts, and two attributed community-format adaptations.
- 24 detailed role examples covering students, freshers, laterals/career changes, engineering disciplines, SRE, ML, QA, analysts, designers, product managers, writers, senior ICs, principals, engineering managers, and directors.
- Yasir Sharfi is the sample identity. Employers, dates, qualifications, and achievements are illustrative, not his biography. Only exact untouched legacy samples migrate; user-authored drafts are not renamed.
- Editorial preparation guidance for Microsoft, Google, Amazon, Meta, Apple, Netflix, NVIDIA, and general big-tech roles. No screening, interview, or offer guarantees.
- Contact details, editable/reorderable sections and entries, section visibility, and undo/redo.
- A4/US Letter, two font families, six accents, spacing, margins, body size, and page numbering.
- Actual PDF rendering and pagination, a plain-text view, JSON source editing, and content checks.
- Up to 10 local drafts, JSON import/export, and protection against corrupt storage and competing browser tabs.
- Local photo cropping, JPEG/PNG storage, private access-receipt backups, and complete PDF/JSON/LaTeX/photo ZIPs.
- Readiness reviews for PDF, DOCX, TXT, pasted text, or the current studio CV, with point-by-point improvements, keyword coverage, public company guidance, and PDF/JSON reports.
- A dynamic `CV Tools` homepage button for templates, review, drafts, and local digital-purchase history. Existing booking controls are unchanged.

There are no cloud accounts, shared drafts, collaboration, AI resume generation, or online LaTeX compilation. Source mode edits CV JSON. LaTeX is a portable source layout, not an exact reproduction of every PDF design. Select **XeLaTeX** in Overleaf. Community exports use the attributed format with adapted Unicode fonts and generated content. A portable Tectonic check was attempted, but its runtime download timed out before compilation; escaping and package contents are tested, actual TeX compilation remains unverified.

The embedded fonts cover many Latin-script names and text, not every writing system. Verify glyphs and extracted text for the language you use. Two-column reading order varies across parsers; a simple single-column layout is the conservative choice when the employer does not specify a format. Replace all fictional details and use only claims you can substantiate.

## Privacy and Access Limits

CV text, photographs, uploaded documents, job descriptions, PDF generation, and review calculations stay in the browser. They are not sent to payment APIs or AI services. Drafts and reports are not encrypted; scripts on the same origin can access its browser storage. Browser storage is not a durable backup, especially on shared devices.

The page requests interface fonts from Google Fonts. Rendering engines, PDF fonts, parsers, previews, and icons are local assets. Razorpay loads when purchasing. After a successful callback, the existing EmailJS merchant notification receives the receipt email, product, price, and payment reference, not CV text, photos, job descriptions, or reports. Notification failure does not revoke access. Third-party scripts execute on the page; this is not an isolation guarantee against their code.

A CV backup contains personal data and any photo. A report backup contains report excerpts, its fingerprint, and purchase receipt. Keep them private. Browser-mode restoration validates the product/report and receipt shape, not provider state. Contact support with the payment reference if storage and backups are lost. No automated email/account recovery is implemented. Digital orders use `yas_digital_orders`; calendar records in `yas_bookings` are unchanged.

**Not DRM:** the renderer, review rules, source, and receipt logic are public browser code. Even optional server verification cannot make a client-owned renderer secret. Stronger enforcement needs an authorized server-owned service and revised privacy model.

## Review Methodology

The English-language checklist normalizes earned points against available points to 100. It checks readable text, encoding, common file-size guidance, heuristic column signals, contact/section/date context, contribution verbs, work context, outcome/validation signals, concision, placeholders, and target-term coverage. Unknown checks are excluded. Company selection changes guidance, not an invented employer score.

Terms use supported aliases and up to 20 explicit requirements. Matching distinguishes Java/JavaScript and supports C++, C#, and .NET. It is not semantic job matching or a test of proficiency, eligibility, authenticity, or actual ATS acceptance. Names, photos, age, and personal characteristics are not positive scoring signals. Do not invent metrics or achievements to improve a checklist score.

Free preflight precedes payment. Unreadable, scanned-only, oversized, unsupported-language, and still-placeholder-filled input is rejected. Limits: 5 MB, 12 PDF pages, 75,000 extracted characters, and a 20-second parser timeout. DOCX checks reject macros/embedded executables, unsafe paths, excessive expansion, and inconsistent metadata. Parsing runs in a disposable worker; document HTML is never injected. PDF column detection is heuristic. DOCX/pasted text cannot establish page count or visual layout reliably. No OCR is included.

Up to 30 reports are saved locally with their receipt, fingerprint, and timestamp, not a cloud copy of the upload. Changes to the CV or target create a new review snapshot.

## Template Attribution

`bajaj-clean` and `bajaj-editorial` adapt [Sourabh Bajaj's MIT-licensed resume format](https://github.com/sb2nov/resume), also [on Overleaf](https://www.overleaf.com/latex/templates/software-engineer-resume/gqxmqsvsbdjf), pinned to `7b70fe14876f97180034787f2a7f661597416a17`. Only formatting is retained, not the author's career history. The MIT notice is included in source and ZIP exports. Modifications: generated document body, Unicode font setup, and selected paper size. Browser PDF rendering is a reimplementation, not pixel-identical TeX output. No author or Overleaf endorsement/support is implied. Other layouts and role examples are original.

## Optional Verified Backend

The retained server implementation supports the **INR 49 template product only**, not INR 9 report entitlements. It is not used by selected browser mode. Server-backed report access needs additional product/scope enforcement. Private keys belong in encrypted secrets, never source or chat. Review provider fees and hosting costs.

1. Use a **test-mode** Razorpay key pair first. In `api/wrangler.jsonc`, set the public `RAZORPAY_KEY_ID` to the matching test key and configure `ALLOWED_ORIGINS` with the exact development origin, including its port. Use a separate Worker name for staging. Never enable test-mode checkout on the public production page.
2. Install Node.js and use Wrangler **4.36.0 or newer**. Run deployment commands from `cv-studio/api`. The `ratelimits` binding is required; choose a namespace ID unique to this application in the Cloudflare account. Anonymous order requests use a coarse per-IP/per-route limit, which can affect people sharing a network; it is not exact global accounting.
3. Set `RAZORPAY_KEY_SECRET` and `ACCESS_SIGNING_SECRET` using encrypted Cloudflare Worker secrets. Use an independently generated random signing secret with at least 32 bytes of entropy. Enter secrets directly into the local terminal or Cloudflare dashboard, never through chat. Keep a secure backup of the signing secret; changing it invalidates outstanding access receipts and order proofs.

   ```sh
   npx wrangler@4 secret put RAZORPAY_KEY_SECRET
   npx wrangler@4 secret put ACCESS_SIGNING_SECRET
   npx wrangler@4 deploy
   ```

4. For local testing, set `checkoutMode` to `verified` and `apiBase` to the Worker **origin**, without an `/api` path. Use provider test credentials. The INR 9 reviewer remains browser-mode and must not be described as verified.
5. Complete the release checks below. Configure automatic capture in Razorpay, or capture approved payments through the provider before verification; this application does not auto-capture an authorized payment. A paid-but-unverified transaction must be retried, not paid for again.
6. Review customer-facing support/refund/privacy terms and merchant readiness. Only verified mode automatically rechecks refunds. Browser mode requires merchant support and reconciliation.
7. Use a commercial host whose terms permit the service and the exact origin in `ALLOWED_ORIGINS`. Update canonical URLs and keep private credentials in Worker secrets. No external hosting migration or account creation is included here.

The committed Worker configuration uses the same public Razorpay merchant key ID as the existing website. It has no allowed origin, private credentials, or deployed API URL. This reuses the merchant account configuration, not a verified connection to an order service. The public key must match the private provider key stored on the Worker. Do not assume the previously used client-only access system for other site products authorizes CV Studio.

### Existing Website Integration

CV Studio has a main-navigation entry and a dedicated `#cv-studio` homepage section, using the website's existing theme. Its editor links back to that section. Existing paid sheets, courses, bookings, and their checkout code are unchanged.

The checked website's `initiatePayment` and course `checkoutOptions` pass the public merchant key and amount to Razorpay, then process its browser callback. Booking tracking uses the `yas_bookings` browser-storage key. No server order-creation or signature-verification endpoint is configured in those flows. If an existing service is deployed elsewhere, provide its public API base URL or source location, not private keys, so it can be connected to the payment contract below. No new Razorpay account is required.

## Verified API Contract

| Route | Behavior |
| --- | --- |
| `GET /api/config` | Reports setup readiness and the fixed product/amount/currency. |
| `POST /api/orders` | Creates a server-priced Razorpay order and a signed 24-hour order proof. |
| `POST /api/verify` | Verifies the order proof and Razorpay HMAC, then checks payment/order state directly with the provider. |
| `GET /api/access` | Validates a signed access token and rechecks capture, amount, currency, product, and refund state. |

In verified mode, `cv-studio-v1` tokens are bound to provider order/payment and rechecked online on export. Refunded amounts deny access. This does not apply to browser receipts. Keep payment references and do not pay twice merely because verification failed.

Only exact allowed origins receive CORS access. CORS is not authentication. Order/verification/access requests are rate-limited, request proof bodies are bounded, and responses are not cached. The Worker does not maintain a user database or a webhook ledger; provider availability is required for exports. Do not log authorization headers, proof bodies, or signing secrets.

## Development and Verification

No frontend build is required. Serve the repository root with a local static HTTP server and open `/cv-studio/`; ES modules and the PDF worker are not supported by opening the HTML directly as a file.

```sh
node --test tests/cv-studio.test.cjs
node --test tests/interview-prep.test.cjs tests/guides.test.cjs
node cv-studio/tools/vendor.mjs
node cv-studio/tools/build-previews.cjs
```

`vendor.mjs` pins pdfmake 0.2.20, PDF.js 4.10.38, Lucide 0.468.0, Mammoth 1.9.0, fflate 0.8.2, template format, fonts, and licenses. Hashes are recorded in `vendor/manifest.json`; `.gitattributes` preserves vendor bytes. `build-previews.cjs` uses Windows Node and WSL Python/PyMuPDF to generate 32 thumbnails and verify 59 real PDFs, including role examples, a long CV, and readiness reports. Representative ZIPs are round-tripped. Set `CV_TECTONIC` to an available compiler for optional checks of four source projects. Do not rebuild unrelated guides.

### Release Checks

- Run the CV model/export/payment tests and existing interview/guide regression tests.
- Generate real PDFs and verify selectable text, nonblank pages, expected content, pagination, and bounds.
- Test desktop and narrow mobile layouts, template switching, section changes, undo, drafts, JSON import errors, reload persistence, and corrupt-storage protection.
- Verify payment script failure never blocks the editor/preview. Browser mocks cover success, cancel, failure, missing references, isolated receipts, reload, restore, and same-report reuse.
- The owner must verify live merchant readiness and settlement. Browser callbacks cannot establish capture/refund state. Only optional backend tests cover signatures, capture, wrong amounts/products, and refund revocation.
- Test purchase receipt backup/restoration and each export; ensure CV data is absent from payment requests.
- Compile an exported `.tex` file with XeLaTeX before advertising compiler-validated source compatibility.

### References

- [Overleaf CV gallery](https://www.overleaf.com/gallery/tagged/cv) and [project download workflow](https://docs.overleaf.com/managing-projects-and-files/downloading-a-project), used for workflow research only.
- [Sourabh Bajaj's format and MIT license](https://github.com/sb2nov/resume).
- [Greenhouse parsing limitations](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse), [Microsoft hiring guidance](https://careers.microsoft.com/v2/global/en/hiring-tips), and [Amazon applications](https://www.amazon.jobs/content/en/how-we-hire/online-application).
- [Razorpay web integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/).
- [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/) and [rate-limit binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).