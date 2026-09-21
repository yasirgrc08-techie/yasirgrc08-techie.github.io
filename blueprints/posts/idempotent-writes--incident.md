# Idempotency for Real Writes / Failure and Recovery

By Yasir Sharfi

## The Idea

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

## Visual Blueprint

1. **Notice duplicate effects**: Two logical orders appear after the client retried a request whose response was lost.
2. **Compare identities**: Check whether the retry reused the original key, tenant scope, and request fingerprint.
3. **Stop blind retries**: Pause automatic replay of ambiguous writes while preserving operation records.
4. **Reconcile externally**: Check the authoritative provider or database before attempting another side effect.
5. **Repair atomically**: Add a durable claim and stored result, including payload-conflict behavior.
6. **Test response loss**: Drop the response after commit and confirm the retry returns the original logical outcome.

## Caption

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

1. Notice duplicate effects
Two logical orders appear after the client retried a request whose response was lost.

2. Compare identities
Check whether the retry reused the original key, tenant scope, and request fingerprint.

3. Stop blind retries
Pause automatic replay of ambiguous writes while preserving operation records.

4. Reconcile externally
Check the authoritative provider or database before attempting another side effect.

5. Repair atomically
Add a durable claim and stored result, including payload-conflict behavior.

6. Test response loss
Drop the response after commit and confirm the retry returns the original logical outcome.

The takeaway: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #idempotency #payments

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A timeout does not tell you whether the payment or reservation happened.

- **0:05-0:11** / Reveal step 1: Notice duplicate effects
  Narration: Two logical orders appear after the client retried a request whose response was lost.

- **0:11-0:17** / Reveal step 2: Compare identities
  Narration: Check whether the retry reused the original key, tenant scope, and request fingerprint.

- **0:17-0:21** / Reveal step 3: Stop blind retries
  Narration: Pause automatic replay of ambiguous writes while preserving operation records.

- **0:21-0:26** / Reveal step 4: Reconcile externally
  Narration: Check the authoritative provider or database before attempting another side effect.

- **0:26-0:30** / Reveal step 5: Repair atomically
  Narration: Add a durable claim and stored result, including payload-conflict behavior.

- **0:30-0:36** / Reveal step 6: Test response loss
  Narration: Drop the response after commit and confirm the retry returns the original logical outcome.

- **0:36-0:46** / Takeaway and discussion prompt
  Narration: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone. What evidence would disprove your first diagnosis?

## References

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
