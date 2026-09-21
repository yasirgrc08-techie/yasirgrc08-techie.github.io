# Dead Letters Need a Runbook / Failure and Recovery

By Yasir Sharfi

## The Idea

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

## Visual Blueprint

1. **Find repeated failure**: One event consumes many attempts while useful completion stalls.
2. **Inspect the category**: Determine whether the failure is transient, schema-related, or a business invariant violation.
3. **Contain the retry loop**: Stop unbounded retry traffic without discarding the event.
4. **Assign an owner**: Route the quarantined case to a documented recovery responsibility.
5. **Repair and replay**: Apply a tested handler fix and replay using the original identity.
6. **Close the business gap**: Verify the customer's intended state or record why the operation cannot complete.

## Caption

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

1. Find repeated failure
One event consumes many attempts while useful completion stalls.

2. Inspect the category
Determine whether the failure is transient, schema-related, or a business invariant violation.

3. Contain the retry loop
Stop unbounded retry traffic without discarding the event.

4. Assign an owner
Route the quarantined case to a documented recovery responsibility.

5. Repair and replay
Apply a tested handler fix and replay using the original identity.

6. Close the business gap
Verify the customer's intended state or record why the operation cannot complete.

The takeaway: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #deadletter #retries

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Moving a message to a dead-letter queue does not resolve the customer's problem.

- **0:06-0:10** / Reveal step 1: Find repeated failure
  Narration: One event consumes many attempts while useful completion stalls.

- **0:10-0:15** / Reveal step 2: Inspect the category
  Narration: Determine whether the failure is transient, schema-related, or a business invariant violation.

- **0:15-0:19** / Reveal step 3: Contain the retry loop
  Narration: Stop unbounded retry traffic without discarding the event.

- **0:19-0:23** / Reveal step 4: Assign an owner
  Narration: Route the quarantined case to a documented recovery responsibility.

- **0:23-0:28** / Reveal step 5: Repair and replay
  Narration: Apply a tested handler fix and replay using the original identity.

- **0:28-0:33** / Reveal step 6: Close the business gap
  Narration: Verify the customer's intended state or record why the operation cannot complete.

- **0:33-0:43** / Takeaway and discussion prompt
  Narration: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work. What evidence would disprove your first diagnosis?

## References

- [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
