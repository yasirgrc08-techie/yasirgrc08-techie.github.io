# Stop the Cache Stampede / Decision Guide

By Yasir Sharfi

## The Idea

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

## Visual Blueprint

1. **Single-flight loading**: Use in-process coalescing when one node receives many requests for the same missing value.
2. **Trade-off / Single-flight loading**: Other nodes can still stampede; the scope of coalescing must match the workload.
3. **Distributed refresh lease**: Use a bounded shared lease when refresh coordination spans nodes.
4. **Trade-off / Distributed refresh lease**: Lease ownership, expiry, and safe release need careful handling during pauses and crashes.
5. **Stale-while-revalidate**: Use bounded stale serving for data whose correctness contract permits it.
6. **Trade-off / Stale-while-revalidate**: Do not serve revoked permissions or other freshness-critical data merely to preserve availability.

## Caption

One expired hot key can send thousands of identical reads to your database.

A popular value expires while many requests arrive together. Protect the source and define whether serving an older value is allowed.

1. Single-flight loading
Use in-process coalescing when one node receives many requests for the same missing value.

2. Trade-off / Single-flight loading
Other nodes can still stampede; the scope of coalescing must match the workload.

3. Distributed refresh lease
Use a bounded shared lease when refresh coordination spans nodes.

4. Trade-off / Distributed refresh lease
Lease ownership, expiry, and safe release need careful handling during pauses and crashes.

5. Stale-while-revalidate
Use bounded stale serving for data whose correctness contract permits it.

6. Trade-off / Stale-while-revalidate
Do not serve revoked permissions or other freshness-critical data merely to preserve availability.

The takeaway: Protect the source during misses; a cache is most dangerous when it suddenly stops helping.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #cache #stampede #concurrency

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One expired hot key can send thousands of identical reads to your database.

- **0:06-0:12** / Reveal step 1: Single-flight loading
  Narration: Use in-process coalescing when one node receives many requests for the same missing value.

- **0:12-0:18** / Reveal step 2: Trade-off / Single-flight loading
  Narration: Other nodes can still stampede; the scope of coalescing must match the workload.

- **0:18-0:22** / Reveal step 3: Distributed refresh lease
  Narration: Use a bounded shared lease when refresh coordination spans nodes.

- **0:22-0:28** / Reveal step 4: Trade-off / Distributed refresh lease
  Narration: Lease ownership, expiry, and safe release need careful handling during pauses and crashes.

- **0:28-0:33** / Reveal step 5: Stale-while-revalidate
  Narration: Use bounded stale serving for data whose correctness contract permits it.

- **0:33-0:39** / Reveal step 6: Trade-off / Stale-while-revalidate
  Narration: Do not serve revoked permissions or other freshness-critical data merely to preserve availability.

- **0:39-0:48** / Takeaway and discussion prompt
  Narration: Protect the source during misses; a cache is most dangerous when it suddenly stops helping. Which constraint would change your choice?

## References

- [AWS caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
