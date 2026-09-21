# Rollouts Need Stop Conditions / Decision Guide

By Yasir Sharfi

## The Idea

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

## Visual Blueprint

1. **Rolling update**: Use rolling replacement when compatibility and fast rollback are well understood.
2. **Trade-off / Rolling update**: Old and new versions overlap, so schema and protocol compatibility still matter.
3. **Canary rollout**: Use a canary when representative comparison can detect meaningful regressions.
4. **Trade-off / Canary rollout**: Tiny or biased cohorts can produce reassuring but misleading results.
5. **Blue-green switch**: Use separate environments when fast traffic switching and isolation justify the cost.
6. **Trade-off / Blue-green switch**: Shared databases and background jobs can still couple the two environments.

## Caption

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

1. Rolling update
Use rolling replacement when compatibility and fast rollback are well understood.

2. Trade-off / Rolling update
Old and new versions overlap, so schema and protocol compatibility still matter.

3. Canary rollout
Use a canary when representative comparison can detect meaningful regressions.

4. Trade-off / Canary rollout
Tiny or biased cohorts can produce reassuring but misleading results.

5. Blue-green switch
Use separate environments when fast traffic switching and isolation justify the cost.

6. Trade-off / Blue-green switch
Shared databases and background jobs can still couple the two environments.

The takeaway: Progressive delivery works only when the cohort, signals, and recovery path are meaningful.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #canary #rollout

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A deployment is not safe merely because only a small percentage sees it first.

- **0:06-0:11** / Reveal step 1: Rolling update
  Narration: Use rolling replacement when compatibility and fast rollback are well understood.

- **0:11-0:16** / Reveal step 2: Trade-off / Rolling update
  Narration: Old and new versions overlap, so schema and protocol compatibility still matter.

- **0:16-0:20** / Reveal step 3: Canary rollout
  Narration: Use a canary when representative comparison can detect meaningful regressions.

- **0:20-0:24** / Reveal step 4: Trade-off / Canary rollout
  Narration: Tiny or biased cohorts can produce reassuring but misleading results.

- **0:24-0:29** / Reveal step 5: Blue-green switch
  Narration: Use separate environments when fast traffic switching and isolation justify the cost.

- **0:29-0:34** / Reveal step 6: Trade-off / Blue-green switch
  Narration: Shared databases and background jobs can still couple the two environments.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: Progressive delivery works only when the cohort, signals, and recovery path are meaningful. Which constraint would change your choice?

## References

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
