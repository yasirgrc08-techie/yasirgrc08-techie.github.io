# CV Studio

An independent, browser-based engineering CV editor at `/cv-studio/`, inspired by the template/editor/preview workflow of Overleaf. The layouts and fictional examples are original; this is not an Overleaf clone or an employer-endorsed service.

## Launch Status

The frontend is a launch preview. `config.js` intentionally contains an empty `apiBase`, so it cannot collect a payment or unlock the supported PDF/LaTeX export controls. Editing, watermarked PDF preview, local drafts, and JSON backups work without payment.

The intended price is **INR 49 once**, for all layouts and supported PDF/LaTeX exports, not INR 49 per template. The Worker fixes the amount to **4900 paise / INR**. The existing paid sheets, courses, mentoring sessions, and free PDF guides are separate and unchanged.

**Hosting constraint:** [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) prohibit using Pages for a site primarily offering commercial SaaS or facilitating commercial transactions. Keep this GitHub Pages route as a non-paying project preview. The repository can remain on personal GitHub, but deploy the commercial frontend and payment Worker to a host whose terms permit the intended service before enabling checkout. Cloudflare Pages/Workers is one option to evaluate; no external account or paid hosting has been provisioned. Do not enable the paid CV service on the current GitHub Pages route.

## Included

- 16 original layouts: 13 single-column and 3 two-column variations.
- 12 fictional starting examples: graduate, backend, frontend, full-stack, mobile, platform/SRE, data, ML, security, systems, technical lead, and research.
- Editorial preparation guidance for Microsoft, Google, Amazon, Meta, Apple, Netflix, NVIDIA, and general big-tech roles. No screening, interview, or offer guarantees.
- Contact details, editable/reorderable sections and entries, section visibility, and undo/redo.
- A4/US Letter, two font families, six accents, spacing, margins, body size, and page numbering.
- Actual PDF rendering and pagination, a plain-text view, JSON source editing, and content checks.
- Up to 10 local drafts, JSON import/export, and protection against corrupt storage and competing browser tabs.
- Server-verified purchase access, pending-verification retry, and private access-receipt backup/restoration.

There are no cloud accounts, shared drafts, simultaneous collaboration, AI resume generation, or online LaTeX compilation. Source mode edits the structured CV JSON. LaTeX export produces a portable single-column XeLaTeX document; it does not reproduce every two-column PDF design. Select **XeLaTeX** when importing that source into Overleaf. A local TeX compiler was not available during development, so source escaping is tested but a real LaTeX compilation remains a release check.

The embedded fonts cover many Latin-script names and text, not every writing system. Verify glyphs and extracted text for the language you use. Two-column reading order varies across parsers; a simple single-column layout is the conservative choice when the employer does not specify a format. Replace all fictional details and use only claims you can substantiate.

## Privacy and Access Limits

CV contents, job-description text, PDF generation, and draft storage stay in the browser. They are not sent to the payment Worker or an AI service. Drafts are not encrypted, and any script on the same site origin can access that origin's browser storage. Shared devices and other applications on this GitHub Pages origin should be treated accordingly. Browser storage is not a durable backup.

The page requests interface fonts from Google Fonts; GitHub Pages and font hosts receive ordinary web requests. PDF fonts, rendering engines, template previews, and icons are local assets. Razorpay's checkout script is loaded only when an enabled purchase is started. Payment information entered into checkout is handled by Razorpay.

A CV JSON backup contains personal CV data. An **access receipt** contains a bearer purchase credential, not CV data. Do not publish either file. An access receipt can restore the purchase on another browser only after server verification. If browser storage and the receipt are both lost, contact support with the payment reference. Automated email/account recovery is not implemented.

**This is not DRM or an unbypassable paywall.** The document model, renderer, preview bytes, and source code are shipped to the browser. A determined user can bypass frontend controls or reproduce a document. Server verification prevents a fabricated payment from being accepted by the supported checkout flow; it cannot make a client-owned renderer secret. Stronger export enforcement would require a separately authorized server-rendering design and a revised privacy model.

## Activate Verified Checkout

Activation requires the owner's Razorpay account, Cloudflare account, and private credentials. No private keys belong in GitHub, `config.js`, browser code, issue comments, or chat. Review hosting limits/charges and payment-provider fees before deployment.

1. Use a **test-mode** Razorpay key pair first. In `api/wrangler.jsonc`, set the public `RAZORPAY_KEY_ID` to the matching test key and configure `ALLOWED_ORIGINS` with the exact development origin, including its port. Use a separate Worker name for staging. Never enable test-mode checkout on the public production page.
2. Install Node.js and use Wrangler **4.36.0 or newer**. Run deployment commands from `cv-studio/api`. The `ratelimits` binding is required; choose a namespace ID unique to this application in the Cloudflare account. Anonymous order requests use a coarse per-IP/per-route limit, which can affect people sharing a network; it is not exact global accounting.
3. Set `RAZORPAY_KEY_SECRET` and `ACCESS_SIGNING_SECRET` using encrypted Cloudflare Worker secrets. Use an independently generated random signing secret with at least 32 bytes of entropy. Enter secrets directly into the local terminal or Cloudflare dashboard, never through chat. Keep a secure backup of the signing secret; changing it invalidates outstanding access receipts and order proofs.

   ```sh
   npx wrangler@4 secret put RAZORPAY_KEY_SECRET
   npx wrangler@4 secret put ACCESS_SIGNING_SECRET
   npx wrangler@4 deploy
   ```

