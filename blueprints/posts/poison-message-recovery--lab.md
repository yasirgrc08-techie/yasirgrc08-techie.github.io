# Dead Letters Need a Runbook / Build and Validate

By Yasir Sharfi

## The Idea

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

## Visual Blueprint

1. **Create mixed events**: Include valid, malformed, and temporarily failing synthetic messages.
2. **Classify retry behavior**: Apply different handling for permanent and transient failures.
3. **Preserve the event ID**: Keep identity stable through quarantine and repair.
4. **Fix one handler defect**: Deploy a local corrected handler and replay a small controlled batch.
5. **Check duplicate safety**: Repeat the repaired event and verify a single logical effect.
6. **Audit unresolved cases**: Produce a recovery report with owners and explicit remaining gaps.

## Caption

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

1. Create mixed events
Include valid, malformed, and temporarily failing synthetic messages.

2. Classify retry behavior
Apply different handling for permanent and transient failures.

3. Preserve the event ID
Keep identity stable through quarantine and repair.

4. Fix one handler defect
Deploy a local corrected handler and replay a small controlled batch.

5. Check duplicate safety
Repeat the repaired event and verify a single logical effect.

6. Audit unresolved cases
Produce a recovery report with owners and explicit remaining gaps.

The takeaway: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #deadletter #retries

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Moving a message to a dead-letter queue does not resolve the customer's problem.

- **0:06-0:10** / Reveal step 1: Create mixed events
  Narration: Include valid, malformed, and temporarily failing synthetic messages.

- **0:10-0:14** / Reveal step 2: Classify retry behavior
  Narration: Apply different handling for permanent and transient failures.

- **0:14-0:17** / Reveal step 3: Preserve the event ID
  Narration: Keep identity stable through quarantine and repair.

- **0:17-0:22** / Reveal step 4: Fix one handler defect
  Narration: Deploy a local corrected handler and replay a small controlled batch.

- **0:22-0:26** / Reveal step 5: Check duplicate safety
  Narration: Repeat the repaired event and verify a single logical effect.

- **0:26-0:30** / Reveal step 6: Audit unresolved cases
  Narration: Produce a recovery report with owners and explicit remaining gaps.

- **0:30-0:40** / Takeaway and discussion prompt
  Narration: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work. How would you reproduce this with synthetic data?

## References

- [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
