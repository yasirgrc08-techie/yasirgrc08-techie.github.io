# Replay Is a Production Feature / Decision Guide

By Yasir Sharfi

## The Idea

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

## Visual Blueprint

1. **Full rebuild**: Use a full rebuild when the complete event history and compatible interpretation are available.
2. **Trade-off / Full rebuild**: Retention gaps or changed event meaning can prevent a faithful reconstruction.
3. **Targeted repair**: Replay a known affected range or identity set when the defect scope is well established.
4. **Trade-off / Targeted repair**: A narrow repair can miss hidden dependencies unless the affected set is validated.
5. **Snapshot plus log**: Start from a verified snapshot when replaying the full history is too expensive.
6. **Trade-off / Snapshot plus log**: The snapshot position and subsequent log continuity must agree exactly.

## Caption

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

1. Full rebuild
Use a full rebuild when the complete event history and compatible interpretation are available.

2. Trade-off / Full rebuild
Retention gaps or changed event meaning can prevent a faithful reconstruction.

3. Targeted repair
Replay a known affected range or identity set when the defect scope is well established.

4. Trade-off / Targeted repair
A narrow repair can miss hidden dependencies unless the affected set is validated.

5. Snapshot plus log
Start from a verified snapshot when replaying the full history is too expensive.

6. Trade-off / Snapshot plus log
The snapshot position and subsequent log continuity must agree exactly.

The takeaway: Safe replay needs versioned meaning, side-effect control, and evidence of convergence.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #replay #recovery

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Replaying yesterday's events can accidentally send yesterday's emails again.

- **0:04-0:10** / Reveal step 1: Full rebuild
  Narration: Use a full rebuild when the complete event history and compatible interpretation are available.

- **0:10-0:15** / Reveal step 2: Trade-off / Full rebuild
  Narration: Retention gaps or changed event meaning can prevent a faithful reconstruction.

- **0:15-0:21** / Reveal step 3: Targeted repair
  Narration: Replay a known affected range or identity set when the defect scope is well established.

- **0:21-0:27** / Reveal step 4: Trade-off / Targeted repair
  Narration: A narrow repair can miss hidden dependencies unless the affected set is validated.

- **0:27-0:33** / Reveal step 5: Snapshot plus log
  Narration: Start from a verified snapshot when replaying the full history is too expensive.

- **0:33-0:37** / Reveal step 6: Trade-off / Snapshot plus log
  Narration: The snapshot position and subsequent log continuity must agree exactly.

- **0:37-0:44** / Takeaway and discussion prompt
  Narration: Safe replay needs versioned meaning, side-effect control, and evidence of convergence. Which constraint would change your choice?

## References

- [Azure event-sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
