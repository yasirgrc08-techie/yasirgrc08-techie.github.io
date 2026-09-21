# Rate Limits That Protect Work / Build and Validate

By Yasir Sharfi

## The Idea

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

## Visual Blueprint

1. **Create two tenants**: Use synthetic clients with separate identities and different endpoint costs.
2. **Set explicit budgets**: Define burst capacity, refill rate, and maximum in-flight work for each class.
3. **Run a noisy neighbor**: Drive one tenant beyond its budget while keeping the other client's workload steady.
4. **Measure isolation**: Compare the protected client's latency and completion rate before and during overload.
5. **Remove the limiter**: Simulate a dependency outage and observe the documented fail-open or fail-closed behavior.
6. **Check client recovery**: Verify retry hints and bounded backoff rather than immediate synchronized retry loops.

## Caption

One cheap request and one expensive request should not always cost the same quota.

Assume a multi-tenant API with interactive and batch work. Fairness, burst tolerance, and total resource protection are separate controls.

1. Create two tenants
Use synthetic clients with separate identities and different endpoint costs.

2. Set explicit budgets
Define burst capacity, refill rate, and maximum in-flight work for each class.

3. Run a noisy neighbor
Drive one tenant beyond its budget while keeping the other client's workload steady.

4. Measure isolation
Compare the protected client's latency and completion rate before and during overload.

5. Remove the limiter
Simulate a dependency outage and observe the documented fail-open or fail-closed behavior.

6. Check client recovery
Verify retry hints and bounded backoff rather than immediate synchronized retry loops.

The takeaway: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #ratelimiting #fairness

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: One cheap request and one expensive request should not always cost the same quota.

- **0:06-0:10** / Reveal step 1: Create two tenants
  Narration: Use synthetic clients with separate identities and different endpoint costs.

- **0:10-0:15** / Reveal step 2: Set explicit budgets
  Narration: Define burst capacity, refill rate, and maximum in-flight work for each class.

- **0:15-0:21** / Reveal step 3: Run a noisy neighbor
  Narration: Drive one tenant beyond its budget while keeping the other client's workload steady.

- **0:21-0:26** / Reveal step 4: Measure isolation
  Narration: Compare the protected client's latency and completion rate before and during overload.

- **0:26-0:31** / Reveal step 5: Remove the limiter
  Narration: Simulate a dependency outage and observe the documented fail-open or fail-closed behavior.

- **0:31-0:36** / Reveal step 6: Check client recovery
  Narration: Verify retry hints and bounded backoff rather than immediate synchronized retry loops.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: Limit the scarce resource and preserve tenant fairness; request counts are only one approximation. How would you reproduce this with synthetic data?

## References

- [Google SRE handling overload](https://sre.google/sre-book/handling-overload/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
