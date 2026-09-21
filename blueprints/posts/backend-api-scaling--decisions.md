# Backend API Scaling / Decision Guide

By Yasir Sharfi

## The Idea

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

## Visual Blueprint

1. **Add API replicas**: Choose this when request compute is saturated and shared downstream services still have spare capacity.
2. **Trade-off / Add API replicas**: Each replica adds database connections; cap aggregate demand before increasing the replica count.
3. **Add a read cache**: Choose this when repeated reads dominate and the product can tolerate a stated freshness window.
4. **Trade-off / Add a read cache**: Invalidation, hot keys, cold starts, and cache failures become part of your correctness contract.
5. **Introduce a queue**: Choose this when a durable job can complete later and the user can observe its progress.
6. **Trade-off / Introduce a queue**: You now own duplicate handling, retry policy, backlog recovery, and an honest asynchronous API.

## Caption

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

1. Add API replicas
Choose this when request compute is saturated and shared downstream services still have spare capacity.

2. Trade-off / Add API replicas
Each replica adds database connections; cap aggregate demand before increasing the replica count.

3. Add a read cache
Choose this when repeated reads dominate and the product can tolerate a stated freshness window.

4. Trade-off / Add a read cache
Invalidation, hot keys, cold starts, and cache failures become part of your correctness contract.

5. Introduce a queue
Choose this when a durable job can complete later and the user can observe its progress.

6. Trade-off / Introduce a queue
You now own duplicate handling, retry policy, backlog recovery, and an honest asynchronous API.

The takeaway: Scale the measured bottleneck. A million registered users is not a capacity specification.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #backend #api #postgresql

## Reel Storyboard

Suggested duration: about 50 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Your API can be slow while its CPU looks almost idle.

- **0:05-0:11** / Reveal step 1: Add API replicas
  Narration: Choose this when request compute is saturated and shared downstream services still have spare capacity.

- **0:11-0:17** / Reveal step 2: Trade-off / Add API replicas
  Narration: Each replica adds database connections; cap aggregate demand before increasing the replica count.

- **0:17-0:23** / Reveal step 3: Add a read cache
  Narration: Choose this when repeated reads dominate and the product can tolerate a stated freshness window.

- **0:23-0:29** / Reveal step 4: Trade-off / Add a read cache
  Narration: Invalidation, hot keys, cold starts, and cache failures become part of your correctness contract.

- **0:29-0:36** / Reveal step 5: Introduce a queue
  Narration: Choose this when a durable job can complete later and the user can observe its progress.

- **0:36-0:42** / Reveal step 6: Trade-off / Introduce a queue
  Narration: You now own duplicate handling, retry policy, backlog recovery, and an honest asynchronous API.

- **0:42-0:50** / Takeaway and discussion prompt
  Narration: Scale the measured bottleneck. A million registered users is not a capacity specification. Which constraint would change your choice?

## References

- [PostgreSQL performance tips](https://www.postgresql.org/docs/current/performance-tips.html)
- [Google SRE: handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
