# Rollouts Need Stop Conditions / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

## Visual Blueprint

1. **Define the risky change**: Identify affected routes, data contracts, and expected operational signals.
2. **Choose a useful cohort**: Select representative traffic rather than only low-risk internal users.
3. **Establish a comparison**: Compare candidate and baseline under similar workload conditions.
4. **Set stop criteria**: Include errors, latency, correctness, and resource regressions.
5. **Plan data-safe recovery**: Ensure rollback is compatible with writes already produced by the new version.
6. **Promote with evidence**: Expand gradually and keep watching delayed effects after full rollout.

## Caption

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

1. Define the risky change
Identify affected routes, data contracts, and expected operational signals.

2. Choose a useful cohort
Select representative traffic rather than only low-risk internal users.

3. Establish a comparison
Compare candidate and baseline under similar workload conditions.

4. Set stop criteria
Include errors, latency, correctness, and resource regressions.

5. Plan data-safe recovery
Ensure rollback is compatible with writes already produced by the new version.

6. Promote with evidence
Expand gradually and keep watching delayed effects after full rollout.

The takeaway: Progressive delivery works only when the cohort, signals, and recovery path are meaningful.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #canary #rollout

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A deployment is not safe merely because only a small percentage sees it first.

- **0:06-0:10** / Reveal step 1: Define the risky change
  Narration: Identify affected routes, data contracts, and expected operational signals.

- **0:10-0:14** / Reveal step 2: Choose a useful cohort
  Narration: Select representative traffic rather than only low-risk internal users.

- **0:14-0:18** / Reveal step 3: Establish a comparison
  Narration: Compare candidate and baseline under similar workload conditions.

- **0:18-0:21** / Reveal step 4: Set stop criteria
  Narration: Include errors, latency, correctness, and resource regressions.

- **0:21-0:26** / Reveal step 5: Plan data-safe recovery
  Narration: Ensure rollback is compatible with writes already produced by the new version.

- **0:26-0:30** / Reveal step 6: Promote with evidence
  Narration: Expand gradually and keep watching delayed effects after full rollout.

- **0:30-0:38** / Takeaway and discussion prompt
  Narration: Progressive delivery works only when the cohort, signals, and recovery path are meaningful. Which bottleneck would you measure first?

## References

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
