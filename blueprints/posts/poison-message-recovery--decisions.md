# Dead Letters Need a Runbook / Decision Guide

By Yasir Sharfi

## The Idea

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

## Visual Blueprint

1. **Retry in place**: Retry a transient failure when the event remains valid and the attempt budget allows it.
2. **Trade-off / Retry in place**: One poison event can block ordered work behind it if the consumer never advances.
3. **Quarantine the event**: Isolate permanent failures when the stream can proceed under its ordering contract.
4. **Trade-off / Quarantine the event**: Skipping an event can leave a projection incomplete; make the gap visible.
5. **Stop the partition**: Pause processing when continuing without the failed event would violate correctness.
6. **Trade-off / Stop the partition**: Availability is reduced until repair; ownership and escalation must be explicit.

## Caption

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

1. Retry in place
Retry a transient failure when the event remains valid and the attempt budget allows it.

2. Trade-off / Retry in place
One poison event can block ordered work behind it if the consumer never advances.

3. Quarantine the event
Isolate permanent failures when the stream can proceed under its ordering contract.

4. Trade-off / Quarantine the event
Skipping an event can leave a projection incomplete; make the gap visible.

5. Stop the partition
Pause processing when continuing without the failed event would violate correctness.

6. Trade-off / Stop the partition
Availability is reduced until repair; ownership and escalation must be explicit.

The takeaway: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #deadletter #retries

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Moving a message to a dead-letter queue does not resolve the customer's problem.

- **0:06-0:12** / Reveal step 1: Retry in place
  Narration: Retry a transient failure when the event remains valid and the attempt budget allows it.

- **0:12-0:18** / Reveal step 2: Trade-off / Retry in place
  Narration: One poison event can block ordered work behind it if the consumer never advances.

- **0:18-0:23** / Reveal step 3: Quarantine the event
  Narration: Isolate permanent failures when the stream can proceed under its ordering contract.

- **0:23-0:28** / Reveal step 4: Trade-off / Quarantine the event
  Narration: Skipping an event can leave a projection incomplete; make the gap visible.

- **0:28-0:33** / Reveal step 5: Stop the partition
  Narration: Pause processing when continuing without the failed event would violate correctness.

- **0:33-0:38** / Reveal step 6: Trade-off / Stop the partition
  Narration: Availability is reduced until repair; ownership and escalation must be explicit.

- **0:38-0:47** / Takeaway and discussion prompt
  Narration: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work. Which constraint would change your choice?

## References

- [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
