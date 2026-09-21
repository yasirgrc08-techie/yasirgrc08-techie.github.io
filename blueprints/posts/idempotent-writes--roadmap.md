# Idempotency for Real Writes / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

## Visual Blueprint

1. **Name the operation**: Assign a stable client operation key and scope it to the authenticated tenant and endpoint.
2. **Bind the payload**: Store a canonical request fingerprint so reusing a key for different input is rejected.
3. **Claim atomically**: Use a unique constraint or equivalent atomic claim, not a check-then-insert race.
4. **Persist the outcome**: Record the business result and retry response together wherever the storage model allows it.
5. **Handle unknown results**: Provide a status lookup or reconciliation path when a downstream side effect has an ambiguous outcome.
6. **Bound retention**: Choose key retention from the retry and business contract, and document what happens after expiry.

## Caption

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

1. Name the operation
Assign a stable client operation key and scope it to the authenticated tenant and endpoint.

2. Bind the payload
Store a canonical request fingerprint so reusing a key for different input is rejected.

3. Claim atomically
Use a unique constraint or equivalent atomic claim, not a check-then-insert race.

4. Persist the outcome
Record the business result and retry response together wherever the storage model allows it.

5. Handle unknown results
Provide a status lookup or reconciliation path when a downstream side effect has an ambiguous outcome.

6. Bound retention
Choose key retention from the retry and business contract, and document what happens after expiry.

The takeaway: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #idempotency #payments

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A timeout does not tell you whether the payment or reservation happened.

- **0:05-0:11** / Reveal step 1: Name the operation
  Narration: Assign a stable client operation key and scope it to the authenticated tenant and endpoint.

- **0:11-0:17** / Reveal step 2: Bind the payload
  Narration: Store a canonical request fingerprint so reusing a key for different input is rejected.

- **0:17-0:22** / Reveal step 3: Claim atomically
  Narration: Use a unique constraint or equivalent atomic claim, not a check-then-insert race.

- **0:22-0:28** / Reveal step 4: Persist the outcome
  Narration: Record the business result and retry response together wherever the storage model allows it.

- **0:28-0:35** / Reveal step 5: Handle unknown results
  Narration: Provide a status lookup or reconciliation path when a downstream side effect has an ambiguous outcome.

- **0:35-0:41** / Reveal step 6: Bound retention
  Narration: Choose key retention from the retry and business contract, and document what happens after expiry.

- **0:41-0:51** / Takeaway and discussion prompt
  Narration: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone. Which bottleneck would you measure first?

## References

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
