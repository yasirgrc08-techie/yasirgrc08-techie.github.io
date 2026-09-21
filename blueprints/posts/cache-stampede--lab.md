# Stop the Cache Stampede / Build and Validate

By Yasir Sharfi

## The Idea

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

## Visual Blueprint

1. **Create a slow source**: Serve one synthetic expensive value behind a short-lived cache entry.
2. **Synchronize clients**: Release many local clients just after the entry expires.
3. **Count source calls**: Record how many duplicate loads the naive implementation issues.
4. **Add coalescing**: Share one bounded load result across concurrent requests.
5. **Crash the loader**: Verify that waiting requests recover or fail clearly when refresh fails.
6. **Compare the tail**: Measure source amplification, waiting time, errors, and stale exposure together.

## Caption

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

1. Create a slow source
Serve one synthetic expensive value behind a short-lived cache entry.

2. Synchronize clients
Release many local clients just after the entry expires.

3. Count source calls
Record how many duplicate loads the naive implementation issues.

4. Add coalescing
Share one bounded load result across concurrent requests.

5. Crash the loader
Verify that waiting requests recover or fail clearly when refresh fails.

6. Compare the tail
Measure source amplification, waiting time, errors, and stale exposure together.

The takeaway: Protect the source during misses; a cache is most dangerous when it suddenly stops helping.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #stampede #concurrency

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One expired hot key can send thousands of identical reads to your database.

- **0:06-0:10** / Reveal step 1: Create a slow source
  Narration: Serve one synthetic expensive value behind a short-lived cache entry.

- **0:10-0:14** / Reveal step 2: Synchronize clients
  Narration: Release many local clients just after the entry expires.

- **0:14-0:18** / Reveal step 3: Count source calls
  Narration: Record how many duplicate loads the naive implementation issues.

- **0:18-0:22** / Reveal step 4: Add coalescing
  Narration: Share one bounded load result across concurrent requests.

- **0:22-0:27** / Reveal step 5: Crash the loader
  Narration: Verify that waiting requests recover or fail clearly when refresh fails.

- **0:27-0:31** / Reveal step 6: Compare the tail
  Narration: Measure source amplification, waiting time, errors, and stale exposure together.

- **0:31-0:41** / Takeaway and discussion prompt
  Narration: Protect the source during misses; a cache is most dangerous when it suddenly stops helping. How would you reproduce this with synthetic data?

## References

- [AWS caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
