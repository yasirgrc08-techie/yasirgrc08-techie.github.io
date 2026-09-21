# Choose the Shard Key Last / Failure and Recovery

By Yasir Sharfi

## The Idea

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

## Visual Blueprint

1. **Find one overloaded shard**: A subset of keys has high latency while most shards remain lightly used.
2. **Separate size from traffic**: Compare bytes, active requests, and expensive operations by partition.
3. **Contain the hot workload**: Apply targeted admission or caching without assuming all shards need more capacity.
4. **Review the key choice**: Determine whether access locality or a monotonic key caused concentration.
5. **Move data safely**: Use a tested ownership-transfer protocol with reconciliation.
6. **Verify skewed load**: Replay the real key distribution and check cross-shard query costs.

## Caption

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

1. Find one overloaded shard
A subset of keys has high latency while most shards remain lightly used.

2. Separate size from traffic
Compare bytes, active requests, and expensive operations by partition.

3. Contain the hot workload
Apply targeted admission or caching without assuming all shards need more capacity.

4. Review the key choice
Determine whether access locality or a monotonic key caused concentration.

5. Move data safely
Use a tested ownership-transfer protocol with reconciliation.

6. Verify skewed load
Replay the real key distribution and check cross-shard query costs.

The takeaway: Shard for measured access patterns, and budget for movement and cross-shard work.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #sharding #partitioning

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A shard key can distribute bytes evenly while concentrating every important request on one shard.

- **0:06-0:12** / Reveal step 1: Find one overloaded shard
  Narration: A subset of keys has high latency while most shards remain lightly used.

- **0:12-0:16** / Reveal step 2: Separate size from traffic
  Narration: Compare bytes, active requests, and expensive operations by partition.

- **0:16-0:21** / Reveal step 3: Contain the hot workload
  Narration: Apply targeted admission or caching without assuming all shards need more capacity.

- **0:21-0:25** / Reveal step 4: Review the key choice
  Narration: Determine whether access locality or a monotonic key caused concentration.

- **0:25-0:28** / Reveal step 5: Move data safely
  Narration: Use a tested ownership-transfer protocol with reconciliation.

- **0:28-0:32** / Reveal step 6: Verify skewed load
  Narration: Replay the real key distribution and check cross-shard query costs.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: Shard for measured access patterns, and budget for movement and cross-shard work. What evidence would disprove your first diagnosis?

## References

- [MongoDB shard-key guidance](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
