# Website Support Assistant

The Help button is present on the portfolio, CV Studio, guide library, and the four paid sheet/course pages. It is additive: it does not replace CV Tools, booking controls, payment flows, or existing content.

## Working Now

The default is **Local site guide**, not a remotely connected generative model. It runs without an AI key or account and uses curated public facts in `assets/site-assistant-core.js`.

- Site-focused questions about CV templates, readiness reviews, courses, sheets, free guides, mentoring, website services, payments, and local access.
- Multi-step CV selection with role and style. The resulting blank template opens for user confirmation; existing drafts are not replaced.
- CV actions for sections, content checks, drafts, JSON backup, optional current-CV review, and the export dialog. Actions require a click and honor the editor's unapplied-edit/dialog/busy guards. No action starts a payment, changes a purchase record, or invents CV details.
- Suggested 30/60/90-day preparation plans using the site's resources, with a free-only path and downloadable text plans.
- A website-project brief with requested scope and timeline, a local download, and links to the actual service/contact sections. It does not promise a price, delivery date, deployment, or booking.
- Contextual page help, tab-local conversation, clear chat, keyboard navigation, mobile layout, and human support contact.

The assistant cannot create a cloud account, verify/refund payments, access private employer ATS rules, deploy websites, submit referrals, book appointments, or bypass paid content. Answers contain fixed current prices and boundaries, not scraped or inferred private data. Update the core knowledge and tests when offerings change.

## Privacy and State

Default questions stay in the browser. Up to 24 short questions are retained in `sessionStorage` under `yasir-site-assistant-tab-v1` for continuity across this tab's pages. Clear chat removes them; the helper never reads CV content, uploaded resumes, local purchase receipts, or booking records for conversational context. A manually selected CV-review or backup action runs through CV Studio locally, not an AI endpoint.

Do not put passwords, card numbers, OTPs, private receipts, or API keys in chat. Obvious credential patterns are not retained or forwarded, but this detector is not a guarantee; users should not enter sensitive information. Website briefs and plans can contain text the user intentionally supplied. Keep downloaded files private when appropriate. Chat history is not encrypted; scripts on the same origin can access that origin's storage.

## Optional AI-Assisted Matching

An optional Cloudflare Workers AI router is supplied in `support/api/`. It is **not deployed or connected**. `assets/site-assistant-config.js` intentionally has an empty `aiBase`. There is no pretend API response, embedded secret, free third-party proxy, or model download.

When the owner configures a backend, the panel offers an opt-in **AI-assisted understanding** checkbox. Only the next support question and previous topic id are sent. CV contents, page HTML, payment records, full history, and uploaded files are not attached. The provider will process that question; review its current privacy terms, quotas, and costs before enabling it.

The model only classifies an otherwise unmatched question into a known topic. Its raw text, URLs, prices, code, and action suggestions are never shown or executed. The client renders the curated site's answer and allowlisted buttons for the selected topic. Guided flows and known questions remain deterministic. This intentionally trades open-ended generation for site-only, predictable support; a model can still misclassify an ambiguous question.

### Activation

1. Review Cloudflare Workers AI availability, model licensing, charges, and privacy terms. Configure account usage limits. No account, paid hosting, or billable inference was created during development.
2. From `support/api`, use a supported Wrangler 4 version and authenticate directly in the terminal or Cloudflare dashboard. Do not share account tokens in chat or commit credentials.
3. Set `ALLOWED_ORIGINS` to the exact frontend origin(s); use a separate staging Worker and localhost origin for development. Choose a unique rate-limit namespace within the account. The per-IP limit is coarse and per Cloudflare location, not a guaranteed global spending cap or authentication system.
4. Deploy the Worker with its `AI` binding and rate limiter. The current model id is `@cf/meta/llama-3.1-8b-instruct`; confirm its continued availability before deployment. The Worker bounds input to 4 KB/1,200 characters, output tokens, and response time, and returns no raw model output.
5. Verify readiness with `GET /api/config` and test `POST /api/assist` using the allowed Origin. Test out-of-scope questions, sensitive input, rate limits, provider failure, and unexpected model output. Mock tests are not evidence of a deployed provider connection.
6. Set `aiBase` in `assets/site-assistant-config.js` to the deployed HTTPS origin, with no path/query/credentials. This is a public API URL, not a key. The help widget still works locally during outages or without opt-in.

The optional router is a public anonymous endpoint and could be abused despite CORS and coarse rate limits. Do not enable it without account-level spending controls and appropriate monitoring. A frontend timeout does not guarantee cancellation of billable provider inference. Do not log question bodies or secrets. The website's previously documented commercial-hosting restrictions remain unchanged.

## Verification

```sh
node --test tests/site-assistant.test.cjs
node --test tests/cv-studio.test.cjs tests/interview-prep.test.cjs tests/guides.test.cjs
```

Browser checks should cover all seven pages, mobile/desktop panel bounds, guided template selection, draft preservation, unapplied-source guards, downloads, tab continuity, corrupt history, clear chat, off-site requests, and AI outage fallback. Existing payment and locked-content behavior must remain unchanged. No real payment or billable AI call is needed for these tests.

## References

- [Cloudflare Workers AI bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/)
- [Cloudflare Worker rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- The live site offerings and the CV Studio documentation are the assistant's factual scope.