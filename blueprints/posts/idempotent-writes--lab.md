# Idempotency for Real Writes / Build and Validate

By Yasir Sharfi

## The Idea

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

## Visual Blueprint

1. **Define one invariant**: Build a local reservation endpoint that permits at most one result per scoped operation key.
2. **Race two requests**: Send the same key concurrently and verify that only one worker owns the claim.
3. **Change the payload**: Reuse the key with different input and assert a clear conflict, not a second operation.
4. **Lose the response**: Commit the result but simulate a disconnected client before sending the response.
5. **Replay safely**: Retry the original request and compare its returned identity with the stored result.
6. **Test expiry rules**: Document retention behavior and simulate a retry near the configured expiry boundary.

## Caption

A timeout does not tell you whether the payment or reservation happened.

Use a synthetic order API with a stable request identity. The deduplication record and business effect must share a defensible persistence boundary.

1. Define one invariant
Build a local reservation endpoint that permits at most one result per scoped operation key.

2. Race two requests
Send the same key concurrently and verify that only one worker owns the claim.

3. Change the payload
Reuse the key with different input and assert a clear conflict, not a second operation.

4. Lose the response
Commit the result but simulate a disconnected client before sending the response.

5. Replay safely
Retry the original request and compare its returned identity with the stored result.

6. Test expiry rules
Document retention behavior and simulate a retry near the configured expiry boundary.

The takeaway: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone.

How would you reproduce this with synthetic data?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #BackendandAPIs #api #idempotency #payments

## Reel Storyboard

Suggested duration: about 49 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: A timeout does not tell you whether the payment or reservation happened.

- **0:05-0:11** / Reveal step 1: Define one invariant
  Narration: Build a local reservation endpoint that permits at most one result per scoped operation key.

- **0:11-0:17** / Reveal step 2: Race two requests
  Narration: Send the same key concurrently and verify that only one worker owns the claim.

- **0:17-0:23** / Reveal step 3: Change the payload
  Narration: Reuse the key with different input and assert a clear conflict, not a second operation.

- **0:23-0:28** / Reveal step 4: Lose the response
  Narration: Commit the result but simulate a disconnected client before sending the response.

- **0:28-0:34** / Reveal step 5: Replay safely
  Narration: Retry the original request and compare its returned identity with the stored result.

- **0:34-0:39** / Reveal step 6: Test expiry rules
  Narration: Document retention behavior and simulate a retry near the configured expiry boundary.

- **0:39-0:49** / Takeaway and discussion prompt
  Narration: Retries need a stable operation identity and a durable outcome, not a promise based on HTTP alone. How would you reproduce this with synthetic data?

## References

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
