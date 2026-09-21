# Dead Letters Need a Runbook / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

## Visual Blueprint

1. **Classify the failure**: Separate transient dependency errors from permanent validation or unsupported-schema failures.
2. **Bound retries**: Set attempts and delays according to whether another attempt can plausibly help.
3. **Preserve diagnostic context**: Keep event identity, schema, and sanitized failure metadata without leaking sensitive payloads.
4. **Quarantine deliberately**: Move unrecoverable work to an owned recovery workflow with alerting.
5. **Repair before replay**: Fix the handler, transform authorized data, or record a business-approved terminal outcome.
6. **Replay safely**: Use original identities and bounded rates so recovery cannot repeat irreversible effects.

## Caption

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

1. Classify the failure
Separate transient dependency errors from permanent validation or unsupported-schema failures.

2. Bound retries
Set attempts and delays according to whether another attempt can plausibly help.

3. Preserve diagnostic context
Keep event identity, schema, and sanitized failure metadata without leaking sensitive payloads.

4. Quarantine deliberately
Move unrecoverable work to an owned recovery workflow with alerting.

5. Repair before replay
Fix the handler, transform authorized data, or record a business-approved terminal outcome.

6. Replay safely
Use original identities and bounded rates so recovery cannot repeat irreversible effects.

The takeaway: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #deadletter #retries

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Moving a message to a dead-letter queue does not resolve the customer's problem.

- **0:06-0:10** / Reveal step 1: Classify the failure
  Narration: Separate transient dependency errors from permanent validation or unsupported-schema failures.

- **0:10-0:15** / Reveal step 2: Bound retries
  Narration: Set attempts and delays according to whether another attempt can plausibly help.

- **0:15-0:20** / Reveal step 3: Preserve diagnostic context
  Narration: Keep event identity, schema, and sanitized failure metadata without leaking sensitive payloads.

- **0:20-0:24** / Reveal step 4: Quarantine deliberately
  Narration: Move unrecoverable work to an owned recovery workflow with alerting.

- **0:24-0:29** / Reveal step 5: Repair before replay
  Narration: Fix the handler, transform authorized data, or record a business-approved terminal outcome.

- **0:29-0:34** / Reveal step 6: Replay safely
  Narration: Use original identities and bounded rates so recovery cannot repeat irreversible effects.

- **0:34-0:43** / Takeaway and discussion prompt
  Narration: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work. Which bottleneck would you measure first?

## References

- [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
