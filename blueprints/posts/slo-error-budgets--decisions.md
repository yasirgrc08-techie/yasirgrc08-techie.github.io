# Error Budgets Guide Decisions / Decision Guide

By Yasir Sharfi

## The Idea

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

## Visual Blueprint

1. **Availability objective**: Use a success-based objective for operations whose completion is the main user concern.
2. **Trade-off / Availability objective**: A successful response that returns incorrect or useless data should not automatically count as good.
3. **Latency objective**: Use a latency threshold when delayed responses harm the user journey.
4. **Trade-off / Latency objective**: Exclude neither timeouts nor rejected work merely to improve the measured distribution.
5. **Multiple objectives**: Use separate indicators for distinct critical journeys or work classes.
6. **Trade-off / Multiple objectives**: Too many poorly owned objectives create noise instead of better decisions.

## Caption

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

1. Availability objective
Use a success-based objective for operations whose completion is the main user concern.

2. Trade-off / Availability objective
A successful response that returns incorrect or useless data should not automatically count as good.

3. Latency objective
Use a latency threshold when delayed responses harm the user journey.

4. Trade-off / Latency objective
Exclude neither timeouts nor rejected work merely to improve the measured distribution.

5. Multiple objectives
Use separate indicators for distinct critical journeys or work classes.

6. Trade-off / Multiple objectives
Too many poorly owned objectives create noise instead of better decisions.

The takeaway: A good objective connects user outcomes to timely engineering decisions.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #slo #errorbudget

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can meet its monthly average while failing badly for users right now.

- **0:06-0:12** / Reveal step 1: Availability objective
  Narration: Use a success-based objective for operations whose completion is the main user concern.

- **0:12-0:18** / Reveal step 2: Trade-off / Availability objective
  Narration: A successful response that returns incorrect or useless data should not automatically count as good.

- **0:18-0:23** / Reveal step 3: Latency objective
  Narration: Use a latency threshold when delayed responses harm the user journey.

- **0:23-0:28** / Reveal step 4: Trade-off / Latency objective
  Narration: Exclude neither timeouts nor rejected work merely to improve the measured distribution.

- **0:28-0:32** / Reveal step 5: Multiple objectives
  Narration: Use separate indicators for distinct critical journeys or work classes.

- **0:32-0:37** / Reveal step 6: Trade-off / Multiple objectives
  Narration: Too many poorly owned objectives create noise instead of better decisions.

- **0:37-0:44** / Takeaway and discussion prompt
  Narration: A good objective connects user outcomes to timely engineering decisions. Which constraint would change your choice?

## References

- [Google SRE alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