4. For a local test of the frontend, set `apiBase` in a local, unpublished copy of `config.js` to the deployed Worker **origin**, such as `https://your-staging-worker.your-subdomain.workers.dev`, with no `/api` path. Serve the site over localhost HTTP. Use provider-documented test payment methods only.
5. Complete the release checks below. Configure automatic capture in Razorpay, or capture approved payments through the provider before verification; this application does not auto-capture an authorized payment. A paid-but-unverified transaction must be retried, not paid for again.
6. Review and publish your customer-facing support, refund, privacy, and access terms before accepting live payments. Confirm merchant/KYC readiness and an operational recovery/refund process. The editor does not initiate refunds; refunds performed in Razorpay revoke access on the next verification.
7. Deploy the frontend on an approved commercial host, still using this GitHub repository as its source. Update its canonical/Open Graph URL to the production domain and verify its navigation links. Deploy a production Worker with the matching live key pair and set `ALLOWED_ORIGINS` to the exact commercial frontend origin. Set that frontend's `apiBase` to the Worker origin only after successful staging checks. Keep the GitHub Pages preview's `apiBase` empty, using a separate deployment configuration for the commercial host. Update the portfolio entry to link to the commercial URL only after live checkout has actually been verified.

The committed Worker configuration has no allowed origin or Razorpay key ID. A public key ID is not a private secret, but it must match the private provider key stored on the Worker. Do not assume the previously used client-only access system for other site products authorizes CV Studio.

## Payment Contract

| Route | Behavior |
| --- | --- |
| `GET /api/config` | Reports setup readiness and the fixed product/amount/currency. |
| `POST /api/orders` | Creates a server-priced Razorpay order and a signed 24-hour order proof. |
| `POST /api/verify` | Verifies the order proof and Razorpay HMAC, then checks payment/order state directly with the provider. |
| `GET /api/access` | Validates a signed access token and rechecks capture, amount, currency, product, and refund state. |

The product ID is `cv-studio-v1`. An access token is bound to the order/payment and does not expire by time alone; every supported export and receipt restoration revalidates it online. Any refunded amount denies access. Provider errors deny authorization. An expired pending order proof requires support investigation; keep the payment ID and do not charge the customer again merely because proof verification failed.

Only exact allowed origins receive CORS access. CORS is not authentication. Order/verification/access requests are rate-limited, request proof bodies are bounded, and responses are not cached. The Worker does not maintain a user database or a webhook ledger; provider availability is required for exports. Do not log authorization headers, proof bodies, or signing secrets.

## Development and Verification

No frontend build is required. Serve the repository root with a local static HTTP server and open `/cv-studio/`; ES modules and the PDF worker are not supported by opening the HTML directly as a file.

```sh
node --test tests/cv-studio.test.cjs
node --test tests/interview-prep.test.cjs tests/guides.test.cjs
node cv-studio/tools/vendor.mjs
node cv-studio/tools/build-previews.cjs
```

`vendor.mjs` is only needed when intentionally refreshing dependencies. It downloads pinned pdfmake 0.2.20, PDF.js 4.10.38, Lucide 0.468.0, font files, and their licenses, and records source URLs and hashes in `vendor/manifest.json`. `build-previews.cjs` uses Windows Node plus WSL Python/PyMuPDF to generate 16 preview images and verify 29 real PDFs, including all role starters and a four-page long CV. Do not rebuild the unrelated guide PDFs for a CV-only change.

### Release Checks

- Run the CV model/export/payment tests and existing interview/guide regression tests.
- Generate real PDFs and verify selectable text, nonblank pages, expected content, pagination, and bounds.
- Test desktop and narrow mobile layouts, template switching, section changes, undo, drafts, JSON import errors, reload persistence, and corrupt-storage protection.
- Verify payment unavailability never blocks editing/PDF preview and never enables a purchase.
- In Razorpay test mode, verify success, cancel, failure, authorized-but-uncaptured status, wrong product/amount, bad signatures, pending retry, and refund revocation. Backend mocks and browser simulations are not a substitute for this provider test.
- Test purchase receipt backup/restoration and each export; ensure CV data is absent from payment requests.
- Compile an exported `.tex` file with XeLaTeX before advertising compiler-validated source compatibility.

### References

- [Overleaf CV gallery](https://www.overleaf.com/gallery/tagged/cv) and [project download workflow](https://docs.overleaf.com/managing-projects-and-files/downloading-a-project), used for workflow research only.
- [Razorpay web integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/).
- [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/) and [rate-limit binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).