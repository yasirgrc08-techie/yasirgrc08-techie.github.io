# Consumers Must Survive Redelivery / Decision Guide

By Yasir Sharfi

## The Idea

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

## Visual Blueprint

1. **Transactional inbox**: Use an inbox record and business mutation in one database transaction.
2. **Trade-off / Transactional inbox**: Retention and replay rules must prevent forgotten identities from creating duplicate effects later.
3. **Idempotent state assignment**: Use naturally repeatable assignment when applying the same version has no additional effect.
4. **Trade-off / Idempotent state assignment**: Incrementing counters or sending messages is not equivalent to assigning an absolute versioned state.
5. **Provider idempotency**: Use the external service's documented operation-key support for irreversible downstream work.
6. **Trade-off / Provider idempotency**: Your consumer and provider may have different key scopes and retention windows.

## Caption

Acknowledging a message and committing a business effect are separate failure boundaries.

Assume at-least-once delivery. The consumer must distinguish repeated delivery from a genuinely new business operation.

1. Transactional inbox
Use an inbox record and business mutation in one database transaction.

2. Trade-off / Transactional inbox
Retention and replay rules must prevent forgotten identities from creating duplicate effects later.

3. Idempotent state assignment
Use naturally repeatable assignment when applying the same version has no additional effect.

4. Trade-off / Idempotent state assignment
Incrementing counters or sending messages is not equivalent to assigning an absolute versioned state.

5. Provider idempotency
Use the external service's documented operation-key support for irreversible downstream work.

6. Trade-off / Provider idempotency
Your consumer and provider may have different key scopes and retention windows.

The takeaway: Deduplicate at the business-effect boundary, not merely at message receipt.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #consumers #idempotency

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Acknowledging a message and committing a business effect are separate failure boundaries.

- **0:05-0:10** / Reveal step 1: Transactional inbox
  Narration: Use an inbox record and business mutation in one database transaction.

- **0:10-0:16** / Reveal step 2: Trade-off / Transactional inbox
  Narration: Retention and replay rules must prevent forgotten identities from creating duplicate effects later.

- **0:16-0:22** / Reveal step 3: Idempotent state assignment
  Narration: Use naturally repeatable assignment when applying the same version has no additional effect.

- **0:22-0:28** / Reveal step 4: Trade-off / Idempotent state assignment
  Narration: Incrementing counters or sending messages is not equivalent to assigning an absolute versioned state.

- **0:28-0:33** / Reveal step 5: Provider idempotency
  Narration: Use the external service's documented operation-key support for irreversible downstream work.

- **0:33-0:38** / Reveal step 6: Trade-off / Provider idempotency
  Narration: Your consumer and provider may have different key scopes and retention windows.

- **0:38-0:45** / Takeaway and discussion prompt
  Narration: Deduplicate at the business-effect boundary, not merely at message receipt. Which constraint would change your choice?

## References

- [Apache Kafka delivery semantics](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
