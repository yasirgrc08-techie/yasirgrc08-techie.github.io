# Deadlines Across a Call Chain / Failure and Recovery

By Yasir Sharfi

## The Idea

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

## Visual Blueprint

1. **Find abandoned work**: User requests time out while downstream operations continue consuming workers.
2. **Inspect cancellation**: Trace whether cancellation reaches the database, network client, and internal queue.
3. **Bound queued work**: Reject work that cannot start or finish before its deadline.
4. **Preserve cleanup**: Release locks and connections even when the success path is cancelled.
5. **Reconcile writes**: Determine whether a timed-out mutation committed before attempting it again.
6. **Verify budget accounting**: Measure total elapsed time and downstream activity after the caller's deadline.

## Caption

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

1. Find abandoned work
User requests time out while downstream operations continue consuming workers.

2. Inspect cancellation
Trace whether cancellation reaches the database, network client, and internal queue.

3. Bound queued work
Reject work that cannot start or finish before its deadline.

4. Preserve cleanup
Release locks and connections even when the success path is cancelled.

5. Reconcile writes
Determine whether a timed-out mutation committed before attempting it again.

6. Verify budget accounting
Measure total elapsed time and downstream activity after the caller's deadline.

The takeaway: A deadline bounds waiting; it does not automatically reverse a completed business action.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #timeouts #cancellation

## Reel Storyboard

Suggested duration: about 40 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A client can time out while its abandoned server work keeps running.

- **0:05-0:09** / Reveal step 1: Find abandoned work
  Narration: User requests time out while downstream operations continue consuming workers.

- **0:09-0:14** / Reveal step 2: Inspect cancellation
  Narration: Trace whether cancellation reaches the database, network client, and internal queue.

- **0:14-0:18** / Reveal step 3: Bound queued work
  Narration: Reject work that cannot start or finish before its deadline.

- **0:18-0:23** / Reveal step 4: Preserve cleanup
  Narration: Release locks and connections even when the success path is cancelled.

- **0:23-0:27** / Reveal step 5: Reconcile writes
  Narration: Determine whether a timed-out mutation committed before attempting it again.

- **0:27-0:32** / Reveal step 6: Verify budget accounting
  Narration: Measure total elapsed time and downstream activity after the caller's deadline.

- **0:32-0:40** / Takeaway and discussion prompt
  Narration: A deadline bounds waiting; it does not automatically reverse a completed business action. What evidence would disprove your first diagnosis?

## References

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
