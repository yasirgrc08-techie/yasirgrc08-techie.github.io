# Error Budgets Guide Decisions / Metrics That Matter

By Yasir Sharfi

## The Idea

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

## Visual Blueprint

1. **Good-event ratio**: Measure useful successful events divided by the explicitly defined total.
2. **Interpret / Good-event ratio**: The denominator matters; silently dropping failures can manufacture a healthy ratio.
3. **Burn rate**: Compare observed bad-event rate with the rate allowed by the objective.
4. **Interpret / Burn rate**: Short and long windows reveal different failure patterns and should be interpreted together.
5. **Budget remaining**: Track the remaining allowance in the chosen objective window.
6. **Interpret / Budget remaining**: A remaining budget does not justify avoidable active customer harm.

## Caption

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

1. Good-event ratio
Measure useful successful events divided by the explicitly defined total.

2. Interpret / Good-event ratio
The denominator matters; silently dropping failures can manufacture a healthy ratio.

3. Burn rate
Compare observed bad-event rate with the rate allowed by the objective.

4. Interpret / Burn rate
Short and long windows reveal different failure patterns and should be interpreted together.

5. Budget remaining
Track the remaining allowance in the chosen objective window.

6. Interpret / Budget remaining
A remaining budget does not justify avoidable active customer harm.

The takeaway: A good objective connects user outcomes to timely engineering decisions.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #slo #errorbudget

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can meet its monthly average while failing badly for users right now.

- **0:06-0:10** / Reveal step 1: Good-event ratio
  Narration: Measure useful successful events divided by the explicitly defined total.

- **0:10-0:15** / Reveal step 2: Interpret / Good-event ratio
  Narration: The denominator matters; silently dropping failures can manufacture a healthy ratio.

- **0:15-0:20** / Reveal step 3: Burn rate
  Narration: Compare observed bad-event rate with the rate allowed by the objective.

- **0:20-0:26** / Reveal step 4: Interpret / Burn rate
  Narration: Short and long windows reveal different failure patterns and should be interpreted together.

- **0:26-0:30** / Reveal step 5: Budget remaining
  Narration: Track the remaining allowance in the chosen objective window.

- **0:30-0:34** / Reveal step 6: Interpret / Budget remaining
  Narration: A remaining budget does not justify avoidable active customer harm.

- **0:34-0:42** / Takeaway and discussion prompt
  Narration: A good objective connects user outcomes to timely engineering decisions. Which metric could look healthy while users suffer?

## References

- [Google SRE alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
