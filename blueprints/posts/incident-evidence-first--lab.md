# Incidents Need an Evidence Trail / Build and Validate

By Yasir Sharfi

## The Idea

Changing five things at once can restore service and erase the explanation.

During an incident, prioritize user impact and controlled mitigation while preserving enough evidence to distinguish causes and verify recovery.

## Visual Blueprint

1. **Create a safe failure**: Break one dependency in a disposable local service.
2. **Write an impact statement**: Describe the observable user failure without guessing its cause.
3. **Collect a small timeline**: Record requests, logs, and actions with synchronized local timestamps.
4. **Test one hypothesis**: Change one controlled variable and predict the result first.
5. **Verify the recovery**: Check correctness and latency after the mitigation.
6. **Produce a short review**: Document evidence, unresolved uncertainty, and one executable prevention check.

## Caption

Changing five things at once can restore service and erase the explanation.

During an incident, prioritize user impact and controlled mitigation while preserving enough evidence to distinguish causes and verify recovery.

1. Create a safe failure
Break one dependency in a disposable local service.

2. Write an impact statement
Describe the observable user failure without guessing its cause.

3. Collect a small timeline
Record requests, logs, and actions with synchronized local timestamps.

4. Test one hypothesis
Change one controlled variable and predict the result first.

5. Verify the recovery
Check correctness and latency after the mitigation.

6. Produce a short review
Document evidence, unresolved uncertainty, and one executable prevention check.

The takeaway: Mitigate quickly, but keep observations, hypotheses, and actions distinguishable.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #incidents #debugging

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Changing five things at once can restore service and erase the explanation.

- **0:05-0:09** / Reveal step 1: Create a safe failure
  Narration: Break one dependency in a disposable local service.

- **0:09-0:13** / Reveal step 2: Write an impact statement
  Narration: Describe the observable user failure without guessing its cause.

- **0:13-0:17** / Reveal step 3: Collect a small timeline
  Narration: Record requests, logs, and actions with synchronized local timestamps.

- **0:17-0:21** / Reveal step 4: Test one hypothesis
  Narration: Change one controlled variable and predict the result first.

- **0:21-0:24** / Reveal step 5: Verify the recovery
  Narration: Check correctness and latency after the mitigation.

- **0:24-0:28** / Reveal step 6: Produce a short review
  Narration: Document evidence, unresolved uncertainty, and one executable prevention check.

- **0:28-0:35** / Takeaway and discussion prompt
  Narration: Mitigate quickly, but keep observations, hypotheses, and actions distinguishable. How would you reproduce this with synthetic data?

## References

- [Google SRE incident response](https://sre.google/workbook/incident-response/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
