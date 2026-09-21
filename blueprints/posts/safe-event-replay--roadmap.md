# Replay Is a Production Feature / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

## Visual Blueprint

1. **Define replay purpose**: Separate rebuilding derived state from re-executing external business actions.
2. **Version the handler**: Record the schema and transformation version used for the replay.
3. **Isolate the target**: Rebuild into a separate projection when comparison and rollback are needed.
4. **Control side effects**: Disable or deduplicate irreversible actions according to the approved recovery contract.
5. **Throttle recovery load**: Keep replay from starving current traffic or exhausting dependencies.
6. **Verify convergence**: Compare rebuilt state and invariants before switching the authoritative read path.

## Caption

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

1. Define replay purpose
Separate rebuilding derived state from re-executing external business actions.

2. Version the handler
Record the schema and transformation version used for the replay.

3. Isolate the target
Rebuild into a separate projection when comparison and rollback are needed.

4. Control side effects
Disable or deduplicate irreversible actions according to the approved recovery contract.

5. Throttle recovery load
Keep replay from starving current traffic or exhausting dependencies.

6. Verify convergence
Compare rebuilt state and invariants before switching the authoritative read path.

The takeaway: Safe replay needs versioned meaning, side-effect control, and evidence of convergence.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #replay #recovery

## Reel Storyboard

Suggested duration: about 38 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Replaying yesterday's events can accidentally send yesterday's emails again.

- **0:04-0:08** / Reveal step 1: Define replay purpose
  Narration: Separate rebuilding derived state from re-executing external business actions.

- **0:08-0:12** / Reveal step 2: Version the handler
  Narration: Record the schema and transformation version used for the replay.

- **0:12-0:17** / Reveal step 3: Isolate the target
  Narration: Rebuild into a separate projection when comparison and rollback are needed.

- **0:17-0:22** / Reveal step 4: Control side effects
  Narration: Disable or deduplicate irreversible actions according to the approved recovery contract.

- **0:22-0:26** / Reveal step 5: Throttle recovery load
  Narration: Keep replay from starving current traffic or exhausting dependencies.

- **0:26-0:31** / Reveal step 6: Verify convergence
  Narration: Compare rebuilt state and invariants before switching the authoritative read path.

- **0:31-0:38** / Takeaway and discussion prompt
  Narration: Safe replay needs versioned meaning, side-effect control, and evidence of convergence. Which bottleneck would you measure first?

## References

- [Azure event-sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
