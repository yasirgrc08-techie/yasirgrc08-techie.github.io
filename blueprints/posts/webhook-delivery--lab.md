# Webhooks That Survive Retries / Build and Validate

By Yasir Sharfi

## The Idea

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

## Visual Blueprint

1. **Use synthetic events**: Create a local signed event fixture and a sender with deterministic retries.
2. **Verify raw bytes**: Change whitespace or one byte and assert that signature validation follows the provider contract.
3. **Repeat one event**: Deliver the same event concurrently and verify a single logical business effect.
4. **Reorder transitions**: Send newer and older events in reversed order and test reconciliation behavior.
5. **Crash after persistence**: Restart before processing and confirm the durable inbox resumes work.
6. **Audit outcomes**: Compare provider fixture state, inbox records, and final business state after replay.

## Caption

A valid webhook can arrive twice, late, or in an order you did not expect.

Treat webhook delivery as untrusted input until authenticated, then as a durable event with provider-specific retry and ordering semantics.

1. Use synthetic events
Create a local signed event fixture and a sender with deterministic retries.

2. Verify raw bytes
Change whitespace or one byte and assert that signature validation follows the provider contract.

3. Repeat one event
Deliver the same event concurrently and verify a single logical business effect.

4. Reorder transitions
Send newer and older events in reversed order and test reconciliation behavior.

5. Crash after persistence
Restart before processing and confirm the durable inbox resumes work.

6. Audit outcomes
Compare provider fixture state, inbox records, and final business state after replay.

The takeaway: Authenticate delivery, persist acceptance, and make the business handler replay-safe.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #webhooks #idempotency

## Reel Storyboard

Suggested duration: about 44 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:06** / Title and opening question
  Narration: A valid webhook can arrive twice, late, or in an order you did not expect.

- **0:06-0:11** / Reveal step 1: Use synthetic events
  Narration: Create a local signed event fixture and a sender with deterministic retries.

- **0:11-0:17** / Reveal step 2: Verify raw bytes
  Narration: Change whitespace or one byte and assert that signature validation follows the provider contract.

- **0:17-0:22** / Reveal step 3: Repeat one event
  Narration: Deliver the same event concurrently and verify a single logical business effect.

- **0:22-0:27** / Reveal step 4: Reorder transitions
  Narration: Send newer and older events in reversed order and test reconciliation behavior.

- **0:27-0:31** / Reveal step 5: Crash after persistence
  Narration: Restart before processing and confirm the durable inbox resumes work.

- **0:31-0:36** / Reveal step 6: Audit outcomes
  Narration: Compare provider fixture state, inbox records, and final business state after replay.

- **0:36-0:44** / Takeaway and discussion prompt
  Narration: Authenticate delivery, persist acceptance, and make the business handler replay-safe. How would you reproduce this with synthetic data?

## References

- [Stripe webhook guidance](https://docs.stripe.com/webhooks)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
