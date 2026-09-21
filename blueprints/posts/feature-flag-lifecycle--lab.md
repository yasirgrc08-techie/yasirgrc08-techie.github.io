# Feature Flags Need an Exit / Build and Validate

By Yasir Sharfi

## The Idea

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

## Visual Blueprint

1. **Add one rollout flag**: Gate a synthetic behavior with explicit owner and removal date.
2. **Choose a safe default**: Simulate unavailable configuration and verify fallback behavior.
3. **Keep assignment stable**: Confirm the same synthetic identity stays in its cohort.
4. **Test data compatibility**: Write under both paths and read through both supported versions.
5. **Exercise the kill path**: Disable the behavior during a controlled failure.
6. **Remove the flag**: Delete the obsolete branch and rerun the original behavior tests.

## Caption

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

1. Add one rollout flag
Gate a synthetic behavior with explicit owner and removal date.

2. Choose a safe default
Simulate unavailable configuration and verify fallback behavior.

3. Keep assignment stable
Confirm the same synthetic identity stays in its cohort.

4. Test data compatibility
Write under both paths and read through both supported versions.

5. Exercise the kill path
Disable the behavior during a controlled failure.

6. Remove the flag
Delete the obsolete branch and rerun the original behavior tests.

The takeaway: A flag needs a purpose, safe fallback, owner, and retirement plan.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #featureflags #experimentation

## Reel Storyboard

Suggested duration: about 34 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A temporary flag can become permanent production complexity.

- **0:04-0:08** / Reveal step 1: Add one rollout flag
  Narration: Gate a synthetic behavior with explicit owner and removal date.

- **0:08-0:11** / Reveal step 2: Choose a safe default
  Narration: Simulate unavailable configuration and verify fallback behavior.

- **0:11-0:15** / Reveal step 3: Keep assignment stable
  Narration: Confirm the same synthetic identity stays in its cohort.

- **0:15-0:19** / Reveal step 4: Test data compatibility
  Narration: Write under both paths and read through both supported versions.

- **0:19-0:22** / Reveal step 5: Exercise the kill path
  Narration: Disable the behavior during a controlled failure.

- **0:22-0:26** / Reveal step 6: Remove the flag
  Narration: Delete the obsolete branch and rerun the original behavior tests.

- **0:26-0:34** / Takeaway and discussion prompt
  Narration: A flag needs a purpose, safe fallback, owner, and retirement plan. How would you reproduce this with synthetic data?

## References

- [OpenFeature specification](https://openfeature.dev/specification/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
