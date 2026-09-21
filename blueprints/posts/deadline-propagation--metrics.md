# Deadlines Across a Call Chain / Metrics That Matter

By Yasir Sharfi

## The Idea

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

## Visual Blueprint

1. **Deadline overshoot**: Measure work that continues after its request budget expires.
2. **Interpret / Deadline overshoot**: Some cleanup is necessary; separate bounded cleanup from abandoned business work.
3. **Remaining budget**: Record the remaining time when entering expensive dependencies.
4. **Interpret / Remaining budget**: A dependency may look slow because earlier stages already consumed the usable budget.
5. **Cancellation completion**: Track how long cancelled operations take to release scarce resources.
6. **Interpret / Cancellation completion**: A cancellation signal is not proof that the operation or its side effects have stopped.

## Caption

A client can time out while its abandoned server work keeps running.

Treat a deadline as an end-to-end budget. Each dependency call, retry, and cleanup step must fit inside the remaining time.

1. Deadline overshoot
Measure work that continues after its request budget expires.

2. Interpret / Deadline overshoot
Some cleanup is necessary; separate bounded cleanup from abandoned business work.

3. Remaining budget
Record the remaining time when entering expensive dependencies.

4. Interpret / Remaining budget
A dependency may look slow because earlier stages already consumed the usable budget.

5. Cancellation completion
Track how long cancelled operations take to release scarce resources.

6. Interpret / Cancellation completion
A cancellation signal is not proof that the operation or its side effects have stopped.

The takeaway: A deadline bounds waiting; it does not automatically reverse a completed business action.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #timeouts #cancellation

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A client can time out while its abandoned server work keeps running.

- **0:05-0:09** / Reveal step 1: Deadline overshoot
  Narration: Measure work that continues after its request budget expires.

- **0:09-0:14** / Reveal step 2: Interpret / Deadline overshoot
  Narration: Some cleanup is necessary; separate bounded cleanup from abandoned business work.

- **0:14-0:18** / Reveal step 3: Remaining budget
  Narration: Record the remaining time when entering expensive dependencies.

- **0:18-0:24** / Reveal step 4: Interpret / Remaining budget
  Narration: A dependency may look slow because earlier stages already consumed the usable budget.

- **0:24-0:28** / Reveal step 5: Cancellation completion
  Narration: Track how long cancelled operations take to release scarce resources.

- **0:28-0:34** / Reveal step 6: Interpret / Cancellation completion
  Narration: A cancellation signal is not proof that the operation or its side effects have stopped.

- **0:34-0:43** / Takeaway and discussion prompt
  Narration: A deadline bounds waiting; it does not automatically reverse a completed business action. Which metric could look healthy while users suffer?

## References

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
