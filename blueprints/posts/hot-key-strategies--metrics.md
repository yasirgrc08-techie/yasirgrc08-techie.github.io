# Hot Keys Break Even Clusters / Metrics That Matter

By Yasir Sharfi

## The Idea

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

## Visual Blueprint

1. **Top-key concentration**: Measure the share of traffic handled by the busiest bounded key classes.
2. **Interpret / Top-key concentration**: Uniform storage size says little about the distribution of request demand.
3. **Value transfer cost**: Track payload bytes and serialization time for frequently read values.
4. **Interpret / Value transfer cost**: A key can be hot because it is large, not only because it is requested often.
5. **Per-node saturation**: Compare CPU, network, and latency across cache nodes.
6. **Interpret / Per-node saturation**: A healthy cluster average can conceal one node limiting the whole user journey.

## Caption

Adding cache nodes will not split one extremely popular key automatically.

Distinguish a hot read, a hot mutable counter, and a large value. Their scaling and correctness constraints are different.

1. Top-key concentration
Measure the share of traffic handled by the busiest bounded key classes.

2. Interpret / Top-key concentration
Uniform storage size says little about the distribution of request demand.

3. Value transfer cost
Track payload bytes and serialization time for frequently read values.

4. Interpret / Value transfer cost
A key can be hot because it is large, not only because it is requested often.

5. Per-node saturation
Compare CPU, network, and latency across cache nodes.

6. Interpret / Per-node saturation
A healthy cluster average can conceal one node limiting the whole user journey.

The takeaway: Hot-key fixes depend on what the key means, not just where it is stored.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #hotkeys #redis

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Adding cache nodes will not split one extremely popular key automatically.

- **0:05-0:10** / Reveal step 1: Top-key concentration
  Narration: Measure the share of traffic handled by the busiest bounded key classes.

- **0:10-0:15** / Reveal step 2: Interpret / Top-key concentration
  Narration: Uniform storage size says little about the distribution of request demand.

- **0:15-0:19** / Reveal step 3: Value transfer cost
  Narration: Track payload bytes and serialization time for frequently read values.

- **0:19-0:26** / Reveal step 4: Interpret / Value transfer cost
  Narration: A key can be hot because it is large, not only because it is requested often.

- **0:26-0:30** / Reveal step 5: Per-node saturation
  Narration: Compare CPU, network, and latency across cache nodes.

- **0:30-0:36** / Reveal step 6: Interpret / Per-node saturation
  Narration: A healthy cluster average can conceal one node limiting the whole user journey.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: Hot-key fixes depend on what the key means, not just where it is stored. Which metric could look healthy while users suffer?

## References

- [Redis clustering](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
