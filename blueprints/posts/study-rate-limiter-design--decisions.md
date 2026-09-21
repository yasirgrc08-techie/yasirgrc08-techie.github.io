# Design a Rate Limiter You Can Defend / Practice Decisions

By Yasir Sharfi

## The Idea

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

## Visual Blueprint

1. **Identity and cost come first**: Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.
2. **Watch for**: Selecting an algorithm before specifying the policy.
3. **Algorithms express different promises**: A fixed window can allow a boundary burst; a strict rolling count is more precise but may store more history.
4. **Watch for**: Using non-atomic read-modify-write for shared counters.
5. **Core consideration 3**: Several gateways updating one key need an atomic shared operation or a deliberate approximate/local-budget design. Global precision costs coordination and latency.
6. **Watch for**: Assuming per-region limits automatically enforce a precise global limit.

## Caption

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

1. Identity and cost come first
Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.

2. Watch for
Selecting an algorithm before specifying the policy.

3. Algorithms express different promises
A fixed window can allow a boundary burst; a strict rolling count is more precise but may store more history.

4. Watch for
Using non-atomic read-modify-write for shared counters.

5. Core consideration 3
Several gateways updating one key need an atomic shared operation or a deliberate approximate/local-budget design. Global precision costs coordination and latency.

6. Watch for
Assuming per-region limits automatically enforce a precise global limit.

The takeaway: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #rate #limiter

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a rate limit the same as a concurrency limit?

- **0:04-0:10** / Reveal step 1: Identity and cost come first
  Narration: Limit by the relevant authenticated tenant, user, API key, endpoint, or another policy key.

- **0:10-0:13** / Reveal step 2: Watch for
  Narration: Selecting an algorithm before specifying the policy.

- **0:13-0:21** / Reveal step 3: Algorithms express different promises
  Narration: A fixed window can allow a boundary burst; a strict rolling count is more precise but may store more history.

- **0:21-0:24** / Reveal step 4: Watch for
  Narration: Using non-atomic read-modify-write for shared counters.

- **0:24-0:33** / Reveal step 5: Core consideration 3
  Narration: Several gateways updating one key need an atomic shared operation or a deliberate approximate/local-budget design. Global precision costs coordination and latency.

- **0:33-0:37** / Reveal step 6: Watch for
  Narration: Assuming per-region limits automatically enforce a precise global limit.

- **0:37-0:49** / Takeaway and discussion prompt
  Narration: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock. Which constraint would change your choice?

## References

- [Design a Rate Limiter You Can Defend / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rate-limiter-design)
- [Azure rate limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
- [Redis rate limiter patterns](https://redis.io/docs/latest/commands/incr/)
- [RFC 6585: additional HTTP status codes](https://www.rfc-editor.org/rfc/rfc6585)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
