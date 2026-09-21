# Deadlines Across a Call Chain / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

## Visual Blueprint

1. **Start with the caller**: Define the user-visible latency objective and assign an overall request deadline.
2. **Track remaining time**: Use monotonic elapsed time locally and avoid assuming perfectly synchronized clocks across machines.
3. **Budget each dependency**: Set per-call limits from the remaining budget, including connection setup and response transfer.
4. **Propagate cancellation**: Stop unnecessary work when the caller leaves, but still release resources and preserve required cleanup.
5. **Handle write ambiguity**: Cancellation cannot undo an already committed side effect; expose status or reconciliation.
6. **Test the slow tail**: Exercise delayed connections, partial responses, and retries near the deadline.

## Caption

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

1. Start with the caller
Define the user-visible latency objective and assign an overall request deadline.

2. Track remaining time
Use monotonic elapsed time locally and avoid assuming perfectly synchronized clocks across machines.

3. Budget each dependency
Set per-call limits from the remaining budget, including connection setup and response transfer.

4. Propagate cancellation
Stop unnecessary work when the caller leaves, but still release resources and preserve required cleanup.

5. Handle write ambiguity
Cancellation cannot undo an already committed side effect; expose status or reconciliation.

6. Test the slow tail
Exercise delayed connections, partial responses, and retries near the deadline.

The takeaway: A deadline bounds waiting; it does not automatically reverse a completed business action.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #timeouts #cancellation

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A client can time out while its abandoned server work keeps running.

- **0:05-0:10** / Reveal step 1: Start with the caller
  Narration: Define the user-visible latency objective and assign an overall request deadline.

- **0:10-0:16** / Reveal step 2: Track remaining time
  Narration: Use monotonic elapsed time locally and avoid assuming perfectly synchronized clocks across machines.

- **0:16-0:22** / Reveal step 3: Budget each dependency
  Narration: Set per-call limits from the remaining budget, including connection setup and response transfer.

- **0:22-0:28** / Reveal step 4: Propagate cancellation
  Narration: Stop unnecessary work when the caller leaves, but still release resources and preserve required cleanup.

- **0:28-0:33** / Reveal step 5: Handle write ambiguity
  Narration: Cancellation cannot undo an already committed side effect; expose status or reconciliation.

- **0:33-0:37** / Reveal step 6: Test the slow tail
  Narration: Exercise delayed connections, partial responses, and retries near the deadline.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: A deadline bounds waiting; it does not automatically reverse a completed business action. Which bottleneck would you measure first?

## References

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
