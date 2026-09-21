# Design a Rate Limiter You Can Defend / Learning Roadmap

By Yasir Sharfi

## The Idea

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

## Visual Blueprint

1. **Build the mental model**: Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.
2. **Phase 1 / Sessions 1-3**: Define limit keys, request costs, burst allowance, response behavior, and scope.
3. **Phase 2 / Sessions 4-6**: Implement refill-and-consume as one protected operation.
4. **Phase 3 / Sessions 7-9**: Choose shared state, regional budgets, or local approximation. Analyze hot keys, expiration, missing identity, and the failure of the state store.
5. **Phase 4 / Sessions 10-12**: Measure accepted/rejected counts, limiter latency, state-store load, and tenant fairness. Add safe configuration rollout and test key cardinality.
6. **Prove readiness**: Identity, cost, time horizon, and burst semantics are explicit.

## Caption

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

1. Build the mental model
Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.

2. Phase 1 / Sessions 1-3
Define limit keys, request costs, burst allowance, response behavior, and scope.

3. Phase 2 / Sessions 4-6
Implement refill-and-consume as one protected operation.

4. Phase 3 / Sessions 7-9
Choose shared state, regional budgets, or local approximation. Analyze hot keys, expiration, missing identity, and the failure of the state store.

5. Phase 4 / Sessions 10-12
Measure accepted/rejected counts, limiter latency, state-store load, and tenant fairness. Add safe configuration rollout and test key cardinality.

6. Prove readiness
Identity, cost, time horizon, and burst semantics are explicit.

The takeaway: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #rate #limiter

## Reel Storyboard

Suggested duration: about 51 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a rate limit the same as a concurrency limit?

- **0:04-0:10** / Reveal step 1: Build the mental model
  Narration: Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.

- **0:10-0:15** / Reveal step 2: Phase 1 / Sessions 1-3
  Narration: Define limit keys, request costs, burst allowance, response behavior, and scope.

- **0:15-0:18** / Reveal step 3: Phase 2 / Sessions 4-6
  Narration: Implement refill-and-consume as one protected operation.

- **0:18-0:27** / Reveal step 4: Phase 3 / Sessions 7-9
  Narration: Choose shared state, regional budgets, or local approximation. Analyze hot keys, expiration, missing identity, and the failure of the state store.

- **0:27-0:35** / Reveal step 5: Phase 4 / Sessions 10-12
  Narration: Measure accepted/rejected counts, limiter latency, state-store load, and tenant fairness. Add safe configuration rollout and test key cardinality.

- **0:35-0:39** / Reveal step 6: Prove readiness
  Narration: Identity, cost, time horizon, and burst semantics are explicit.

- **0:39-0:51** / Takeaway and discussion prompt
  Narration: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock. Which bottleneck would you measure first?

## References

- [Design a Rate Limiter You Can Defend / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rate-limiter-design)
- [Azure rate limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
- [Redis rate limiter patterns](https://redis.io/docs/latest/commands/incr/)
- [RFC 6585: additional HTTP status codes](https://www.rfc-editor.org/rfc/rfc6585)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
