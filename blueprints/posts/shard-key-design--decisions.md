# Choose the Shard Key Last / Decision Guide

By Yasir Sharfi

## The Idea

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

## Visual Blueprint

1. **Hash partitioning**: Use hashing when even key distribution and point access dominate.
2. **Trade-off / Hash partitioning**: Range queries and locality-sensitive operations may require expensive fan-out.
3. **Range partitioning**: Use ranges when ordered scans and data lifecycle operations matter.
4. **Trade-off / Range partitioning**: Monotonic keys and popular ranges can create write hotspots.
5. **Tenant partitioning**: Use tenant boundaries when most operations and isolation needs are tenant-local.
6. **Trade-off / Tenant partitioning**: Very large tenants may outgrow a shard and require a separate migration strategy.

## Caption

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

1. Hash partitioning
Use hashing when even key distribution and point access dominate.

2. Trade-off / Hash partitioning
Range queries and locality-sensitive operations may require expensive fan-out.

3. Range partitioning
Use ranges when ordered scans and data lifecycle operations matter.

4. Trade-off / Range partitioning
Monotonic keys and popular ranges can create write hotspots.

5. Tenant partitioning
Use tenant boundaries when most operations and isolation needs are tenant-local.

6. Trade-off / Tenant partitioning
Very large tenants may outgrow a shard and require a separate migration strategy.

The takeaway: Shard for measured access patterns, and budget for movement and cross-shard work.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #sharding #partitioning

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A shard key can distribute bytes evenly while concentrating every important request on one shard.

- **0:06-0:10** / Reveal step 1: Hash partitioning
  Narration: Use hashing when even key distribution and point access dominate.

- **0:10-0:14** / Reveal step 2: Trade-off / Hash partitioning
  Narration: Range queries and locality-sensitive operations may require expensive fan-out.

- **0:14-0:18** / Reveal step 3: Range partitioning
  Narration: Use ranges when ordered scans and data lifecycle operations matter.

- **0:18-0:22** / Reveal step 4: Trade-off / Range partitioning
  Narration: Monotonic keys and popular ranges can create write hotspots.

- **0:22-0:27** / Reveal step 5: Tenant partitioning
  Narration: Use tenant boundaries when most operations and isolation needs are tenant-local.

- **0:27-0:33** / Reveal step 6: Trade-off / Tenant partitioning
  Narration: Very large tenants may outgrow a shard and require a separate migration strategy.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: Shard for measured access patterns, and budget for movement and cross-shard work. Which constraint would change your choice?

## References

- [MongoDB shard-key guidance](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
