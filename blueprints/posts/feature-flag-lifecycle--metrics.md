# Feature Flags Need an Exit / Metrics That Matter

By Yasir Sharfi

## The Idea

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

## Visual Blueprint

1. **Flag age**: Track temporary flags beyond their planned removal date.
2. **Interpret / Flag age**: Age alone is not a defect for a deliberate kill switch or entitlement policy.
3. **Evaluation failures**: Measure fallback use and configuration propagation delay.
4. **Interpret / Evaluation failures**: A fast local cache can conceal that the current flag configuration is stale.
5. **Cohort outcomes**: Compare behavior by stable cohort and relevant workload.
6. **Interpret / Cohort outcomes**: Changing assignment during a journey can invalidate experiment interpretation.

## Caption

A temporary flag can become permanent production complexity.

Flags control behavior independently of deployment, but add combinations, dependencies, and stale code paths that require ownership.

1. Flag age
Track temporary flags beyond their planned removal date.

2. Interpret / Flag age
Age alone is not a defect for a deliberate kill switch or entitlement policy.

3. Evaluation failures
Measure fallback use and configuration propagation delay.

4. Interpret / Evaluation failures
A fast local cache can conceal that the current flag configuration is stale.

5. Cohort outcomes
Compare behavior by stable cohort and relevant workload.

6. Interpret / Cohort outcomes
Changing assignment during a journey can invalidate experiment interpretation.

The takeaway: A flag needs a purpose, safe fallback, owner, and retirement plan.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #featureflags #experimentation

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: A temporary flag can become permanent production complexity.

- **0:04-0:08** / Reveal step 1: Flag age
  Narration: Track temporary flags beyond their planned removal date.

- **0:08-0:14** / Reveal step 2: Interpret / Flag age
  Narration: Age alone is not a defect for a deliberate kill switch or entitlement policy.

- **0:14-0:17** / Reveal step 3: Evaluation failures
  Narration: Measure fallback use and configuration propagation delay.

- **0:17-0:23** / Reveal step 4: Interpret / Evaluation failures
  Narration: A fast local cache can conceal that the current flag configuration is stale.

- **0:23-0:27** / Reveal step 5: Cohort outcomes
  Narration: Compare behavior by stable cohort and relevant workload.

- **0:27-0:31** / Reveal step 6: Interpret / Cohort outcomes
  Narration: Changing assignment during a journey can invalidate experiment interpretation.

- **0:31-0:39** / Takeaway and discussion prompt
  Narration: A flag needs a purpose, safe fallback, owner, and retirement plan. Which metric could look healthy while users suffer?

## References

- [OpenFeature specification](https://openfeature.dev/specification/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
