# Incidents Need an Evidence Trail / Decision Guide

By Yasir Sharfi

## The Idea

Changing five things at once can restore service and erase the explanation.

During an incident, prioritize user impact and controlled mitigation while preserving enough evidence to distinguish causes and verify recovery.

## Visual Blueprint

1. **Rollback a change**: Roll back when evidence links the regression to a compatible recent change.
2. **Trade-off / Rollback a change**: Data or protocol changes may make an application rollback unsafe without additional repair.
3. **Reduce demand**: Shed nonessential work when overload is the demonstrated limiting condition.
4. **Trade-off / Reduce demand**: The service must define which work may be rejected and communicate the degraded behavior.
5. **Fail over**: Use failover when the alternate path is healthy and its consistency contract is acceptable.
6. **Trade-off / Fail over**: Untested failover can spread the incident or introduce data-loss ambiguity.

## Caption

Changing five things at once can restore service and erase the explanation.

During an incident, prioritize user impact and controlled mitigation while preserving enough evidence to distinguish causes and verify recovery.

1. Rollback a change
Roll back when evidence links the regression to a compatible recent change.

2. Trade-off / Rollback a change
Data or protocol changes may make an application rollback unsafe without additional repair.

3. Reduce demand
Shed nonessential work when overload is the demonstrated limiting condition.

4. Trade-off / Reduce demand
The service must define which work may be rejected and communicate the degraded behavior.

5. Fail over
Use failover when the alternate path is healthy and its consistency contract is acceptable.

6. Trade-off / Fail over
Untested failover can spread the incident or introduce data-loss ambiguity.

The takeaway: Mitigate quickly, but keep observations, hypotheses, and actions distinguishable.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #incidents #debugging

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Changing five things at once can restore service and erase the explanation.

- **0:05-0:10** / Reveal step 1: Rollback a change
  Narration: Roll back when evidence links the regression to a compatible recent change.

- **0:10-0:16** / Reveal step 2: Trade-off / Rollback a change
  Narration: Data or protocol changes may make an application rollback unsafe without additional repair.

- **0:16-0:20** / Reveal step 3: Reduce demand
  Narration: Shed nonessential work when overload is the demonstrated limiting condition.

- **0:20-0:26** / Reveal step 4: Trade-off / Reduce demand
  Narration: The service must define which work may be rejected and communicate the degraded behavior.

- **0:26-0:32** / Reveal step 5: Fail over
  Narration: Use failover when the alternate path is healthy and its consistency contract is acceptable.

- **0:32-0:36** / Reveal step 6: Trade-off / Fail over
  Narration: Untested failover can spread the incident or introduce data-loss ambiguity.

- **0:36-0:42** / Takeaway and discussion prompt
  Narration: Mitigate quickly, but keep observations, hypotheses, and actions distinguishable. Which constraint would change your choice?

## References

- [Google SRE incident response](https://sre.google/workbook/incident-response/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
