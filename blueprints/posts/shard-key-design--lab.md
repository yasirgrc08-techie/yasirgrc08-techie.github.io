# Choose the Shard Key Last / Build and Validate

By Yasir Sharfi

## The Idea

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

## Visual Blueprint

1. **Create a skewed keyset**: Generate tenants with very different sizes and request popularity.
2. **Simulate routing**: Compare hash, range, and tenant-based assignments.
3. **Run representative queries**: Include point reads, ranges, and one global aggregation.
4. **Inject a hot key**: Concentrate demand and observe whether extra shards help.
5. **Move one partition**: Model ownership transfer while concurrent updates continue.
6. **Check invariants**: Verify no lost writes, duplicate ownership, or unexplained routing gaps.

## Caption

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

1. Create a skewed keyset
Generate tenants with very different sizes and request popularity.

2. Simulate routing
Compare hash, range, and tenant-based assignments.

3. Run representative queries
Include point reads, ranges, and one global aggregation.

4. Inject a hot key
Concentrate demand and observe whether extra shards help.

5. Move one partition
Model ownership transfer while concurrent updates continue.

6. Check invariants
Verify no lost writes, duplicate ownership, or unexplained routing gaps.

The takeaway: Shard for measured access patterns, and budget for movement and cross-shard work.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #sharding #partitioning

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A shard key can distribute bytes evenly while concentrating every important request on one shard.

- **0:06-0:10** / Reveal step 1: Create a skewed keyset
  Narration: Generate tenants with very different sizes and request popularity.

- **0:10-0:13** / Reveal step 2: Simulate routing
  Narration: Compare hash, range, and tenant-based assignments.

- **0:13-0:17** / Reveal step 3: Run representative queries
  Narration: Include point reads, ranges, and one global aggregation.

- **0:17-0:21** / Reveal step 4: Inject a hot key
  Narration: Concentrate demand and observe whether extra shards help.

- **0:21-0:24** / Reveal step 5: Move one partition
  Narration: Model ownership transfer while concurrent updates continue.

- **0:24-0:28** / Reveal step 6: Check invariants
  Narration: Verify no lost writes, duplicate ownership, or unexplained routing gaps.

- **0:28-0:36** / Takeaway and discussion prompt
  Narration: Shard for measured access patterns, and budget for movement and cross-shard work. How would you reproduce this with synthetic data?

## References

- [MongoDB shard-key guidance](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
