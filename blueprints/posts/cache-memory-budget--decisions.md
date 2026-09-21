# Cache Memory Is a Budget / Decision Guide

By Yasir Sharfi

## The Idea

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

## Visual Blueprint

1. **Evict least-used data**: Use a supported eviction policy when losing cached values is acceptable.
2. **Trade-off / Evict least-used data**: Eviction must not silently remove state that the application wrongly treats as durable authority.
3. **Reject new writes**: Use explicit rejection when eviction would violate the role of the stored data.
4. **Trade-off / Reject new writes**: Clients must handle write rejection without endless retries or inconsistent fallback state.
5. **Split cache workloads**: Separate durable coordination or session needs from disposable read caching when policies differ.
6. **Trade-off / Split cache workloads**: More clusters add cost and operations, so split by real semantic boundaries.

## Caption

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

1. Evict least-used data
Use a supported eviction policy when losing cached values is acceptable.

2. Trade-off / Evict least-used data
Eviction must not silently remove state that the application wrongly treats as durable authority.

3. Reject new writes
Use explicit rejection when eviction would violate the role of the stored data.

4. Trade-off / Reject new writes
Clients must handle write rejection without endless retries or inconsistent fallback state.

5. Split cache workloads
Separate durable coordination or session needs from disposable read caching when policies differ.

6. Trade-off / Split cache workloads
More clusters add cost and operations, so split by real semantic boundaries.

The takeaway: TTL, admission, eviction, and fallback together define the cache's real memory behavior.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #memory #eviction

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache can run out of memory even when every key has a TTL.

- **0:06-0:11** / Reveal step 1: Evict least-used data
  Narration: Use a supported eviction policy when losing cached values is acceptable.

- **0:11-0:17** / Reveal step 2: Trade-off / Evict least-used data
  Narration: Eviction must not silently remove state that the application wrongly treats as durable authority.

- **0:17-0:23** / Reveal step 3: Reject new writes
  Narration: Use explicit rejection when eviction would violate the role of the stored data.

- **0:23-0:28** / Reveal step 4: Trade-off / Reject new writes
  Narration: Clients must handle write rejection without endless retries or inconsistent fallback state.

- **0:28-0:34** / Reveal step 5: Split cache workloads
  Narration: Separate durable coordination or session needs from disposable read caching when policies differ.

- **0:34-0:39** / Reveal step 6: Trade-off / Split cache workloads
  Narration: More clusters add cost and operations, so split by real semantic boundaries.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: TTL, admission, eviction, and fallback together define the cache's real memory behavior. Which constraint would change your choice?

## References

- [Redis eviction policies](https://redis.io/docs/latest/develop/reference/eviction/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
