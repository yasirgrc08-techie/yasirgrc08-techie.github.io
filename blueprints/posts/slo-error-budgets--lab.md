# Error Budgets Guide Decisions / Build and Validate

By Yasir Sharfi

## The Idea

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

## Visual Blueprint

1. **Define a synthetic SLI**: Specify good requests, total requests, and a concrete latency threshold.
2. **Generate labeled outcomes**: Include success, timeout, rejection, and incorrect-result cases.
3. **Compute the budget**: Calculate allowed bad events for the chosen target and window.
4. **Inject a short outage**: Compare its effect on short-window burn and the monthly average.
5. **Inject slow degradation**: Test whether a longer alert window catches sustained low-rate harm.
6. **Write the response policy**: Explain which actions follow each signal and who owns them.

## Caption

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

1. Define a synthetic SLI
Specify good requests, total requests, and a concrete latency threshold.

2. Generate labeled outcomes
Include success, timeout, rejection, and incorrect-result cases.

3. Compute the budget
Calculate allowed bad events for the chosen target and window.

4. Inject a short outage
Compare its effect on short-window burn and the monthly average.

5. Inject slow degradation
Test whether a longer alert window catches sustained low-rate harm.

6. Write the response policy
Explain which actions follow each signal and who owns them.

The takeaway: A good objective connects user outcomes to timely engineering decisions.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #slo #errorbudget

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can meet its monthly average while failing badly for users right now.

- **0:06-0:10** / Reveal step 1: Define a synthetic SLI
  Narration: Specify good requests, total requests, and a concrete latency threshold.

- **0:10-0:13** / Reveal step 2: Generate labeled outcomes
  Narration: Include success, timeout, rejection, and incorrect-result cases.

- **0:13-0:17** / Reveal step 3: Compute the budget
  Narration: Calculate allowed bad events for the chosen target and window.

- **0:17-0:21** / Reveal step 4: Inject a short outage
  Narration: Compare its effect on short-window burn and the monthly average.

- **0:21-0:25** / Reveal step 5: Inject slow degradation
  Narration: Test whether a longer alert window catches sustained low-rate harm.

- **0:25-0:29** / Reveal step 6: Write the response policy
  Narration: Explain which actions follow each signal and who owns them.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: A good objective connects user outcomes to timely engineering decisions. How would you reproduce this with synthetic data?

## References

- [Google SRE alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
