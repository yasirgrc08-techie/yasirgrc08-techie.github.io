# Rollouts Need Stop Conditions / Metrics That Matter

By Yasir Sharfi

## The Idea

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

## Visual Blueprint

1. **Relative error change**: Compare candidate and baseline errors for the same request class.
2. **Interpret / Relative error change**: A low total error count can hide a large regression in a small important cohort.
3. **Tail latency difference**: Compare distributions under similar traffic and dependency conditions.
4. **Interpret / Tail latency difference**: Different request mixes can make one version look better without any real improvement.
5. **Correctness signals**: Monitor invariants, output differences, and business outcomes where measurable.
6. **Interpret / Correctness signals**: Healthy CPU and HTTP status codes cannot prove the new behavior is correct.

## Caption

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

1. Relative error change
Compare candidate and baseline errors for the same request class.

2. Interpret / Relative error change
A low total error count can hide a large regression in a small important cohort.

3. Tail latency difference
Compare distributions under similar traffic and dependency conditions.

4. Interpret / Tail latency difference
Different request mixes can make one version look better without any real improvement.

5. Correctness signals
Monitor invariants, output differences, and business outcomes where measurable.

6. Interpret / Correctness signals
Healthy CPU and HTTP status codes cannot prove the new behavior is correct.

The takeaway: Progressive delivery works only when the cohort, signals, and recovery path are meaningful.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #canary #rollout

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A deployment is not safe merely because only a small percentage sees it first.

- **0:06-0:10** / Reveal step 1: Relative error change
  Narration: Compare candidate and baseline errors for the same request class.

- **0:10-0:16** / Reveal step 2: Interpret / Relative error change
  Narration: A low total error count can hide a large regression in a small important cohort.

- **0:16-0:20** / Reveal step 3: Tail latency difference
  Narration: Compare distributions under similar traffic and dependency conditions.

- **0:20-0:26** / Reveal step 4: Interpret / Tail latency difference
  Narration: Different request mixes can make one version look better without any real improvement.

- **0:26-0:30** / Reveal step 5: Correctness signals
  Narration: Monitor invariants, output differences, and business outcomes where measurable.

- **0:30-0:36** / Reveal step 6: Interpret / Correctness signals
  Narration: Healthy CPU and HTTP status codes cannot prove the new behavior is correct.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: Progressive delivery works only when the cohort, signals, and recovery path are meaningful. Which metric could look healthy while users suffer?

## References

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
