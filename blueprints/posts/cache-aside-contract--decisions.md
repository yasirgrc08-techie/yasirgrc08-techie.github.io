# Cache-Aside Has a Contract / Decision Guide

By Yasir Sharfi

## The Idea

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

## Visual Blueprint

1. **Cache-aside**: Use cache-aside when the application can manage misses and freshness deliberately.
2. **Trade-off / Cache-aside**: Concurrent misses and write races can expose stale data or overload the source.
3. **Read-through abstraction**: Use a shared abstraction when consistent loading rules reduce duplicated application code.
4. **Trade-off / Read-through abstraction**: The abstraction must still expose timeouts, freshness, and failure behavior.
5. **No cache**: Keep direct reads when the source is fast enough or correctness requires immediate freshness.
6. **Trade-off / No cache**: Avoiding a cache can simplify operations, but does not remove the need to measure source capacity.

## Caption

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

1. Cache-aside
Use cache-aside when the application can manage misses and freshness deliberately.

2. Trade-off / Cache-aside
Concurrent misses and write races can expose stale data or overload the source.

3. Read-through abstraction
Use a shared abstraction when consistent loading rules reduce duplicated application code.

4. Trade-off / Read-through abstraction
The abstraction must still expose timeouts, freshness, and failure behavior.

5. No cache
Keep direct reads when the source is fast enough or correctness requires immediate freshness.

6. Trade-off / No cache
Avoiding a cache can simplify operations, but does not remove the need to measure source capacity.

The takeaway: Caching changes correctness and recovery behavior, not only latency.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #redis #freshness

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache hit is useful only if the returned value is allowed to be stale.

- **0:06-0:11** / Reveal step 1: Cache-aside
  Narration: Use cache-aside when the application can manage misses and freshness deliberately.

- **0:11-0:17** / Reveal step 2: Trade-off / Cache-aside
  Narration: Concurrent misses and write races can expose stale data or overload the source.

- **0:17-0:22** / Reveal step 3: Read-through abstraction
  Narration: Use a shared abstraction when consistent loading rules reduce duplicated application code.

- **0:22-0:26** / Reveal step 4: Trade-off / Read-through abstraction
  Narration: The abstraction must still expose timeouts, freshness, and failure behavior.

- **0:26-0:32** / Reveal step 5: No cache
  Narration: Keep direct reads when the source is fast enough or correctness requires immediate freshness.

- **0:32-0:39** / Reveal step 6: Trade-off / No cache
  Narration: Avoiding a cache can simplify operations, but does not remove the need to measure source capacity.

- **0:39-0:45** / Takeaway and discussion prompt
  Narration: Caching changes correctness and recovery behavior, not only latency. Which constraint would change your choice?

## References

- [Azure cache-aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
