# Backend API Scaling / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

## Visual Blueprint

1. **Trace one request**: Measure time in the API, connection queue, database, and downstream calls before choosing a scaling tool.
2. **Bound database demand**: Limit connection pools and expensive queries so more API workers cannot overwhelm the database.
3. **Cache a proven hot read**: Cache repeatable reads with an explicit freshness budget, invalidation policy, and uncached fallback.
4. **Make replicas stateless**: Move shared session state out of process before distributing traffic across healthy API instances.
5. **Defer suitable work**: Queue work that need not finish in the request, with idempotency, bounded retries, and visible job status.
6. **Partition only with evidence**: Consider data partitioning after query, capacity, and contention evidence shows the remaining limit.

## Caption

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

1. Trace one request
Measure time in the API, connection queue, database, and downstream calls before choosing a scaling tool.

2. Bound database demand
Limit connection pools and expensive queries so more API workers cannot overwhelm the database.

3. Cache a proven hot read
Cache repeatable reads with an explicit freshness budget, invalidation policy, and uncached fallback.

4. Make replicas stateless
Move shared session state out of process before distributing traffic across healthy API instances.

5. Defer suitable work
Queue work that need not finish in the request, with idempotency, bounded retries, and visible job status.

6. Partition only with evidence
Consider data partitioning after query, capacity, and contention evidence shows the remaining limit.

The takeaway: Scale the measured bottleneck. A million registered users is not a capacity specification.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #backend #api #postgresql

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Your API can be slow while its CPU looks almost idle.

- **0:05-0:12** / Reveal step 1: Trace one request
  Narration: Measure time in the API, connection queue, database, and downstream calls before choosing a scaling tool.

- **0:12-0:18** / Reveal step 2: Bound database demand
  Narration: Limit connection pools and expensive queries so more API workers cannot overwhelm the database.

- **0:18-0:24** / Reveal step 3: Cache a proven hot read
  Narration: Cache repeatable reads with an explicit freshness budget, invalidation policy, and uncached fallback.

- **0:24-0:30** / Reveal step 4: Make replicas stateless
  Narration: Move shared session state out of process before distributing traffic across healthy API instances.

- **0:30-0:37** / Reveal step 5: Defer suitable work
  Narration: Queue work that need not finish in the request, with idempotency, bounded retries, and visible job status.

- **0:37-0:43** / Reveal step 6: Partition only with evidence
  Narration: Consider data partitioning after query, capacity, and contention evidence shows the remaining limit.

- **0:43-0:51** / Takeaway and discussion prompt
  Narration: Scale the measured bottleneck. A million registered users is not a capacity specification. Which bottleneck would you measure first?

## References

- [PostgreSQL performance tips](https://www.postgresql.org/docs/current/performance-tips.html)
- [Google SRE: handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
