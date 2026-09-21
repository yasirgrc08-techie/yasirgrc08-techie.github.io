# Stop the Cache Stampede / Metrics That Matter

By Yasir Sharfi

## The Idea

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

## Visual Blueprint

1. **Loads per miss wave**: Count source loads triggered by one logical missing-key interval.
2. **Interpret / Loads per miss wave**: A good aggregate hit ratio can still hide a devastating periodic stampede.
3. **Refresh wait time**: Measure how long followers wait for the elected loader.
4. **Interpret / Refresh wait time**: Coalescing can turn source overload into a long wait unless deadlines remain bounded.
5. **Stale responses served**: Count responses served from an intentionally stale value and their age.
6. **Interpret / Stale responses served**: Stale serving is a product trade-off that must be visible, not a hidden fallback.

## Caption

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

1. Loads per miss wave
Count source loads triggered by one logical missing-key interval.

2. Interpret / Loads per miss wave
A good aggregate hit ratio can still hide a devastating periodic stampede.

3. Refresh wait time
Measure how long followers wait for the elected loader.

4. Interpret / Refresh wait time
Coalescing can turn source overload into a long wait unless deadlines remain bounded.

5. Stale responses served
Count responses served from an intentionally stale value and their age.

6. Interpret / Stale responses served
Stale serving is a product trade-off that must be visible, not a hidden fallback.

The takeaway: Protect the source during misses; a cache is most dangerous when it suddenly stops helping.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #stampede #concurrency

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One expired hot key can send thousands of identical reads to your database.

- **0:06-0:10** / Reveal step 1: Loads per miss wave
  Narration: Count source loads triggered by one logical missing-key interval.

- **0:10-0:15** / Reveal step 2: Interpret / Loads per miss wave
  Narration: A good aggregate hit ratio can still hide a devastating periodic stampede.

- **0:15-0:19** / Reveal step 3: Refresh wait time
  Narration: Measure how long followers wait for the elected loader.

- **0:19-0:25** / Reveal step 4: Interpret / Refresh wait time
  Narration: Coalescing can turn source overload into a long wait unless deadlines remain bounded.

- **0:25-0:30** / Reveal step 5: Stale responses served
  Narration: Count responses served from an intentionally stale value and their age.

- **0:30-0:36** / Reveal step 6: Interpret / Stale responses served
  Narration: Stale serving is a product trade-off that must be visible, not a hidden fallback.

- **0:36-0:46** / Takeaway and discussion prompt
  Narration: Protect the source during misses; a cache is most dangerous when it suddenly stops helping. Which metric could look healthy while users suffer?

## References

- [AWS caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
