# Health Checks That Mean Something / Build and Validate

By Yasir Sharfi

## The Idea

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

## Visual Blueprint

1. **Build three failure modes**: Create controlled startup delay, deadlock, and dependency timeout cases.
2. **Define separate probes**: Give each probe a documented purpose and bounded execution time.
3. **Run a shared outage**: Make the dependency unavailable to every replica.
4. **Observe automated actions**: Verify that readiness and restart behavior match the intended recovery plan.
5. **Test graceful drain**: Terminate one instance while a bounded request is active.
6. **Record the contract**: Explain which conditions cause restart, traffic removal, or an alert.

## Caption

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

1. Build three failure modes
Create controlled startup delay, deadlock, and dependency timeout cases.

2. Define separate probes
Give each probe a documented purpose and bounded execution time.

3. Run a shared outage
Make the dependency unavailable to every replica.

4. Observe automated actions
Verify that readiness and restart behavior match the intended recovery plan.

5. Test graceful drain
Terminate one instance while a bounded request is active.

6. Record the contract
Explain which conditions cause restart, traffic removal, or an alert.

The takeaway: A health check is an operational decision, not simply an endpoint returning 200.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #healthchecks #kubernetes

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A process can answer a health endpoint while every real request fails.

- **0:05-0:09** / Reveal step 1: Build three failure modes
  Narration: Create controlled startup delay, deadlock, and dependency timeout cases.

- **0:09-0:13** / Reveal step 2: Define separate probes
  Narration: Give each probe a documented purpose and bounded execution time.

- **0:13-0:16** / Reveal step 3: Run a shared outage
  Narration: Make the dependency unavailable to every replica.

- **0:16-0:21** / Reveal step 4: Observe automated actions
  Narration: Verify that readiness and restart behavior match the intended recovery plan.

- **0:21-0:25** / Reveal step 5: Test graceful drain
  Narration: Terminate one instance while a bounded request is active.

- **0:25-0:29** / Reveal step 6: Record the contract
  Narration: Explain which conditions cause restart, traffic removal, or an alert.

- **0:29-0:38** / Takeaway and discussion prompt
  Narration: A health check is an operational decision, not simply an endpoint returning 200. How would you reproduce this with synthetic data?

## References

- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
