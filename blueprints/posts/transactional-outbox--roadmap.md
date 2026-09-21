# The Transactional Outbox / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

## Visual Blueprint

1. **Define the event contract**: Choose a stable event ID, schema version, and business meaning.
2. **Commit state and event**: Write the business change and outbox record in the same database transaction.
3. **Relay durably**: Publish pending outbox records through a worker or supported change-data-capture path.
4. **Expect duplicate delivery**: A relay can crash after publishing but before recording success.
5. **Deduplicate downstream effects**: Make consumers safe for repeated event IDs and define per-entity ordering requirements.
6. **Manage retention and repair**: Monitor old records, preserve replay evidence, and remove entries according to a documented policy.

## Caption

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

1. Define the event contract
Choose a stable event ID, schema version, and business meaning.

2. Commit state and event
Write the business change and outbox record in the same database transaction.

3. Relay durably
Publish pending outbox records through a worker or supported change-data-capture path.

4. Expect duplicate delivery
A relay can crash after publishing but before recording success.

5. Deduplicate downstream effects
Make consumers safe for repeated event IDs and define per-entity ordering requirements.

6. Manage retention and repair
Monitor old records, preserve replay evidence, and remove entries according to a documented policy.

The takeaway: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #outbox #events

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Updating a row and publishing an event are not one atomic operation by default.

- **0:06-0:10** / Reveal step 1: Define the event contract
  Narration: Choose a stable event ID, schema version, and business meaning.

- **0:10-0:15** / Reveal step 2: Commit state and event
  Narration: Write the business change and outbox record in the same database transaction.

- **0:15-0:20** / Reveal step 3: Relay durably
  Narration: Publish pending outbox records through a worker or supported change-data-capture path.

- **0:20-0:24** / Reveal step 4: Expect duplicate delivery
  Narration: A relay can crash after publishing but before recording success.

- **0:24-0:29** / Reveal step 5: Deduplicate downstream effects
  Narration: Make consumers safe for repeated event IDs and define per-entity ordering requirements.

- **0:29-0:35** / Reveal step 6: Manage retention and repair
  Narration: Monitor old records, preserve replay evidence, and remove entries according to a documented policy.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once. Which bottleneck would you measure first?

## References

- [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
