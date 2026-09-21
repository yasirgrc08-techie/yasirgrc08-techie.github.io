# Feature Flags Need an Exit / Failure and Recovery

By Yasir Sharfi

## The Idea

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

## Visual Blueprint

1. **Identify a flag-dependent failure**: Only one cohort or flag combination exhibits the regression.
2. **Check evaluated values**: Compare actual evaluation with intended configuration and propagation timing.
3. **Use the safe fallback**: Disable the behavior only if the alternative path is known to be viable.
4. **Watch data compatibility**: Confirm data written under the enabled path remains readable.
5. **Test dependency loss**: Exercise unavailable flag service and stale configuration.
6. **Retire the stale branch**: After resolution, remove unnecessary combinations and update ownership.

## Caption

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

1. Identify a flag-dependent failure
Only one cohort or flag combination exhibits the regression.

2. Check evaluated values
Compare actual evaluation with intended configuration and propagation timing.

3. Use the safe fallback
Disable the behavior only if the alternative path is known to be viable.

4. Watch data compatibility
Confirm data written under the enabled path remains readable.

5. Test dependency loss
Exercise unavailable flag service and stale configuration.

6. Retire the stale branch
After resolution, remove unnecessary combinations and update ownership.

The takeaway: A flag needs a purpose, safe fallback, owner, and retirement plan.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #featureflags #experimentation

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A temporary flag can become permanent production complexity.

- **0:04-0:08** / Reveal step 1: Identify a flag-dependent failure
  Narration: Only one cohort or flag combination exhibits the regression.

- **0:08-0:12** / Reveal step 2: Check evaluated values
  Narration: Compare actual evaluation with intended configuration and propagation timing.

- **0:12-0:18** / Reveal step 3: Use the safe fallback
  Narration: Disable the behavior only if the alternative path is known to be viable.

- **0:18-0:22** / Reveal step 4: Watch data compatibility
  Narration: Confirm data written under the enabled path remains readable.

- **0:22-0:25** / Reveal step 5: Test dependency loss
  Narration: Exercise unavailable flag service and stale configuration.

- **0:25-0:29** / Reveal step 6: Retire the stale branch
  Narration: After resolution, remove unnecessary combinations and update ownership.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: A flag needs a purpose, safe fallback, owner, and retirement plan. What evidence would disprove your first diagnosis?

## References

- [OpenFeature specification](https://openfeature.dev/specification/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
