# Design a Rate Limiter You Can Defend / Pitfalls and Checks

By Yasir Sharfi

## The Idea

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

## Visual Blueprint

1. **Trap 1**: Selecting an algorithm before specifying the policy.
2. **Counter-check 1**: Identity, cost, time horizon, and burst semantics are explicit.
3. **Trap 2**: Using non-atomic read-modify-write for shared counters.
4. **Counter-check 2**: Concurrent updates preserve the policy.
5. **Trap 3**: Assuming per-region limits automatically enforce a precise global limit.
6. **Counter-check 3**: Regional and failure behavior are documented.

## Caption

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

1. Trap 1
Selecting an algorithm before specifying the policy.

2. Counter-check 1
Identity, cost, time horizon, and burst semantics are explicit.

3. Trap 2
Using non-atomic read-modify-write for shared counters.

4. Counter-check 2
Concurrent updates preserve the policy.

5. Trap 3
Assuming per-region limits automatically enforce a precise global limit.

6. Counter-check 3
Regional and failure behavior are documented.

The takeaway: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #rate #limiter

## Reel Storyboard

Suggested duration: about 36 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a rate limit the same as a concurrency limit?

- **0:04-0:07** / Reveal step 1: Trap 1
  Narration: Selecting an algorithm before specifying the policy.

- **0:07-0:11** / Reveal step 2: Counter-check 1
  Narration: Identity, cost, time horizon, and burst semantics are explicit.

- **0:11-0:14** / Reveal step 3: Trap 2
  Narration: Using non-atomic read-modify-write for shared counters.

- **0:14-0:17** / Reveal step 4: Counter-check 2
  Narration: Concurrent updates preserve the policy.

- **0:17-0:21** / Reveal step 5: Trap 3
  Narration: Assuming per-region limits automatically enforce a precise global limit.

- **0:21-0:24** / Reveal step 6: Counter-check 3
  Narration: Regional and failure behavior are documented.

- **0:24-0:36** / Takeaway and discussion prompt
  Narration: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock. What evidence would disprove your first diagnosis?

## References

- [Design a Rate Limiter You Can Defend / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rate-limiter-design)
- [Azure rate limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
- [Redis rate limiter patterns](https://redis.io/docs/latest/commands/incr/)
- [RFC 6585: additional HTTP status codes](https://www.rfc-editor.org/rfc/rfc6585)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
