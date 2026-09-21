# Consumers Must Survive Redelivery / Metrics That Matter

By Yasir Sharfi

## The Idea

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

## Visual Blueprint

1. **Deduplicated deliveries**: Count repeated event identities that were safely recognized.
2. **Interpret / Deduplicated deliveries**: Duplicates are normal for some transports; the metric is not itself a correctness failure.
3. **Repeated business effects**: Audit logical operations against their externally visible effects.
4. **Interpret / Repeated business effects**: Message acknowledgements cannot prove that an effect occurred exactly once.
5. **Deduplication retention**: Track oldest retained identities relative to the replay contract.
6. **Interpret / Deduplication retention**: A replay older than retained history needs an explicit recovery policy.

## Caption

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

1. Deduplicated deliveries
Count repeated event identities that were safely recognized.

2. Interpret / Deduplicated deliveries
Duplicates are normal for some transports; the metric is not itself a correctness failure.

3. Repeated business effects
Audit logical operations against their externally visible effects.

4. Interpret / Repeated business effects
Message acknowledgements cannot prove that an effect occurred exactly once.

5. Deduplication retention
Track oldest retained identities relative to the replay contract.

6. Interpret / Deduplication retention
A replay older than retained history needs an explicit recovery policy.

The takeaway: Deduplicate at the business-effect boundary, not merely at message receipt.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #consumers #idempotency

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Acknowledging a message and committing a business effect are separate failure boundaries.

- **0:05-0:09** / Reveal step 1: Deduplicated deliveries
  Narration: Count repeated event identities that were safely recognized.

- **0:09-0:15** / Reveal step 2: Interpret / Deduplicated deliveries
  Narration: Duplicates are normal for some transports; the metric is not itself a correctness failure.

- **0:15-0:19** / Reveal step 3: Repeated business effects
  Narration: Audit logical operations against their externally visible effects.

- **0:19-0:23** / Reveal step 4: Interpret / Repeated business effects
  Narration: Message acknowledgements cannot prove that an effect occurred exactly once.

- **0:23-0:27** / Reveal step 5: Deduplication retention
  Narration: Track oldest retained identities relative to the replay contract.

- **0:27-0:32** / Reveal step 6: Interpret / Deduplication retention
  Narration: A replay older than retained history needs an explicit recovery policy.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Deduplicate at the business-effect boundary, not merely at message receipt. Which metric could look healthy while users suffer?

## References

- [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
