# Design a Rate Limiter You Can Defend / Build and Validate

By Yasir Sharfi

## The Idea

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

## Visual Blueprint

1. **Set up the scenario**: A bucket has capacity 10 tokens and refills at 2 tokens/second. Each request costs one token.
2. **Experiment 1**: At time zero, at most 10 one-token requests should succeed.
3. **Experiment 2**: After 0.5 seconds, one token has replenished, so one additional request can succeed under this idealized timeline.
4. **Experiment 3**: Repeat the test through two simulated gateways.
5. **Expected evidence**: The trace demonstrates burst and refill semantics, while the concurrency test exposes the true enforcement boundary.
6. **Check the result**: Can two requests consume the same remaining token?

## Caption

Is a rate limit the same as a concurrency limit?

A rate limiter enforces a policy over an identity, resource, and time horizon. Fixed windows, sliding windows, and token buckets implement different semantics. Choose the behavior first, then reason about concurrency, regional limits, hot keys, clock behavior, and dependency failures.

1. Set up the scenario
A bucket has capacity 10 tokens and refills at 2 tokens/second. Each request costs one token.

2. Experiment 1
At time zero, at most 10 one-token requests should succeed.

3. Experiment 2
After 0.5 seconds, one token has replenished, so one additional request can succeed under this idealized timeline.

4. Experiment 3
Repeat the test through two simulated gateways.

5. Expected evidence
The trace demonstrates burst and refill semantics, while the concurrency test exposes the true enforcement boundary.

6. Check the result
Can two requests consume the same remaining token?

The takeaway: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #SystemDesign #learning #rate #limiter

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Is a rate limit the same as a concurrency limit?

- **0:04-0:11** / Reveal step 1: Set up the scenario
  Narration: A bucket has capacity 10 tokens and refills at 2 tokens/second. Each request costs one token.

- **0:11-0:15** / Reveal step 2: Experiment 1
  Narration: At time zero, at most 10 one-token requests should succeed.

- **0:15-0:22** / Reveal step 3: Experiment 2
  Narration: After 0.5 seconds, one token has replenished, so one additional request can succeed under this idealized timeline.

- **0:22-0:25** / Reveal step 4: Experiment 3
  Narration: Repeat the test through two simulated gateways.

- **0:25-0:32** / Reveal step 5: Expected evidence
  Narration: The trace demonstrates burst and refill semantics, while the concurrency test exposes the true enforcement boundary.

- **0:32-0:36** / Reveal step 6: Check the result
  Narration: Can two requests consume the same remaining token?

- **0:36-0:48** / Takeaway and discussion prompt
  Narration: Write a policy in plain language and derive the algorithm from it. Simulate boundary times and concurrent arrivals with a controllable clock. How would you reproduce this with synthetic data?

## References

- [Design a Rate Limiter You Can Defend / full public guide](https://yasirgrc08-techie.github.io/guides/?guide=rate-limiter-design)
- [Azure rate limiting pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/rate-limiting-pattern)
- [Redis rate limiter patterns](https://redis.io/docs/latest/commands/incr/)
- [RFC 6585: additional HTTP status codes](https://www.rfc-editor.org/rfc/rfc6585)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
