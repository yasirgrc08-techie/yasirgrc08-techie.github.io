# Autoscaling Has a Delay / Decision Guide

By Yasir Sharfi

## The Idea

The scaling graph can rise while users are already timing out.

Detection, scheduling, image startup, warmup, and traffic admission all take time. Capacity must bridge the interval before new replicas become useful.

## Visual Blueprint

1. **CPU-based scaling**: Use CPU when it tracks the service's limiting resource under the real workload.
2. **Trade-off / CPU-based scaling**: A service waiting on I/O can be overloaded while CPU remains low.
3. **Queue-based scaling**: Use backlog age or work estimates for asynchronous consumers.
4. **Trade-off / Queue-based scaling**: More workers help only if the downstream dependency has spare capacity.
5. **Scheduled headroom**: Pre-scale for predictable demand when startup delay is material.
6. **Trade-off / Scheduled headroom**: Prediction errors and idle cost still need explicit limits and review.

## Caption

The scaling graph can rise while users are already timing out.

Detection, scheduling, image startup, warmup, and traffic admission all take time. Capacity must bridge the interval before new replicas become useful.

1. CPU-based scaling
Use CPU when it tracks the service's limiting resource under the real workload.

2. Trade-off / CPU-based scaling
A service waiting on I/O can be overloaded while CPU remains low.

3. Queue-based scaling
Use backlog age or work estimates for asynchronous consumers.

4. Trade-off / Queue-based scaling
More workers help only if the downstream dependency has spare capacity.

5. Scheduled headroom
Pre-scale for predictable demand when startup delay is material.

6. Trade-off / Scheduled headroom
Prediction errors and idle cost still need explicit limits and review.

The takeaway: Autoscaling is delayed control; admission and headroom protect the gap.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #ReliabilityandCloud #cloud #autoscaling #capacity

## Reel Storyboard

Suggested duration: about 41 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: The scaling graph can rise while users are already timing out.

- **0:05-0:11** / Reveal step 1: CPU-based scaling
  Narration: Use CPU when it tracks the service's limiting resource under the real workload.

- **0:11-0:16** / Reveal step 2: Trade-off / CPU-based scaling
  Narration: A service waiting on I/O can be overloaded while CPU remains low.

- **0:16-0:20** / Reveal step 3: Queue-based scaling
  Narration: Use backlog age or work estimates for asynchronous consumers.

- **0:20-0:25** / Reveal step 4: Trade-off / Queue-based scaling
  Narration: More workers help only if the downstream dependency has spare capacity.

- **0:25-0:29** / Reveal step 5: Scheduled headroom
  Narration: Pre-scale for predictable demand when startup delay is material.

- **0:29-0:34** / Reveal step 6: Trade-off / Scheduled headroom
  Narration: Prediction errors and idle cost still need explicit limits and review.

- **0:34-0:41** / Takeaway and discussion prompt
  Narration: Autoscaling is delayed control; admission and headroom protect the gap. Which constraint would change your choice?

## References

- [Kubernetes horizontal autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
