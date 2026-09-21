# Health Checks That Mean Something / Failure and Recovery

By Yasir Sharfi

## The Idea

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

## Visual Blueprint

1. **Observe a false green**: Infrastructure reports healthy instances while user requests fail.
2. **Compare probe and request paths**: Identify which meaningful dependency the probe never exercises.
3. **Avoid restart amplification**: Check whether repeated restarts are consuming recovery capacity.
4. **Separate the signals**: Use readiness and service alerts instead of making liveness test everything.
5. **Verify draining**: Confirm instances stop receiving new work before termination.
6. **Test the repaired semantics**: Inject startup delay, deadlock, and dependency failure separately.

## Caption

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

1. Observe a false green
Infrastructure reports healthy instances while user requests fail.

2. Compare probe and request paths
Identify which meaningful dependency the probe never exercises.

3. Avoid restart amplification
Check whether repeated restarts are consuming recovery capacity.

4. Separate the signals
Use readiness and service alerts instead of making liveness test everything.

5. Verify draining
Confirm instances stop receiving new work before termination.

6. Test the repaired semantics
Inject startup delay, deadlock, and dependency failure separately.

The takeaway: A health check is an operational decision, not simply an endpoint returning 200.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #healthchecks #kubernetes

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A process can answer a health endpoint while every real request fails.

- **0:05-0:09** / Reveal step 1: Observe a false green
  Narration: Infrastructure reports healthy instances while user requests fail.

- **0:09-0:13** / Reveal step 2: Compare probe and request paths
  Narration: Identify which meaningful dependency the probe never exercises.

- **0:13-0:17** / Reveal step 3: Avoid restart amplification
  Narration: Check whether repeated restarts are consuming recovery capacity.

- **0:17-0:22** / Reveal step 4: Separate the signals
  Narration: Use readiness and service alerts instead of making liveness test everything.

- **0:22-0:26** / Reveal step 5: Verify draining
  Narration: Confirm instances stop receiving new work before termination.

- **0:26-0:30** / Reveal step 6: Test the repaired semantics
  Narration: Inject startup delay, deadlock, and dependency failure separately.

- **0:30-0:38** / Takeaway and discussion prompt
  Narration: A health check is an operational decision, not simply an endpoint returning 200. What evidence would disprove your first diagnosis?

## References

- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
