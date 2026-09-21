# Hot Keys Break Even Clusters / Failure and Recovery

By Yasir Sharfi

## The Idea

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

## Visual Blueprint

1. **Find one saturated node**: Cluster averages look low while a node serving a hot key is overloaded.
2. **Inspect key distribution**: Measure popularity and value size without logging private key contents.
3. **Reduce avoidable demand**: Coalesce repeated work and apply targeted admission where appropriate.
4. **Choose a semantic fix**: Use replication for safe reads or a justified partitioned write design.
5. **Check consistency cost**: Verify that the change preserves freshness and business invariants.
6. **Replay realistic skew**: Compare tail latency under the same hot-key distribution.

## Caption

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

1. Find one saturated node
Cluster averages look low while a node serving a hot key is overloaded.

2. Inspect key distribution
Measure popularity and value size without logging private key contents.

3. Reduce avoidable demand
Coalesce repeated work and apply targeted admission where appropriate.

4. Choose a semantic fix
Use replication for safe reads or a justified partitioned write design.

5. Check consistency cost
Verify that the change preserves freshness and business invariants.

6. Replay realistic skew
Compare tail latency under the same hot-key distribution.

The takeaway: Hot-key fixes depend on what the key means, not just where it is stored.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #hotkeys #redis

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding cache nodes will not split one extremely popular key automatically.

- **0:05-0:11** / Reveal step 1: Find one saturated node
  Narration: Cluster averages look low while a node serving a hot key is overloaded.

- **0:11-0:15** / Reveal step 2: Inspect key distribution
  Narration: Measure popularity and value size without logging private key contents.

- **0:15-0:19** / Reveal step 3: Reduce avoidable demand
  Narration: Coalesce repeated work and apply targeted admission where appropriate.

- **0:19-0:24** / Reveal step 4: Choose a semantic fix
  Narration: Use replication for safe reads or a justified partitioned write design.

- **0:24-0:28** / Reveal step 5: Check consistency cost
  Narration: Verify that the change preserves freshness and business invariants.

- **0:28-0:32** / Reveal step 6: Replay realistic skew
  Narration: Compare tail latency under the same hot-key distribution.

- **0:32-0:41** / Takeaway and discussion prompt
  Narration: Hot-key fixes depend on what the key means, not just where it is stored. What evidence would disprove your first diagnosis?

## References

- [Redis clustering](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
