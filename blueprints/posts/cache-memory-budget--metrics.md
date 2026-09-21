# Cache Memory Is a Budget / Metrics That Matter

By Yasir Sharfi

## The Idea

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

## Visual Blueprint

1. **Memory per useful entry**: Measure actual memory relative to entries that produce meaningful hits.
2. **Interpret / Memory per useful entry**: Serialized payload bytes exclude allocator and metadata overhead.
3. **Eviction rate**: Track evictions and refills together to identify destructive churn.
4. **Interpret / Eviction rate**: Some eviction is normal; repeated eviction of hot data can erase the benefit of caching.
5. **Source amplification**: Compare source traffic before and during cache pressure.
6. **Interpret / Source amplification**: A memory incident can become a database incident if fallback is unbounded.

## Caption

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

1. Memory per useful entry
Measure actual memory relative to entries that produce meaningful hits.

2. Interpret / Memory per useful entry
Serialized payload bytes exclude allocator and metadata overhead.

3. Eviction rate
Track evictions and refills together to identify destructive churn.

4. Interpret / Eviction rate
Some eviction is normal; repeated eviction of hot data can erase the benefit of caching.

5. Source amplification
Compare source traffic before and during cache pressure.

6. Interpret / Source amplification
A memory incident can become a database incident if fallback is unbounded.

The takeaway: TTL, admission, eviction, and fallback together define the cache's real memory behavior.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #memory #eviction

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache can run out of memory even when every key has a TTL.

- **0:06-0:10** / Reveal step 1: Memory per useful entry
  Narration: Measure actual memory relative to entries that produce meaningful hits.

- **0:10-0:14** / Reveal step 2: Interpret / Memory per useful entry
  Narration: Serialized payload bytes exclude allocator and metadata overhead.

- **0:14-0:18** / Reveal step 3: Eviction rate
  Narration: Track evictions and refills together to identify destructive churn.

- **0:18-0:24** / Reveal step 4: Interpret / Eviction rate
  Narration: Some eviction is normal; repeated eviction of hot data can erase the benefit of caching.

- **0:24-0:28** / Reveal step 5: Source amplification
  Narration: Compare source traffic before and during cache pressure.

- **0:28-0:33** / Reveal step 6: Interpret / Source amplification
  Narration: A memory incident can become a database incident if fallback is unbounded.

- **0:33-0:41** / Takeaway and discussion prompt
  Narration: TTL, admission, eviction, and fallback together define the cache's real memory behavior. Which metric could look healthy while users suffer?

## References

- [Redis eviction policies](https://redis.io/docs/latest/develop/reference/eviction/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
