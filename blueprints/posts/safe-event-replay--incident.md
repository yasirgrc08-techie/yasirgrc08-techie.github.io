# Replay Is a Production Feature / Failure and Recovery

By Yasir Sharfi

## The Idea

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

## Visual Blueprint

1. **Find projection divergence**: A derived view disagrees with authoritative source or event history.
2. **Bound the affected range**: Identify the faulty handler version and event identities involved.
3. **Protect external effects**: Prevent recovery from resending notifications or repeating irreversible actions.
4. **Replay into isolation**: Build a separate corrected view at a bounded rate.
5. **Compare invariants**: Check counts, versions, relationships, and representative business queries.
6. **Switch with a recovery plan**: Promote the validated view and retain evidence for rollback or forward repair.

## Caption

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

1. Find projection divergence
A derived view disagrees with authoritative source or event history.

2. Bound the affected range
Identify the faulty handler version and event identities involved.

3. Protect external effects
Prevent recovery from resending notifications or repeating irreversible actions.

4. Replay into isolation
Build a separate corrected view at a bounded rate.

5. Compare invariants
Check counts, versions, relationships, and representative business queries.

6. Switch with a recovery plan
Promote the validated view and retain evidence for rollback or forward repair.

The takeaway: Safe replay needs versioned meaning, side-effect control, and evidence of convergence.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #replay #recovery

## Reel Storyboard

Suggested duration: about 37 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Replaying yesterday's events can accidentally send yesterday's emails again.

- **0:04-0:08** / Reveal step 1: Find projection divergence
  Narration: A derived view disagrees with authoritative source or event history.

- **0:08-0:12** / Reveal step 2: Bound the affected range
  Narration: Identify the faulty handler version and event identities involved.

- **0:12-0:16** / Reveal step 3: Protect external effects
  Narration: Prevent recovery from resending notifications or repeating irreversible actions.

- **0:16-0:20** / Reveal step 4: Replay into isolation
  Narration: Build a separate corrected view at a bounded rate.

- **0:20-0:24** / Reveal step 5: Compare invariants
  Narration: Check counts, versions, relationships, and representative business queries.

- **0:24-0:29** / Reveal step 6: Switch with a recovery plan
  Narration: Promote the validated view and retain evidence for rollback or forward repair.

- **0:29-0:37** / Takeaway and discussion prompt
  Narration: Safe replay needs versioned meaning, side-effect control, and evidence of convergence. What evidence would disprove your first diagnosis?

## References

- [Azure event-sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
