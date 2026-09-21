# Feature Flags Need an Exit / Decision Guide

By Yasir Sharfi

## The Idea

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

## Visual Blueprint

1. **Rollout flag**: Use a short-lived flag to limit exposure of a specific change.
2. **Trade-off / Rollout flag**: Leaving both branches indefinitely expands testing and maintenance cost.
3. **Kill switch**: Use an operational flag for a failure mode with a safe fallback.
4. **Trade-off / Kill switch**: The fallback must remain tested and available during the incident.
5. **Entitlement rule**: Use durable authorization or product policy for long-lived access decisions.
6. **Trade-off / Entitlement rule**: A client-visible feature flag is not a substitute for server-side authorization.

## Caption

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

1. Rollout flag
Use a short-lived flag to limit exposure of a specific change.

2. Trade-off / Rollout flag
Leaving both branches indefinitely expands testing and maintenance cost.

3. Kill switch
Use an operational flag for a failure mode with a safe fallback.

4. Trade-off / Kill switch
The fallback must remain tested and available during the incident.

5. Entitlement rule
Use durable authorization or product policy for long-lived access decisions.

6. Trade-off / Entitlement rule
A client-visible feature flag is not a substitute for server-side authorization.

The takeaway: A flag needs a purpose, safe fallback, owner, and retirement plan.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #featureflags #experimentation

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A temporary flag can become permanent production complexity.

- **0:04-0:09** / Reveal step 1: Rollout flag
  Narration: Use a short-lived flag to limit exposure of a specific change.

- **0:09-0:13** / Reveal step 2: Trade-off / Rollout flag
  Narration: Leaving both branches indefinitely expands testing and maintenance cost.

- **0:13-0:18** / Reveal step 3: Kill switch
  Narration: Use an operational flag for a failure mode with a safe fallback.

- **0:18-0:22** / Reveal step 4: Trade-off / Kill switch
  Narration: The fallback must remain tested and available during the incident.

- **0:22-0:26** / Reveal step 5: Entitlement rule
  Narration: Use durable authorization or product policy for long-lived access decisions.

- **0:26-0:31** / Reveal step 6: Trade-off / Entitlement rule
  Narration: A client-visible feature flag is not a substitute for server-side authorization.

- **0:31-0:38** / Takeaway and discussion prompt
  Narration: A flag needs a purpose, safe fallback, owner, and retirement plan. Which constraint would change your choice?

## References

- [OpenFeature specification](https://openfeature.dev/specification/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
