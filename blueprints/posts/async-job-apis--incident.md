# Designing Honest Job APIs / Failure and Recovery

By Yasir Sharfi

## The Idea

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

## Visual Blueprint

1. **Find stuck jobs**: Jobs remain running after the worker that owned them has disappeared.
2. **Inspect ownership**: Check lease, heartbeat, checkpoint, and retry records for the missing worker.
3. **Pause duplicate execution**: Prevent competing recovery workers from claiming the same job simultaneously.
4. **Resume from durable state**: Retry from a safe checkpoint or restart an idempotent operation with the same identity.
5. **Publish the final outcome**: Ensure the client can distinguish completed, failed, and cancelled work.
6. **Test crash boundaries**: Inject failure before and after every durable state transition and side effect.

## Caption

Returning 202 is easy; explaining what happened to the job is the hard part.

A long-running operation needs a durable identity, explicit states, and a terminal outcome even when clients disconnect or workers restart.

1. Find stuck jobs
Jobs remain running after the worker that owned them has disappeared.

2. Inspect ownership
Check lease, heartbeat, checkpoint, and retry records for the missing worker.

3. Pause duplicate execution
Prevent competing recovery workers from claiming the same job simultaneously.

4. Resume from durable state
Retry from a safe checkpoint or restart an idempotent operation with the same identity.

5. Publish the final outcome
Ensure the client can distinguish completed, failed, and cancelled work.

6. Test crash boundaries
Inject failure before and after every durable state transition and side effect.

The takeaway: An asynchronous API must make ownership, progress, retries, and final outcomes observable.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #jobs #queues

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: Returning 202 is easy; explaining what happened to the job is the hard part.

- **0:06-0:11** / Reveal step 1: Find stuck jobs
  Narration: Jobs remain running after the worker that owned them has disappeared.

- **0:11-0:16** / Reveal step 2: Inspect ownership
  Narration: Check lease, heartbeat, checkpoint, and retry records for the missing worker.

- **0:16-0:20** / Reveal step 3: Pause duplicate execution
  Narration: Prevent competing recovery workers from claiming the same job simultaneously.

- **0:20-0:26** / Reveal step 4: Resume from durable state
  Narration: Retry from a safe checkpoint or restart an idempotent operation with the same identity.

- **0:26-0:30** / Reveal step 5: Publish the final outcome
  Narration: Ensure the client can distinguish completed, failed, and cancelled work.

- **0:30-0:35** / Reveal step 6: Test crash boundaries
  Narration: Inject failure before and after every durable state transition and side effect.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: An asynchronous API must make ownership, progress, retries, and final outcomes observable. What evidence would disprove your first diagnosis?

## References

- [Azure asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/async-request-reply)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
