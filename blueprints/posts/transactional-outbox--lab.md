# The Transactional Outbox / Build and Validate

By Yasir Sharfi

## The Idea

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

## Visual Blueprint

1. **Create one transaction**: Write an order change and outbox row atomically in a local database.
2. **Crash before commit**: Verify that neither the order change nor its event becomes visible.
3. **Crash after publish**: Stop the relay before it marks the outbox row as delivered.
4. **Restart the relay**: Observe duplicate delivery with the same event identity.
5. **Deduplicate the consumer**: Apply the event through a durable consumer identity check.
6. **Verify the final state**: Assert one business effect and eventual projection convergence after recovery.

## Caption

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

1. Create one transaction
Write an order change and outbox row atomically in a local database.

2. Crash before commit
Verify that neither the order change nor its event becomes visible.

3. Crash after publish
Stop the relay before it marks the outbox row as delivered.

4. Restart the relay
Observe duplicate delivery with the same event identity.

5. Deduplicate the consumer
Apply the event through a durable consumer identity check.

6. Verify the final state
Assert one business effect and eventual projection convergence after recovery.

The takeaway: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #outbox #events

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Updating a row and publishing an event are not one atomic operation by default.

- **0:06-0:11** / Reveal step 1: Create one transaction
  Narration: Write an order change and outbox row atomically in a local database.

- **0:11-0:16** / Reveal step 2: Crash before commit
  Narration: Verify that neither the order change nor its event becomes visible.

- **0:16-0:21** / Reveal step 3: Crash after publish
  Narration: Stop the relay before it marks the outbox row as delivered.

- **0:21-0:25** / Reveal step 4: Restart the relay
  Narration: Observe duplicate delivery with the same event identity.

- **0:25-0:29** / Reveal step 5: Deduplicate the consumer
  Narration: Apply the event through a durable consumer identity check.

- **0:29-0:33** / Reveal step 6: Verify the final state
  Narration: Assert one business effect and eventual projection convergence after recovery.

- **0:33-0:42** / Takeaway and discussion prompt
  Narration: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once. How would you reproduce this with synthetic data?

## References

- [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
