# Choose the Shard Key Last / Metrics That Matter

By Yasir Sharfi

## The Idea

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

## Visual Blueprint

1. **Shard utilization spread**: Compare resource demand across shards rather than only cluster averages.
2. **Interpret / Shard utilization spread**: Uniform row counts do not imply uniform CPU, I/O, or request cost.
3. **Fan-out width**: Measure how many partitions each query touches.
4. **Interpret / Fan-out width**: Adding shards can make a global query slower even while individual shards become smaller.
5. **Rebalance backlog**: Track data movement, validation progress, and ownership transitions.
6. **Interpret / Rebalance backlog**: A migration that copies bytes but loses updates is not a successful rebalance.

## Caption

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

1. Shard utilization spread
Compare resource demand across shards rather than only cluster averages.

2. Interpret / Shard utilization spread
Uniform row counts do not imply uniform CPU, I/O, or request cost.

3. Fan-out width
Measure how many partitions each query touches.

4. Interpret / Fan-out width
Adding shards can make a global query slower even while individual shards become smaller.

5. Rebalance backlog
Track data movement, validation progress, and ownership transitions.

6. Interpret / Rebalance backlog
A migration that copies bytes but loses updates is not a successful rebalance.

The takeaway: Shard for measured access patterns, and budget for movement and cross-shard work.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #sharding #partitioning

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A shard key can distribute bytes evenly while concentrating every important request on one shard.

- **0:06-0:10** / Reveal step 1: Shard utilization spread
  Narration: Compare resource demand across shards rather than only cluster averages.

- **0:10-0:15** / Reveal step 2: Interpret / Shard utilization spread
  Narration: Uniform row counts do not imply uniform CPU, I/O, or request cost.

- **0:15-0:18** / Reveal step 3: Fan-out width
  Narration: Measure how many partitions each query touches.

- **0:18-0:24** / Reveal step 4: Interpret / Fan-out width
  Narration: Adding shards can make a global query slower even while individual shards become smaller.

- **0:24-0:28** / Reveal step 5: Rebalance backlog
  Narration: Track data movement, validation progress, and ownership transitions.

- **0:28-0:34** / Reveal step 6: Interpret / Rebalance backlog
  Narration: A migration that copies bytes but loses updates is not a successful rebalance.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: Shard for measured access patterns, and budget for movement and cross-shard work. Which metric could look healthy while users suffer?

## References

- [MongoDB shard-key guidance](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
