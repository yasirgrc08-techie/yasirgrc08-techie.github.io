# Choose the Shard Key Last / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

## Visual Blueprint

1. **Map access patterns**: List point lookups, ranges, joins, writes, and tenant-local operations.
2. **Measure skew**: Identify hot entities, time ranges, and workload imbalance before selecting a partition key.
3. **Choose a routing contract**: Define how clients locate data and how routing changes during movement.
4. **Plan cross-shard work**: Account for fan-out queries, distributed transactions, and global uniqueness needs.
5. **Design rebalancing**: Move data with explicit ownership, consistency checks, and rollback or forward-repair rules.
6. **Test hotspots and growth**: Exercise skewed traffic and a growing partition, not only uniform random keys.

## Caption

A shard key can distribute bytes evenly while concentrating every important request on one shard.

Consider partitioning only after measuring storage, throughput, contention, and query constraints. Distribution must fit access patterns, not just row counts.

1. Map access patterns
List point lookups, ranges, joins, writes, and tenant-local operations.

2. Measure skew
Identify hot entities, time ranges, and workload imbalance before selecting a partition key.

3. Choose a routing contract
Define how clients locate data and how routing changes during movement.

4. Plan cross-shard work
Account for fan-out queries, distributed transactions, and global uniqueness needs.

5. Design rebalancing
Move data with explicit ownership, consistency checks, and rollback or forward-repair rules.

6. Test hotspots and growth
Exercise skewed traffic and a growing partition, not only uniform random keys.

The takeaway: Shard for measured access patterns, and budget for movement and cross-shard work.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #sharding #partitioning

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A shard key can distribute bytes evenly while concentrating every important request on one shard.

- **0:06-0:10** / Reveal step 1: Map access patterns
  Narration: List point lookups, ranges, joins, writes, and tenant-local operations.

- **0:10-0:16** / Reveal step 2: Measure skew
  Narration: Identify hot entities, time ranges, and workload imbalance before selecting a partition key.

- **0:16-0:21** / Reveal step 3: Choose a routing contract
  Narration: Define how clients locate data and how routing changes during movement.

- **0:21-0:25** / Reveal step 4: Plan cross-shard work
  Narration: Account for fan-out queries, distributed transactions, and global uniqueness needs.

- **0:25-0:30** / Reveal step 5: Design rebalancing
  Narration: Move data with explicit ownership, consistency checks, and rollback or forward-repair rules.

- **0:30-0:35** / Reveal step 6: Test hotspots and growth
  Narration: Exercise skewed traffic and a growing partition, not only uniform random keys.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Shard for measured access patterns, and budget for movement and cross-shard work. Which bottleneck would you measure first?

## References

- [MongoDB shard-key guidance](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
