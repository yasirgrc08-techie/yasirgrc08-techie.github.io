# Rate Limits That Protect Work / Decision Guide

By Yasir Sharfi

## The Idea

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

## Visual Blueprint

1. **Token bucket**: Choose a token bucket when bounded bursts are useful and refill semantics can be explained to clients.
2. **Trade-off / Token bucket**: A rate limit alone cannot cap the number of long-running requests already occupying resources.
3. **Concurrency limit**: Choose an in-flight cap when work duration varies and active operations consume scarce resources.
4. **Trade-off / Concurrency limit**: You need clear release behavior for cancellation, crashes, and timed-out requests.
5. **Shared quota service**: Choose shared enforcement when multiple nodes must honor a common tenant budget.
6. **Trade-off / Shared quota service**: Coordination adds latency and failure modes; document approximation and regional behavior.

## Caption

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

1. Token bucket
Choose a token bucket when bounded bursts are useful and refill semantics can be explained to clients.

2. Trade-off / Token bucket
A rate limit alone cannot cap the number of long-running requests already occupying resources.

3. Concurrency limit
Choose an in-flight cap when work duration varies and active operations consume scarce resources.

4. Trade-off / Concurrency limit
You need clear release behavior for cancellation, crashes, and timed-out requests.

5. Shared quota service
Choose shared enforcement when multiple nodes must honor a common tenant budget.

6. Trade-off / Shared quota service
Coordination adds latency and failure modes; document approximation and regional behavior.

The takeaway: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #ratelimiting #fairness

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One cheap request and one expensive request should not always cost the same quota.

- **0:06-0:13** / Reveal step 1: Token bucket
  Narration: Choose a token bucket when bounded bursts are useful and refill semantics can be explained to clients.

- **0:13-0:19** / Reveal step 2: Trade-off / Token bucket
  Narration: A rate limit alone cannot cap the number of long-running requests already occupying resources.

- **0:19-0:25** / Reveal step 3: Concurrency limit
  Narration: Choose an in-flight cap when work duration varies and active operations consume scarce resources.

- **0:25-0:30** / Reveal step 4: Trade-off / Concurrency limit
  Narration: You need clear release behavior for cancellation, crashes, and timed-out requests.

- **0:30-0:35** / Reveal step 5: Shared quota service
  Narration: Choose shared enforcement when multiple nodes must honor a common tenant budget.

- **0:35-0:40** / Reveal step 6: Trade-off / Shared quota service
  Narration: Coordination adds latency and failure modes; document approximation and regional behavior.

- **0:40-0:48** / Takeaway and discussion prompt
  Narration: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation. Which constraint would change your choice?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
