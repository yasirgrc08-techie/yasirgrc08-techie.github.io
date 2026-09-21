# Webhooks That Survive Retries / Failure and Recovery

By Yasir Sharfi

## The Idea

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

## Visual Blueprint

1. **Notice repeated updates**: One provider event appears to create multiple downstream business effects.
2. **Check the event identity**: Compare provider event IDs rather than assuming similar payloads represent the same event.
3. **Contain side effects**: Pause the affected consumer while retaining verified incoming events durably.
4. **Inspect acknowledgement timing**: Find whether responses were sent before persistence or after an excessively slow operation.
5. **Replay with deduplication**: Reprocess the inbox through a tested idempotent business handler.
6. **Reconcile gaps**: Compare local state with the provider's authoritative state and record repaired transitions.

## Caption

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

1. Notice repeated updates
One provider event appears to create multiple downstream business effects.

2. Check the event identity
Compare provider event IDs rather than assuming similar payloads represent the same event.

3. Contain side effects
Pause the affected consumer while retaining verified incoming events durably.

4. Inspect acknowledgement timing
Find whether responses were sent before persistence or after an excessively slow operation.

5. Replay with deduplication
Reprocess the inbox through a tested idempotent business handler.

6. Reconcile gaps
Compare local state with the provider's authoritative state and record repaired transitions.

The takeaway: Authenticate delivery, persist acceptance, and make the business handler replay-safe.

What evidence would disprove your first diagnosis?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #webhooks #idempotency

## Reel Storyboard

Suggested duration: about 42 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A valid webhook can arrive twice, late, or in an order you did not expect.

- **0:06-0:10** / Reveal step 1: Notice repeated updates
  Narration: One provider event appears to create multiple downstream business effects.

- **0:10-0:16** / Reveal step 2: Check the event identity
  Narration: Compare provider event IDs rather than assuming similar payloads represent the same event.

- **0:16-0:20** / Reveal step 3: Contain side effects
  Narration: Pause the affected consumer while retaining verified incoming events durably.

- **0:20-0:26** / Reveal step 4: Inspect acknowledgement timing
  Narration: Find whether responses were sent before persistence or after an excessively slow operation.

- **0:26-0:30** / Reveal step 5: Replay with deduplication
  Narration: Reprocess the inbox through a tested idempotent business handler.

- **0:30-0:35** / Reveal step 6: Reconcile gaps
  Narration: Compare local state with the provider's authoritative state and record repaired transitions.

- **0:35-0:42** / Takeaway and discussion prompt
  Narration: Authenticate delivery, persist acceptance, and make the business handler replay-safe. What evidence would disprove your first diagnosis?

## References

- [Stripe webhook guidance](https://docs.stripe.com/webhooks)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
