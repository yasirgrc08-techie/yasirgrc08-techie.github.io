# Error Budgets Guide Decisions / Failure and Recovery

By Yasir Sharfi

## The Idea

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

## Visual Blueprint

1. **Observe rapid budget burn**: Bad events consume the remaining budget much faster than the allowed rate.
2. **Identify the user journey**: Find the affected operation and cohort rather than only the noisy component.
3. **Mitigate active harm**: Apply the incident response even if the monthly aggregate still passes.
4. **Stop risky expansion**: Pause related rollouts according to the documented budget policy.
5. **Verify sustained recovery**: Check multiple windows and actual user outcomes after mitigation.
6. **Review the indicator**: Fix blind spots or misleading exclusions revealed by the incident.

## Caption

A service can meet its monthly average while failing badly for users right now.

Define a user-centered service-level indicator and objective. An error budget is a decision tool, not permission to ignore active harm.

1. Observe rapid budget burn
Bad events consume the remaining budget much faster than the allowed rate.

2. Identify the user journey
Find the affected operation and cohort rather than only the noisy component.

3. Mitigate active harm
Apply the incident response even if the monthly aggregate still passes.

4. Stop risky expansion
Pause related rollouts according to the documented budget policy.

5. Verify sustained recovery
Check multiple windows and actual user outcomes after mitigation.

6. Review the indicator
Fix blind spots or misleading exclusions revealed by the incident.

The takeaway: A good objective connects user outcomes to timely engineering decisions.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #slo #errorbudget

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can meet its monthly average while failing badly for users right now.

- **0:06-0:11** / Reveal step 1: Observe rapid budget burn
  Narration: Bad events consume the remaining budget much faster than the allowed rate.

- **0:11-0:16** / Reveal step 2: Identify the user journey
  Narration: Find the affected operation and cohort rather than only the noisy component.

- **0:16-0:21** / Reveal step 3: Mitigate active harm
  Narration: Apply the incident response even if the monthly aggregate still passes.

- **0:21-0:25** / Reveal step 4: Stop risky expansion
  Narration: Pause related rollouts according to the documented budget policy.

- **0:25-0:29** / Reveal step 5: Verify sustained recovery
  Narration: Check multiple windows and actual user outcomes after mitigation.

- **0:29-0:33** / Reveal step 6: Review the indicator
  Narration: Fix blind spots or misleading exclusions revealed by the incident.

- **0:33-0:40** / Takeaway and discussion prompt
  Narration: A good objective connects user outcomes to timely engineering decisions. What evidence would disprove your first diagnosis?

## References

- [Google SRE alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
