# Backend API Scaling / Metrics That Matter

By Yasir Sharfi

## The Idea

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

## Visual Blueprint

1. **Tail latency**: Track p95 and p99 request latency by route and outcome, not just the service-wide average.
2. **Interpret / Tail latency**: Compare latency with request rate and timeout counts; rejected requests can make the average look better.
3. **Connection wait**: Measure time waiting to acquire a database connection separately from time executing a query.
4. **Interpret / Connection wait**: A full pool may indicate slow queries or excessive concurrency, not a need for unlimited connections.
5. **In-flight requests**: Track active requests and queue depth alongside arrival rate to see whether work is accumulating.
6. **Interpret / In-flight requests**: Longer service times increase concurrency at the same arrival rate; bound queues before memory is exhausted.

## Caption

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

1. Tail latency
Track p95 and p99 request latency by route and outcome, not just the service-wide average.

2. Interpret / Tail latency
Compare latency with request rate and timeout counts; rejected requests can make the average look better.

3. Connection wait
Measure time waiting to acquire a database connection separately from time executing a query.

4. Interpret / Connection wait
A full pool may indicate slow queries or excessive concurrency, not a need for unlimited connections.

5. In-flight requests
Track active requests and queue depth alongside arrival rate to see whether work is accumulating.

6. Interpret / In-flight requests
Longer service times increase concurrency at the same arrival rate; bound queues before memory is exhausted.

The takeaway: Scale the measured bottleneck. A million registered users is not a capacity specification.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #backend #api #postgresql

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Your API can be slow while its CPU looks almost idle.

- **0:05-0:11** / Reveal step 1: Tail latency
  Narration: Track p95 and p99 request latency by route and outcome, not just the service-wide average.

- **0:11-0:18** / Reveal step 2: Interpret / Tail latency
  Narration: Compare latency with request rate and timeout counts; rejected requests can make the average look better.

- **0:18-0:24** / Reveal step 3: Connection wait
  Narration: Measure time waiting to acquire a database connection separately from time executing a query.

- **0:24-0:31** / Reveal step 4: Interpret / Connection wait
  Narration: A full pool may indicate slow queries or excessive concurrency, not a need for unlimited connections.

- **0:31-0:37** / Reveal step 5: In-flight requests
  Narration: Track active requests and queue depth alongside arrival rate to see whether work is accumulating.

- **0:37-0:44** / Reveal step 6: Interpret / In-flight requests
  Narration: Longer service times increase concurrency at the same arrival rate; bound queues before memory is exhausted.

- **0:44-0:53** / Takeaway and discussion prompt
  Narration: Scale the measured bottleneck. A million registered users is not a capacity specification. Which metric could look healthy while users suffer?

## References

- [PostgreSQL performance tips](https://www.postgresql.org/docs/current/performance-tips.html)
- [Google SRE: handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
