# Replay Is a Production Feature / Metrics That Matter

By Yasir Sharfi

## The Idea

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

## Visual Blueprint

1. **Replay progress**: Track processed position and remaining work in the chosen source history.
2. **Interpret / Replay progress**: A record count does not prove the replay used the correct handler or complete history.
3. **Projection differences**: Measure mismatches between rebuilt and expected business state.
4. **Interpret / Projection differences**: Some differences may be the intended bug fix; classify them instead of requiring blind byte equality.
5. **Live traffic impact**: Monitor user latency and dependency load while replay runs.
6. **Interpret / Live traffic impact**: Recovery should not create a second outage by consuming all shared capacity.

## Caption

Replaying yesterday's events can accidentally send yesterday's emails again.

A replay may rebuild a projection, repair a bug, or recover state. Its side-effect policy must be explicit before it touches historical data.

1. Replay progress
Track processed position and remaining work in the chosen source history.

2. Interpret / Replay progress
A record count does not prove the replay used the correct handler or complete history.

3. Projection differences
Measure mismatches between rebuilt and expected business state.

4. Interpret / Projection differences
Some differences may be the intended bug fix; classify them instead of requiring blind byte equality.

5. Live traffic impact
Monitor user latency and dependency load while replay runs.

6. Interpret / Live traffic impact
Recovery should not create a second outage by consuming all shared capacity.

The takeaway: Safe replay needs versioned meaning, side-effect control, and evidence of convergence.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #CachesandEvents #events #replay #recovery

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:04** / Title and opening question
  Narration: Replaying yesterday's events can accidentally send yesterday's emails again.

- **0:04-0:09** / Reveal step 1: Replay progress
  Narration: Track processed position and remaining work in the chosen source history.

- **0:09-0:15** / Reveal step 2: Interpret / Replay progress
  Narration: A record count does not prove the replay used the correct handler or complete history.

- **0:15-0:19** / Reveal step 3: Projection differences
  Narration: Measure mismatches between rebuilt and expected business state.

- **0:19-0:26** / Reveal step 4: Interpret / Projection differences
  Narration: Some differences may be the intended bug fix; classify them instead of requiring blind byte equality.

- **0:26-0:30** / Reveal step 5: Live traffic impact
  Narration: Monitor user latency and dependency load while replay runs.

- **0:30-0:35** / Reveal step 6: Interpret / Live traffic impact
  Narration: Recovery should not create a second outage by consuming all shared capacity.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: Safe replay needs versioned meaning, side-effect control, and evidence of convergence. Which metric could look healthy while users suffer?

## References

- [Azure event-sourcing pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
