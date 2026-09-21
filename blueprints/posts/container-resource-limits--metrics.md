# Container Limits Change Behavior / Metrics That Matter

By Yasir Sharfi

## The Idea

A service can look healthy on a laptop and stall under a real CPU limit.

Requests, limits, throttling, memory pressure, and runtime concurrency interact. Test the deployed resource envelope rather than unlimited local defaults.

## Visual Blueprint

1. **CPU throttling time**: Track throttled periods and their correlation with tail latency.
2. **Interpret / CPU throttling time**: Host CPU averages can conceal a container exhausting its own quota.
3. **Working memory**: Measure resident usage, allocation behavior, and workload-driven growth.
4. **Interpret / Working memory**: A stable idle footprint says little about bursts or large concurrent requests.
5. **Terminated work**: Count restarts and operations interrupted by resource exhaustion.
6. **Interpret / Terminated work**: Automatic restart can hide repeated loss of in-flight work.

## Caption

A service can look healthy on a laptop and stall under a real CPU limit.

Requests, limits, throttling, memory pressure, and runtime concurrency interact. Test the deployed resource envelope rather than unlimited local defaults.

1. CPU throttling time
Track throttled periods and their correlation with tail latency.

2. Interpret / CPU throttling time
Host CPU averages can conceal a container exhausting its own quota.

3. Working memory
Measure resident usage, allocation behavior, and workload-driven growth.

4. Interpret / Working memory
A stable idle footprint says little about bursts or large concurrent requests.

5. Terminated work
Count restarts and operations interrupted by resource exhaustion.

6. Interpret / Terminated work
Automatic restart can hide repeated loss of in-flight work.

The takeaway: Performance claims must include the resource limits under which the service actually runs.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #containers #kubernetes #memory

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A service can look healthy on a laptop and stall under a real CPU limit.

- **0:06-0:10** / Reveal step 1: CPU throttling time
  Narration: Track throttled periods and their correlation with tail latency.

- **0:10-0:15** / Reveal step 2: Interpret / CPU throttling time
  Narration: Host CPU averages can conceal a container exhausting its own quota.

- **0:15-0:19** / Reveal step 3: Working memory
  Narration: Measure resident usage, allocation behavior, and workload-driven growth.

- **0:19-0:24** / Reveal step 4: Interpret / Working memory
  Narration: A stable idle footprint says little about bursts or large concurrent requests.

- **0:24-0:28** / Reveal step 5: Terminated work
  Narration: Count restarts and operations interrupted by resource exhaustion.

- **0:28-0:32** / Reveal step 6: Interpret / Terminated work
  Narration: Automatic restart can hide repeated loss of in-flight work.

- **0:32-0:41** / Takeaway and discussion prompt
  Narration: Performance claims must include the resource limits under which the service actually runs. Which metric could look healthy while users suffer?

## References

- [Kubernetes resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
