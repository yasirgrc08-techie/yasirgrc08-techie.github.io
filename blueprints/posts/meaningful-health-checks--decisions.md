# Health Checks That Mean Something / Decision Guide

By Yasir Sharfi

## The Idea

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

## Visual Blueprint

1. **Liveness probe**: Use liveness to detect a process state that restarting is expected to repair.
2. **Trade-off / Liveness probe**: A dependency failure may not improve after restart and can cause every replica to churn.
3. **Readiness probe**: Use readiness to decide whether an instance should receive new traffic.
4. **Trade-off / Readiness probe**: Removing all replicas can worsen an outage if the readiness rule is too broad.
5. **Synthetic user check**: Use an authorized synthetic transaction to measure a real service path.
6. **Trade-off / Synthetic user check**: A synthetic check needs safe test data, cleanup, and a clear interpretation of failure.

## Caption

A process can answer a health endpoint while every real request fails.

Separate process liveness, readiness to serve, and end-to-end service health. A probe should trigger an action that can actually help.

1. Liveness probe
Use liveness to detect a process state that restarting is expected to repair.

2. Trade-off / Liveness probe
A dependency failure may not improve after restart and can cause every replica to churn.

3. Readiness probe
Use readiness to decide whether an instance should receive new traffic.

4. Trade-off / Readiness probe
Removing all replicas can worsen an outage if the readiness rule is too broad.

5. Synthetic user check
Use an authorized synthetic transaction to measure a real service path.

6. Trade-off / Synthetic user check
A synthetic check needs safe test data, cleanup, and a clear interpretation of failure.

The takeaway: A health check is an operational decision, not simply an endpoint returning 200.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #reliability #healthchecks #kubernetes

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A process can answer a health endpoint while every real request fails.

- **0:05-0:11** / Reveal step 1: Liveness probe
  Narration: Use liveness to detect a process state that restarting is expected to repair.

- **0:11-0:17** / Reveal step 2: Trade-off / Liveness probe
  Narration: A dependency failure may not improve after restart and can cause every replica to churn.

- **0:17-0:22** / Reveal step 3: Readiness probe
  Narration: Use readiness to decide whether an instance should receive new traffic.

- **0:22-0:28** / Reveal step 4: Trade-off / Readiness probe
  Narration: Removing all replicas can worsen an outage if the readiness rule is too broad.

- **0:28-0:33** / Reveal step 5: Synthetic user check
  Narration: Use an authorized synthetic transaction to measure a real service path.

- **0:33-0:39** / Reveal step 6: Trade-off / Synthetic user check
  Narration: A synthetic check needs safe test data, cleanup, and a clear interpretation of failure.

- **0:39-0:47** / Takeaway and discussion prompt
  Narration: A health check is an operational decision, not simply an endpoint returning 200. Which constraint would change your choice?

## References

- [Kubernetes probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
