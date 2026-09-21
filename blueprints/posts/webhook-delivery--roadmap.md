# Webhooks That Survive Retries / Bottleneck Roadmap

By Yasir Sharfi

## The Idea

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

## Visual Blueprint

1. **Verify the sender**: Validate the provider signature over the required raw payload and enforce its replay-window contract.
2. **Bound the input**: Limit body size, parse safely, and reject unsupported event types without exposing secrets.
3. **Persist before acknowledging**: Durably record the accepted event before responding successfully to the provider.
4. **Deduplicate the event**: Use the provider event identity at the business boundary, not only an in-memory seen set.
5. **Process asynchronously**: Move slow work off the delivery request and make side effects safe to replay.
6. **Reconcile authoritative state**: Handle missing or out-of-order events with a status lookup and a documented recovery job.

## Caption

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

1. Verify the sender
Validate the provider signature over the required raw payload and enforce its replay-window contract.

2. Bound the input
Limit body size, parse safely, and reject unsupported event types without exposing secrets.

3. Persist before acknowledging
Durably record the accepted event before responding successfully to the provider.

4. Deduplicate the event
Use the provider event identity at the business boundary, not only an in-memory seen set.

5. Process asynchronously
Move slow work off the delivery request and make side effects safe to replay.

6. Reconcile authoritative state
Handle missing or out-of-order events with a status lookup and a documented recovery job.

The takeaway: Authenticate delivery, persist acceptance, and make the business handler replay-safe.

Which bottleneck would you measure first?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #webhooks #idempotency

## Reel Storyboard

Suggested duration: about 48 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A valid webhook can arrive twice, late, or in an order you did not expect.

- **0:06-0:12** / Reveal step 1: Verify the sender
  Narration: Validate the provider signature over the required raw payload and enforce its replay-window contract.

- **0:12-0:18** / Reveal step 2: Bound the input
  Narration: Limit body size, parse safely, and reject unsupported event types without exposing secrets.

- **0:18-0:23** / Reveal step 3: Persist before acknowledging
  Narration: Durably record the accepted event before responding successfully to the provider.

- **0:23-0:29** / Reveal step 4: Deduplicate the event
  Narration: Use the provider event identity at the business boundary, not only an in-memory seen set.

- **0:29-0:35** / Reveal step 5: Process asynchronously
  Narration: Move slow work off the delivery request and make side effects safe to replay.

- **0:35-0:41** / Reveal step 6: Reconcile authoritative state
  Narration: Handle missing or out-of-order events with a status lookup and a documented recovery job.

- **0:41-0:48** / Takeaway and discussion prompt
  Narration: Authenticate delivery, persist acceptance, and make the business handler replay-safe. Which bottleneck would you measure first?

## References

- [Stripe webhook guidance](https://docs.stripe.com/webhooks)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
