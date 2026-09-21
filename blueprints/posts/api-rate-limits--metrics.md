# Rate Limits That Protect Work / Metrics That Matter

By Yasir Sharfi

## The Idea

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

## Visual Blueprint

1. **Rejected work**: Track rejection by tenant class, endpoint, and reason without high-cardinality sensitive labels.
2. **Interpret / Rejected work**: A rejection spike may mean a healthy protection mechanism is working, not that capacity should always increase.
3. **Active concurrency**: Measure in-flight work and time spent waiting for admission.
4. **Interpret / Active concurrency**: A low arrival rate can still saturate the service when request duration grows.
5. **Useful throughput**: Track successful business work completed within the service objective.
6. **Interpret / Useful throughput**: Counting all accepted requests can reward a system that queues work indefinitely.

## Caption

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

1. Rejected work
Track rejection by tenant class, endpoint, and reason without high-cardinality sensitive labels.

2. Interpret / Rejected work
A rejection spike may mean a healthy protection mechanism is working, not that capacity should always increase.

3. Active concurrency
Measure in-flight work and time spent waiting for admission.

4. Interpret / Active concurrency
A low arrival rate can still saturate the service when request duration grows.

5. Useful throughput
Track successful business work completed within the service objective.

6. Interpret / Useful throughput
Counting all accepted requests can reward a system that queues work indefinitely.

The takeaway: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #ratelimiting #fairness

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One cheap request and one expensive request should not always cost the same quota.

- **0:06-0:11** / Reveal step 1: Rejected work
  Narration: Track rejection by tenant class, endpoint, and reason without high-cardinality sensitive labels.

- **0:11-0:18** / Reveal step 2: Interpret / Rejected work
  Narration: A rejection spike may mean a healthy protection mechanism is working, not that capacity should always increase.

- **0:18-0:22** / Reveal step 3: Active concurrency
  Narration: Measure in-flight work and time spent waiting for admission.

- **0:22-0:28** / Reveal step 4: Interpret / Active concurrency
  Narration: A low arrival rate can still saturate the service when request duration grows.

- **0:28-0:32** / Reveal step 5: Useful throughput
  Narration: Track successful business work completed within the service objective.

- **0:32-0:37** / Reveal step 6: Interpret / Useful throughput
  Narration: Counting all accepted requests can reward a system that queues work indefinitely.

- **0:37-0:46** / Takeaway and discussion prompt
  Narration: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation. Which metric could look healthy while users suffer?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
