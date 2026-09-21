# The Transactional Outbox / Decision Guide

By Yasir Sharfi

## The Idea

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

## Visual Blueprint

1. **Polling relay**: Use polling for a straightforward outbox with predictable volume and acceptable delay.
2. **Trade-off / Polling relay**: Polling adds database work and needs careful claims, batching, and retry behavior.
3. **Change-data capture**: Use a supported CDC pipeline when change-log integration fits the operational environment.
4. **Trade-off / Change-data capture**: Connector offsets, schema evolution, retention, and recovery become critical dependencies.
5. **Direct dual write**: Use separate writes only when missing notifications are acceptable or independently reconciled.
6. **Trade-off / Direct dual write**: A crash between the writes can leave state and events inconsistent.

## Caption

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

1. Polling relay
Use polling for a straightforward outbox with predictable volume and acceptable delay.

2. Trade-off / Polling relay
Polling adds database work and needs careful claims, batching, and retry behavior.

3. Change-data capture
Use a supported CDC pipeline when change-log integration fits the operational environment.

4. Trade-off / Change-data capture
Connector offsets, schema evolution, retention, and recovery become critical dependencies.

5. Direct dual write
Use separate writes only when missing notifications are acceptable or independently reconciled.

6. Trade-off / Direct dual write
A crash between the writes can leave state and events inconsistent.

The takeaway: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #outbox #events

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Updating a row and publishing an event are not one atomic operation by default.

- **0:06-0:11** / Reveal step 1: Polling relay
  Narration: Use polling for a straightforward outbox with predictable volume and acceptable delay.

- **0:11-0:16** / Reveal step 2: Trade-off / Polling relay
  Narration: Polling adds database work and needs careful claims, batching, and retry behavior.

- **0:16-0:21** / Reveal step 3: Change-data capture
  Narration: Use a supported CDC pipeline when change-log integration fits the operational environment.

- **0:21-0:25** / Reveal step 4: Trade-off / Change-data capture
  Narration: Connector offsets, schema evolution, retention, and recovery become critical dependencies.

- **0:25-0:30** / Reveal step 5: Direct dual write
  Narration: Use separate writes only when missing notifications are acceptable or independently reconciled.

- **0:30-0:35** / Reveal step 6: Trade-off / Direct dual write
  Narration: A crash between the writes can leave state and events inconsistent.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once. Which constraint would change your choice?

## References

- [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
