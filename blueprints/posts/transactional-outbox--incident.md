# The Transactional Outbox / Failure and Recovery

By Yasir Sharfi

## The Idea

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

## Visual Blueprint

1. **Notice missing downstream state**: The source database changed but a dependent projection never received the event.
2. **Check the outbox record**: Determine whether state and event were committed together.
3. **Inspect relay progress**: Compare oldest pending records with relay errors and broker acknowledgements.
4. **Replay by identity**: Republish the durable event using its original stable identity.
5. **Verify consumer deduplication**: Ensure repair does not repeat an irreversible side effect.
6. **Test both crash windows**: Fail before commit and after publish to validate the full handoff.

## Caption

Updating a row and publishing an event are not one atomic operation by default.

A service owns relational state and must notify other systems. The outbox closes one dual-write gap, but downstream delivery can still repeat.

1. Notice missing downstream state
The source database changed but a dependent projection never received the event.

2. Check the outbox record
Determine whether state and event were committed together.

3. Inspect relay progress
Compare oldest pending records with relay errors and broker acknowledgements.

4. Replay by identity
Republish the durable event using its original stable identity.

5. Verify consumer deduplication
Ensure repair does not repeat an irreversible side effect.

6. Test both crash windows
Fail before commit and after publish to validate the full handoff.

The takeaway: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #outbox #events

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Updating a row and publishing an event are not one atomic operation by default.

- **0:06-0:11** / Reveal step 1: Notice missing downstream state
  Narration: The source database changed but a dependent projection never received the event.

- **0:11-0:15** / Reveal step 2: Check the outbox record
  Narration: Determine whether state and event were committed together.

- **0:15-0:19** / Reveal step 3: Inspect relay progress
  Narration: Compare oldest pending records with relay errors and broker acknowledgements.

- **0:19-0:23** / Reveal step 4: Replay by identity
  Narration: Republish the durable event using its original stable identity.

- **0:23-0:27** / Reveal step 5: Verify consumer deduplication
  Narration: Ensure repair does not repeat an irreversible side effect.

- **0:27-0:32** / Reveal step 6: Test both crash windows
  Narration: Fail before commit and after publish to validate the full handoff.

- **0:32-0:41** / Takeaway and discussion prompt
  Narration: An outbox makes the database handoff atomic, not the entire distributed workflow exactly once. What evidence would disprove your first diagnosis?

## References

- [Debezium outbox event router](https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
