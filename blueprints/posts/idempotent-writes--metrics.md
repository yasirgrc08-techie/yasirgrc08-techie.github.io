# Idempotency for Real Writes / Metrics That Matter

By Yasir Sharfi

## The Idea

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

## Visual Blueprint

1. **Replay rate**: Count repeated operation keys and distinguish successful replays from payload conflicts.
2. **Interpret / Replay rate**: A high replay rate can expose client timeouts even when business operations complete correctly.
3. **Pending age**: Measure the age of operations that remain in an unknown or in-progress state.
4. **Interpret / Pending age**: Do not delete old pending records automatically if doing so permits duplicate irreversible work.
5. **Duplicate effects**: Reconcile unique logical operations against authoritative business effects in synthetic audits.
6. **Interpret / Duplicate effects**: Transport delivery counts are not the same as business-operation counts.

## Caption

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

1. Replay rate
Count repeated operation keys and distinguish successful replays from payload conflicts.

2. Interpret / Replay rate
A high replay rate can expose client timeouts even when business operations complete correctly.

3. Pending age
Measure the age of operations that remain in an unknown or in-progress state.

4. Interpret / Pending age
Do not delete old pending records automatically if doing so permits duplicate irreversible work.

5. Duplicate effects
Reconcile unique logical operations against authoritative business effects in synthetic audits.

6. Interpret / Duplicate effects
Transport delivery counts are not the same as business-operation counts.

The takeaway: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #idempotency #payments

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A timeout does not tell you whether the payment or reservation happened.

- **0:05-0:10** / Reveal step 1: Replay rate
  Narration: Count repeated operation keys and distinguish successful replays from payload conflicts.

- **0:10-0:16** / Reveal step 2: Interpret / Replay rate
  Narration: A high replay rate can expose client timeouts even when business operations complete correctly.

- **0:16-0:22** / Reveal step 3: Pending age
  Narration: Measure the age of operations that remain in an unknown or in-progress state.

- **0:22-0:28** / Reveal step 4: Interpret / Pending age
  Narration: Do not delete old pending records automatically if doing so permits duplicate irreversible work.

- **0:28-0:33** / Reveal step 5: Duplicate effects
  Narration: Reconcile unique logical operations against authoritative business effects in synthetic audits.

- **0:33-0:37** / Reveal step 6: Interpret / Duplicate effects
  Narration: Transport delivery counts are not the same as business-operation counts.

- **0:37-0:47** / Takeaway and discussion prompt
  Narration: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone. Which metric could look healthy while users suffer?

## References

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
