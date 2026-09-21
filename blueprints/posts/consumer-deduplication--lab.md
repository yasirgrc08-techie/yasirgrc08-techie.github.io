# Consumers Must Survive Redelivery / Build and Validate

By Yasir Sharfi

## The Idea

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

## Visual Blueprint

1. **Build a local consumer**: Apply a synthetic event to a database-backed business record.
2. **Deliver it concurrently**: Race two workers with the same event identity.
3. **Crash before commit**: Verify that replay can safely complete the missing work.
4. **Crash after commit**: Lose the acknowledgement and confirm redelivery does not repeat the effect.
5. **Change the payload**: Reject conflicting content under the same event identity.
6. **Test old replay**: Exercise events near the deduplication-retention boundary.

## Caption

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

1. Build a local consumer
Apply a synthetic event to a database-backed business record.

2. Deliver it concurrently
Race two workers with the same event identity.

3. Crash before commit
Verify that replay can safely complete the missing work.

4. Crash after commit
Lose the acknowledgement and confirm redelivery does not repeat the effect.

5. Change the payload
Reject conflicting content under the same event identity.

6. Test old replay
Exercise events near the deduplication-retention boundary.

The takeaway: Deduplicate at the business-effect boundary, not merely at message receipt.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #consumers #idempotency

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Acknowledging a message and committing a business effect are separate failure boundaries.

- **0:05-0:09** / Reveal step 1: Build a local consumer
  Narration: Apply a synthetic event to a database-backed business record.

- **0:09-0:13** / Reveal step 2: Deliver it concurrently
  Narration: Race two workers with the same event identity.

- **0:13-0:17** / Reveal step 3: Crash before commit
  Narration: Verify that replay can safely complete the missing work.

- **0:17-0:22** / Reveal step 4: Crash after commit
  Narration: Lose the acknowledgement and confirm redelivery does not repeat the effect.

- **0:22-0:26** / Reveal step 5: Change the payload
  Narration: Reject conflicting content under the same event identity.

- **0:26-0:29** / Reveal step 6: Test old replay
  Narration: Exercise events near the deduplication-retention boundary.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: Deduplicate at the business-effect boundary, not merely at message receipt. How would you reproduce this with synthetic data?

## References

- [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
