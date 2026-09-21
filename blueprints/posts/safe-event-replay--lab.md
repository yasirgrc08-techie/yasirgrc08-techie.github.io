# Replay Is a Production Feature / Build and Validate

By Yasir Sharfi

## The Idea

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

## Visual Blueprint

1. **Generate an event history**: Use synthetic versioned events with a known final state.
2. **Introduce a handler bug**: Build one intentionally incorrect local projection.
3. **Fix the transformation**: Version the corrected handler and define side-effect policy.
4. **Replay separately**: Rebuild a fresh projection without sending external notifications.
5. **Compare results**: Assert business invariants and explain every intended difference.
6. **Practice the switch**: Promote the repaired view only after a repeatable validation gate.

## Caption

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

1. Generate an event history
Use synthetic versioned events with a known final state.

2. Introduce a handler bug
Build one intentionally incorrect local projection.

3. Fix the transformation
Version the corrected handler and define side-effect policy.

4. Replay separately
Rebuild a fresh projection without sending external notifications.

5. Compare results
Assert business invariants and explain every intended difference.

6. Practice the switch
Promote the repaired view only after a repeatable validation gate.

The takeaway: Safe replay needs versioned meaning, side-effect control, and evidence of convergence.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #replay #recovery

## Reel Storyboard

Suggested duration: about 35 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Replaying yesterday's events can accidentally send yesterday's emails again.

- **0:04-0:08** / Reveal step 1: Generate an event history
  Narration: Use synthetic versioned events with a known final state.

- **0:08-0:11** / Reveal step 2: Introduce a handler bug
  Narration: Build one intentionally incorrect local projection.

- **0:11-0:15** / Reveal step 3: Fix the transformation
  Narration: Version the corrected handler and define side-effect policy.

- **0:15-0:19** / Reveal step 4: Replay separately
  Narration: Rebuild a fresh projection without sending external notifications.

- **0:19-0:23** / Reveal step 5: Compare results
  Narration: Assert business invariants and explain every intended difference.

- **0:23-0:27** / Reveal step 6: Practice the switch
  Narration: Promote the repaired view only after a repeatable validation gate.

- **0:27-0:35** / Takeaway and discussion prompt
  Narration: Safe replay needs versioned meaning, side-effect control, and evidence of convergence. How would you reproduce this with synthetic data?

## References

- [Azure event-sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
