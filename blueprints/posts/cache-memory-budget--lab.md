# Cache Memory Is a Budget / Build and Validate

By Yasir Sharfi

## The Idea

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

## Visual Blueprint

1. **Set a small memory limit**: Use a disposable cache with a documented eviction policy.
2. **Mix value sizes**: Load synthetic small and large entries with known access frequencies.
3. **Exceed the working set**: Observe memory, eviction, misses, and source demand.
4. **Separate durable state**: Verify critical coordination data is not silently treated as disposable cache content.
5. **Change admission rules**: Avoid storing low-reuse oversized values and compare effective hit rates.
6. **Verify pressure behavior**: Assert bounded errors and source load when the memory ceiling is reached.

## Caption

A cache can run out of memory even when every key has a TTL.

Expiry limits lifetime, not instantaneous demand. Account for value sizes, metadata, replication buffers, and eviction policy.

1. Set a small memory limit
Use a disposable cache with a documented eviction policy.

2. Mix value sizes
Load synthetic small and large entries with known access frequencies.

3. Exceed the working set
Observe memory, eviction, misses, and source demand.

4. Separate durable state
Verify critical coordination data is not silently treated as disposable cache content.

5. Change admission rules
Avoid storing low-reuse oversized values and compare effective hit rates.

6. Verify pressure behavior
Assert bounded errors and source load when the memory ceiling is reached.

The takeaway: TTL, admission, eviction, and fallback together define the cache's real memory behavior.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #memory #eviction

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache can run out of memory even when every key has a TTL.

- **0:06-0:10** / Reveal step 1: Set a small memory limit
  Narration: Use a disposable cache with a documented eviction policy.

- **0:10-0:14** / Reveal step 2: Mix value sizes
  Narration: Load synthetic small and large entries with known access frequencies.

- **0:14-0:17** / Reveal step 3: Exceed the working set
  Narration: Observe memory, eviction, misses, and source demand.

- **0:17-0:22** / Reveal step 4: Separate durable state
  Narration: Verify critical coordination data is not silently treated as disposable cache content.

- **0:22-0:26** / Reveal step 5: Change admission rules
  Narration: Avoid storing low-reuse oversized values and compare effective hit rates.

- **0:26-0:31** / Reveal step 6: Verify pressure behavior
  Narration: Assert bounded errors and source load when the memory ceiling is reached.

- **0:31-0:39** / Takeaway and discussion prompt
  Narration: TTL, admission, eviction, and fallback together define the cache's real memory behavior. How would you reproduce this with synthetic data?

## References

- [Redis eviction policies](https://redis.io/docs/latest/develop/reference/eviction/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
