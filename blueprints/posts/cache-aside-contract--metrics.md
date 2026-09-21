# Cache-Aside Has a Contract / Metrics That Matter

By Yasir Sharfi

## The Idea

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

## Visual Blueprint

1. **Hit ratio by workload**: Measure hits for specific useful request classes rather than one global percentage.
2. **Interpret / Hit ratio by workload**: A high hit ratio can hide a small expensive miss path or incorrect cached responses.
3. **Stale-read age**: Measure the age or version gap of cached data against the accepted freshness window.
4. **Interpret / Stale-read age**: Expiry time is not always the same as data age when values are repopulated from stale sources.
5. **Source fallback load**: Track database demand during misses, cold starts, and cache failures.
6. **Interpret / Source fallback load**: A cache can make steady state cheap while making recovery unexpectedly dangerous.

## Caption

A cache hit is useful only if the returned value is allowed to be stale.

The database remains authoritative. Define the key, freshness window, miss behavior, and update policy before adding a cache to a read path.

1. Hit ratio by workload
Measure hits for specific useful request classes rather than one global percentage.

2. Interpret / Hit ratio by workload
A high hit ratio can hide a small expensive miss path or incorrect cached responses.

3. Stale-read age
Measure the age or version gap of cached data against the accepted freshness window.

4. Interpret / Stale-read age
Expiry time is not always the same as data age when values are repopulated from stale sources.

5. Source fallback load
Track database demand during misses, cold starts, and cache failures.

6. Interpret / Source fallback load
A cache can make steady state cheap while making recovery unexpectedly dangerous.

The takeaway: Caching changes correctness and recovery behavior, not only latency.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #redis #freshness

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A cache hit is useful only if the returned value is allowed to be stale.

- **0:06-0:11** / Reveal step 1: Hit ratio by workload
  Narration: Measure hits for specific useful request classes rather than one global percentage.

- **0:11-0:17** / Reveal step 2: Interpret / Hit ratio by workload
  Narration: A high hit ratio can hide a small expensive miss path or incorrect cached responses.

- **0:17-0:23** / Reveal step 3: Stale-read age
  Narration: Measure the age or version gap of cached data against the accepted freshness window.

- **0:23-0:30** / Reveal step 4: Interpret / Stale-read age
  Narration: Expiry time is not always the same as data age when values are repopulated from stale sources.

- **0:30-0:34** / Reveal step 5: Source fallback load
  Narration: Track database demand during misses, cold starts, and cache failures.

- **0:34-0:39** / Reveal step 6: Interpret / Source fallback load
  Narration: A cache can make steady state cheap while making recovery unexpectedly dangerous.

- **0:39-0:46** / Takeaway and discussion prompt
  Narration: Caching changes correctness and recovery behavior, not only latency. Which metric could look healthy while users suffer?

## References

- [Azure cache-aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
