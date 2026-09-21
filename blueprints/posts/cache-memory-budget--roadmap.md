# Cache Memory Is a Budget / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

## Visual Blueprint

1. **Measure real entry cost**: Include key, value, encoding, and allocator overhead in representative measurements.
2. **Set a memory ceiling**: Choose a safe limit below the host's total capacity, leaving room for non-cache overhead.
3. **Choose eviction semantics**: Match the policy to eligible keys and the cost of evicting them.
4. **Control large values**: Bound object sizes and avoid caching data whose transfer cost outweighs the benefit.
5. **Watch churn**: Measure eviction and refill rates that can turn the cache into expensive pass-through storage.
6. **Test pressure and restart**: Exercise cold starts, persistence behavior, and source protection under memory pressure.

## Caption

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

1. Measure real entry cost
Include key, value, encoding, and allocator overhead in representative measurements.

2. Set a memory ceiling
Choose a safe limit below the host's total capacity, leaving room for non-cache overhead.

3. Choose eviction semantics
Match the policy to eligible keys and the cost of evicting them.

4. Control large values
Bound object sizes and avoid caching data whose transfer cost outweighs the benefit.

5. Watch churn
Measure eviction and refill rates that can turn the cache into expensive pass-through storage.

6. Test pressure and restart
Exercise cold starts, persistence behavior, and source protection under memory pressure.

The takeaway: TTL, admission, eviction, and fallback together define the cache's real memory behavior.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #memory #eviction

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache can run out of memory even when every key has a TTL.

- **0:06-0:10** / Reveal step 1: Measure real entry cost
  Narration: Include key, value, encoding, and allocator overhead in representative measurements.

- **0:10-0:16** / Reveal step 2: Set a memory ceiling
  Narration: Choose a safe limit below the host's total capacity, leaving room for non-cache overhead.

- **0:16-0:21** / Reveal step 3: Choose eviction semantics
  Narration: Match the policy to eligible keys and the cost of evicting them.

- **0:21-0:27** / Reveal step 4: Control large values
  Narration: Bound object sizes and avoid caching data whose transfer cost outweighs the benefit.

- **0:27-0:33** / Reveal step 5: Watch churn
  Narration: Measure eviction and refill rates that can turn the cache into expensive pass-through storage.

- **0:33-0:38** / Reveal step 6: Test pressure and restart
  Narration: Exercise cold starts, persistence behavior, and source protection under memory pressure.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: TTL, admission, eviction, and fallback together define the cache's real memory behavior. Which bottleneck would you measure first?

## References

- [Redis eviction policies](https://redis.io/docs/latest/develop/reference/eviction/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
