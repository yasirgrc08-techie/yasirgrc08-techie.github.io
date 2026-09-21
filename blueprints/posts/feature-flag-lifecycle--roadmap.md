# Feature Flags Need an Exit / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

## Visual Blueprint

1. **Name the purpose**: Distinguish rollout, experiment, operational kill switch, and long-lived entitlement.
2. **Assign an owner and expiry**: Record who removes or reviews the flag and when.
3. **Define safe defaults**: Choose behavior when flag evaluation is unavailable or delayed.
4. **Keep cohorts stable**: Use deterministic assignment when users need a consistent experience.
5. **Test both paths**: Exercise enabled, disabled, and evaluation-failure behavior.
6. **Remove completed rollouts**: Delete obsolete branches and configuration after the rollback window closes.

## Caption

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

1. Name the purpose
Distinguish rollout, experiment, operational kill switch, and long-lived entitlement.

2. Assign an owner and expiry
Record who removes or reviews the flag and when.

3. Define safe defaults
Choose behavior when flag evaluation is unavailable or delayed.

4. Keep cohorts stable
Use deterministic assignment when users need a consistent experience.

5. Test both paths
Exercise enabled, disabled, and evaluation-failure behavior.

6. Remove completed rollouts
Delete obsolete branches and configuration after the rollback window closes.

The takeaway: A flag needs a purpose, safe fallback, owner, and retirement plan.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #featureflags #experimentation

## Reel Storyboard

Suggested duration: about 34 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A temporary flag can become permanent production complexity.

- **0:04-0:08** / Reveal step 1: Name the purpose
  Narration: Distinguish rollout, experiment, operational kill switch, and long-lived entitlement.

- **0:08-0:12** / Reveal step 2: Assign an owner and expiry
  Narration: Record who removes or reviews the flag and when.

- **0:12-0:16** / Reveal step 3: Define safe defaults
  Narration: Choose behavior when flag evaluation is unavailable or delayed.

- **0:16-0:20** / Reveal step 4: Keep cohorts stable
  Narration: Use deterministic assignment when users need a consistent experience.

- **0:20-0:23** / Reveal step 5: Test both paths
  Narration: Exercise enabled, disabled, and evaluation-failure behavior.

- **0:23-0:27** / Reveal step 6: Remove completed rollouts
  Narration: Delete obsolete branches and configuration after the rollback window closes.

- **0:27-0:34** / Takeaway and discussion prompt
  Narration: A flag needs a purpose, safe fallback, owner, and retirement plan. Which bottleneck would you measure first?

## References

- [OpenFeature specification](https://openfeature.dev/specification/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
