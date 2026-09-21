# Health Checks That Mean Something / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

## Visual Blueprint

1. **Define each probe**: State whether the check controls restart, traffic admission, or service-level alerting.
2. **Keep liveness narrow**: Avoid restarting healthy processes merely because a shared dependency is unavailable.
3. **Make readiness useful**: Check the minimum conditions needed to accept work safely.
4. **Bound probe cost**: Use short deadlines and avoid expensive database scans in frequent probes.
5. **Handle startup and drain**: Allow initialization time and stop new traffic before terminating active work.
6. **Test shared failures**: Simulate a dependency outage and verify probes do not create a restart cascade.

## Caption

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

1. Define each probe
State whether the check controls restart, traffic admission, or service-level alerting.

2. Keep liveness narrow
Avoid restarting healthy processes merely because a shared dependency is unavailable.

3. Make readiness useful
Check the minimum conditions needed to accept work safely.

4. Bound probe cost
Use short deadlines and avoid expensive database scans in frequent probes.

5. Handle startup and drain
Allow initialization time and stop new traffic before terminating active work.

6. Test shared failures
Simulate a dependency outage and verify probes do not create a restart cascade.

The takeaway: A health check is an operational decision, not simply an endpoint returning 200.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #healthchecks #kubernetes

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A process can answer a health endpoint while every real request fails.

- **0:05-0:10** / Reveal step 1: Define each probe
  Narration: State whether the check controls restart, traffic admission, or service-level alerting.

- **0:10-0:15** / Reveal step 2: Keep liveness narrow
  Narration: Avoid restarting healthy processes merely because a shared dependency is unavailable.

- **0:15-0:19** / Reveal step 3: Make readiness useful
  Narration: Check the minimum conditions needed to accept work safely.

- **0:19-0:24** / Reveal step 4: Bound probe cost
  Narration: Use short deadlines and avoid expensive database scans in frequent probes.

- **0:24-0:29** / Reveal step 5: Handle startup and drain
  Narration: Allow initialization time and stop new traffic before terminating active work.

- **0:29-0:35** / Reveal step 6: Test shared failures
  Narration: Simulate a dependency outage and verify probes do not create a restart cascade.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: A health check is an operational decision, not simply an endpoint returning 200. Which bottleneck would you measure first?

## References

- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
