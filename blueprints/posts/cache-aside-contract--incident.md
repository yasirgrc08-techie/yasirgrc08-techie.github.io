# Cache-Aside Has a Contract / Failure and Recovery

By Yasir Sharfi

## The Idea

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

## Visual Blueprint

1. **Notice inconsistent reads**: Different requests return different versions of the same logical object.
2. **Inspect key dimensions**: Check tenant, filters, version, and serialization behavior in the cache key.
3. **Compare authoritative state**: Determine whether the cache or source contains the correct current value.
4. **Bypass narrowly**: Route only the affected class to the source while protecting database capacity.
5. **Repair update semantics**: Fix the invalidation or write-order race rather than only flushing everything.
6. **Test concurrent changes**: Exercise read misses racing with updates and delayed cache writes.

## Caption

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

1. Notice inconsistent reads
Different requests return different versions of the same logical object.

2. Inspect key dimensions
Check tenant, filters, version, and serialization behavior in the cache key.

3. Compare authoritative state
Determine whether the cache or source contains the correct current value.

4. Bypass narrowly
Route only the affected class to the source while protecting database capacity.

5. Repair update semantics
Fix the invalidation or write-order race rather than only flushing everything.

6. Test concurrent changes
Exercise read misses racing with updates and delayed cache writes.

The takeaway: Caching changes correctness and recovery behavior, not only latency.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #redis #freshness

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache hit is useful only if the returned value is allowed to be stale.

- **0:06-0:10** / Reveal step 1: Notice inconsistent reads
  Narration: Different requests return different versions of the same logical object.

- **0:10-0:15** / Reveal step 2: Inspect key dimensions
  Narration: Check tenant, filters, version, and serialization behavior in the cache key.

- **0:15-0:20** / Reveal step 3: Compare authoritative state
  Narration: Determine whether the cache or source contains the correct current value.

- **0:20-0:25** / Reveal step 4: Bypass narrowly
  Narration: Route only the affected class to the source while protecting database capacity.

- **0:25-0:30** / Reveal step 5: Repair update semantics
  Narration: Fix the invalidation or write-order race rather than only flushing everything.

- **0:30-0:34** / Reveal step 6: Test concurrent changes
  Narration: Exercise read misses racing with updates and delayed cache writes.

- **0:34-0:41** / Takeaway and discussion prompt
  Narration: Caching changes correctness and recovery behavior, not only latency. What evidence would disprove your first diagnosis?

## References

- [Azure cache-aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
