# Designing Honest Job APIs / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

## Visual Blueprint

1. **Create a stable job ID**: Bind job creation to an idempotent operation and return a durable status location.
2. **Define state transitions**: Specify queued, running, completed, failed, and cancelled states with ownership rules.
3. **Separate acceptance from success**: Acknowledge durable acceptance without implying that processing already succeeded.
4. **Make workers replay-safe**: Checkpoint or deduplicate side effects so retries and crashes have defined outcomes.
5. **Expose bounded progress**: Return useful progress and failure categories without leaking sensitive internal details.
6. **Specify cancellation and expiry**: Explain whether cancellation is best effort, what survives expiry, and how results are retained.

## Caption

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

1. Create a stable job ID
Bind job creation to an idempotent operation and return a durable status location.

2. Define state transitions
Specify queued, running, completed, failed, and cancelled states with ownership rules.

3. Separate acceptance from success
Acknowledge durable acceptance without implying that processing already succeeded.

4. Make workers replay-safe
Checkpoint or deduplicate side effects so retries and crashes have defined outcomes.

5. Expose bounded progress
Return useful progress and failure categories without leaking sensitive internal details.

6. Specify cancellation and expiry
Explain whether cancellation is best effort, what survives expiry, and how results are retained.

The takeaway: An asynchronous API must make ownership, progress, retries, and final outcomes observable.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #jobs #queues

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Returning 202 is easy; explaining what happened to the job is the hard part.

- **0:06-0:12** / Reveal step 1: Create a stable job ID
  Narration: Bind job creation to an idempotent operation and return a durable status location.

- **0:12-0:17** / Reveal step 2: Define state transitions
  Narration: Specify queued, running, completed, failed, and cancelled states with ownership rules.

- **0:17-0:21** / Reveal step 3: Separate acceptance from success
  Narration: Acknowledge durable acceptance without implying that processing already succeeded.

- **0:21-0:26** / Reveal step 4: Make workers replay-safe
  Narration: Checkpoint or deduplicate side effects so retries and crashes have defined outcomes.

- **0:26-0:31** / Reveal step 5: Expose bounded progress
  Narration: Return useful progress and failure categories without leaking sensitive internal details.

- **0:31-0:37** / Reveal step 6: Specify cancellation and expiry
  Narration: Explain whether cancellation is best effort, what survives expiry, and how results are retained.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: An asynchronous API must make ownership, progress, retries, and final outcomes observable. Which bottleneck would you measure first?

## References

- [Azure asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
