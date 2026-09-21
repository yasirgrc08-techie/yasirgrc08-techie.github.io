# Deadlines Across a Call Chain / Build and Validate

By Yasir Sharfi

## The Idea

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

## Visual Blueprint

1. **Create three stages**: Build a local request with validation, database work, and a dependency call.
2. **Set one budget**: Give the whole operation a short synthetic deadline and instrument elapsed time.
3. **Delay each stage**: Introduce delay in one stage at a time and compare which downstream calls still start.
4. **Cancel the client**: Disconnect the caller and observe whether unnecessary work terminates.
5. **Check resource release**: Assert that connections and permits return even on cancellation and timeout.
6. **Inspect committed writes**: Simulate response loss after commit and use status lookup instead of assuming rollback.

## Caption

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

1. Create three stages
Build a local request with validation, database work, and a dependency call.

2. Set one budget
Give the whole operation a short synthetic deadline and instrument elapsed time.

3. Delay each stage
Introduce delay in one stage at a time and compare which downstream calls still start.

4. Cancel the client
Disconnect the caller and observe whether unnecessary work terminates.

5. Check resource release
Assert that connections and permits return even on cancellation and timeout.

6. Inspect committed writes
Simulate response loss after commit and use status lookup instead of assuming rollback.

The takeaway: A deadline bounds waiting; it does not automatically reverse a completed business action.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #timeouts #cancellation

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A client can time out while its abandoned server work keeps running.

- **0:05-0:10** / Reveal step 1: Create three stages
  Narration: Build a local request with validation, database work, and a dependency call.

- **0:10-0:15** / Reveal step 2: Set one budget
  Narration: Give the whole operation a short synthetic deadline and instrument elapsed time.

- **0:15-0:21** / Reveal step 3: Delay each stage
  Narration: Introduce delay in one stage at a time and compare which downstream calls still start.

- **0:21-0:25** / Reveal step 4: Cancel the client
  Narration: Disconnect the caller and observe whether unnecessary work terminates.

- **0:25-0:30** / Reveal step 5: Check resource release
  Narration: Assert that connections and permits return even on cancellation and timeout.

- **0:30-0:36** / Reveal step 6: Inspect committed writes
  Narration: Simulate response loss after commit and use status lookup instead of assuming rollback.

- **0:36-0:45** / Takeaway and discussion prompt
  Narration: A deadline bounds waiting; it does not automatically reverse a completed business action. How would you reproduce this with synthetic data?

## References

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
