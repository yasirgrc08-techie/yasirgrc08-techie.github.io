# Deadlines Across a Call Chain / Decision Guide

By Yasir Sharfi

## The Idea

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

## Visual Blueprint

1. **Fixed per-call timeout**: Use a simple fixed limit for isolated calls with a clear independent latency contract.
2. **Trade-off / Fixed per-call timeout**: Multiple sequential calls can exceed the overall user deadline even if each respects its own timeout.
3. **Propagated deadline**: Use a shrinking budget across a multi-service request path.
4. **Trade-off / Propagated deadline**: Clock representation and cancellation semantics must be agreed across runtimes and protocols.
5. **Async operation**: Use a durable job when useful work legitimately outlives an interactive request.
6. **Trade-off / Async operation**: A job needs status, ownership, retry limits, and a cancellation contract of its own.

## Caption

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

1. Fixed per-call timeout
Use a simple fixed limit for isolated calls with a clear independent latency contract.

2. Trade-off / Fixed per-call timeout
Multiple sequential calls can exceed the overall user deadline even if each respects its own timeout.

3. Propagated deadline
Use a shrinking budget across a multi-service request path.

4. Trade-off / Propagated deadline
Clock representation and cancellation semantics must be agreed across runtimes and protocols.

5. Async operation
Use a durable job when useful work legitimately outlives an interactive request.

6. Trade-off / Async operation
A job needs status, ownership, retry limits, and a cancellation contract of its own.

The takeaway: A deadline bounds waiting; it does not automatically reverse a completed business action.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #timeouts #cancellation

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A client can time out while its abandoned server work keeps running.

- **0:05-0:11** / Reveal step 1: Fixed per-call timeout
  Narration: Use a simple fixed limit for isolated calls with a clear independent latency contract.

- **0:11-0:18** / Reveal step 2: Trade-off / Fixed per-call timeout
  Narration: Multiple sequential calls can exceed the overall user deadline even if each respects its own timeout.

- **0:18-0:22** / Reveal step 3: Propagated deadline
  Narration: Use a shrinking budget across a multi-service request path.

- **0:22-0:27** / Reveal step 4: Trade-off / Propagated deadline
  Narration: Clock representation and cancellation semantics must be agreed across runtimes and protocols.

- **0:27-0:32** / Reveal step 5: Async operation
  Narration: Use a durable job when useful work legitimately outlives an interactive request.

- **0:32-0:38** / Reveal step 6: Trade-off / Async operation
  Narration: A job needs status, ownership, retry limits, and a cancellation contract of its own.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: A deadline bounds waiting; it does not automatically reverse a completed business action. Which constraint would change your choice?

## References

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
