# Designing Honest Job APIs / Build and Validate

By Yasir Sharfi

## The Idea

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

## Visual Blueprint

1. **Implement a state machine**: Build a local job table with explicit allowed transitions and synthetic work.
2. **Submit duplicate requests**: Reuse the operation key and verify the same job identity is returned.
3. **Crash the worker**: Stop a worker after claiming work and verify the recovery policy.
4. **Retry one side effect**: Simulate response loss and assert that replay does not create duplicate output.
5. **Cancel at each phase**: Test queued, running, and already completed jobs against the cancellation contract.
6. **Check the status API**: Ensure every accepted fixture reaches a documented terminal state or a visible actionable pending state.

## Caption

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

1. Implement a state machine
Build a local job table with explicit allowed transitions and synthetic work.

2. Submit duplicate requests
Reuse the operation key and verify the same job identity is returned.

3. Crash the worker
Stop a worker after claiming work and verify the recovery policy.

4. Retry one side effect
Simulate response loss and assert that replay does not create duplicate output.

5. Cancel at each phase
Test queued, running, and already completed jobs against the cancellation contract.

6. Check the status API
Ensure every accepted fixture reaches a documented terminal state or a visible actionable pending state.

The takeaway: An asynchronous API must make ownership, progress, retries, and final outcomes observable.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #jobs #queues

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Returning 202 is easy; explaining what happened to the job is the hard part.

- **0:06-0:11** / Reveal step 1: Implement a state machine
  Narration: Build a local job table with explicit allowed transitions and synthetic work.

- **0:11-0:16** / Reveal step 2: Submit duplicate requests
  Narration: Reuse the operation key and verify the same job identity is returned.

- **0:16-0:21** / Reveal step 3: Crash the worker
  Narration: Stop a worker after claiming work and verify the recovery policy.

- **0:21-0:26** / Reveal step 4: Retry one side effect
  Narration: Simulate response loss and assert that replay does not create duplicate output.

- **0:26-0:31** / Reveal step 5: Cancel at each phase
  Narration: Test queued, running, and already completed jobs against the cancellation contract.

- **0:31-0:37** / Reveal step 6: Check the status API
  Narration: Ensure every accepted fixture reaches a documented terminal state or a visible actionable pending state.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: An asynchronous API must make ownership, progress, retries, and final outcomes observable. How would you reproduce this with synthetic data?

## References

- [Azure asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
