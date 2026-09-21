# Rollouts Need Stop Conditions / Failure and Recovery

By Yasir Sharfi

## The Idea

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

## Visual Blueprint

1. **Detect cohort regression**: Candidate traffic shows a meaningful difference from the baseline.
2. **Pause promotion**: Stop increasing exposure while preserving comparison data.
3. **Inspect correctness first**: Check whether new writes or side effects constrain rollback.
4. **Recover deliberately**: Roll back or forward-fix according to the preplanned data contract.
5. **Verify all work classes**: Include background processing and rare routes, not just the main API.
6. **Capture the missing test**: Add the smallest regression case that would have detected the defect earlier.

## Caption

A deployment is not safe merely because only a small percentage sees it first.

A canary is an experiment with a comparison group, representative traffic, and explicit stop or promotion criteria.

1. Detect cohort regression
Candidate traffic shows a meaningful difference from the baseline.

2. Pause promotion
Stop increasing exposure while preserving comparison data.

3. Inspect correctness first
Check whether new writes or side effects constrain rollback.

4. Recover deliberately
Roll back or forward-fix according to the preplanned data contract.

5. Verify all work classes
Include background processing and rare routes, not just the main API.

6. Capture the missing test
Add the smallest regression case that would have detected the defect earlier.

The takeaway: Progressive delivery works only when the cohort, signals, and recovery path are meaningful.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #deployment #canary #rollout

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A deployment is not safe merely because only a small percentage sees it first.

- **0:06-0:10** / Reveal step 1: Detect cohort regression
  Narration: Candidate traffic shows a meaningful difference from the baseline.

- **0:10-0:13** / Reveal step 2: Pause promotion
  Narration: Stop increasing exposure while preserving comparison data.

- **0:13-0:17** / Reveal step 3: Inspect correctness first
  Narration: Check whether new writes or side effects constrain rollback.

- **0:17-0:21** / Reveal step 4: Recover deliberately
  Narration: Roll back or forward-fix according to the preplanned data contract.

- **0:21-0:26** / Reveal step 5: Verify all work classes
  Narration: Include background processing and rare routes, not just the main API.

- **0:26-0:31** / Reveal step 6: Capture the missing test
  Narration: Add the smallest regression case that would have detected the defect earlier.

- **0:31-0:39** / Takeaway and discussion prompt
  Narration: Progressive delivery works only when the cohort, signals, and recovery path are meaningful. What evidence would disprove your first diagnosis?

## References

- [Google SRE canarying releases](https://sre.google/workbook/canarying-releases/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
