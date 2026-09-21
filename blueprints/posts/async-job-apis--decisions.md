# Designing Honest Job APIs / Decision Guide

By Yasir Sharfi

## The Idea

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

## Visual Blueprint

1. **Client polling**: Use polling for simple status retrieval with documented intervals and conditional responses.
2. **Trade-off / Client polling**: Aggressive polling can become a larger load than the original job submissions.
3. **Push notification**: Use a webhook or event channel when clients need timely completion updates.
4. **Trade-off / Push notification**: Push delivery can fail or repeat; retain an authoritative status endpoint.
5. **Durable workflow engine**: Use a workflow engine when multi-step recovery and timers justify its operational model.
6. **Trade-off / Durable workflow engine**: Understand replay rules and versioning rather than placing arbitrary side effects in replayed code.

## Caption

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

1. Client polling
Use polling for simple status retrieval with documented intervals and conditional responses.

2. Trade-off / Client polling
Aggressive polling can become a larger load than the original job submissions.

3. Push notification
Use a webhook or event channel when clients need timely completion updates.

4. Trade-off / Push notification
Push delivery can fail or repeat; retain an authoritative status endpoint.

5. Durable workflow engine
Use a workflow engine when multi-step recovery and timers justify its operational model.

6. Trade-off / Durable workflow engine
Understand replay rules and versioning rather than placing arbitrary side effects in replayed code.

The takeaway: An asynchronous API must make ownership, progress, retries, and final outcomes observable.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #jobs #queues

## Reel Storyboard

Suggested duration: about 46 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Returning 202 is easy; explaining what happened to the job is the hard part.

- **0:06-0:11** / Reveal step 1: Client polling
  Narration: Use polling for simple status retrieval with documented intervals and conditional responses.

- **0:11-0:16** / Reveal step 2: Trade-off / Client polling
  Narration: Aggressive polling can become a larger load than the original job submissions.

- **0:16-0:21** / Reveal step 3: Push notification
  Narration: Use a webhook or event channel when clients need timely completion updates.

- **0:21-0:26** / Reveal step 4: Trade-off / Push notification
  Narration: Push delivery can fail or repeat; retain an authoritative status endpoint.

- **0:26-0:32** / Reveal step 5: Durable workflow engine
  Narration: Use a workflow engine when multi-step recovery and timers justify its operational model.

- **0:32-0:38** / Reveal step 6: Trade-off / Durable workflow engine
  Narration: Understand replay rules and versioning rather than placing arbitrary side effects in replayed code.

- **0:38-0:46** / Takeaway and discussion prompt
  Narration: An asynchronous API must make ownership, progress, retries, and final outcomes observable. Which constraint would change your choice?

## References

- [Azure asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
