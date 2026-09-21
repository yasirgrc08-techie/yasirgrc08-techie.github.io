# Backend API Scaling / Build and Validate

By Yasir Sharfi

## The Idea

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

## Visual Blueprint

1. **Define the workload**: Create synthetic read and write routes with fixed payload ranges and a reproducible database fixture.
2. **Capture a baseline**: Record throughput, p99 latency, errors, pool wait, and database utilization at several concurrency levels.
3. **Inject one bottleneck**: Slow one query or downstream call while holding the client request mix constant.
4. **Change one control**: Try a bounded pool or cache for the affected route and document the behavior when that control fails.
5. **Check correctness**: Verify writes, stale-read behavior, retries, and duplicate requests, not merely the best throughput number.
6. **Publish the evidence**: Save the fixture, workload, charts, limiting resource, and rollback rule so another engineer can reproduce it.

## Caption

Your API can be slow while its CPU looks almost idle.

Assume a read-heavy JSON API backed by PostgreSQL. Requests per second, concurrency, query cost, and tail latency matter more than registered-user counts.

1. Define the workload
Create synthetic read and write routes with fixed payload ranges and a reproducible database fixture.

2. Capture a baseline
Record throughput, p99 latency, errors, pool wait, and database utilization at several concurrency levels.

3. Inject one bottleneck
Slow one query or downstream call while holding the client request mix constant.

4. Change one control
Try a bounded pool or cache for the affected route and document the behavior when that control fails.

5. Check correctness
Verify writes, stale-read behavior, retries, and duplicate requests, not merely the best throughput number.

6. Publish the evidence
Save the fixture, workload, charts, limiting resource, and rollback rule so another engineer can reproduce it.

The takeaway: Scale the measured bottleneck. A million registered users is not a capacity specification.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #backend #api #postgresql

## Reel Storyboard

Suggested duration: about 53 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Your API can be slow while its CPU looks almost idle.

- **0:05-0:11** / Reveal step 1: Define the workload
  Narration: Create synthetic read and write routes with fixed payload ranges and a reproducible database fixture.

- **0:11-0:17** / Reveal step 2: Capture a baseline
  Narration: Record throughput, p99 latency, errors, pool wait, and database utilization at several concurrency levels.

- **0:17-0:23** / Reveal step 3: Inject one bottleneck
  Narration: Slow one query or downstream call while holding the client request mix constant.

- **0:23-0:31** / Reveal step 4: Change one control
  Narration: Try a bounded pool or cache for the affected route and document the behavior when that control fails.

- **0:31-0:37** / Reveal step 5: Check correctness
  Narration: Verify writes, stale-read behavior, retries, and duplicate requests, not merely the best throughput number.

- **0:37-0:44** / Reveal step 6: Publish the evidence
  Narration: Save the fixture, workload, charts, limiting resource, and rollback rule so another engineer can reproduce it.

- **0:44-0:53** / Takeaway and discussion prompt
  Narration: Scale the measured bottleneck. A million registered users is not a capacity specification. How would you reproduce this with synthetic data?

## References

- [PostgreSQL performance tips](https://www.postgresql.org/docs/current/performance-tips.html)
- [Google SRE: handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
