# Consumers Must Survive Redelivery / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

## Visual Blueprint

1. **Choose event identity**: Use a stable producer identity scoped to the business consumer.
2. **Claim with the effect**: Store deduplication state with the business change when they share a transactional database.
3. **Acknowledge after durable work**: Avoid acknowledging before the required state is committed.
4. **Handle external effects**: Use provider idempotency or reconciliation for effects outside the local transaction.
5. **Plan retention**: Keep deduplication history long enough for the supported replay window.
6. **Test both crash sides**: Crash before commit and after commit but before acknowledgement.

## Caption

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

1. Choose event identity
Use a stable producer identity scoped to the business consumer.

2. Claim with the effect
Store deduplication state with the business change when they share a transactional database.

3. Acknowledge after durable work
Avoid acknowledging before the required state is committed.

4. Handle external effects
Use provider idempotency or reconciliation for effects outside the local transaction.

5. Plan retention
Keep deduplication history long enough for the supported replay window.

6. Test both crash sides
Crash before commit and after commit but before acknowledgement.

The takeaway: Deduplicate at the business-effect boundary, not merely at message receipt.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #consumers #idempotency

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Acknowledging a message and committing a business effect are separate failure boundaries.

- **0:05-0:09** / Reveal step 1: Choose event identity
  Narration: Use a stable producer identity scoped to the business consumer.

- **0:09-0:15** / Reveal step 2: Claim with the effect
  Narration: Store deduplication state with the business change when they share a transactional database.

- **0:15-0:19** / Reveal step 3: Acknowledge after durable work
  Narration: Avoid acknowledging before the required state is committed.

- **0:19-0:24** / Reveal step 4: Handle external effects
  Narration: Use provider idempotency or reconciliation for effects outside the local transaction.

- **0:24-0:28** / Reveal step 5: Plan retention
  Narration: Keep deduplication history long enough for the supported replay window.

- **0:28-0:32** / Reveal step 6: Test both crash sides
  Narration: Crash before commit and after commit but before acknowledgement.

- **0:32-0:39** / Takeaway and discussion prompt
  Narration: Deduplicate at the business-effect boundary, not merely at message receipt. Which bottleneck would you measure first?

## References

- [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
