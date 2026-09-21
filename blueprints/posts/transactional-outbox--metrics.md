# The Transactional Outbox / Metrics That Matter

By Yasir Sharfi

## The Idea

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

## Visual Blueprint

1. **Oldest outbox age**: Measure delay from business commit to successful relay progress.
2. **Interpret / Oldest outbox age**: A growing age can expose a stuck publisher even when total row count is small.
3. **Relay attempts**: Track publish attempts per event and permanent error categories.
4. **Interpret / Relay attempts**: Repeated delivery is expected at some boundaries; repeated business effects are not.
5. **Projection freshness**: Measure how far dependent read models lag behind committed source events.
6. **Interpret / Projection freshness**: A healthy broker does not prove every consumer has applied the latest state.

## Caption

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

1. Oldest outbox age
Measure delay from business commit to successful relay progress.

2. Interpret / Oldest outbox age
A growing age can expose a stuck publisher even when total row count is small.

3. Relay attempts
Track publish attempts per event and permanent error categories.

4. Interpret / Relay attempts
Repeated delivery is expected at some boundaries; repeated business effects are not.

5. Projection freshness
Measure how far dependent read models lag behind committed source events.

6. Interpret / Projection freshness
A healthy broker does not prove every consumer has applied the latest state.

The takeaway: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #outbox #events

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Updating a row and publishing an event are not one atomic operation by default.

- **0:06-0:10** / Reveal step 1: Oldest outbox age
  Narration: Measure delay from business commit to successful relay progress.

- **0:10-0:16** / Reveal step 2: Interpret / Oldest outbox age
  Narration: A growing age can expose a stuck publisher even when total row count is small.

- **0:16-0:20** / Reveal step 3: Relay attempts
  Narration: Track publish attempts per event and permanent error categories.

- **0:20-0:25** / Reveal step 4: Interpret / Relay attempts
  Narration: Repeated delivery is expected at some boundaries; repeated business effects are not.

- **0:25-0:30** / Reveal step 5: Projection freshness
  Narration: Measure how far dependent read models lag behind committed source events.

- **0:30-0:36** / Reveal step 6: Interpret / Projection freshness
  Narration: A healthy broker does not prove every consumer has applied the latest state.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once. Which metric could look healthy while users suffer?

## References

- [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
