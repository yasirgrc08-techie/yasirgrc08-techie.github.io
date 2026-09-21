# Webhooks That Survive Retries / Metrics That Matter

By Yasir Sharfi

## The Idea

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

## Visual Blueprint

1. **Delivery latency**: Measure time from provider event creation to durable receipt and then business completion.
2. **Interpret / Delivery latency**: Arrival time alone hides a backlog of accepted but unprocessed events.
3. **Duplicate events**: Count deduplicated provider event IDs separately from invalid signatures.
4. **Interpret / Duplicate events**: Duplicates may be normal delivery behavior; repeated business effects are the real defect.
5. **Inbox age**: Track oldest unprocessed event and retries by failure category.
6. **Interpret / Inbox age**: A small queue can still contain one permanently stuck event that matters to a customer.

## Caption

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

1. Delivery latency
Measure time from provider event creation to durable receipt and then business completion.

2. Interpret / Delivery latency
Arrival time alone hides a backlog of accepted but unprocessed events.

3. Duplicate events
Count deduplicated provider event IDs separately from invalid signatures.

4. Interpret / Duplicate events
Duplicates may be normal delivery behavior; repeated business effects are the real defect.

5. Inbox age
Track oldest unprocessed event and retries by failure category.

6. Interpret / Inbox age
A small queue can still contain one permanently stuck event that matters to a customer.

The takeaway: Authenticate delivery, persist acceptance, and make the business handler replay-safe.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #webhooks #idempotency

## Reel Storyboard

Suggested duration: about 45 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A valid webhook can arrive twice, late, or in an order you did not expect.

- **0:06-0:12** / Reveal step 1: Delivery latency
  Narration: Measure time from provider event creation to durable receipt and then business completion.

- **0:12-0:17** / Reveal step 2: Interpret / Delivery latency
  Narration: Arrival time alone hides a backlog of accepted but unprocessed events.

- **0:17-0:21** / Reveal step 3: Duplicate events
  Narration: Count deduplicated provider event IDs separately from invalid signatures.

- **0:21-0:27** / Reveal step 4: Interpret / Duplicate events
  Narration: Duplicates may be normal delivery behavior; repeated business effects are the real defect.

- **0:27-0:31** / Reveal step 5: Inbox age
  Narration: Track oldest unprocessed event and retries by failure category.

- **0:31-0:37** / Reveal step 6: Interpret / Inbox age
  Narration: A small queue can still contain one permanently stuck event that matters to a customer.

- **0:37-0:45** / Takeaway and discussion prompt
  Narration: Authenticate delivery, persist acceptance, and make the business handler replay-safe. Which metric could look healthy while users suffer?

## References

- [Stripe webhook guidance](https://docs.stripe.com/webhooks)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
