# Webhooks That Survive Retries / Decision Guide

By Yasir Sharfi

## The Idea

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

## Visual Blueprint

1. **Inline processing**: Use inline work only when it is small, bounded, and compatible with the provider's delivery deadline.
2. **Trade-off / Inline processing**: A timeout after a side effect can cause redelivery; inline does not remove deduplication needs.
3. **Durable inbox**: Use an inbox when acknowledgement and business processing must be separated.
4. **Trade-off / Durable inbox**: You now own inbox retention, stuck-event recovery, and transactional handoff to workers.
5. **Polling reconciliation**: Use polling to recover missed transitions from an authoritative provider API.
6. **Trade-off / Polling reconciliation**: Respect provider limits and preserve event identities so reconciliation does not duplicate effects.

## Caption

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

1. Inline processing
Use inline work only when it is small, bounded, and compatible with the provider's delivery deadline.

2. Trade-off / Inline processing
A timeout after a side effect can cause redelivery; inline does not remove deduplication needs.

3. Durable inbox
Use an inbox when acknowledgement and business processing must be separated.

4. Trade-off / Durable inbox
You now own inbox retention, stuck-event recovery, and transactional handoff to workers.

5. Polling reconciliation
Use polling to recover missed transitions from an authoritative provider API.

6. Trade-off / Polling reconciliation
Respect provider limits and preserve event identities so reconciliation does not duplicate effects.

The takeaway: Authenticate delivery, persist acceptance, and make the business handler replay-safe.

Which constraint would change your choice?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #webhooks #idempotency

## Reel Storyboard

Suggested duration: about 47 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A valid webhook can arrive twice, late, or in an order you did not expect.

- **0:06-0:13** / Reveal step 1: Inline processing
  Narration: Use inline work only when it is small, bounded, and compatible with the provider's delivery deadline.

- **0:13-0:19** / Reveal step 2: Trade-off / Inline processing
  Narration: A timeout after a side effect can cause redelivery; inline does not remove deduplication needs.

- **0:19-0:24** / Reveal step 3: Durable inbox
  Narration: Use an inbox when acknowledgement and business processing must be separated.

- **0:24-0:29** / Reveal step 4: Trade-off / Durable inbox
  Narration: You now own inbox retention, stuck-event recovery, and transactional handoff to workers.

- **0:29-0:34** / Reveal step 5: Polling reconciliation
  Narration: Use polling to recover missed transitions from an authoritative provider API.

- **0:34-0:40** / Reveal step 6: Trade-off / Polling reconciliation
  Narration: Respect provider limits and preserve event identities so reconciliation does not duplicate effects.

- **0:40-0:47** / Takeaway and discussion prompt
  Narration: Authenticate delivery, persist acceptance, and make the business handler replay-safe. Which constraint would change your choice?

## References

- [Stripe webhook guidance](https://docs.stripe.com/webhooks)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
