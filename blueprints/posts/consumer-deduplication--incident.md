# Consumers Must Survive Redelivery / Failure and Recovery

By Yasir Sharfi

## The Idea

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

## Visual Blueprint

1. **Notice duplicate side effects**: One event triggers repeated emails, charges, or counter increments.
2. **Compare delivery and operation IDs**: Check whether retries changed the logical identity.
3. **Stop irreversible replay**: Pause the affected effect while retaining the event stream.
4. **Reconcile authoritative outcomes**: Determine which external actions actually completed.
5. **Repair the atomic boundary**: Bind deduplication to the business mutation or provider operation key.
6. **Replay crash scenarios**: Verify that commit-before-ack redelivery returns the existing result safely.

## Caption

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

1. Notice duplicate side effects
One event triggers repeated emails, charges, or counter increments.

2. Compare delivery and operation IDs
Check whether retries changed the logical identity.

3. Stop irreversible replay
Pause the affected effect while retaining the event stream.

4. Reconcile authoritative outcomes
Determine which external actions actually completed.

5. Repair the atomic boundary
Bind deduplication to the business mutation or provider operation key.

6. Replay crash scenarios
Verify that commit-before-ack redelivery returns the existing result safely.

The takeaway: Deduplicate at the business-effect boundary, not merely at message receipt.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #consumers #idempotency

## Reel Storyboard

Suggested duration: about 34 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Acknowledging a message and committing a business effect are separate failure boundaries.

- **0:05-0:09** / Reveal step 1: Notice duplicate side effects
  Narration: One event triggers repeated emails, charges, or counter increments.

- **0:09-0:12** / Reveal step 2: Compare delivery and operation IDs
  Narration: Check whether retries changed the logical identity.

- **0:12-0:16** / Reveal step 3: Stop irreversible replay
  Narration: Pause the affected effect while retaining the event stream.

- **0:16-0:19** / Reveal step 4: Reconcile authoritative outcomes
  Narration: Determine which external actions actually completed.

- **0:19-0:23** / Reveal step 5: Repair the atomic boundary
  Narration: Bind deduplication to the business mutation or provider operation key.

- **0:23-0:27** / Reveal step 6: Replay crash scenarios
  Narration: Verify that commit-before-ack redelivery returns the existing result safely.

- **0:27-0:34** / Takeaway and discussion prompt
  Narration: Deduplicate at the business-effect boundary, not merely at message receipt. What evidence would disprove your first diagnosis?

## References

- [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
