# Ordering Lives in a Partition / Decision Guide

By Yasir Sharfi

## The Idea

A globally ordered story can become several locally ordered event streams.

For a partitioned log, identify which entity requires ordering and how its events are keyed. Processing concurrency can weaken visible order after delivery.

## Visual Blueprint

1. **Single partition**: Use one partition when strict total order and limited throughput fit the requirement.
2. **Trade-off / Single partition**: One ordered stream becomes a throughput and availability boundary.
3. **Entity-keyed partitions**: Use entity keys when independent entities can be processed in parallel.
4. **Trade-off / Entity-keyed partitions**: A hot entity can still dominate one partition; uniform key counts are not enough.
5. **Version-aware consumers**: Use version checks when late or duplicate events must not regress state.
6. **Trade-off / Version-aware consumers**: Gap handling and reconciliation need explicit policy rather than silently discarding every mismatch.

## Caption

A globally ordered story can become several locally ordered event streams.

For a partitioned log, identify which entity requires ordering and how its events are keyed. Processing concurrency can weaken visible order after delivery.

1. Single partition
Use one partition when strict total order and limited throughput fit the requirement.

2. Trade-off / Single partition
One ordered stream becomes a throughput and availability boundary.

3. Entity-keyed partitions
Use entity keys when independent entities can be processed in parallel.

4. Trade-off / Entity-keyed partitions
A hot entity can still dominate one partition; uniform key counts are not enough.

5. Version-aware consumers
Use version checks when late or duplicate events must not regress state.

6. Trade-off / Version-aware consumers
Gap handling and reconciliation need explicit policy rather than silently discarding every mismatch.

The takeaway: State exactly where order is guaranteed: delivery, processing, or the final business effect.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #kafka #ordering

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A globally ordered story can become several locally ordered event streams.

- **0:05-0:11** / Reveal step 1: Single partition
  Narration: Use one partition when strict total order and limited throughput fit the requirement.

- **0:11-0:15** / Reveal step 2: Trade-off / Single partition
  Narration: One ordered stream becomes a throughput and availability boundary.

- **0:15-0:20** / Reveal step 3: Entity-keyed partitions
  Narration: Use entity keys when independent entities can be processed in parallel.

- **0:20-0:26** / Reveal step 4: Trade-off / Entity-keyed partitions
  Narration: A hot entity can still dominate one partition; uniform key counts are not enough.

- **0:26-0:31** / Reveal step 5: Version-aware consumers
  Narration: Use version checks when late or duplicate events must not regress state.

- **0:31-0:37** / Reveal step 6: Trade-off / Version-aware consumers
  Narration: Gap handling and reconciliation need explicit policy rather than silently discarding every mismatch.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: State exactly where order is guaranteed: delivery, processing, or the final business effect. Which constraint would change your choice?

## References

- [Apache Kafka documentation](https://kafka.apache.org/documentation/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
