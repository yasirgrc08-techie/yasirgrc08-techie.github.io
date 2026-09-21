# Health Checks That Mean Something / Metrics That Matter

By Yasir Sharfi

## The Idea

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

## Visual Blueprint

1. **Probe failures by type**: Track startup, readiness, and liveness failures independently.
2. **Interpret / Probe failures by type**: One combined health percentage hides which automated action was triggered.
3. **Restart rate**: Measure restarts and time lost to initialization.
4. **Interpret / Restart rate**: Frequent restarts can indicate a bad probe contract rather than an unstable binary.
5. **User-path success**: Measure successful synthetic or real requests within the service objective.
6. **Interpret / User-path success**: A green process probe cannot substitute for end-to-end correctness and availability.

## Caption

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

1. Probe failures by type
Track startup, readiness, and liveness failures independently.

2. Interpret / Probe failures by type
One combined health percentage hides which automated action was triggered.

3. Restart rate
Measure restarts and time lost to initialization.

4. Interpret / Restart rate
Frequent restarts can indicate a bad probe contract rather than an unstable binary.

5. User-path success
Measure successful synthetic or real requests within the service objective.

6. Interpret / User-path success
A green process probe cannot substitute for end-to-end correctness and availability.

The takeaway: A health check is an operational decision, not simply an endpoint returning 200.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #healthchecks #kubernetes

## Reel Storyboard

Suggested duration: about 39 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A process can answer a health endpoint while every real request fails.

- **0:05-0:08** / Reveal step 1: Probe failures by type
  Narration: Track startup, readiness, and liveness failures independently.

- **0:08-0:12** / Reveal step 2: Interpret / Probe failures by type
  Narration: One combined health percentage hides which automated action was triggered.

- **0:12-0:15** / Reveal step 3: Restart rate
  Narration: Measure restarts and time lost to initialization.

- **0:15-0:21** / Reveal step 4: Interpret / Restart rate
  Narration: Frequent restarts can indicate a bad probe contract rather than an unstable binary.

- **0:21-0:25** / Reveal step 5: User-path success
  Narration: Measure successful synthetic or real requests within the service objective.

- **0:25-0:30** / Reveal step 6: Interpret / User-path success
  Narration: A green process probe cannot substitute for end-to-end correctness and availability.

- **0:30-0:39** / Takeaway and discussion prompt
  Narration: A health check is an operational decision, not simply an endpoint returning 200. Which metric could look healthy while users suffer?

## References

- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
