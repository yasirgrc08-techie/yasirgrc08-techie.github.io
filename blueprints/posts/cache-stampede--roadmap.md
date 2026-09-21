# Stop the Cache Stampede / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

## Visual Blueprint

1. **Identify hot expirations**: Measure miss bursts by key class and source request amplification.
2. **Coalesce concurrent loads**: Let one loader refresh a key while other requests share or await the result.
3. **Bound the wait**: Apply timeouts and cancellation to requests waiting for a refresh.
4. **Consider stale serving**: Serve a bounded stale value only when the product contract permits it.
5. **Spread refresh timing**: Use jitter or early refresh to avoid synchronized expiry waves.
6. **Test loader failure**: Ensure a crashed refresher does not leave the key permanently unavailable.

## Caption

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

1. Identify hot expirations
Measure miss bursts by key class and source request amplification.

2. Coalesce concurrent loads
Let one loader refresh a key while other requests share or await the result.

3. Bound the wait
Apply timeouts and cancellation to requests waiting for a refresh.

4. Consider stale serving
Serve a bounded stale value only when the product contract permits it.

5. Spread refresh timing
Use jitter or early refresh to avoid synchronized expiry waves.

6. Test loader failure
Ensure a crashed refresher does not leave the key permanently unavailable.

The takeaway: Protect the source during misses; a cache is most dangerous when it suddenly stops helping.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #stampede #concurrency

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One expired hot key can send thousands of identical reads to your database.

- **0:06-0:10** / Reveal step 1: Identify hot expirations
  Narration: Measure miss bursts by key class and source request amplification.

- **0:10-0:16** / Reveal step 2: Coalesce concurrent loads
  Narration: Let one loader refresh a key while other requests share or await the result.

- **0:16-0:20** / Reveal step 3: Bound the wait
  Narration: Apply timeouts and cancellation to requests waiting for a refresh.

- **0:20-0:25** / Reveal step 4: Consider stale serving
  Narration: Serve a bounded stale value only when the product contract permits it.

- **0:25-0:29** / Reveal step 5: Spread refresh timing
  Narration: Use jitter or early refresh to avoid synchronized expiry waves.

- **0:29-0:34** / Reveal step 6: Test loader failure
  Narration: Ensure a crashed refresher does not leave the key permanently unavailable.

- **0:34-0:43** / Takeaway and discussion prompt
  Narration: Protect the source during misses; a cache is most dangerous when it suddenly stops helping. Which bottleneck would you measure first?

## References

- [AWS caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
