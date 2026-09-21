# Hot Keys Break Even Clusters / Decision Guide

By Yasir Sharfi

## The Idea

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

## Visual Blueprint

1. **Local read cache**: Use local caching for highly repeated reads with acceptable bounded staleness.
2. **Trade-off / Local read cache**: Every process needs invalidation or expiry, and cold starts can synchronize source demand.
3. **Replicated hot value**: Use multiple readable copies when the storage system and freshness contract support them.
4. **Trade-off / Replicated hot value**: Writes and invalidation must reach the right copies without exposing inconsistent security state.
5. **Sharded counter**: Use partitioned counters when approximate or delayed aggregation is acceptable.
6. **Trade-off / Sharded counter**: A global exact check may reintroduce coordination and remove the expected scaling gain.

## Caption

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

1. Local read cache
Use local caching for highly repeated reads with acceptable bounded staleness.

2. Trade-off / Local read cache
Every process needs invalidation or expiry, and cold starts can synchronize source demand.

3. Replicated hot value
Use multiple readable copies when the storage system and freshness contract support them.

4. Trade-off / Replicated hot value
Writes and invalidation must reach the right copies without exposing inconsistent security state.

5. Sharded counter
Use partitioned counters when approximate or delayed aggregation is acceptable.

6. Trade-off / Sharded counter
A global exact check may reintroduce coordination and remove the expected scaling gain.

The takeaway: Hot-key fixes depend on what the key means, not just where it is stored.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #hotkeys #redis

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding cache nodes will not split one extremely popular key automatically.

- **0:05-0:10** / Reveal step 1: Local read cache
  Narration: Use local caching for highly repeated reads with acceptable bounded staleness.

- **0:10-0:16** / Reveal step 2: Trade-off / Local read cache
  Narration: Every process needs invalidation or expiry, and cold starts can synchronize source demand.

- **0:16-0:22** / Reveal step 3: Replicated hot value
  Narration: Use multiple readable copies when the storage system and freshness contract support them.

- **0:22-0:28** / Reveal step 4: Trade-off / Replicated hot value
  Narration: Writes and invalidation must reach the right copies without exposing inconsistent security state.

- **0:28-0:32** / Reveal step 5: Sharded counter
  Narration: Use partitioned counters when approximate or delayed aggregation is acceptable.

- **0:32-0:38** / Reveal step 6: Trade-off / Sharded counter
  Narration: A global exact check may reintroduce coordination and remove the expected scaling gain.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: Hot-key fixes depend on what the key means, not just where it is stored. Which constraint would change your choice?

## References

- [Redis clustering](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
