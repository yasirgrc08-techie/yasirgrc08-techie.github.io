# Hot Keys Break Even Clusters / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

## Visual Blueprint

1. **Measure key concentration**: Identify the fraction of demand reaching the busiest key classes.
2. **Separate reads and writes**: Determine whether the hotspot is immutable reads, mutations, or serialization of a large payload.
3. **Replicate safe reads**: Use local copies or additional read paths only when freshness permits them.
4. **Partition mutable work**: Shard counters or state only with an explicit aggregation and consistency contract.
5. **Bound payload cost**: Reduce unnecessary fields and measure transfer and deserialization overhead.
6. **Test skew explicitly**: Benchmark the observed popularity distribution, not only uniform random keys.

## Caption

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

1. Measure key concentration
Identify the fraction of demand reaching the busiest key classes.

2. Separate reads and writes
Determine whether the hotspot is immutable reads, mutations, or serialization of a large payload.

3. Replicate safe reads
Use local copies or additional read paths only when freshness permits them.

4. Partition mutable work
Shard counters or state only with an explicit aggregation and consistency contract.

5. Bound payload cost
Reduce unnecessary fields and measure transfer and deserialization overhead.

6. Test skew explicitly
Benchmark the observed popularity distribution, not only uniform random keys.

The takeaway: Hot-key fixes depend on what the key means, not just where it is stored.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #hotkeys #redis

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding cache nodes will not split one extremely popular key automatically.

- **0:05-0:09** / Reveal step 1: Measure key concentration
  Narration: Identify the fraction of demand reaching the busiest key classes.

- **0:09-0:15** / Reveal step 2: Separate reads and writes
  Narration: Determine whether the hotspot is immutable reads, mutations, or serialization of a large payload.

- **0:15-0:20** / Reveal step 3: Replicate safe reads
  Narration: Use local copies or additional read paths only when freshness permits them.

- **0:20-0:25** / Reveal step 4: Partition mutable work
  Narration: Shard counters or state only with an explicit aggregation and consistency contract.

- **0:25-0:29** / Reveal step 5: Bound payload cost
  Narration: Reduce unnecessary fields and measure transfer and deserialization overhead.

- **0:29-0:33** / Reveal step 6: Test skew explicitly
  Narration: Benchmark the observed popularity distribution, not only uniform random keys.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: Hot-key fixes depend on what the key means, not just where it is stored. Which bottleneck would you measure first?

## References

- [Redis clustering](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
