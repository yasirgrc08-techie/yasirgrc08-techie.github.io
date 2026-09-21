# Dead Letters Need a Runbook / Metrics That Matter

By Yasir Sharfi

## The Idea

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

## Visual Blueprint

1. **Permanent failure age**: Measure how long quarantined events remain unresolved.
2. **Interpret / Permanent failure age**: An empty main queue can hide a growing dead-letter backlog.
3. **Attempts per event**: Track repeated failures by safe error category and schema version.
4. **Interpret / Attempts per event**: Large attempt counts are waste when the input cannot succeed without intervention.
5. **Recovery completion**: Count cases restored to a valid terminal business state.
6. **Interpret / Recovery completion**: Moving bytes between queues is not the same as resolving the original operation.

## Caption

Moving a message to a dead-letter queue does not resolve the customer's problem.

A worker repeatedly fails on a malformed or permanently unsupported event. Separate retryable infrastructure errors from data and business failures.

1. Permanent failure age
Measure how long quarantined events remain unresolved.

2. Interpret / Permanent failure age
An empty main queue can hide a growing dead-letter backlog.

3. Attempts per event
Track repeated failures by safe error category and schema version.

4. Interpret / Attempts per event
Large attempt counts are waste when the input cannot succeed without intervention.

5. Recovery completion
Count cases restored to a valid terminal business state.

6. Interpret / Recovery completion
Moving bytes between queues is not the same as resolving the original operation.

The takeaway: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #queues #deadletter #retries

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Moving a message to a dead-letter queue does not resolve the customer's problem.

- **0:06-0:09** / Reveal step 1: Permanent failure age
  Narration: Measure how long quarantined events remain unresolved.

- **0:09-0:13** / Reveal step 2: Interpret / Permanent failure age
  Narration: An empty main queue can hide a growing dead-letter backlog.

- **0:13-0:17** / Reveal step 3: Attempts per event
  Narration: Track repeated failures by safe error category and schema version.

- **0:17-0:22** / Reveal step 4: Interpret / Attempts per event
  Narration: Large attempt counts are waste when the input cannot succeed without intervention.

- **0:22-0:26** / Reveal step 5: Recovery completion
  Narration: Count cases restored to a valid terminal business state.

- **0:26-0:32** / Reveal step 6: Interpret / Recovery completion
  Narration: Moving bytes between queues is not the same as resolving the original operation.

- **0:32-0:42** / Takeaway and discussion prompt
  Narration: A dead-letter queue is a recovery inbox with an owner, not a graveyard for failed work. Which metric could look healthy while users suffer?

## References

- [Amazon SQS dead-letter queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
