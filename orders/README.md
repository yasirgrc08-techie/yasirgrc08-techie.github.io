# Cumulative Order History

## Current Deployment Status

The website records each successful browser checkout under its payment reference and never offers a clear/delete action or automatic expiry. Sessions, paid sheets, courses, CV access, and ATS reviews all feed this history. Existing booking, digital-product, and course receipts are copied into the ledger without modifying their original storage.

**The shared backend is not deployed or connected.** No hosting credentials or webhook secret were available during this update. Until setup below is completed, the badge deliberately says **This device only**, not a fabricated site-wide total. Browser data can still be removed by the user, browser policy, storage failure, or switching devices. History backup/restore is additive and never replaces other orders.

## Shared Verified Counter

The Cloudflare Worker and D1 database in `api/` count signed Razorpay `payment.captured` webhooks. It is separate from the existing browser checkout and does not change prices, grant access, or claim to turn local purchase receipts into a secure paywall.

- Each provider order ID, or payment ID when no order ID exists, is counted once. Duplicate deliveries and callbacks cannot add another count.
- Payments must be captured, use INR, and contain the site's `site_id` and `product_id` notes. Every current checkout supplies these notes.
- Failed, authorized-only, unrelated, and unsigned events add nothing. Refund events do not reduce the lifetime order count; this is not an active-bookings or net-revenue metric.
- No API deletes or updates orders. Database triggers also reject row updates and deletion. No automatic cleanup is configured.
- Public responses expose only the total and latest recording time. No names, email addresses, phone numbers, CVs, job descriptions, or raw webhook payloads are stored.
- Payment metadata is supplied by the checkout. A verified capture confirms money was captured, not that a browser-enforced product entitlement is secure.
- The browser refreshes the shared total every 30 seconds while visible and after a purchase or returning to the tab. Webhook delivery is asynchronous; the UI does not invent an optimistic global increment.

## Owner Setup

Use the account that owns this website's payment integration. Enter all secrets directly into Cloudflare/Razorpay settings or a secure terminal prompt, never into chat or committed files. Choose the intended Cloudflare plan and spending limits before deployment; no hosting subscription was created by this change.

From `orders/api/`, with Node.js available:

```sh
npx wrangler@4 login
npx wrangler@4 d1 create yasir-portfolio-orders
```

Replace only `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc` with the returned non-secret database ID. Then run:

```sh
npx wrangler@4 d1 execute yasir-portfolio-orders --remote --file schema.sql
npx wrangler@4 secret put WEBHOOK_SECRET
npx wrangler@4 deploy
```

Use a strong webhook secret of at least 24 characters. In Razorpay's **live-mode** dashboard, register the deployed HTTPS URL ending in `/api/orders/webhook`, select `payment.captured`, and use that same secret. Do not send test-mode payments into the live ledger. `WEBHOOK_SECRET_PREVIOUS` can temporarily verify queued deliveries during an intentional secret rotation; remove it after the retry window.

Set `apiBase` in `assets/order-config.js` to the Worker HTTPS origin, without a path or secrets. Deploy that configuration to GitHub Pages. The badge switches to **Site-wide verified** only when that endpoint is configured; a missing response shows an unavailable total rather than a fake zero.

Validate one real authorized transaction in the merchant dashboard, confirm its webhook delivery, then confirm the shared total from a second browser. Do not generate real charges solely for automated testing. Automated tests use synthetic signed events and an in-memory SQLite database.

Configure provider delivery alerts, Cloudflare request limits, and periodic D1 exports/backup recovery. Append-only application behavior cannot prevent an account owner from deleting the database or losing the hosting account.

## Historical Orders

The server begins with events delivered after connection. Previously deleted browser bookings, old sheet unlock flags without payment IDs, and purchases from other visitors cannot be reconstructed from this static website. Reconcile any desired historical starting data against a merchant-authorized provider export and import verified unique records into D1. Never invent an opening counter or upload local browser claims as verified payments.

## Verification

```sh
node --test tests/orders.test.cjs
```

Run from the repository root with Node 22.13 or later. Tests cover original-record preservation, per-payment deduplication, concurrent tab-safe storage keys, all checkout integrations, signature verification, replay handling, append-only SQL constraints, and read-only public totals.