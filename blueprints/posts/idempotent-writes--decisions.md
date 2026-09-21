# Idempotency for Real Writes / Decision Guide

By Yasir Sharfi

## The Idea

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

## Visual Blueprint

1. **Database-backed key**: Use a durable database record when the operation changes relational business state.
2. **Trade-off / Database-backed key**: The record and business update need consistent transactions and a plan for stuck in-progress entries.
3. **Provider operation key**: Use the downstream provider's idempotency contract when it owns the irreversible side effect.
4. **Trade-off / Provider operation key**: Provider retention and payload rules may differ from your API, so map their limits explicitly.
5. **Reconciliation workflow**: Use reconciliation when an external system cannot join your transaction or return a definite result.
6. **Trade-off / Reconciliation workflow**: Recovery can take time; expose pending status rather than claiming immediate exactly-once completion.

## Caption

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

1. Database-backed key
Use a durable database record when the operation changes relational business state.

2. Trade-off / Database-backed key
The record and business update need consistent transactions and a plan for stuck in-progress entries.

3. Provider operation key
Use the downstream provider's idempotency contract when it owns the irreversible side effect.

4. Trade-off / Provider operation key
Provider retention and payload rules may differ from your API, so map their limits explicitly.

5. Reconciliation workflow
Use reconciliation when an external system cannot join your transaction or return a definite result.

6. Trade-off / Reconciliation workflow
Recovery can take time; expose pending status rather than claiming immediate exactly-once completion.

The takeaway: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #idempotency #payments

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A timeout does not tell you whether the payment or reservation happened.

- **0:05-0:10** / Reveal step 1: Database-backed key
  Narration: Use a durable database record when the operation changes relational business state.

- **0:10-0:16** / Reveal step 2: Trade-off / Database-backed key
  Narration: The record and business update need consistent transactions and a plan for stuck in-progress entries.

- **0:16-0:22** / Reveal step 3: Provider operation key
  Narration: Use the downstream provider's idempotency contract when it owns the irreversible side effect.

- **0:22-0:28** / Reveal step 4: Trade-off / Provider operation key
  Narration: Provider retention and payload rules may differ from your API, so map their limits explicitly.

- **0:28-0:34** / Reveal step 5: Reconciliation workflow
  Narration: Use reconciliation when an external system cannot join your transaction or return a definite result.

- **0:34-0:40** / Reveal step 6: Trade-off / Reconciliation workflow
  Narration: Recovery can take time; expose pending status rather than claiming immediate exactly-once completion.

- **0:40-0:50** / Takeaway and discussion prompt
  Narration: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone. Which constraint would change your choice?

## References

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
