# Transactions Protect Invariants / Metrics That Matter

By Yasir Sharfi

## The Idea

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

## Visual Blueprint

1. **Conflict outcomes**: Count expected constraint or serialization conflicts separately from unexpected database errors.
2. **Interpret / Conflict outcomes**: Some conflicts show protection working; hiding them can obscure contention and client behavior.
3. **Lock wait time**: Measure waits and transaction duration for the protected resource.
4. **Interpret / Lock wait time**: A correct invariant can still have poor throughput if transactions hold locks unnecessarily.
5. **Invariant violations**: Audit the business condition against authoritative stored state.
6. **Interpret / Invariant violations**: Successful HTTP responses are not evidence that a cross-row invariant always held.

## Caption

Two individually valid requests can still create one invalid shared state.

Use a last-item reservation example. Decide which database constraint or transaction pattern enforces the invariant under concurrent updates.

1. Conflict outcomes
Count expected constraint or serialization conflicts separately from unexpected database errors.

2. Interpret / Conflict outcomes
Some conflicts show protection working; hiding them can obscure contention and client behavior.

3. Lock wait time
Measure waits and transaction duration for the protected resource.

4. Interpret / Lock wait time
A correct invariant can still have poor throughput if transactions hold locks unnecessarily.

5. Invariant violations
Audit the business condition against authoritative stored state.

6. Interpret / Invariant violations
Successful HTTP responses are not evidence that a cross-row invariant always held.

The takeaway: The transaction is useful only when its boundary matches the business invariant.

Which metric could look healthy while users suffer?

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.

#SoftwareEngineering #DataandStorage #database #transactions #isolation

## Reel Storyboard

Suggested duration: about 43 seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.

- **0:00-0:05** / Title and opening question
  Narration: Two individually valid requests can still create one invalid shared state.

- **0:05-0:10** / Reveal step 1: Conflict outcomes
  Narration: Count expected constraint or serialization conflicts separately from unexpected database errors.

- **0:10-0:16** / Reveal step 2: Interpret / Conflict outcomes
  Narration: Some conflicts show protection working; hiding them can obscure contention and client behavior.

- **0:16-0:20** / Reveal step 3: Lock wait time
  Narration: Measure waits and transaction duration for the protected resource.

- **0:20-0:26** / Reveal step 4: Interpret / Lock wait time
  Narration: A correct invariant can still have poor throughput if transactions hold locks unnecessarily.

- **0:26-0:30** / Reveal step 5: Invariant violations
  Narration: Audit the business condition against authoritative stored state.

- **0:30-0:35** / Reveal step 6: Interpret / Invariant violations
  Narration: Successful HTTP responses are not evidence that a cross-row invariant always held.

- **0:35-0:43** / Takeaway and discussion prompt
  Narration: The transaction is useful only when its boundary matches the business invariant. Which metric could look healthy while users suffer?

## References

- [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.
