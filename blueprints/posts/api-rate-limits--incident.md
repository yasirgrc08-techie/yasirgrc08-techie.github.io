# Rate Limits That Protect Work / Failure and Recovery

By Yasir Sharfi

## The Idea

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

## Visual Blueprint

1. **Observe unfair slowdown**: A heavy tenant delays unrelated users even though aggregate request rate appears normal.
2. **Group by workload**: Compare endpoint cost, tenant demand, request duration, and active concurrency.
3. **Protect essential work**: Shed or defer lower-priority work while keeping health and recovery paths available.
4. **Fix the quota key**: Check for shared-IP collisions or unauthenticated identifiers that users can rotate freely.
5. **Tune with traces**: Test burst and steady-state behavior against representative cheap and expensive operations.
6. **Validate failure behavior**: Disable the quota dependency in a test environment and verify the chosen fallback policy.

## Caption

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

1. Observe unfair slowdown
A heavy tenant delays unrelated users even though aggregate request rate appears normal.

2. Group by workload
Compare endpoint cost, tenant demand, request duration, and active concurrency.

3. Protect essential work
Shed or defer lower-priority work while keeping health and recovery paths available.

4. Fix the quota key
Check for shared-IP collisions or unauthenticated identifiers that users can rotate freely.

5. Tune with traces
Test burst and steady-state behavior against representative cheap and expensive operations.

6. Validate failure behavior
Disable the quota dependency in a test environment and verify the chosen fallback policy.

The takeaway: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #ratelimiting #fairness

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One cheap request and one expensive request should not always cost the same quota.

- **0:06-0:12** / Reveal step 1: Observe unfair slowdown
  Narration: A heavy tenant delays unrelated users even though aggregate request rate appears normal.

- **0:12-0:16** / Reveal step 2: Group by workload
  Narration: Compare endpoint cost, tenant demand, request duration, and active concurrency.

- **0:16-0:21** / Reveal step 3: Protect essential work
  Narration: Shed or defer lower-priority work while keeping health and recovery paths available.

- **0:21-0:26** / Reveal step 4: Fix the quota key
  Narration: Check for shared-IP collisions or unauthenticated identifiers that users can rotate freely.

- **0:26-0:31** / Reveal step 5: Tune with traces
  Narration: Test burst and steady-state behavior against representative cheap and expensive operations.

- **0:31-0:37** / Reveal step 6: Validate failure behavior
  Narration: Disable the quota dependency in a test environment and verify the chosen fallback policy.

- **0:37-0:46** / Takeaway and discussion prompt
  Narration: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation. What evidence would disprove your first diagnosis?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
