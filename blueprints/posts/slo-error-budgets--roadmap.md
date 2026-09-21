# Error Budgets Guide Decisions / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

## Visual Blueprint

1. **Choose a user outcome**: Measure successful useful requests, latency, or another meaningful service result.
2. **Define good and total events**: Specify exclusions, missing data, and aggregation boundaries explicitly.
3. **Set the objective window**: Choose a target and time window that reflect the service's real needs.
4. **Track budget consumption**: Measure how quickly bad events consume the allowed budget.
5. **Use multiple alert windows**: Detect fast severe failures and slower sustained degradation.
6. **Link to operational policy**: Define how budget state affects rollout, reliability work, and incident response.

## Caption

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

1. Choose a user outcome
Measure successful useful requests, latency, or another meaningful service result.

2. Define good and total events
Specify exclusions, missing data, and aggregation boundaries explicitly.

3. Set the objective window
Choose a target and time window that reflect the service's real needs.

4. Track budget consumption
Measure how quickly bad events consume the allowed budget.

5. Use multiple alert windows
Detect fast severe failures and slower sustained degradation.

6. Link to operational policy
Define how budget state affects rollout, reliability work, and incident response.

The takeaway: A good objective connects user outcomes to timely engineering decisions.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #slo #errorbudget

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can meet its monthly average while failing badly for users right now.

- **0:06-0:10** / Reveal step 1: Choose a user outcome
  Narration: Measure successful useful requests, latency, or another meaningful service result.

- **0:10-0:14** / Reveal step 2: Define good and total events
  Narration: Specify exclusions, missing data, and aggregation boundaries explicitly.

- **0:14-0:19** / Reveal step 3: Set the objective window
  Narration: Choose a target and time window that reflect the service's real needs.

- **0:19-0:23** / Reveal step 4: Track budget consumption
  Narration: Measure how quickly bad events consume the allowed budget.

- **0:23-0:27** / Reveal step 5: Use multiple alert windows
  Narration: Detect fast severe failures and slower sustained degradation.

- **0:27-0:32** / Reveal step 6: Link to operational policy
  Narration: Define how budget state affects rollout, reliability work, and incident response.

- **0:32-0:39** / Takeaway and discussion prompt
  Narration: A good objective connects user outcomes to timely engineering decisions. Which bottleneck would you measure first?

## References

- [Google SRE alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
