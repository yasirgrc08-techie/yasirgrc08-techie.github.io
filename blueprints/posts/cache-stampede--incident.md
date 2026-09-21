# Stop the Cache Stampede / Failure and Recovery

By Yasir Sharfi

## The Idea

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

## Visual Blueprint

1. **Observe the miss burst**: Database demand spikes immediately after a popular cache entry expires.
2. **Confirm duplicated loads**: Correlate source queries with the same logical cache key.
3. **Bound source access**: Limit concurrent refreshes and shed excess work if necessary.
4. **Restore one safe value**: Warm the key or permit bounded stale serving only when authorized by the contract.
5. **Fix refresh coordination**: Add coalescing and a failure-safe refresh lifecycle.
6. **Replay synchronized expiry**: Expire the hot key under controlled concurrent load and measure amplification.

## Caption

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

1. Observe the miss burst
Database demand spikes immediately after a popular cache entry expires.

2. Confirm duplicated loads
Correlate source queries with the same logical cache key.

3. Bound source access
Limit concurrent refreshes and shed excess work if necessary.

4. Restore one safe value
Warm the key or permit bounded stale serving only when authorized by the contract.

5. Fix refresh coordination
Add coalescing and a failure-safe refresh lifecycle.

6. Replay synchronized expiry
Expire the hot key under controlled concurrent load and measure amplification.

The takeaway: Protect the source during misses; a cache is most dangerous when it suddenly stops helping.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #stampede #concurrency

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One expired hot key can send thousands of identical reads to your database.

- **0:06-0:10** / Reveal step 1: Observe the miss burst
  Narration: Database demand spikes immediately after a popular cache entry expires.

- **0:10-0:14** / Reveal step 2: Confirm duplicated loads
  Narration: Correlate source queries with the same logical cache key.

- **0:14-0:18** / Reveal step 3: Bound source access
  Narration: Limit concurrent refreshes and shed excess work if necessary.

- **0:18-0:24** / Reveal step 4: Restore one safe value
  Narration: Warm the key or permit bounded stale serving only when authorized by the contract.

- **0:24-0:27** / Reveal step 5: Fix refresh coordination
  Narration: Add coalescing and a failure-safe refresh lifecycle.

- **0:27-0:32** / Reveal step 6: Replay synchronized expiry
  Narration: Expire the hot key under controlled concurrent load and measure amplification.

- **0:32-0:41** / Takeaway and discussion prompt
  Narration: Protect the source during misses; a cache is most dangerous when it suddenly stops helping. What evidence would disprove your first diagnosis?

## References

- [AWS caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
